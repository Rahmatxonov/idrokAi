// IdrokAI — kartalar uchun yengil tilt va yorug‘lik effekti (sensorli qurilmalar va reduced-motion'da o‘chiq)
(()=>{if(matchMedia('(pointer:coarse),(prefers-reduced-motion:reduce)').matches)return;
const card=e=>e.target.closest&&e.target.closest('.card.h,.fci');
document.addEventListener('pointermove',e=>{const c=card(e);if(!c)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
c.style.setProperty('--ry',((x-.5)*8).toFixed(2)+'deg');c.style.setProperty('--rx',((.5-y)*8).toFixed(2)+'deg');c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%')});
document.addEventListener('pointerout',e=>{const c=card(e);if(c&&!c.contains(e.relatedTarget)){c.style.removeProperty('--rx');c.style.removeProperty('--ry')}})})();
