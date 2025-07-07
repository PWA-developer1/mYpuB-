class App {
    constructor() {
        this.db = new Database();
        this.auth = null;
        this.currentSection = 'upload';
        this.init();
    }

    async init() {
        await this.db.init();
        this.auth = new Auth(this.db);
        this.loadCountries();
        this.initializeListeners();
    }

    async loadCountries() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();
            
            const countrySelect = document.getElementById('country');
            countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
                    .forEach(country => {
                        const option = document.createElement('option');
                        option.value = country.cca2;
                        option.textContent = `${country.name.common} (${country.idd.root}${country.idd.suffixes?.[0] || ''})`;
                        option.dataset.prefix = `${country.idd.root}${country.idd.suffixes?.[0] || ''}`;
                        countrySelect.appendChild(option);
                    });

            countrySelect.addEventListener('change', (e) => {
                const prefix = e.target.selectedOptions[0].dataset.prefix;
                document.getElementById('phone-prefix').textContent = prefix;
            });
        } catch (error) {
            console.error('Error loading countries:', error);
        }
    }

    initializeListeners() {
        // Navigation
        document.querySelectorAll('.nav-link[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(e.target.dataset.section);
            });
        });

        // Upload form
        document.getElementById('upload-form').addEventListener('submit', (e) => this.handleUpload(e));

        // Logout
        document.getElementById('logout').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogout();
        });
    }

    showSection(sectionId) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.add('d-none');
        });
        document.getElementById(`${sectionId}-section`).classList.remove('d-none');
        this.currentSection = sectionId;

        if (sectionId === 'gallery') {
            this.loadGallery();
        }
    }

    async handleUpload(e) {
        e.preventDefault();
        const fileInput = document.getElementById('file-input');
        const isPublic = document.getElementById('is-public').checked;

        if (fileInput.files.length === 0) {
            alert('Por favor, seleccione un archivo');
            return;
        }

        const file = fileInput.files[0];
        try {
            const base64Data = await this.fileToBase64(file);
            await this.db.addMedia({
                userId: this.auth.currentUser.email,
                type: file.type.startsWith('image') ? 'image' : 'video',
                data: base64Data,
                isPublic,
                username: this.auth.currentUser.fullname
            });

            alert('Archivo subido exitosamente');
            fileInput.value = '';
            this.showSection('gallery');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error al subir el archivo');
        }
    }

    async loadGallery() {
        try {
            const media = await this.db.getAllMedia();
            const galleryGrid = document.getElementById('gallery-grid');
            galleryGrid.innerHTML = '';

            media.forEach(item => {
                const col = document.createElement('div');
                col.className = 'col-md-4 gallery-item';
                
                const card = document.createElement('div');
                card.className = 'card';
                
                const mediaElement = item.type === 'image' 
                    ? `<img src="${item.data}" class="card-img-top" alt="Uploaded content">` 
                    : `<video src="${item.data}" class="card-img-top" controls></video>`;

                card.innerHTML = `
                    ${mediaElement}
                    ${!item.isPublic ? '<span class="private-badge">Privado</span>' : ''}
                    <div class="card-body">
                        <p class="user-info">Subido por: ${item.username}</p>
                        <p class="user-info">Fecha: ${new Date(item.timestamp).toLocaleString()}</p>
                        <div class="like-counter">
                            <button class="btn btn-sm btn-outline-primary like-btn" data-id="${item.id}">
                                👍 ${item.likes || 0}
                            </button>
                            <button class="btn btn-sm btn-outline-danger dislike-btn" data-id="${item.id}">
                                👎 ${item.dislikes || 0}
                            </button>
                            ${item.isPublic ? `<button class="btn btn-sm btn-outline-secondary download-btn" data-id="${item.id}">⬇️ Descargar</button>` : ''}
                        </div>
                    </div>
                `;

                this.addLikeListeners(card, item);
                this.addDownloadListener(card, item);
                galleryGrid.appendChild(col);
                col.appendChild(card);
            });
        } catch (error) {
            console.error('Error loading gallery:', error);
            alert('Error al cargar la galería');
        }
    }

    addLikeListeners(card, item) {
        const likeBtn = card.querySelector('.like-btn');
        const dislikeBtn = card.querySelector('.dislike-btn');

        likeBtn.addEventListener('click', async () => {
            const newLikes = (item.likes || 0) + 1;
            await this.db.updateMediaLikes(item.id, newLikes, item.dislikes);
            likeBtn.textContent = `👍 ${newLikes}`;
            if (newLikes >= 50) {
                alert('¡Felicidades! Esta publicación ha alcanzado 50 likes!');
            }
        });

        dislikeBtn.addEventListener('click', async () => {
            const newDislikes = (item.dislikes || 0) + 1;
            await this.db.updateMediaLikes(item.id, item.likes, newDislikes);
            dislikeBtn.textContent = `👎 ${newDislikes}`;
        });
    }

    addDownloadListener(card, item) {
        const downloadBtn = card.querySelector('.download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                const link = document.createElement('a');
                link.href = item.data;
                link.download = `mypub-${item.id}.${item.type === 'image' ? 'jpg' : 'mp4'}`;
                link.click();
            });
        }
    }

    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    handleLogout() {
        this.auth.currentUser = null;
        document.getElementById('main-container').classList.add('d-none');
        document.getElementById('auth-container').classList.remove('d-none');
        document.getElementById('login-form').reset();
        document.getElementById('register-form').reset();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
