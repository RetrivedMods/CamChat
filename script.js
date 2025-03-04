let skipCount = 0;
const videoSources = ['video1.mp4', 'video2.mp4', 'video3.mp4'];

function selectGender(gender) {
    document.querySelectorAll('.gender-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.gender-card').classList.add('selected');
}

function startChat() {
    showLoading();
    setTimeout(() => {
        startVideoChat();
    }, 3000);
}

function showLoading() {
    alert("Loading... Please wait.");
}

async function startVideoChat() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.querySelector('.camera-preview').srcObject = stream;
        document.querySelector('.video-container').style.display = 'block';
        playRandomVideo();
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
}

function playRandomVideo() {
    const video = document.getElementById('main-video');
    video.src = videoSources[Math.floor(Math.random() * videoSources.length)];
    video.play();
}

function skipVideo() {
    skipCount++;
    if (skipCount >= 5) {
        document.getElementById('premiumModal').style.display = 'block';
        return;
    }
    playRandomVideo();
}

function showPayment() {
    alert("Redirecting to payment gateway...");
}
