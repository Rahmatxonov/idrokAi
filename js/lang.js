// IdrokAI — til tanlash dropdowni: ARIA listbox, klaviatura, tashqariga bosish/Escape bilan yopish
const LangMenu=(()=>{
const btn=()=>document.getElementById('lgb'),opts=()=>[...document.querySelectorAll('#lgm li')];
const isOpen=()=>{const b=btn();return !!b&&b.getAttribute('aria-expanded')==='true'};
function open(){const b=btn();if(!b)return;b.setAttribute('aria-expanded','true');b.parentElement.classList.add('open');const o=opts();(o.find(x=>x.classList.contains('on'))||o[0]).focus()}
function close(back){const b=btn();if(!b)return;b.setAttribute('aria-expanded','false');b.parentElement.classList.remove('open');if(back)b.focus()}
function pick(l){close();setLang(l);const b=btn();if(b)b.focus()}
document.addEventListener('click',e=>{if(!e.target.closest('.lg'))close();else{const li=e.target.closest('#lgm li');if(li)pick(li.dataset.l)}});
document.addEventListener('keydown',e=>{const b=btn();if(!b)return;const k=e.key,a=document.activeElement;
if(k==='Escape'&&isOpen()){e.preventDefault();close(true);return}
if(a===b&&(k==='ArrowDown'||k==='ArrowUp')){e.preventDefault();open();return}
if(a&&a.closest&&a.closest('#lgm')){const o=opts(),i=o.indexOf(a),f=n=>{e.preventDefault();o[n].focus()};
if(k==='ArrowDown')f((i+1)%o.length);else if(k==='ArrowUp')f((i-1+o.length)%o.length);else if(k==='Home')f(0);else if(k==='End')f(o.length-1);
else if(k==='Enter'||k===' '){e.preventDefault();pick(a.dataset.l)}else if(k==='Tab')close()}});
return{toggle:()=>isOpen()?close():open(),
html(){const c=LANGS.find(l=>l[0]===S.lang)||LANGS[0];return`<div class="lg"><button class="lgb" id="lgb" aria-haspopup="listbox" aria-expanded="false" aria-controls="lgm" aria-label="Language" onclick="LangMenu.toggle()">${ic('globe')}<b>${c[2]}</b>${ic('chev')}</button><ul class="lgm" id="lgm" role="listbox" aria-label="Language">${LANGS.map(l=>`<li role="option" tabindex="-1" data-l="${l[0]}" aria-selected="${l[0]===S.lang}" class="${l[0]===S.lang?'on':''}"><span class="fl2">${l[3]}</span><span>${l[1]}</span>${l[4]?'<i class="pb" title="Beta">β</i>':''}${l[0]===S.lang?ic('ok'):''}</li>`).join('')}</ul></div>`}}})();
