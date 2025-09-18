(function () {
  const textarea = document.getElementById('nombres');
  const btn = document.getElementById('btn');
  const cantidadInput = document.getElementById('cantidad');
  const resultado = document.getElementById('resultado');
  const btnGuardar = document.getElementById('btnGuardar');
  const toggleTheme = document.getElementById('toggleTheme');

  // === Tema persistente ===
  const THEME_KEY = 'sorteador_theme';
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') document.body.classList.add('dark');
  updateThemeButton();

  toggleTheme.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    updateThemeButton();
  });

  function updateThemeButton(){
    const dark = document.body.classList.contains('dark');
    toggleTheme.textContent = dark ? 'Modo claro' : 'Modo oscuro';
    toggleTheme.setAttribute('aria-pressed', String(dark));
  }

  // === Funciones de UI ===
  function getList() {
    return textarea.value.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  }

  btn.addEventListener('click', () => {
    const list = getList();
    const n = parseInt(cantidadInput.value, 10);

    if (!list.length) {
      alert('La lista está vacía.');
      return;
    }
    if (!n || n <= 0 || n > list.length) {
      alert('Número inválido. Asegúrate de que la cantidad no supere el tamaño de la lista.');
      return;
    }

    const picked = window.Selector.pick(list, n);
    resultado.textContent = 'Seleccionados: ' + picked.join(', ');
  });

  btnGuardar.addEventListener('click', () => {
    const text = resultado.textContent.replace(/^Seleccionados:\s*/, '');
    if (!text) {
      alert('Primero realiza un sorteo.');
      return;
    }
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seleccionados.txt';
    a.click();
    URL.revokeObjectURL(url);
  });
})();
