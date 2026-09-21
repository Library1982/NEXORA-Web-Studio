const glow=document.querySelector('.cursor-glow');

/* Adaptive MYORYX identity: M follows --accent, Y follows --accent-2,
   while the oryx and remaining wordmark retain champagne gold. */
const fullLogo=`<svg class="myoryx-svg myoryx-full" viewBox="0 0 620 150" role="img" aria-label="MYORYX Digital Solutions"><g class="oryx-gold" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M42 91C55 55 79 28 120 13" stroke-width="9"/><path d="M126 91C113 55 89 28 48 13" stroke-width="9"/><path d="M55 67Q84 49 113 67" stroke-width="6"/><path d="M61 109Q84 135 107 109" stroke-width="6"/></g><path class="identity-m" d="M51 112V70l33 31 33-31v42h-13V91l-20 19-20-19v21z"/><path class="identity-y" d="M64 68h15l13 16 13-16h15L99 94v20H85V94z"/><g font-family="Manrope,Inter,Arial,sans-serif" font-size="61" font-weight="800" letter-spacing="5"><text class="identity-m" x="151" y="96">M</text><text class="identity-y" x="205" y="96">Y</text><text class="oryx-gold" x="260" y="96">ORYX</text></g><text class="logo-subtitle" x="153" y="127" font-family="Inter,Arial,sans-serif" font-size="12" font-weight="700" letter-spacing="7">DIGITAL SOLUTIONS</text></svg>`;
const markLogo=`<svg class="myoryx-svg myoryx-mark" viewBox="0 0 168 150" aria-hidden="true"><g class="oryx-gold" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M42 91C55 55 79 28 120 13" stroke-width="9"/><path d="M126 91C113 55 89 28 48 13" stroke-width="9"/><path d="M55 67Q84 49 113 67" stroke-width="6"/><path d="M61 109Q84 135 107 109" stroke-width="6"/></g><path class="identity-m" d="M51 112V70l33 31 33-31v42h-13V91l-20 19-20-19v21z"/><path class="identity-y" d="M64 68h15l13 16 13-16h15L99 94v20H85V94z"/></svg>`;
document.querySelectorAll('[data-logo]').forEach(slot=>{slot.innerHTML=slot.dataset.logo==='mark'?markLogo:fullLogo});

document.addEventListener('mousemove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
window.addEventListener('load',()=>window.setTimeout(()=>document.getElementById('pageLoader')?.classList.add('done'),850));
const header=document.querySelector('header'),menuBtn=document.querySelector('.menu');
if(header&&menuBtn){menuBtn.addEventListener('click',()=>{const open=header.classList.toggle('nav-open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.textContent=open?'×':'☰'});header.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{header.classList.remove('nav-open');menuBtn.setAttribute('aria-expanded','false');menuBtn.textContent='☰'}));}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const c=document.getElementById('network'),x=c.getContext('2d');let pts=[];
function resize(){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);pts=Array.from({length:55},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16}))}resize();addEventListener('resize',resize);
function draw(){x.clearRect(0,0,innerWidth,innerHeight);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;x.fillStyle='#5acfff55';x.beginPath();x.arc(p.x,p.y,1,0,7);x.fill()}for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){let a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<130){x.strokeStyle=`rgba(82,161,220,${(1-d/130)*.10})`;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}requestAnimationFrame(draw)}draw();
window.addEventListener('scroll',()=>{const s=scrollY;document.querySelector('.stage').style.transform=`translateY(${s*.045}px)`});

document.querySelectorAll('.filters button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');let f=btn.dataset.filter;document.querySelectorAll('.demo-card').forEach(c=>c.classList.toggle('hide',f!=='all'&&c.dataset.cat!==f));}));


const socialToggle=document.getElementById('socialToggle');
const contactDock=document.querySelector('.contact-dock');
if(socialToggle && contactDock){
  socialToggle.addEventListener('click',e=>{
    e.stopPropagation();
    const open=contactDock.classList.toggle('open');
    socialToggle.setAttribute('aria-expanded',String(open));
  });
  document.addEventListener('click',e=>{
    if(!contactDock.contains(e.target)){
      contactDock.classList.remove('open');
      socialToggle.setAttribute('aria-expanded','false');
    }
  });
}


/* =========================================================
   THEME / COLOR PREFERENCES
   ========================================================= */
(function(){
  const body=document.body;
  const panel=document.getElementById('themePanel');
  const panelBtn=document.getElementById('themeMainBtn');
  const headerToggle=document.getElementById('headerThemeToggle');
  const modeBtns=[...document.querySelectorAll('.mode-btn')];
  const colorBtns=[...document.querySelectorAll('.color-dot')];

  const savedTheme=localStorage.getItem('myoryx-theme') || 'dark';
  const savedAccent=localStorage.getItem('myoryx-accent') || '#e10600';
  const savedAccent2=localStorage.getItem('myoryx-accent2') || '#ff4b45';

  function applyTheme(theme){
    body.dataset.theme=theme;
    localStorage.setItem('myoryx-theme',theme);
    modeBtns.forEach(b=>b.classList.toggle('active',b.dataset.theme===theme));
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='light'?'#f4f7fb':'#05070b');
  }
  function applyAccent(a,b){
    document.documentElement.style.setProperty('--accent',a);
    document.documentElement.style.setProperty('--accent-2',b);
    localStorage.setItem('myoryx-accent',a);
    localStorage.setItem('myoryx-accent2',b);
    colorBtns.forEach(btn=>btn.classList.toggle('active',btn.dataset.accent.toLowerCase()===a.toLowerCase()));
  }

  applyTheme(savedTheme);
  applyAccent(savedAccent,savedAccent2);

  modeBtns.forEach(btn=>btn.addEventListener('click',()=>applyTheme(btn.dataset.theme)));
  colorBtns.forEach(btn=>btn.addEventListener('click',()=>applyAccent(btn.dataset.accent,btn.dataset.accent2)));

  if(headerToggle){
    headerToggle.addEventListener('click',()=>applyTheme(body.dataset.theme==='dark'?'light':'dark'));
  }
  if(panelBtn && panel){
    panelBtn.addEventListener('click',e=>{
      e.stopPropagation();
      panel.classList.toggle('open');
    });
    document.addEventListener('click',e=>{
      if(!panel.contains(e.target)) panel.classList.remove('open');
    });
  }
})();
