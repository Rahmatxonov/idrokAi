// .env (yoki muhit o‘zgaruvchilari) → js/config.js. Faqat OMMAVIY qiymatlar yoziladi (Project URL, anon kalit).
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..');
const env={...process.env};
try{for(const l of fs.readFileSync(path.join(root,'.env'),'utf8').split(/\r?\n/)){const m=l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);if(m&&!l.trim().startsWith('#'))env[m[1]]??=m[2].replace(/^['"]|['"]$/g,'')}}catch(e){}
const url=(env.SUPABASE_URL||'').replace(/\/$/,''),key=env.SUPABASE_PUBLISHABLE_KEY||env.SUPABASE_ANON_KEY||'';
const fail=m=>{console.error('XATO: '+m);process.exit(1)};
if(!url||!key)fail('.env da SUPABASE_URL va SUPABASE_PUBLISHABLE_KEY kerak (.env.example dan nusxa oling).');
if(!/^https?:\/\//.test(url)||/supabase\.com/.test(url))fail('SUPABASE_URL Project URL bo‘lishi kerak: https://<ref>.supabase.co (dashboard havolasi emas).');
let role='';try{role=JSON.parse(Buffer.from(key.split('.')[1],'base64url').toString()).role}catch(e){}
if(/^sb_secret_/.test(key)||role==='service_role')fail('service_role/secret kalit frontendga yozilmaydi! publishable kalitni (sb_publishable_…) kiriting.');
fs.writeFileSync(path.join(root,'js','config.js'),'// Avtomatik yaratilgan (npm run config). Faqat ommaviy qiymatlar; Google Client Secret bu yerda yo‘q.\nwindow.IDROK_CONFIG='+JSON.stringify({supabaseUrl:url,supabaseKey:key})+';\n');
console.log('js/config.js yangilandi:',url);
