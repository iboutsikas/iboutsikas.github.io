
document.getElementById('_pushState').addEventListener('hy-push-state-load', function () {
const encodedElements = document.querySelectorAll('.encrypted');

if (!encodedElements.length)
    return;

const observer = new IntersectionObserver((entries) => {
    entries.map(entry => {
    if (entry.isIntersecting) {
        const el = entry.target;

        const text = atob(el.dataset.encrypted);

        if (el.classList.contains('email')) {
        el.href = `mailto:${text}`;
        }
        else if (el.classList.contains('tel')) {
        el.href = `tel:${text}`;
        }

        el.innerHTML = text;
    }
    })
});

encodedElements.forEach(el => observer.observe(el));
});