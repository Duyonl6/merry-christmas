// DOM Elements
const snowfallLayer = document.querySelector('.snowfallLayer');
const header = document.querySelector('header');
const blazingTitle = header.querySelector('.Blazing');
const backgroundMusic = document.getElementById('backgroundMusic');
const audioControl = document.getElementById('audioControl');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Xử lý audio
    setupAudio();
    
    // Khởi tạo các hiệu ứng bên ngoài trước
    generateSnowflakes();
    createChristmasTree();
    
    // Sau đó mới khởi tạo loading sequence
    initializeLoadingSequence();
});

window.addEventListener('load', generateSnowflakes);

// Loading Sequence Functions
function initializeLoadingSequence() {
    const startScreen = document.querySelector('.start-screen');
    const startButton = document.getElementById('startButton');
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.querySelector('.main-content');
    const loadingVideo = document.getElementById('loadingVideo');
    const progressFill = document.querySelector('.progress-fill');

    // Đảm bảo màn hình start hiển thị ban đầu
    startScreen.style.display = 'flex';
    loadingScreen.style.display = 'none';
    mainContent.style.display = 'none';

    startButton.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Start button clicked');
        
        // Ẩn màn hình start
        startScreen.style.display = 'none';
        
        // Hiện màn hình loading
        loadingScreen.style.display = 'flex';
        loadingScreen.classList.remove('hidden');
        
        // Thiết lập progress bar
        progressFill.style.width = '0%';
        
        // Xử lý video loading
        if (loadingVideo) {
            loadingVideo.play().catch(error => {
                console.log("Video play error:", error);
                setTimeout(finishLoading, 4000);
            });
            
            setTimeout(() => {
                progressFill.style.width = '100%';
            }, 100);
            
            loadingVideo.addEventListener('ended', finishLoading);
        } else {
            setTimeout(finishLoading, 4000);
        }
    });

    function finishLoading() {
        // Ẩn loading screen
        loadingScreen.style.display = 'none';
        
        // Hiện main content
        mainContent.style.display = 'block';
        mainContent.classList.remove('hidden');
        
        // Hiển thị hiệu ứng
        snowfallLayer.classList.remove('snowfallHidden');
        
        // Phát nhạc
        backgroundMusic.play()
            .then(() => {
                audioControl.textContent = '🔊';
                audioControl.classList.remove('muted');
            })
            .catch(error => console.log("Autoplay prevented:", error));
        
        // Xóa các màn hình không cần thiết
        setTimeout(() => {
            startScreen.remove();
            loadingScreen.remove();
        }, 1000);
    }
}

// Đảm bảo hàm được gọi khi trang tải xong
document.addEventListener('DOMContentLoaded', initializeLoadingSequence);

// Utility Functions
function getRandom(max) {
    return Math.round(Math.random() * max);
}

// Visual Effects Functions
function generateSnowflakes() {
    for (let y = -200; y < window.innerHeight; y++) {
        for (let x = 0; x < window.innerWidth; x++) {
            if (getRandom(10000) === 20) {
                const snowflake = document.createElement('div');
                snowflake.classList.add('snowflake');
                snowflake.style.top = y + 'px';
                snowflake.style.left = x + 'px';

                if (x % 3 === 0) {
                    snowflake.style.animation = 'fall 10s 0s infinite linear';
                }
                if (x % 5 === 0) {
                    snowflake.style.animation = 'fall 7s 0s infinite linear';
                }
                if (x % 7 === 0) {
                    snowflake.style.animation = 'fall 20s 0s infinite linear';
                }
                if (x % 9 === 0) {
                    snowflake.style.animation = 'fall 25s 0s infinite linear';
                }

                snowfallLayer.appendChild(snowflake);
            }
        }
    }
}

function createChristmasTree() {
    const treeHeight = 300;
    const baseWidth = 200;
    const layers = 20;
    const depthFactor = 50;

    for (let layer = 0; layer < layers; layer++) {
        const y = treeHeight - (layer / layers) * treeHeight;
        const layerRadius = ((layers - layer) / layers) * (baseWidth / 2);
        const points = Math.ceil(layerRadius * 2.5);

        for (let i = 0; i < points; i++) {
            const angle = (i / points) * Math.PI * 2;
            const x = Math.cos(angle) * layerRadius;
            const z = Math.sin(angle) * layerRadius;

            const randomOffset = Math.random() * 10 - 5;
            const randomDepth = Math.random() * depthFactor - depthFactor/2;

            const light = document.createElement('div');
            light.className = 'lights';
            light.style.transform = `translate3d(${x + randomOffset}px, ${y}px, ${z + randomDepth}px)`;
            light.style.animationDelay = `${Math.random() * 2}s`;

            document.querySelector('.christmas-tree').appendChild(light);
        }
    }
}

// Thêm hàm xử lý audio
function setupAudio() {
    let isPlaying = true;

    // Xử lý click vào nút audio
    audioControl.addEventListener('click', function() {
        if (!isPlaying) {
            backgroundMusic.play();
            audioControl.textContent = '🔊';
            audioControl.classList.remove('muted');
        } else {
            backgroundMusic.pause();
            audioControl.textContent = '🔈';
            audioControl.classList.add('muted');
        }
        isPlaying = !isPlaying;
    });

    // Xử lý khi audio kết thúc
    backgroundMusic.addEventListener('ended', function() {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
    });

    // Đặt volume phù hợp
    backgroundMusic.volume = 0.5;

    // Thêm thuộc tính loop
    backgroundMusic.loop = true;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementsByClassName('open')[0].addEventListener('click', function () {
      document.getElementsByClassName('card-packaging')[0].classList.add('is-open')
    })
  
    document.getElementsByClassName('close')[0].addEventListener('click', function () {
      document.getElementsByClassName('card-packaging')[0].classList.remove('is-open')
    })
  });