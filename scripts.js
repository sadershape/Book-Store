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
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
  }
};

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
// Event listener for search button
document.getElementById('search-btn').addEventListener('click', function() {
  const query = document.getElementById('search-query').value;
  if (query) {
    searchBooks(query);
  } else {
    alert('Please enter a search term');
  }
});
setInterval(updateCurrentTime, 1000);
// Function to fetch books from Google Books API
function searchBooks(query) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`; // No API key needed

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const books = data.items;
      if (books) {
        displayBooks(books);
      } else {
        alert('No books found for the given search term.');
      }
    })
    .catch(error => {
      console.error('Error fetching books:', error);
      alert('An error occurred while fetching books.');
    });
}

// Function to display books
function displayBooks(books) {
  const container = document.getElementById('books-container');
  container.innerHTML = ''; // Clear previous results

  books.forEach(book => {
    const bookInfo = book.volumeInfo;
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const bookImage = bookInfo.imageLinks ? `<img src="${bookInfo.imageLinks.thumbnail}" alt="${bookInfo.title}">` : '<img src="placeholder.jpg" alt="No Image Available">';
    const bookTitle = bookInfo.title || 'No Title Available';
    const bookDescription = bookInfo.description ? `<p>${bookInfo.description.substring(0, 100)}...</p>` : '<p>No description available.</p>';

    bookCard.innerHTML = `
      <div class="book-card-content">
        ${bookImage}
        <div class="book-details">
          <h4>${bookTitle}</h4>
          ${bookDescription}
        </div>
      </div>
    `;
    container.appendChild(bookCard);
  });
}

// Books API Search Function
document.getElementById('search-btn').addEventListener('click', function() {
  const query = document.getElementById('search-query').value;
  searchBooks(query);
});

function searchBooks(query) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const books = data.items;
      displayBooks(books);
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
}

function displayBooks(books) {
  const container = document.getElementById('books-container');
  container.innerHTML = ''; // Clear the current books

  books.forEach(book => {
    const bookInfo = book.volumeInfo;
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const bookImage = bookInfo.imageLinks ? `<img src="${bookInfo.imageLinks.thumbnail}" alt="${bookInfo.title}">` : '';
    const bookTitle = bookInfo.title || 'No Title Available';
    const bookDescription = bookInfo.description ? `<p>${bookInfo.description.substring(0, 100)}...</p>` : '';

    bookCard.innerHTML = `
      ${bookImage}
      <div class="book-details">
        <h4>${bookTitle}</h4>
        ${bookDescription}
      </div>
    `;
    container.appendChild(bookCard);
  });
}

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', function() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html'; // Redirect to home page
});
