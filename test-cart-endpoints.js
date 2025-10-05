const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Test configuration
const TEST_USER = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '1234567890',
  password: 'password123'
};

const TEST_PRODUCT_ID = '507f1f77bcf86cd799439011'; // Replace with actual product ID

let authToken = '';

async function registerUser() {
  try {
    console.log('🔐 Registering user...');
    const response = await axios.post(`${BASE_URL}/user/register`, TEST_USER);
    console.log('✅ User registered:', response.data);
  } catch (error) {
    if (error.response?.status === 409) {
      console.log('ℹ️ User already exists, continuing...');
    } else {
      console.error('❌ Registration failed:', error.response?.data || error.message);
    }
  }
}

async function loginUser() {
  try {
    console.log('🔑 Logging in user...');
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password
    });
    authToken = response.data.token;
    console.log('✅ Login successful, token received');
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
    throw error;
  }
}

async function testGetCartItems() {
  try {
    console.log('📋 Testing GET /api/cart...');
    const response = await axios.get(`${BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Get cart items successful:', response.data);
  } catch (error) {
    console.error('❌ Get cart items failed:', error.response?.data || error.message);
  }
}

async function testUpdateCart() {
  try {
    console.log('🔄 Testing PUT /api/cart/update...');
    const response = await axios.put(`${BASE_URL}/cart/update`, {
      products: [{
        productId: TEST_PRODUCT_ID,
        quantity: 2
      }]
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Update cart successful:', response.data);
  } catch (error) {
    console.error('❌ Update cart failed:', error.response?.data || error.message);
  }
}

async function testCheckout() {
  try {
    console.log('💳 Testing POST /api/cart/checkout...');
    const response = await axios.post(`${BASE_URL}/cart/checkout`, {
      name: TEST_USER.name,
      email: TEST_USER.email,
      phone: TEST_USER.phone,
      address: 'Test Address 123',
      payment: 'cash'
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Checkout successful:', response.data);
  } catch (error) {
    console.error('❌ Checkout failed:', error.response?.data || error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting Cart API Tests...\n');
  
  try {
    await registerUser();
    await loginUser();
    
    console.log('\n--- Testing Cart Endpoints ---');
    await testGetCartItems();
    await testUpdateCart();
    await testCheckout();
    
    console.log('\n🎉 All tests completed!');
  } catch (error) {
    console.error('💥 Test suite failed:', error.message);
  }
}

// Run tests
runTests();
