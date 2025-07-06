class Auth {
    constructor(db) {
        this.db = db;
        this.currentUser = null;
        this.initListeners();
    }

    initListeners() {
        const registrationForm = document.getElementById('registrationForm');
        registrationForm.addEventListener('submit', (e) => this.handleRegistration(e));

        // Help modal listeners
        document.getElementById('helpBtn').addEventListener('click', () => {
            new bootstrap.Modal(document.getElementById('helpModal')).show();
        });

        document.getElementById('emailHelp').addEventListener('click', () => {
            const name = document.getElementById('helpName').value;
            if (!name) {
                alert('Please enter your name first');
                return;
            }
            const subject = encodeURIComponent('mYpuB Help Request');
            const body = encodeURIComponent(`Hola Sr. Desarrollador de mYpub, el usuario ${name}, solicita instrucciones para crear una cuenta de acceso a mYpuB y más cosas sobre la aplicación, Gracias!`);
            window.location.href = `mailto:enzemajr@gmail.com?subject=${subject}&body=${body}`;
            bootstrap.Modal.getInstance(document.getElementById('helpModal')).hide();
        });

        document.getElementById('whatsappHelp').addEventListener('click', () => {
            const name = document.getElementById('helpName').value;
            if (!name) {
                alert('Please enter your name first');
                return;
            }
            const message = encodeURIComponent(`Hola Sr. Desarrollador de mYpub, el usuario ${name}, solicita instrucciones para crear una cuenta de acceso a mYpuB y de más cosas sobre la aplicación, Gracias!`);
            window.open(`https://wa.me/240222084663?text=${message}`, '_blank');
            bootstrap.Modal.getInstance(document.getElementById('helpModal')).hide();
        });
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
            city: document.getElementById('city').value,
            street: document.getElementById('street').value,
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

    showMainApp() {
        document.getElementById('auth-container').classList.add('d-none');
        document.getElementById('main-app').classList.remove('d-none');
    }
}
