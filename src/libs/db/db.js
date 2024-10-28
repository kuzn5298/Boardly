const fs = require('fs');
const path = require('path');

class LocalStorage {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = this.#loadData();
  }

  #loadData() {
    if (fs.existsSync(this.filePath)) {
      const fileData = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(fileData);
    }
    return {};
  }

  #saveData() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }

  setItem(key, value) {
    this.data[key] = value;
    this.#saveData();
  }

  getItem(key) {
    return this.data[key] || null;
  }

  removeItem(key) {
    delete this.data[key];
    this.#saveData();
  }

  clear() {
    this.data = {};
    this.#saveData();
  }
}

export const localDB = new LocalStorage(
  path.join(__dirname, 'localStorage.json')
);
