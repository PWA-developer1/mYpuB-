<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mYpuB</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .hidden { display: none; }
        .media-card { margin-bottom: 20px; }
        #helpOptions { position: fixed; bottom: 20px; right: 20px; z-index: 1000; }
        .help-btn { width: 60px; height: 60px; border-radius: 50%; font-size: 24px; }
        .loading { position: relative; }
        .loading::after {
            content: "Cargando...";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>
<body class="bg-light">
    <div class="container py-5">
        <!-- Login Form -->
        <div id="loginForm">
            <div class="card mx-auto" style="max-width: 500px;">
                <div class="card-header bg-primary text-white">
                    <h3 class="text-center">Iniciar Sesión</h3>
                </div>
                <div class="card-body">
                    <form id="loginFormElement">
                        <div class="mb-3">
                            <label for="loginEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="loginEmail" required>
                        </div>
                        <div class="mb-3">
                            <label for="loginPassword" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="loginPassword" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Ingresar</button>
                        <p class="text-center mt-3">¿No tienes cuenta? <a href="#" id="goToRegister">Regístrate</a></p>
                    </form>
                </div>
            </div>
        </div>

        <!-- Registration Form -->
        <div id="registerForm" class="hidden">
            <div class="card mx-auto" style="max-width: 500px;">
                <div class="card-header bg-success text-white">
                    <h3 class="text-center">Registro de Usuario</h3>
                </div>
                <div class="card-body">
                    <form id="registrationForm">
                        <div class="mb-3">
                            <label for="fullName" class="form-label">Nombre Completo</label>
                            <input type="text" class="form-control" id="fullName" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" required>
                            <small class="text-muted">Debe terminar en @gmail.com</small>
                        </div>
                        <div class="mb-3">
                            <label for="gender" class="form-label">Género</label>
                            <select class="form-select" id="gender" required>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="country" class="form-label">País</label>
                            <select class="form-select" id="country" required></select>
                        </div>
                        <div class="mb-3">
                            <label for="city" class="form-label">Ciudad</label>
                            <select class="form-select" id="city" required disabled>
                                <option value="">Primero seleccione un país</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="street" class="form-label">Calle</label>
                            <select class="form-select" id="street" required disabled>
                                <option value="">Primero seleccione una ciudad</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">Teléfono</label>
                            <div class="input-group">
                                <span class="input-group-text" id="phonePrefix">+</span>
                                <input type="tel" class="form-control" id="phone" required>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="password" required>
                            <small class="text-muted">Debe comenzar con mayúscula, 5 letras, 4 números y terminar con 2 símbolos (@, # o &)</small>
                        </div>
                        <button type="submit" class="btn btn-success w-100">Registrarse</button>
                        <p class="text-center mt-3">¿Ya tienes cuenta? <a href="#" id="goToLogin">Inicia sesión</a></p>
                    </form>
                </div>
            </div>
        </div>

        <!-- Main Panel -->
        <div id="mainPanel" class="hidden">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">mYpuB</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-section="upload">Subir</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-section="gallery">Galería</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-section="share">Compartir</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" data-section="users">Usuarios</a>
                            </li>
                        </ul>
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <button id="logoutBtn" class="btn btn-outline-light">Cerrar Sesión</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <!-- Upload Section -->
            <div id="uploadSection" class="section-content">
                <div class="card">
                    <div class="card-header">
                        <h4>Subir Archivo</h4>
                    </div>
                    <div class="card-body">
                        <form id="uploadForm">
                            <div class="mb-3">
                                <label for="mediaFile" class="form-label">Seleccionar archivo</label>
                                <input class="form-control" type="file" id="mediaFile" required>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="public">
                                <label class="form-check-label" for="public">Hacer público</label>
                            </div>
                            <button type="submit" class="btn btn-primary">Subir</button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Gallery Section -->
            <div id="gallerySection" class="section-content hidden">
                <div class="card">
                    <div class="card-header">
                        <h4>Galería de Medios</h4>
                    </div>
                    <div class="card-body">
                        <div class="row" id="mediaGallery"></div>
                    </div>
                </div>
            </div>

            <!-- Share Section -->
            <div id="shareSection" class="section-content hidden">
                <div class="card">
                    <div class="card-header">
                        <h4>Compartir Archivos</h4>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label for="userSelect" class="form-label">Seleccionar Usuario</label>
                            <select class="form-select" id="userSelect"></select>
                        </div>
                        <div class="mb-3">
                            <label for="mediaSelect" class="form-label">Seleccionar Archivo</label>
                            <select class="form-select" id="mediaSelect"></select>
                        </div>
                        <button id="shareBtn" class="btn btn-success">Compartir</button>
                    </div>
                </div>
            </div>

            <!-- Users Section -->
            <div id="usersSection" class="section-content hidden">
                <div class="card">
                    <div class="card-header">
                        <h4>Administración de Usuarios</h4>
                    </div>
                    <div class="card-body">
                        <div id="usersList"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Help Button -->
    <div id="helpBtn" class="btn btn-primary help-btn position-fixed">?</div>
    <div id="helpOptions" class="hidden">
        <button id="emailHelpBtn" class="btn btn-info mb-2">Email</button>
        <button id="whatsappHelpBtn" class="btn btn-success">WhatsApp</button>
    </div>

    <!-- Email Help Modal -->
    <div class="modal fade" id="emailHelpModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Ayuda por Email</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="emailHelpForm">
                        <div class="mb-3">
                            <label for="helpName" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="helpName" required>
                        </div>
                        <div class="mb-3">
                            <label for="helpEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="helpEmail" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- WhatsApp Help Modal -->
    <div class="modal fade" id="whatsappHelpModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Ayuda por WhatsApp</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="whatsappHelpForm">
                        <div class="mb-3">
                            <label for="whatsappName" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="whatsappName" required>
                        </div>
                        <div class="mb-3">
                            <label for="whatsappNumber" class="form-label">Número de WhatsApp</label>
                            <input type="tel" class="form-control" id="whatsappNumber" required>
                        </div>
                        <button type="submit" class="btn btn-success">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Database initialization
        let db;
        const DB_NAME = 'mYpuBDB';
        const DB_VERSION = 2;

        // Location API service (mock implementation)
        class LocationService {
            static async getCountries() {
                try {
                    const response = await fetch('https://restcountries.com/v3.1/all');
                    const countries = await response.json();
                    return countries.map(country => ({
                        name: country.name.common,
                        code: country.cca2,
                        phonePrefix: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ''),
                        flag: country.flags?.png
                    })).sort((a, b) => a.name.localeCompare(b.name));
                } catch (error) {
                    console.error('Error fetching countries:', error);
                    // Fallback data
                    return [
                        { name: 'Estados Unidos', code: 'US', phonePrefix: '+1', flag: '' },
                        { name: 'España', code: 'ES', phonePrefix: '+34', flag: '' },
                        { name: 'México', code: 'MX', phonePrefix: '+52', flag: '' },
                        // ... más países de respaldo
                    ];
                }
            }

            static async getCities(countryCode) {
                // En una implementación real, esto haría una llamada a una API de geolocalización
                // Aquí usamos datos de ejemplo para demostración
                await new Promise(resolve => setTimeout(resolve, 500)); // Simular carga

                const citiesByCountry = {
                    'US': ['Nueva York', 'Los Ángeles', 'Chicago', 'Houston', 'Phoenix', 'Filadelfia'],
                    'ES': ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga'],
                    'MX': ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León'],
'GQ': ['Malabo', 'Bata', 'Ebibeyín', 'Mongomo', 'Evinayong'],
                    // ... más países y ciudades
                };

                return citiesByCountry[countryCode] || [
                    'Ciudad Principal', 'Ciudad Secundaria', 'Otra Ciudad'
                ];
            }

            static async getStreets(countryCode, city) {
                // En una implementación real, esto haría una llamada a una API de geolocalización
                await new Promise(resolve => setTimeout(resolve, 300)); // Simular carga

                const streetTypes = ['Calle', 'Avenida', 'Bulevar', 'Paseo', 'Camino'];
                const streetNames = ['Principal', 'Central', 'Norte', 'Sur', 'Este', 'Oeste', 'Libertad', 'Independencia'];
                
                return Array.from({ length: 10 }, (_, i) => 
                    `${streetTypes[i % streetTypes.length]} ${streetNames[i % streetNames.length]} ${i + 1}`
                );
            }
        }

        const initDB = () => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = (event) => {
                console.error('Database error:', event.target.error);
            };

            request.onupgradeneeded = (event) => {
                db = event.target.result;

                // Users store
                if (!db.objectStoreNames.contains('users')) {
                    const userStore = db.createObjectStore('users', { keyPath: 'email' });
                    userStore.createIndex('fullName', 'fullName', { unique: false });
                    userStore.createIndex('country', 'country', { unique: false });
                }

                // Media store
                if (!db.objectStoreNames.contains('media')) {
                    const mediaStore = db.createObjectStore('media', { keyPath: 'id', autoIncrement: true });
                    mediaStore.createIndex('userId', 'userId', { unique: false });
                    mediaStore.createIndex('timestamp', 'timestamp', { unique: false });
                }

                // Locations cache store
                if (!db.objectStoreNames.contains('locations')) {
                    const locationsStore = db.createObjectStore('locations', { keyPath: 'id' });
                    locationsStore.createIndex('type', 'type', { unique: false });
                    locationsStore.createIndex('parentId', 'parentId', { unique: false });
                }
            };

            request.onsuccess = (event) => {
                db = event.target.result;
                console.log('Database initialized successfully');
            };
        };

        // Initialize the database when the page loads
        document.addEventListener('DOMContentLoaded', async () => {
            initDB();
            await loadCountries();
            initializeUI();
            setupEventListeners();
        });

        // UI initialization
        const initializeUI = () => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                showMainPanel();
                showWelcomeMessage(currentUser);
            } else {
                showLoginForm();
            }
        };

        // Country data loading
        const loadCountries = async () => {
            try {
                const countrySelect = document.getElementById('country');
                countrySelect.innerHTML = '<option value="" disabled selected>Cargando países...</option>';
                countrySelect.disabled = true;

                const countries = await LocationService.getCountries();
                
                countrySelect.innerHTML = '';
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Seleccione un país';
                defaultOption.selected = true;
                defaultOption.disabled = true;
                countrySelect.appendChild(defaultOption);

                countries.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country.code;
                    option.dataset.prefix = country.phonePrefix;
                    option.textContent = country.name;
                    countrySelect.appendChild(option);
                });

                countrySelect.disabled = false;
            } catch (error) {
                console.error('Error loading countries:', error);
                alert('Error al cargar la lista de países. Por favor recargue la página.');
            }
        };

        // Load cities for selected country
        const loadCities = async (countryCode) => {
            const citySelect = document.getElementById('city');
            const streetSelect = document.getElementById('street');
            
            citySelect.innerHTML = '<option value="" disabled selected>Cargando ciudades...</option>';
            citySelect.disabled = true;
            streetSelect.innerHTML = '<option value="">Primero seleccione una ciudad</option>';
            streetSelect.disabled = true;
            
            try {
                const cities = await LocationService.getCities(countryCode);
                
                citySelect.innerHTML = '';
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Seleccione una ciudad';
                defaultOption.selected = true;
                defaultOption.disabled = true;
                citySelect.appendChild(defaultOption);
                
                cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
                
                citySelect.disabled = false;
            } catch (error) {
                console.error('Error loading cities:', error);
                citySelect.innerHTML = '<option value="" disabled selected>Error al cargar ciudades</option>';
            }
        };

        // Load streets for selected city
        const loadStreets = async (countryCode, city) => {
            const streetSelect = document.getElementById('street');
            
            streetSelect.innerHTML = '<option value="" disabled selected>Cargando calles...</option>';
            streetSelect.disabled = true;
            
            try {
                const streets = await LocationService.getStreets(countryCode, city);
                
                streetSelect.innerHTML = '';
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Seleccione una calle';
                defaultOption.selected = true;
                defaultOption.disabled = true;
                streetSelect.appendChild(defaultOption);
                
                streets.forEach(street => {
                    const option = document.createElement('option');
                    option.value = street;
                    option.textContent = street;
                    streetSelect.appendChild(option);
                });
                
                streetSelect.disabled = false;
            } catch (error) {
                console.error('Error loading streets:', error);
                streetSelect.innerHTML = '<option value="" disabled selected>Error al cargar calles</option>';
            }
        };

        // Event listeners setup
        const setupEventListeners = () => {
            // Navigation
            document.getElementById('goToLogin').addEventListener('click', showLoginForm);
            document.getElementById('goToRegister').addEventListener('click', showRegisterForm);
            document.getElementById('logoutBtn').addEventListener('click', logout);

            // Forms
            document.getElementById('registrationForm').addEventListener('submit', handleRegistration);
            document.getElementById('loginFormElement').addEventListener('submit', handleLogin);
            document.getElementById('uploadForm').addEventListener('submit', handleUpload);

            // Country select - cascading effect
            document.getElementById('country').addEventListener('change', async (e) => {
                const selectedOption = e.target.options[e.target.selectedIndex];
                document.getElementById('phonePrefix').textContent = selectedOption.dataset.prefix || '+';
                
                if (e.target.value) {
                    await loadCities(e.target.value);
                } else {
                    document.getElementById('city').innerHTML = '<option value="">Primero seleccione un país</option>';
                    document.getElementById('city').disabled = true;
                    document.getElementById('street').innerHTML = '<option value="">Primero seleccione una ciudad</option>';
                    document.getElementById('street').disabled = true;
                }
            });

            // City select - cascading effect
            document.getElementById('city').addEventListener('change', async (e) => {
                const countrySelect = document.getElementById('country');
                if (e.target.value && countrySelect.value) {
                    await loadStreets(countrySelect.value, e.target.value);
                } else {
                    document.getElementById('street').innerHTML = '<option value="">Primero seleccione una ciudad</option>';
                    document.getElementById('street').disabled = true;
                }
            });

            // Help system
            document.getElementById('helpBtn').addEventListener('click', toggleHelpPanel);
            document.getElementById('emailHelpBtn').addEventListener('click', showEmailHelpModal);
            document.getElementById('whatsappHelpBtn').addEventListener('click', showWhatsappHelpModal);
            document.getElementById('emailHelpForm').addEventListener('submit', handleEmailHelp);
            document.getElementById('whatsappHelpForm').addEventListener('submit', handleWhatsappHelp);

            // Navigation menu
            document.querySelectorAll('[data-section]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    showSection(e.target.dataset.section);
                });
            });
        };

        // User registration
        const handleRegistration = async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!validateEmail(email) || !validatePassword(password)) {
                alert('Por favor, verifica los requisitos de email y contraseña');
                return;
            }

            const user = {
                fullName: document.getElementById('fullName').value,
                email: email,
                gender: document.getElementById('gender').value,
                country: document.getElementById('country').options[document.getElementById('country').selectedIndex].text,
                city: document.getElementById('city').value,
                street: document.getElementById('street').value,
                phone: document.getElementById('phonePrefix').textContent + document.getElementById('phone').value,
                password: password,
                isAdmin: password.startsWith('Mpteen')
            };

            try {
                const transaction = db.transaction(['users'], 'readwrite');
                const userStore = transaction.objectStore('users');
                await userStore.add(user);
                
                localStorage.setItem('currentUser', JSON.stringify(user));
                showMainPanel();
                showWelcomeMessage(user);
            } catch (error) {
                console.error('Error in registration:', error);
                alert('Error al registrar el usuario. El email ya puede estar en uso.');
            }
        };

        // Validation functions
        const validateEmail = (email) => {
            return email.endsWith('@gmail.com');
        };

        const validatePassword = (password) => {
            const regex = /^[A-Z][a-zA-Z]{5}[0-9]{4}[@#&]{2}$/;
            return regex.test(password);
        };

        // Login handling
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
                    showMainPanel();
                    showWelcomeMessage(user);
                } else {
                    alert('Credenciales inválidas');
                }
            } catch (error) {
                console.error('Error in login:', error);
                alert('Error al iniciar sesión');
            }
        };

        // Welcome message
        const showWelcomeMessage = (user) => {
            const prefix = user.gender === 'M' ? 'Sr.' : 'Sra.';
            alert(`¡Bienvenido/a al sistema, ${prefix} ${user.fullName}!`);
        };

        // Media upload
        const handleUpload = async (e) => {
            e.preventDefault();

            const file = document.getElementById('mediaFile').files[0];
            const isPublic = document.getElementById('public').checked;
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));

            if (!file || !currentUser) return;

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
                    console.error('Error uploading file:', error);
                    alert('Error al subir el archivo');
                }
            };

            reader.readAsDataURL(file);
        };

        // Gallery loading
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
                console.error('Error loading gallery:', error);
            }
        };

        // Media card creation
        const createMediaCard = (media) => {
            const card = document.createElement('div');
            card.className = 'col-md-4 media-card';
            
            const content = document.createElement('div');
            content.className = 'card';
            
            const mediaElement = media.type.startsWith('image/') 
                ? `<img src="${media.data}" class="card-img-top" alt="Media content">`
                : `<video src="${media.data}" controls class="card-img-top">Your browser does not support video.</video>`;

            content.innerHTML = `
                ${mediaElement}
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button class="btn btn-sm btn-outline-primary like-btn">
                                👍 <span class="like-count">${media.likes}</span>
                            </button>
                            <button class="btn btn-sm btn-outline-danger dislike-btn">
                                👎 <span class="dislike-count">${media.dislikes}</span>
                            </button>
                        </div>
                        ${media.isPublic ? '<button class="btn btn-sm btn-success">Descargar</button>' : ''}
                    </div>
                </div>
            `;

            // Add event listeners for likes and downloads
            const likeBtn = content.querySelector('.like-btn');
            const dislikeBtn = content.querySelector('.dislike-btn');
            
            likeBtn.addEventListener('click', () => handleLike(media.id, true));
            dislikeBtn.addEventListener('click', () => handleLike(media.id, false));

            const downloadBtn = content.querySelector('.btn-success');
            if (downloadBtn) {
                downloadBtn.addEventListener('click', () => {
                    const link = document.createElement('a');
                    link.href = media.data;
                    link.download = `mypub_media_${media.id}${media.type.startsWith('image/') ? '.jpg' : '.mp4'}`;
                    link.click();
                });
            }

            card.appendChild(content);
            return card;
        };

        // Like/Dislike handling
        const handleLike = async (mediaId, isLike) => {
            try {
                const transaction = db.transaction(['media'], 'readwrite');
                const mediaStore = transaction.objectStore('media');
                const media = await mediaStore.get(mediaId);

                if (isLike) {
                    media.likes++;
                } else {
                    media.dislikes++;
                }

                await mediaStore.put(media);
                loadGallery();
            } catch (error) {
                console.error('Error updating likes:', error);
            }
        };

        // Help system
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

        const handleEmailHelp = (e) => {
            e.preventDefault();
            const name = document.getElementById('helpName').value;
            const email = document.getElementById('helpEmail').value;
            
            const mailtoLink = `mailto:enzemajr@gmail.com?subject=Ayuda%20mYpuB&body=Hola%20Sr.%20Desarrollador%20de%20mYpuB%2C%0A%0AEl%20usuario%20${name}%2C%20con%20el%20email%20${email}%2C%20solicita%20instrucciones%20para%20crear%20una%20cuenta%20de%20acceso%20a%20mYpuB%20y%20más%20cosas%20sobre%20la%20aplicación.%0A%0AGracias!`;
            
            window.location.href = mailtoLink;
        };

        const handleWhatsappHelp = (e) => {
            e.preventDefault();
            const name = document.getElementById('whatsappName').value;
            const number = document.getElementById('whatsappNumber').value;
            
            const message = `Hola Sr. Desarrollador de mYpuB, el usuario ${name}, con el número ${number}, solicita instrucciones para crear una cuenta de acceso a mYpuB y de más cosas sobre la aplicación. Gracias!`;
            const whatsappLink = `https://wa.me/240222084663?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappLink, '_blank');
        };

        // UI navigation
        const showSection = (sectionId) => {
            document.querySelectorAll('.section-content').forEach(section => {
                section.classList.add('hidden');
            });
            
            const currentSection = document.getElementById(`${sectionId}Section`);
            if (currentSection) {
                currentSection.classList.remove('hidden');
                if (sectionId === 'gallery') {
                    loadGallery();
                } else if (sectionId === 'share') {
                    loadShareSection();
                } else if (sectionId === 'users') {
                    loadUserManagement();
                }
            }
        };

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

        // Welcome message modification
        const showWelcomeMessage = (user) => {
            const prefix = user.gender === 'M' ? 'Bienvenido' : 'Bienvenida';
            const title = user.gender === 'M' ? 'Sr.' : 'Sra.';
            alert(`${prefix} a <span style="font-family: Georgia, serif; font-weight: bold;">mYpuB</span>, ${title} ${user.fullName}!`);
        };

        const logout = () => {
            localStorage.removeItem('currentUser');
            showLoginForm();
        };

        // User management functions (developer only)
        const loadUserManagement = async () => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser || !currentUser.isAdmin) return;

            try {
                const transaction = db.transaction(['users'], 'readonly');
                const userStore = transaction.objectStore('users');
                const users = await userStore.getAll();

                const usersList = document.getElementById('usersList');
                usersList.innerHTML = '';

                users.forEach(user => {
                    const userCard = document.createElement('div');
                    userCard.className = 'card mb-3';
                    userCard.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${user.fullName}</h5>
                            <p class="card-text">Email: ${user.email}</p>
                            <p class="card-text">Teléfono: ${user.phone}</p>
                            <button class="btn btn-warning btn-sm me-2" onclick="blockUser('${user.email}')">
                                ${user.blocked ? 'Desbloquear' : 'Bloquear'}
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.email}')">
                                Eliminar
                            </button>
                        </div>
                    `;
                    usersList.appendChild(userCard);
                });
            } catch (error) {
                console.error('Error loading users:', error);
            }
        };

        const blockUser = async (email) => {
            try {
                const transaction = db.transaction(['users'], 'readwrite');
                const userStore = transaction.objectStore('users');
                const user = await userStore.get(email);
                
                user.blocked = !user.blocked;
                await userStore.put(user);
                loadUserManagement();
            } catch (error) {
                console.error('Error blocking user:', error);
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
                console.error('Error deleting user:', error);
            }
        };

        // Share functionality
        const loadShareSection = async () => {
            try {
                const transaction = db.transaction(['users', 'media'], 'readonly');
                const userStore = transaction.objectStore('users');
                const mediaStore = transaction.objectStore('media');
                
                const users = await userStore.getAll();
                const media = await mediaStore.getAll();
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));

                const userSelect = document.getElementById('userSelect');
                const mediaSelect = document.getElementById('mediaSelect');

                userSelect.innerHTML = '';
                mediaSelect.innerHTML = '';

                users.forEach(user => {
                    if (user.email !== currentUser.email) {
                        const option = document.createElement('option');
                        option.value = user.email;
                        option.textContent = user.fullName;
                        userSelect.appendChild(option);
                    }
                });

                media.forEach(item => {
                    if (item.userId === currentUser.email) {
                        const option = document.createElement('option');
                        option.value = item.id;
                        option.textContent = `Media ${item.id} (${item.type.split('/')[0]})`;
                        mediaSelect.appendChild(option);
                    }
                });
            } catch (error) {
                console.error('Error loading share options:', error);
            }
        };

        document.getElementById('shareBtn').addEventListener('click', async () => {
            const selectedUser = document.getElementById('userSelect').value;
            const selectedMedia = document.getElementById('mediaSelect').value;

            if (!selectedUser || !selectedMedia) {
                alert('Por favor, seleccione un usuario y un archivo para compartir');
                return;
            }

            try {
                const transaction = db.transaction(['media'], 'readonly');
                const mediaStore = transaction.objectStore('media');
                const media = await mediaStore.get(parseInt(selectedMedia));

                // Create a new shared media entry
                const sharedMedia = {
                    ...media,
                    id: undefined, // Let autoIncrement handle the new ID
                    originalId: media.id,
                    userId: selectedUser,
                    sharedBy: JSON.parse(localStorage.getItem('currentUser')).email,
                    timestamp: new Date().toISOString()
                };

                const shareTransaction = db.transaction(['media'], 'readwrite');
                const shareStore = shareTransaction.objectStore('media');
                await shareStore.add(sharedMedia);

                alert('Archivo compartido exitosamente');
            } catch (error) {
                console.error('Error sharing media:', error);
                alert('Error al compartir el archivo');
            }
        });

        // Make functions available globally for HTML onclick handlers
        window.blockUser = blockUser;
        window.deleteUser = deleteUser;
    </script>
</body>
</html>
