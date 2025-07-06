// ====== Lista física de países y prefijos =======
const countriesData = [
  {name: "Afganistán", code: "AF", dial: "+93"}, {name: "Albania", code: "AL", dial: "+355"},
  {name: "Alemania", code: "DE", dial: "+49"}, {name: "Andorra", code: "AD", dial: "+376"},
  {name: "Angola", code: "AO", dial: "+244"}, {name: "Arabia Saudita", code: "SA", dial: "+966"},
  {name: "Argelia", code: "DZ", dial: "+213"}, {name: "Argentina", code: "AR", dial: "+54"},
  {name: "Armenia", code: "AM", dial: "+374"}, {name: "Australia", code: "AU", dial: "+61"},
  {name: "Austria", code: "AT", dial: "+43"}, {name: "Azerbaiyán", code: "AZ", dial: "+994"},
  {name: "Bahamas", code: "BS", dial: "+1"}, {name: "Bangladés", code: "BD", dial: "+880"},
  {name: "Baréin", code: "BH", dial: "+973"}, {name: "Bélgica", code: "BE", dial: "+32"},
  {name: "Belice", code: "BZ", dial: "+501"}, {name: "Benín", code: "BJ", dial: "+229"},
  {name: "Bielorrusia", code: "BY", dial: "+375"}, {name: "Birmania", code: "MM", dial: "+95"},
  {name: "Bolivia", code: "BO", dial: "+591"}, {name: "Bosnia y Herzegovina", code: "BA", dial: "+387"},
  {name: "Botsuana", code: "BW", dial: "+267"}, {name: "Brasil", code: "BR", dial: "+55"},
  {name: "Brunéi", code: "BN", dial: "+673"}, {name: "Bulgaria", code: "BG", dial: "+359"},
  {name: "Burkina Faso", code: "BF", dial: "+226"}, {name: "Burundi", code: "BI", dial: "+257"},
  {name: "Cabo Verde", code: "CV", dial: "+238"}, {name: "Camboya", code: "KH", dial: "+855"},
  {name: "Camerún", code: "CM", dial: "+237"}, {name: "Canadá", code: "CA", dial: "+1"},
  {name: "Catar", code: "QA", dial: "+974"}, {name: "Chad", code: "TD", dial: "+235"},
  {name: "Chile", code: "CL", dial: "+56"}, {name: "China", code: "CN", dial: "+86"},
  {name: "Chipre", code: "CY", dial: "+357"}, {name: "Colombia", code: "CO", dial: "+57"},
  {name: "Comoras", code: "KM", dial: "+269"}, {name: "Congo", code: "CG", dial: "+242"},
  {name: "Corea del Norte", code: "KP", dial: "+850"}, {name: "Corea del Sur", code: "KR", dial: "+82"},
  {name: "Costa de Marfil", code: "CI", dial: "+225"}, {name: "Costa Rica", code: "CR", dial: "+506"},
  {name: "Croacia", code: "HR", dial: "+385"}, {name: "Cuba", code: "CU", dial: "+53"},
  {name: "Dinamarca", code: "DK", dial: "+45"}, {name: "Dominica", code: "DM", dial: "+1"},
  {name: "Ecuador", code: "EC", dial: "+593"}, {name: "Egipto", code: "EG", dial: "+20"},
  {name: "El Salvador", code: "SV", dial: "+503"}, {name: "Emiratos Árabes Unidos", code: "AE", dial: "+971"},
  {name: "Eritrea", code: "ER", dial: "+291"}, {name: "Eslovaquia", code: "SK", dial: "+421"},
  {name: "Eslovenia", code: "SI", dial: "+386"}, {name: "España", code: "ES", dial: "+34"},
  {name: "Estados Unidos", code: "US", dial: "+1"}, {name: "Estonia", code: "EE", dial: "+372"},
  {name: "Etiopía", code: "ET", dial: "+251"}, {name: "Filipinas", code: "PH", dial: "+63"},
  {name: "Finlandia", code: "FI", dial: "+358"}, {name: "Fiyi", code: "FJ", dial: "+679"},
  {name: "Francia", code: "FR", dial: "+33"}, {name: "Gabón", code: "GA", dial: "+241"},
  {name: "Gambia", code: "GM", dial: "+220"}, {name: "Georgia", code: "GE", dial: "+995"},
  {name: "Ghana", code: "GH", dial: "+233"}, {name: "Granada", code: "GD", dial: "+1"},
  {name: "Grecia", code: "GR", dial: "+30"}, {name: "Guatemala", code: "GT", dial: "+502"},
  {name: "Guinea", code: "GN", dial: "+224"}, {name: "Guinea-Bisáu", code: "GW", dial: "+245"},
  {name: "Guinea Ecuatorial", code: "GQ", dial: "+240"},
  {name: "Guyana", code: "GY", dial: "+592"}, {name: "Haití", code: "HT", dial: "+509"},
  {name: "Honduras", code: "HN", dial: "+504"}, {name: "Hungría", code: "HU", dial: "+36"},
  {name: "India", code: "IN", dial: "+91"}, {name: "Indonesia", code: "ID", dial: "+62"},
  {name: "Irak", code: "IQ", dial: "+964"}, {name: "Irán", code: "IR", dial: "+98"},
  {name: "Irlanda", code: "IE", dial: "+353"}, {name: "Islandia", code: "IS", dial: "+354"},
  {name: "Islas Marshall", code: "MH", dial: "+692"}, {name: "Islas Salomón", code: "SB", dial: "+677"},
  {name: "Israel", code: "IL", dial: "+972"}, {name: "Italia", code: "IT", dial: "+39"},
  {name: "Jamaica", code: "JM", dial: "+1"}, {name: "Japón", code: "JP", dial: "+81"},
  {name: "Jordania", code: "JO", dial: "+962"}, {name: "Kazajistán", code: "KZ", dial: "+7"},
  {name: "Kenia", code: "KE", dial: "+254"}, {name: "Kirguistán", code: "KG", dial: "+996"},
  {name: "Kiribati", code: "KI", dial: "+686"}, {name: "Kuwait", code: "KW", dial: "+965"},
  {name: "Laos", code: "LA", dial: "+856"}, {name: "Lesoto", code: "LS", dial: "+266"},
  {name: "Letonia", code: "LV", dial: "+371"}, {name: "Líbano", code: "LB", dial: "+961"},
  {name: "Liberia", code: "LR", dial: "+231"}, {name: "Libia", code: "LY", dial: "+218"},
  {name: "Liechtenstein", code: "LI", dial: "+423"}, {name: "Lituania", code: "LT", dial: "+370"},
  {name: "Luxemburgo", code: "LU", dial: "+352"}, {name: "Macedonia", code: "MK", dial: "+389"},
  {name: "Madagascar", code: "MG", dial: "+261"}, {name: "Malasia", code: "MY", dial: "+60"},
  {name: "Malaui", code: "MW", dial: "+265"}, {name: "Maldivas", code: "MV", dial: "+960"},
  {name: "Malí", code: "ML", dial: "+223"}, {name: "Malta", code: "MT", dial: "+356"},
  {name: "Marruecos", code: "MA", dial: "+212"}, {name: "Mauricio", code: "MU", dial: "+230"},
  {name: "Mauritania", code: "MR", dial: "+222"}, {name: "México", code: "MX", dial: "+52"},
  {name: "Micronesia", code: "FM", dial: "+691"}, {name: "Moldavia", code: "MD", dial: "+373"},
  {name: "Mónaco", code: "MC", dial: "+377"}, {name: "Mongolia", code: "MN", dial: "+976"},
  {name: "Montenegro", code: "ME", dial: "+382"}, {name: "Mozambique", code: "MZ", dial: "+258"},
  {name: "Namibia", code: "NA", dial: "+264"}, {name: "Nauru", code: "NR", dial: "+674"},
  {name: "Nepal", code: "NP", dial: "+977"}, {name: "Nicaragua", code: "NI", dial: "+505"},
  {name: "Níger", code: "NE", dial: "+227"}, {name: "Nigeria", code: "NG", dial: "+234"},
  {name: "Noruega", code: "NO", dial: "+47"}, {name: "Nueva Zelanda", code: "NZ", dial: "+64"},
  {name: "Omán", code: "OM", dial: "+968"}, {name: "Países Bajos", code: "NL", dial: "+31"},
  {name: "Pakistán", code: "PK", dial: "+92"}, {name: "Palaos", code: "PW", dial: "+680"},
  {name: "Palestina", code: "PS", dial: "+970"}, {name: "Panamá", code: "PA", dial: "+507"},
  {name: "Papúa Nueva Guinea", code: "PG", dial: "+675"}, {name: "Paraguay", code: "PY", dial: "+595"},
  {name: "Perú", code: "PE", dial: "+51"}, {name: "Polonia", code: "PL", dial: "+48"},
  {name: "Portugal", code: "PT", dial: "+351"}, {name: "Reino Unido", code: "GB", dial: "+44"},
  {name: "República Centroafricana", code: "CF", dial: "+236"}, {name: "República Checa", code: "CZ", dial: "+420"},
  {name: "República Dominicana", code: "DO", dial: "+1"}, {name: "República del Congo", code: "CD", dial: "+243"},
  {name: "Ruanda", code: "RW", dial: "+250"}, {name: "Rumanía", code: "RO", dial: "+40"},
  {name: "Rusia", code: "RU", dial: "+7"}, {name: "Samoa", code: "WS", dial: "+685"},
  {name: "San Cristóbal y Nieves", code: "KN", dial: "+1"}, {name: "San Marino", code: "SM", dial: "+378"},
  {name: "San Vicente y las Granadinas", code: "VC", dial: "+1"}, {name: "Santa Lucía", code: "LC", dial: "+1"},
  {name: "Santo Tomé y Príncipe", code: "ST", dial: "+239"}, {name: "Senegal", code: "SN", dial: "+221"},
  {name: "Serbia", code: "RS", dial: "+381"}, {name: "Seychelles", code: "SC", dial: "+248"},
  {name: "Sierra Leona", code: "SL", dial: "+232"}, {name: "Singapur", code: "SG", dial: "+65"},
  {name: "Siria", code: "SY", dial: "+963"}, {name: "Somalia", code: "SO", dial: "+252"},
  {name: "Sri Lanka", code: "LK", dial: "+94"}, {name: "Suazilandia", code: "SZ", dial: "+268"},
  {name: "Sudáfrica", code: "ZA", dial: "+27"}, {name: "Sudán", code: "SD", dial: "+249"},
  {name: "Sudán del Sur", code: "SS", dial: "+211"}, {name: "Suecia", code: "SE", dial: "+46"},
  {name: "Suiza", code: "CH", dial: "+41"}, {name: "Surinam", code: "SR", dial: "+597"},
  {name: "Tailandia", code: "TH", dial: "+66"}, {name: "Tanzania", code: "TZ", dial: "+255"},
  {name: "Tayikistán", code: "TJ", dial: "+992"}, {name: "Timor Oriental", code: "TL", dial: "+670"},
  {name: "Togo", code: "TG", dial: "+228"}, {name: "Tonga", code: "TO", dial: "+676"},
  {name: "Trinidad y Tobago", code: "TT", dial: "+1"}, {name: "Túnez", code: "TN", dial: "+216"},
  {name: "Turkmenistán", code: "TM", dial: "+993"}, {name: "Turquía", code: "TR", dial: "+90"},
  {name: "Tuvalu", code: "TV", dial: "+688"}, {name: "Ucrania", code: "UA", dial: "+380"},
  {name: "Uganda", code: "UG", dial: "+256"}, {name: "Uruguay", code: "UY", dial: "+598"},
  {name: "Uzbekistán", code: "UZ", dial: "+998"}, {name: "Vanuatu", code: "VU", dial: "+678"},
  {name: "Venezuela", code: "VE", dial: "+58"}, {name: "Vietnam", code: "VN", dial: "+84"},
  {name: "Yemen", code: "YE", dial: "+967"}, {name: "Yibuti", code: "DJ", dial: "+253"},
  {name: "Zambia", code: "ZM", dial: "+260"}, {name: "Zimbabue", code: "ZW", dial: "+263"}
];

