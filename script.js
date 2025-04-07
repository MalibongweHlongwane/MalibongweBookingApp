// Mock API data with more details
const mockProperties = [
    { 
        id: 1, 
        name: "Beach Villa", 
        location: "Miami", 
        price: 150, 
        available: true, 
        image: "https://via.placeholder.com/200x150?text=Beach+Villa", 
        rating: 4.5,
        description: "Luxurious beachfront villa with ocean views",
        amenities: ["WiFi", "Pool", "Beach Access"],
        freeCancel: true,
        minStay: 2,
        maxStay: 14,
        views: 120,
        reviews: [
            { user: "John", rating: 4.7, comment: "Great location!" },
            { user: "Sarah", rating: 4.3, comment: "Very comfortable" }
        ],
        availability: { "2025-04-08": true, "2025-04-09": true }
    },
    { 
        id: 2, 
        name: "City Loft", 
        location: "New York", 
        price: 200, 
        available: true, 
        image: "https://via.placeholder.com/200x150?text=City+Loft", 
        rating: 4.8,
        description: "Modern loft in the heart of NYC",
        amenities: ["WiFi", "Gym", "City View"],
        freeCancel: false,
        minStay: 1,
        maxStay: 30,
        views: 200,
        reviews: [
            { user: "Mike", rating: 4.9, comment: "Perfect stay!" }
        ],
        availability: { "2025-04-08": true, "2025-04-09": false }
    },
    { 
        id: 3, 
        name: "Mountain Cabin", 
        location: "Denver", 
        price: 120, 
        available: true, 
        image: "https://via.placeholder.com/200x150?text=Cabin", 
        rating: 4.3,
        description: "Cozy cabin with mountain views",
        amenities: ["WiFi", "Fireplace", "Hiking"],
        freeCancel: true,
        minStay: 3,
        maxStay: 10,
        views: 80,
        reviews: [
            { user: "Emma", rating: 4.5, comment: "Loved the views!" }
        ],
        availability: { "2025-04-08": true, "2025-04-09": true }
    }
];

// Storage management
class Storage {
    static getUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }

    static saveUser(user) {
        const users = this.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    static getBookings(userId) {
        return JSON.parse(localStorage.getItem(`bookings_${userId}`) || '[]');
    }

    static saveBooking(userId, booking) {
        const bookings = this.getBookings(userId);
        bookings.push(booking);
        localStorage.setItem(`bookings_${userId}`, JSON.stringify(bookings));
    }

    static deleteBooking(userId, id) {
        const bookings = this.getBookings(userId);
        const booking = bookings.find(b => b.id === id);
        if (booking) {
            booking.status = 'Cancelled';
            localStorage.setItem(`bookings_${userId}`, JSON.stringify(bookings));
        }
    }

    static getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    static setCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    static clearCurrentUser() {
        localStorage.removeItem('currentUser');
    }

    static getSavedCards(userId) {
        return JSON.parse(localStorage.getItem(`cards_${userId}`) || '[]');
    }

    static saveCard(userId, card) {
        const cards = this.getSavedCards(userId);
        cards.push(card);
        localStorage.setItem(`cards_${userId}`, JSON.stringify(cards));
    }

    static getMessages(userId) {
        return JSON.parse(localStorage.getItem(`messages_${userId}`) || '[]');
    }

    static saveMessage(userId, message) {
        const messages = this.getMessages(userId);
        messages.push(message);
        localStorage.setItem(`messages_${userId}`, JSON.stringify(messages));
    }
}

