document.getElementById('_pushState').addEventListener('hy-push-state-load', function() {
    const encodedElements = document.querySelectorAll('.encrypted');

    if (!encodedElements.length)
        return;

    const observer = new IntersectionObserver((entries) => {
        entries.map(entry => {
            if (entry.isIntersecting) {
                let text = atob(entry.target.dataset.encrypted);
                entry.target.innerHTML = text;
            }
        })
    });

    encodedElements.forEach(el => observer.observe(el));
  });