// Inicialización de IndexedDB
let db;
const DB_NAME = 'mYpuBDB';
const DB_VERSION = 1;

// Inicializar la base de datos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    initDB();
});

const initDB = () => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
        console.error('Error al abrir la base de datos:', event.target.error);
    };

    request.onupgradeneeded = (event) => {
        db = event.target.result;

        // Crear almacén de usuarios si no existe
        if (!db.objectStoreNames.contains('users')) {
            const userStore = db.createObjectStore('users', { keyPath: 'email' });
            userStore.createIndex('fullName', 'fullName', { unique: false });
            userStore.createIndex('isDeveloper', 'isDeveloper', { unique: false });
        }

        // Crear almacén de medios si no existe
        if (!db.objectStoreNames.contains('media')) {
            const mediaStore = db.createObjectStore('media', { keyPath: 'id', autoIncrement: true });
            mediaStore.createIndex('userId', 'userId', { unique: false });
            mediaStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        console.log('Base de datos inicializada correctamente');
        setupEventListeners();
        initializeUI();
    };
};

// Inicialización de la UI
const initializeUI = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        showMainPanel();
        showWelcomeMessage(currentUser);
    } else {
        showLoginForm();
    }
};

// Configuración de los event listeners
const setupEventListeners = () => {
    // Navegación entre formularios
    document.getElementById('goToLogin').addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });

    document.getElementById('goToRegister').addEventListener('click', (e) => {
        e.preventDefault();
        showRegisterForm();
    });

    // Manejo de formularios
    document.getElementById('registrationForm').addEventListener('submit', handleRegistration);
    document.getElementById('loginFormElement').addEventListener('submit', handleLogin);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Funcionalidad de ayuda
    document.getElementById('helpBtn').addEventListener('click', toggleHelpPanel);
    document.getElementById('emailHelpBtn').addEventListener('click', showEmailHelpModal);
    document.getElementById('whatsappHelpBtn').addEventListener('click', showWhatsappHelpModal);
    document.getElementById('emailHelpForm').addEventListener('submit', handleEmailHelp);
    document.getElementById('whatsappHelpForm').addEventListener('submit', handleWhatsappHelp);

    // Navegación del panel principal
    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(e.target.getAttribute('data-section'));
        });
    });

    // Manejo de subida de archivos
    document.getElementById('uploadForm').addEventListener('submit', handleMediaUpload);
};

// Manejo del registro de usuarios
const handleRegistration = async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender').value;
    const country = document.getElementById('country').value;
    const phone = document.getElementById('phonePrefix').textContent + document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    // Validaciones
    if (!email.endsWith('@gmail.com')) {
        alert('El correo electrónico debe ser de Gmail');
        return;
    }

    // Validar contraseña
    const passwordRegex = /^[A-Z][a-zA-Z]{5}[0-9]{4}[@#&]{2}$/;
    if (!passwordRegex.test(password)) {
        alert('La contraseña no cumple con los requisitos');
        return;
    }

    const isDeveloper = password.startsWith('Mpteen');

    const userData = {
        fullName,
        email,
        gender,
        country,
        phone,
        password,
        isDeveloper
    };

    try {
        const transaction = db.transaction(['users'], 'readwrite');
        const userStore = transaction.objectStore('users');
        await userStore.add(userData);
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        showWelcomeMessage(userData);
        showMainPanel();
    } catch (error) {
        alert('Error al registrar el usuario: ' + error.message);
    }
};

// Manejo del inicio de sesión
const handleLogin = async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const transaction = db.transaction(['users'], 'readonly');
        const userStore = transaction.objectStore('users');
        const user = await userStore.get(email);

        if (user && user.password === password) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            showWelcomeMessage(user);
            showMainPanel();
        } else {
            alert('Credenciales inválidas');
        }
    } catch (error) {
        alert('Error al iniciar sesión: ' + error.message);
    }
};

