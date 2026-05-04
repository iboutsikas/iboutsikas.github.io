import { initTheme } from './theme.js';
import { initSidebar } from './sidebar.js';
import { initCopyButtons } from './code-copy.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const styles = getComputedStyle(root);

  const breakpoints = {
    sm: styles.getPropertyValue('--bp-sm').trim(),
    md: styles.getPropertyValue('--bp-md').trim(),
    lg: styles.getPropertyValue('--bp-lg').trim(),
    xl: styles.getPropertyValue('--bp-xl').trim(),
    '2xl': styles.getPropertyValue('--bp-2xl').trim(),
    '3xl': styles.getPropertyValue('--bp-3xl').trim(),
    '4xl': styles.getPropertyValue('--bp-4xl').trim(),
  };

  initTheme();
  initSidebar(breakpoints);
  initCopyButtons();

  document.addEventListener('router-navigation-complete', (event) => {
    const { doc } = event.detail;
    if (doc) {
      // We only update the <meta /> tags. For tags like og:whatever, we do not really care as these will
      // be used by crawling/bots media sites. And those will never actually perform a navigation, it is just
      // for the post we linked!
      const newMetas = doc.querySelectorAll('meta');
      newMetas.forEach((newMeta) => {
        const name = newMeta.getAttribute('name') || newMeta.getAttribute('property');
        if (name) {
          const existingMeta = document.querySelector(
            `meta[name="${name}"], meta[property="${name}"]`
          );
          if (existingMeta) {
            for (const attr of newMeta.attributes) {
              if (attr.name !== 'name' && attr.name !== 'property') {
                existingMeta.setAttribute(attr.name, attr.value);
              }
            }
          } else {
            document.head.appendChild(newMeta.cloneNode(true));
          }
        }
      });

      const currentMetas = document.querySelectorAll('meta');
      currentMetas.forEach((meta) => {
        const name = meta.getAttribute('name') || meta.getAttribute('property');
        if (name && !doc.querySelector(`meta[name="${name}"], meta[property="${name}"]`)) {
          meta.remove();
        }
      });
    }

    const hash = location.hash;
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
