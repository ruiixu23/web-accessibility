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
 * Apped error to the list
 * @param {object} list - The list DOM element to append to
 * @param {object} control - The form control DOM element
 * @param {string} message - The associated error message
 */
function appendErrorToList(list, control, message) {
    let li = document.createElement('li');

    let a = document.createElement('a');
    a.innerHTML = message;
    a.href = '#' + control.id;
    a.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        control.focus();
    }, false);
    li.appendChild(a);
    list.appendChild(li);
}

/**
 * Remove all list items from the list
 * @param {object} list - The list DOM element to clear
 */
function clearErrorList(list) {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

/**
 * Validate the login form and try to log the user in
 * @param {object} event - The DOM event
 */
function login(event) {
    event.preventDefault();
    event.stopPropagation();

    let hasError = false;
    let error = document.getElementById('login-error');
    let errorList = document.getElementById('login-error-list');
    clearErrorList(errorList);

    let email = document.getElementById('login-email-control');
    if (email.validity.valid) {
        setValid(email);
    } else if (email.validity.valueMissing) {
        let message = 'Email cannot be empty.';
        setInvalid(email, message);
        hasError = true;
        appendErrorToList(errorList, email, message);
    } else {
        let message = 'Email is not valid.';
        setInvalid(email, message);
        hasError = true;
        appendErrorToList(errorList, email, message);
    }

    let password = document.getElementById('login-password-control');
    if (password.value.trim().length == 0) {
        let message = 'Password cannot be empty.';
        setInvalid(password, message);
        hasError = true;
        appendErrorToList(errorList, password, message);
    } else {
        setValid(password);
    }

    if (hasError) {
        error.classList.remove('d-none');
        document.querySelector('#login-error-list li a').focus();
    } else {
        error.classList.add('d-none');
    }
}

/**
 * Validate the login form and try to retrieve the password
 * @param {object} event - The DOM event
 */
function forgot(event) {
    event.preventDefault();
    event.stopPropagation();

    let hasError = false;
    let error = document.getElementById('login-error');
    let errorList = document.getElementById('login-error-list');
    clearErrorList(errorList);

    let email = document.getElementById('login-email-control');
    if (email.validity.valid) {
        setValid(email);
    } else if (email.validity.valueMissing) {
        let message = 'Email cannot be empty.';
        setInvalid(email, message);
        hasError = true;
        appendErrorToList(errorList, email, message);
    } else {
        let message = 'Email is not valid.';
        setInvalid(email, message);
        hasError = true;
        appendErrorToList(errorList, email, message);
    }

    let password = document.getElementById('login-password-control');
    removeValidation(password);

    if (hasError) {
        error.classList.remove('d-none');
        document.querySelector('#login-error-list li a').focus();
    } else {
        error.classList.add('d-none');
    }
}

/**
 * Validate the login form and try to register the new user
 * @param {object} event - The DOM event
 */
function register(event) {
    event.preventDefault();
    event.stopPropagation();

    let hasError = false;
    let error = document.getElementById('register-error');
    let errorList = document.getElementById('register-error-list');
    clearErrorList(errorList);

    let firstName = document.getElementById('register-first-name-control');
    if (firstName.value.trim().length == 0) {
        let message = 'First name cannot be empty.';
        setInvalid(firstName, message);
        hasError = true;
        appendErrorToList(errorList, firstName, message);
    } else if (firstName.validity.valid) {
        setValid(firstName);
    }

    let lastName = document.getElementById('register-last-name-control');
    if (lastName.value.trim().length == 0) {
        let message = 'Last name cannot be empty.';
        setInvalid(lastName, message);
        hasError = true;
        appendErrorToList(errorList, lastName, message);
    } else if (lastName.validity.valid) {
        setValid(lastName);
    }

    let email = document.getElementById('register-email-control');
    if (email.validity.valid) {
        setValid(email);
    } else if (email.validity.valueMissing) {
        let message = 'Email cannot be empty.';
        setInvalid(email, message);
        hasError = true;
        appendErrorToList(errorList, email, message);
    } else {
        let message = 'Email is not valid.';
        setInvalid(email, message);
        hasError = true;
        appendErrorToList(errorList, email, message);
    }

    let password = document.getElementById('register-password-control');
    let passwordValue = password.value.trim();
    if (passwordValue.length < 8) {
        let message = 'Password is too short.';
        setInvalid(password, message);
        hasError = true;
        appendErrorToList(errorList, password, message);
    } else if (passwordValue.length > 16) {
        let message = 'Password is too long.';
        setInvalid(password, message);
        hasError = true;
        appendErrorToList(errorList, password, message);
    } else if (passwordValue.match(/[a-zA-Z]+/) == null) {
        let message = 'Password must contain at least one letter.';
        setInvalid(password, message);
        hasError = true;
        appendErrorToList(errorList, password, message);
    } else if (passwordValue.match(/[0-9]+/) == null) {
        let message = 'Password must contain at least one number.';
        setInvalid(password, message);
        hasError = true;
        appendErrorToList(errorList, password, message);
    } else {
        setValid(password);
    }

    let programme = document.getElementById('register-programme-control');
    if (programme.validity.valueMissing) {
        let message = 'Programme cannot be empty.';
        setInvalid(programme, message);
        hasError = true;
        appendErrorToList(errorList, programme, message);
    } else if (!programme.validity.valid) {
        let message = 'Programme is not valid.';
        setInvalid(programme, message);
        hasError = true;
        appendErrorToList(errorList, programme, message);
    } else {
        setValid(programme);
    }

    if (hasError) {
        error.classList.remove('d-none');
        document.querySelector('#register-error-list li a').focus();
    } else {
        error.classList.add('d-none');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document
        .getElementById('login-login-button')
        .addEventListener('click', login, false);

    document
        .getElementById('login-forgot-button')
        .addEventListener('click', forgot, false);

    document
        .getElementById('register-register-button')
        .addEventListener('click', register, false);
}, false);