// Mostrar mensaje de bienvenida
const showWelcomeMessage = (user) => {
    const prefix = user.gender === 'M' ? 'Bienvenido' : 'Bienvenida';
    const title = user.gender === 'M' ? 'Sr.' : 'Sra.';
    const message = `${prefix} a <span style="font-family: Georgia, serif; font-weight: bold;">mYpuB</span>, ${title} ${user.fullName}`;
    alert(message);
};

// Manejo del cierre de sesión
const handleLogout = () => {
    localStorage.removeItem('currentUser');
    showLoginForm();
};

// Funciones de navegación
const showMainPanel = () => {
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('mainPanel').classList.remove('hidden');
    showSection('upload');
};

const showLoginForm = () => {
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('mainPanel').classList.add('hidden');
};

const showRegisterForm = () => {
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('mainPanel').classList.add('hidden');
};

const showSection = (sectionId) => {
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${sectionId}Section`).classList.add('active');
};

// Manejo del panel de ayuda
const toggleHelpPanel = () => {
    document.getElementById('helpOptions').classList.toggle('hidden');
};

const showEmailHelpModal = () => {
    const modal = new bootstrap.Modal(document.getElementById('emailHelpModal'));
    modal.show();
};

const showWhatsappHelpModal = () => {
    const modal = new bootstrap.Modal(document.getElementById('whatsappHelpModal'));
    modal.show();
};

// Manejo de los formularios de ayuda
const handleEmailHelp = (e) => {
    e.preventDefault();
    const name = document.getElementById('helpName').value;
    const email = document.getElementById('helpEmail').value;
    
    const mailtoLink = `mailto:enzemajr@gmail.com?subject=Ayuda%20mYpuB&body=Hola%20Sr.%20Desarrollador%20de%20mYpuB%2C%0A%0AEl%20usuario%20${encodeURIComponent(name)}%2C%20con%20el%20email%20${encodeURIComponent(email)}%2C%20solicita%20instrucciones%20para%20crear%20una%20cuenta%20de%20acceso%20a%20mYpuB%20y%20más%20cosas%20sobre%20la%20aplicación.%0A%0AGracias!`;
    
    window.location.href = mailtoLink;
    bootstrap.Modal.getInstance(document.getElementById('emailHelpModal')).hide();
};

const handleWhatsappHelp = (e) => {
    e.preventDefault();
    const name = document.getElementById('whatsappName').value;
    const number = document.getElementById('whatsappNumber').value;
    
    const message = `Hola Sr. Desarrollador de mYpuB, el usuario ${name}, con el número ${number}, solicita instrucciones para crear una cuenta de acceso a mYpuB y de más cosas sobre la aplicación. Gracias!`;
    const whatsappLink = `https://wa.me/240222084663?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappLink, '_blank');
    bootstrap.Modal.getInstance(document.getElementById('whatsappHelpModal')).hide();
};

// Manejo de subida de medios
const handleMediaUpload = async (e) => {
    e.preventDefault();
    const file = document.getElementById('mediaFile').files[0];
    const isPublic = document.getElementById('public').checked;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!file || !currentUser) {
        alert('Por favor seleccione un archivo y asegúrese de haber iniciado sesión');
        return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
        const media = {
            userId: currentUser.email,
            data: event.target.result,
            type: file.type,
            isPublic: isPublic,
            timestamp: new Date().toISOString(),
            likes: 0,
            dislikes: 0,
            comments: []
        };

        try {
            const transaction = db.transaction(['media'], 'readwrite');
            const mediaStore = transaction.objectStore('media');
            await mediaStore.add(media);
            alert('Archivo subido exitosamente');
            showSection('gallery');
            loadGallery();
        } catch (error) {
            alert('Error al subir el archivo: ' + error.message);
        }
    };

    reader.readAsDataURL(file);
};

// Funciones de la Galería
const loadGallery = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    try {
        const transaction = db.transaction(['media'], 'readonly');
        const mediaStore = transaction.objectStore('media');
        const media = await mediaStore.getAll();

        const galleryDiv = document.getElementById('mediaGallery');
        galleryDiv.innerHTML = '';

        media.forEach(item => {
            if (item.isPublic || item.userId === currentUser.email) {
                const card = createMediaCard(item);
                galleryDiv.appendChild(card);
            }
        });
    } catch (error) {
        console.error('Error cargando la galería:', error);
    }
};

