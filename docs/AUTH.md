# Google orqali kirish va ro‘yxatdan o‘tish — to‘liq sozlash (Supabase Auth)

**Holat:** kod tayyor (`js/auth.js`, PKCE oqimi, sessiya, profil, chiqish). Faqat tashqi sozlash qoldi: Supabase loyihasi va Google OAuth Client. Ular sozlanmaguncha login oynasida **nima yetishmayotgani** ro‘yxat ko‘rinishida chiqadi (masalan "supabaseUrl bo‘sh", "Google provider yoqilmagan").

**Nega Supabase:** backendsiz static sayt uchun Google OAuth, sessiya va Row Level Security tayyor. Firebase Auth ham mumkin, lekin ma’lumotlarni himoyalash uchun alohida Firestore qoidalari kerak.

## Umumiy oqim
Sayt → `signInWithOAuth` → Google hisob tanlash → **Supabase callback** (`https://<REF>.supabase.co/auth/v1/callback`) → saytingizga qaytish (`?code=...`) → sessiya → profil yaratiladi → `#/app`.

## 1. Supabase loyihasi
1. https://supabase.com → **New project** (nom, parol, region). Tayyor bo‘lishini kuting.
2. **Project Settings → API**: `Project URL` (`https://<REF>.supabase.co`) va **Publishable key** (`sb_publishable_…`, **API Keys** bo‘limida; eski loyihalarda `anon` kalit ham ishlaydi) ni nusxalang. `service_role` / `secret` kalitni **hech qayerga yozmang**.
3. (Mavjud loyihada `profiles`/`generations`/`materials` jadvallari allaqachon bo‘lsa, `create table` xato beradi: bunday holda faqat kerakli ustunlarni `alter table ... add column if not exists` bilan qo‘shing va RLS qoidalarini qo‘lda tekshiring.) **SQL Editor → New query**: `supabase/schema.sql` ichidagini to‘liq joylab **Run** bosing (profiles, generations, materials, RLS, profil yaratuvchi trigger).

## 2. Google Cloud Console
1. https://console.cloud.google.com → loyiha yarating/tanlang.
2. **APIs & Services → OAuth consent screen**: User type **External**, App name `IdrokAI`, support email va developer email kiriting. Scopes: `email`, `profile`, `openid` (standart). Testing rejimida **Test users** ga o‘zingizning Gmail'ingizni qo‘shing (aks holda "access blocked").
3. **Credentials → Create credentials → OAuth client ID → Web application**.
4. **Authorized JavaScript origins:** `http://localhost:5500` (Live Server), keyin ishlab chiqarish domeningiz (`https://your-domain.uz`).
5. **Authorized redirect URIs (aynan shu):** `https://<REF>.supabase.co/auth/v1/callback`
6. **Create** → **Client ID** va **Client Secret** ni nusxalang.

## 3. Supabase da Google provider
1. **Authentication → Providers → Google** → **Enable**.
2. Client ID va **Client Secret** ni shu yerga joylang (faqat shu yerga) → **Save**.
3. **Authentication → URL Configuration:**
   - **Site URL:** `http://localhost:5500` (keyin ishlab chiqarish domeningiz).
   - **Redirect URLs:** `http://localhost:5500/**`, `http://127.0.0.1:5500/**`, `https://your-domain.uz/**`
   (Sayt qaysi manzildan ochilsa, aynan o‘sha manzil shu ro‘yxatda bo‘lishi shart. `localhost` va `127.0.0.1` — boshqa-boshqa manzil.)

## 4. Frontend sozlash (.env)
```
cp .env.example .env        # Windows: copy .env.example .env
# .env ichida SUPABASE_URL va SUPABASE_PUBLISHABLE_KEY ni to‘ldiring
npm run config              # js/config.js ni avtomatik yaratadi (kalit noto‘g‘ri bo‘lsa, xato beradi)
```
Skript `service_role`/`secret` kalitni qabul qilmaydi. Brauzer `.env` ni o‘qiy olmaydi, shuning uchun `config.js` yaratiladi; unda faqat ommaviy qiymatlar bor. Qo‘lda ham to‘ldirish mumkin: `js/config.js`.

## 5. Ishga tushirish va tekshirish
1. VS Code → **Live Server** (`http://localhost:5500`). `file://` da OAuth ishlamaydi.
2. **Kirish** → **Google orqali davom etish** → hisobni tanlang → saytga qaytib, `#/app` ochiladi, navbarda ism va avatar chiqadi.
3. Supabase → **Authentication → Users** da foydalanuvchi, **Table editor → profiles** da `full_name`, `email`, `avatar_url` qatori ko‘rinadi.
4. Sahifani yangilang: login holati saqlanadi. Avatar menyusi → **Chiqish**.
Birinchi kirishda hisob avtomatik yaratiladi ("Hisobingiz yaratildi"), keyingilarida mavjud hisobga kirasiz. Supabase'da "Kirish" va "Ro‘yxatdan o‘tish" Google uchun bir xil jarayon.

## Muammolar
| Belgi | Sabab / yechim |
|---|---|
| Oynada "supabaseUrl/AnonKey bo‘sh" | `npm run config` ishlating yoki `js/config.js` ni to‘ldiring |
| "Google provider yoqilmagan" | 3-qadam: Providers → Google → Enable |
| Google: `redirect_uri_mismatch` | 2.5: redirect URI aynan `https://<REF>.supabase.co/auth/v1/callback` bo‘lsin |
| Google: "Access blocked / not verified" | Consent screen Testing bo‘lsa, Test users ga Gmail qo‘shing |
| Kirgach boshqa sahifa (Site URL) ochiladi | Joriy manzil Redirect URLs ro‘yxatida yo‘q (127.0.0.1 ≠ localhost) |
| "Supabase kalitni qabul qilmadi (401)" | Publishable key noto‘g‘ri yoki boshqa loyihadan |
| Xavfsizlik ogohlantirishi (service_role) | Kalitni o‘chiring va Supabase'da qayta yarating |

## Xavfsizlik
- Google Client Secret faqat Supabase Dashboard'da. Kodda, `.env` da ham, repoda ham yo‘q.
- Login holati Supabase sessiyasi (serverda tekshiriladigan JWT) bilan aniqlanadi; `localStorage` dagi oddiy qiymatga ishonilmaydi. Ma’lumotlarni RLS qoidalari himoyalaydi.
- `.env` `.gitignore` da. Anon kalit ommaviy, lekin RLS yoqilgan bo‘lishi shart (`schema.sql` buni bajaradi).

## Capacitor (keyinroq)
Mobil ilovada Google redirect uchun deep link (custom URL scheme) va uni Supabase Redirect URLs ga qo‘shish kerak bo‘ladi.
