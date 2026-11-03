// IdrokAI — fikr-mulohazalar: forma, tekshiruv, API klienti. API bo‘sh bo‘lsa demo rejim (sharh ommaga chiqmaydi)
const Reviews=(()=>{
const API='';// backend manzili, masalan 'https://api.example.uz/v1' (qarang: backend/README.md)
let list=[],st='idle',err={};const d={name:'',role:'',rate:0,text:''};
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';'),stars=n=>'★'.repeat(n)+'☆'.repeat(5-n);
const reset=()=>Object.assign(d,{name:'',role:'',rate:0,text:''});
const form=()=>{const x=T(),e=k=>err[k]?`<p class="fe" role="alert">${err[k]}</p>`:'';
return`<form class="card rvf" onsubmit="Reviews.submit(event)" novalidate><h3>${x.rvF}</h3>
<label for="rn">${x.rvN}</label><input class="in" id="rn" maxlength="60" autocomplete="name" value="${esc(d.name)}" oninput="Reviews.d.name=this.value" aria-invalid="${!!err.name}">${e('name')}
<label>${x.rvU}</label><div class="seg fillseg" role="radiogroup">${[['teacher',x.rt],['student',x.rs]].map(r=>`<button type="button" role="radio" aria-checked="${d.role===r[0]}" class="${d.role===r[0]?'on':''}" onclick="Reviews.set('role','${r[0]}')">${r[1]}</button>`).join('')}</div>${e('role')}
<label>${x.rvR}</label><div class="rate" role="radiogroup">${[1,2,3,4,5].map(n=>`<button type="button" role="radio" aria-checked="${d.rate===n}" aria-label="${n}" class="${n<=d.rate?'on':''}" onclick="Reviews.set('rate',${n})">★</button>`).join('')}</div>${e('rate')}
<label for="rt">${x.rvC}</label><textarea class="in ta" id="rt" rows="4" maxlength="600" oninput="Reviews.d.text=this.value" aria-invalid="${!!err.text}">${esc(d.text)}</textarea>${e('text')}
<button class="btn p" style="width:100%;margin-top:14px" ${st==='sending'?'disabled':''}>${x.rvSend}</button>
${{ok:`<p class="fs" role="status">${x.rvOk}</p>`,demo:`<p class="fs" role="status">${x.rvOk}<br><small>${x.rvDemo}</small></p>`,fail:`<p class="fe" role="alert">${x.rvFail}</p>`}[st]||''}</form>`};
return{d,
view(){const x=T();return`<div class="wrap">${rv(`<div class="st"><h2>${x.rvT}</h2><p>${x.rvS}</p></div>`)}<div class="two rvg"><div>${list.length?list.map((r,i)=>`<div class="card rvc" style="animation-delay:${-i*1.3}s"><div class="hd"><b>${esc(r.name)}</b><span class="soon">${r.role==='teacher'?x.rt:x.rs}</span></div><div class="stars" aria-label="${r.rating}/5">${stars(Math.min(5,Math.max(0,r.rating|0)))}</div><p>${esc(r.text)}</p></div>`).join(''):`<div class="card"><p>${x.rvE}</p></div>`}<p class="lvn" style="margin-top:12px">${x.rvMod}</p></div>${form()}</div></div>`},
set(k,v){d[k]=v;err[k]=null;st='idle';render()},
async load(){if(!API)return;try{const r=await fetch(API+'/reviews?status=approved');if(r.ok){list=(await r.json()).items||[];render()}}catch(e){}},
async submit(e){e.preventDefault();const x=T();err={};if(d.name.trim().length<2)err.name=x.rvEr[0];if(!d.role)err.role=x.rvEr[1];if(!d.rate)err.rate=x.rvEr[2];if(d.text.trim().length<10)err.text=x.rvEr[3];
if(Object.keys(err).length){st='err';render();return}
const body={name:d.name.trim(),role:d.role,rating:d.rate,text:d.text.trim()};
if(!API){try{const k='idrok-reviews-pending',a=JSON.parse(localStorage.getItem(k)||'[]');a.push({...body,status:'pending',at:Date.now()});localStorage.setItem(k,JSON.stringify(a))}catch(_){}st='demo';reset();render();return}
st='sending';render();try{const r=await fetch(API+'/reviews',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});st=r.ok?'ok':'fail';if(r.ok)reset()}catch(_){st='fail'}render()}}})();
