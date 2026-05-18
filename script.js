/* NextGenBiomed Master Logic Engine */
document.addEventListener('DOMContentLoaded', () => {

    // 1. GLOBAL SEARCH ENGINE
    const searchBtn = document.querySelector('.btn-search');
    const searchInput = document.querySelector('.srch');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase();
            const routes = {
                'pipeline': 'pipeline.html',
                'trial': 'pipeline.html',
                'about': 'about.html',
                'team': 'contact.html',
                'valerie': 'contact.html',
                'sibanda': 'contact.html',
                'trend': 'insights.html',
                'news': 'insights.html'
            };

            const target = Object.keys(routes).find(key => query.includes(key));
            if (target) window.location.href = routes[target];
            else alert("AI Query: Indexing biological database for '" + query + "'...");
        });
    }

    // 2. SMART ACCORDIONS (Pipeline Page)
    const accHeaders = document.querySelectorAll('.acc-header');
    accHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const isOpen = body.style.maxHeight;

            // Close all others with a "liquid" feel
            document.querySelectorAll('.acc-body').forEach(b => b.style.maxHeight = null);
            
            // Toggle current
            if (!isOpen) {
                body.style.maxHeight = body.scrollHeight + "px";
                header.style.color = "#ff7200";
            } else {
                header.style.color = "#fff";
            }
        });
    });

    // 3. STATISTIC COUNTER (Home Page)
    const stats = document.querySelectorAll('.count');
    const observerOptions = { threshold: 0.8 };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const update = () => {
                    const inc = target / 100;
                    if (count < target) {
                        count += inc;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(update, 20);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                update();
                statObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(s => statObserver.observe(s));

    // 4. PORTAL VALIDATION (Home Page)
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const email = document.getElementById('userEmail').value;
            if (email.includes('@') && email.length > 5) {
                loginBtn.innerHTML = "<ion-icon name='sync-outline' class='rotate'></ion-icon> Authorizing...";
                setTimeout(() => {
                    alert("ACCESS GRANTED. Redirecting to NextGen Private Node.");
                    loginBtn.innerHTML = "Authorize Entry";
                }, 2000);
            } else {
                alert("SECURITY ALERT: Invalid Institutional ID.");
            }
        });
    }

    // 5. CONTACT FORM PHYSICS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            btn.style.background = "#28a745";
            btn.innerText = "Transmitted Successfully";
            setTimeout(() => {
                contactForm.reset();
                btn.style.background = "#004a99";
                btn.innerText = "Submit to Registry";
            }, 3000);
        });
    }
});