// DOM Elements
const authSection = document.getElementById('authSection');
const searchSection = document.getElementById('searchSection');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const toggleAuth = document.getElementById('toggleAuth');
const isPartner = document.getElementById('isPartner');
const searchForm = document.getElementById('searchForm');
const locationInput = document.getElementById('location');
const sortBy = document.getElementById('sortBy');
const maxPrice = document.getElementById('maxPrice');
const freeCancel = document.getElementById('freeCancel');
const results = document.getElementById('results');
const bookingsList = document.getElementById('bookingsList');
const bookingItems = document.getElementById('bookingItems');
const showBookingsBtn = document.getElementById('showBookingsBtn');
const showProfileBtn = document.getElementById('showProfileBtn');
const showPartnerBtn = document.getElementById('showPartnerBtn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const paymentModal = document.getElementById('paymentModal');
const paymentForm = document.getElementById('paymentForm');
const saveCard = document.getElementById('saveCard');
const propertyModal = document.getElementById('propertyModal');
const propertyDetails = document.getElementById('propertyDetails');
const messageModal = document.getElementById('messageModal');
const messageForm = document.getElementById('messageForm');
const profileSection = document.getElementById('profileSection');
const profileInfo = document.getElementById('profileInfo');
const partnerSection = document.getElementById('partnerSection');
const partnerContent = document.getElementById('partnerContent');
const closes = document.querySelectorAll('.close');

let isSignIn = true;

// Authentication
function toggleAuthMode() {
    isSignIn = !isSignIn;
    authTitle.textContent = isSignIn ? 'Sign In' : 'Sign Up';
    toggleAuth.textContent = isSignIn ? 'Need an account? Sign Up' : 'Already have an account? Sign In';
    authForm.querySelector('button').textContent = isSignIn ? 'Sign In' : 'Sign Up';
}

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const partner = isPartner.checked;

    if (isSignIn) {
        const users = Storage.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            Storage.setCurrentUser(user);
            updateUIForLoggedIn();
            alert('Signed in successfully!');
        } else {
            alert('Invalid credentials');
        }
    } else {
        const users = Storage.getUsers();
        if (users.some(u => u.email === email)) {
            alert('Email already exists');
            return;
        }
        const user = { id: Date.now(), email, password, isPartner: partner };
        Storage.saveUser(user);
        Storage.setCurrentUser(user);
        updateUIForLoggedIn();
        alert('Account created successfully!');
    }
});

function updateUIForLoggedIn() {
    const user = Storage.getCurrentUser();
    if (user) {
        authSection.style.display = 'none';
        searchSection.style.display = 'block';
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        showBookingsBtn.style.display = 'inline-block';
        showProfileBtn.style.display = 'inline-block';
        showPartnerBtn.style.display = user.isPartner ? 'inline-block' : 'none';
    } else {
        authSection.style.display = 'block';
        searchSection.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        showBookingsBtn.style.display = 'none';
        showProfileBtn.style.display = 'none';
        showPartnerBtn.style.display = 'none';
        bookingsList.style.display = 'none';
        profileSection.style.display = 'none';
        partnerSection.style.display = 'none';
    }
}

// Real-time search
function performSearch() {
    const user = Storage.getCurrentUser();
    if (!user) {
        alert('Please sign in first');
        return;
    }
    
    const location = locationInput.value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = document.getElementById('guests').value;
    const maxPriceVal = maxPrice.value;
    const freeCancelVal = freeCancel.checked;
    const sortVal = sortBy.value;

    let filtered = mockProperties.filter(p => 
        p.location.toLowerCase().includes(location.toLowerCase()) && 
        p.available &&
        (!maxPriceVal || p.price <= maxPriceVal) &&
        (!freeCancelVal || p.freeCancel) &&
        isAvailable(p, checkIn, checkOut) &&
        isStayDurationValid(p, checkIn, checkOut)
    );

    if (sortVal === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortVal === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    displayResults(filtered, { checkIn, checkOut, guests });
}

function isAvailable(property, checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        if (property.availability[dateStr] === false) return false;
    }
    return true;
}

function isStayDurationValid(property, checkIn, checkOut) {
    const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
    return nights >= property.minStay && nights <= property.maxStay;
}