const createMediaCard = (media) => {
    const card = document.createElement('div');
    card.className = 'col-md-4 media-card';
    
    const content = document.createElement('div');
    content.className = 'card';
    
    const mediaElement = media.type.startsWith('image/') 
        ? `<img src="${media.data}" class="card-img-top" alt="Contenido multimedia">`
        : `<video src="${media.data}" controls class="card-img-top">Su navegador no soporta el elemento video.</video>`;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isOwner = currentUser && media.userId === currentUser.email;
    const isDeveloper = currentUser && currentUser.isDeveloper;
    const canDelete = isOwner || isDeveloper;

    content.innerHTML = `
        ${mediaElement}
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <small class="text-muted">Subido por: ${media.userId}</small>
                <small class="text-muted">${new Date(media.timestamp).toLocaleString()}</small>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary like-btn" ${media.userLiked ? 'disabled' : ''}>
                        👍 <span class="like-count">${media.likes || 0}</span>
                    </button>
                    <button class="btn btn-sm btn-outline-danger dislike-btn" ${media.userDisliked ? 'disabled' : ''}>
                        👎 <span class="dislike-count">${media.dislikes || 0}</span>
                    </button>
                </div>
                <div class="btn-group">
                    ${media.isPublic ? `
                        <button class="btn btn-sm btn-success download-btn">Descargar</button>
                    ` : ''}
                    ${canDelete ? `
                        <button class="btn btn-sm btn-danger delete-btn">Eliminar</button>
                    ` : ''}
                </div>
            </div>
            <div class="mt-3">
                <div class="comments-section">
                    ${media.comments ? media.comments.map(comment => `
                        <div class="comment mb-2">
                            <small class="fw-bold">${comment.userId}:</small>
                            <span>${comment.text}</span>
                        </div>
                    `).join('') : ''}
                </div>
                <div class="input-group mt-2">
                    <input type="text" class="form-control form-control-sm comment-input" placeholder="Añadir comentario">
                    <button class="btn btn-sm btn-outline-primary add-comment-btn">Comentar</button>
                </div>
            </div>
        </div>
    `;

    // Event Listeners para los botones
    const likeBtn = content.querySelector('.like-btn');
    const dislikeBtn = content.querySelector('.dislike-btn');
    const downloadBtn = content.querySelector('.download-btn');
    const deleteBtn = content.querySelector('.delete-btn');
    const commentInput = content.querySelector('.comment-input');
    const addCommentBtn = content.querySelector('.add-comment-btn');

    likeBtn?.addEventListener('click', () => handleLike(media.id));
    dislikeBtn?.addEventListener('click', () => handleDislike(media.id));
    downloadBtn?.addEventListener('click', () => handleDownload(media));
    deleteBtn?.addEventListener('click', () => handleDelete(media.id));
    addCommentBtn?.addEventListener('click', () => {
        const comment = commentInput.value.trim();
        if (comment) {
            handleAddComment(media.id, comment);
            commentInput.value = '';
        }
    });

    card.appendChild(content);
    return card;
};

// Funciones de interacción con los medios
const handleLike = async (mediaId) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    try {
        const transaction = db.transaction(['media'], 'readwrite');
        const mediaStore = transaction.objectStore('media');
        const media = await mediaStore.get(mediaId);

        if (!media.likes) media.likes = 0;
        if (!media.userLikes) media.userLikes = [];

        if (!media.userLikes.includes(currentUser.email)) {
            media.likes++;
            media.userLikes.push(currentUser.email);
            await mediaStore.put(media);
            loadGallery();
        }
    } catch (error) {
        console.error('Error al dar like:', error);
    }
};

