export function initCodeCopy() {
  document.querySelectorAll('pre.chroma').forEach((pre) => {
    const btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">' +
      '<path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"/>' +
      '</svg>';

    btn.addEventListener('click', () => {
      const code = pre.querySelector('code');
      const text = code ? code.innerText : pre.innerText;
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('code-copy-btn--copied');
        btn.setAttribute('aria-label', 'Copied!');
        setTimeout(() => {
          btn.classList.remove('code-copy-btn--copied');
          btn.setAttribute('aria-label', 'Copy code');
        }, 2000);
      });
    });

    // pre needs relative positioning — wrap is .highlight which already has it
    pre.style.position = 'relative';
    pre.appendChild(btn);
  });
}
