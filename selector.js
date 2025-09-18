// selector.js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Selector = factory();
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {

  function shuffle(array) {
    // Fisher–Yates (in-place). Clonamos para no mutar si hace falta.
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pick(array, n) {
    if (!Array.isArray(array)) throw new TypeError('array expected');
    if (typeof n !== 'number' || n <= 0) return [];
    if (n >= array.length) return array.slice(); // devuelve copia
    return shuffle(array).slice(0, n);
  }

  return {
    shuffle,
    pick
  };
}));