const handleDislike = async (mediaId) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    try {
        const transaction = db.transaction(['media'], 'readwrite');
        const mediaStore = transaction.objectStore('media');
        const media = await mediaStore.get(mediaId);

        if (!media.dislikes) media.dislikes = 0;
        if (!media.userDislikes) media.userDislikes = [];

        if (!media.userDislikes.includes(currentUser.email)) {
            media.dislikes++;
            media.userDislikes.push(currentUser.email);
            await mediaStore.put(media);
            loadGallery();
        }
    } catch (error) {
        console.error('Error al dar dislike:', error);
    }
};

const handleDownload = (media) => {
    const link = document.createElement('a');
    link.href = media.data;
    link.download = `mypub_media_${media.id}${media.type.startsWith('image/') ? '.jpg' : '.mp4'}`;
    link.click();
};

const handleDelete = async (mediaId) => {
    if (!confirm('¿Está seguro de que desea eliminar este contenido?')) return;

    try {
        const transaction = db.transaction(['media'], 'readwrite');
        const mediaStore = transaction.objectStore('media');
        await mediaStore.delete(mediaId);
        loadGallery();
    } catch (error) {
        console.error('Error al eliminar el contenido:', error);
    }
};

const handleAddComment = async (mediaId, commentText) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    try {
        const transaction = db.transaction(['media'], 'readwrite');
        const mediaStore = transaction.objectStore('media');
        const media = await mediaStore.get(mediaId);

        if (!media.comments) media.comments = [];
        
        media.comments.push({
            userId: currentUser.email,
            text: commentText,
            timestamp: new Date().toISOString()
        });

        await mediaStore.put(media);
        loadGallery();
    } catch (error) {
        console.error('Error al añadir comentario:', error);
    }
};

// Funciones de Gestión de Usuarios (solo para desarrolladores)
const loadUserManagement = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.isDeveloper) {
        alert('Acceso no autorizado');
        return;
    }

    try {
        const transaction = db.transaction(['users'], 'readonly');
        const userStore = transaction.objectStore('users');
        const users = await userStore.getAll();

        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';

        users.forEach(user => {
            const userCard = createUserCard(user);
            usersList.appendChild(userCard);
        });
    } catch (error) {
        console.error('Error cargando usuarios:', error);
    }
};

