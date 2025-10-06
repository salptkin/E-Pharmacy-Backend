# E-Pharmacy Backend API

Modern e-eczane uygulaması için RESTful API backend.

## 🚀 Özellikler

- ✅ Kullanıcı kimlik doğrulama (JWT)
- ✅ Sepet yönetimi
- ✅ Ürün listeleme ve arama
- ✅ Eczane listeleme
- ✅ Müşteri yorumları
- ✅ MongoDB veritabanı

## 📋 API Endpoints

### Authentication

- `POST /api/user/register` - Kullanıcı kaydı
- `POST /api/user/login` - Kullanıcı girişi
- `POST /api/user/logout` - Kullanıcı çıkışı
- `GET /api/user/user-info` - Kullanıcı bilgileri

### Cart (Sepet)

- `GET /api/cart` - Sepet içeriğini görüntüle
- `PUT /api/cart/update` - Sepeti güncelle
- `POST /api/cart/add` - Sepete ürün ekle
- `PUT /api/cart/decrease` - Ürün miktarını azalt
- `DELETE /api/cart/remove/:productId` - Ürünü sepetten sil
- `POST /api/cart/checkout` - Satın alma işlemi

### Products (Ürünler)

- `GET /api/products` - Tüm ürünleri listele (pagination, filtreleme)
- `GET /api/products/:id` - Ürün detayı

### Stores (Eczaneler)

- `GET /api/stores` - Tüm eczaneleri listele
- `GET /api/stores/nearest` - En yakın eczaneleri listele

### Reviews (Yorumlar)

- `GET /api/customer-reviews` - Müşteri yorumlarını getir

## 🛠️ Teknolojiler

- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Veritabanı
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Şifre hashleme
- **Joi** - Validation

## 🔧 Kurulum

```bash
# Projeyi klonlayın
git clone https://github.com/salptkin/E-Pharmacy-Backend.git

# Klasöre girin
cd E-Pharmacy-Backend

# Bağımlılıkları yükleyin
npm install

# .env dosyası oluşturun ve gerekli değişkenleri ekleyin
```

## 📝 Environment Variables

```env
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_USER=your_user
MONGODB_PASSWORD=your_password
MONGODB_URL=your_cluster_url
MONGODB_DB=e-pharmacy

# JWT
JWT_SECRET=your_secret_key
```

## 🚀 Çalıştırma

```bash
# Development
npm run dev

# Production
npm start
```

## 📦 Deployment

Bu proje Render.com üzerinde deploy edilebilir.

## 📄 Lisans

ISC
