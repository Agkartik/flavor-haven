// Menu Data
const menuData = [
    { id: 1, name: 'Margherita Pizza', category: 'Appetizers', price: 350, desc: 'Fresh mozzarella, tomato, basil', image: 'Assests/Margherita Pizza.jpg' },
    { id: 2, name: 'Caesar Salad', category: 'Appetizers', price: 280, desc: 'Crisp romaine, parmesan, croutons', image: 'Assests/Caesar Salad.jpg' },
    { id: 3, name: 'Garlic Bread', category: 'Appetizers', price: 200, desc: 'Freshly baked with garlic butter', image: 'Assests/Garlic Bread.jpeg' },
    { id: 4, name: 'Butter Chicken', category: 'Main Course', price: 450, desc: 'Tender chicken in creamy tomato sauce', image: 'Assests/Butter Chicken.jpg' },
    { id: 5, name: 'Biryani', category: 'Main Course', price: 380, desc: 'Fragrant basmati rice with spices', image: 'Assests/Biryani.jpg' },
    { id: 6, name: 'Grilled Salmon', category: 'Main Course', price: 520, desc: 'Fresh salmon with lemon herb sauce', image: 'Assests/Grilled Salmon.jpg' },
    { id: 7, name: 'Spaghetti Carbonara', category: 'Main Course', price: 420, desc: 'Creamy Italian pasta with pancetta', image: 'Assests/Spaghetti Carbonara.jpeg' },
    { id: 8, name: 'Chocolate Cake', category: 'Desserts', price: 220, desc: 'Rich and decadent chocolate layers', image: 'Assests/Chocolate Cake.jpg' },
    { id: 9, name: 'Cheesecake', category: 'Desserts', price: 280, desc: 'Creamy New York style cheesecake', image: 'Assests/Cheesecake.jpg' },
    { id: 10, name: 'Ice Cream Sundae', category: 'Desserts', price: 150, desc: 'Assorted flavors with toppings', image: 'Assests/Ice Cream Sundae.jpg' },
    { id: 11, name: 'Coffee', category: 'Beverages', price: 120, desc: 'Premium espresso, cappuccino', image: 'Assests/Coffee.jpg' },
    { id: 12, name: 'Fresh Juice', category: 'Beverages', price: 180, desc: 'Fresh orange, apple, pomegranate', image: 'Assests/Fresh Juice.jpg' },
    { id: 13, name: 'Soft Drinks', category: 'Beverages', price: 100, desc: 'Coke, Sprite, Fanta', image: 'Assests/Soft Drinks.jpg' },
    { id: 14, name: 'Tikka Masala', category: 'Main Course', price: 480, desc: 'Spiced chicken in tomato cream', image: 'Assests/Tikka Masala.jpg' },
    { id: 15, name: 'Samosa', category: 'Appetizers', price: 120, desc: 'Samosa with paneer stuffing', image: 'Assests/Samosa.jpg' }
];

// Rewards Data
const rewards = [
    { id: 1, name: '₹50 Discount', pointsCost: 500, icon: '💸' },
    { id: 2, name: '₹100 Discount', pointsCost: 1000, icon: '💸' },
    { id: 3, name: 'Free Dessert', pointsCost: 300, icon: '🍰' },
    { id: 4, name: '₹200 Voucher', pointsCost: 2000, icon: '🎫' },
    { id: 5, name: '25% Off (Max ₹500)', pointsCost: 3000, icon: '💎' }
];

// Loyalty Tiers
const loyaltyTiers = [
    { name: 'Bronze', minPoints: 0, maxPoints: 999, discount: 0, badge: '🥉' },
    { name: 'Silver', minPoints: 1000, maxPoints: 2499, discount: 5, badge: '🥈' },
    { name: 'Gold', minPoints: 2500, maxPoints: 4999, discount: 10, badge: '🥇' },
    { name: 'Platinum', minPoints: 5000, maxPoints: 9999, discount: 15, badge: '💎' },
    { name: 'VIP Elite', minPoints: 10000, maxPoints: Infinity, discount: 20, badge: '👑' }
];

