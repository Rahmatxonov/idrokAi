// Capacitor uchun: .env bo‘lsa js/config.js yaratadi, so‘ng veb fayllarni www/ ga nusxalaydi
const fs=require('fs'),path=require('path');
if(fs.existsSync(path.join(__dirname,'..','.env'))||process.env.SUPABASE_URL)require('./gen-config');
fs.rmSync('www',{recursive:true,force:true});fs.mkdirSync('www');
for(const p of ['index.html','css','js','assets'])fs.cpSync(p,'www/'+p,{recursive:true});
console.log('www/ tayyor');
