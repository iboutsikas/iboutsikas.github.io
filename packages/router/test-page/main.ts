import '../src/index.js';

document.addEventListener('router-navigated', (e) => {
  console.log('router-navigated', e.detail);
});
