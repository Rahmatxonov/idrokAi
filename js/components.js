// IdrokAI — UI komponentlari va sahifalar: landing, dashboard, AI vositalar, modal
const LV_TOOLS=[[0,7,2,6],[0,1,2,3,4,5,6,7,8],[0,1,2,3,4,5,6,8,10],[0,1,2,3,5,6,8,9,10],[0,1,2,3,5,6,8,9,10,11],[1,0,3,5,6,8,9,10,11]];
const toolName=i=>{const t=T();return i===0?(S.level===0?t.act:S.level>=4?t.lec:t.tools[0][0]):t.tools[i][0]};
const levelSel=()=>{const t=T();return `<div class="lv"><label for="lvl">${t.lvl}</label><select class="in" id="lvl" onchange="setLevel(+this.value)">${t.lv.map((n,i)=>`<option value="${i}" ${i===S.level?'selected':''}>${n}</option>`).join('')}</select><span class="lvn">${t.lf[S.level]}</span></div>`};
const RT={s:[1,2,3,4,5,7,8,9,10,11],t:[0,1,2,3,4,5,6,7]};
const avail=()=>{const a=LV_TOOLS[S.level].filter(i=>RT[S.role].includes(i));return a.length?a:LV_TOOLS[S.level]};
function fixTool(){const a=avail();if(!a.includes(S.tool))S.tool=a[0]}
function setRole(r){S.role=r;Auth.saveRole(r);fixTool();S.res=null;S.first=false;render()}
const roleSel=()=>{const t=T();return `<div class="lv"><label id="rml">${t.rm}</label><div class="seg" role="group" aria-labelledby="rml">${[['s',t.rs],['t',t.rt]].map(r=>`<button class="${S.role===r[0]?'on':''}" onclick="setRole('${r[0]}')">${r[1]}</button>`).join('')}</div><span class="lvn">${t.rh[S.role==='s'?0:1]}</span></div>`};
const PLAN_DATA=[{p:0,tok:10000,gen:8,tools:0,team:0,prio:0},{p:39000,tok:100000,gen:80,tools:1,team:0,prio:1},{p:129000,tok:350000,gen:290,tools:1,team:1,prio:1}];
const PLAN_C=['#C4B5FD','#A78BFA','#6366F1'];
const fmt=n=>n.toLocaleString('en-US').replace(/,/g,' ');
const prices=()=>PLAN_DATA.map(d=>Math.round(d.p*(S.yearly?.75:1)/1000)*1000);
function planCards(){const t=T(),pr=prices();return PLAN_DATA.map((d,i)=>{const p=t.pl[i],f=[t.bGen.replace('{n}',d.gen),t.bTools[d.tools],...(d.team?[t.rTeam]:[]),...(d.prio?[t.rPrio]:[])];
return rv(`<div class="card plan ${i===1?'pop':''}" style="--pc:${PLAN_C[i]}">${i===1?`<span class="tag">${t.pop}</span>`:''}<div class="ph"><h3><i class="dot"></i>${p[0]}</h3><p>${p[1]}</p></div><div class="amt">${pr[i]?fmt(pr[i]):t.free}${pr[i]?`<small> ${t.per}</small>`:''}</div><div class="tk"><b>${fmt(d.tok)}</b> ${t.tokU}</div><ul class="ck">${f.map(x=>`<li>${ic('ok')}<span>${x}</span></li>`).join('')}</ul><a class="btn ${i===1?'p':''}" href="#/app">${t.start}</a></div>`,i*100)}).join('')}
const cmp=()=>{const x=T(),pr=prices(),Y=v=>v?'✓':'—',rows=[[`${x.rPrice}, ${x.per}`,i=>pr[i]?fmt(pr[i]):x.free],[x.rTok,i=>fmt(PLAN_DATA[i].tok)],[x.rGen,i=>'~'+PLAN_DATA[i].gen],[x.rTools,i=>x.tv[PLAN_DATA[i].tools]],[x.rTeam,i=>Y(PLAN_DATA[i].team)],[x.rPrio,i=>Y(PLAN_DATA[i].prio)]];
return `<h3 style="margin:36px 0 12px;text-align:center">${x.cmpT}</h3><div class="card cw"><table class="cmp"><thead><tr><th></th>${PLAN_DATA.map((d,i)=>`<th style="--pc:${PLAN_C[i]}"><i class="dot"></i>${x.pl[i][0]}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td>${PLAN_DATA.map((d,i)=>`<td style="--pc:${PLAN_C[i]}">${r[1](i)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="lvn" style="text-align:center;margin-top:10px">${x.cmpN}</p>`};
function startAs(r){S.role=r;Auth.saveRole(r);fixTool();S.res=null;S.first=false;if(location.hash==='#/app')render();else location.hash='#/app'}
function bn(){const t=T(),a=isApp(),g=a&&S.tab==='tools'&&S.sub==='gm';$('#bn').innerHTML=[['#/','home',t.bn4[0],!a],['#/app/tools','spark',t.bn4[1],a&&S.tab==='tools'&&!g],['#/app/games','game',t.bn4[2],g],['#/app','dash',t.bn4[3],a&&S.tab==='dash']].map(x=>`<a href="${x[0]}" class="${x[3]?'on':''}" ${x[3]?'aria-current="page"':''}>${ic(x[1])}<span>${x[2]}</span></a>`).join('')}
function setLevel(i){S.level=i;try{localStorage.setItem('idrok-level',i)}catch(e){}fixTool();S.res=null;S.first=false;render()}
function modal(v){S.modal=v;document.body.style.overflow=v?'hidden':'';mdl()}
function mdl(){$('#md').innerHTML=S.modal?Auth.modalHtml():''}
addEventListener('keydown',e=>{if(e.key==='Escape'&&S.modal)modal(0)});
function nav(){const t=T(),a=isApp();$('#nav').innerHTML=`<a class="brand" href="#/"><span class="logo">${ic('spark')}</span><span class="bt">Idrok<span class="grad">AI</span></span></a>
${a?'<span class="sp"></span>':`<nav class="links">${['features','tools','games','pricing','reviews'].map((id,i)=>`<a href="#${id}">${t.nav5[i]}</a>`).join('')}</nav>`}
<div class="act">${LangMenu.html()}
<button class="btn ib" onclick="toggleTheme()" aria-label="Theme">${ic(document.documentElement.dataset.theme==='dark'?'sun':'moon')}</button>${Auth.navBtn()}
${a?'':`${Auth.user()?'':`<button class="btn hide" onclick="modal(1)">${t.signin}</button>`}<a class="btn p hide" href="#/app">${t.start}</a>`}</div>`}
const rv=(h,d=0)=>`<div class="rv ${S.first?'':'in2'}" style="transition-delay:${d}ms">${h}</div>`;
function landing(){const t=T(),list=(S.role==='s'?t.bs:t.bt).map(x=>`<li>${ic('ok')}${x}</li>`).join('');

return `<div class="wrap hero"><div class="hcopy"><span class="badge">${ic('spark')}${t.badge}</span>
<h1>${t.h1a} <span class="grad">${t.h1b}</span></h1><p class="sub">${t.sub}</p>
<div class="ctas"><a class="btn p lg" href="#/app">${t.start}${ic('arrow')}</a><a class="btn lg" href="#how">${t.cta2}</a></div></div>
<div class="vis"><canvas id="h3d" aria-hidden="true"></canvas>${t.fc.map((f,i)=>`<div class="fc fc${i}"><div class="fci"><span class="ico">${ic(['slides','test','doc','quiz','game'][i])}</span><div class="ft"><b>${f[0]}</b><small>${f[1]}</small></div></div></div>`).join('')}</div></div>
<section id="features"><div class="wrap">${rv(`<div class="st"><h2>${t.rolesT}</h2></div>`)}<div class="two">${[['t','lesson',t.tcT,t.tcD,t.tcL,t.startT],['s','doc',t.scT,t.scD,t.scL,t.startS]].map((c,i)=>rv(`<div class="card h rc rc-${c[0]}" style="height:100%"><span class="ico big">${ic(c[1])}</span><h3>${c[2]}</h3><p>${c[3]}</p><ul class="ck">${c[4].map(x=>`<li>${ic('ok')}<span>${x[0]}${x[1]?`<em class="soon">${t.soon}</em>`:''}</span></li>`).join('')}</ul><button class="btn p" onclick="startAs('${c[0]}')">${c[5]}${ic('arrow')}</button></div>`,i*120)).join('')}</div></div></section>
<section id="tools"><div class="wrap">${rv(`<div class="st"><h2>${t.tt}</h2><p>${t.ts}</p></div><div class="lvbar" style="margin-inline:auto;max-width:780px">${levelSel()}${roleSel()}</div>`)}
<div class="grid">${avail().map((i,n)=>rv(`<a class="card h" style="display:block" href="#/app/tools" onclick="S.tool=${i};S.tab='tools'"><div class="ico">${ic(TI[i])}</div><h3>${toolName(i)}</h3><p>${t.tools[i][1]}</p></a>`,n*60)).join('')}</div></div></section>
<section id="games"><div class="wrap">${rv(`<div class="st"><div class="orbit" aria-hidden="true"><i></i><i></i><i></i></div><h2>${t.gsT}</h2><p>${t.gsS}</p></div>`)}<div class="grid">${Games.catalog(1)}</div><p class="lvn aioff" style="text-align:center">${t.aiOff}</p></div></section>
<section id="how"><div class="wrap">${rv(`<div class="st"><h2>${t.ht}</h2></div>`)}<div class="steps">${t.st.map((x,i)=>rv(`<div class="card"><div class="num">0${i+1}</div><h3>${x[0]}</h3><p>${x[1]}</p></div>`,i*100)).join('')}</div></div></section>
<section id="pricing"><div class="wrap">${rv(`<div class="st"><h2>${t.pt}</h2><p>${t.ps}</p></div><div class="tabs"><div class="seg"><button class="${S.yearly?'':'on'}" onclick="S.yearly=false;S.first=false;render()">${t.mo}</button><button class="${S.yearly?'on':''}" onclick="S.yearly=true;S.first=false;render()">${t.ye}</button></div></div>`)}
<div class="price">${planCards()}</div>${rv(cmp())}</div></section>
<section id="reviews">${Reviews.view()}</section>
<section><div class="wrap">${rv(`<div class="cta"><h2>${t.ct}</h2><p>${t.cs}</p><a class="btn lg" href="#/app">${t.start}${ic('arrow')}</a></div>`)}</div></section>
<footer><div class="wrap foot"><span><b>IdrokAI</b> — ${t.tag}</span><nav class="fl" aria-label="Footer">${['features','tools','games','pricing','reviews'].map((id,i)=>`<a href="#${id}">${t.nav5[i]}</a>`).join('')}</nav><span>© 2026 IdrokAI</span></div></footer>`}
function dash(){const g=Auth.gateHtml();if(g)return g;const t=T(),days=[40,65,35,80,55,90,60],f=new Intl.DateTimeFormat(S.lang,{weekday:'short'});
const rec=Auth.user()?Auth.recent():(S.recent||t.rl);
return `<div class="hd"><div><h2>${Auth.hello()}</h2><p style="color:var(--mu)">${t.hs}</p></div><button class="btn p" onclick="go('tools')">${ic('spark')}${t.gen}</button></div>
${Auth.banner()}<div class="lvbar">${levelSel()}${roleSel()}</div><div class="card" style="margin:16px 0"><h3>${t.rcm}</h3><div class="pick" style="margin-bottom:0">${avail().map(i=>`<button class="pill" onclick="S.tool=${i};go('tools')">${ic(TI[i])}${toolName(i)}</button>`).join('')}</div></div><div class="stats"><div class="card stat"><span>${t.sTok}</span><b>${S.tok.toLocaleString('en-US').replace(/,/g,' ')}</b><div class="prog"><i style="width:${Math.min(100,S.tok/1000)}%"></i></div></div>
<div class="card stat"><span>${t.sMade}</span><b>${S.made}</b></div><div class="card stat"><span>${t.sHrs}</span><b>${(S.made*.8).toFixed(1)}</b></div></div>
<div class="cols"><div class="card"><h3>${t.use}</h3><div class="bars">${days.map((h,i)=>`<div><i style="height:${h}%;animation-delay:${i*80}ms"></i>${f.format(new Date(2026,9,12+i))}</div>`).join('')}</div></div>
<div class="card"><h3>${t.rec}</h3>${rec.map(r=>`<div class="row"><div class="ico">${ic(r[1])}</div><div><b>${r[0]}</b><small>${t.tools[TI.indexOf(r[1])][0]} · ${r[2]}</small></div></div>`).join('')}${rec.length?'':`<p class="lvn">${t.aEmpty}</p>`}</div></div>`}
function tools(){const t=T();return `<h2>${t.ai}</h2>${Tools.subs()}${S.sub==='gen'?genView():Tools.view()}`}
function genView(){const t=T(),o=S.res;
return `<div class="card" style="margin-top:16px"><div class="pick">${avail().map(i=>`<button class="pill ${i===S.tool?'on':''}" onclick="S.tool=${i};S.res=null;render()">${ic(TI[i])}${toolName(i)}</button>`).join('')}</div>
<label>${t.topic}</label><input class="in" id="tp" value="${S.topic.replace(/"/g,'&quot;')}" placeholder="${t.ph}" oninput="S.topic=this.value">
<div class="f2">${levelSel()}
<div style="display:flex;align-items:flex-end"><button class="btn p" style="width:100%;padding:14px" onclick="gen()" ${S.busy?'disabled':''}>${ic('spark')}${S.busy?t.busy:t.gen}</button></div></div>
${S.busy?'<div class="sk"></div><div class="sk" style="width:80%"></div><div class="sk" style="width:90%"></div>':''}
${o?`<div class="out"><div class="hd"><h3>${t.res}: ${toolName(S.tool)}</h3><span style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" onclick="cp()">${t.copy}</button><button class="btn" onclick="Tools.toEditor()">${t.toEd}</button></span></div><p class="lvn" style="margin-top:6px">${t.lv[S.level]} · ${t.lf[S.level]}</p>${o.map((l,i)=>`<div class="ln" style="--i:${i}"><span class="n">${i+1}</span><span>${l[0]}</span>${l[1]?`<span class="m">${l[1]} ${t.min}</span>`:''}</div>`).join('')}<p style="color:var(--mu);font-size:12.5px;margin-top:14px">${t.demo}</p></div>`:''}</div>`}
function app(){const t=T();return `<div class="wrap app"><aside class="side">${[['dash','dash',t.dash],['tools','spark',t.ai]].map(a=>`<a class="${S.tab===a[0]?'on':''}" href="${a[0]==='tools'?'#/app/tools':'#/app'}">${ic(a[1])}${a[2]}</a>`).join('')}<a href="#/">${ic('home')}${t.home}</a></aside><div>${S.tab==='dash'?dash():tools()}</div></div>`}
function go(tab){location.hash=tab==='tools'?'#/app/tools':'#/app'}
function gen(){const t=T(),topic=(S.topic||t.ph.replace(/^[^:]*:\s*/,'')).trim().replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');if(S.busy)return;S.busy=true;S.res=null;render();
setTimeout(()=>{const ty=S.tool>=8?'oD':S.tool===1?'oS':(S.tool===0||S.tool===6)?(S.level===0?'oP':S.level>=4?'oU':'oL'):'oQ';
S.res=t[ty].slice(0,ty==='oQ'&&S.level===0?3:9).map(s=>{const[a,m]=s.split('|');return[a.replace(/\{t\}/g,topic),m||'']});
Auth.save(S.tool,(S.topic||t.ph.replace(/^[^:]*:\s*/,'')).trim(),S.level,S.res);S.busy=false;S.tok-=1200;S.made++;S.recent=[[topic,TI[S.tool],{uz:'Hozir',ru:'Сейчас',en:'Just now'}[BASE[S.lang]||S.lang]],...(S.recent||t.rl)].slice(0,4);render()},1300)}
async function cp(){const x=S.res.map((l,i)=>`${i+1}. ${l[0]}${l[1]?' ('+l[1]+')':''}`).join('\n');try{await navigator.clipboard.writeText(x);const b=document.querySelector('.out .btn');b.textContent=T().copied}catch(e){}}
