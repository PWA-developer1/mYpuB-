// ====== IndexedDB Setup =======
const DB_NAME = "mypubDB";
const DB_VERSION = 1;
let db;
let currentUser = null;
const DEVELOPER_EMAIL = "enzemajr@gmail.com";
const DEVELOPER_PHONE = "+240222084663";

// ========== Inicializa EmailJS ==========
emailjs.init("YOUR_PUBLIC_KEY"); // <-- ¡Pon tu public key de emailjs aquí!

// ========== IndexedDB Open ==========
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject("No se pudo abrir la base de datos");
    request.onsuccess = (e) => {
      db = e.target.result;
      resolve(db);
    };
    request.onupgradeneeded = (e) => {
      db = e.target.result;
      if (!db.objectStoreNames.contains("users")) {
        const users = db.createObjectStore("users", { keyPath: "email" });
      }
      if (!db.objectStoreNames.contains("files")) {
        const files = db.createObjectStore("files", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("shares")) {
        db.createObjectStore("shares", { keyPath: "id", autoIncrement: true });
      }
      resolve(db);
    };
  });
}

// ========== Utilidades ==========
function getStore(storeName, mode = "readonly") {
  return db.transaction(storeName, mode).objectStore(storeName);
}
function showAlert(msg, type = "danger") {
  return `<div class="alert alert-${type}" role="alert">${msg}</div>`;
}
function validatePassword(pwd, isDev) {
  const devPrefix = "Mpteen";
  if (pwd.length !== 12) return false;
  const letters = pwd.slice(0,6);
  const numbers = pwd.slice(6,10);
  const symbols = pwd.slice(10,12);
  if (!/^[A-Z][a-zA-Z]{5}$/.test(letters)) return false;
  if (!/^[0-9]{4}$/.test(numbers)) return false;
  if (!/^[@#&]{2}$/.test(symbols)) return false;
  if (isDev && letters !== devPrefix) return false;
  return true;
}
function getRandomId() { return Math.random().toString(36).substr(2,9); }

// ========== Llenar países y prefijos ==========
async function loadCountries() {
  const url = "https://restcountries.com/v3.1/all";
  const countrySel = document.getElementById("country");
  let countryList = [];
  try {
    const res = await fetch(url);
    const data = await res.json();
    countryList = data
      .map(c => {
        let dial = (c.idd && c.idd.root && c.idd.suffixes) ?
          c.idd.root + c.idd.suffixes[0] : "";
        return {
          name: c.translations.spa?.common || c.name.common,
          code: c.cca2,
          dial: dial
        };
      })
      .filter(c => c.dial);
    countryList.sort((a,b) => a.name.localeCompare(b.name));
    countrySel.innerHTML = countryList.map(c =>
      `<option value="${c.code}" data-dial="${c.dial}">${c.name} (${c.dial})</option>`
    ).join('');
    countrySel.addEventListener('change', function() {
      const selected = countrySel.options[countrySel.selectedIndex];
      document.getElementById("phone-prefix").textContent = selected.getAttribute("data-dial");
    });
    // Set initial prefix
    if (countrySel.selectedIndex >= 0) {
      document.getElementById("phone-prefix").textContent =
        countrySel.options[countrySel.selectedIndex].getAttribute("data-dial");
    }
  } catch (e) {
    countrySel.innerHTML = `<option>Error al cargar países</option>`;
  }
}

// ========== Registro ==========
async function registerUser(e) {
  e.preventDefault();
  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const countrySel = document.getElementById("country");
  const country = countrySel.options[countrySel.selectedIndex].text;
  const phone = document.getElementById("phone").value.trim();
  const prefix = document.getElementById("phone-prefix").textContent;
  const password = document.getElementById("password").value.trim();
  const isDev = password.startsWith("Mpteen");
  if (!validatePassword(password, isDev)) {
    document.getElementById("register-form").insertAdjacentHTML("beforeend", showAlert("Contraseña inválida."))
    return;
  }
  const user = {
    fullname, email, country, phone: prefix+phone, password,
    blocked: false,
    isDev
  };
  const usersStore = getStore("users", "readwrite");
  const req = usersStore.get(email);
  req.onsuccess = function() {
    if (req.result) {
      document.getElementById("register-form").insertAdjacentHTML("beforeend", showAlert("El usuario ya existe!"))
    } else {
      usersStore.add(user).onsuccess = function() {
        loginUser(email, password, true);
      };
    }
  };
}

// ========== Login ==========
function loginUser(email, password, skipForm = false) {
  const usersStore = getStore("users");
  const req = usersStore.get(email);
  req.onsuccess = function() {
    const user = req.result;
    if (user && user.password === password && !user.blocked) {
      currentUser = user;
      showMainPanel();
    } else {
      if (!skipForm) {
        document.getElementById("login-form").insertAdjacentHTML("beforeend", showAlert("Credenciales incorrectas o usuario bloqueado."));
      }
    }
  };
}

// ========== Mostrar Panel Principal ==========
function showMainPanel() {
  document.getElementById("auth-container").classList.add("d-none");
  document.getElementById("main-panel").classList.remove("d-none");
  refreshGallery();
  refreshUsers();
  refreshShareForm();
}
function logout() {
  currentUser = null;
  document.getElementById("main-panel").classList.add("d-none");
  document.getElementById("auth-container").classList.remove("d-none");
  document.getElementById("form-login").reset();
  document.getElementById("form-register").reset();
}

// ========== Subir Archivos ==========
function uploadFile(e) {
  e.preventDefault();
  const fileInput = document.getElementById("media-file");
  const privacy = document.getElementById("privacy").value;
  const file = fileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(event) {
    const store = getStore("files", "readwrite");
    const record = {
      owner: currentUser.email,
      ownerName: currentUser.fullname,
      type: file.type.startsWith("image") ? "image" : "video",
      name: file.name,
      data: event.target.result,
      privacy,
      date: new Date().toISOString(),
      likes: [],
      dislikes: [],
      comments: [],
      downloads: 0
    };
    store.add(record).onsuccess = () => {
      document.getElementById("upload-status").innerHTML = showAlert("¡Archivo subido exitosamente!", "success");
      document.getElementById("upload-form").reset();
      refreshGallery();
      refreshShareForm();
    };
  };
  reader.readAsDataURL(file);
}

// ========== Galería ==========
function refreshGallery() {
  const store = getStore("files");
  const req = store.getAll();
  req.onsuccess = function() {
    const files = req.result.filter(f =>
      f.privacy === "public" || (f.privacy === "private" && f.owner === currentUser.email)
    );
    const container = document.getElementById("gallery-list");
    container.innerHTML = "";
    files.forEach(f => {
      const card = document.createElement("div");
      card.className = "col-md-4";
      card.innerHTML = `
        <div class="card">
          ${f.type === "image"
            ? `<img src="${f.data}" class="card-img-top" style="max-height:220px; object-fit:cover;">`
            : `<video src="${f.data}" controls class="card-img-top" style="max-height:220px;"></video>`
          }
          <div class="card-body">
            <h6 class="card-title">${f.name}</h6>
            <span>Subido por: <b>${f.ownerName}</b></span><br>
            <span>${new Date(f.date).toLocaleString()}</span>
            <div class="mt-2 d-flex align-items-center gap-2">
              <button class="btn btn-outline-primary btn-sm" onclick="likeFile(${f.id}, true)">👍 <span id="like-count-${f.id}">${f.likes.length}</span></button>
              <button class="btn btn-outline-secondary btn-sm" onclick="likeFile(${f.id}, false)">👎 <span id="dislike-count-${f.id}">${f.dislikes.length}</span></button>
              ${f.privacy === "public"
                ? `<a href="${f.data}" download="${f.name}" class="btn btn-outline-success btn-sm">Descargar</a>`
                : ""
              }
              ${(f.owner === currentUser.email || currentUser.isDev)
                ? `<button class="btn btn-outline-danger btn-sm" onclick="deleteFile(${f.id})">Eliminar</button>`
                : ""
              }
            </div>
            <div class="mt-2">
              <b>Likes:</b> <span id="like-count-2-${f.id}">${f.likes.length}</span>, <b>Meta:</b> 50
            </div>
            <div class="mt-2">
              <b>Comentarios:</b>
              <ul id="comments-${f.id}" class="list-group mb-2">
                ${f.comments.map(c => `<li class="list-group-item p-1"><b>${c.user}:</b> ${c.text}</li>`).join("")}
              </ul>
              <form onsubmit="commentFile(event, ${f.id})">
                <div class="input-group input-group-sm">
                  <input type="text" class="form-control" placeholder="Comentar..." id="comment-input-${f.id}">
                  <button class="btn btn-primary" type="submit">Enviar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  };
}

// ========== Likes/Dislikes ==========
window.likeFile = function(fileId, isLike) {
  const store = getStore("files", "readwrite");
  const req = store.get(fileId);
  req.onsuccess = function() {
    const file = req.result;
    if (!file) return;
    if (isLike) {
      if (!file.likes.includes(currentUser.email)) file.likes.push(currentUser.email);
      file.dislikes = file.dislikes.filter(e => e !== currentUser.email);
    } else {
      if (!file.dislikes.includes(currentUser.email)) file.dislikes.push(currentUser.email);
      file.likes = file.likes.filter(e => e !== currentUser.email);
    }
    store.put(file).onsuccess = refreshGallery;
  };
};

// ========== Comentarios ==========
window.commentFile = function(e, fileId) {
  e.preventDefault();
  const input = document.getElementById(`comment-input-${fileId}`);
  const text = input.value.trim();
  if (!text) return;
  const store = getStore("files", "readwrite");
  const req = store.get(fileId);
  req.onsuccess = function() {
    const file = req.result;
    if (!file) return;
    file.comments.push({ user: currentUser.fullname, text });
    store.put(file).onsuccess = refreshGallery;
  };
  input.value = "";
};

// ========== Eliminar ==========
window.deleteFile = function(fileId) {
  if (!confirm("¿Seguro que quieres eliminar este archivo?")) return;
  const store = getStore("files", "readwrite");
  store.delete(fileId).onsuccess = refreshGallery;
};

// ========== Compartir ==========
function refreshShareForm() {
  // Cargar usuarios y archivos propios
  const usersStore = getStore("users");
  const filesStore = getStore("files");
  usersStore.getAll().onsuccess = function(e) {
    const users = e.target.result.filter(u => u.email !== currentUser.email);
    const sel = document.getElementById("share-user");
    sel.innerHTML = users.map(u => `<option value="${u.email}">${u.fullname} (${u.email})</option>`).join('');
  };
  filesStore.getAll().onsuccess = function(e) {
    const files = e.target.result.filter(f => f.owner === currentUser.email);
    const sel = document.getElementById("share-file");
    sel.innerHTML = files.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
  };
}
function shareFile(e) {
  e.preventDefault();
  const userEmail = document.getElementById("share-user").value;
  const fileId = parseInt(document.getElementById("share-file").value);
  const sharesStore = getStore("shares", "readwrite");
  sharesStore.add({
    from: currentUser.email,
    to: userEmail,
    fileId,
    date: new Date().toISOString()
  }).onsuccess = function() {
    document.getElementById("share-status").innerHTML = showAlert("¡Archivo compartido!", "success");
  };
}

// ========== Gestión de Usuarios ==========
function refreshUsers() {
  const store = getStore("users");
  store.getAll().onsuccess = function(e) {
    const users = e.target.result;
    const container = document.getElementById("users-list");
    if (!currentUser.isDev) {
      container.innerHTML = "<p>Solo el desarrollador puede gestionar usuarios.</p>";
      return;
    }
    container.innerHTML = users.map(u => `
      <div class="user-card">
        <b>${u.fullname}</b> (${u.email}) ${u.isDev ? "(Desarrollador)" : ""}
        <span class="badge bg-${u.blocked?"danger":"success"}">${u.blocked?"Bloqueado":"Activo"}</span>
        <button class="btn btn-sm btn-warning ms-2" onclick="toggleBlock('${u.email}')">${u.blocked?"Desbloquear":"Bloquear"}</button>
        <button class="btn btn-sm btn-danger ms-2" onclick="deleteUser('${u.email}')">Eliminar</button>
      </div>
    `).join('');
  };
}
window.toggleBlock = function(email) {
  if (!currentUser.isDev) return;
  const store = getStore("users", "readwrite");
  const req = store.get(email);
  req.onsuccess = function() {
    const user = req.result;
    if (!user) return;
    user.blocked = !user.blocked;
    store.put(user).onsuccess = refreshUsers;
  };
};
window.deleteUser = function(email) {
  if (!currentUser.isDev) return;
  if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;
  const store = getStore("users", "readwrite");
  store.delete(email).onsuccess = refreshUsers;
};

// ========== AYUDA (EmailJS y WhatsApp) ==========
function showHelpForm(type) {
  const container = document.getElementById("help-form-container");
  container.innerHTML = `
    <form id="help-form">
      <div class="mb-2">
        <label>Nombre Completo</label>
        <input type="text" class="form-control" id="help-name" required>
      </div>
      <div class="mb-2">
        <label>${type === "email" ? "Email de respuesta" : "Número de WhatsApp"}</label>
        <input type="${type === "email" ? "email" : "text"}" class="form-control" id="help-contact" required>
      </div>
      <button type="submit" class="btn btn-primary">Consultar al desarrollador</button>
    </form>
  `;
  document.getElementById("help-form").onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById("help-name").value.trim();
    const contact = document.getElementById("help-contact").value.trim();
    if (type === "email") {
      // EmailJS
      emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        to_name: "Sr. Desarrollador de mYpuB",
        from_name: name,
        reply_to: contact,
        message: `Hola Sr. Desarrollador de mYpuB, el usuario ${name}, con el email ${contact}, solicita instrucciones para crear una cuenta de acceso a mYpuB y más cosas sobre la aplicación, ¡Gracias!`
      }).then(function() {
        container.innerHTML = showAlert("¡Consulta enviada exitosamente!", "success");
      }, function(error) {
        container.innerHTML = showAlert("Error al enviar email. " + error.text);
      });
    } else {
      // WhatsApp API
      const msg = encodeURIComponent(`Hola Sr. Desarrollador de mYpuB, el usuario ${name}, con el número ${contact}, solicita instrucciones para crear una cuenta de acceso a mYpuB y de más cosas sobre la aplicación, ¡Gracias!`);
      window.open(`https://wa.me/${DEVELOPER_PHONE.replace(/\+/g,"")}?text=${msg}`, "_blank");
      container.innerHTML = showAlert("¡Consulta enviada por WhatsApp!", "success");
    }
  };
}

// ========== EVENTOS ==========
window.addEventListener("DOMContentLoaded", async function() {
  await openDB();
  loadCountries();
  // Registro
  document.getElementById("form-register").onsubmit = registerUser;
  document.getElementById("to-login").onclick = function(e) {
    e.preventDefault();
    document.getElementById("register-form").classList.add("d-none");
    document.getElementById("login-form").classList.remove("d-none");
  };
  document.getElementById("to-register").onclick = function(e) {
    e.preventDefault();
    document.getElementById("login-form").classList.add("d-none");
    document.getElementById("register-form").classList.remove("d-none");
  };
  // Login
  document.getElementById("form-login").onsubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    loginUser(email, password);
  };
  // Subir archivo
  document.getElementById("upload-form").onsubmit = uploadFile;
  // Compartir
  document.getElementById("share-form").onsubmit = shareFile;
  // Logout
  document.getElementById("logout-btn").onclick = function(e) {
    e.preventDefault();
    logout();
  };
  // Ayuda
  document.getElementById("help-btn").onclick = function() {
    document.getElementById("help-form-container").innerHTML = "";
    new bootstrap.Modal(document.getElementById("helpModal")).show();
  };
  document.getElementById("help-email-btn").onclick = () => showHelpForm("email");
  document.getElementById("help-whatsapp-btn").onclick = () => showHelpForm("whatsapp");
});
