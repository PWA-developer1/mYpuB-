class Auth {
    constructor(db) {
        this.db = db;
        this.currentUser = null;
        this.initializeListeners();
        this.loadCountriesData();
    }

    async loadCountriesData() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();
            
            const countrySelect = document.getElementById('country');
            countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
                    .forEach(country => {
                const option = document.createElement('option');
                option.value = country.cca2;
                option.textContent = country.name.common;
                option.dataset.phoneCode = country.idd.root + (country.idd.suffixes?.[0] || '');
                countrySelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading countries:', error);
        }
    }

    initializeListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.login(
                document.getElementById('loginEmail').value,
                document.getElementById('loginPassword').value
            );
        });

        // Register form
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.register(this.getRegisterFormData());
        });

        // Country selection
        document.getElementById('country').addEventListener('change', (e) => {
            this.handleCountryChange(e.target.value);
        });

        // Help button
        document.getElementById('helpBtn').addEventListener('click', () => {
            const helpModal = new bootstrap.Modal(document.getElementById('helpModal'));
            helpModal.show();
        });

        // Email help
        document.getElementById('emailHelpBtn').addEventListener('click', () => {
            this.showEmailHelpForm();
        });

        // WhatsApp help
        document.getElementById('whatsappHelpBtn').addEventListener('click', () => {
            this.showWhatsAppHelpForm();
        });
    }

    getRegisterFormData() {
        return {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            country: document.getElementById('country').value,
            city: document.getElementById('city').value,
            street: document.getElementById('street').value,
            phone: document.getElementById('phonePrefix').textContent + document.getElementById('phone').value,
            password: document.getElementById('password').value
        };
    }

    async login(email, password) {
        try {
            const user = await this.db.getUser(email);
            if (user && user.password === password) {
                this.currentUser = user;
                this.showMainApp();
            } else {
                alert('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error en login:', error);
            alert('Error al iniciar sesión');
        }
    }

    async register(userData) {
        if (!this.validateRegisterData(userData)) {
            return;
        }

        try {
            await this.db.addUser(userData);
            this.currentUser = userData;
            this.showMainApp();
        } catch (error) {
            console.error('Error en registro:', error);
            alert('Error al registrar usuario');
        }
    }

    validateRegisterData(userData) {
        // Validar email (debe ser Gmail)
        if (!userData.email.endsWith('@gmail.com')) {
            alert('El email debe ser de Gmail');
            return false;
        }

        // Validar contraseña
        const passwordRegex = /^[A-Z][a-z]{5}\d{4}[@#&]{2}$/;
        if (!passwordRegex.test(userData.password)) {
            alert('La contraseña no cumple con el formato requerido');
            return false;
        }

        // Validar si es contraseña de desarrollador
        if (userData.password.startsWith('Mpteen')) {
            userData.isDeveloper = true;
        }

        return true;
    }

    async handleCountryChange(countryCode) {
        const citySelect = document.getElementById('city');
        const streetSelect = document.getElementById('street');
        const phonePrefix = document.getElementById('phonePrefix');
        
        // Set phone prefix
        const selectedOption = document.querySelector(`#country option[value="${countryCode}"]`);
        if (selectedOption) {
            phonePrefix.textContent = selectedOption.dataset.phoneCode;
        }

        // Load cities (using a geocoding API would be ideal here)
        try {
            // Simulated API call - replace with actual API
            const response = await fetch(`https://api.example.com/cities/${countryCode}`);
            const cities = await response.json();
            
            citySelect.innerHTML = '<option value="">Seleccione una ciudad</option>';
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city.id;
                option.textContent = city.name;
                citySelect.appendChild(option);
            });
            
            citySelect.disabled = false;
            streetSelect.disabled = true;
            streetSelect.innerHTML = '<option value="">Seleccione una calle</option>';
        } catch (error) {
            console.error('Error loading cities:', error);
        }
    }

    showMainApp() {
        document.getElementById('auth-section').classList.add('d-none');
        document.getElementById('main-section').classList.remove('d-none');
        
        if (this.currentUser.isDeveloper) {
            document.body.classList.add('is-admin');
        }
    }

    showEmailHelpForm() {
        const modalBody = document.querySelector('#helpModal .modal-body');
        modalBody.innerHTML = `
            <form id="emailHelpForm" class="help-form">
                <div class="mb-3">
                    <label for="helpName" class="form-label">Nombre completo</label>
                    <input type="text" class="form-control" id="helpName" required>
                </div>
                <div class="mb-3">
                    <label for="helpEmail" class="form-label">Email</label>
                    <input type="email" class="form-control" id="helpEmail" required>
                </div>
                <button type="submit" class="btn btn-primary">Enviar consulta</button>
            </form>
        `;

        document.getElementById('emailHelpForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendEmailHelp(
                document.getElementById('helpName').value,
                document.getElementById('helpEmail').value
            );
        });
    }

    showWhatsAppHelpForm() {
        const modalBody = document.querySelector('#helpModal .modal-body');
        modalBody.innerHTML = `
            <form id="whatsappHelpForm" class="help-form">
                <div class="mb-3">
                    <label for="helpNameWA" class="form-label">Nombre completo</label>
                    <input type="text" class="form-control" id="helpNameWA" required>
                </div>
                <div class="mb-3">
                    <label for="helpPhone" class="form-label">Número de WhatsApp</label>
                    <input type="tel" class="form-control" id="helpPhone" required>
                </div>
                <button type="submit" class="btn btn-success">Enviar consulta</button>
            </form>
        `;

        document.getElementById('whatsappHelpForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendWhatsAppHelp(
                document.getElementById('helpNameWA').value,
                document.getElementById('helpPhone').value
            );
        });
    }

    async sendEmailHelp(name, email) {
        const message = `Hola Sr. Desarrollador de mYpub, el usuario ${name}, con el email ${email}, solicita instrucciones para crear una cuenta de acceso a mYpuB y más cosas sobre la aplicación, Gracias!`;
        
        // En un entorno real, esto se manejaría a través de un servidor
        const mailtoLink = `mailto:enzemajr@gmail.com?subject=Ayuda mYpuB&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;
    }

    async sendWhatsAppHelp(name, phone) {
        const message = `Hola Sr. Desarrollador de mYpuB, el usuario ${name}, con el número ${phone}, solicita instrucciones para crear una cuenta de acceso a mYpuB y de más cosas sobre la aplicación, Gracias!`;
        
        // Crear enlace de WhatsApp
        const whatsappLink = `https://wa.me/240222084663?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    }
}

// Initialize authentication
const auth = new Auth(db);
