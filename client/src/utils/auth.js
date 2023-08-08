import decode from 'jwt-decode';

class AuthService {

  tokenCheckInterval = null; // Store the token check interval instance

  // Decode the JWT token and return the user profile
  getProfile() {
    return decode(this.getToken());
  }

  // Check if the user is logged in by verifying the token is valid and not expired
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token) {
    const decoded = decode(token);

    // If token expiration time (in seconds) is before the current time, remove the token and return true
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }

    // Token is not yet expired
    return false;
  }

  // Retrieve the JWT token from local storage
  getToken() {
    return localStorage.getItem('id_token');
  }

 // Save the JWT token to local storage and redirect the user to the homepage
 login(idToken) {
  localStorage.setItem('id_token', idToken);
  window.location.assign('/');
  this.startTokenExpiryCheck(); // Start checking for token expiration when user logs in
}

 // Remove the JWT token from local storage and redirect the user to the homepage
 logout() {
  localStorage.removeItem('id_token');
  window.location.assign("/");
  this.stopTokenExpiryCheck(); // Stop checking for token expiration when user logs out
}
 // Set up an interval to check token expiration every few minutes
 startTokenExpiryCheck() {
  this.tokenCheckInterval = setInterval(() => {
    if (!this.loggedIn()) {
      alert("Your session has expired. Please log in again.");
      this.logout(); // Automatically log out user if token has expired
    }
  }, 300000); // Check every 5 minutes. Adjust the duration as needed.
}

// Clear the token expiration check interval
stopTokenExpiryCheck() {
  clearInterval(this.tokenCheckInterval);
  this.tokenCheckInterval = null;
}
}

export default new AuthService();
