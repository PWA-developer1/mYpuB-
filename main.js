<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mYpuB - Plataforma de Compartir Medios</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .auth-title {
            font-family: Georgia, serif;
            font-weight: bold;
        }
        .hidden {
            display: none;
        }
        .media-card {
            margin-bottom: 20px;
        }
        .like-counter {
            font-size: 0.9em;
            color: #666;
        }
        .help-panel {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        .section-content {
            display: none;
        }
        .section-content.active {
            display: block;
        }
    </style>
</head>
<body>
    <!-- Registro -->
    <div id="registerForm" class="container mt-5">
        <h2 class="text-center auth-title">Regístrate en mYpuB</h2>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form id="registrationForm" class="p-4 border rounded">
                    <div class="mb-3">
                        <label for="fullName" class="form-label">Nombre completo</label>
                        <input type="text" class="form-control" id="fullName" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Correo electrónico (Gmail)</label>
                        <input type="email" class="form-control" id="email" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Sexo</label>
                        <select class="form-select" id="gender" required>
                            <option value="">Seleccione...</option>
                            <option value="M">Hombre</option>
                            <option value="F">Mujer</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="country" class="form-label">País</label>
                        <select class="form-select" id="country" required></select>
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
                        <small class="form-text text-muted">
                            12 caracteres: 6 letras (primera mayúscula), 4 números, 2 símbolos (@#&)
                        </small>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Registrar</button>
                    <div class="text-center mt-3">
                        <a href="#" id="goToLogin">¿Ya tienes una cuenta? Inicia sesión</a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Login -->
    <div id="loginForm" class="container mt-5 hidden">
        <h2 class="text-center auth-title">Inicie la sesión en mYpuB</h2>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form id="loginFormElement" class="p-4 border rounded">
                    <div class="mb-3">
                        <label for="loginEmail" class="form-label">Correo electrónico</label>
                        <input type="email" class="form-control" id="loginEmail" required>
                    </div>
                    <div class="mb-3">
                        <label for="loginPassword" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="loginPassword" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
                    <div class="text-center mt-3">
                        <a href="#" id="goToRegister">¿No tienes una cuenta? Regístrate</a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Panel Principal -->
    <div id="mainPanel" class="hidden">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container">
                <a class="navbar-brand" href="#">mYpuB</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-section="upload">SUBIR TU</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-section="gallery">GALERÍA</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-section="share">COMPARTIR</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-section="userManagement">GESTIÓN DE USUARIOS</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-section="info">INFÓRMATE</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#" id="logoutBtn">Cerrar sesión</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Sección de Subida -->
        <div id="uploadSection" class="container mt-4 section-content active">
            <h3>Subir Contenido</h3>
            <form id="uploadForm">
                <div class="mb-3">
                    <input type="file" class="form-control" id="mediaFile" accept="image/*,video/*" required>
                </div>
                <div class="mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="privacy" id="public" value="public" checked>
                        <label class="form-check-label" for="public">Público</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="privacy" id="private" value="private">
                        <label class="form-check-label" for="private">Privado</label>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Subir</button>
            </form>
        </div>

        <!-- Sección de Galería -->
        <div id="gallerySection" class="container mt-4 section-content">
            <h3>Galería</h3>
            <div id="mediaGallery" class="row"></div>
        </div>

        <!-- Sección de Compartir -->
        <div id="shareSection" class="container mt-4 section-content">
            <h3>Compartir Archivos</h3>
            <div class="mb-3">
                <label for="userSelect" class="form-label">Seleccionar Usuario</label>
                <select class="form-select" id="userSelect"></select>
            </div>
            <div class="mb-3">
                <label for="mediaSelect" class="form-label">Seleccionar Archivo</label>
                <select class="form-select" id="mediaSelect"></select>
            </div>
            <button id="shareBtn" class="btn btn-primary">Compartir</button>
        </div>

        <!-- Sección de Gestión de Usuarios -->
        <div id="userManagementSection" class="container mt-4 section-content">
            <h3>Gestión de Usuarios</h3>
            <div id="usersList"></div>
        </div>

        <!-- Sección de Información -->
        <div id="infoSection" class="container mt-4 section-content">
            <h3>Información</h3>
            <div class="card">
                <div class="card-body">
                    <h4>Sobre mYpuB</h4>
                    <p>Una plataforma para compartir imágenes y videos de forma segura y social.</p>
                    
                    <h4>Desarrollador</h4>
                    <ul class="list-unstyled">
                        <li><strong>Nombre:</strong> Tarciano ENZEMA NCHAMA</li>
                        <li><strong>Formación:</strong> Finalista universitario de la UNGE</li>
                        <li><strong>Facultad:</strong> Ciencias económicas gestión y administración</li>
                        <li><strong>Departamento:</strong> Informática de gestión empresarial</li>
                        <li><strong>Contacto:</strong> enzemajr@gmail.com</li>
                        <li><strong>Fecha final del desarrollo:</strong> 06/07/2025</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Panel de Ayuda -->
    <div id="helpPanel" class="help-panel">
        <button class="btn btn-info" id="helpBtn">AYUDA</button>
        <div id="helpOptions" class="card mt-2 hidden">
            <div class="card-body">
                <h5 class="card-title">¿Cómo podemos ayudarte?</h5>
                <button class="btn btn-outline-primary mb-2 w-100" id="emailHelpBtn">Consulta por Email</button>
                <button class="btn btn-outline-success w-100" id="whatsappHelpBtn">Consulta por WhatsApp</button>
            </div>
        </div>
    </div>

    <!-- Modal de Ayuda por Email -->
    <div class="modal fade" id="emailHelpModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Consulta por Email</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="emailHelpForm">
                        <div class="mb-3">
                            <label for="helpName" class="form-label">Nombre completo</label>
                            <input type="text" class="form-control" id="helpName" required>
                        </div>
                        <div class="mb-3">
                            <label for="helpEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="helpEmail" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Enviar Consulta</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de Ayuda por WhatsApp -->
    <div class="modal fade" id="whatsappHelpModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Consulta por WhatsApp</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="whatsappHelpForm">
                        <div class="mb-3">
                            <label for="whatsappName" class="form-label">Nombre completo</label>
                            <input type="text" class="form-control" id="whatsappName" required>
                        </div>
                        <div class="mb-3">
                            <label for="whatsappNumber" class="form-label">Número de WhatsApp</label>
                            <input type="tel" class="form-control" id="whatsappNumber" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Enviar Consulta</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize country dropdown
            const countrySelect = document.getElementById('country');
            const phonePrefixSpan = document.getElementById('phonePrefix');
            
            // Lista de países con sus prefijos
            const countries = [
                {name: "Afganistán", code: "AF", phone: "+93"},
                {name: "Albania", code: "AL", phone: "+355"},
                {name: "Alemania", code: "DE", phone: "+49"},
                {name: "Andorra", code: "AD", phone: "+376"},
                {name: "Angola", code: "AO", phone: "+244"},
                {name: "Antigua y Barbuda", code: "AG", phone: "+1-268"},
                {name: "Arabia Saudita", code: "SA", phone: "+966"},
                {name: "Argelia", code: "DZ", phone: "+213"},
                {name: "Argentina", code: "AR", phone: "+54"},
                {name: "Armenia", code: "AM", phone: "+374"},
                {name: "Australia", code: "AU", phone: "+61"},
                {name: "Austria", code: "AT", phone: "+43"},
                {name: "Azerbaiyán", code: "AZ", phone: "+994"},
                {name: "Bahamas", code: "BS", phone: "+1-242"},
                {name: "Bangladés", code: "BD", phone: "+880"},
                {name: "Barbados", code: "BB", phone: "+1-246"},
                {name: "Baréin", code: "BH", phone: "+973"},
                {name: "Bélgica", code: "BE", phone: "+32"},
                {name: "Belice", code: "BZ", phone: "+501"},
                {name: "Benín", code: "BJ", phone: "+229"},
                {name: "Bielorrusia", code: "BY", phone: "+375"},
                {name: "Birmania", code: "MM", phone: "+95"},
                {name: "Bolivia", code: "BO", phone: "+591"},
                {name: "Bosnia y Herzegovina", code: "BA", phone: "+387"},
                {name: "Botsuana", code: "BW", phone: "+267"},
                {name: "Brasil", code: "BR", phone: "+55"},
                {name: "Brunéi", code: "BN", phone: "+673"},
                {name: "Bulgaria", code: "BG", phone: "+359"},
                {name: "Burkina Faso", code: "BF", phone: "+226"},
                {name: "Burundi", code: "BI", phone: "+257"},
                {name: "Bután", code: "BT", phone: "+975"},
                {name: "Cabo Verde", code: "CV", phone: "+238"},
                {name: "Camboya", code: "KH", phone: "+855"},
                {name: "Camerún", code: "CM", phone: "+237"},
                {name: "Canadá", code: "CA", phone: "+1"},
                {name: "Catar", code: "QA", phone: "+974"},
                {name: "Chad", code: "TD", phone: "+235"},
                {name: "Chile", code: "CL", phone: "+56"},
                {name: "China", code: "CN", phone: "+86"},
                {name: "Chipre", code: "CY", phone: "+357"},
                {name: "Colombia", code: "CO", phone: "+57"},
                {name: "Comoras", code: "KM", phone: "+269"},
                {name: "Corea del Norte", code: "KP", phone: "+850"},
                {name: "Corea del Sur", code: "KR", phone: "+82"},
                {name: "Costa de Marfil", code: "CI", phone: "+225"},
                {name: "Costa Rica", code: "CR", phone: "+506"},
                {name: "Croacia", code: "HR", phone: "+385"},
                {name: "Cuba", code: "CU", phone: "+53"},
                {name: "Dinamarca", code: "DK", phone: "+45"},
                {name: "Dominica", code: "DM", phone: "+1-767"},
                {name: "Ecuador", code: "EC", phone: "+593"},
                {name: "Egipto", code: "EG", phone: "+20"},
                {name: "El Salvador", code: "SV", phone: "+503"},
                {name: "Emiratos Árabes Unidos", code: "AE", phone: "+971"},
                {name: "Eritrea", code: "ER", phone: "+291"},
                {name: "Eslovaquia", code: "SK", phone: "+421"},
                {name: "Eslovenia", code: "SI", phone: "+386"},
                {name: "España", code: "ES", phone: "+34"},
                {name: "Estados Unidos", code: "US", phone: "+1"},
                {name: "Estonia", code: "EE", phone: "+372"},
                {name: "Etiopía", code: "ET", phone: "+251"},
                {name: "Filipinas", code: "PH", phone: "+63"},
                {name: "Finlandia", code: "FI", phone: "+358"},
                {name: "Fiyi", code: "FJ", phone: "+679"},
                {name: "Francia", code: "FR", phone: "+33"},
                {name: "Gabón", code: "GA", phone: "+241"},
                {name: "Gambia", code: "GM", phone: "+220"},
                {name: "Georgia", code: "GE", phone: "+995"},
                {name: "Ghana", code: "GH", phone: "+233"},
                {name: "Granada", code: "GD", phone: "+1-473"},
                {name: "Grecia", code: "GR", phone: "+30"},
                {name: "Guatemala", code: "GT", phone: "+502"},
                {name: "Guinea", code: "GN", phone: "+224"},
                {name: "Guinea Ecuatorial", code: "GQ", phone: "+240"},
                {name: "Guinea-Bisáu", code: "GW", phone: "+245"},
                {name: "Guyana", code: "GY", phone: "+592"},
                {name: "Haití", code: "HT", phone: "+509"},
                {name: "Honduras", code: "HN", phone: "+504"},
                {name: "Hungría", code: "HU", phone: "+36"},
                {name: "India", code: "IN", phone: "+91"},
                {name: "Indonesia", code: "ID", phone: "+62"},
                {name: "Irak", code: "IQ", phone: "+964"},
                {name: "Irán", code: "IR", phone: "+98"},
                {name: "Irlanda", code: "IE", phone: "+353"},
                {name: "Islandia", code: "IS", phone: "+354"},
                {name: "Islas Marshall", code: "MH", phone: "+692"},
                {name: "Islas Salomón", code: "SB", phone: "+677"},
                {name: "Israel", code: "IL", phone: "+972"},
                {name: "Italia", code: "IT", phone: "+39"},
                {name: "Jamaica", code: "JM", phone: "+1-876"},
                {name: "Japón", code: "JP", phone: "+81"},
                {name: "Jordania", code: "JO", phone: "+962"},
                {name: "Kazajistán", code: "KZ", phone: "+7"},
                {name: "Kenia", code: "KE", phone: "+254"},
                {name: "Kirguistán", code: "KG", phone: "+996"},
                {name: "Kiribati", code: "KI", phone: "+686"},
                {name: "Kuwait", code: "KW", phone: "+965"},
                {name: "Laos", code: "LA", phone: "+856"},
                {name: "Lesoto", code: "LS", phone: "+266"},
                {name: "Letonia", code: "LV", phone: "+371"},
                {name: "Líbano", code: "LB", phone: "+961"},
                {name: "Liberia", code: "LR", phone: "+231"},
                {name: "Libia", code: "LY", phone: "+218"},
                {name: "Liechtenstein", code: "LI", phone: "+423"},
                {name: "Lituania", code: "LT", phone: "+370"},
                {name: "Luxemburgo", code: "LU", phone: "+352"},
                {name: "Macedonia del Norte", code: "MK", phone: "+389"},
                {name: "Madagascar", code: "MG", phone: "+261"},
                {name: "Malasia", code: "MY", phone: "+60"},
                {name: "Malaui", code: "MW", phone: "+265"},
                {name: "Maldivas", code: "MV", phone: "+960"},
                {name: "Malí", code: "ML", phone: "+223"},
                {name: "Malta", code: "MT", phone: "+356"},
                {name: "Marruecos", code: "MA", phone: "+212"},
                {name: "Mauricio", code: "MU", phone: "+230"},
                {name: "Mauritania", code: "MR", phone: "+222"},
                {name: "México", code: "MX", phone: "+52"},
                {name: "Micronesia", code: "FM", phone: "+691"},
                {name: "Moldavia", code: "MD", phone: "+373"},
                {name: "Mónaco", code: "MC", phone: "+377"},
                {name: "Mongolia", code: "MN", phone: "+976"},
                {name: "Montenegro", code: "ME", phone: "+382"},
                {name: "Mozambique", code: "MZ", phone: "+258"},
                {name: "Namibia", code: "NA", phone: "+264"},
                {name: "Nauru", code: "NR", phone: "+674"},
                {name: "Nepal", code: "NP", phone: "+977"},
                {name: "Nicaragua", code: "NI", phone: "+505"},
                {name: "Níger", code: "NE", phone: "+227"},
                {name: "Nigeria", code: "NG", phone: "+234"},
                {name: "Noruega", code: "NO", phone: "+47"},
                {name: "Nueva Zelanda", code: "NZ", phone: "+64"},
                {name: "Omán", code: "OM", phone: "+968"},
                {name: "Países Bajos", code: "NL", phone: "+31"},
                {name: "Pakistán", code: "PK", phone: "+92"},
                {name: "Palaos", code: "PW", phone: "+680"},
                {name: "Panamá", code: "PA", phone: "+507"},
                {name: "Papúa Nueva Guinea", code: "PG", phone: "+675"},
                {name: "Paraguay", code: "PY", phone: "+595"},
                {name: "Perú", code: "PE", phone: "+51"},
                {name: "Polonia", code: "PL", phone: "+48"},
                {name: "Portugal", code: "PT", phone: "+351"},
                {name: "Reino Unido", code: "GB", phone: "+44"},
                {name: "República Centroafricana", code: "CF", phone: "+236"},
                {name: "República Checa", code: "CZ", phone: "+420"},
                {name: "República del Congo", code: "CG", phone: "+242"},
                {name: "República Democrática del Congo", code: "CD", phone: "+243"},
                {name: "República Dominicana", code: "DO", phone: "+1-809, +1-829, +1-849"},
                {name: "Ruanda", code: "RW", phone: "+250"},
                {name: "Rumanía", code: "RO", phone: "+40"},
                {name: "Rusia", code: "RU", phone: "+7"},
                {name: "Samoa", code: "WS", phone: "+685"},
                {name: "San Cristóbal y Nieves", code: "KN", phone: "+1-869"},
                {name: "San Marino", code: "SM", phone: "+378"},
                {name: "San Vicente y las Granadinas", code: "VC", phone: "+1-784"},
                {name: "Santa Lucía", code: "LC", phone: "+1-758"},
                {name: "Santo Tomé y Príncipe", code: "ST", phone: "+239"},
                {name: "Senegal", code: "SN", phone: "+221"},
                {name: "Serbia", code: "RS", phone: "+381"},
                {name: "Seychelles", code: "SC", phone: "+248"},
                {name: "Sierra Leona", code: "SL", phone: "+232"},
                {name: "Singapur", code: "SG", phone: "+65"},
                {name: "Siria", code: "SY", phone: "+963"},
                {name: "Somalia", code: "SO", phone: "+252"},
                {name: "Sri Lanka", code: "LK", phone: "+94"},
                {name: "Sudáfrica", code: "ZA", phone: "+27"},
                {name: "Sudán", code: "SD", phone: "+249"},
                {name: "Sudán del Sur", code: "SS", phone: "+211"},
                {name: "Suecia", code: "SE", phone: "+46"},
                {name: "Suiza", code: "CH", phone: "+41"},
                {name: "Surinam", code: "SR", phone: "+597"},
                {name: "Tailandia", code: "TH", phone: "+66"},
                {name: "Tanzania", code: "TZ", phone: "+255"},
                {name: "Tayikistán", code: "TJ", phone: "+992"},
                {name: "Timor Oriental", code: "TL", phone: "+670"},
                {name: "Togo", code: "TG", phone: "+228"},
                {name: "Tonga", code: "TO", phone: "+676"},
                {name: "Trinidad y Tobago", code: "TT", phone: "+1-868"},
                {name: "Túnez", code: "TN", phone: "+216"},
                {name: "Turkmenistán", code: "TM", phone: "+993"},
                {name: "Turquía", code: "TR", phone: "+90"},
                {name: "Tuvalu", code: "TV", phone: "+688"},
                {name: "Ucrania", code: "UA", phone: "+380"},
                {name: "Uganda", code: "UG", phone: "+256"},
                {name: "Uruguay", code: "UY", phone: "+598"},
                {name: "Uzbekistán", code: "UZ", phone: "+998"},
                {name: "Vanuatu", code: "VU", phone: "+678"},
                {name: "Venezuela", code: "VE", phone: "+58"},
                {name: "Vietnam", code: "VN", phone: "+84"},
                {name: "Yemen", code: "YE", phone: "+967"},
                {name: "Yibuti", code: "DJ", phone: "+253"},
                {name: "Zambia", code: "ZM", phone: "+260"},
                {name: "Zimbabue", code: "ZW", phone: "+263"}
            ];

            // Ordenar países alfabéticamente
            countries.sort((a, b) => a.name.localeCompare(b.name));

            // Llenar el select con los países
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.code;
                option.textContent = country.name;
                option.dataset.phone = country.phone;
                countrySelect.appendChild(option);
            });

            // Manejar el cambio de país para actualizar el prefijo
            countrySelect.addEventListener('change', function() {
                const selectedOption = this.options[this.selectedIndex];
                const phonePrefix = document.getElementById('phonePrefix');
                
                if (selectedOption.value) {
                    phonePrefix.textContent = selectedOption.dataset.phone;
                } else {
                    phonePrefix.textContent = '+';
                }
            });

            // Toggle between login and register forms
            document.getElementById('goToLogin').addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('registerForm').classList.add('hidden');
                document.getElementById('loginForm').classList.remove('hidden');
            });

            document.getElementById('goToRegister').addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('loginForm').classList.add('hidden');
                document.getElementById('registerForm').classList.remove('hidden');
            });

            // Handle registration form submission
            document.getElementById('registrationForm').addEventListener('submit', function(e) {
                e.preventDefault();
                // Here you would normally send the data to your backend
                alert('Registro exitoso! Redirigiendo al panel principal...');
                document.getElementById('registerForm').classList.add('hidden');
                document.getElementById('mainPanel').classList.remove('hidden');
            });

            // Handle login form submission
            document.getElementById('loginFormElement').addEventListener('submit', function(e) {
                e.preventDefault();
                // Here you would normally validate credentials with your backend
                alert('Inicio de sesión exitoso! Redirigiendo al panel principal...');
                document.getElementById('loginForm').classList.add('hidden');
                document.getElementById('mainPanel').classList.remove('hidden');
            });

            // Handle logout
            document.getElementById('logoutBtn').addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('mainPanel').classList.add('hidden');
                document.getElementById('loginForm').classList.remove('hidden');
            });

            // Navigation between sections in main panel
            document.querySelectorAll('[data-section]').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const section = this.getAttribute('data-section');
                    
                    // Hide all sections
                    document.querySelectorAll('.section-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    
                    // Show selected section
                    document.getElementById(section + 'Section').classList.add('active');
                });
            });

            // Help panel functionality
            document.getElementById('helpBtn').addEventListener('click', function() {
                document.getElementById('helpOptions').classList.toggle('hidden');
            });

            // Email help modal
            document.getElementById('emailHelpBtn').addEventListener('click', function() {
                const emailModal = new bootstrap.Modal(document.getElementById('emailHelpModal'));
                emailModal.show();
            });

            // WhatsApp help modal
            document.getElementById('whatsappHelpBtn').addEventListener('click', function() {
                const whatsappModal = new bootstrap.Modal(document.getElementById('whatsappHelpModal'));
                whatsappModal.show();
            });

            // Handle help form submissions
            document.getElementById('emailHelpForm').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Consulta por email enviada. Nos pondremos en contacto pronto.');
                const emailModal = bootstrap.Modal.getInstance(document.getElementById('emailHelpModal'));
                emailModal.hide();
            });

            document.getElementById('whatsappHelpForm').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Consulta por WhatsApp enviada. Nos pondremos en contacto pronto.');
                const whatsappModal = bootstrap.Modal.getInstance(document.getElementById('whatsappHelpModal'));
                whatsappModal.hide();
            });
        });
    </script>
</body>
</html>