// ========== IndexedDB Setup ===========
const DB_NAME = "mypubDB";
const DB_VERSION = 1;
let db;
let currentUser = null;
const DEVELOPER_EMAIL = "enzemajr@gmail.com";
const DEVELOPER_PHONE = "+240222084663";

// ========== EmailJS (reemplaza por tus propias credenciales) ==========
emailjs.init("YOUR_PUBLIC_KEY");

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
        db.createObjectStore("users", { keyPath: "email" });
      }
      if (!db.objectStoreNames.contains("files")) {
        db.createObjectStore("files", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("shares")) {
        db.createObjectStore("shares", { keyPath: "id", autoIncrement: true });
      }
      resolve(db);
    };
  });
}

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

// ========== Manejo de Pantallas ==========
function showScreen(screen) {
  document.getElementById("register-screen").classList.add("d-none");
  document.getElementById("login-screen").classList.add("d-none");
  document.getElementById("main-panel").classList.add("d-none");
  document.getElementById(screen).classList.remove("d-none");
  // Limpiar alertas
  ["register-alerts","login-alerts"].forEach(id => {
    if(document.getElementById(id)) document.getElementById(id).innerHTML = "";
  });
  // Limpiar formularios
  if(screen==="register-screen") document.getElementById("form-register").reset();
  if(screen==="login-screen") document.getElementById("form-login").reset();
}

