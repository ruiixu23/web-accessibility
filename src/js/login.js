import '../scss/login.scss';

/**
 * Set the form control element to valid
 * @param {object} element - The DOM element
 */
function setValid(element) {
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
    element.parentElement.children[2].innerHTML = '';
}

/**
 * Set the form control element to invalid with the error message
 * @param {object} element - The DOM element
 * @param {object} message - The error message
 */
function setInvalid(element, message) {
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
    element.parentElement.children[2].innerHTML = message;
}

/**
 * Remove validation information from the element
 * @param {object} element - The DOM element
 */
function removeValidation(element) {
    element.classList.remove('is-valid');
    element.classList.remove('is-invalid');
    element.parentElement.children[2].innerHTML = '';
}

/**
 * Validate the login form and try to log the user in
 * @param {object} event - The DOM event
 */
function login(event) {
    event.preventDefault();
    event.stopPropagation();

    let email = document.getElementById('login-email-control');
    if (email.validity.valid) {
        setValid(email);
    } else if (email.validity.valueMissing) {
        setInvalid(email, 'The email cannot be empty.');
    } else {
        setInvalid(email, 'The email is invalid.');
    }

    let password = document.getElementById('login-password-control');
    if (password.value.trim().length == 0) {
        setInvalid(password, 'The password cannot be empty.');
    } else {
        setValid(password);
    }
}

/**
 * Validate the login form and try to retrieve the password
 * @param {object} event - The DOM event
 */
function forgot(event) {
    event.preventDefault();
    event.stopPropagation();

    let email = document.getElementById('login-email-control');
    if (email.validity.valid) {
        setValid(email);
    } else if (email.validity.valueMissing) {
        setInvalid(email, 'The email cannot be empty.');
    } else {
        setInvalid(email, 'The email is invalid.');
    }

    let password = document.getElementById('login-password-control');
    removeValidation(password);
}

document.addEventListener('DOMContentLoaded', function() {
    document
        .getElementById('login-login-button')
        .addEventListener('click', login, false);
    document
        .getElementById('login-forgot-button')
        .addEventListener('click', forgot, false);
}, false);

