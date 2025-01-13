const resultDiv = document.getElementById("result");

// Setting up Speech Recognition
let recognition;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        resultDiv.innerHTML = "<p>Listening...</p>";
    };

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        resultDiv.innerHTML = `<p>${transcript}</p>`;
    };

    recognition.onerror = (event) => {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${event.error}</p>`;
    };

    recognition.onend = () => {
        resultDiv.innerHTML += "<p style='color: gray;'>Stopped listening.</p>";
    };
} else {
    resultDiv.innerHTML = "<p style='color: red;'>Speech Recognition not supported in this browser.</p>";
}

// Start converting speech to text
function startconverting() {
    if (recognition) recognition.start();
}

// Stop converting speech to text
function stopconverting() {
    if (recognition) recognition.stop();
}