// State
let cart = [];
let currentUser = null;
let userOrders = [];
let userLoyaltyPoints = 0;
let userOrderHistory = [];
let lastSpinDate = null;
let isSignupMode = false;
let currentFilter = 'All';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayMenu(menuData);
    loadRewardsUI();
});

// Navigation
function showHome() {
    hideAllPages();
    document.getElementById('homePage').classList.add('active');
}

function showMenu() {
    hideAllPages();
    document.getElementById('menuPage').classList.add('active');
    displayMenu(menuData);
}

function showAbout() {
    hideAllPages();
    document.getElementById('aboutPage').classList.add('active');
}

function showRewards() {
    if (!currentUser) {
        showLoginModal();
        return;
    }
    hideAllPages();
    document.getElementById('rewardsPage').classList.add('active');
    updateRewardsUI();
    generateRecommendations();
}

function showOrders() {
    if (!currentUser) {
        showLoginModal();
        return;
    }
    hideAllPages();
    document.getElementById('ordersPage').classList.add('active');
    displayOrders();
}

function showCheckout() {
    if (!currentUser) {
        showLoginModal();
        return;
    }
    hideAllPages();
    document.getElementById('checkoutPage').classList.add('active');
    updateCheckoutSummary();
}

function hideAllPages() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
}

// Menu Display
function displayMenu(items) {
    const menuItemsDiv = document.getElementById('menuItems');
    menuItemsDiv.innerHTML = '';

    if (items.length === 0) {
        menuItemsDiv.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #999;">No items found</div>';
        return;
    }

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-card';
        itemDiv.innerHTML = `
            <div class="menu-card-image" style="background-image: url('${item.image}')"></div>
            <div class="menu-card-content">
                <div class="menu-card-name">${item.name}</div>
                <div class="menu-card-desc">${item.desc}</div>
                <div class="menu-card-footer">
                    <span class="menu-price">₹${item.price}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            </div>
        `;
        menuItemsDiv.appendChild(itemDiv);
    });
}

// Filter Menu
function filterByCategory(category) {
    currentFilter = category;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    filterMenu();
}

function filterMenu() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = menuData.filter(item => {
        const matchCategory = currentFilter === 'All' || item.category === currentFilter;
        const matchSearch = item.name.toLowerCase().includes(searchTerm) || item.desc.toLowerCase().includes(searchTerm);
        return matchCategory && matchSearch;
    });
    displayMenu(filtered);
}

// Cart Functions
function addToCart(itemId) {
    if (!currentUser) {
        showLoginModal();
        return;
    }

    const item = menuData.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCart();
    toggleCart();
}

function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartDiscount = document.getElementById('cartDiscount');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutCartBtn = document.getElementById('checkoutCartBtn');

    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        checkoutCartBtn.disabled = true;
        cartSubtotal.textContent = '₹0';
        cartDiscount.textContent = '₹0';
        cartTotal.textContent = '₹0';
        return;
    }

    checkoutCartBtn.disabled = false;

    let subtotal = 0;
    cartItemsList.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">₹${item.price}</div>
                </div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span style="width: 30px; text-align: center;">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    }).join('');

    cartSubtotal.textContent = '₹' + subtotal;
    const discountAmount = getCurrentUserDiscount(subtotal);
    cartDiscount.textContent = '-₹' + discountAmount;
    const total = subtotal - discountAmount + 40;
    cartTotal.textContent = '₹' + total;
}

function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCart();
        }
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    updateCart();
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
}

function goToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    showCheckout();
}

// Loyalty Points System
function getCurrentUserTier() {
    for (let tier of loyaltyTiers) {
        if (userLoyaltyPoints >= tier.minPoints && userLoyaltyPoints <= tier.maxPoints) {
            return tier;
        }
    }
    return loyaltyTiers[0];
}

function getCurrentUserDiscount(subtotal) {
    const tier = getCurrentUserTier();
    return Math.floor(subtotal * tier.discount / 100);
}

