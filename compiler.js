(function () {
  if (document.getElementById('bmSandbox')) return;

  var CSS = ""
    + "body{margin:0;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;overflow:hidden;background:#000}"
    + ".bm-win{position:relative;width:100%;height:100%;display:flex;flex-direction:column;background:#1c1c1e;border-radius:12px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.08)}"
    + ".bm-chrome{background:#2c2c2e;-webkit-user-select:none;user-select:none;cursor:move}"
    + ".bm-dotsrow{display:flex;align-items:center;gap:8px;padding:10px 12px 6px}"
    + ".bm-dot{width:12px;height:12px;border-radius:50%;flex:none;cursor:pointer}"
    + ".bm-dot.red{background:#ff5f57}.bm-dot.yellow{background:#febc2e}.bm-dot.green{background:#28c840}"
    + ".bm-dot:hover{filter:brightness(1.25)}"
    + ".bm-tabrow{display:flex;align-items:center;padding:0 10px;gap:6px}"
    + ".bm-tab{background:#3a3a3c;color:#e5e5ea;font-size:11.5px;padding:6px 12px;border-radius:7px 7px 0 0;display:flex;align-items:center;gap:6px;max-width:160px;cursor:pointer;opacity:.55}"
    + ".bm-tab.active{opacity:1}"
    + ".bm-tab .bm-fav{width:7px;height:7px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#8fd3ff,#0a84ff);flex:none}"
    + ".bm-tab .bm-ttl{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
    + ".bm-addrrow{display:flex;align-items:center;gap:8px;padding:8px 12px 10px}"
    + ".bm-navbtn{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#98989d;font-size:13px;flex:none;cursor:pointer}"
    + ".bm-navbtn:hover{background:rgba(255,255,255,.08)}"
    + ".bm-addr{flex:1;background:#1c1c1e;border-radius:14px;padding:7px 14px;color:#c7c7cc;font-size:12px;display:flex;align-items:center;gap:8px;min-width:0}"
    + ".bm-addr input{background:transparent;border:none;outline:none;color:#e5e5ea;font-size:12px;flex:1;min-width:0;font-family:inherit}"
    + ".bm-go{background:#0a84ff;color:#fff;border:none;border-radius:8px;padding:7px 14px;font-size:12px;font-weight:500;cursor:pointer;flex:none}"
    + ".bm-tabpane{display:flex;flex-direction:column;flex:1;min-height:0}"
    + ".bm-addr .bm-url{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;text-align:center}"
    + ".bm-stage{position:relative;flex:1;min-height:0;background:#000}"
    + ".bm-stars{position:absolute;inset:0;display:block}"
    + ".bm-body{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;min-height:0}"
    + ".bm-panes{flex:1;display:flex;min-height:0}"
    + ".bm-pane{flex:1;display:flex;flex-direction:column;min-width:0}"
    + ".bm-pane+.bm-pane{border-left:1px solid rgba(255,255,255,.08)}"
    + ".bm-panehead{color:#8a8f98;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;padding:8px 12px 4px;-webkit-user-select:none;user-select:none}"
    + ".bm-code{flex:1;width:100%;box-sizing:border-box;border:none;outline:none;resize:none;padding:10px 12px;font-family:'SF Mono',Consolas,Menlo,monospace;font-size:13px;line-height:1.5;background:transparent;color:#e8eaed}"
    + ".bm-code::placeholder{color:#5f6368}"
    + ".bm-frame{flex:1;width:100%;border:none;background:transparent}"
    + ".bm-actions{display:flex;gap:8px;padding:8px 12px;background:rgba(0,0,0,.3);border-top:1px solid rgba(255,255,255,.08);-webkit-user-select:none;user-select:none;flex-wrap:wrap}"
    + ".bm-btn{border:none;border-radius:6px;padding:8px 14px;font-size:12.5px;font-weight:500;cursor:pointer;color:#fff;background:#3c4043;min-height:34px}"
    + ".bm-btn:hover{background:#4b4f52}"
    + ".bm-btn.primary{background:#8ab4f8;color:#1a1a1a}"
    + ".bm-btn.primary:hover{background:#a6c8ff}"
    + ".bm-resize{position:absolute;right:0;bottom:0;width:22px;height:22px;cursor:nwse-resize;z-index:5}"
    + ".bm-resize:before{content:'';position:absolute;right:5px;bottom:5px;width:9px;height:9px;border-right:2px solid rgba(255,255,255,.35);border-bottom:2px solid rgba(255,255,255,.35)}"
    + "@media (max-width:640px){.bm-tab{max-width:100px}.bm-addr .bm-url{font-size:11px}.bm-navbtn{width:26px;height:26px}.bm-btn{flex:1;text-align:center}}";

  function injectCSSOnce(doc) {
    if (doc.getElementById('bm-style')) return;
    var s = doc.createElement('style');
    s.id = 'bm-style';
    s.textContent = CSS;
    doc.head.appendChild(s);
  }

  // ---- sparse, gently-drifting SpaceX-style starfield with cursor avoidance + shooting stars ----
  function startStarfield(canvas, hostWin, hostDoc) {
    var ctx = canvas.getContext('2d');
    var stars = [];
    var raf;
    var mouse = { x: -9999, y: -9999 };
    function resize() {
      var r = canvas.parentElement.getBoundingClientRect();
      canvas.width = r.width;
      canvas.height = r.height;
    }
    resize();
    hostWin.addEventListener('resize', resize);

    function makeStar() {
      var warm = Math.random() < 0.12;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 0.5 + Math.random() * 1.1,
        alpha: 0.35 + Math.random() * 0.55,
        twSpeed: 0.15 + Math.random() * 0.35,
        twPhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        color: warm ? '255,224,180' : '255,255,255',
        dx: 0, dy: 0
      };
    }
    var density = (canvas.width * canvas.height) / 9000;
    var COUNT = Math.max(60, Math.min(220, Math.round(density)));
    for (var i = 0; i < COUNT; i++) stars.push(makeStar());

    var shooters = [];
    var shooterTimer = null;
    function addShot() {
      var fromLeft = Math.random() < 0.5;
      var y0 = Math.random() * canvas.height * 0.6;
      var x0 = fromLeft ? -20 : canvas.width + 20;
      var speed = 6 + Math.random() * 5;
      var angle = fromLeft ? (Math.random() * 0.5 - 0.1) : Math.PI - (Math.random() * 0.5 - 0.1);
      shooters.push({
        x: x0, y: y0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 1.5,
        len: 60 + Math.random() * 50,
        life: 1
      });
    }
    function spawnShooter() {
      addShot();
      // rare double shooting star
      if (Math.random() < 0.12) {
        hostWin.setTimeout(addShot, 150 + Math.random() * 200);
      }
      shooterTimer = hostWin.setTimeout(spawnShooter, 2200 + Math.random() * 3200);
    }
    shooterTimer = hostWin.setTimeout(spawnShooter, 1200 + Math.random() * 2000);

    function onMove(e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() { mouse.x = -9999; mouse.y = -9999; }
    hostDoc.addEventListener('mousemove', onMove);
    hostDoc.addEventListener('mouseleave', onLeave);

    var t = 0;
    var REPEL_RADIUS = 70;
    function tick() {
      t += 0.016;
      var w = canvas.width, h = canvas.height;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -5) s.x = w + 5; if (s.x > w + 5) s.x = -5;
        if (s.y < -5) s.y = h + 5; if (s.y > h + 5) s.y = -5;

        var px = s.x + s.dx, py = s.y + s.dy;
        var mdx = px - mouse.x, mdy = py - mouse.y;
        var dist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (dist < REPEL_RADIUS) {
          var force = (1 - dist / REPEL_RADIUS) * 10;
          var ang = Math.atan2(mdy, mdx);
          s.dx += Math.cos(ang) * force * 0.12;
          s.dy += Math.sin(ang) * force * 0.12;
        }
        s.dx *= 0.9;
        s.dy *= 0.9;

        var a = s.alpha * (0.8 + 0.2 * Math.sin(t * s.twSpeed + s.twPhase));
        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + s.color + ',' + a.toFixed(3) + ')';
        ctx.arc(s.x + s.dx, s.y + s.dy, s.size, 0, 6.29);
        ctx.fill();
      }

      for (var j = shooters.length - 1; j >= 0; j--) {
        var sh = shooters[j];
        sh.x += sh.vx; sh.y += sh.vy;
        var tx = sh.x - sh.vx * (sh.len / Math.max(1, Math.hypot(sh.vx, sh.vy)));
        var ty = sh.y - sh.vy * (sh.len / Math.max(1, Math.hypot(sh.vx, sh.vy)));
        var grad = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
        grad.addColorStop(0, 'rgba(255,255,255,' + sh.life.toFixed(2) + ')');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        sh.life -= 0.012;
        if (sh.life <= 0 || sh.x < -100 || sh.x > w + 100 || sh.y > h + 100) shooters.splice(j, 1);
      }

      raf = hostWin.requestAnimationFrame(tick);
    }
    tick();
    return function stop() {
      hostWin.cancelAnimationFrame(raf);
      hostWin.clearTimeout(shooterTimer);
      hostWin.removeEventListener('resize', resize);
      hostDoc.removeEventListener('mousemove', onMove);
      hostDoc.removeEventListener('mouseleave', onLeave);
    };
  }

  function chromeShell(opts) {
    var tabs = (opts.tabs && opts.tabs.length) ? opts.tabs : [opts.title];
    var tabsHtml = tabs.map(function (t, i) {
      return '<div class="bm-tab' + (i === 0 ? ' active' : '') + '" data-act="tab" data-idx="' + i + '">'
        + '<span class="bm-fav"></span><span class="bm-ttl">' + t + '</span></div>';
    }).join('');
    var wrap = document.createElement('div');
    wrap.className = 'bm-win';
    wrap.innerHTML = ''
      + '<div class="bm-chrome" data-drag-handle>'
      + '  <div class="bm-dotsrow">'
      + '    <span class="bm-dot red" data-act="close" title="Close"></span>'
      + '    <span class="bm-dot yellow" data-act="min" title="Minimize"></span>'
      + '    <span class="bm-dot green" data-act="max" title="Maximize"></span>'
      + '  </div>'
      + '  <div class="bm-tabrow">' + tabsHtml + '</div>'
      + '  <div class="bm-addrrow">'
      + '    <span class="bm-navbtn">&#8592;</span>'
      + '    <span class="bm-navbtn">&#8594;</span>'
      + '    <span class="bm-navbtn">&#8635;</span>'
      + '    <div class="bm-addr"><span class="bm-url">' + opts.url + '</span></div>'
      + '  </div>'
      + '</div>'
      + '<div class="bm-stage">'
      + '  <canvas class="bm-stars"></canvas>'
      + '  <div class="bm-body"></div>'
      + '</div>';
    return wrap;
  }

  function makeDraggable(handles, target, doc) {
    var drag = false, ox = 0, oy = 0;
    function down(e) {
      if (e.target.closest('[data-act]') || e.target.closest('.bm-addr')) return;
      drag = true;
      var p = e.touches ? e.touches[0] : e;
      ox = p.clientX - target.offsetLeft;
      oy = p.clientY - target.offsetTop;
      e.preventDefault();
    }
    function move(e) {
      if (!drag) return;
      var p = e.touches ? e.touches[0] : e;
      target.style.left = (p.clientX - ox) + 'px';
      target.style.top = (p.clientY - oy) + 'px';
    }
    function up() { drag = false; }
    handles.forEach(function (h) {
      h.addEventListener('mousedown', down);
      h.addEventListener('touchstart', down, { passive: false });
    });
    doc.addEventListener('mousemove', move);
    doc.addEventListener('mouseup', up);
    doc.addEventListener('touchmove', move, { passive: false });
    doc.addEventListener('touchend', up);
  }

  function makeResizable(handle, target, doc, minW, minH) {
    var rz = false, sx = 0, sy = 0, sw = 0, sh = 0;
    function down(e) {
      rz = true;
      var p = e.touches ? e.touches[0] : e;
      sx = p.clientX; sy = p.clientY;
      sw = target.offsetWidth; sh = target.offsetHeight;
      e.preventDefault(); e.stopPropagation();
    }
    function move(e) {
      if (!rz) return;
      var p = e.touches ? e.touches[0] : e;
      target.style.width = Math.max(minW, sw + (p.clientX - sx)) + 'px';
      target.style.height = Math.max(minH, sh + (p.clientY - sy)) + 'px';
    }
    function up() { rz = false; }
    handle.addEventListener('mousedown', down);
    handle.addEventListener('touchstart', down, { passive: false });
    doc.addEventListener('mousemove', move);
    doc.addEventListener('mouseup', up);
    doc.addEventListener('touchmove', move, { passive: false });
    doc.addEventListener('touchend', up);
  }

  var zTop = 2147483000;

  // Creates a floating, draggable, resizable, chrome-styled window IN THE PAGE
  // (never a real popup/tab). bodyBuilder(bodyEl, win) fills in the content.
  function createFloatingWindow(opts, bodyBuilder) {
    var mobile = window.innerWidth < 640;
    var count = document.querySelectorAll('.bm-floatwin').length;
    var offset = count * 24;
    var win = document.createElement('div');
    win.className = 'bm-floatwin';
    win.style.cssText = 'position:fixed;top:' + (mobile ? '8px' : (60 + offset) + 'px')
      + ';left:' + (mobile ? '8px' : (60 + offset) + 'px')
      + ';width:' + (mobile ? 'calc(100vw - 16px)' : (opts.width || 640) + 'px')
      + ';height:' + (mobile ? 'calc(100vh - 16px)' : (opts.height || 440) + 'px')
      + ';z-index:' + (++zTop) + ';';
    win.addEventListener('mousedown', function () { win.style.zIndex = ++zTop; });
    win.addEventListener('touchstart', function () { win.style.zIndex = ++zTop; });

    injectCSSOnce(document);
    var shell = chromeShell({ title: opts.title, url: opts.url, tabs: opts.tabs });
    win.appendChild(shell);
    document.body.appendChild(win);

    var stopStars = startStarfield(shell.querySelector('.bm-stars'), window, document);
    makeDraggable([shell.querySelector('.bm-chrome')], win, document);
    var rzHandle = document.createElement('div');
    rzHandle.className = 'bm-resize';
    shell.appendChild(rzHandle);
    makeResizable(rzHandle, win, document, 300, 220);

    var minimized = false, lastH = win.style.height, maximized = false, prevRect = null;
    shell.addEventListener('click', function (e) {
      var actEl = e.target.closest('[data-act]');
      var act = actEl ? actEl.getAttribute('data-act') : null;
      if (!act) return;
      if (act === 'close') { stopStars(); win.remove(); }
      else if (act === 'tab') {
        var tabEl = actEl;
        var idx = tabEl.getAttribute('data-idx');
        Array.prototype.forEach.call(shell.querySelectorAll('.bm-tab'), function (tb) { tb.classList.remove('active'); });
        tabEl.classList.add('active');
        var bodyEl = shell.querySelector('.bm-body');
        Array.prototype.forEach.call(bodyEl.querySelectorAll(':scope > [data-idx]'), function (p) {
          p.style.display = (p.getAttribute('data-idx') === idx) ? '' : 'none';
        });
      }
      else if (act === 'min') {
        var stage = shell.querySelector('.bm-stage');
        if (!minimized) { lastH = win.style.height; stage.style.display = 'none'; win.style.height = 'auto'; rzHandle.style.display = 'none'; }
        else { stage.style.display = ''; win.style.height = lastH; rzHandle.style.display = ''; }
        minimized = !minimized;
      } else if (act === 'max') {
        if (!maximized) { prevRect = { top: win.style.top, left: win.style.left, width: win.style.width, height: win.style.height }; win.style.top = '0'; win.style.left = '0'; win.style.width = '100vw'; win.style.height = '100vh'; }
        else if (prevRect) { win.style.top = prevRect.top; win.style.left = prevRect.left; win.style.width = prevRect.width; win.style.height = prevRect.height; }
        maximized = !maximized;
      }
    });

    var body = shell.querySelector('.bm-body');
    bodyBuilder(body, win, shell);
    return win;
  }

  // ---------- the editor window ----------
  createFloatingWindow({ title: 'HTML Sandbox', url: 'about:blank', width: 660, height: 460, tabs: ['Sandbox', 'Browser'] }, function (body, win, shell) {
    body.id = 'bmSandbox';
    var mobile = window.innerWidth < 640;
    body.innerHTML = ''
      + '<div class="bm-tabpane" data-idx="0">'
      + '  <div class="bm-panes" style="' + (mobile ? 'flex-direction:column' : '') + '">'
      + '    <div class="bm-pane" style="' + (mobile ? 'border-left:none;border-top:none' : '') + '">'
      + '      <div class="bm-panehead">Source</div>'
      + '      <textarea class="bm-code" placeholder="&lt;h1&gt;Hello world&lt;/h1&gt;"></textarea>'
      + '    </div>'
      + '    <div class="bm-pane" style="' + (mobile ? 'border-left:none;border-top:1px solid rgba(255,255,255,.08)' : '') + '">'
      + '      <div class="bm-panehead">Preview</div>'
      + '      <iframe class="bm-frame"></iframe>'
      + '    </div>'
      + '  </div>'
      + '  <div class="bm-actions">'
      + '    <button class="bm-btn primary" data-act="run-here">Run inline</button>'
      + '    <button class="bm-btn" data-act="run-window">Open in new window</button>'
      + '  </div>'
      + '</div>'
      + '<div class="bm-tabpane" data-idx="1" style="display:none">'
      + '  <div class="bm-addrrow" style="padding:10px 12px">'
      + '    <div class="bm-addr"><input type="text" class="bm-embed-input" value="https://storage.googleapis.com/arctic-games/arctic.html" placeholder="Enter a URL to embed"></div>'
      + '    <button class="bm-go" data-act="embed-go">Go</button>'
      + '  </div>'
      + '  <iframe class="bm-frame bm-embed-frame"></iframe>'
      + '</div>';

    var codeEl = body.querySelector('.bm-code');
    var frameEl = body.querySelector('.bm-frame:not(.bm-embed-frame)');
    var embedInput = body.querySelector('.bm-embed-input');
    var embedFrame = body.querySelector('.bm-embed-frame');
    var embedLoaded = false;

    function normalizeUrl(u) {
      u = u.trim();
      if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
      return u;
    }
    function loadEmbed() {
      embedFrame.src = normalizeUrl(embedInput.value);
      embedLoaded = true;
    }
    embedInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') loadEmbed(); });
    var browserTab = shell.querySelector('.bm-tab[data-idx="1"]');
    if (browserTab) browserTab.addEventListener('click', function () { if (!embedLoaded) loadEmbed(); });

    body.addEventListener('click', function (e) {
      var act = e.target.getAttribute('data-act');
      if (act === 'embed-go') { loadEmbed(); return; }
      if (!act) return;
      if (act === 'run-here') {
        var d = frameEl.contentDocument;
        d.open(); d.write(codeEl.value); d.close();
      } else if (act === 'run-window') {
        createFloatingWindow({ title: 'Result', url: 'about:blank', width: 700, height: 480 }, function (resultBody) {
          var iframe = document.createElement('iframe');
          iframe.className = 'bm-frame';
          resultBody.appendChild(iframe);
          var idoc = iframe.contentDocument;
          idoc.open(); idoc.write(codeEl.value); idoc.close();
        });
      }
    });
  });
})();
