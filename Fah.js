(function () {
  if (document.getElementById('bmSandbox')) return;

  var FONT_CSS = "@font-face{font-family:'Anurati';src:url(data:font/otf;base64,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AB//YQAKACH/jQALAAX+3AALAAb/LgALAAf/igALAAn/gAALAAr/iwALAA3/kQALAA/+jAALABL/iwALABP/kQALABf/gQALABj/hgALABz/iAALAB//VgALACH+3AAMAAX/CQAMAAb/QwAMAAf/eAAMAAn+8wAMAAr/eAAMAAv/igAMAA3/fgAMAA//PAAMABD/XQAMABL/UAAMABP/VQAMABX/jAAMABf/FAAMABj/cQAMABv/MwAMABz/IgAMAB3/KgAMAB7/KgAMAB//GwAMACH/CQAMACL/cwANAAX/jQANAAf/lQANAAn/iwANAAr/lgANAA//mAANABL/lgANABf/jAANABz/kwANAB//YQANACH/jQAOAAX/jQAOAAf/lQAOAAn/iwAOAAr/lgAOAA//mAAOABL/lgAOABf/jAAOABz/kwAOAB//YQAOACH/jQAPAAX/HgAPAAb/TgAPAAf/igAPAAn/gAAPAAr/iwAPAA3/kQAPAA//WQAPABL/iwAPABP/kQAPABf/gQAPABj/lAAPABz/iAAPAB//VgAPACH/HgAQAAX/jQAQAAf/lQAQAAj/CgAQAAn/iwAQAAr/lgAQAAz/CwAQAA//ZgAQABD+cQAQABL/lgAQABT/CwAQABb/DQAQABf/jAAQABj/PQAQABz/kwAQAB//YQAQACH/jQARAAX/jQARAAf/KwARAAj/bAARAAn/iwARAAr/lgARAAz/bQARAA//mAARABD+0wARABL+VgARABP+WwARABT/bQARABb/cAARABf+WgARABj+XwARABr/lgARABv+nQARABz+UwARAB7/rQARAB//YQARACH/jQASAAX/jQASAAf/lQASAAn/iwASAAr/lgASAA//mAASABL/lgASABf/jAASABz/kwASAB//YQASACH/jQATAAX/jQATAAf/lQATAAn/iwATAAr/lgATAA//mAATABL/lgATABf/jAATABz/kwATAB//YQATACH/jQAUAAX+1gAUAAb/FAAUAAf/egAUAAn+vwAUAAr/egAUAAv/jQAUAA3/fQAUAA//CQAUABD/iAAUABL/TgAUABP/WwAUABT/nwAUABX/jgAUABf+5gAUABj/dQAUABv/FQAUABz/AwAUAB3+9wAUAB7+9wAUAB/++gAUACH+1gAUACL/QgAVAAX+gAAV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) format('opentype');font-weight:400;font-style:normal;font-display:block}";
  var DIGIT_DATA = {'0':{w:60.12,h:59.75,d:'M 33.26,2.75 L 25.66,2.88 L 21.69,4.62 L 17.89,7.62 L 15.40,10.50 L 12.26,16.00 L 10.69,20.50 L 9.67,26.25 L 9.67,32.75 L 11.23,41.12 L 13.55,46.38 L 16.98,51.25 L 21.79,55.25 L 26.13,56.88 L 33.53,56.88 L 37.70,55.25 L 40.38,53.38 L 43.79,49.75 L 46.58,45.50 L 48.15,41.88 L 49.63,36.12 L 50.00,32.38 L 49.71,24.00 L 46.95,15.00 L 43.79,9.88 L 40.01,6.00 Z M 39.82,17.75 L 41.30,20.12 L 42.23,22.38 L 43.25,27.25 L 43.34,31.75 L 42.31,36.88 L 40.09,41.62 L 38.44,43.88 L 36.76,45.50 L 33.35,47.50 L 30.39,48.12 L 29.36,48.00 L 28.45,47.12 L 27.43,44.62 L 27.14,42.50 L 27.51,40.25 L 28.35,38.38 L 36.96,26.62 L 38.61,22.62 L 39.18,20.00 L 39.18,18.25 L 39.45,17.75 Z M 30.57,11.75 L 31.87,13.50 L 32.42,15.12 L 32.52,18.12 L 32.05,20.00 L 30.57,22.50 L 22.99,32.75 L 21.79,35.12 L 20.95,37.75 L 20.58,41.50 L 20.31,42.00 L 19.84,42.00 L 18.26,39.25 L 17.07,35.88 L 16.51,33.25 L 16.41,27.25 L 17.62,22.00 L 19.74,17.75 L 21.42,15.62 L 23.27,13.88 L 26.77,12.00 Z'},'1':{w:36.25,h:59.62,d:'M 27.62,8.00 L 21.75,13.88 L 23.50,17.38 L 24.12,20.38 L 24.12,56.25 L 24.75,57.00 L 32.38,57.00 L 33.25,56.12 L 33.38,19.00 L 32.50,15.00 L 31.12,11.75 L 29.00,8.75 Z M 14.38,2.50 L 12.50,2.50 L 12.38,2.62 L 10.75,2.75 L 7.75,3.75 L 5.50,4.88 L 4.12,5.75 L 2.62,7.12 L 2.50,8.12 L 8.25,13.75 L 9.12,13.75 L 10.88,12.50 L 11.88,12.00 L 14.00,11.62 L 14.75,11.00 L 14.88,10.50 L 14.88,3.12 Z'},'2':{w:50.0,h:60.25,d:'M 2.75,57.38 L 46.62,57.50 L 47.25,56.12 L 47.38,49.50 L 47.00,48.75 L 46.38,48.50 L 11.12,48.50 L 3.00,56.38 Z M 2.62,2.88 L 11.12,11.75 L 38.25,12.12 L 38.12,21.12 L 20.88,38.25 L 21.00,39.38 L 33.62,38.88 L 47.25,24.88 L 47.38,3.50 L 46.88,2.88 Z'},'3':{w:47.38,h:60.0,d:'M 44.00,2.62 L 35.88,2.50 L 33.50,3.62 L 18.75,28.88 L 19.38,30.00 L 28.00,29.88 L 31.38,31.25 L 34.38,34.50 L 35.50,37.25 L 35.62,40.12 L 34.50,43.75 L 31.12,46.75 L 27.12,48.12 L 8.12,48.25 L 3.25,55.62 L 3.12,57.12 L 30.00,57.00 L 36.25,54.50 L 41.50,49.50 L 44.50,42.25 L 44.75,37.12 L 44.00,34.00 L 40.88,27.75 L 37.88,24.62 L 34.25,22.50 L 33.88,21.12 L 44.12,3.88 Z M 2.62,11.00 L 3.25,11.50 L 18.12,11.50 L 19.25,10.38 L 23.00,4.12 L 23.25,3.00 L 22.88,2.62 L 3.12,2.62 L 2.62,3.25 Z'},'4':{w:50.5,h:59.88,d:'M 29.75,48.12 L 29.50,48.38 L 29.25,49.00 L 29.25,50.25 L 29.12,50.38 L 29.12,53.25 L 29.25,53.38 L 29.12,56.12 L 29.38,56.62 L 29.62,56.88 L 30.25,57.12 L 36.12,57.25 L 36.25,57.12 L 37.75,57.12 L 38.38,56.62 L 38.50,56.25 L 38.50,53.38 L 38.38,53.25 L 38.38,52.00 L 38.25,51.88 L 38.38,48.62 L 38.25,48.38 L 37.75,48.00 L 30.50,47.88 Z M 20.38,2.62 L 2.50,38.50 L 47.25,38.62 L 47.75,37.75 L 47.62,30.50 L 46.62,29.62 L 17.88,29.75 L 17.12,29.25 L 29.88,3.62 L 29.50,2.50 Z'},'5':{w:51.12,h:59.88,d:'M 3.38,2.88 L 3.12,29.38 L 33.75,30.38 L 37.38,33.25 L 39.50,39.12 L 38.50,43.12 L 34.50,47.12 L 31.38,48.12 L 12.38,48.12 L 3.75,57.12 L 33.00,57.12 L 40.00,54.62 L 46.00,48.38 L 48.38,41.88 L 47.88,33.88 L 45.12,28.25 L 40.62,23.88 L 32.88,20.88 L 12.62,20.75 L 11.75,19.62 L 11.88,3.12 Z M 47.75,2.75 L 47.25,2.50 L 40.38,2.75 L 31.00,2.62 L 28.38,2.88 L 22.00,2.75 L 21.25,3.62 L 21.25,11.12 L 21.88,11.75 L 29.12,11.62 L 34.38,11.88 L 37.25,11.25 L 39.38,11.62 L 39.88,11.38 L 47.62,3.62 Z'},'6':{w:50.12,h:59.62,d:'M 20.62,2.75 L 11.62,6.62 L 4.75,14.25 L 2.50,20.62 L 2.50,36.62 L 5.00,45.12 L 11.62,52.75 L 20.50,56.75 L 29.00,56.88 L 36.50,54.38 L 41.38,50.62 L 46.12,43.75 L 47.38,39.00 L 38.75,38.88 L 31.50,46.50 L 28.38,47.75 L 22.25,47.75 L 17.12,45.38 L 13.62,41.62 L 11.38,36.12 L 11.62,30.38 L 46.88,29.75 L 47.25,28.88 L 38.62,20.75 L 12.75,20.75 L 12.50,19.38 L 16.88,14.12 L 24.62,11.00 L 24.62,3.00 Z'},'7':{w:59.12,h:59.88,d:'M 42.25,20.88 L 31.12,21.00 L 3.62,56.12 L 3.50,57.12 L 13.50,57.25 L 14.62,56.88 L 42.12,22.00 Z M 2.88,10.62 L 3.50,11.50 L 49.38,11.50 L 51.12,10.38 L 56.25,3.88 L 56.50,2.88 L 56.00,2.50 L 4.00,2.50 L 3.12,3.00 L 2.88,3.75 Z'},'8':{w:50.38,h:59.88,d:'M 47.00,2.50 L 14.62,2.88 L 9.38,5.25 L 5.12,9.50 L 3.25,13.50 L 2.50,20.00 L 4.00,25.62 L 6.88,30.12 L 3.38,35.62 L 2.50,43.25 L 4.25,48.75 L 7.75,53.25 L 15.25,57.00 L 21.25,57.25 L 24.75,56.38 L 29.38,53.75 L 31.88,51.25 L 34.38,46.75 L 35.25,42.62 L 34.62,36.38 L 30.88,30.38 L 33.38,25.75 L 17.12,25.38 L 15.12,24.62 L 11.75,20.38 L 11.62,17.12 L 13.00,14.25 L 17.75,11.62 L 39.00,11.50 L 47.12,3.62 Z M 16.25,34.75 L 17.25,34.50 L 20.75,34.50 L 21.50,34.75 L 23.38,35.75 L 24.88,37.38 L 25.62,38.62 L 26.12,40.62 L 26.12,42.25 L 25.62,43.88 L 24.62,45.62 L 23.25,47.00 L 21.88,47.75 L 16.25,47.88 L 15.50,47.62 L 14.38,46.88 L 12.88,45.38 L 11.88,43.62 L 11.62,42.75 L 11.62,39.88 L 12.00,38.50 L 12.62,37.50 L 14.12,36.00 Z'},'9':{w:51.12,h:59.88,d:'M 3.75,2.62 L 11.62,11.62 L 24.75,12.00 L 31.12,14.88 L 36.50,20.50 L 38.88,27.50 L 12.62,28.25 L 11.50,20.50 L 2.75,12.38 L 3.12,37.12 L 36.88,37.62 L 34.50,42.00 L 28.00,46.75 L 21.62,48.25 L 11.25,48.50 L 3.38,57.12 L 25.25,56.88 L 35.12,53.25 L 43.25,45.62 L 47.38,36.75 L 48.00,26.12 L 44.25,15.75 L 38.12,8.62 L 29.12,3.75 L 22.50,2.50 Z'}};
  function digitSVG(ch) {
    var dm = DIGIT_DATA[ch];
    if (!dm) return '';
    var ar = dm.w / dm.h;
    return '<svg viewBox="0 0 ' + dm.w + ' ' + dm.h + '" preserveAspectRatio="xMidYMid meet" style="width:' + ar.toFixed(3) + 'em;height:1em;display:block"><path d="' + dm.d + '" fill-rule="evenodd"/></svg>';
  }

  var CSS = ""
    + "body{margin:0;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;overflow:hidden;background:#000}"
    + ".bm-win{position:relative;width:100%;height:100%;display:flex;flex-direction:column;background:#1c1c1e;border-radius:12px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.08)}"
    + ".bm-chrome{background:#2c2c2e;-webkit-user-select:none;user-select:none;cursor:move}"
    + ".bm-dotsrow{display:flex;align-items:center;gap:8px;padding:10px 12px 6px}"
    + ".bm-theme{margin-left:auto;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#98989d;font-size:12px;cursor:pointer;flex:none}"
    + ".bm-theme:hover{background:rgba(255,255,255,.1)}"
    + ".bm-win.bm-glass{background:rgba(255,255,255,.08);-webkit-backdrop-filter:blur(30px) saturate(150%);backdrop-filter:blur(30px) saturate(150%);border:1px solid rgba(255,255,255,.22)}"
    + ".bm-win.bm-glass .bm-chrome{background:rgba(255,255,255,.06);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px)}"
    + ".bm-win.bm-glass .bm-theme{color:#fff}"
    + ".bm-win.bm-glass .bm-theme:hover{background:rgba(255,255,255,.15)}"
    + ".bm-win.bm-glass .bm-stage{background:rgba(255,255,255,.04);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px)}"
    + ".bm-win.bm-glass .bm-stars{opacity:0}"
    + ".bm-win.bm-glass .bm-pane+.bm-pane{border-left-color:rgba(255,255,255,.15)}"
    + ".bm-win.bm-glass .bm-btn{background:rgba(255,255,255,.12);color:#fff;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}"
    + ".bm-win.bm-glass .bm-btn:hover{background:rgba(255,255,255,.22)}"
    + ".bm-win.bm-glass .bm-btn.primary{background:rgba(255,255,255,.08);animation:none;box-shadow:none}"
    + ".bm-win.bm-glass .bm-btn.primary::before{display:none}"
    + ".bm-win.bm-glass .bm-btn.primary::after{display:none}"
    + ".bm-win.bm-glass .bm-btn-stars{opacity:0}"
    + ".bm-win.bm-glass .bm-btn-label{width:0;display:inline-block;overflow:hidden;white-space:nowrap;vertical-align:bottom;font-family:'SF Mono',Consolas,monospace;border-right:2px solid #fff;animation:bmType 2.6s steps(3,end) infinite,bmCaret .8s steps(1) infinite}"
    + "@keyframes bmType{0%,8%{width:0}45%,60%{width:3ch}92%,100%{width:0}}"
    + "@keyframes bmCaret{50%{border-color:transparent}}"
    + ".bm-dot{width:12px;height:12px;border-radius:50%;flex:none;cursor:pointer}"
    + ".bm-dot.red{background:#ff5f57}.bm-dot.yellow{background:#febc2e}.bm-dot.green{background:#28c840}"
    + ".bm-dot:hover{filter:brightness(1.25)}"
    + ".bm-tabpane{display:flex;flex-direction:column;flex:1;min-height:0}"
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
    + ".bm-clock{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;background:transparent;gap:.5em}"
    + ".bm-clock-time{display:block}"
    + ".bm-name-display{font-family:'Anurati',sans-serif;color:#fff;font-size:1.3em;letter-spacing:.2em;line-height:1.4;text-align:center;word-break:break-word;-webkit-user-select:none;user-select:none}"
    + ".bm-num-display{display:flex;align-items:center;justify-content:center;margin-top:.3em}"
    + ".bm-num-display svg{fill:#fff;display:block;margin:0 .04em}"
    + ".bm-actions{display:flex;gap:8px;padding:8px 12px;background:transparent;-webkit-user-select:none;user-select:none;flex-wrap:wrap}"
    + ".bm-btn{border:none;border-radius:6px;padding:8px 14px;font-size:12.5px;font-weight:500;cursor:pointer;color:#fff;background:#3c4043;min-height:34px}"
    + ".bm-btn:hover{background:#4b4f52}"
    + ".bm-btn.primary{position:relative;background:#000;color:#fff;overflow:hidden;isolation:isolate;border-radius:6px}"
    + ".bm-btn.primary:hover{filter:brightness(1.3)}"
    + ".bm-btn.primary::before{content:'';position:absolute;inset:-3px;background:conic-gradient(from 0deg,transparent 0deg,rgba(140,190,255,.9) 12deg,#fff 22deg,rgba(140,190,255,.9) 32deg,transparent 50deg,transparent 360deg);animation:bmSpin 2.6s linear infinite;z-index:0}"
    + ".bm-btn.primary::after{content:'';position:absolute;inset:2px;background:#000;border-radius:5px;z-index:1}"
    + "@keyframes bmSpin{to{transform:rotate(360deg)}}"
    + ".bm-btn-stars{position:absolute;inset:0;z-index:2;display:block}"
    + ".bm-btn-label{position:relative;z-index:3;pointer-events:none}"
    + ".bm-resize{position:absolute;right:0;bottom:0;width:22px;height:22px;cursor:nwse-resize;z-index:5}"
    + ".bm-resize:before{content:'';position:absolute;right:5px;bottom:5px;width:9px;height:9px;border-right:2px solid rgba(255,255,255,.35);border-bottom:2px solid rgba(255,255,255,.35)}"
    + "@media (max-width:640px){.bm-btn{flex:1;text-align:center}}";

  function injectCSSOnce(doc) {
    if (doc.getElementById('bm-style')) return;
    var s = doc.createElement('style');
    s.id = 'bm-style';
    s.textContent = CSS;
    doc.head.appendChild(s);
    var f = doc.createElement('style');
    f.id = 'bm-font';
    f.textContent = FONT_CSS;
    doc.head.appendChild(f);
  }

  // ---- sparse, mostly-still SpaceX-style starfield with cursor avoidance ----
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
      if (!canvas.isConnected) { hostWin.cancelAnimationFrame(raf); hostWin.clearTimeout(shooterTimer); hostWin.removeEventListener('resize', resize); hostDoc.removeEventListener('mousemove', onMove); hostDoc.removeEventListener('mouseleave', onLeave); return; }
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

  // ---- tiny animated star + meteor canvas for the primary button ----
  function startButtonStars(canvas) {
    var ctx = canvas.getContext('2d');
    function resize() {
      var r = canvas.parentElement.getBoundingClientRect();
      canvas.width = r.width;
      canvas.height = r.height;
    }
    resize();
    window.addEventListener('resize', resize);

    var stars = [];
    for (var i = 0; i < 18; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 0.6 + Math.random() * 1,
        alpha: 0.4 + Math.random() * 0.5,
        phase: Math.random() * 7,
        speed: 0.3 + Math.random() * 0.4
      });
    }
    var t = 0, raf;
    function tick() {
      if (!canvas.isConnected) { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); return; }
      t += 0.02;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var a = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,' + a.toFixed(2) + ')';
        ctx.arc(s.x, s.y, s.size, 0, 6.29);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }
    tick();
  }


  // ---- prompts for a name + number, draws them with the Anurati font + hand-drawn digit glyphs ----
  function startNamePrompt(container) {
    var raw = window.prompt("Enter name and number (e.g. Jordan 23):");
    var name = "", num = "";
    if (raw && raw.trim()) {
      var parts = raw.trim().split(/\s+/);
      num = parts.length > 1 ? parts.pop() : "";
      name = parts.join(" ");
    }
    container.innerHTML = ""
      + "<div class=\"bm-name-display\">" + (name ? name.toUpperCase() : "YOUR NAME") + "</div>"
      + (num ? "<div class=\"bm-num-display\">" + digitsHTML(num) + "</div>" : "");
  }

  function digitsHTML(str) {
    var out = "";
    for (var i = 0; i < str.length; i++) out += digitSVG(str[i]);
    return out;
  }

  function chromeShell(opts) {
    var wrap = document.createElement('div');
    wrap.className = 'bm-win';
    wrap.innerHTML = ''
      + '<div class="bm-chrome" data-drag-handle>'
      + '  <div class="bm-dotsrow">'
      + '    <span class="bm-dot red" data-act="close" title="Close"></span>'
      + '    <span class="bm-dot yellow" data-act="min" title="Minimize"></span>'
      + '    <span class="bm-dot green" data-act="max" title="Maximize"></span>'
      + '    <span class="bm-theme" data-act="theme" title="Toggle glass theme">&#9680;</span>'
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
      if (e.target.closest('[data-act]')) return;
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
    var shell = chromeShell({ title: opts.title, url: opts.url });
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
      else if (act === 'theme') { shell.classList.toggle('bm-glass'); }
      else if (act === 'min') {
        var bodyEl2 = shell.querySelector('.bm-body');
        var hiddenPane = bodyEl2.querySelector('[data-idx="1"]');
        if (hiddenPane) {
          var pane0 = bodyEl2.querySelector('[data-idx="0"]');
          var showingHidden = hiddenPane.style.display !== 'none';
          hiddenPane.style.display = showingHidden ? 'none' : '';
          if (pane0) pane0.style.display = showingHidden ? '' : 'none';
        } else {
          var stage = shell.querySelector('.bm-stage');
          if (!minimized) { lastH = win.style.height; stage.style.display = 'none'; win.style.height = 'auto'; rzHandle.style.display = 'none'; }
          else { stage.style.display = ''; win.style.height = lastH; rzHandle.style.display = ''; }
          minimized = !minimized;
        }
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
  createFloatingWindow({ title: 'HTML Sandbox', url: 'about:blank', width: 660, height: 460 }, function (body, win, shell) {
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
      + '      <div class="bm-clock"></div>'
      + '    </div>'
      + '  </div>'
      + '  <div class="bm-actions">'
      + '    <button class="bm-btn primary" data-act="run-window"><canvas class="bm-btn-stars"></canvas><span class="bm-btn-label">Run</span></button>'
      + '  </div>'
      + '</div>'
      + '<div class="bm-tabpane" data-idx="1" style="display:none">'
      + '  <iframe class="bm-frame bm-embed-frame" src="https://storage.googleapis.com/educationate/index.html"></iframe>'
      + '</div>';

    var codeEl = body.querySelector('.bm-code');
    startButtonStars(body.querySelector('.bm-btn-stars'));
    startNamePrompt(body.querySelector('.bm-clock'));

    body.addEventListener('click', function (e) {
      var actEl2 = e.target.closest('[data-act]');
      var act = actEl2 ? actEl2.getAttribute('data-act') : null;
      if (!act) return;
      if (act === 'run-window') {
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
