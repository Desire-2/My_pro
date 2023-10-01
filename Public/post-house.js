async function submitHouse() {
    const houseTitle = document.getElementById('houseTitle').value;
    const houseDescription = document.getElementById('houseDescription').value;

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    const imageInput = document.getElementById('houseImages');
    for (const file of imageInput.files) {
        formData.append('houseImages', file);
    }

    // Append location details to the FormData object
    formData.append('province', document.getElementById('province').value);
    formData.append('district', document.getElementById('district').value);
    formData.append('sector', document.getElementById('sector').value);
    formData.append('cell', document.getElementById('cell').value);
    formData.append('village', document.getElementById('village').value);

    // Append other house data
    formData.append('title', houseTitle);
    formData.append('description', houseDescription);

    try {
        const response = await fetch('/post-house', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // House posting successful, handle the response (e.g., display a success message)
            alert('House posted successfully');
            // You can redirect to another page or perform other actions here
        } else {
            const data = await response.json();
            // Handle any errors or display an error message
            alert(data.message);
        }
    } catch (error) {
        // Handle network errors
        console.error('Network error:', error);
    }
}