// ========== Llenar Países ==========
let countriesLoaded = false;
function fillCountries() {
  if (countriesLoaded) return;
  const sel = document.getElementById("country");
  sel.innerHTML = '<option value="">-- Selecciona país --</option>' +
    countriesData.map(c =>
      `<option value="${c.code}" data-dial="${c.dial}">${c.name} (${c.dial})</option>`
    ).join('');
  countriesLoaded = true;
}
document.getElementById("country").addEventListener("click", fillCountries);
document.getElementById("country").addEventListener("change", function() {
  const sel = document.getElementById("country");
  const idx = sel.selectedIndex;
  document.getElementById("phone-prefix").textContent = idx > 0
    ? sel.options[idx].getAttribute("data-dial") : "";
});

// ========== Registro ==========
async function registerUser(e) {
  e.preventDefault();
  document.getElementById("register-alerts").innerHTML = "";
  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const countrySel = document.getElementById("country");
  const country = countrySel.options[countrySel.selectedIndex].text;
  const phone = document.getElementById("phone").value.trim();
  const prefix = document.getElementById("phone-prefix").textContent;
  const password = document.getElementById("password").value.trim();
  const isDev = password.startsWith("Mpteen");
  if (!validatePassword(password, isDev)) {
    document.getElementById("register-alerts").innerHTML = showAlert("Contraseña inválida.");
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
      document.getElementById("register-alerts").innerHTML = showAlert("El usuario ya existe!");
    } else {
      usersStore.add(user).onsuccess = function() {
        showScreen("login-screen");
        document.getElementById("login-alerts").innerHTML = showAlert("¡Registrado correctamente! Ingresa tus datos para entrar.","success");
      };
    }
  };
}

