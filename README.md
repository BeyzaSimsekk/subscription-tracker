# 📬 Subscription Tracker API

Subscription Tracker API, kullanıcıların aboneliklerini takip edebileceği ve hatırlatıcı workflow’lar oluşturabileceği bir backend servisidir.

Bu proje aşağıdaki teknolojilerle geliştirilmiştir:

- 🟢 Node.js & Express.js  
- 🍃 MongoDB (Mongoose)  
- 🔁 Upstash QStash & Workflows  
- 🛡️ Arcjet (Fingerprint & Identification)  
- 🔐 JWT Authentication  

---

## 🚀 Canlı Uygulama

Uygulamayı Render üzerinden deneyimleyebilirsiniz:  
🔗 [https://subscription-tracker-2lrx.onrender.com](https://subscription-tracker-2lrx.onrender.com)

---

## 📦 Kurulum ve Çalıştırma

```bash
# Depoyu klonlayın
git clone <repo-url>
cd subscription-tracker

# Bağımlılıkları yükleyin
npm install
```

`.env.development.local` ve `.env.production.local` dosyalarını oluşturun ve gerekli environment değişkenlerini ekleyin.

### Local geliştirme için:

```bash
npm run dev
```

### Production ortamı için:

```bash
npm run start
```

---

## 🔑 Authentication

JWT tabanlı kimlik doğrulama kullanılır:

- **Sign-up:** `POST /api/v1/auth/sign-up`  
- **Sign-in:** `POST /api/v1/auth/sign-in` → JSON response içinde token döner

---

## ⚡ HTTPie ile Test

### 1. Kullanıcı Kaydı

```bash
http POST https://subscription-tracker-2lrx.onrender.com/api/v1/auth/sign-up \
email="test@example.com" \
password="123456"
```

### 2. Giriş ve Token Alma

```bash
http POST https://subscription-tracker-2lrx.onrender.com/api/v1/auth/sign-in \
email="test@example.com" \
password="123456"
```

Response içindeki `token` alanını kopyalayın.

### 3. Korunan Endpoint’i Çağırma

```bash
http GET https://subscription-tracker-2lrx.onrender.com/api/v1/subscriptions/user/<user_id> \
Authorization:"Bearer <kopyaladığınız_token>"
```

`<user_id>` yerine MongoDB kullanıcı ID’nizi veya Sign-up sonrası dönen ID’yi girin.

---

## 🔄 Abonelik İşlemleri

| HTTP Method | Endpoint | Açıklama |
|-------------|----------|----------|
| `POST`      | `/api/v1/subscriptions/` | Yeni abonelik oluşturur (auth required) |
| `GET`       | `/api/v1/subscriptions/user/:id` | Kullanıcının tüm aboneliklerini getirir |
| `PUT`       | `/api/v1/subscriptions/:id/cancel` | Aboneliği iptal eder (auth required) |
| `GET`       | `/api/v1/subscriptions/upcoming-renewals` | Yaklaşan yenilenmeleri listeler |

---

## 🛠️ Teknolojiler

- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- Upstash QStash & Workflows  
- Arcjet  
- JWT Authentication  

---

## ⚠️ Notlar

- Render üzerindeki servis otomatik olarak port atar, `.env` içindeki port ayarı Render tarafından geçersiz sayılabilir.  
- Arcjet ile ilgili uyarılar, production’da bazı özelliklerin IP olmadan çalışmamasından kaynaklanır.  
- HTTPie veya Postman kullanırken doğru HTTP metodunu seçtiğinizden emin olun.  

---

## 🙏 Credits
Special thanks to JavaScript Mastery for the inspiration and invaluable guidance throughout this project!

Feel free to explore, contribute, and customize. Happy coding! 🚀
