// IdrokAI — Google OAuth (Supabase Auth, PKCE). Maxfiy kalitlar frontendda yo‘q: Client Secret faqat Supabase dashboardida.
const Auth=(()=>{
const C=window.IDROK_CONFIG||{};C.supabaseKey=C.supabaseKey||C.supabaseAnonKey||'';
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const GLOGO='<svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.2 5.5-4.7 7.2l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.6z"/><path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>';
let sb=null,user=null,hist=[],st='init',msg='';
const jr=k=>{try{return JSON.parse(atob(k.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'))).role}catch(e){return''}};
const svc=()=>/^sb_secret_/.test(C.supabaseKey||'')||jr(C.supabaseKey||'')==='service_role';
const cfg=()=>!!(C.supabaseUrl&&C.supabaseKey),ready=()=>cfg()&&!svc()&&!!window.supabase;
let prov=null,net=false,keyBad=false;
function diag(){const x=T(),o=[];
if(!C.supabaseUrl)o.push(x.dUrl);else{let h='';try{h=new URL(C.supabaseUrl).hostname}catch(e){}if(!h||/(^|\.)supabase\.com$/.test(h))o.push(x.dUrlBad)}
if(!C.supabaseKey)o.push(x.dKey);else if(svc())o.push(x.dSvc);else if(keyBad)o.push(x.dKeyBad);
if(cfg()&&!svc()&&!window.supabase)o.push(x.dSdk);
if(!/^https?:$/.test(location.protocol))o.push(x.aProto);
if(prov===false)o.push(x.dProv);return o}
async function checkProv(){try{const r=await fetch(C.supabaseUrl.replace(/\/$/,'')+'/auth/v1/settings',{headers:{apikey:C.supabaseKey}});if(r.status===401||r.status===403)keyBad=true;else if(r.ok){const j=await r.json();prov=!!(j.external&&j.external.google)}else net=true}catch(e){net=true}render()}
const isNew=()=>{try{return Math.abs(new Date(user.last_sign_in_at)-new Date(user.created_at))<10000}catch(e){return false}};
const meta=()=>(user&&user.user_metadata)||{},name=()=>meta().full_name||meta().name||'';
const avatar=()=>{const u=meta().avatar_url||meta().picture;return u?`<img src="${esc(u)}" alt="" referrerpolicy="no-referrer">`:esc((name()||user.email||'?').trim().charAt(0).toUpperCase())};
const toast=m=>{const e=document.getElementById('ts');if(!e)return;e.innerHTML=`<div class="toast" role="status">${esc(m)}</div>`;setTimeout(()=>{e.innerHTML=''},3500)};
const note=()=>{const x=T(),d=diag();if(d.length)return`<div class="setup" role="alert"><b>${x.dTitle}</b><ul>${d.map(i=>`<li>${i}</li>`).join('')}</ul><small>${x.dDocs}</small></div>`;
if(st==='cancel')return`<p class="lvn" role="status">${x.aCancel}</p>`;
if(net&&st!=='err')return`<p class="lvn" role="status">${x.dNet}</p>`;
if(st==='err')return`<div class="setup" role="alert"><b>${x.aErr}</b>${msg?`<p>${esc(msg)}</p>`:''}<small>${x.dRedir}: <code>${esc(location.origin+location.pathname)}</code> / <code>${esc(location.origin)}/**</code></small></div>`;return''};
const gbtn=()=>{const x=T();return`<button class="btn gbtn" onclick="Auth.google()" ${st==='loading'?'disabled':''}>${st==='loading'?'<span class="spn"></span>'+x.aLoad:GLOGO+x.gBtn}</button>`};
async function loadProf(){const{data}=await sb.from('profiles').select('role,full_name').eq('id',user.id).maybeSingle();
if(!data){const m=meta(),row={id:user.id},nm=name(),av=m.avatar_url||m.picture;if(nm)row.full_name=nm;if(av)row.avatar_url=av;if(user.email)row.email=user.email;await sb.from('profiles').upsert(row)}
else if(data.role){const r=data.role==='teacher'?'t':'s';if(r!==S.role){S.role=r;fixTool()}}render()}
async function loadHist(){const{data,error}=await sb.from('generations').select('id,tool,topic,level,created_at').order('created_at',{ascending:false}).limit(8);if(!error&&data){hist=data;render()}}
function sess(s){const was=user&&user.id;user=s?s.user:null;
if(user){st='in';if(was!==user.id){loadProf();loadHist();const nx=sessionStorage.getItem('idrok-next');if(nx){sessionStorage.removeItem('idrok-next');S.modal=0;document.body.style.overflow='';toast(isNew()?T().aNew:T().aOk);if(location.hash!==nx)location.hash=nx}}}
else{if(st!=='err'&&st!=='cancel')st='out';hist=[]}render()}
async function init(){if(!ready()){st='off';render();return}
sb=window.supabase.createClient(C.supabaseUrl,C.supabaseKey,{auth:{flowType:'pkce',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
checkProv();sb.auth.onAuthStateChange((ev,s)=>{setTimeout(()=>sess(s),0)});
let{data:{session}}=await sb.auth.getSession();
if(session){const{error}=await sb.auth.getUser();if(error&&(error.status===401||error.status===403)){await sb.auth.signOut();session=null}}
const q=new URLSearchParams(location.search),hq=new URLSearchParams(location.hash.replace(/^#\/?/,'')),er=q.get('error_description')||q.get('error')||hq.get('error_description')||hq.get('error'),ec=q.get('error')||hq.get('error');
if(q.has('code')||er)history.replaceState(null,'',location.pathname+(/error/.test(location.hash)?'#/':location.hash));
if(er){if(ec==='access_denied')st='cancel';else{st='err';msg=er}S.modal=1}
sess(session)}
async function google(){if(diag().length||!sb){st='nocfg';render();return}st='loading';render();
try{sessionStorage.setItem('idrok-next','#/app');const{error}=await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname,queryParams:{prompt:'select_account'}}});if(error)throw error}catch(e){st='err';msg=e.message||'';render()}}
async function out(){if(sb){try{await sb.auth.signOut()}catch(e){}}user=null;hist=[];st='out';location.hash='#/';render();toast(T().aOut)}
document.addEventListener('click',e=>{const u=document.querySelector('.ua');if(u&&!e.target.closest('.ua'))u.classList.remove('open')});
document.addEventListener('keydown',e=>{const u=document.querySelector('.ua');if(e.key==='Escape'&&u&&u.classList.contains('open')){u.classList.remove('open');const b=document.getElementById('uab');if(b)b.focus()}});
return{init,google,out,toast,user:()=>user,
menu(){const u=document.querySelector('.ua'),b=document.getElementById('uab');if(u&&b)b.setAttribute('aria-expanded',u.classList.toggle('open'))},
saveRole(r){if(sb&&user)sb.from('profiles').upsert({id:user.id,role:r==='t'?'teacher':'student'}).then(()=>{})},
save(tool,topic,level,res){if(sb&&user)sb.from('generations').insert({user_id:user.id,tool,topic,level,result:res}).then(({error})=>{if(!error)loadHist()})},
recent:()=>hist.map(h=>[esc(h.topic),TI[h.tool]||'doc',new Date(h.created_at).toLocaleDateString(S.lang)]),
hello(){const x=T();return`${x.hi}${name()?', '+esc(name()):''} 👋`},
banner:()=>cfg()?'':`<div class="card aioff" style="margin-top:16px">${T().aNoAuth}</div>`,
navBtn(){const x=T();if(!user)return`<button class="btn ib mob" onclick="modal(1)" aria-label="${x.signin}">${ic('user')}</button>`;
return`<div class="ua"><button class="uab" id="uab" aria-haspopup="menu" aria-expanded="false" aria-label="${esc(name()||user.email)}" onclick="Auth.menu()">${avatar()}</button><div class="um" role="menu"><div class="umh"><b>${esc(name())}</b><small>${esc(user.email||'')}</small></div><div class="seg">${[['s',x.rs],['t',x.rt]].map(r=>`<button role="menuitemradio" aria-checked="${S.role===r[0]}" class="${S.role===r[0]?'on':''}" onclick="setRole('${r[0]}')">${r[1]}</button>`).join('')}</div><a href="#/app" role="menuitem">${x.dashL}</a><button role="menuitem" onclick="Auth.out()">${x.logout}</button></div></div>`},
gateHtml(){if(!cfg()||user)return'';const x=T();if(st==='init')return`<div class="card" style="margin-top:20px"><div class="sk"></div><div class="sk" style="width:70%"></div></div>`;
return`<div class="card gate"><span class="ico big">${ic('user')}</span><h2>${x.gateT}</h2><p>${x.gateD}</p>${gbtn()}${note()}</div>`},
modalHtml(){const x=T(),up=S.am==='up';return`<div class="modal" onclick="if(event.target===this)modal(0)"><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="amt"><div class="hd"><div class="seg" role="tablist">${[['in',x.signin],['up',x.reg]].map(a=>`<button role="tab" aria-selected="${(S.am||'in')===a[0]}" class="${(S.am||'in')===a[0]?'on':''}" onclick="S.am='${a[0]}';render()">${a[1]}</button>`).join('')}</div><button class="btn ib" onclick="modal(0)" aria-label="${x.cl}">✕</button></div><h3 id="amt" style="margin-top:16px">${up?x.aTu:x.aTi}</h3><p style="color:var(--mu);margin:8px 0 18px">${up?x.aDu:x.aDi}</p>${gbtn()}${note()}</div></div>`}}})();
