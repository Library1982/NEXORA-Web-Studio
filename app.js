const glow=document.querySelector('.cursor-glow');
document.addEventListener('mousemove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
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

  const savedTheme=localStorage.getItem('nexora-theme') || 'dark';
  const savedAccent=localStorage.getItem('nexora-accent') || '#6ee7ff';
  const savedAccent2=localStorage.getItem('nexora-accent2') || '#7276ff';

  function applyTheme(theme){
    body.dataset.theme=theme;
    localStorage.setItem('nexora-theme',theme);
    modeBtns.forEach(b=>b.classList.toggle('active',b.dataset.theme===theme));
  }
  function applyAccent(a,b){
    document.documentElement.style.setProperty('--accent',a);
    document.documentElement.style.setProperty('--accent-2',b);
    localStorage.setItem('nexora-accent',a);
    localStorage.setItem('nexora-accent2',b);
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
