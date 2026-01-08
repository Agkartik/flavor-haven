# Flavor Haven - Premium Food Delivery App

A fully functional, feature-rich food delivery web application built with HTML, CSS, and JavaScript.

## 🚀 Features

- **User Authentication** - Login/Signup system
- **Browse Menu** - Search and filter dishes by category
- **Shopping Cart** - Add/remove items, manage quantities
- **Checkout System** - Complete order with delivery details and multiple payment options
- **Order Tracking** - Track your orders in real-time
- **Loyalty Rewards** - Earn points on every order and redeem for discounts
- **Gamification** - Spin the wheel daily for special rewards
- **AI Recommendations** - Get personalized dish suggestions
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Real-time Tracking** - Live order status updates with delivery map

## 📁 Folder Structure

```
flavor-haven/
├── index.html          (Main application file)
├── styles.css          (All styling)
├── script.js           (All functionality)
├── assets/
│   ├── images/         (Restaurant images)
│   └── icons/          (UI icons)
└── README.md           (This file)
```

## 🔧 How to Use

### Option 1: Single File Setup (Easiest)
1. Download `index.html`
2. Open it directly in your web browser
3. That's it! The entire app runs in one file.

### Option 2: Organized Setup (Recommended)
1. Create a folder named `flavor-haven`
2. Place `index.html`, `styles.css`, and `script.js` in the folder
3. Open `index.html` in your browser

### Option 3: Local Server Setup (Best Practice)
```bash
# Navigate to folder
cd flavor-haven

# Start a local server (Python 3)
python -m http.server 8000

# Or use Node.js
npx http-server

# Then visit: http://localhost:8000
```

## 👤 Test Credentials

**Login with any credentials:**
- Email: `test@example.com`
- Password: `123456`

The app accepts any email/password combination and creates an account on signup.

## 🎮 Key Features Explained

### 1. **Loyalty Points System**
- Earn 10 points per ₹100 spent
- 5 membership tiers (Bronze → VIP)
- Unlock discounts: 5% (Silver) to 20% (VIP)

### 2. **Daily Spin Wheel**
- Spin once per day for rewards
- Win: ₹50, ₹100, Free Dessert, ₹200 Voucher, 25% Off

### 3. **AI Recommendations**
- Get personalized suggestions based on order history
- Discover new dishes in your favorite categories

### 4. **Order Tracking**
- Real-time status: Confirmed → Preparing → On the Way → Delivered
- Estimated delivery time: 30-45 minutes
- Track with interactive map

### 5. **Payment Options**
- 💳 Credit/Debit Card (with animated card preview)
- 📱 UPI Payment (with QR code)
- 💰 Digital Wallet (Amazon Pay, Airtel Money, etc.)
- 💵 Cash on Delivery

## 🎨 Customization

### Change Restaurant Name
Open `index.html` and find:
```html
<a href="#" class="logo" onclick="showHome()">🍽️ Flavor Haven</a>
```
Replace "Flavor Haven" with your restaurant name.

### Update Contact Info
Find the footer section and update:
- Phone: `+91 98765 43210`
- Email: `hello@flavorhaven.com`
- Address: `123 Gourmet Street, Bhopal`

### Add Your Dishes
In the JavaScript section, find `menuData` array and add/modify items:
```javascript
{ 
  id: 1, 
  name: 'Your Dish Name', 
  category: 'Main Course', 
  price: 450, 
  desc: 'Dish description',
  image: 'https://your-image-url.jpg' 
}
```

### Change Colors
Find `:root` CSS variables and modify:
```css
--color-primary: #ff6b35;      /* Main orange */
--color-secondary: #f7931e;    /* Secondary orange */
--color-success: #27ae60;       /* Green for success */
```

## 💾 Data Storage

- **Cart**: Stored in JavaScript memory (clears on refresh)
- **Orders**: Stored in JavaScript memory (clears on refresh)
- **User Data**: Stored in JavaScript memory (clears on refresh)

To persist data, integrate with a backend:
- Firebase
- MongoDB
- PostgreSQL
- Node.js Express

## 📱 Browser Compatibility

✅ Chrome (Latest)
✅ Firefox (Latest)
✅ Safari (Latest)
✅ Edge (Latest)
✅ Mobile Browsers

## 🎓 Learning Path

This project is perfect for learning:
1. HTML5 semantic structure
2. CSS3 (Flexbox, Grid, Animations)
3. Vanilla JavaScript (ES6+)
4. DOM manipulation
5. Local state management
6. Event handling
7. Form validation
8. Responsive design

## 🚀 Future Enhancements

- [ ] Backend API integration
- [ ] Real database (MongoDB/Firebase)
- [ ] User authentication (JWT)
- [ ] Payment gateway integration (Stripe, Razorpay)
- [ ] Email notifications
- [ ] SMS order updates
- [ ] Rating & reviews system
- [ ] Discount codes
- [ ] Admin dashboard
- [ ] Analytics & reports

## 📞 Support

For issues or questions:
1. Check the code comments
2. Review the feature explanations above
3. Test with different browsers
4. Clear browser cache and reload

## 📄 License

Free to use for personal and commercial projects.

## 🙏 Credits

Built with HTML, CSS, and JavaScript. Images sourced from Unsplash.

---

**Happy Coding! 🎉**

Enjoy building and customizing your food delivery app!