const createUserCard = (user) => {
    const card = document.createElement('div');
    card.className = 'card mb-3';
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${user.fullName}</h5>
            <p class="card-text">
                Email: ${user.email}<br>
                Teléfono: ${user.phone}<br>
                País: ${user.country}<br>
                Estado: ${user.blocked ? 'Bloqueado' : 'Activo'}
            </p>
            <button class="btn btn-warning btn-sm me-2" onclick="toggleUserBlock('${user.email}')">
                ${user.blocked ? 'Desbloquear' : 'Bloquear'}
            </button>
            <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.email}')">
                Eliminar
            </button>
        </div>
    `;
    return card;
};

const toggleUserBlock = async (email) => {
    try {
        const transaction = db.transaction(['users'], 'readwrite');
        const userStore = transaction.objectStore('users');
        const user = await userStore.get(email);
        
        user.blocked = !user.blocked;
        await userStore.put(user);
        loadUserManagement();
    } catch (error) {
        console.error('Error al cambiar estado del usuario:', error);
    }
};

const deleteUser = async (email) => {
    if (!confirm('¿Está seguro de que desea eliminar este usuario?')) return;

    try {
        const transaction = db.transaction(['users'], 'readwrite');
        const userStore = transaction.objectStore('users');
        await userStore.delete(email);
        loadUserManagement();
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }
};

// Funciones para compartir archivos
const loadShareSection = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    try {
        // Cargar usuarios para compartir
        const userTransaction = db.transaction(['users'], 'readonly');
        const userStore = userTransaction.objectStore('users');
        const users = await userStore.getAll();

        // Cargar medios del usuario actual
        const mediaTransaction = db.transaction(['media'], 'readonly');
        const mediaStore = mediaTransaction.objectStore('media');
        const allMedia = await mediaStore.getAll();

        const userSelect = document.getElementById('userSelect');
        const mediaSelect = document.getElementById('mediaSelect');

        // Limpiar selects
        userSelect.innerHTML = '<option value="">Seleccione un usuario...</option>';
        mediaSelect.innerHTML = '<option value="">Seleccione un archivo...</option>';

        // Poblar select de usuarios
        users.forEach(user => {
            if (user.email !== currentUser.email && !user.blocked) {
                const option = document.createElement('option');
                option.value = user.email;
                option.textContent = `${user.fullName} (${user.email})`;
                userSelect.appendChild(option);
            }
        });

        // Poblar select de medios
        const userMedia = allMedia.filter(media => media.userId === currentUser.email);
        userMedia.forEach(media => {
            const option = document.createElement('option');
            option.value = media.id;
            option.textContent = `${media.type.split('/')[0]} - ${new Date(media.timestamp).toLocaleString()}`;
            mediaSelect.appendChild(option);
        });

        // Configurar botón de compartir
        const shareBtn = document.getElementById('shareBtn');
        shareBtn.onclick = handleShare;
    } catch (error) {
        console.error('Error cargando sección de compartir:', error);
    }
};

const handleShare = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const selectedUser = document.getElementById('userSelect').value;
    const selectedMediaId = parseInt(document.getElementById('mediaSelect').value);

    if (!selectedUser || !selectedMediaId) {
        alert('Por favor seleccione un usuario y un archivo para compartir');
        return;
    }

    try {
        const transaction = db.transaction(['media'], 'readwrite');
        const mediaStore = transaction.objectStore('media');
        const mediaToShare = await mediaStore.get(selectedMediaId);

        const sharedMedia = {
            ...mediaToShare,
            id: undefined, // Permitir que autoIncrement genere un nuevo ID
            originalId: selectedMediaId,
            userId: selectedUser,
            sharedBy: currentUser.email,
            timestamp: new Date().toISOString(),
            isPublic: false // Por defecto compartir como privado
        };

        await mediaStore.add(sharedMedia);
        alert('Archivo compartido exitosamente');
        
        // Recargar la sección de compartir
        loadShareSection();
    } catch (error) {
        console.error('Error al compartir archivo:', error);
        alert('Error al compartir el archivo');
    }
};

// Funciones de utilidad para el manejo de archivos
const getFileExtension = (mimeType) => {
    const extensions = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'video/mp4': '.mp4',
        'video/webm': '.webm',
        'video/ogg': '.ogv'
    };
    return extensions[mimeType] || '';
};

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Funciones para la validación de archivos
const validateFile = (file) => {
    // Tamaño máximo permitido (50MB)
    const MAX_FILE_SIZE = 50 * 1024 * 1024;
    
    // Tipos MIME permitidos
    const ALLOWED_TYPES = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'video/mp4',
        'video/webm',
        'video/ogg'
    ];

    if (file.size > MAX_FILE_SIZE) {
        throw new Error(`El archivo es demasiado grande. Tamaño máximo permitido: ${formatFileSize(MAX_FILE_SIZE)}`);
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error('Tipo de archivo no permitido. Solo se permiten imágenes (JPG, PNG, GIF) y videos (MP4, WebM, OGG)');
    }

    return true;
};

// Sistema de notificaciones
const notifyUser = async (userId, message, type = 'info') => {
    try {
        const transaction = db.transaction(['notifications'], 'readwrite');
        const notificationStore = transaction.objectStore('notifications');
        
        const notification = {
            userId,
            message,
            type,
            timestamp: new Date().toISOString(),
            read: false
        };

        await notificationStore.add(notification);
        updateNotificationBadge(userId);
    } catch (error) {
        console.error('Error al crear notificación:', error);
    }
};

const updateNotificationBadge = async (userId) => {
    try {
        const transaction = db.transaction(['notifications'], 'readonly');
        const notificationStore = transaction.objectStore('notifications');
        const notifications = await notificationStore.index('userId').getAll(userId);
        
        const unreadCount = notifications.filter(n => !n.read).length;
        const badge = document.getElementById('notificationBadge');
        
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'block' : 'none';
        }
    } catch (error) {
        console.error('Error al actualizar badge de notificaciones:', error);
    }
};

// Función para actualizar la interfaz cuando cambia el estado de la aplicación
const updateUI = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Actualizar elementos de la interfaz según el rol del usuario
    if (currentUser) {
        // Mostrar/ocultar elementos según si es desarrollador
        const devOnlyElements = document.querySelectorAll('.dev-only');
        devOnlyElements.forEach(element => {
            element.style.display = currentUser.isDeveloper ? 'block' : 'none';
        });

        // Actualizar nombre de usuario en la barra de navegación
        const userNameElement = document.getElementById('currentUserName');
        if (userNameElement) {
            userNameElement.textContent = currentUser.fullName;
        }

        // Actualizar badge de notificaciones
        updateNotificationBadge(currentUser.email);
    }
};

// Event Listeners adicionales
document.addEventListener('DOMContentLoaded', () => {
    // Actualizar UI cuando se carga la página
    updateUI();

    // Manejar cambios en el tema (claro/oscuro)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
    }

    // Restaurar tema guardado
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Manejar resize de la ventana para ajustes responsivos
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth < 768;
        document.body.classList.toggle('mobile-view', isMobile);
    });
});

// Función para manejar errores de la aplicación
const handleError = (error, context = '') => {
    console.error(`Error en ${context}:`, error);
    
    // Mostrar mensaje de error al usuario
    const errorMessage = document.createElement('div');
    errorMessage.className = 'alert alert-danger alert-dismissible fade show';
    errorMessage.innerHTML = `
        <strong>Error:</strong> ${error.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const alertContainer = document.getElementById('alertContainer');
    if (alertContainer) {
        alertContainer.appendChild(errorMessage);
        
        // Remover la alerta después de 5 segundos
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }
};

