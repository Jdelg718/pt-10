// PT-10 exercise figures: animated stick figures, keyframe poses in a 200x200 box (ground y=180).
// Pose keys: h head, s shoulders, p hips, le/lh left elbow/hand, re/rh right, lk/lf left knee/foot, rk/rf right.
(function(){
  const P = (o) => o;
  // ---------- reusable poses ----------
  const standFront = P({h:[100,38],s:[100,58],p:[100,110],le:[88,82],lh:[85,106],re:[112,82],rh:[115,106],lk:[94,145],lf:[92,180],rk:[106,145],rf:[108,180]});
  const standSide  = P({h:[100,38],s:[100,58],p:[100,110],le:[98,84],lh:[100,108],re:[103,84],rh:[105,108],lk:[99,145],lf:[98,180],rk:[102,145],rf:[103,180]});
  const plankTop   = P({h:[160,112],s:[146,120],p:[98,128],le:[145,146],lh:[145,172],re:[149,146],rh:[149,172],lk:[70,150],lf:[42,172],rk:[70,150],rf:[44,173]});
  const plankLow   = P({h:[163,147],s:[147,154],p:[98,160],le:[126,160],lh:[145,174],re:[130,162],rh:[149,174],lk:[70,167],lf:[42,175],rk:[70,167],rf:[44,176]});
  const squatHands = P({h:[128,104],s:[118,112],p:[86,140],le:[132,140],lh:[140,172],re:[135,140],rh:[144,172],lk:[112,148],lf:[100,180],rk:[115,149],rf:[103,180]});
  const jumpArms   = P({h:[100,28],s:[100,48],p:[100,100],le:[94,26],lh:[92,4],re:[106,26],rh:[108,4],lk:[99,135],lf:[98,168],rk:[102,135],rf:[103,168]});
  const backFlat   = P({h:[40,164],s:[56,167],p:[104,170],le:[78,172],lh:[100,175],re:[80,172],rh:[102,175],lk:[136,170],lf:[170,172],rk:[136,170],rf:[170,172]});
  const sw = (pose) => ({...pose, lk:pose.rk, lf:pose.rf, rk:pose.lk, rf:pose.lf}); // swap legs
  const swA = (pose) => ({...pose, le:pose.re, lh:pose.rh, re:pose.le, rh:pose.lh}); // swap arms

  // ---------- exercises ----------
  const highKnee = P({h:[100,36],s:[100,56],p:[100,108],le:[90,80],lh:[100,98],re:[112,78],rh:[124,64],lk:[124,112],lf:[120,146],rk:[100,144],rf:[100,180]});
  const jog = P({...highKnee, lk:[116,128],lf:[108,158]});
  const fk1 = P({...backFlat, lk:[136,154],lf:[166,136],rk:[137,170],rf:[171,170]});
  const climbA = P({...plankTop, lk:[128,150],lf:[104,170],rk:[70,150],rf:[44,173]});
  const lungeDown = P({h:[100,52],s:[100,72],p:[100,122],le:[98,96],lh:[100,120],re:[103,96],rh:[105,120],lk:[128,140],lf:[130,180],rk:[84,170],rf:[56,177]});
  const sitDown = P({h:[44,164],s:[60,167],p:[106,170],le:[72,158],lh:[64,160],re:[74,158],rh:[66,160],lk:[132,140],lf:[152,178],rk:[134,141],rf:[154,178]});
  const sitUp = P({h:[110,100],s:[101,118],p:[106,170],le:[114,128],lh:[105,130],re:[116,128],rh:[107,130],lk:[132,140],lf:[152,178],rk:[134,141],rf:[154,178]});
  const bridgeDown = P({h:[40,168],s:[56,170],p:[100,172],le:[76,174],lh:[96,176],re:[78,174],rh:[98,176],lk:[130,140],lf:[148,178],rk:[132,141],rf:[150,178]});
  const bridgeUp = P({...bridgeDown, p:[100,138], lk:[132,132], rk:[134,133]});
  const vFlat = P({...backFlat, le:[28,166],lh:[8,166],re:[28,167],rh:[8,167]});
  const vUp = P({h:[76,112],s:[82,130],p:[104,170],le:[106,118],lh:[130,104],re:[108,119],rh:[132,105],lk:[126,140],lf:[146,110],rk:[127,141],rf:[148,111]});
  const bearA = P({h:[160,118],s:[146,128],p:[88,124],le:[148,150],lh:[150,175],re:[153,148],rh:[160,168],lk:[100,160],lf:[72,176],rk:[98,160],rf:[70,168]});
  const holdPose = P({h:[82,62],s:[82,82],p:[82,134],le:[96,108],lh:[112,128],re:[98,108],rh:[114,129],lk:[124,134],lf:[124,180],rk:[126,135],rf:[126,180]});
  const holdBreathe = P({...holdPose, h:[82,64], s:[82,84]});
  const jackOut = P({h:[100,38],s:[100,58],p:[100,110],le:[80,40],lh:[72,18],re:[120,40],rh:[128,18],lk:[82,145],lf:[70,180],rk:[118,145],rf:[130,180]});
  const circ = (a) => { // arm circles, front view: arms out to the sides, hands trace small circles
    const r=12, la=a, ra=Math.PI-a;
    return {...standFront, le:[72,60], lh:[46+Math.cos(la)*r, 60+Math.sin(la)*r],
                           re:[128,60], rh:[154+Math.cos(ra)*r, 60+Math.sin(ra)*r]};
  };
  const hipOpen = P({...standFront, lk:[70,122],lf:[86,140]});
  const hamstring = P({h:[132,112],s:[122,96],p:[90,110],le:[124,130],lh:[124,160],re:[127,130],rh:[127,160],lk:[94,145],lf:[96,180],rk:[96,145],rf:[98,180]});
  const chestStretch = P({...standSide, h:[102,38], le:[90,82],lh:[78,104],re:[92,82],rh:[80,104]});
  const breatheUp = P({...standFront, le:[84,44],lh:[80,20],re:[116,44],rh:[120,20]});

  const FIG = {
    jacks:   {f:[standFront, jackOut], d:0.9},
    pushup:  {f:[plankTop, plankLow], d:1.6},
    diamond: {f:[plankTop, {...plankLow, le:[132,158], re:[134,160]}], d:1.6},
    squat:   {f:[standSide, {h:[108,72],s:[100,90],p:[80,138],le:[124,92],lh:[150,90],re:[126,94],rh:[152,92],lk:[116,140],lf:[103,180],rk:[118,141],rf:[105,180]}], d:1.6},
    eight:   {f:[standSide, squatHands, plankTop, plankLow, plankTop, squatHands], d:4.0},
    burpee:  {f:[standSide, squatHands, plankLow, squatHands, jumpArms], d:3.2},
    flutter: {f:[fk1, sw(fk1)], d:0.6},
    climb:   {f:[climbA, sw(climbA)], d:0.7},
    lunge:   {f:[standSide, lungeDown, standSide, sw(lungeDown)], d:3.0},
    plank:   {f:[{h:[162,128],s:[148,138],le:[146,172],lh:[172,172],re:[150,172],rh:[176,172],p:[100,140],lk:[70,154],lf:[40,172],rk:[70,154],rf:[42,173]},
                 {h:[162,127],s:[148,137],le:[146,172],lh:[172,172],re:[150,172],rh:[176,172],p:[100,137],lk:[70,153],lf:[40,172],rk:[70,153],rf:[42,173]}], d:3.0},
    situp:   {f:[sitDown, sitUp], d:2.0},
    knees:   {f:[highKnee, swA(sw(highKnee))], d:0.6},
    bridge:  {f:[bridgeDown, bridgeUp], d:2.0},
    vup:     {f:[vFlat, vUp], d:2.0},
    bear:    {f:[bearA, swA(sw(bearA))], d:1.0},
    hold:    {f:[holdPose, holdBreathe], d:3.0},
    circles: {fn:(t) => circ(t*Math.PI*2), d:1.6},
    jog:     {f:[jog, swA(sw(jog))], d:0.8},
    hipopen: {f:[standFront, hipOpen, standFront, {...standFront, rk:[130,122], rf:[114,140]}], d:2.4},
    hamstring:{f:[standSide, hamstring, hamstring], d:4.0},
    chest:   {f:[standSide, chestStretch, chestStretch], d:4.0},
    breathe: {f:[standFront, breatheUp], d:5.0},
    rest:    {f:[standFront, {...standFront, h:[100,39], s:[100,59]}], d:3.0},
  };
  const SEG = [["s","p"],["s","le"],["le","lh"],["s","re"],["re","rh"],["p","lk"],["lk","lf"],["p","rk"],["rk","rf"]];
  const FAR = new Set(["le","lh","lk","lf"]);
  const ease = (x) => 0.5 - Math.cos(x*Math.PI)/2;
  function poseAt(key, t){
    const F = FIG[key] || FIG.rest;
    t = ((t % 1) + 1) % 1; // rAF timestamps can precede t0
    if (F.fn) return F.fn(t);
    const n = F.f.length; if (n === 1) return F.f[0];
    const x = t * n, i = Math.floor(x), a = F.f[i], b = F.f[(i+1) % n], k = ease(x - i), out = {};
    for (const j in a) out[j] = [a[j][0] + (b[j][0]-a[j][0])*k, a[j][1] + (b[j][1]-a[j][1])*k];
    return out;
  }
  function draw(svg, key, t, color){
    const p = poseAt(key, t); let s = '<line x1="10" y1="181" x2="190" y2="181" stroke="#4a5a3c" stroke-width="3"/>';
    for (const [a,b] of SEG) {
      const far = FAR.has(b);
      s += `<line x1="${p[a][0].toFixed(1)}" y1="${p[a][1].toFixed(1)}" x2="${p[b][0].toFixed(1)}" y2="${p[b][1].toFixed(1)}" stroke="${far ? "#8a9a6a" : color}" stroke-width="${far ? 7 : 8}" stroke-linecap="round"/>`;
    }
    s += `<circle cx="${p.h[0].toFixed(1)}" cy="${p.h[1].toFixed(1)}" r="13" fill="${color}"/>`;
    svg.innerHTML = s;
  }
  window.PTFig = {
    FIG, draw,
    animate(svg, getKey, getColor){
      const t0 = performance.now();
      (function loop(now){
        const key = getKey(); const d = (FIG[key] || FIG.rest).d;
        draw(svg, key, ((now - t0)/1000)/d, getColor());
        requestAnimationFrame(loop);
      })(t0);
    },
    still(svg, key, t=0.25){ draw(svg, key, t, "#d8c9a3"); },
  };
})();
