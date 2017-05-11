---
services: active-directory-b2c
platforms: javascript
author: gsacavdm
---

# Single-Page Application built on Hello.js with Azure AD B2C

> [!NOTE]
> Silent renewing of access tokens is not supported by all social identiy providers.

This sample shows how to build a web application using Hello.js that performs identity management with Azure AD B2C . It assumes you have some familiarity with Azure AD B2C. If you'd like to learn all that B2C has to offer, start with our documentation at aka.ms/aadb2c.

The app is a simple web application that performs sign-in, sign-up, and sign-out functions with signIn-signUp policies and also edit profile using EditProfile Policy. Once the user signed in sample GET request is made to an API. It is intended to help get you started with Azure AD B2C in a simple web application built on hello.js, giving you the necessary tools to execute Azure AD B2C policies & securely identify users in your application.  

##### Please note that this functionality is still in "preview"

## Hello.JS 

Hello.js is a client-side JavaScript SDK for authenticating with OAuth2 web services and querying their REST APIs. For more details about hello.js, check out their [documentation](https://adodson.com/hello.js/#hellojs).

Microsoft has tested the [hello.js](https://github.com/MrSwitch/hello.js) library in basic scenarios and confirmed that they work with Azure AD B2C (with documented fixes). Microsoft does not provide fixes for this library and has not done a review of the library. Issues and feature requests should be directed to the library’s open-source project.

This application has been built with hello.js library version 1.14.1.


## How To Run This Sample

Getting started is simple! To run this sample you will need:

- Visual Studio 2015
- An Internet connection
- An Azure subscription (a free trial is sufficient)

If you don't have an Azure AD B2C tenant, you can follow [those instructions](https://azure.microsoft.com/documentation/articles/active-directory-b2c-get-started/) to create one. 
If you just want to see the sample in action, you don't need to create your own tenant as the project comes with some settings associated to a test tenant and application; however it is highly recommend that you register your own app and experience going through the configuration steps below.   

### Step 1:  Clone or download this repository

From your shell or command line:

`git clone https://github.com/azure-samples/active-directory-b2c-dotnet-javascript-single-page-app-aspnet-web-api.git` 

### [OPTIONAL] Step 2: Get your own Azure AD B2C tenant

You can also modify the sample to use your own Azure AD B2C tenant.  First, you'll need to create an Azure AD B2C tenant by following [these instructions](https://azure.microsoft.com/documentation/articles/active-directory-b2c-get-started).

> *IMPORTANT*: if you choose to perform one of the optional steps, you have to perform ALL of them for the sample to work as expected.

### [OPTIONAL] Step 3: Create your own policies

This sample uses three types of policies: a unified sign-up/sign-in policy & a profile editing policy.  Create one policy of each type by following [the instructions here](https://azure.microsoft.com/documentation/articles/active-directory-b2c-reference-policies).  You may choose to include as many or as few identity providers as you wish.

If you already have existing policies in your Azure AD B2C tenant, feel free to re-use those.  No need to create new ones just for this sample.

### [OPTIONAL] Step 4: Create your own application

Now you need to create your own application in your B2C tenant, so that your app has its own Application ID.  You can do so following [the generic instructions here](https://azure.microsoft.com/documentation/articles/active-directory-b2c-app-registration).  Be sure to include the following information in your app registration:

- Enable the **Web App/Web API** setting for your application.
- Add the redirect_uri for your app.  Their values should take the form 
    - `http://localhost:65328/redirect.html`
- Copy the Application ID generated for your application, so you can use it in the next step.

### [OPTIONAL] Step 5: Configure the sample to use your Azure AD B2C tenant

Now you can replace the app's default configuration with your own.  

Open the index.html file and replace the applicationID and policy names

```javascript
        //applicationID created in AD B2C portal
        var applicationId = 'e760cab2-b9a1-4c0d-86fb-ff7084abd902';

        //update the policy names with the exact name from the AD B2C policies blade
        var policies = {
            signInSignUpPolicy: "b2c_1_susi",
            editProfilePolicy: "b2c_1_edit_profile"
        };

        //API url
        var apiURL = 'https://fabrikamb2chello.azurewebsites.net/hello';
        var scope = 'openid https://fabrikamb2c.onmicrosoft.com/demoapi/demo.read';
```
open the aadb2c.js and replace the tenant name and policy names

```javascript
var tenantName = "fabrikamb2c.onmicrosoft.com";
var signInSignUpPolicyName = "b2c_1_susi";
var editProfilePolicyName = "b2c_1_edit_profile";
var redirect_uri = "http://localhost:65328/";
```

### Step 6:  Run the sample

Open the B2C-v2jsapp.sln in Visual Studio 2015.
Clean and rebuild the solution, and run it.  
You can now sign up / sign in / edit profile to your application using the accounts you configured in your respective policies. 
Once the user is signed in with a policy make a call to the API.

