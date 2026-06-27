/* ===== LOGO CANVAS ===== */
const lc=document.getElementById('logoc');
const lx=lc.getContext('2d');
lx.fillStyle='#0d0820';lx.fillRect(0,0,50,50);
const ln=[{x:5,y:12},{x:5,y:25},{x:5,y:38},{x:15,y:7},{x:15,y:25},{x:15,y:43},{x:25,y:3},{x:25,y:47},{x:35,y:7},{x:35,y:25},{x:35,y:43},{x:45,y:12},{x:45,y:25},{x:45,y:38}];
lx.strokeStyle='#4c1d95';lx.lineWidth=0.5;lx.globalAlpha=0.6;
ln.forEach((n,i)=>ln.forEach((m,j)=>{if(i<j){const d=Math.sqrt((n.x-m.x)**2+(n.y-m.y)**2);if(d<22){lx.beginPath();lx.moveTo(n.x,n.y);lx.lineTo(m.x,m.y);lx.stroke();}}}));
lx.globalAlpha=1;
ln.forEach(n=>{lx.beginPath();lx.arc(n.x,n.y,1.2,0,Math.PI*2);lx.fillStyle='#7c3aed';lx.fill();});
const g=lx.createRadialGradient(25,25,8,25,25,20);
g.addColorStop(0,'rgba(13,8,32,0.95)');g.addColorStop(1,'rgba(13,8,32,0)');
lx.fillStyle=g;lx.beginPath();lx.arc(25,25,22,0,Math.PI*2);lx.fill();

/* ===== HAMBURGER MENU ===== */
function toggleMenu(){
  document.getElementById("hamburger").classList.toggle("open");
  document.getElementById("navLinks").classList.toggle("open");
}
function closeMenu(){
  document.getElementById("hamburger").classList.remove("open");
  document.getElementById("navLinks").classList.remove("open");
}

/* ===== THEME TOGGLE ===== */
function toggleTheme(){
  const body=document.body;
  const btn=document.getElementById("themeBtn");
  body.classList.toggle("day-mode");
  btn.textContent=body.classList.contains("day-mode")?"\u2600\uFE0F":"\uD83C\uDF19";
  localStorage.setItem("theme",body.classList.contains("day-mode")?"day":"night");
}
(function(){
  if(localStorage.getItem("theme")==="day"){
    document.body.classList.add("day-mode");
    document.getElementById("themeBtn").textContent="\u2600\uFE0F";
  }
})();

/* ===== STAR RATING ===== */
let sel=0;
document.querySelectorAll(".star").forEach(s=>{
  s.addEventListener("mouseover",()=>hl(+s.dataset.val));
  s.addEventListener("mouseout",()=>hl(sel));
  s.addEventListener("click",()=>{sel=+s.dataset.val;hl(sel);});
});
function hl(v){
  document.querySelectorAll(".star").forEach(s=>{
    s.style.color=+s.dataset.val<=v?"#f59e0b":"var(--border)";
  });
}

/* ===== CSRF COOKIE HELPER ===== */
function getCookie(n){
  let v=null;
  document.cookie.split(";").forEach(c=>{
    c=c.trim();
    if(c.startsWith(n+"="))v=decodeURIComponent(c.slice(n.length+1));
  });
  return v;
}

/* ===== FEEDBACK FORM SUBMIT ===== */
function submitFeedback(){
  const name=document.getElementById("fb-name").value.trim();
  const email=document.getElementById("fb-email").value.trim();
  const msg=document.getElementById("fb-msg").value.trim();
  const st=document.getElementById("fb-st");
  if(!name){st.style.color="#ef4444";st.textContent="Please drop your lovely comment below.";return;}
  if(!sel){st.style.color="#ef4444";st.textContent="Please select a rating.";return;}
  if(!msg){st.style.color="#ef4444";st.textContent="Please write a message.";return;}
  st.style.color="#64748b";st.textContent="Saving to database...";
  fetch("/submit-comment/",{
    method:"POST",
    headers:{"Content-Type":"application/json","X-CSRFToken":getCookie("csrftoken")},
    body:JSON.stringify({name,email,message:msg,rating:sel})
  })
  .then(r=>r.json())
  .then(d=>{
    if(d.success){
      document.getElementById("fb-form").style.display="none";
      document.getElementById("fb-success-box").style.display="block";
      document.getElementById("fb-name").value="";
      document.getElementById("fb-email").value="";
      document.getElementById("fb-msg").value="";
      sel=0;hl(0);st.textContent="";
    }else{
      st.style.color="#ef4444";
      st.textContent="Error: "+(d.error||"Something went wrong.");
    }
  })
  .catch(()=>{st.style.color="#ef4444";st.textContent="Server error. Please try again.";});
}

