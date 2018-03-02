import '../scss/article.scss';

/**
 * Check whether html5 support for video is available or not
 * @return {boolean}
 */
function isHtml5VideoSupported() {
    return !!document.createElement('video').canPlayType;
}

/**
 * Check whether fullscreen is available or not
 * @return {boolean}
 */
function isFullscreenSupported() {
    return !!(document.fullscreenEnabled ||
        document.mozFullScreenEnabled || document.msFullscreenEnabled ||
        document.webkitSupportsFullscreen || document.webkitFullscreenEnabled ||
        document.createElement('video').webkitRequestFullScreen);
}

/**
 * Check whether the player is currently in fullscreen mode
 * @return {boolean}
 */
function isFullscreen() {
    return !!(document.fullScreen ||
        document.webkitIsFullScreen || document.mozFullScreen ||
        document.msFullscreenElement || document.fullscreenElement);
}

/**
 * Enable custom video controls
 */
function setupCustomVideoControls() {
    document.getElementById('video-player').controls = false;
    document.getElementById('video-controls').classList.remove('d-none');
    let videoContainer = document.getElementById('video-container');
    let video = document.getElementById('video-player');
    let play = document.getElementById('video-play');
    let mute = document.getElementById('video-mute');
    let progress = document.getElementById('video-progress');
    let progressBar = document.getElementById('video-progress-bar');
    let fullscreen = document.getElementById('video-fullscreen');

    play.addEventListener('click', function(event) {
        if (video.paused || video.ended) {
            video.play();
            play.innerHTML = 'Pause';
        } else {
            video.pause();
            play.innerHTML = 'Play';
        }
    }, false);

    mute.addEventListener('click', function(event) {
        mute.innerHTML = video.muted ? 'Mute' : 'Unmute';
        video.muted = !video.muted;
    }, false);

    video.addEventListener('click', function(event) {
        play.click();
    });

    video.addEventListener('loadedmetadata', function() {
        progress.setAttribute('max', video.duration);
    });

    video.addEventListener('timeupdate', function() {
        if (!progress.getAttribute('max')) {
            progress.setAttribute('max', video.duration);
        }
        progress.value = video.currentTime;
        progressBar.style.width =
            Math.floor((video.currentTime / video.duration) * 100) + '%';
    });

    progress.addEventListener('click', function(event) {
        video.currentTime = (event.pageX - progress.offsetLeft) /
            progress.offsetWidth * video.duration;
    });

    if (isFullscreenSupported()) {
        fullscreen.addEventListener('click', function(event) {
            if (isFullscreen()) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                videoContainer.setAttribute('data-fullscreen', false);
                fullscreen.innerHTML = 'Fullscreen';
            } else {
                if (videoContainer.requestFullscreen) {
                    videoContainer.requestFullscreen();
                } else if (videoContainer.mozRequestFullScreen) {
                    videoContainer.mozRequestFullScreen();
                } else if (videoContainer.webkitRequestFullScreen) {
                    videoContainer.webkitRequestFullScreen();
                } else if (videoContainer.msRequestFullscreen) {
                    videoContainer.msRequestFullscreen();
                }
                videoContainer.setAttribute('data-fullscreen', true);
                fullscreen.innerHTML = 'Exit fullscreen';
            }
        }, false);

        document.addEventListener('fullscreenchange', function(event) {
            videoContainer.setAttribute('data-fullscreen',
                !!(document.fullScreen || document.fullscreenElement));
        });

        document.addEventListener('webkitfullscreenchange', function() {
            videoContainer.setAttribute('data-fullscreen',
                !!document.webkitIsFullScreen);
        });

        document.addEventListener('mozfullscreenchange', function() {
            videoContainer.setAttribute('data-fullscreen',
                !!document.mozFullScreen);
        });

        document.addEventListener('msfullscreenchange', function() {
            videoContainer.setAttribute('data-fullscreen',
                !!document.msFullscreenElement);
        });
    } else {
        fullscreen.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (isHtml5VideoSupported) {
        setupCustomVideoControls();
    }
}, false);
