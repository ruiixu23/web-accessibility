import $ from 'jquery';
import '../scss/empty.scss';

/**
 * Get the value correspondin to the query parameter
 * @param {string} name - The name of the url query parameter
 * @return {string} The value of the query paramter
 */
function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    if (results == null) {
        return '';
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
}

$(document).ready(function() {
    $('#title-placeholder').text(getUrlParameter('title'));
    $('#text-placeholder').removeClass('invisible');
});
