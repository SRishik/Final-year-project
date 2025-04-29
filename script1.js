// Image Upload and Analysis
document.querySelector('.upload-box').addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = async () => {
        const file = fileInput.files[0];
        if (file) {
            document.querySelector('.upload-box').innerText = file.name;

            // Simulate sending image to a backend model
            const formData = new FormData();
            formData.append('leaf', file);

            try {
                const response = await fetch('http://localhost:5000/analyze', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                alert('Analysis Result: ' + result.prediction);
            } catch (error) {
                alert('Error analyzing image');
                console.error(error);
            }
        }
    };
    fileInput.click();
});

// Chatbot Interaction
document.querySelector('.send-btn').addEventListener('click', async () => {
    const input = document.querySelector('.input-section input');
    const message = input.value.trim();
    if (!message) return;

    const chatBox = document.querySelector('.chat-box');
    chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    input.value = '';

    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.reply}</p>`;
    } catch (error) {
        chatBox.innerHTML += `<p><strong>Bot:</strong> Sorry, something went wrong.</p>`;
        console.error(error);
    }
});
