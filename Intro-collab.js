/*
  HOST THIS FILE ON GITHUB PAGES:
  1. Create a GitHub repo (e.g. "bookmarklets"), enable Pages for it
     (Settings > Pages > Deploy from branch > main / root).
  2. Add this file to the repo, e.g. as "intro-animation.js".
  3. Your hosted URL will look like:
     https://YOUR-USERNAME.github.io/bookmarklets/intro-animation.js
  4. Use that URL in the loader bookmarklet (see loader-bookmarklet.js).

  This file just defines window.runIntroAnimation(next) — it does NOT
  run itself. The loader script calls it once this file has loaded.
*/

window.runIntroAnimation = function (next) {
  if (document.getElementById('anon-intro-overlay')) { if (next) next(); return; }

  var css = "@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');" +
    "#anon-intro-overlay{position:fixed;inset:0;display:flex;flex-direction:column;" +
    "align-items:center;justify-content:center;background:#f6f0dc;font-family:'Orbitron',sans-serif;" +
    "color:#1a1a1a;z-index:2147483647;cursor:pointer;}" +
    "#anon-intro-row{display:flex;align-items:baseline;gap:14px;overflow:hidden;}" +
    "#anon-intro-word{font-size:34px;letter-spacing:2px;opacity:0;}" +
    "#anon-intro-x{font-size:34px;letter-spacing:2px;opacity:0;transform:translateY(30px);}" +
    "#anon-intro-wrap{overflow:hidden;margin-top:14px;}" +
    "#anon-intro-final{font-size:42px;letter-spacing:6px;opacity:0;transform:translateY(30px);}" +
    "@keyframes anonFadeIn{from{opacity:0;}to{opacity:1;}}" +
    "@keyframes anonSlideUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}" +
    /* X arrives half a second sooner; ANONYMOUS follows right on its heels */
    "#anon-intro-word.play{animation:anonFadeIn 2s ease-out forwards;}" +
    "#anon-intro-x.play{animation:anonSlideUp 1.2s ease-out 2.5s forwards;}" +
    "#anon-intro-final.play{animation:anonSlideUp 0.6s ease-out 3.7s forwards;}";

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'anon-intro-overlay';
  overlay.title = 'Click to skip';
  overlay.innerHTML =
    '<div id="anon-intro-row">' +
      '<div id="anon-intro-word">1NT3R3ST1NG</div>' +
      '<div id="anon-intro-x">X</div>' +
    '</div>' +
    '<div id="anon-intro-wrap">' +
      '<div id="anon-intro-final">ANONYMOUS</div>' +
    '</div>';
  document.body.appendChild(overlay);

  var word = document.getElementById('anon-intro-word');
  var x = document.getElementById('anon-intro-x');
  var final = document.getElementById('anon-intro-final');

  var finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    if (overlay.parentNode) {
      overlay.style.transition = 'opacity 0.8s ease';
      overlay.style.opacity = '0';
      setTimeout(function () {
        overlay.remove();
        style.remove();
        if (next) next();
      }, 800);
    } else if (next) {
      next();
    }
  }

  requestAnimationFrame(function () {
    word.classList.add('play');
    x.classList.add('play');
    final.classList.add('play');
  });

  overlay.addEventListener('click', finish);

  // total sequence now finishes around 6s in, then auto-advances
  setTimeout(finish, 6000);
};