/* ===== BACKGROUND PARTICLE ANIMATION ===== */
const canvas=document.getElementById("bg");
const ctx=canvas.getContext("2d");
let W,H,pts=[];
function rsz(){W=canvas.width=innerWidth;H=canvas.height=innerHeight;}
rsz();addEventListener("resize",rsz);
class P{
  constructor(x,y,b){
    this.x=x??Math.random()*W;this.y=y??Math.random()*H;this.b=b||false;
    this.t=Math.random()<.4?"c":"s";
    this.sz=this.t==="c"?Math.random()*15+5:Math.random()*2+.5;
    this.vx=(Math.random()-.5)*(b?3:.4);this.vy=(Math.random()-.5)*(b?3:.4);
    this.op=Math.random()*.6+.15;this.h=Math.random()<.5?195:270;
    this.life=1;this.d=b?.001:0;
  }
  upd(){
    this.x+=this.vx;this.y+=this.vy;
    if(!this.b){if(this.x<0)this.x=W;if(this.x>W)this.x=0;if(this.y<0)this.y=H;if(this.y>H)this.y=0;}
    if(this.d)this.life-=this.d;
  }
  draw(){
    ctx.save();ctx.globalAlpha=this.op*(this.b?this.life:1);
    if(this.t==="c"){
      ctx.strokeStyle=`hsl(${this.h},80%,60%)`;ctx.lineWidth=1;
      ctx.beginPath();ctx.arc(this.x,this.y,this.sz,0,Math.PI*2);ctx.stroke();
    }else{
      ctx.fillStyle=`hsl(${this.h},80%,70%)`;
      const s=this.sz;ctx.beginPath();
      ctx.moveTo(this.x,this.y-s);ctx.lineTo(this.x+s*.3,this.y-s*.3);
      ctx.lineTo(this.x+s,this.y);ctx.lineTo(this.x+s*.3,this.y+s*.3);
      ctx.lineTo(this.x,this.y+s);ctx.lineTo(this.x-s*.3,this.y+s*.3);
      ctx.lineTo(this.x-s,this.y);ctx.lineTo(this.x-s*.3,this.y-s*.3);
      ctx.closePath();ctx.fill();
    }
    ctx.restore();
  }
}
for(let i=0;i<65;i++)pts.push(new P());
document.addEventListener("click",e=>{for(let i=0;i<14;i++)pts.push(new P(e.clientX,e.clientY,true));});(function anim(){
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle="rgba(6,11,20,.18)";ctx.fillRect(0,0,W,H);
  pts=pts.filter(p=>!p.b||p.life>0);
  pts.forEach(p=>{p.upd();p.draw();});
  requestAnimationFrame(anim);
})();

/* ===== SKILLS STRIP ===== */
const skills=[
  {name:"Python",color:"#3b82f6",icon:'<i class="fa-brands fa-python"></i>'},
  {name:"HTML",color:"#f97316",icon:'<i class="fa-brands fa-html5"></i>'},
  {name:"CSS",color:"#3b82f6",icon:'<i class="fa-brands fa-css3-alt"></i>'},
  {name:"JavaScript",color:"#eab308",icon:'<i class="fa-brands fa-js"></i>'},
  {name:"TensorFlow",color:"#f59e0b",icon:'<i class="fa-solid fa-brain"></i>'},
  {name:"PyTorch",color:"#ef4444",icon:'<i class="fa-solid fa-fire"></i>'},
  {name:"Django",color:"#10b981",icon:'<i class="fa-solid fa-leaf"></i>'},
  {name:"FastAPI",color:"#06b6d4",icon:'<i class="fa-solid fa-bolt"></i>'},
  {name:"OpenCV",color:"#8b5cf6",icon:'<i class="fa-solid fa-eye"></i>'},
  {name:"Pandas",color:"#14b8a6",icon:'<i class="fa-solid fa-table"></i>'},
  {name:"NumPy",color:"#6366f1",icon:'<i class="fa-solid fa-calculator"></i>'},
  {name:"Bootstrap",color:"#8b5cf6",icon:'<i class="fa-brands fa-bootstrap"></i>'},
  {name:"SQLite",color:"#84cc16",icon:'<i class="fa-solid fa-database"></i>'},
  {name:"Deep Learning",color:"#00d4ff",icon:'<i class="fa-solid fa-microchip"></i>'},
  {name:"NLP",color:"#f43f5e",icon:'<i class="fa-solid fa-comments"></i>'},
  {name:"Unity",color:"#a3e635",icon:'<i class="fa-brands fa-unity"></i>'},
  {name:"C#",color:"#7c3aed",icon:'<i class="fa-solid fa-code"></i>'},
  {name:"ML",color:"#22d3ee",icon:'<i class="fa-solid fa-robot"></i>'}
];
const track=document.getElementById("st");
[...skills,...skills].forEach(s=>{
  const c=document.createElement("div");
  c.className="skill-chip";
  c.innerHTML=`<span class="si" style="background:${s.color}">${s.icon}</span>${s.name}`;
  track.appendChild(c);
});