//These values need to be updated with the specific tenant and its policies.
var tenantName = "fabrikamb2c.onmicrosoft.com";
var signInSignUpPolicyName = "b2c_1_susi";
var editProfilePolicyName = "b2c_1_edit_profile";
var redirect_uri = "http://localhost:65328/";


//No need to modify the below values
var helloJsSignInSignUpPolicy = "adB2CSignInSignUp";
var helloJsEditProfilePolicy = "adB2CEditProfile";

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
            scope_delim: ' ',
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
                var token = p.query.access_token;
                delete p.query.access_token;
                if (token) {
                    p.headers = {
                        "Authorization": "Bearer " + token,
                    };
                }

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
            refresh: false,
            scope_delim: ' ',
            logout: function (p) {
                //get id_token from auth response
                var id_token = hello(helloJsEditProfilePolicy).getAuthResponse().id_token;
                //clearing local storage session
                hello.utils.store(helloJsEditProfilePolicy, null);
            }
        }
    });
})(hello);