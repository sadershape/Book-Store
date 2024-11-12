

// Toggle Dark and Light Theme
document.getElementById('theme-toggle-btn').addEventListener('click', function() {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Check Theme on Page Load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}

// Modal (Login / Sign-Up)
const modal = document.getElementById('modal');
const closeBtn = document.getElementsByClassName('close-btn')[0];
const loginButton = document.getElementById('login-btn');
const signupButton = document.getElementById('signup-btn');
const logoutButton = document.createElement('button');
logoutButton.textContent = 'Logout';
logoutButton.id = 'logout-btn';

const userProfile = document.getElementById('user-profile');
const authForm = document.getElementById('auth-form');
const formTitle = document.getElementById('form-title');
const errorMessage = document.getElementById('error-message');
const userNameSpan = document.getElementById('user-name');
const welcomeMessage = document.getElementById('welcome-message');
const welcomeUsernameSpan = document.getElementById('welcome-username');

let users = JSON.parse(localStorage.getItem('users')) || [];

// Function to Open Modal
function openModal(type) {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Disable scrolling when modal is open
  errorMessage.textContent = '';

  if (type === 'signup') {
    formTitle.textContent = 'Sign Up';
    document.getElementById('signup-fields').style.display = 'block';
    document.getElementById('login-fields').style.display = 'none';
    authForm.onsubmit = handleSignUp;
  } else {
    formTitle.textContent = 'Login';
    document.getElementById('signup-fields').style.display = 'none';
    document.getElementById('login-fields').style.display = 'block';
    authForm.onsubmit = handleLogin;
  }
}

// Close Modal Logic
closeBtn.onclick = function() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Enable scrolling
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
  }
}

// Handle Sign Up
function handleSignUp(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  // Basic validation
  if (!username || !password || !email || !phone) {
    errorMessage.textContent = 'All fields are required!';
    return;
  }

  users.push({ username, password, email, phone });
  localStorage.setItem('users', JSON.stringify(users));

  alert('Sign up successful! You can now log in.');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Enable scrolling
}

// Handle Login
function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    errorMessage.textContent = 'Invalid username or password!';
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify(user));

  // Show Welcome Message and Redirect
  welcomeUsernameSpan.textContent = username;
  welcomeMessage.style.display = 'block';
  setTimeout(() => {
    window.location.href = 'profile.html'; // Redirect to profile page after 2 seconds
  }, 2000);
}

// Update Navbar Buttons
function updateNavbarButtons() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navbarRight = document.getElementById('nav-right'); // Assuming nav-right is where buttons are

  if (currentUser) {
    loginButton.style.display = 'none';
    signupButton.style.display = 'none';
    navbarRight.appendChild(logoutButton);
    logoutButton.style.display = 'inline-block';
  } else {
    loginButton.style.display = 'inline-block';
    signupButton.style.display = 'inline-block';
    logoutButton.style.display = 'none';
  }
}

logoutButton.addEventListener('click', function() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html'; // Redirect to home page
});

// Show/Hide Buttons on Page Load
if (localStorage.getItem('currentUser')) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  updateNavbarButtons();
}

// Add Event Listeners to Login/Signup Buttons
loginButton.addEventListener('click', function() {
  openModal('login');
});

signupButton.addEventListener('click', function() {
  openModal('signup');
});

// Profile Page (profile.html) - Handle Profile Actions
if (window.location.pathname.includes('profile.html')) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    // Display the profile information on the page
    document.getElementById('profile-username').textContent = currentUser.username;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-phone').textContent = currentUser.phone;

    // Set up redirect buttons
    document.getElementById('view-books-btn').addEventListener('click', function() {
      window.location.href = 'bookstore.html'; // Redirect to Bookstore page
    });

    document.getElementById('edit-profile-btn').addEventListener('click', function() {
      window.location.href = 'editProfile.html'; // Redirect to Edit Profile page
    });

    document.getElementById('logout-btn').addEventListener('click', function() {
      localStorage.removeItem('currentUser');
      window.location.href = 'index.html'; // Redirect to home page after logout
    });

  } else {
    window.location.href = 'index.html'; // Redirect to home page if not logged in
  }
}



