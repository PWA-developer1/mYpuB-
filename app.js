class MyPubApp {
    constructor() {
        this.db = new MediaDB();
        this.auth = null;
        this.init();
    }

    async init() {
        await this.db.init();
        this.auth = new Auth(this.db);
        this.loadCountries();
        this.initializeEventListeners();
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
                        option.dataset.prefix = country.idd.root + (country.idd.suffixes?.[0] || '');
                        countrySelect.appendChild(option);
                    });

            // Update phone prefix when country changes
            countrySelect.addEventListener('change', (e) => {
                const selectedOption = e.target.options[e.target.selectedIndex];
                document.getElementById('phonePrefix').textContent = selectedOption.dataset.prefix;
            });
        } catch (error) {
            console.error('Error loading countries:', error);
        }
    }

    initializeEventListeners() {
        // Upload form handling
        document.getElementById('uploadForm')?.addEventListener('submit', (e) => this.handleUpload(e));

        // Navigation
        document.querySelectorAll('[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(e.target.dataset.section);
            });
        });
    }

    async handleUpload(e) {
        e.preventDefault();
        
        const files = document.getElementById('mediaInput').files;
        const isPublic = document.getElementById('isPublic').checked;

        for (let file of files) {
            try {
                const mediaData = {
                    userId: this.auth.currentUser.email,
                    type: file.type.startsWith('image/') ? 'image' : 'video',
                    file: await this.fileToBase64(file),
                    isPublic,
                    timestamp: new Date().toISOString(),
                    likes: 0,
                    comments: []
                };

                await this.db.addMedia(mediaData);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }

        this.refreshGallery();
    }

    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    async refreshGallery() {
        const media = await this.db.getAllMedia();
        // Implementation of gallery refresh...
    }

    showSection(sectionName) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(`${sectionName}-section`).style.display = 'block';
    }
}

// Initialize the application
window.addEventListener('load', () => {
    new MyPubApp();
});
