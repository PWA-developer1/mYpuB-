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
            document.getElementById('helpEmailDiv').style.display = 'block';
            document.getElementById('helpWhatsAppDiv').style.display = 'none';
            document.getElementById('sendHelpRequest').style.display = 'block';
            document.getElementById('sendHelpRequest').onclick = () => this.sendEmailHelp();
        });

        document.getElementById('whatsappHelp').addEventListener('click', () => {
            document.getElementById('helpEmailDiv').style.display = 'none';
            document.getElementById('helpWhatsAppDiv').style.display = 'block';
            document.getElementById('sendHelpRequest').style.display = 'block';
            document.getElementById('sendHelpRequest').onclick = () => this.sendWhatsAppHelp();
        });
    }

    sendEmailHelp() {
        const name = document.getElementById('helpName').value;
        const email = document.getElementById('helpEmail').value;
        
        if (name && email) {
            const subject = encodeURIComponent('mYpuB Help Request');
            const body = encodeURIComponent(`Hola Sr. Desarrollador de mYpub, el usuario ${name}, con el email ${email}, solicita instrucciones para crear una cuenta de acceso a mYpuB y más cosas sobre la aplicación, Gracias!`);
            window.location.href = `mailto:enzemajr@gmail.com?subject=${subject}&body=${body}`;
            bootstrap.Modal.getInstance(document.getElementById('helpModal')).hide();
        } else {
            alert('Please fill in all fields');
        }
    }

    sendWhatsAppHelp() {
        const name = document.getElementById('helpName').value;
        const whatsapp = document.getElementById('helpWhatsApp').value;
        
        if (name && whatsapp) {
            const message = encodeURIComponent(`Hola Sr. Desarrollador de mYpub, el usuario ${name}, con el número ${whatsapp}, solicita instrucciones para crear una cuenta de acceso a mYpuB y de más cosas sobre la aplicación, Gracias!`);
            window.open(`https://wa.me/240222084663?text=${message}`, '_blank');
            bootstrap.Modal.getInstance(document.getElementById('helpModal')).hide();
        } else {
            alert('Please fill in all fields');
        }
    }

    showMainApp() {
        document.getElementById('auth-container').classList.add('d-none');
        document.getElementById('main-app').classList.remove('d-none');
    }
}
