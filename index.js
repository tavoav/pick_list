// index.js
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const Selector = require('./selector');

const filePath = path.join(__dirname, 'lista.txt');
if (!fs.existsSync(filePath)) {
  console.error('No se encontró lista.txt en la carpeta del script.');
  process.exit(1);
}

const names = fs.readFileSync(filePath, 'utf8')
  .split(/\r?\n/)
  .map(s => s.trim())
  .filter(Boolean);

if (names.length < 2) {
  console.error('Se necesitan al menos 2 nombres en el archivo.');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`¿Cuántas personas quieres seleccionar? (máx ${names.length}): `, (answer) => {
  const n = parseInt(answer, 10);

  if (isNaN(n) || n <= 0) {
    console.error('⚠️ Ingresa un número válido mayor que 0.');
    rl.close();
    process.exit(1);
  } else if (n > names.length) {
    console.error(`⚠️ No puedes seleccionar más de ${names.length} personas.`);
    rl.close();
    process.exit(1);
  } else {
    const seleccionados = Selector.pick(names, n);
    console.log(`\n✅ Seleccionados (${n}):`);
    seleccionados.forEach((s, i) => console.log(`${i+1}. ${s}`));
  }

  rl.close();
});