// Sistema de búsqueda y filtrado de contenido
const setupSearchSystem = () => {
    const searchInput = document.getElementById('mediaSearch');
    const filterSelect = document.getElementById('mediaFilter');

    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleMediaSearch, 300));
    }

    if (filterSelect) {
        filterSelect.addEventListener('change', handleMediaFilter);
    }
};

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const handleMediaSearch = async () => {
    const searchTerm = document.getElementById('mediaSearch').value.toLowerCase();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    try {
        const transaction = db.transaction(['media'], 'readonly');
        const mediaStore = transaction.objectStore('media');
        const allMedia = await mediaStore.getAll();

        const filteredMedia = allMedia.filter(media => {
            const isVisible = media.isPublic || media.userId === currentUser.email;
            const matchesSearch = media.userId.toLowerCase().includes(searchTerm) ||
                                (media.description && media.description.toLowerCase().includes(searchTerm));
            return isVisible && matchesSearch;
        });

        updateGalleryDisplay(filteredMedia);
    } catch (error) {
        handleError(error, 'búsqueda de medios');
    }
};

const handleMediaFilter = async (e) => {
    const filterValue = e.target.value;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    try {
        const transaction = db.transaction(['media'], 'readonly');
        const mediaStore = transaction.objectStore('media');
        const allMedia = await mediaStore.getAll();

        let filteredMedia = allMedia;

        switch (filterValue) {
            case 'my-media':
                filteredMedia = allMedia.filter(media => media.userId === currentUser.email);
                break;
            case 'shared-with-me':
                filteredMedia = allMedia.filter(media => media.sharedWith?.includes(currentUser.email));
                break;
            case 'public':
                filteredMedia = allMedia.filter(media => media.isPublic);
                break;
            case 'private':
                filteredMedia = allMedia.filter(media => !media.isPublic && media.userId === currentUser.email);
                break;
            case 'most-liked':
                filteredMedia = allMedia.filter(media => media.isPublic || media.userId === currentUser.email)
                                     .sort((a, b) => (b.likes || 0) - (a.likes || 0));
                break;
        }

        updateGalleryDisplay(filteredMedia);
    } catch (error) {
        handleError(error, 'filtrado de medios');
    }
};

