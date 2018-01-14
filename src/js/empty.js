import $ from 'jquery';
import '../scss/empty.scss';

/**
 * Get the value correspondin to the query parameter
 * @param {string} name - The name of the url query parameter
 * @return {string} The value of the query paramter
 */
function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

$(document).ready(function() {
    $('#title-placeholder').text(getUrlParameter('title'));
    $('#text-placeholder').text('This page is currently under construction...');
});
