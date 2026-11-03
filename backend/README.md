# IdrokAI — backend talablari (hali yozilmagan)
Frontend `js/reviews.js` dagi `API` konstantasi bo‘sh bo‘lsa demo rejimda ishlaydi. Server tayyor bo‘lgach shu manzilni kiriting.

## Sharhlar (reviews)
Jadval `reviews`: `id` (uuid), `name` (2–60), `role` (`teacher|student`), `rating` (1–5), `text` (10–600), `status` (`pending|approved|rejected`), `created_at`, `moderated_by`, `moderated_at`, `lang`.
- `GET  /reviews?status=approved` → `{items:[{id,name,role,rating,text}]}` (ommaviy, faqat approved)
- `POST /reviews` → 201, status har doim `pending`. Server tomonda validatsiya, HTML tozalash, rate-limit, spam/captcha.
- `GET  /admin/reviews?status=pending` va `PATCH /admin/reviews/:id {status}` — faqat administrator (autentifikatsiya + rol tekshiruvi, audit log).
## O‘yinlar uchun AI savollari
- `POST /games/questions {topic,level,lang,count}` → `[{q, options[4], correctIndex}]` (frontend `qb` formati). API kalitlari faqat serverda; token yechish va limit ham serverda.
## Boshqa
Autentifikatsiya, rollar (talaba/o‘qituvchi/admin), tariflar, to‘lov webhooklari va token balansi serverda tasdiqlanadi.
