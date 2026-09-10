/*
  HOST THIS FILE ON GITHUB PAGES (or keep using jsDelivr against your repo):
  This file defines window.runIntroAnimation(next) — it does NOT run itself.
  The loader script calls it once this file has loaded.

  NOTE ON THE "SKIP NEXT TIME" TOGGLE:
  It's saved with localStorage, which is scoped per-website. So turning it
  off on siteA.com won't skip it on siteB.com — it only remembers your
  choice per site you use the bookmarklet on. There's no way around that
  for a bookmarklet without a server component.
*/

(function () {
  var STORAGE_KEY = 'bm_anon_intro_disabled';

  window.runIntroAnimation = function (next) {
    if (document.getElementById('anon-intro-overlay')) { if (next) next(); return; }

    var disabled = false;
    try { disabled = localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) {}
    if (disabled) { if (next) next(); return; }

    var css = "@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');" +
      "#anon-intro-overlay{position:fixed;inset:0;display:flex;flex-direction:column;" +
      "align-items:center;justify-content:center;font-family:'Orbitron',sans-serif;" +
      "color:#1a1a1a;z-index:2147483647;cursor:pointer;" +
      "background:rgba(246,240,220,0.38);" +
      "-webkit-backdrop-filter:blur(18px) saturate(120%);backdrop-filter:blur(18px) saturate(120%);}" +
      "#anon-intro-row{display:flex;align-items:baseline;gap:14px;overflow:hidden;}" +
      "#anon-intro-word{font-size:34px;letter-spacing:2px;opacity:0;text-shadow:0 1px 6px rgba(255,255,255,.6);}" +
      "#anon-intro-x{font-size:34px;letter-spacing:2px;opacity:0;transform:translateY(30px);text-shadow:0 1px 6px rgba(255,255,255,.6);}" +
      "#anon-intro-wrap{overflow:hidden;margin-top:14px;}" +
      "#anon-intro-final{font-size:42px;letter-spacing:6px;opacity:0;transform:translateY(30px);text-shadow:0 1px 6px rgba(255,255,255,.6);}" +
      "@keyframes anonFadeIn{from{opacity:0;}to{opacity:1;}}" +
      "@keyframes anonSlideUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}" +
      "#anon-intro-word.play{animation:anonFadeIn 2s ease-out forwards;}" +
      "#anon-intro-x.play{animation:anonSlideUp 1.2s ease-out 2.5s forwards;}" +
      "#anon-intro-final.play{animation:anonSlideUp 0.6s ease-out 3.7s forwards;}" +
      "#anon-intro-gear{position:absolute;top:16px;right:16px;width:34px;height:34px;border-radius:50%;" +
      "display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.08);" +
      "font-family:sans-serif;font-size:16px;cursor:pointer;-webkit-user-select:none;user-select:none;}" +
      "#anon-intro-gear:hover{background:rgba(0,0,0,0.16);}" +
      "#anon-intro-panel{position:absolute;top:56px;right:16px;background:rgba(255,255,255,0.9);" +
      "-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);border-radius:10px;padding:10px 12px;" +
      "font-family:sans-serif;font-size:12.5px;color:#1a1a1a;display:none;align-items:center;gap:8px;" +
      "box-shadow:0 4px 16px rgba(0,0,0,0.12);white-space:nowrap;cursor:default;}" +
      "#anon-intro-panel.open{display:flex;}" +
      "#anon-intro-switch{position:relative;width:32px;height:18px;border-radius:9px;background:#ccc;" +
      "cursor:pointer;flex:none;transition:background .15s ease;}" +
      "#anon-intro-switch.on{background:#1a1a1a;}" +
      "#anon-intro-switch::after{content:'';position:absolute;top:2px;left:2px;width:14px;height:14px;" +
      "border-radius:50%;background:#fff;transition:left .15s ease;}" +
      "#anon-intro-switch.on::after{left:16px;}";

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.id = 'anon-intro-overlay';
    overlay.title = 'Click to skip';
    overlay.innerHTML =
      '<div id="anon-intro-gear">\u2699</div>' +
      '<div id="anon-intro-panel">' +
        '<span>Skip intro next time</span>' +
        '<div id="anon-intro-switch"></div>' +
      '</div>' +
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
    var gear = document.getElementById('anon-intro-gear');
    var panel = document.getElementById('anon-intro-panel');
    var toggle = document.getElementById('anon-intro-switch');

    var toggledOn = false;
    try { toggledOn = localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) {}
    if (toggledOn) toggle.classList.add('on');

    gear.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.classList.toggle('open');
    });
    panel.addEventListener('click', function (e) { e.stopPropagation(); });
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggledOn = !toggledOn;
      toggle.classList.toggle('on', toggledOn);
      try { localStorage.setItem(STORAGE_KEY, toggledOn ? '1' : '0'); } catch (err) {}
    });

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
})();
