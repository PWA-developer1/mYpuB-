class Auth {
    constructor(database) {
        this.db = database;
        this.currentUser = null;
        this.initializeListeners();
    }

    initializeListeners() {
        document.getElementById('login-form').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('register-form').addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('help-btn').addEventListener('click', () => this.showHelpModal());
        document.getElementById('email-help').addEventListener('click', () => this.handleEmailHelp());
        document.getElementById('whatsapp-help').addEventListener('click', () => this.handleWhatsAppHelp());
    }

    validateEmail(email) {
        return email.endsWith('@gmail.com');
    }

    validatePassword(password, isDeveloper = false) {
        if (isDeveloper) {
            return /^Mpteen\d{4}[@#&]{2}$/.test(password);
        }
        return /^[A-Z][a-z]{5}\d{4}[@#&]{2}$/.test(password);
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const user = await this.db.getUser(email);
            if (user && user.password === password) {
                this.currentUser = user;
                this.showWelcomeMessage(user);
                this.showMainApp();
            } else {
                alert('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error al iniciar sesión');
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const formData = {
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            country: document.getElementById('country').value,
            phone: document.getElementById('phone-prefix').textContent + document.getElementById('phone').value,
            password: document.getElementById('password').value
        };

        if (!this.validateEmail(formData.email)) {
            alert('Por favor, use una dirección de Gmail válida');
            return;
        }

        if (!this.validatePassword(formData.password)) {
            alert('La contraseña no cumple con los requisitos');
            return;
        }

        try {
            await this.db.addUser(formData);
            this.currentUser = formData;
            this.showWelcomeMessage(formData);
            this.showMainApp();
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Error al registrar usuario');
        }
    }

    showWelcomeMessage(user) {
        const prefix = user.gender === 'male' ? 'Sr.' : 'Sra.';
        alert(`¡Bienvenido/a al sistema ${prefix} ${user.fullname}!`);
    }

    showMainApp() {
        document.getElementById('auth-container').classList.add('d-none');
        document.getElementById('main-container').classList.remove('d-none');
    }

    showHelpModal() {
        const modal = new bootstrap.Modal(document.getElementById('helpModal'));
        modal.show();
    }

    handleEmailHelp() {
        const name = prompt('Por favor, ingrese su nombre completo:');
        const email = prompt('Por favor, ingrese su dirección de correo electrónico:');
        
        if (name && email) {
            const mailtoLink = `mailto:enzemajr@gmail.com?subject=Consulta sobre mYpuB&body=Hola Sr. Desarrollador de mYpub, el usuario ${name}, con el email ${email}, solicita instrucciones para crear una cuenta de acceso a mYpuB y más cosas sobre la aplicación, Gracias!`;
            window.location.href = mailtoLink;
        }
    }

    handleWhatsAppHelp() {
        const name = prompt('Por favor, ingrese su nombre completo:');
        const phone = prompt('Por favor, ingrese su número de WhatsApp:');
        
        if (name && phone) {
            const message = encodeURIComponent(`Hola Sr. Desarrollador de mYpuB, el usuario ${name}, con el número ${phone}, solicita instrucciones para crear una cuenta de acceso a mYpuB y de más cosas sobre la aplicación, Gracias!`);
            window.open(`https://wa.me/240222084663?text=${message}`, '_blank');
        }
    }
}
