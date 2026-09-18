const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
    navToggle.setAttribute('aria-expanded', 'false');

    navToggle.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Open navigation');
        });
    });
}

const filterButtons = Array.from(document.querySelectorAll('.filter-chip'));
const cards = Array.from(document.querySelectorAll('.portfolio-card'));

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const chosen = button.dataset.filter;

        filterButtons.forEach(item => item.classList.toggle('active', item === button));

        cards.forEach(card => {
            const visible = chosen === 'all' || card.dataset.category.split(' ').includes(chosen);
            card.classList.toggle('hidden', !visible);
        });
    });
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            formStatus.textContent = 'Please complete the required fields.';
            contactForm.reportValidity();
            return;
        }

        formStatus.textContent = 'Thanks for reaching out. Please email me directly to continue the conversation.';
        contactForm.reset();
    });
}
