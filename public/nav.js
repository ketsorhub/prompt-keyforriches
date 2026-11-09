/* Key For Riches shared top menu for static pages on prompt.keyforriches.com.
   To add a section later, add one line to LINKS. (ai.keyforriches.com is intentionally never listed.) */
(function () {
  var LINKS = [
    { label: 'Prompt Maker', href: '/' },
    { label: 'Prompt Improver', href: '/improver/' },
    { label: 'More Tools', href: 'https://tools.keyforriches.com/' }
  ];
  var host = document.getElementById('kfr-nav');
  if (!host) return;
  var path = location.pathname;
  var nav = document.createElement('nav');
  nav.className = 'kfr-nav';
  nav.setAttribute('aria-label', 'Main');
  var inner = document.createElement('div');
  inner.className = 'kfr-nav-inner';
  var logo = document.createElement('a');
  logo.className = 'kfr-nav-logo';
  logo.href = '/';
  logo.setAttribute('aria-label', 'KeyForRiches Home');
  logo.innerHTML = '<span class="kfr-nav-word">KEYFORRICHES</span><span class="kfr-nav-rule"></span><span class="kfr-nav-tag">Free AI &amp; SEO Tools</span>';
  var links = document.createElement('div');
  links.className = 'kfr-nav-links';
  LINKS.forEach(function (l) {
    var a = document.createElement('a');
    a.href = l.href;
    a.textContent = l.label;
    if (l.href === path && l.href !== '/') a.className = 'kfr-active';
    links.appendChild(a);
  });
  inner.appendChild(logo);
  inner.appendChild(links);
  nav.appendChild(inner);
  host.appendChild(nav);
})();
