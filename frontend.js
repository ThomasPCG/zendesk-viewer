var app = null;
const protocol = 'https://';

//Endpoints
const list_organisation_endpoint = '/api/v2/organizations.json';

const getAuthToken = function () {
    return btoa(`${app.auth.email}:${app.auth.password}`);
};

const postLogin = function (data) {
    app.organisations = data.organisations;
    app.isLogin = true;
    $.notify('Login successful!');
};

const catchFailedLogin = function () {
    $.notify('Failed to login');
    app.isLogin = false;
};

const login = function () {
    endpoint = protocol + app.auth.domain + list_organisation_endpoint;
    $.ajax(endpoint, {
        headers: {
            'Authorization': `Basic ${getAuthToken()}`
        }
    }).done(postLogin).fail(catchFailedLogin);
};

const initialize = function () {
    app = new Vue({
        el: '#vuebox',
        data: {
            isLogin: false,
            auth: {
                domain: '',
                email: '',
                password: ''
            },
            organisations: []
        },
        methods: {
            login: function () {
                login();
            }
        }
    });
};

$(document).ready(function () {
    initialize();
});