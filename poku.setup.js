// poku.setup.js

// garante que global.window exista
if (typeof global.window === 'undefined') {
  global.window = {};
}

// implementa um localStorage em memória
global.window.localStorage = {
  _data: Object.create(null),
  setItem(key, value) {
    this._data[key] = String(value);
  },
  getItem(key) {
    return this._data.hasOwnProperty(key) ? this._data[key] : null;
  },
  removeItem(key) {
    delete this._data[key];
  },
  clear() {
    this._data = Object.create(null);
  },
};

const originalLog = console.log.bind(console);
console.log = (...args) => {
  process.stdout.write(
    args.map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ') +
      '\n',
  );
};
console.error = console.log;
