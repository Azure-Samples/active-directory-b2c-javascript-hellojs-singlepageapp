//These values need to be updated with the specific tenant and its policies.
var tenantName = "tenantazureb2c.onmicrosoft.com";
var signInPolicyName = "b2c_1_sign_in";
var signInSignUpPolicyName = "B2C_1_b2c_1_sign_in_sign_up";
var editProfilePolicyName = "B2C_1_edit_profile";
var redirect_uri = "http://localhost:65328/";
//No need to modify the below values
var helloJsSignPolicy = "adB2CSignIn";
var helloJsSignInSignUpPolicy = "adB2CSignInSignUp";
var helloJsEditProfilePolicy = "adB2CEditProfile";

/*
 * B2C Sign In Policy Configuration
 */
(function (hello) {
    "use strict";
    hello.init({
        adB2CSignIn: {
            name: "Azure Active Directory B2C",
            oauth: {
                version: 2,
                auth: "https://login.microsoftonline.com/tfp/" + tenantName + "/" + signInPolicyName + "/oauth2/v2.0/authorize",
                grant: "https://login.microsoftonline.com/tfp/" + tenantName + "/" + signInPolicyName + "/oauth2/v2.0/token"
            },
            refresh: true,
            // Authorization scopes
            scope: {
                // you can add as many scopes to the mapping as you want here
                profile: 'user.read',
                offline_access: ''
            },
            scope_delim: ' ',
            login: function (p) {
                if (p.qs.response_type === 'code') {
                    // Let's set this to an offline access to return a refresh_token
                    p.qs.access_type = 'offline_access';
                }
            },
            logout: function (p) {
                //get id_token from auth response
                var id_token = hello(helloJsSignPolicy).getAuthResponse().id_token;
                //clearing local storage session
                hello.utils.store(helloJsSignPolicy, null);

                //redirecting to Azure B2C logout URI
                window.location = "https://login.microsoftonline.com/" + tenantName + "/oauth2/v2.0/logout?p=" + signInPolicyName + "&id_token_hint=" +
                        id_token + "&post_logout_redirect_uri=" + redirect_uri;
            },
            xhr: function (p) {
                if (p.method === 'post' || p.method === 'put') {
                    //toJSON(p);
                    if (typeof (p.data) === 'object') {
                        // Convert the POST into a javascript object
                        try {
                            p.data = JSON.stringify(p.data);
                            p.headers['content-type'] = 'application/json';
                        } catch (e) { }
                    }
                } else if (p.method === 'patch') {
                    hello.utils.extend(p.query, p.data);
                    p.data = null;
                }
                return true;
            },
            // Don't even try submitting via form.
            // This means no POST operations in <=IE9
            form: false
        }
    });

})(hello);

/*
 * B2C Sign-In and Sign-Up Policy Configuration
 */
(function (hello) {
    "use strict";
    hello.init({
        adB2CSignInSignUp: {
            name: 'Azure Active Directory B2C',
            oauth: {
                version: 2,
                auth: "https://login.microsoftonline.com/tfp/" + tenantName + "/" + signInSignUpPolicyName + "/oauth2/v2.0/authorize",
                grant: "https://login.microsoftonline.com/tfp/" + tenantName + "/" + signInSignUpPolicyName + "/oauth2/v2.0/token"
            },
            refresh: true,
            // Authorization scopes
            scope: {
                // you can add as many scopes to the mapping as you want here
                profile: 'user.read',
                offline_access: ''
            },
            scope_delim: ' ',
            login: function (p) {
                if (p.qs.response_type === 'code') {
                    // Let's set this to an offline access to return a refresh_token
                    p.qs.access_type = 'offline_access';
                }
            },
            logout: function () {
                //get id_token from auth response
                var id_token = hello(helloJsSignInSignUpPolicy).getAuthResponse().id_token;
                //clearing local storage session
                hello.utils.store(helloJsSignInSignUpPolicy, null);

                //redirecting to Azure B2C logout URI
                window.location = "https://login.microsoftonline.com/" + tenantName + "/oauth2/v2.0/logout?p=" + signInSignUpPolicyName + "&id_token_hint=" +
                        id_token + "&post_logout_redirect_uri=" + redirect_uri;
            },
            xhr: function (p) {
                if (p.method === 'post' || p.method === 'put') {
                    //toJSON(p);
                    if (typeof (p.data) === 'object') {
                        // Convert the POST into a javascript object
                        try {
                            p.data = JSON.stringify(p.data);
                            p.headers['content-type'] = 'application/json';
                        } catch (e) { }
                    }
                } else if (p.method === 'patch') {
                    hello.utils.extend(p.query, p.data);
                    p.data = null;
                }
                return true;
            },
            // Don't even try submitting via form.
            // This means no POST operations in <=IE9
            form: false
        }
    });
})(hello);

/*
 * B2C Edit Profile Policy Configuration
 */
(function (hello) {
    "use strict";
    hello.init({
        adB2CEditProfile: {
            name: 'Azure Active Directory B2C',
            oauth: {
                version: 2,
                auth: "https://login.microsoftonline.com/tfp/" + tenantName + "/" + editProfilePolicyName + "/oauth2/v2.0/authorize",
                grant: "https://login.microsoftonline.com/tfp/" + tenantName + "/" + editProfilePolicyName + "/oauth2/v2.0/token"
            },
            refresh: true,
            // Authorization scopes
            scope: {
                // you can add as many scopes to the mapping as you want here
                profile: 'user.read',
                offline_access: ''
            },
            scope_delim: ' ',
            login: function (p) {
                if (p.qs.response_type === 'code') {
                    // Let's set this to an offline access to return a refresh_token
                    p.qs.access_type = 'offline_access';
                }
            },
            logout: function (p) {
                //get id_token from auth response
                var id_token = hello(helloJsEditProfilePolicy).getAuthResponse().id_token;
                //clearing local storage session
                hello.utils.store(helloJsEditProfilePolicy, null);

                //redirecting to Azure B2C logout URI
                window.location = "https://login.microsoftonline.com/" + tenantName + "/oauth2/v2.0/logout?p=" + editProfilePolicyName + "&id_token_hint=" +
                        id_token + "&post_logout_redirect_uri=" + redirect_uri;
            },
            xhr: function (p) {
                if (p.method === 'post' || p.method === 'put') {
                    //toJSON(p);
                    if (typeof (p.data) === 'object') {
                        // Convert the POST into a javascript object
                        try {
                            p.data = JSON.stringify(p.data);
                            p.headers['content-type'] = 'application/json';
                        } catch (e) { }
                    }
                } else if (p.method === 'patch') {
                    hello.utils.extend(p.query, p.data);
                    p.data = null;
                }
                return true;
            },
            // Don't even try submitting via form.
            // This means no POST operations in <=IE9
            form: false
        }
    });
})(hello);