locationInput.addEventListener('input', debounce(performSearch, 300));
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    performSearch();
});
sortBy.addEventListener('change', performSearch);
maxPrice.addEventListener('input', performSearch);
freeCancel.addEventListener('change', performSearch);

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function displayResults(properties, bookingDetails) {
    results.innerHTML = '';
    properties.forEach(property => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <img src="${property.image}" alt="${property.name}">
            <div class="property-info">
                <h3>${property.name}</h3>
                <p>${property.location}</p>
                <p>$${property.price} / night</p>
                <div class="rating">★ ${property.rating}</div>
                <p>${property.freeCancel ? 'Free cancellation' : 'Non-refundable'}</p>
                <p>Min stay: ${property.minStay} nights</p>
            </div>
            <button class="book-btn" onclick="bookProperty(${property.id}, '${bookingDetails.checkIn}', '${bookingDetails.checkOut}', ${bookingDetails.guests})">Book Now</button>
        `;
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('book-btn')) {
                showPropertyDetails(property, bookingDetails);
            }
        });
        results.appendChild(card);
    });
}

// Property details modal
function showPropertyDetails(property, bookingDetails) {
    propertyModal.style.display = 'block';
    propertyDetails.innerHTML = `
        <img src="${property.image}" alt="${property.name}" style="width: 100%; height: 300px; object-fit: cover;">
        <h2>${property.name}</h2>
        <p>${property.location} | ★ ${property.rating}</p>
        <p>${property.description}</p>
        <h3>Amenities</h3>
        <ul>${property.amenities.map(a => `<li>${a}</li>`).join('')}</ul>
        <h3>Reviews</h3>
        ${property.reviews.map(r => `
            <div class="review">
                <p><strong>${r.user}</strong> ★ ${r.rating}</p>
                <p>${r.comment}</p>
            </div>
        `).join('')}
        <button class="book-btn" onclick="bookProperty(${property.id}, '${bookingDetails.checkIn}', '${bookingDetails.checkOut}', ${bookingDetails.guests})">Book Now</button>
    `;
}

// Booking functionality with email receipt
function bookProperty(id, checkIn, checkOut, guests) {
    const user = Storage.getCurrentUser();
    if (!user) {
        alert('Please sign in first');
        return;
    }
    const property = mockProperties.find(p => p.id === id);
    paymentModal.style.display = 'block';
    
    paymentForm.onsubmit = (e) => {
        e.preventDefault();
        const booking = {
            id: Date.now(),
            property: property.name,
            location: property.location,
            price: property.price,
            checkIn,
            checkOut,
            guests,
            status: 'Confirmed',
            image: property.image,
            rating: property.rating,
            freeCancel: property.freeCancel
        };
        
        Storage.saveBooking(user.id, booking);
        if (saveCard.checked) {
            Storage.saveCard(user.id, { cardNumber: paymentForm.querySelector('input').value });
        }
        
        const total = property.price * (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
        const receipt = `
            Booking Confirmation - Anita's Brand
            Property: ${property.name}
            Location: ${property.location}
            Check-in: ${checkIn}
            Check-out: ${checkOut}
            Guests: ${guests}
            Total: $${total}
            Status: Confirmed
            Cancellation: ${property.freeCancel ? 'Free cancellation' : 'Non-refundable'}
        `;
        console.log(`Email sent to ${user.email}:\n${receipt}`);
        Storage.saveMessage(user.id, { to: user.email, subject: 'Booking Confirmation', body: receipt, date: new Date().toISOString() });
        alert(`Booking confirmed! Receipt sent to ${user.email}`);

        paymentModal.style.display = 'none';
        propertyModal.style.display = 'none';
        displayBookings();
    };
}

function displayBookings() {
    const user = Storage.getCurrentUser();
    if (!user) return;
    const bookings = Storage.getBookings(user.id);
    bookingItems.innerHTML = '';
    bookings.forEach(booking => {
        const div = document.createElement('div');
        div.className = 'property-card';
        div.innerHTML = `
            <img src="${booking.image}" alt="${booking.property}">
            <div class="property-info">
                <h3>${booking.property}</h3>
                <p>${booking.location}</p>
                <p>Check-in: ${booking.checkIn}</p>
                <p>Check-out: ${booking.checkOut}</p>
                <p>Guests: ${booking.guests}</p>
                <p>Total: $${booking.price * (new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24)}</p>
                <p>Status: ${booking.status}</p>
                <div class="rating">★ ${booking.rating}</div>
                <p>${booking.freeCancel ? 'Free cancellation' : 'Non-refundable'}</p>
            </div>
            ${booking.status === 'Confirmed' ? `<button class="book-btn" onclick="deleteBooking(${booking.id})">Cancel Booking</button>` : ''}
            <button class="book-btn" onclick="sendMessage('${booking.property}')">Message Host</button>
        `;
        bookingItems.appendChild(div);
    });
}

function deleteBooking(id) {
    const user = Storage.getCurrentUser();
    if (confirm('Are you sure you want to cancel this booking?')) {
        Storage.deleteBooking(user.id, id);
        displayBookings();
    }
}

// Profile with saved cards
function displayProfile() {
    const user = Storage.getCurrentUser();
    if (!user) return;
    const bookings = Storage.getBookings(user.id);
    const cards = Storage.getSavedCards(user.id);
    profileInfo.innerHTML = `
        <div class="property-card">
            <div class="property-info">
                <h3>${user.email}</h3>
                <p>Member since: ${new Date(user.id).toLocaleDateString()}</p>
                <p>Total bookings: ${bookings.length} (Active: ${bookings.filter(b => b.status === 'Confirmed').length})</p>
                <h4>Saved Payment Methods</h4>
                ${cards.length ? cards.map(c => `<p>Card ending in ${c.cardNumber.slice(-4)}</p>`).join('') : '<p>No saved cards</p>'}
            </div>
        </div>
    `;
}

// Partner Dashboard
function showTab(tab) {
    const user = Storage.getCurrentUser();
    if (!user || !user.isPartner) return;

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tab-btn[onclick="showTab('${tab}')"]`).classList.add('active');

    if (tab === 'listings') {
        partnerContent.innerHTML = `
            <h3>Manage Listings</h3>
            <form id="listingForm">
                <div class="form-group">
                    <input type="text" id="listingName" placeholder="Property Name" required>
                </div>
                <div class="form-group">
                    <input type="text" id="listingLocation" placeholder="Location" required>
                </div>
                <div class="form-group">
                    <input type="number" id="listingPrice" placeholder="Price per night" required>
                </div>
                <div class="form-group">
                    <input type="text" id="listingImage" placeholder="Image URL" required>
                </div>
                <button type="submit" class="search-btn">Add Listing</button>
            </form>
            <div id="listingStats">
                ${mockProperties.map(p => `
                    <div class="property-card">
                        <img src="${p.image}" alt="${p.name}">
                        <div class="property-info">
                            <h3>${p.name}</h3>
                            <p>Views: ${p.views}</p>
                            <p>Bookings: ${Storage.getBookings(user.id).filter(b => b.property === p.name).length}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        document.getElementById('listingForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const newProperty = {
                id: mockProperties.length + 1,
                name: document.getElementById('listingName').value,
                location: document.getElementById('listingLocation').value,
                price: parseInt(document.getElementById('listingPrice').value),
                available: true,
                image: document.getElementById('listingImage').value,
                rating: 0,
                description: "New listing",
                amenities: ["WiFi"],
                freeCancel: true,
                minStay: 1,
                maxStay: 30,
                views: 0,
                reviews: [],
                availability: {}
            };
            mockProperties.push(newProperty);
            showTab('listings');
        });
    } else if (tab === 'calendar') {
        partnerContent.innerHTML = `
            <h3>Calendar & Availability</h3>
            <select id="propertySelect">${mockProperties.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}</select>
            <div class="form-group">
                <input type="date" id="availDate" required>
                <label><input type="checkbox" id="isAvailable"> Available</label>
            </div>
            <div class="form-group">
                <input type="number" id="minStay" placeholder="Min Stay" min="1">
                <input type="number" id="maxStay" placeholder="Max Stay" min="1">
            </div>
            <button class="search-btn" onclick="updateAvailability()">Update</button>
            <button class="search-btn" onclick="syncCalendar()">Sync with Airbnb</button>
        `;
    } else if (tab === 'pricing') {
        partnerContent.innerHTML = `
            <h3>Pricing Tools</h3>
            <select id="propertySelect">${mockProperties.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}</select>
            <div class="form-group">
                <input type="number" id="newPrice" placeholder="New Price" min="0">
                <button class="search-btn" onclick="updatePrice()">Update Price</button>
            </div>
            <div class="form-group">
                <input type="number" id="discount" placeholder="Discount %">
                <button class="search-btn" onclick="addPromotion()">Add Promotion</button>
            </div>
            <p>Dynamic Pricing Suggestion: $${Math.round(mockProperties[0].price * 1.1)}</p>
        `;
    } else if (tab === 'messages') {
        const messages = Storage.getMessages(user.id);
        partnerContent.innerHTML = `
            <h3>Messages</h3>
            <div id="messageList">${messages.map(m => `
                <div class="property-card">
                    <div class="property-info">
                        <p><strong>${m.subject}</strong> - ${new Date(m.date).toLocaleString()}</p>
                        <p>${m.body}</p>
                    </div>
                </div>
            `).join('')}</div>
            <button class="search-btn" onclick="sendAutomatedMessage()">Send Welcome Message</button>
        `;
    } else if (tab === 'analytics') {
        const bookings = Storage.getBookings(user.id);
        const revenue = bookings.reduce((sum, b) => sum + (b.status === 'Confirmed' ? b.price * (new Date(b.checkOut) - new Date(b.checkIn)) / (1000 * 60 * 60 * 24) : 0), 0);
        partnerContent.innerHTML = `
            <h3>Analytics & Reports</h3>
            <table>
                <tr><th>Total Bookings</th><td>${bookings.length}</td></tr>
                <tr><th>Active Bookings</th><td>${bookings.filter(b => b.status === 'Confirmed').length}</td></tr>
                <tr><th>Total Revenue</th><td>$${revenue}</td></tr>
                <tr><th>Avg. Rating</th><td>${mockProperties.reduce((sum, p) => sum + p.rating, 0) / mockProperties.length || 0}</td></tr>
            </table>
        `;
    }
}

