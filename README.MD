# Application built on Hello.js with Azure ADB2C

This sample shows how to build a web application using Hello.js that performs identity management with Azure AD B2C . It assumes you have some familiarity with Azure AD B2C. If you'd like to learn all that B2C has to offer, start with our documentation at aka.ms/aadb2c.

The app is a simple web application that performs sign-in, sign-up, and sign-out functions with sign-in and signIn-signUp policies and also edit profile using EditProfile Policy. Once the user signed in sample GET/POST requests can be made to task service. It is intended to help get you started with Azure AD B2C in a simple webapplication built on hello.js, giving you the necessary tools to execute Azure AD B2C policies & securely identify users in your application.  

##### Please note that this functionality is still in "preview"

## Release Notes
    - Automatic Refresh of tokens is not supported by Hello.js. But code can be added to track the expiry and do silent renew
    - Silent renew is not supported by Amazon


## How To Run This Sample

Getting started is simple! To run this sample you will need:

- Visual Studio 2015
- An Internet connection
- An Azure subscription (a free trial is sufficient)

### Step 1:  Clone or download this repository

From your shell or command line:

`git clone https://github.com/azure-samples/active-directory-b2c-dotnet-javascript-single-page-app-aspnet-web-api.git` 

### Step 2: Get your own Azure AD B2C tenant

You can also modify the sample to use your own Azure AD B2C tenant.  First, you'll need to create an Azure AD B2C tenant by following [these instructions](https://azure.microsoft.com/documentation/articles/active-directory-b2c-get-started).

### Step 3: Create your own policies

This sample uses three types of policies: a sign-in policy, a sign-up policy & profile editing policy.  Create one policy of each type by following [the instructions here](https://azure.microsoft.com/documentation/articles/active-directory-b2c-reference-policies).  You may choose to include as many or as few identity providers as you wish.

If you already have existing policies in your B2C tenant, feel free to re-use those.  No need to create new ones just for this sample.

### Step 4: Create your own application

Now you need to create your own appliation in your B2C tenant, so that your app has its own client ID.  You can do so following [the generic instructions here](https://azure.microsoft.com/documentation/articles/active-directory-b2c-app-registration).  Be sure to include the following information in your app registration:

- Enable the **Web App/Web API** setting for your application.
- Add **two** rediect_uris for your app.  Their values should take the form 
    - `http://localhost:65328/`
    - `http://localhost:65328/redirect.html`
- Copy the client ID generated for your application, so you can use it in the next step.

### Step 5: Configure the sample to use your B2C tenant

Now you can replace the app's default configuration with your own.  

##### In the B2C-v2jsapp solution

open the index.html file and replace the clientId and policy names

```javascript
        //B2C Global Settings
        var clientId = 'ClientId guid';
        var scope = 'openid ' + clientId;
        // ignore other code here

        var policies = {
            signInPolicy: "B2C_1_sign_in",
            editProfilePolicy: "B2C_1_edit_profile",
            signInSignUpPolicy: "B2C_1_b2c_1_sign_in_sign_up"
        };
```
open the aadb2c.js and replace the clientId and policy names

```javascript

    var tenantName = 'tenantname.onmicrosoft.com';
    var signInPolicyName = 'b2c_1_sign_in';
    var signInSignUpPolicyName = 'B2C_1_b2c_1_sign_in_sign_up';
    var editProfilePolicyName = 'B2C_1_edit_profile';
    var redirect_uri = 'http://localhost:65328/';

```

##### In the TaskService project

replace tenant, ClientId and PolicyNames in the web.config

```xml
    <add key="ida:Tenant" value="tenantname.onmicrosoft.com" />
    <add key="ida:ClientId" value="ClientId guid" />
    <add key="ida:SignUpSignInPolicyId" value="B2C_1_b2c_1_sign_in_sign_up" />
    <add key="ida:SignInPolicyId" value="B2C_1_sign_in" />
    <add key="ida:UserProfilePolicyId" value="B2C_1_edit_profile" />
```


### Step 6:  Run the sample

Clean the solution, rebuild the solution, and run it.  You can now sign up / sign in /edit profile to your application using the accounts you configured in your respective policies. Once the user is signed in with a policy POST a task to the service and GET the tasks already created. Silent Renew the token before expiry t get the refresh token.