const updateGalleryDisplay = (mediaItems) => {
    const galleryDiv = document.getElementById('mediaGallery');
    if (!galleryDiv) return;

    galleryDiv.innerHTML = '';
    mediaItems.forEach(item => {
        const card = createMediaCard(item);
        galleryDiv.appendChild(card);
    });
};

// Sistema de respaldo automático
const setupAutoBackup = () => {
    // Realizar respaldo cada 24 horas
    setInterval(performBackup, 24 * 60 * 60 * 1000);
    // Realizar respaldo inicial
    performBackup();
};

const performBackup = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.isDeveloper) return;

    try {
        const backup = {
            timestamp: new Date().toISOString(),
            users: await getAllFromStore('users'),
            media: await getAllFromStore('media'),
            notifications: await getAllFromStore('notifications')
        };

        // Guardar backup en localStorage
        const backupKey = `mypub_backup_${backup.timestamp}`;
        localStorage.setItem(backupKey, JSON.stringify(backup));

        // Mantener solo los últimos 5 backups
        cleanupOldBackups();

        console.log('Backup realizado exitosamente:', backup.timestamp);
    } catch (error) {
        console.error('Error al realizar backup:', error);
    }
};

const getAllFromStore = (storeName) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

const cleanupOldBackups = () => {
    const backupKeys = Object.keys(localStorage)
        .filter(key => key.startsWith('mypub_backup_'))
        .sort()
        .reverse();

    // Mantener solo los últimos 5 backups
    backupKeys.slice(5).forEach(key => localStorage.removeItem(key));
};

// Sistema de estadísticas
const updateStatistics = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.isDeveloper) return;

    try {
        const stats = {
            totalUsers: await getStoreCount('users'),
            totalMedia: await getStoreCount('media'),
            totalPublicMedia: await getPublicMediaCount(),
            totalLikes: await getTotalLikes(),
            mostActiveUsers: await getMostActiveUsers()
        };

        displayStatistics(stats);
    } catch (error) {
        handleError(error, 'actualización de estadísticas');
    }
};

const getStoreCount = (storeName) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.count();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

const getPublicMediaCount = async () => {
    const media = await getAllFromStore('media');
    return media.filter(item => item.isPublic).length;
};

const getTotalLikes = async () => {
    const media = await getAllFromStore('media');
    return media.reduce((total, item) => total + (item.likes || 0), 0);
};

const getMostActiveUsers = async () => {
    const media = await getAllFromStore('media');
    const userActivity = {};

    media.forEach(item => {
        userActivity[item.userId] = (userActivity[item.userId] || 0) + 1;
    });

    return Object.entries(userActivity)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([userId, count]) => ({ userId, count }));
};

const displayStatistics = (stats) => {
    const statsContainer = document.getElementById('statisticsContainer');
    if (!statsContainer) return;

    statsContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Estadísticas de mYpuB</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Total de usuarios: ${stats.totalUsers}</li>
                    <li class="list-group-item">Total de archivos: ${stats.totalMedia}</li>
                    <li class="list-group-item">Archivos públicos: ${stats.totalPublicMedia}</li>
                    <li class="list-group-item">Total de likes: ${stats.totalLikes}</li>
                </ul>
                <h6 class="mt-3">Usuarios más activos:</h6>
                <ul class="list-group list-group-flush">
                    ${stats.mostActiveUsers.map(user => `
                        <li class="list-group-item">
                            ${user.userId} - ${user.count} archivos
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
};

// Inicialización de todas las funcionalidades
const initializeApp = () => {
    initDB();
    setupEventListeners();
    setupSearchSystem();
    setupAutoBackup();
    
    // Actualizar estadísticas cada hora
    setInterval(updateStatistics, 60 * 60 * 1000);
    
    // Verificar la sesión actual
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        showMainPanel();
        showWelcomeMessage(currentUser);
        updateUI();
    } else {
        showLoginForm();
    }
};

// Iniciar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initializeApp);
