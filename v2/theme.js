// Separate preference key keeps the original portfolio's theme unchanged.
try {
  const preference = localStorage.getItem('portfolio-v2-theme');
  if (preference === 'light' || preference === 'dark') {
    document.documentElement.dataset.theme = preference;
  }
} catch { /* Storage may be unavailable in private browsing. */ }
