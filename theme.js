/* 奇语言 Qi — 主题切换 + 移动端导航（无依赖） */
(function () {
  var tg = document.getElementById('theme-toggle');
  if (tg) {
    tg.addEventListener('click', function () {
      var d = document.documentElement;
      var light = d.getAttribute('data-theme') === 'light';
      if (light) {
        d.removeAttribute('data-theme');
      } else {
        d.setAttribute('data-theme', 'light');
      }
      try { localStorage.setItem('qi-theme', light ? 'dark' : 'light'); } catch (e) {}
    });
  }
  var nb = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (nb && links) {
    nb.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      nb.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { links.classList.remove('open'); nb.setAttribute('aria-expanded', 'false'); }
    });
  }
})();
