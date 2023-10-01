// Function to check if the user is logged in using cookies
function checkUserLoggedIn() {
    // Check if a user session or authentication token exists in cookies
    // You may need to use a cookie library for this, such as 'js-cookie'
    var userSessionCookie = Cookies.get('userSession'); // Replace 'userSession' with your cookie name

    // Check if the user session cookie exists and is valid
    if (userSessionCookie) {
        // User is logged in
        return true;
    } else {
        // User is not logged in
        return false;
    }
}

// Add an event listener to the "Post a House" button
document.getElementById('postHouseButton').addEventListener('click', function () {
    // Check if the user is logged in using cookies
    var isLoggedIn = checkUserLoggedIn();

    if (isLoggedIn) {
        // If logged in, redirect to the page for posting a house
        window.location.href = './Public/post-house.html'; // Specify the correct URL for the post-house page
    } else {
        // If not logged in, redirect to the login or signup page
        window.location.href = './Public/loginp.html'; // Specify the correct URL for the login or signup page
    }
});