function updateRewardsUI() {
    const pointsDisplay = document.getElementById('pointsDisplay');
    const tierBadge = document.getElementById('tierBadge');
    const tierProgress = document.getElementById('tierProgress');
    const tierInfo = document.getElementById('tierInfo');

    pointsDisplay.textContent = userLoyaltyPoints;
    const tier = getCurrentUserTier();
    tierBadge.textContent = `${tier.badge} ${tier.name} Member`;

    const nextTier = loyaltyTiers[loyaltyTiers.indexOf(tier) + 1];
    if (nextTier) {
        const progress = ((userLoyaltyPoints - tier.minPoints) / (nextTier.minPoints - tier.minPoints)) * 100;
        tierProgress.style.width = Math.min(progress, 100) + '%';
        tierInfo.textContent = `Earn ${nextTier.minPoints - userLoyaltyPoints} more points to reach ${nextTier.name}!`;
    } else {
        tierProgress.style.width = '100%';
        tierInfo.textContent = 'You are at the highest tier! 🎉';
    }
}

function loadRewardsUI() {
    const rewardsContainer = document.getElementById('rewardsContainer');
    rewardsContainer.innerHTML = rewards.map(reward => `
        <div style="background: var(--color-light); padding: 1.5rem; border-radius: 8px; text-align: center; border: 2px solid var(--color-border); transition: all 0.3s;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">${reward.icon}</div>
            <h4 style="color: var(--color-text); margin-bottom: 0.5rem;">${reward.name}</h4>
            <p style="color: var(--color-primary); font-weight: bold; margin-bottom: 1rem;">${reward.pointsCost} points</p>
            <button class="btn-nav btn-primary" style="width: 100%;" onclick="redeemReward(${reward.id})" ${userLoyaltyPoints < reward.pointsCost ? 'disabled' : ''}>
                ${userLoyaltyPoints >= reward.pointsCost ? 'Redeem Now' : 'Not Enough Points'}
            </button>
        </div>
    `).join('');
}

function redeemReward(rewardId) {
    const reward = rewards.find(r => r.id === rewardId);
    if (userLoyaltyPoints >= reward.pointsCost) {
        userLoyaltyPoints -= reward.pointsCost;
        alert(`✅ Reward Redeemed!\n\n${reward.name}\n\nRemaining Points: ${userLoyaltyPoints}`);
        updateRewardsUI();
        loadRewardsUI();
    }
}

function spinWheel() {
    const spinWheel = document.getElementById('spinWheel');
    const spinBtn = document.getElementById('spinBtn');
    const spinStatus = document.getElementById('spinStatus');

    const today = new Date().toDateString();
    if (lastSpinDate === today) {
        alert('You can only spin once per day! Come back tomorrow.');
        return;
    }

    spinBtn.disabled = true;
    spinWheel.classList.add('spinning');

    setTimeout(() => {
        spinWheel.classList.remove('spinning');
        
        const spinRewards = [
            { points: 50, name: '50 Bonus Points! 🎉' },
            { points: 100, name: '100 Bonus Points! 🎊' },
            { points: 25, name: '25 Bonus Points! 🌟' },
            { points: 75, name: '75 Bonus Points! ⭐' },
            { points: 150, name: '150 Bonus Points! 🏆' }
        ];

        const randomReward = spinRewards[Math.floor(Math.random() * spinRewards.length)];
        userLoyaltyPoints += randomReward.points;
        lastSpinDate = today;

        spinStatus.textContent = `${randomReward.name}`;
        alert(`Congratulations! You won ${randomReward.points} points!`);
        updateRewardsUI();
        loadRewardsUI();

        setTimeout(() => {
            spinBtn.disabled = false;
            spinStatus.textContent = 'Ready to spin tomorrow!';
        }, 2000);
    }, 1500);
}

