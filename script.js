let skipCount = 0;
let selectedGender = null;

// Fetch videos from JSON
async function fetchVideos() {
    const response = await fetch('videos.json');
    const videos = await response.json();
    return videos;
}

// Select gender
function selectGender(gender) {
    selectedGender = gender;
    document.querySelectorAll('.gender-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.gender-card').classList.add('selected');
}

// Start chat
async function startChat() {
    if (!selectedGender) {
        alert("Please select a gender first!");
        return;
    }
    showLoading();
    setTimeout(async () => {
        await startVideoChat();
        hideLoading();
    }, 3000);
}

// Show loading screen
function showLoading() {
    document.getElementById('loadingScreen').style.display = 'flex';
}

// Hide loading screen
function hideLoading() {
    document.getElementById('loadingScreen').style.display = 'none';
}

// Start video chat
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

// Play random video
async function playRandomVideo() {
    if (!selectedGender) return;

    const videos = await fetchVideos();
    const filteredVideos = videos.filter(video => video.gender === selectedGender);

    if (filteredVideos.length === 0) {
        alert("No videos available for the selected gender.");
        return;
    }

    const video = document.getElementById('main-video');
    video.src = filteredVideos[Math.floor(Math.random() * filteredVideos.length)].url;
    video.play();
}

// Skip video
function skipVideo() {
    skipCount++;
    if (skipCount >= 5) {
        document.getElementById('premiumModal').style.display = 'flex';
        return;
    }
    playRandomVideo();
}

// Show payment modal
function showPayment() {
    alert("Redirecting to payment gateway...");
}

// Close premium modal
function closeModal() {
    document.getElementById('premiumModal').style.display = 'none';
}

// Toggle navigation menu
function toggleNav() {
    document.querySelector('.nav-menu').classList.toggle('active');
}
