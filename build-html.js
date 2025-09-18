// build-html.js
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

const srcTxt = path.join(ROOT, 'lista.txt');
const template = path.join(ROOT, 'template.html');
const cssSrc = path.join(ROOT, 'styles.css');
const appSrc = path.join(ROOT, 'app.js');
const selectorSrc = path.join(ROOT, 'selector.js');

if (!fs.existsSync(srcTxt)) {
  console.error('No se encontró lista.txt (no se sube al repo, pero sí se usa localmente para generar el HTML).');
  process.exit(1);
}
if (!fs.existsSync(template)) {
  console.error('No se encontró template.html');
  process.exit(1);
}
if (!fs.existsSync(cssSrc) || !fs.existsSync(appSrc) || !fs.existsSync(selectorSrc)) {
  console.error('Falta alguno de: styles.css, app.js o selector.js');
  process.exit(1);
}

const namesRaw = fs.readFileSync(srcTxt, 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
const namesText = namesRaw.join('\n');

let tpl = fs.readFileSync(template, 'utf8');
tpl = tpl.replace('{{NAMES}}', namesText);

// Crear dist si no existe
if (!fs.existsSync(DIST)) fs.mkdirSync(DIST);

// Copiar assets
fs.copyFileSync(cssSrc, path.join(DIST, 'styles.css'));
fs.copyFileSync(appSrc, path.join(DIST, 'app.js'));
fs.copyFileSync(selectorSrc, path.join(DIST, 'selector.js'));

// Escribir HTML final
const outHtml = path.join(DIST, 'sorteo.html');
fs.writeFileSync(outHtml, tpl, 'utf8');

console.log('✔️ Generado:', outHtml);
console.log('   + Copiados: styles.css, app.js, selector.js → dist/');
