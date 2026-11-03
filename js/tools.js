// IdrokAI — interaktiv vositalar: hujjat muharriri, doska va ta’limiy o‘yinlar (backendsiz ishlaydi)
const Tools=(()=>{
const t=()=>T(),R=n=>Math.random()*n|0,sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=R(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const IDS=['gen','ed','bd','gm'];
const subs=()=>`<div class="seg subs" role="tablist">${t().sub.map((n,i)=>`<button role="tab" aria-selected="${S.sub===IDS[i]}" class="${S.sub===IDS[i]?'on':''}" onclick="Tools.sub('${IDS[i]}')">${n}</button>`).join('')}</div>`;
const editor=()=>{const x=t();return`<div class="card" style="margin-top:16px"><div class="hd"><h3>${x.edT}</h3><span class="lvn" id="wc"></span></div><div class="tb">${[['bold','B'],['italic','I'],['insertUnorderedList','•'],['h','H']].map(b=>`<button onmousedown="event.preventDefault()" onclick="Tools.cmd('${b[0]}')" aria-label="${b[0]}">${b[1]}</button>`).join('')}</div><div id="ed" class="ed" contenteditable="true" role="textbox" aria-multiline="true" data-ph="${x.edPh}">${S.doc||''}</div><div class="hd" style="justify-content:flex-start;margin-top:12px"><button class="btn" onclick="Tools.dl('txt')">TXT</button><button class="btn" onclick="Tools.dl('html')">HTML</button></div></div>`};
const board=()=>{const x=t();return`<div class="card holo" style="margin-top:16px"><div class="hd"><h3>${x.bdT}</h3><div class="hd" style="gap:8px">${['#8B6CFF','#4F46E5','#10b981','#f59e0b'].map(c=>`<button class="sw ${!S.er&&(S.pc||'#8B6CFF')===c?'on':''}" style="background:${c}" aria-label="${c}" onclick="Tools.pick('${c}')"></button>`).join('')}<button class="pill ${S.er?'on':''}" onclick="Tools.eraser()">${x.er}</button><button class="pill" onclick="Tools.clear()">${x.clr}</button></div></div><div class="shapes" aria-hidden="true"><i></i><i></i><i></i></div><canvas id="bd" style="margin-top:14px" aria-label="${x.bdT}"></canvas></div>`};
return{subs,
view:()=>S.sub==='ed'?editor():S.sub==='bd'?board():Games.view(),
sub(id){Games.reset();S.sub=id;S.first=false;render()},
toEditor(){const o=S.res;if(!o)return;S.doc=`<h2>${toolName(S.tool)}</h2><ol>${o.map(l=>`<li>${l[0]}${l[1]?` (${l[1]} ${t().min})`:''}</li>`).join('')}</ol>`;S.sub='ed';S.first=false;render()},
cmd(c){const e=document.getElementById('ed');e.focus();c==='h'?document.execCommand('formatBlock',false,'h2'):document.execCommand(c);S.doc=e.innerHTML},
dl(k){const e=document.getElementById('ed'),b=new Blob([k==='txt'?e.innerText:'<!doctype html><meta charset="utf-8">'+e.innerHTML],{type:k==='txt'?'text/plain':'text/html'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='idrokai.'+k;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)},
pick(c){S.pc=c;S.er=0;render()},eraser(){S.er=1;render()},clear(){S.bd=null;render()},
after(){const c=document.getElementById('bd');
if(c){const x=c.getContext('2d'),D=Math.min(devicePixelRatio||1,2),r=c.getBoundingClientRect();c.width=r.width*D;c.height=r.height*D;x.scale(D,D);x.lineCap=x.lineJoin='round';
if(S.bd){const im=new Image();im.onload=()=>x.drawImage(im,0,0,r.width,r.height);im.src=S.bd}
let d=0,l;const pt=e=>{const q=c.getBoundingClientRect();return[e.clientX-q.left,e.clientY-q.top]};
c.onpointerdown=e=>{d=1;l=pt(e);c.setPointerCapture(e.pointerId)};
c.onpointermove=e=>{if(!d)return;const p=pt(e);x.globalCompositeOperation=S.er?'destination-out':'source-over';x.strokeStyle=S.pc||'#8B6CFF';x.lineWidth=S.er?20:3;x.beginPath();x.moveTo(l[0],l[1]);x.lineTo(p[0],p[1]);x.stroke();l=p};
c.onpointerup=c.onpointercancel=()=>{if(d){d=0;S.bd=c.toDataURL()}}}
const e=document.getElementById('ed');if(e){const w=()=>{document.getElementById('wc').textContent=(e.innerText.match(/\S+/g)||[]).length+' '+t().wd};e.oninput=()=>{S.doc=e.innerHTML;w()};w()}}}})();
