// IdrokAI — yengil 3D hero (canvas, kutubxonasiz): AI yadrosi + orbitadagi hujjat/slayd/o‘yin tugunlari
const Hero3D=(()=>{let stop=()=>{};const PHI=(1+Math.sqrt(5))/2,V=[],E=[];
for(const a of[-1,1])for(const b of[-PHI,PHI])V.push([0,a,b],[a,b,0],[b,0,a]);
for(let i=0;i<12;i++)for(let j=i+1;j<12;j++)if(Math.abs(Math.hypot(V[i][0]-V[j][0],V[i][1]-V[j][1],V[i][2]-V[j][2])-2)<.01)E.push([i,j]);
const hex=(v,d)=>/^#[0-9a-f]{6}$/i.test(v)?v:d;
function mount(){stop();const c=document.getElementById('h3d');if(!c)return;const x=c.getContext('2d');
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,small=innerWidth<860||matchMedia('(pointer:coarse)').matches;
let W,H,t=0,px=0,py=0,tx=0,ty=0,run=true,fr=0,raf=0,col;
const cols=()=>{const s=getComputedStyle(document.documentElement),g=n=>s.getPropertyValue(n).trim();return[hex(g('--pr'),'#A78BFA'),hex(g('--ix'),'#818CF8'),hex(g('--sf'),'#211D3A')]};col=cols();
const P=Array.from({length:small?16:36},()=>({a:Math.random()*6.28,r:1.7+Math.random()*1.8,y:(Math.random()-.5)*3.2,s:.1+Math.random()*.25}));
const size=()=>{const D=Math.min(devicePixelRatio||1,small?1.5:2),r=c.getBoundingClientRect();W=r.width;H=r.height;c.width=W*D;c.height=H*D;x.setTransform(D,0,0,D,0,0)};
const rot=(p,ay,ax)=>{let[a,b,d]=p,k=Math.cos(ay),s=Math.sin(ay);[a,d]=[a*k+d*s,-a*s+d*k];k=Math.cos(ax);s=Math.sin(ax);[b,d]=[b*k-d*s,b*s+d*k];return[a,b,d]};
const pj=p=>{const f=3.8/(3.8+p[2]),k=Math.min(W,H)*.17;return[W/2+p[0]*k*f,H/2+p[1]*k*f,f]};
const node=(i,[X,Y,f])=>{const s=15*f;x.save();x.translate(X,Y);x.fillStyle=col[2];x.strokeStyle=col[i===1?1:0];x.lineWidth=1.6;x.globalAlpha=.55+.45*f/1.3;
if(i===2){x.beginPath();x.arc(0,0,s*.8,0,6.3);x.fill();x.stroke();x.beginPath();x.arc(-s*.25,0,s*.14,0,6.3);x.arc(s*.3,s*.1,s*.14,0,6.3);x.stroke()}
else{x.beginPath();x.roundRect(-s*.8,-s,s*1.6,s*2,3);x.fill();x.stroke();x.beginPath();if(i===0){x.moveTo(-s*.4,-s*.35);x.lineTo(s*.4,-s*.35);x.moveTo(-s*.4,s*.1);x.lineTo(s*.4,s*.1)}else{x.rect(-s*.45,-s*.5,s*.9,s*.6)}x.stroke()}x.restore()};
function draw(){x.clearRect(0,0,W,H);px+=(tx-px)*.06;py+=(ty-py)*.06;const ay=t*.28+px*1.1,ax=.4+py*.7,m=Math.min(W,H);
const g=x.createRadialGradient(W/2,H/2,0,W/2,H/2,m*.4);g.addColorStop(0,col[0]+'66');g.addColorStop(.55,col[1]+'22');g.addColorStop(1,col[1]+'00');x.fillStyle=g;x.fillRect(0,0,W,H);
const Q=V.map(v=>pj(rot(v,ay,ax)));x.lineWidth=1.2;
for(const[i,j]of E){x.globalAlpha=.18+.5*((Q[i][2]+Q[j][2])/2-.75);x.strokeStyle=col[0];x.beginPath();x.moveTo(Q[i][0],Q[i][1]);x.lineTo(Q[j][0],Q[j][1]);x.stroke()}
x.fillStyle=col[0];for(const q of Q){x.globalAlpha=.4+.6*(q[2]-.7);x.beginPath();x.arc(q[0],q[1],2.2*q[2],0,6.3);x.fill()}
x.fillStyle=col[1];for(const p of P){const a=p.a+t*p.s,q=pj(rot([p.r*Math.cos(a),p.y,p.r*Math.sin(a)],ay,ax));x.globalAlpha=.15+.5*(q[2]-.6);x.beginPath();x.arc(q[0],q[1],1.6*q[2],0,6.3);x.fill()}
const S=[0,1,2].map(i=>{const a=t*.6+i*2.094,r=rot([3.3*Math.cos(a),0,3.3*Math.sin(a)],.3,.5+py*.4);return[i,r[2],pj(r)]}).sort((a,b)=>b[1]-a[1]);
for(const[i,,q]of S)node(i,q);x.globalAlpha=1}
const loop=()=>{if(!c.isConnected)return;if(run){t+=.016;if(++fr%45===0)col=cols();draw()}raf=requestAnimationFrame(loop)};
const rs=()=>{size();draw()},vis=()=>{run=!document.hidden},mv=e=>{const r=c.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5},lv=()=>{tx=ty=0};
size();draw();addEventListener('resize',rs);
if(rm){t=1;draw();stop=()=>removeEventListener('resize',rs);return}
const io=new IntersectionObserver(e=>{run=e[0].isIntersecting&&!document.hidden});io.observe(c);
document.addEventListener('visibilitychange',vis);c.addEventListener('pointermove',mv);c.addEventListener('pointerleave',lv);
stop=()=>{cancelAnimationFrame(raf);io.disconnect();document.removeEventListener('visibilitychange',vis);removeEventListener('resize',rs)};raf=requestAnimationFrame(loop)}
return{mount}})();
