// IdrokAI — Holat (state), yordamchi funksiyalar, til va mavzu
let S={level:1,modal:0,sub:'gen',lang:'uz',theme:null,role:'s',yearly:false,tool:0,topic:'',grade:0,busy:false,res:null,tok:84200,made:23,tab:'dash',first:true,
recent:null};
try{S.lang=localStorage.getItem('idrok-lang')||'uz';S.level=+(localStorage.getItem('idrok-level')||1)}catch(e){}
if(!LANGS.some(l=>l[0]===S.lang))S.lang='uz';
const T=()=>D[S.lang],$=s=>document.querySelector(s),isApp=()=>location.hash.startsWith('#/app');
function setLang(l){S.lang=l;try{localStorage.setItem('idrok-lang',l)}catch(e){}document.documentElement.lang=l;S.first=false;render()}
function toggleTheme(){const d=document.documentElement,n=d.dataset.theme==='dark'?'light':'dark';d.dataset.theme=n;try{localStorage.setItem('idrok-theme',n)}catch(e){}const m=document.querySelector('meta[name=theme-color]');if(m)m.content=n==='dark'?'#19162E':'#F8F7FC';nav();if(!isApp())Hero3D.mount()}
