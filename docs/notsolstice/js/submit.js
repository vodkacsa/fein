document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const authCode = document.getElementById('auth_code').value.trim();

    fetch('https://k5d7slvr5f.execute-api.eu-central-1.amazonaws.com/Auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: authCode
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 401) {
            throw new Error('Invalid auth code.');
        } else if (response.status === 429) {
            throw new Error('Too many attempts. Please try again later.');
        } else {
            throw new Error('An unexpected error occurred.');
        }
    })
    .then(data => {
        if (data.success) {
            alert('Authentication successful.');
            // Optional: Redirect to another page
            // window.location.href = 'dashboard.html';
        } else {
            alert('Invalid auth code.');
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
        alert(error.message);
    });
});