function updateAvailability() {
    const propertyId = parseInt(document.getElementById('propertySelect').value);
    const date = document.getElementById('availDate').value;
    const isAvail = document.getElementById('isAvailable').checked;
    const minStay = document.getElementById('minStay').value;
    const maxStay = document.getElementById('maxStay').value;
    const property = mockProperties.find(p => p.id === propertyId);
    property.availability[date] = isAvail;
    if (minStay) property.minStay = parseInt(minStay);
    if (maxStay) property.maxStay = parseInt(maxStay);
    alert('Availability updated');
}

function syncCalendar() {
    alert('Calendar synced with Airbnb (simulated)');
}

function updatePrice() {
    const propertyId = parseInt(document.getElementById('propertySelect').value);
    const newPrice = parseInt(document.getElementById('newPrice').value);
    const property = mockProperties.find(p => p.id === propertyId);
    property.price = newPrice;
    alert('Price updated');
}

function addPromotion() {
    const discount = parseInt(document.getElementById('discount').value);
    alert(`Promotion added: ${discount}% discount (simulated)`);
}

function sendAutomatedMessage() {
    const user = Storage.getCurrentUser();
    const message = {
        to: 'guest@example.com',
        subject: 'Welcome to Anita\'s Brand',
        body: 'Thank you for booking with us! Enjoy your stay.',
        date: new Date().toISOString()
    };
    Storage.saveMessage(user.id, message);
    showTab('messages');
}

