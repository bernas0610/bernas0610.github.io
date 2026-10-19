const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
function syncTheme() {
  const light = root.dataset.theme === 'light';
  themeButton.setAttribute('aria-label', light ? 'Ativar tema escuro' : 'Ativar tema claro');
  themeButton.setAttribute('aria-pressed', String(light));
}
themeButton.hidden = false;
syncTheme();
themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('portfolio-v2-theme', root.dataset.theme); } catch { /* Optional preference. */ }
  syncTheme();
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navegacao');
const mobile = matchMedia('(max-width: 760px)');
root.classList.add('menu-ready');
function closeMenu(returnFocus = false) {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  if (returnFocus) menuButton.focus();
}
function syncMenu() {
  // If a breakpoint hides the focused control, move focus to a visible link.
  const focusedButton = document.activeElement === menuButton;
  const focusedLink = navigation.contains(document.activeElement);
  menuButton.hidden = !mobile.matches;
  if (!mobile.matches && focusedButton) navigation.querySelector('a').focus();
  if (mobile.matches && focusedLink) menuButton.focus();
  closeMenu();
}
syncMenu();
mobile.addEventListener('change', syncMenu);
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  closeMenu();
  const destination = document.querySelector(link.hash);
  if (destination) {
    destination.tabIndex = -1;
    destination.focus({ preventScroll: true });
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});

// The case study also works without JavaScript through its native disclosure.
document.querySelector('a[href="#nexus-detalhes"]').addEventListener('click', () => {
  document.querySelector('#nexus-detalhes').open = true;
});
