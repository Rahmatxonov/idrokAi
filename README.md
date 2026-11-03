# IdrokAI

O‘qituvchi va talabalar uchun AI ta’lim platformasi (hozircha veb-sayt). Oddiy HTML + CSS + JavaScript, framework va build bosqichisiz.

## VS Code'da ishga tushirish
1. Papkani VS Code'da oching (`File → Open Folder`).
2. **Live Server** kengaytmasini o‘rnating (VS Code sizga tavsiya qiladi).
3. `index.html` ustida o‘ng tugma → **Open with Live Server**.

Muqobil: `npm run dev` (Node.js kerak) yoki `index.html` ni brauzerda to‘g‘ridan-to‘g‘ri oching.

## Papkalar tuzilmasi
```
idrokai/
├── index.html            # sahifa karkasi, fayllarni ulaydi
├── css/styles.css        # barcha uslublar, dark mode, responsive qoidalar
├── js/
│   ├── icons.js          # SVG ikonkalar, vositalar ro‘yxati
│   ├── i18n.js           # tarjimalar: uz (asosiy), ru, en
│   ├── state.js          # holat (til, daraja, token), til/mavzu funksiyalari
│   ├── components.js     # landing, dashboard, AI vositalar, modal, generator
│   ├── games.js          # 10 ta o‘yin (demo savollar)
│   ├── reviews.js        # fikrlar formasi va API klienti
│   ├── auth.js           # Google OAuth (Supabase), sessiya, profil menyusi
│   ├── config.js         # ommaviy sozlamalar (Supabase URL / anon key)
│   ├── tools.js          # muharrir, doska, o‘yinlar
│   ├── lang.js           # til dropdowni (7 til, klaviatura, saqlash)
│   ├── fx.js             # kartalar tilt/yorug‘lik effekti
│   ├── hero3d.js         # bosh sahifadagi 3D AI yadrosi (canvas)
│   └── main.js           # render, hash-marshrutlash, Capacitor (back tugmasi)
├── assets/favicon.svg
├── scripts/build.js      # web fayllarni www/ ga nusxalaydi (Capacitor uchun)
├── capacitor.config.json
└── package.json
```
Skriptlar `index.html` da shu tartibda ulangan: icons → i18n → state → components → fx → hero3d → main. Tartibni o‘zgartirmang.

## Qayerni o‘zgartirish kerak
- Matn va yangi til: `js/i18n.js`
- Ta’lim darajasi bo‘yicha vositalar: `LV_TOOLS` (`js/components.js`)
- Rang va dizayn: `:root` tokenlari (`css/styles.css`)
- Eslatma: generator hozircha namunaviy natija beradi (`gen()` funksiyasi). Haqiqiy AI uchun shu joyga backend API chaqiruvini ulang.

## Keyinroq: Android / iOS (Capacitor)
```
npm install
npx cap add android      # iOS uchun: npx cap add ios (macOS + Xcode kerak)
npm run android          # build + sync + Android Studio'ni ochadi
```
Safe-area, bottom navigation va Android back tugmasi allaqachon tayyor. Oflayn ishlashi uchun Google Fonts fayllarini lokal saqlang.

## Google orqali kirish
Sozlash: `docs/AUTH.md`, ma’lumotlar bazasi: `supabase/schema.sql`, namuna: `.env.example`.
