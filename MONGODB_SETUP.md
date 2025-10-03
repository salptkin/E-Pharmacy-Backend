# MongoDB Atlas Kurulum Rehberi

## 1. MongoDB Atlas Hesabı Oluşturun

- https://www.mongodb.com/atlas adresine gidin
- "Try Free" butonuna tıklayın
- Email ile kayıt olun

## 2. Cluster Oluşturun

- "Build a Database" seçin
- "FREE" planını seçin (M0)
- AWS ve en yakın region'ı seçin
- Cluster name: "e-pharmacy-cluster"
- "Create" butonuna tıklayın

## 3. Database User Oluşturun

- "Database Access" sekmesine gidin
- "Add New Database User" tıklayın
- Username: "e-pharmacy-user"
- Password: güçlü bir şifre oluşturun
- "Database User Privileges": "Read and write to any database"
- "Add User" tıklayın

## 4. Network Access Ayarlayın

- "Network Access" sekmesine gidin
- "Add IP Address" tıklayın
- "Allow Access from Anywhere" seçin (0.0.0.0/0)
- "Confirm" tıklayın

## 5. Connection String Alın

- "Database" sekmesine gidin
- "Connect" butonuna tıklayın
- "Connect your application" seçin
- Connection string'i kopyalayın

## 6. .env Dosyasını Güncelleyin

Connection string'den bilgileri çıkarın:

```
MONGODB_USER=e-pharmacy-user
MONGODB_PASSWORD=your_password_here
MONGODB_URL=cluster0.xxxxx.mongodb.net
MONGODB_DB=e-pharmacy
MONGODB_OPTIONS=retryWrites=true&w=majority
```

## 7. Test Edin

```bash
npm run dev
```

Console'da "Mongo connection successfully established!" mesajını görmelisiniz.
