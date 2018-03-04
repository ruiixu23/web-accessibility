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
    let progress = document.getElementById('video-progress');
    let progressBar = document.getElementById('video-progress-bar');
    let skipAhead = document.getElementById('video-skip-ahead');
    let goBack = document.getElementById('video-go-back');
    let volume = document.getElementById('video-volume');
    let mute = document.getElementById('video-mute');
    let caption = document.getElementById('video-caption');
    let fullscreen = document.getElementById('video-fullscreen');

    skipAhead.addEventListener('click', function(event) {
        if (video.currentTime + 30 < video.duration) {
            video.currentTime += 30;
        } else {
            video.currentTime = video.duration;
        }
    }, false);

    play.addEventListener('click', function(event) {
        if (video.paused || video.ended) {
            video.play();
            play.innerHTML = 'Pause';
        } else {
            video.pause();
            play.innerHTML = 'Play';
        }
        play.setAttribute('aria-label', play.innerHTML);
    }, false);

    goBack.addEventListener('click', function(event) {
        if (video.currentTime - 10 > 0) {
            video.currentTime -= 10;
        } else {
            video.currentTime = 0;
        }
    }, false);

    video.addEventListener('click', function(event) {
        play.click();
    });

    video.addEventListener('loadedmetadata', function() {
        progressBar.setAttribute('aria-valuemax', video.duration);
    });

    video.addEventListener('timeupdate', function() {
        progressBar.setAttribute('aria-valuemax', video.duration);
        progressBar.setAttribute('aria-valuenow', video.currentTime);
        progressBar.style.width =
            Math.floor((video.currentTime / video.duration) * 100) + '%';
    });

    progress.addEventListener('click', function(event) {
        video.currentTime = (event.pageX - progress.offsetLeft) /
            progress.offsetWidth * video.duration;
    });

    volume.addEventListener('change', function(event) {
        video.volume = volume.value / 10.0;
    }, false);

    mute.addEventListener('click', function(event) {
        video.muted = !video.muted;
        mute.innerHTML = video.muted ? 'Unmute' : 'Mute';
        mute.setAttribute('aria-label', mute.innerHTML);
    });

    video.textTracks[0].mode = 'hidden';

    caption.addEventListener('click', function(event) {
        if (video.textTracks[0].mode === 'hidden') {
            video.textTracks[0].mode = 'showing';
            caption.innerHTML = 'CC Off';
            caption.setAttribute('aria-label', 'Caption off');
        } else {
            video.textTracks[0].mode = 'hidden';
            caption.innerHTML = 'CC On';
            caption.setAttribute('aria-label', 'Caption on');
        }
    }, false);

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
            fullscreen.setAttribute('aria-label', fullscreen.innerHTML);
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