// Guest Communication
function sendMessage(propertyName) {
    messageModal.style.display = 'block';
    messageForm.onsubmit = (e) => {
        e.preventDefault();
        const user = Storage.getCurrentUser();
        const message = {
            to: `host_${propertyName}@example.com`,
            subject: `Inquiry about ${propertyName}`,
            body: document.getElementById('messageText').value,
            date: new Date().toISOString()
        };
        Storage.saveMessage(user.id, message);
        messageModal.style.display = 'none';
        alert('Message sent to host');
    };
}

// Event listeners
loginBtn.addEventListener('click', () => {
    authSection.style.display = 'block';
    searchSection.style.display = 'none';
});

logoutBtn.addEventListener('click', () => {
    Storage.clearCurrentUser();
    updateUIForLoggedIn();
});

showBookingsBtn.addEventListener('click', () => {
    bookingsList.style.display = bookingsList.style.display === 'none' ? 'block' : 'none';
    profileSection.style.display = 'none';
    partnerSection.style.display = 'none';
    displayBookings();
});

showProfileBtn.addEventListener('click', () => {
    profileSection.style.display = profileSection.style.display === 'none' ? 'block' : 'none';
    bookingsList.style.display = 'none';
    partnerSection.style.display = 'none';
    displayProfile();
});

showPartnerBtn.addEventListener('click', () => {
    partnerSection.style.display = partnerSection.style.display === 'none' ? 'block' : 'none';
    bookingsList.style.display = 'none';
    profileSection.style.display = 'none';
    showTab('listings');
});

closes.forEach(close => {
    close.addEventListener('click', () => {
        close.parentElement.parentElement.style.display = 'none';
    });
});

toggleAuth.addEventListener('click', toggleAuthMode);

// Initial setup
updateUIForLoggedIn();