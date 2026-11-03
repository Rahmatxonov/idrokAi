// IdrokAI — 10 ta ta’limiy o‘yin. Savollar demo (AI generatsiya ulanmagan). Kelajakda: Games.topic() → backend /games/questions
const Games=(()=>{
const t=()=>T(),R=n=>Math.random()*n|0,sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=R(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const IDS=['qz','cw','mm','an','wh','bx','ss','rc','ar','tm'],IC=['quiz','cross','game','gloss','spark','doc','guide','slides','test','user'],EM=['🍎','🚀','📚','🧪','🎨','🌍','⚽','🎵'],WV=[10,20,30,40,50,20,30,10];
let G=null,nextId=null,GT=null;
const stop=()=>{clearInterval(GT);GT=null};
const qmix=q=>({q:q[0],o:sh(q[1].map((x,i)=>[x,i===q[2]]))});
const arith=()=>{const L=S.level;let a,b,op;
if(L===0){a=1+R(5);b=1+R(5);op='+'}else if(L===1){op=R(2)?'+':'−';a=5+R(15);b=1+R(a)}
else{op=['+','−','×'][R(3)];const m=L>3?11:8,n=L>3?90:40;a=op==='×'?2+R(m):10+R(n);b=op==='×'?2+R(m):1+R(Math.min(a,n))}
const ans=op==='+'?a+b:op==='−'?a-b:a*b,o=new Set([ans]);while(o.size<4)o.add(Math.max(0,ans+R(11)-5));return{q:`${a} ${op} ${b}`,ans,opts:sh([...o])}};
const word=()=>{const w=t().words[G.i];let s=w;for(let k=0;k<9&&s===w;k++)s=sh([...w]).join('');G.w=w;G.sc=s;G.fb=''};
const ssw=()=>{G.tk=sh(t().ss[G.i].split(' ').map((w,k)=>[w,k]));G.pick=[];G.fb=''};
const tmr=()=>{stop();GT=setInterval(()=>{if(!G||G.id!=='rc'||G.pk!==-1||G.i>=G.L.length){stop();return}G.time--;const e=document.getElementById('tm'),b=document.getElementById('tb');if(e)e.textContent=G.time;if(b)b.style.width=G.time/8*100+'%';if(G.time<=0){G.pk=-2;G.bot+=6+R(9);stop();render()}},1000)};
const cur=()=>G.id==='wh'||G.id==='bx'?G.it:G.L[G.i];
const end=r=>`<div class="qz">${t().win}<br><span class="grad">${r}</span></div>`;
const mq=(it,pk)=>{const x=t();return`<p class="qz sm">${it.q}</p><div class="qo c1">${it.o.map((o,i)=>`<button class="btn ${pk!==-1&&o[1]?'okb':''} ${pk===i&&!o[1]?'nob':''}" ${pk!==-1?'disabled':''} onclick="Games.ans(${i})">${o[0]}</button>`).join('')}</div>${pk!==-1?`<p class="lvn" style="text-align:center;margin-top:10px">${pk>=0&&it.o[pk][1]?x.okQ:x.noQ}</p><div style="text-align:center;margin-top:10px"><button class="btn p" onclick="Games.nxt()">${x.nxt}</button></div>`:''}`};
const lab=()=>{const x=t();return{qz:`${x.sc}: ${G.s}/${G.L.length}`,tm:`A ${G.tm[0]} : ${G.tm[1]} B`,rc:`${x.you} ${G.s} · ${x.bots} ${G.bot}`,wh:`${x.sc}: ${G.s}`,bx:`${x.sc}: ${G.s}`,ss:`${G.s}/${x.ss.length}`,cw:`${G.s}/${x.cw.length}`,ar:`${G.s}/10`,an:`${G.s}/${x.words.length}`,mm:`${x.mv}: ${G.mv}`}[G.id]};
function body(){const x=t();switch(G.id){
case'ar':return G.n>=10?end(lab()):`<div class="qz">${G.q}</div><div class="qo">${G.opts.map(o=>`<button class="btn" onclick="Games.num(${o})">${o}</button>`).join('')}</div>`;
case'mm':return`<div class="mg">${G.c.map((e,k)=>{const o=G.f.includes(k)||G.m.has(k);return`<button class="mc ${o?'on':''}" aria-label="${o?e:'?'}" onclick="Games.flip(${k})">${o?e:'?'}</button>`}).join('')}</div>${G.m.size===16?end(lab()):''}`;
case'an':return G.i>=x.words.length?end(lab()):`<div class="qz" style="letter-spacing:.18em">${G.sc}</div><input class="in" id="an" autocomplete="off" autocapitalize="characters" style="text-align:center;text-transform:uppercase"><p class="lvn" style="text-align:center;min-height:1.6em;margin-top:8px">${G.fb}</p><div class="hd" style="justify-content:center"><button class="btn p" onclick="Games.achk()">${x.chk}</button><button class="btn" onclick="Games.askip()">${x.skip}</button></div>`;
case'qz':case'tm':case'rc':return G.i>=G.L.length?end(lab()):(G.id==='tm'?`<p class="gs" style="display:inline-block;margin-top:12px">${G.i%2?x.tB:x.tA}</p>`:'')+(G.id==='rc'?`<div class="tbar"><i id="tb" style="width:${G.time/8*100}%"></i></div><p class="lvn" style="text-align:center">⏱ <b id="tm">${G.time}</b></p>`:'')+mq(G.L[G.i],G.pk);
case'wh':return G.i>=5?end(lab()):G.it?`<p class="lvn" style="text-align:center;margin-top:12px">${x.rnd} ${G.i+1}/5 · +${G.val} ${x.pts}</p>`+mq(G.it,G.pk):`<div class="wp"><div class="pt"></div><div class="wh" id="wl" style="transform:rotate(${G.rot}deg)">${WV.map((v,i)=>`<span style="transform:rotate(${i*45+22.5}deg) translateY(calc(var(--wr) * -.68))">${v}</span>`).join('')}</div></div><div style="text-align:center"><button class="btn p" onclick="Games.spin()">${x.spin}</button></div>`;
case'bx':return G.o.size>=6&&!G.it?end(lab()):G.it?mq(G.it,G.pk):`<div class="mg bxg">${G.bx.map((c,i)=>`<button class="mc ${G.o.has(i)?'on':''}" ${G.o.has(i)?'disabled':''} aria-label="${i+1}" onclick="Games.box(${i})">${G.o.has(i)?(c==='b'?'🎁':c==='t'?'💥':'✔'):'📦'}</button>`).join('')}</div><p class="lvn" style="text-align:center">${G.msg||x.boxQ}</p>`;
case'ss':{if(G.i>=x.ss.length)return end(lab());const W=x.ss[G.i].split(' ');return`<div class="chips big">${G.pick.map(k=>`<button class="pill on" onclick="Games.tk(${k})">${W[k]}</button>`).join('')||'<span class="lvn">…</span>'}</div><div class="chips">${G.tk.filter(a=>!G.pick.includes(a[1])).map(a=>`<button class="pill" onclick="Games.tk(${a[1]})">${a[0]}</button>`).join('')}</div><p class="lvn" style="text-align:center;min-height:1.6em">${G.fb}</p><div class="hd" style="justify-content:center"><button class="btn p" onclick="Games.sck()">${x.chk}</button><button class="btn" onclick="Games.sskip()">${x.skip}</button></div>`}
case'cw':return x.cw.map((r,i)=>`<div style="margin-top:14px"><p class="lvn">${i+1}. ${r[0]}</p><div class="cr">${[...r[1]].map((c,k)=>`<input class="cc ${G.res?G.res[i]?'ok':'bad':''}" maxlength="1" data-r="${i}" value="${(G.v[i]||'')[k]||''}" oninput="Games.adv(this)" aria-label="${i+1}.${k+1}" autocomplete="off">`).join('')}</div></div>`).join('')+`<div style="text-align:center;margin-top:16px"><button class="btn p" onclick="Games.ccheck()">${x.chk}</button></div>`+(G.res?end(lab()):'')}}
function start(id,q){stop();G=null;if(id){const L=sh(t().qb).map(qmix);G={id,i:0,s:0,n:0,pk:-1,L,tm:[0,0],time:8,bot:0,rot:0,val:null,it:null,o:new Set(),f:[],m:new Set(),mv:0,lock:false,pick:[],fb:'',v:[],res:null,msg:''};
if(id==='ar')Object.assign(G,arith());if(id==='an')word();if(id==='mm')G.c=sh([...EM,...EM]);if(id==='bx')G.bx=sh([L[0],L[1],L[2],L[3],'b','t']);if(id==='ss')ssw();if(id==='rc')tmr()}
if(!q){S.first=false;render()}}
const catalog=land=>{const x=t();return IDS.map((id,i)=>`<button class="card h gcard" onclick="${land?`Games.launch('${id}')`:`Games.start('${id}')`}"><span class="ico">${ic(IC[i])}</span><h3>${x.gm[i]}</h3><p>${x.gd[i]}</p><span class="play">${x.play} →</span></button>`).join('')};
return{catalog,start,reset(){stop();G=null},topic:()=>S.gt||'',
enter(){S.sub='gm';const id=nextId;nextId=null;start(id||0,1)},
launch(id){nextId=id;if(location.hash==='#/app/games'){this.enter();render()}else location.hash='#/app/games'},
view(){const x=t();if(!G)return`<div class="card" style="margin-top:16px"><label for="gt">${x.gtp}</label><input class="in" id="gt" value="${(S.gt||'').replace(/"/g,'&quot;')}" placeholder="${x.ph}" oninput="S.gt=this.value" style="margin-top:6px"><p class="lvn aioff">${x.aiOff}</p></div><div class="grid" style="margin-top:16px">${catalog(0)}</div>`;
return`<div class="card" style="margin-top:16px"><div class="hd"><button class="btn" onclick="Games.start(0)">← ${x.back}</button><b>${x.gm[IDS.indexOf(G.id)]}</b><span class="gs">${lab()}</span></div>${G.id==='ar'||G.id==='mm'?'':`<p class="lvn aioff">${x.aiOff}</p>`}${body()}<div style="text-align:center;margin-top:16px"><button class="btn" onclick="Games.start('${G.id}')">${x.again}</button></div></div>`},
ans(i){if(!G||G.pk!==-1)return;const it=cur();if(!it)return;const ok=it.o[i][1];G.pk=i;if(ok){if(G.id==='qz')G.s++;if(G.id==='tm')G.tm[G.i%2]++;if(G.id==='rc')G.s+=10+Math.max(G.time,0);if(G.id==='wh')G.s+=G.val;if(G.id==='bx')G.s+=10}if(G.id==='rc')G.bot+=6+R(9);render()},
nxt(){if(!G)return;if(G.id==='wh'){G.i++;G.val=null;G.it=null}else if(G.id==='bx')G.it=null;else{G.i++;if(G.id==='rc'){G.time=8;tmr()}}G.pk=-1;render()},
spin(){if(!G||G.id!=='wh'||G.it||G.sp||G.i>=5)return;G.sp=1;G.rot+=1440+R(360);const e=document.getElementById('wl');if(e)e.style.transform=`rotate(${G.rot}deg)`;setTimeout(()=>{if(!G||G.id!=='wh')return;G.val=WV[Math.floor(((360-G.rot%360)%360)/45)];G.it=G.L[G.i];G.sp=0;render()},3100)},
box(i){if(!G||G.it||G.o.has(i))return;G.o.add(i);const c=G.bx[i];if(c==='b'){G.s+=10;G.msg=t().bonus}else if(c==='t'){G.s-=5;G.msg=t().trap}else{G.it=c;G.pk=-1;G.msg=''}render()},
num(v){if(!G||G.n>=10)return;G.s+=(v===G.ans)?1:0;G.n++;if(G.n<10)Object.assign(G,arith());render()},
flip(k){if(!G||G.lock||G.f.includes(k)||G.m.has(k))return;G.f.push(k);if(G.f.length===2){G.mv++;const[a,b]=G.f;if(G.c[a]===G.c[b]){G.m.add(a);G.m.add(b);G.f=[]}else{G.lock=true;render();setTimeout(()=>{if(G&&G.id==='mm'){G.f=[];G.lock=false;render()}},700);return}}render()},
achk(){if(G.i>=t().words.length)return;const e=document.getElementById('an'),v=((e&&e.value)||'').trim().toUpperCase();if(v===G.w){G.s++;G.i++;if(G.i<t().words.length)word()}else G.fb=t().no;render()},
askip(){if(G.i>=t().words.length)return;G.i++;if(G.i<t().words.length)word();render()},
tk(k){if(G.i>=t().ss.length)return;G.pick=G.pick.includes(k)?G.pick.filter(v=>v!==k):[...G.pick,k];G.fb='';render()},
sck(){if(G.i>=t().ss.length)return;const s=t().ss[G.i],W=s.split(' ');if(G.pick.map(k=>W[k]).join(' ')===s){G.s++;G.i++;if(G.i<t().ss.length)ssw()}else G.fb=t().no;render()},
sskip(){if(G.i>=t().ss.length)return;G.i++;if(G.i<t().ss.length)ssw();render()},
adv(e){if(e.value&&e.nextElementSibling)e.nextElementSibling.focus()},
ccheck(){const c=t().cw;G.v=c.map((r,i)=>[...document.querySelectorAll(`.cc[data-r="${i}"]`)].map(e=>e.value.toUpperCase()).join(''));G.res=c.map((r,i)=>G.v[i]===r[1]);G.s=G.res.filter(Boolean).length;render()}}})();
