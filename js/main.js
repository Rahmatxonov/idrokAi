// IdrokAI — Render sikli, marshrutlash (hash) va Capacitor integratsiyasi
function render(){nav();$('#root').innerHTML=isApp()?app():landing();mdl();bn();Tools.after();if(!isApp())Hero3D.mount();
if(S.first&&!isApp()){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in2');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.rv').forEach(el=>io.observe(el))}}
addEventListener('hashchange',()=>{const h=location.hash;if(h&&!h.startsWith('#/'))return;S.tab=h==='#/app/tools'||h==='#/app/games'?'tools':'dash';if(h==='#/app/games')Games.enter();else{Games.reset();if(h==='#/app/tools'&&S.sub==='gm')S.sub='gen'}S.first=!isApp();render();if(isApp())scrollTo(0,0)});
const Native={cap:window.Capacitor,is(){return !!(this.cap&&this.cap.isNativePlatform&&this.cap.isNativePlatform())},
init(){if(!this.is())return;document.documentElement.classList.add('native');const A=this.cap.Plugins&&this.cap.Plugins.App;
A&&A.addListener('backButton',()=>{if(S.modal)modal(0);else if(isApp()&&S.tab!=='dash')go('dash');else if(isApp())location.hash='#/';else A.exitApp()})}};
if(location.hash==='#/app/games'){S.tab='tools';Games.enter()}else S.tab=location.hash==='#/app/tools'?'tools':'dash';Reviews.load();Auth.init();Native.init();document.documentElement.lang=S.lang;render();