// ========== Login ==========
function loginUser(e) {
  e.preventDefault();
  document.getElementById("login-alerts").innerHTML = "";
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const usersStore = getStore("users");
  const req = usersStore.get(email);
  req.onsuccess = function() {
    const user = req.result;
    if (user && user.password === password && !user.blocked) {
      currentUser = user;
      showScreen("main-panel");
      refreshGallery();
      refreshUsers();
      refreshShareForm();
    } else {
      document.getElementById("login-alerts").innerHTML = showAlert("Credenciales incorrectas o usuario bloqueado.");
    }
  };
}
function logout() {
  currentUser = null;
  showScreen("login-screen");
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
      const msg = encodeURIComponent(`Hola Sr. Desarrollador de mYpuB, el usuario ${name}, con el número ${contact}, solicita instrucciones para crear una cuenta de acceso a mYpuB y de más cosas sobre la aplicación, ¡Gracias!`);
      window.open(`https://wa.me/${DEVELOPER_PHONE.replace(/\+/g,"")}?text=${msg}`, "_blank");
      container.innerHTML = showAlert("¡Consulta enviada por WhatsApp!", "success");
    }
  };
}

// ========== EVENTOS ==========
window.addEventListener("DOMContentLoaded", async function() {
  await openDB();
  // Pantallas iniciales
  showScreen("login-screen");
  // Registro
  document.getElementById("form-register").onsubmit = registerUser;
  document.getElementById("to-login-from-register").onclick = function(e) {
    e.preventDefault();
    showScreen("login-screen");
  };
  // Login
  document.getElementById("form-login").onsubmit = loginUser;
  document.getElementById("to-register-from-login").onclick = function(e) {
    e.preventDefault();
    showScreen("register-screen");
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
