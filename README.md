# Project Title

## Key Features

### User Authentication:
- Simple login and logout functionality that maintains user sessions across page reloads using local storage.

### Book Rating System:
- Users can rate books on a scale of 1 to 5 stars. The stars glow gold based on the rating given by the user, which is saved in local storage.
- Ratings are associated with user accounts, so each user's rating preferences are remembered even after they log out and log back in.

### Light/Dark Mode:
- Users can toggle between light and dark themes. The selected theme is saved in local storage, allowing the application to remember the user's preference across sessions.

### Dynamic Current Date and Time:
- The application displays the current date and time, enhancing the user experience and making the interface more engaging.

### Responsive Design:
- The application is designed to be fully responsive, ensuring a polished look and feel on all devices, including desktops, tablets, and mobile phones.

## How User Preferences Are Managed

### Local Storage:
- User information (such as username), theme preferences (light/dark mode), and book ratings are stored in local storage. This allows the application to maintain the user’s state and preferences even after refreshing the page or closing the browser.

### Rating Persistence:
- When a user rates a book, the rating is saved under their account in local storage. When the user returns to the application, their previously given ratings are displayed, allowing for a personalized experience.

## Technologies Used
- HTML
- CSS
- JavaScript
- Bootstrap for responsive design
- Local Storage for data persistence
