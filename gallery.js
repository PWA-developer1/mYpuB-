class Gallery {
    constructor(db, auth) {
        this.db = db;
        this.auth = auth;
        this.initializeListeners();
    }

    initializeListeners() {
        document.getElementById('uploadForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUpload();
        });

        // Navigation
        document.querySelectorAll('[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(e.target.dataset.section);
            });
        });
    }

    async handleUpload() {
        const fileInput = document.getElementById('fileUpload');
        const isPublic = document.getElementById('isPublic').checked;
        const file = fileInput.files[0];

        if (!file) {
            alert('Por favor seleccione un archivo');
            return;
        }

        try {
            const mediaData = await this.processFile(file);
            mediaData.isPublic = isPublic;
            mediaData.userId = this.auth.currentUser.email;
            mediaData.uploadDate = new Date();
            
            await this.db.addMedia(mediaData);
            this.refreshGallery();
            fileInput.value = '';
            alert('Archivo subido exitosamente');
        } catch (error) {
            console.error('Error al subir archivo:', error);
            alert('Error al subir el archivo');
        }
    }

    async processFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve({
                    type: file.type.startsWith('image/') ? 'image' : 'video',
                    data: reader.result,
                    name: file.name
                });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async refreshGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        galleryGrid.innerHTML = '';

        try {
            const media = await this.db.getAllMedia();
            const currentUserEmail = this.auth.currentUser.email;

            for (const item of media) {
                if (item.isPublic || item.userId === currentUserEmail) {
                    const card = this.createMediaCard(item);
                    galleryGrid.appendChild(card);
                }
            }
        } catch (error) {
            console.error('Error al cargar la galería:', error);
            alert('Error al cargar la galería');
        }
    }

    createMediaCard(item) {
        const col = document.createElement('div');
        col.className = 'col-md-4 gallery-item';

        const card = document.createElement('div');
        card.className = 'card';

        const mediaElement = item.type === 'image' 
            ? this.createImageElement(item)
            : this.createVideoElement(item);

        const controls = this.createMediaControls(item);

        card.appendChild(mediaElement);
        card.appendChild(controls);
        col.appendChild(card);

        return col;
    }

    createImageElement(item) {
        const img = document.createElement('img');
        img.src = item.data;
        img.className = 'card-img-top';
        img.alt = item.name;
        return img;
    }

    createVideoElement(item) {
        const video = document.createElement('video');
        video.src = item.data;
        video.className = 'card-img-top';
        video.controls = true;
        return video;
    }

    createMediaControls(item) {
        const controls = document.createElement('div');
        controls.className = 'card-body';

        const likeButton = document.createElement('button');
        likeButton.className = 'btn btn-primary btn-sm me-2';
        likeButton.innerHTML = '<i class="fas fa-thumbs-up"></i> Me gusta';
        likeButton.onclick = () => this.handleLike(item.id);

        const likeCount = document.createElement('span');
        likeCount.className = 'like-counter';
        this.updateLikeCount(item.id, likeCount);

        const downloadButton = document.createElement('button');
        downloadButton.className = 'btn btn-secondary btn-sm';
        downloadButton.innerHTML = '<i class="fas fa-download"></i> Descargar';
        downloadButton.onclick = () => this.handleDownload(item);

        controls.appendChild(likeButton);
        controls.appendChild(likeCount);
        
        if (item.isPublic) {
            controls.appendChild(downloadButton);
        }

        if (item.userId === this.auth.current
