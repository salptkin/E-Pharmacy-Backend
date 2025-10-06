# E-Pharmacy Backend API

A RESTful API backend for a modern e-pharmacy application.

## 🚀 Features

- ✅ User authentication (JWT)
- ✅ Cart management
- ✅ Product listing and search
- ✅ Pharmacy listing
- ✅ Customer reviews
- ✅ MongoDB database integration

## 📋 API Endpoints

### Authentication

- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/logout` - User logout
- `GET /api/user/user-info` - Get user information

### Cart

- `GET /api/cart` - View cart contents
- `PUT /api/cart/update` - Update cart
- `POST /api/cart/add` - Add product to cart
- `PUT /api/cart/decrease` - Decrease product quantity
- `DELETE /api/cart/remove/:productId` - Remove product from cart
- `POST /api/cart/checkout` - Checkout

### Products

- `GET /api/products` - List all products (with pagination & filtering)
- `GET /api/products/:id` - Get product details

### Stores

- `GET /api/stores` - List all pharmacies
- `GET /api/stores/nearest` - List nearest pharmacies

### Reviews

- `GET /api/customer-reviews` - Get customer reviews

## 🛠️ Teknolojiler

- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Joi** - Validation

## 🔧 Kurulum

```bash
# Clone the project
git clone https://github.com/salptkin/E-Pharmacy-Backend.git

# Navigate to the project directory
cd E-Pharmacy-Backend

# Install dependencies
npm install

# Create a .env file and add the required environment variables
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
