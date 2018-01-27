import '../scss/index.scss';

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
}, false);
