class MyPubApp {
    constructor() {
        this.db = new MediaDB();
        this.auth = null;
        this.geoData = {};
        this.init();
    }

    async init() {
        await this.db.init();
        this.auth = new Auth(this.db);
        await this.loadCountries();
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
                        option.dataset.countryName = country.name.common;
                        countrySelect.appendChild(option);
                    });

            // Update phone prefix and load cities when country changes
            countrySelect.addEventListener('change', (e) => {
                const selectedOption = e.target.options[e.target.selectedIndex];
                document.getElementById('phonePrefix').textContent = selectedOption.dataset.prefix;
                this.loadCities(selectedOption.dataset.countryName);
            });
        } catch (error) {
            console.error('Error loading countries:', error);
        }
    }

    async loadCities(countryName) {
        try {
            const citySelect = document.getElementById('city');
            citySelect.innerHTML = '<option value="">Loading cities...</option>';
            citySelect.disabled = true;

            // Using GeoNames API for cities
            const username = 'demo'; // Reemplazar con tu usuario de GeoNames
            const url = `http://api.geonames.org/searchJSON?country=${countryName}&featureClass=P&maxRows=1000&username=${username}`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            citySelect.innerHTML = '<option value="">Select a city</option>';
            
            if (data.geonames && data.geonames.length > 0) {
                this.geoData.cities = data.geonames;
                
                data.geonames
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .forEach(city => {
                        const option = document.createElement('option');
                        option.value = city.geonameId;
                        option.textContent = city.name;
                        option.dataset.lat = city.lat;
                        option.dataset.lng = city.lng;
                        citySelect.appendChild(option);
                    });
                
                citySelect.disabled = false;
                
                // Add event listener for city selection
                citySelect.addEventListener('change', (e) => {
                    const selectedCity = this.geoData.cities.find(
                        city => city.geonameId === parseInt(e.target.value)
                    );
                    if (selectedCity) {
                        this.loadStreets(selectedCity);
                    }
                });
            }
        } catch (error) {
            console.error('Error loading cities:', error);
            const citySelect = document.getElementById('city');
            citySelect.innerHTML = '<option value="">Error loading cities</option>';
        }
    }

    async loadStreets(cityData) {
        try {
            const streetSelect = document.getElementById('street');
            streetSelect.innerHTML = '<option value="">Loading streets...</option>';
            streetSelect.disabled = true;

            // Using OpenStreetMap Nominatim API for streets
            const bbox = this.calculateBoundingBox(cityData.lat, cityData.lng, 2); // 2km radius
            const url = `https://nominatim.openstreetmap.org/search?format=json&street=*&bounded=1&viewbox=${bbox.join(',')}&bounded=1`;
            
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'mYpuB Application'
                }
            });
            const streets = await response.json();
            
            streetSelect.innerHTML = '<option value="">Select a street</option>';
            
            if (streets && streets.length > 0) {
                this.geoData.streets = streets;
                
                // Filter unique street names
                const uniqueStreets = [...new Set(streets
                    .map(item => item.address?.road || item.address?.street)
                    .filter(Boolean))];
                
                uniqueStreets
                    .sort((a, b) => a.localeCompare(b))
                    .forEach(streetName => {
                        const option = document.createElement('option');
                        option.value = streetName;
                        option.textContent = streetName;
                        streetSelect.appendChild(option);
                    });
            }
            
            streetSelect.disabled = false;
        } catch (error) {
            console.error('Error loading streets:', error);
            const streetSelect = document.getElementById('street');
            streetSelect.innerHTML = '<option value="">Error loading streets</option>';
        }
    }

    calculateBoundingBox(lat, lon, radiusKm) {
        const earthRadiusKm = 6371;
        const latRadian = lat * Math.PI / 180;
        
        const deltaLat = (radiusKm / earthRadiusKm) * (180 / Math.PI);
        const deltaLon = (radiusKm / (earthRadiusKm * Math.cos(latRadian))) * (180 / Math.PI);
        
        return [
            lon - deltaLon, // min lon
            lat - deltaLat, // min lat
            lon + deltaLon, // max lon
            lat + deltaLat  // max lat
        ];
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
        const gallery = document.getElementById('gallery-section');
        const media = await this.db.getAllMedia();
        
        gallery.innerHTML = '';
        
        media.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card media-card';
            
            const content = item.type === 'image' 
                ? `<img src="${item.file}" class="card-img-top" alt="User media">`
                : `<video src="${item.file}" controls class="card-img-top"></video>`;
                
            card.innerHTML = `
                ${content}
                <div class="card-body">
                    <p class="card-text">Uploaded by: ${item.userId}</p>
                    <p class="card-text">
                        <small class="text-muted">
                            ${new Date(item.timestamp).toLocaleString()}
                        </small>
                    </p>
                    <div class="media-controls">
                        <button class="btn btn-sm btn-primary like-btn" data-id="${item.id}">
                            👍 ${item.likes}
                        </button>
                        ${item.isPublic ? '<button class="btn btn-sm btn-secondary download-btn">Download</button>' : ''}
                    </div>
                </div>
            `;
            
            gallery.appendChild(card);
        });
        
        // Add event listeners for like buttons
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const mediaId = parseInt(e.target.dataset.id);
                await this.handleLike(mediaId);
                this.refreshGallery();
            });
        });
    }

    async handleLike(mediaId) {
        const media = await this.db.getMedia(mediaId);
        if (media) {
            media.likes += 1;
            await this.db.updateMedia(media);
        }
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
