import '../scss/common.scss';

/**
 * Increase or decrease the font size
 * @param {object} event - The DOM event
 * @param {boolean} increase - Whether to increase or decrease the font size
 */
function updateFontSize(event, increase) {
    let html = document.getElementById('root');
    let size = parseFloat(html.style['font-size']);
    if (isNaN(size)) {
        size = 1.0;
    }

    if (increase && size < 3.0) {
        size += 0.1;
    } else if (!increase && size > 0.5) {
        size -= 0.1;
    }

    html.style['font-size'] = size + 'rem';
}

document.addEventListener('DOMContentLoaded', function() {
    document
        .getElementById('font-increase-button')
        .addEventListener('click', function(event) {
            updateFontSize(event, true);
        }, false);

    document
        .getElementById('font-decrease-button')
        .addEventListener('click', function(event) {
            updateFontSize(event, false);
        }, false);

    document
        .getElementById('font-increase-button-1')
        .addEventListener('click', function(event) {
            updateFontSize(event, true);
        }, false);

    document
        .getElementById('font-decrease-button-1')
        .addEventListener('click', function(event) {
            updateFontSize(event, false);
        }, false);
}, false);
