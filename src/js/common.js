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

/**
 * Open the current clicked menu and close the other menus
 * @param {object} event - The DOM event
 */
function openMenu(event) {
    event.stopPropagation();
    event.preventDefault();

    let currentDropDownButton = event.target;
    let currentDropDownMenu =
        currentDropDownButton.parentNode.querySelector('.dropdown-menu');
    let isOpen = currentDropDownMenu.classList.contains('show');
    let dropdownButtons =
        document.querySelectorAll('#nav-bar-content .dropdown .dropdown-toggle');
    let dropDownMenus =
        document.querySelectorAll('#nav-bar-content .dropdown .dropdown-menu');
    for (let j = 0; j < dropDownMenus.length; j++) {
        dropDownMenus[j].classList.remove('show');
        dropdownButtons[j].setAttribute('aria-expanded', false);
    }

    if (!isOpen) {
        currentDropDownMenu.classList.add('show');
        currentDropDownButton.setAttribute('aria-expanded', true);
    }
}

/**
 * Close the current menu when ESC key is pressed
 * @param {object} event - The DOM event
 */
function closeMenu(event) {
    if (event.keyCode !== 27) {
        return;
    }

    event.stopPropagation();
    event.preventDefault();

    let currentDropDownButton = event.target;
    let currentDropDownMenu =
        currentDropDownButton.parentNode.querySelector('.dropdown-menu');

    currentDropDownButton.setAttribute('aria-expanded', false);
    currentDropDownMenu.classList.remove('show');
}

/**
 * Toggle the navigation content
 * @param {object} event - The DOM event
 */
function toggleNavigation(event) {
    event.stopPropagation();
    event.preventDefault();

    let content = document.getElementById('nav-bar-content');
    if (content.classList.contains('collapse')) {
        content.classList.remove('collapse');
        document.querySelector('.navbar-toggler')
            .setAttribute('aria-expanded', true);
    } else {
        content.classList.add('collapse');
        document.querySelector('.navbar-toggler')
            .setAttribute('aria-expanded', false);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let dropDownToggles =
        document.querySelectorAll('#nav-bar-content .dropdown-toggle');

        for (let i = 0; i < dropDownToggles.length; i++) {
        dropDownToggles[i].addEventListener('click', openMenu, false);
        dropDownToggles[i].addEventListener('keyup', closeMenu, false);
    }

    document.querySelector('.navbar-toggler')
        .addEventListener('click', toggleNavigation, false);

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
