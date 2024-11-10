// DOM Elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const usernameInput = document.getElementById('username');
const usernameDisplay = document.getElementById('username-display');
const themeToggle = document.getElementById('theme-toggle');
const currentTimeDisplay = document.getElementById('current-time') || null; // Null if not on page with current-time
const starElements = document.querySelectorAll('.star');

// Function to load user preferences (theme, username, ratings)
function loadUserPreferences() {
    const username = localStorage.getItem('username');
    const theme = localStorage.getItem('theme');
    
    // Load theme preference
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = 'Light Mode';
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.textContent = 'Dark Mode';
    }

    // Load username if exists
  if (username) {
        navbarUsername.textContent = `Welcome, ${username}`;
        loginBtn.style.display = 'none'; // Hide login button when logged in
        logoutBtn.style.display = 'block'; // Show logout button
        loadUserRatings(username); // Load ratings for this user
    }
}

// Load preferences on page load
window.onload = function () {
    loadUserPreferences();

    // Set the current time (if currentTimeDisplay exists on the page)
    if (currentTimeDisplay) {
        const time = new Date().toLocaleTimeString();
        currentTimeDisplay.textContent = time;

        // Update current time every second
        setInterval(() => {
            currentTimeDisplay.textContent = new Date().toLocaleTimeString();
        }, 1000);
    }
};

// Login Functionality
loginBtn.addEventListener('click', () => {
    const username = prompt("Please enter your username:");
    if (username) {
        localStorage.setItem('username', username);
        navbarUsername.textContent = `Welcome, ${username}`;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        loadUserRatings(username); // Load ratings for this user
    }
});

// Logout Functionality
logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('username');
    usernameDisplay.textContent = '';
    usernameInput.style.display = 'inline-block';
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    clearUserRatings(); // Clear ratings when logging out
});

// Theme Toggle Functionality
themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
});

// Star Rating Functionality (Event Delegation)
document.querySelector('.row')?.addEventListener('click', (event) => {
    if (event.target.classList.contains('star')) {
        const selectedRating = event.target.getAttribute('data-value');
        const bookCard = event.target.closest('.card');
        const bookTitle = bookCard.querySelector('.card-title').textContent;
        const username = localStorage.getItem('username');

        if (username) {
            saveRating(username, bookTitle, selectedRating);
            updateStarRating(bookCard, selectedRating);
        } else {
            alert('Please log in to rate books.');
        }
    }
});

// Function to save rating in localStorage
function saveRating(username, bookTitle, rating) {
    const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
    if (!ratings[username]) {
        ratings[username] = {};
    }
    ratings[username][bookTitle] = rating;
    localStorage.setItem('ratings', JSON.stringify(ratings));
}

// Function to load user ratings
function loadRatings() {
    const username = localStorage.getItem('username');
    const ratings = JSON.parse(localStorage.getItem('ratings')) || {};

    if (ratings[username]) {
        for (const [bookTitle, rating] of Object.entries(ratings[username])) {
            const bookCard = Array.from(document.querySelectorAll('.card')).find(card => {
                return card.querySelector('.card-title').textContent === bookTitle;
            });
            if (bookCard) {
                updateStarRating(bookCard, rating);
            }
        }
    }
}

// Function to update the star rating display
function updateStarRating(bookCard, rating) {
    const stars = bookCard.querySelectorAll('.star');
    stars.forEach(star => {
        star.classList.remove('selected'); // Clear previous ratings
        if (parseInt(star.getAttribute('data-value')) <= rating) {
            star.classList.add('selected'); // Highlight stars equal to or less than the rating
        }
    });
}

// Clear user ratings when logged out
function clearUserRatings() {
    const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
    const username = localStorage.getItem('username');
    if (ratings[username]) {
        delete ratings[username];
        localStorage.setItem('ratings', JSON.stringify(ratings));
    }
}

// Load ratings once the DOM is ready
document.addEventListener('DOMContentLoaded', loadRatings);


