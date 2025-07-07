class MyPubDB {
    constructor() {
        this.dbName = 'myPubDB';
        this.dbVersion = 1;
        this.db = null;
        this.init();
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Users store
                if (!db.objectStoreNames.contains('users')) {
                    const usersStore = db.createObjectStore('users', { keyPath: 'email' });
                    usersStore.createIndex('by_name', 'fullName');
                }

                // Media store
                if (!db.objectStoreNames.contains('media')) {
                    const mediaStore = db.createObjectStore('media', { keyPath: 'id', autoIncrement: true });
                    mediaStore.createIndex('by_user', 'userId');
                    mediaStore.createIndex('by_date', 'uploadDate');
                }

                // Likes store
                if (!db.objectStoreNames.contains('likes')) {
                    const likesStore = db.createObjectStore('likes', { keyPath: ['mediaId', 'userId'] });
                    likesStore.createIndex('by_media', 'mediaId');
                }
            };
        });
    }

    async addUser(userData) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['users'], 'readwrite');
            const store = transaction.objectStore('users');
            const request = store.add(userData);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getUser(email) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['users'], 'readonly');
            const store = transaction.objectStore('users');
            const request = store.get(email);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async addMedia(mediaData) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['media'], 'readwrite');
            const store = transaction.objectStore('media');
            const request = store.add(mediaData);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getMedia(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['media'], 'readonly');
            const store = transaction.objectStore('media');
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getAllMedia() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['media'], 'readonly');
            const store = transaction.objectStore('media');
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async toggleLike(mediaId, userId) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['likes'], 'readwrite');
            const store = transaction.objectStore('likes');
            const request = store.get([mediaId, userId]);

            request.onsuccess = () => {
                if (request.result) {
                    store.delete([mediaId, userId]).onsuccess = () => resolve(false);
                } else {
                    store.add({
                        mediaId,
                        userId,
                        timestamp: new Date()
                    }).onsuccess = () => resolve(true);
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    async getLikesCount(mediaId) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['likes'], 'readonly');
            const store = transaction.objectStore('likes');
            const index = store.index('by_media');
            const request = index.count(IDBKeyRange.only(mediaId));

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}

// Initialize database
const db = new MyPubDB();
