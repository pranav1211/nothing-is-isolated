/* Lightweight UX touches — keyboard nav between phases + smooth anchor scroll. */

(function () {
    // Keyboard arrows: ← / → navigate between phase pages
    document.addEventListener('keydown', function (e) {
        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

        var nav = document.querySelector('.phase-nav');
        if (!nav) return;

        var prev = nav.querySelector('.prev');
        var next = nav.querySelector('.next');

        if (e.key === 'ArrowLeft' && prev && !prev.classList.contains('disabled')) {
            window.location.href = prev.getAttribute('href');
        } else if (e.key === 'ArrowRight' && next && !next.classList.contains('disabled')) {
            window.location.href = next.getAttribute('href');
        }
    });

    // Smooth-scroll for in-page hash links
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var id = a.getAttribute('href');
            if (id.length <= 1) return;
            var el = document.querySelector(id);
            if (!el) return;
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Reveal-on-scroll for phase blocks (subtle fade)
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        document.querySelectorAll('.phase-block, .prompt-card, .phase-card, .how-card').forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(16px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            io.observe(el);
        });
    }
})();
