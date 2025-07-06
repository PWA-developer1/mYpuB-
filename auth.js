class Auth {
    constructor(db) {
        this.db = db;
        this.currentUser = null;
        this.initListeners();
    }

    initListeners() {
        const registrationForm = document.getElementById('registrationForm');
        registrationForm.addEventListener('submit', (e) => this.handleRegistration(e));

        // Help buttons
        document.getElementById('helpBtn').addEventListener('click', () => {
            new bootstrap.Modal(document.getElementById('helpModal')).show();
        });

        document.getElementById('emailHelp').addEventListener('click', () => this.showEmailHelpForm());
        document.getElementById('whatsappHelp').addEventListener('click', () => this.showWhatsAppHelpForm());
    }

    validatePassword(password, isDeveloper = false) {
        if (isDeveloper) {
            return /^Mpteen[a-zA-Z]{0}[0-9]{4}[@#&]{2}$/.test(password);
        }
        return /^[A-Z][a-zA-Z]{5}[0-9]{4}[@#&]{2}$/.test(password);
    }

    async handleRegistration(e) {
        e.preventDefault();
        
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            country: document.getElementById('country').value,
            phone: document.getElementById('phonePrefix').textContent + document.getElementById('phone').value,
            password: document.getElementById('password').value
        };

        // Validate Gmail
        if (!formData.email.endsWith('@gmail.com')) {
            alert('Please use a valid Gmail address');
            return;
        }

        // Validate password
        if (!this.validatePassword(formData.password)) {
            alert('Password does not meet requirements');
            return;
        }

        try {
            await this.db.addUser(formData);
            this.currentUser = formData;
            this.showMainApp();
        } catch (error) {
            alert('Registration failed: ' + error.message);
        }
    }

    showEmailHelpForm() {
        const email = prompt('Please enter your email:');
        const name = prompt('Please enter your full name:');
        
        if (email && name) {
            window.location.href = `mailto:enzemajr@gmail.com?subject=mYpuB Help Request&body=Hola Sr. Desarrollador de mYpub, el usuario ${name}, con el email ${email}, solicita instrucciones para crear una cuenta de acceso a mYpuB y más cosas sobre la aplicación, Gracias!`;
        }
    }

    showWhatsAppHelpForm() {
        const phone = prompt('Please enter your WhatsApp number:');
        const name = prompt('Please enter your full name:');
        
        if (phone && name) {
            const message = encodeURIComponent(`Hola Sr. Desarrollador de mYpub, el usuario ${name}, con el número ${phone}, solicita instrucciones para crear una cuenta de acceso a mYpuB y de más cosas sobre la aplicación, Gracias!`);
            window.open(`https://wa.me/240222084663?text=${message}`, '_blank');
        }
    }

    showMainApp() {
        document.getElementById('auth-container').classList.add('d-none');
        document.getElementById('main-app').classList.remove('d-none');
    }
}