function generateRecommendations() {
    const recommendationsContainer = document.getElementById('recommendationsContainer');

    if (userOrderHistory.length === 0) {
        recommendationsContainer.innerHTML = '<p style="grid-column: 1/-1; color: #999;">Place your first order to get personalized recommendations!</p>';
        return;
    }

    // Get favorite categories
    const categories = {};
    userOrderHistory.forEach(order => {
        order.items.forEach(item => {
            categories[item.category] = (categories[item.category] || 0) + item.quantity;
        });
    });

    const favoriteCategory = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b);

    // Find recommendations
    const recommendations = menuData
        .filter(item => item.category === favoriteCategory)
        .slice(0, 3);

    recommendationsContainer.innerHTML = recommendations.map(item => `
        <div class="recommendation-card">
            <h4>${item.name}</h4>
            <p class="recommendation-reason">🎯 Based on your love for ${favoriteCategory}</p>
            <p style="color: var(--color-primary); font-weight: bold; margin-bottom: 0.5rem;">₹${item.price}</p>
            <button class="btn-nav btn-primary" style="width: 100%; font-size: 0.85rem; padding: 0.5rem;" onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Checkout
function updateCheckoutSummary() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutDiscount = document.getElementById('checkoutDiscount');
    const checkoutTax = document.getElementById('checkoutTax');
    const checkoutTotal = document.getElementById('checkoutTotal');

    let subtotal = 0;
    checkoutItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        return `
            <div class="summary-item">
                <span>${item.quantity}x ${item.name}</span>
                <span>₹${itemTotal}</span>
            </div>
        `;
    }).join('');

    const deliveryFee = 40;
    const discountAmount = getCurrentUserDiscount(subtotal);
    const tax = Math.round((subtotal - discountAmount) * 0.05);
    const total = subtotal - discountAmount + deliveryFee + tax;

    checkoutSubtotal.textContent = '₹' + subtotal;
    checkoutDiscount.textContent = '-₹' + discountAmount;
    checkoutTax.textContent = '₹' + tax;
    checkoutTotal.textContent = '₹' + total;
}

function selectPaymentMethod(method) {
    document.querySelectorAll('.payment-method-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');

    document.querySelectorAll('.payment-form-wrapper').forEach(form => {
        form.classList.remove('active-payment-form');
    });

    const methodMap = {
        'card': 'cardPayment',
        'upi': 'upiPayment',
        'cod': 'codPayment'
    };

    if (methodMap[method]) {
        document.getElementById(methodMap[method]).classList.add('active-payment-form');
    }
}

function placeOrder() {
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const streetAddress = document.getElementById('streetAddress').value;
    const postalCode = document.getElementById('postalCode').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    if (!fullName || !phoneNumber || !streetAddress || !postalCode) {
        alert('Please fill all required fields');
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = getCurrentUserDiscount(subtotal);
    const tax = Math.round((subtotal - discountAmount) * 0.05);
    const total = subtotal - discountAmount + 40 + tax;

    const pointsEarned = Math.floor(subtotal / 100) * 10;
    userLoyaltyPoints += pointsEarned;
    userOrderHistory.push({ items: [...cart] });

    const orderId = 'ORD' + Date.now();
    const order = {
        id: orderId,
        items: [...cart],
        subtotal: subtotal,
        discount: discountAmount,
        tax: tax,
        deliveryFee: 40,
        total: total,
        status: 'confirmed',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        address: streetAddress + ', ' + document.getElementById('city').value + ' - ' + postalCode,
        paymentMethod: paymentMethod,
        customerName: fullName,
        phoneNumber: phoneNumber,
        pointsEarned: pointsEarned
    };

    userOrders.push(order);

    document.getElementById('successOrderId').textContent = orderId;
    document.getElementById('successMessage').textContent = `Order confirmed! 🎉\n\nYou earned ${pointsEarned} loyalty points!\nEstimated delivery: 30-45 minutes.`;
    showSuccessModal();

    cart = [];
    updateCart();
    toggleCart();

    // Clear form
    document.getElementById('fullName').value = '';
    document.getElementById('phoneNumber').value = '';
    document.getElementById('streetAddress').value = '';
    document.getElementById('postalCode').value = '';
}

// Orders Display
function displayOrders(filterStatus = 'All') {
    const ordersContainer = document.getElementById('ordersContainer');

    if (userOrders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="no-orders">
                <h3>No Orders Yet</h3>
                <p>Start ordering delicious food now!</p>
            </div>
        `;
        return;
    }

    const filtered = filterStatus === 'All' ? userOrders : userOrders.filter(o => o.status === filterStatus);

    ordersContainer.innerHTML = filtered.map(order => {
        const statuses = ['confirmed', 'preparing', 'on-the-way', 'delivered'];
        const currentStatusIndex = statuses.indexOf(order.status);

        return `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <div class="order-id">Order #${order.id}</div>
                        <div class="order-date">${order.date} at ${order.time}</div>
                    </div>
                    <div class="order-status-badge status-${order.status}">${order.status.replace('-', ' ').toUpperCase()}</div>
                </div>
                <div class="order-tracking">
                    <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">📍 Delivery to: ${order.customerName}</div>
                    <div class="tracking-bar">
                        ${statuses.map((status, index) => `
                            <div class="tracking-step">
                                <div class="tracking-dot ${index <= currentStatusIndex ? 'active' : ''}">
                                    ${index <= currentStatusIndex ? '✓' : ''}
                                </div>
                                <div class="tracking-label">${status.replace('-', ' ')}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="order-items-list">
                    ${order.items.map(item => `
                        <div class="order-item-line">
                            <span>${item.quantity}x ${item.name}</span>
                            <span>₹${item.price * item.quantity}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total-line">
                    <span>Total: ₹${order.total}</span>
                </div>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border); font-size: 0.9rem; color: var(--color-primary);">
                    💎 You earned ${order.pointsEarned} loyalty points!
                </div>
            </div>
        `;
    }).join('');
}

function filterOrdersByStatus(status) {
    document.querySelectorAll('.status-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    displayOrders(status);
}

// Auth Functions
function showLoginModal() {
    document.getElementById('authModal').classList.add('active');
    isSignupMode = false;
    document.getElementById('authTitle').textContent = 'Login';
    document.getElementById('nameGroup').style.display = 'none';
    document.getElementById('authForm').querySelector('.auth-btn').textContent = 'Login';
}

function toggleAuthMode() {
    isSignupMode = !isSignupMode;
    const title = document.getElementById('authTitle');
    const nameGroup = document.getElementById('nameGroup');
    const btn = document.getElementById('authForm').querySelector('.auth-btn');
    const toggleLink = document.querySelector('.auth-toggle a');

    if (isSignupMode) {
        title.textContent = 'Create Account';
        nameGroup.style.display = 'block';
        btn.textContent = 'Sign Up';
        toggleLink.textContent = 'Already have an account? Login';
    } else {
        title.textContent = 'Login';
        nameGroup.style.display = 'none';
        btn.textContent = 'Login';
        toggleLink.textContent = "Don't have an account? Sign Up";
    }
}

function handleAuth() {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    const name = document.getElementById('authName').value;

    if (!email || !password) {
        alert('Please fill all fields');
        return;
    }

    if (isSignupMode && !name) {
        alert('Please enter your name');
        return;
    }

    currentUser = {
        name: isSignupMode ? name : email.split('@')[0],
        email: email,
        id: Date.now()
    };

    document.getElementById('authModal').classList.remove('active');
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('rewardsBtn').style.display = 'inline-block';
    document.getElementById('myOrdersBtn').style.display = 'inline-block';
    document.getElementById('logoutBtn').style.display = 'inline-block';

    alert(`Welcome, ${currentUser.name}! 🎉`);

    document.getElementById('authForm').reset();
    showHome();
}

function logout() {
    currentUser = null;
    cart = [];
    updateCart();
    document.getElementById('loginBtn').style.display = 'inline-block';
    document.getElementById('rewardsBtn').style.display = 'none';
    document.getElementById('myOrdersBtn').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
    showHome();
    alert('Logged out successfully');
}

function showSuccessModal() {
    document.getElementById('successModal').classList.add('active');
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
    showOrders();
}