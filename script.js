const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
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
