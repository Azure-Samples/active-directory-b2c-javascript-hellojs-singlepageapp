---
services: active-directory-b2c
platforms: javascript
author: SaeedAkhter-MSFT
---

# Single-Page Application built on Hello.js with Azure AD B2C

> **IMPORTANT NOTE: Silent renewing of access tokens is not supported by all social identity providers.**

This sample shows how to build a web application using Hello.js that performs identity management with Azure AD B2C . It assumes you have some familiarity with Azure AD B2C. If you'd like to learn all that B2C has to offer, start with [our documentation](http://aka.ms/aadb2c).

The app is a simple web application that performs sign-in, sign-up, and sign-out functions with signIn-signUp policies and also edit profile using EditProfile Policy. Once the user signed in sample GET request is made to an API. It is intended to help get you started with Azure AD B2C in a simple web application built on hello.js, giving you the necessary tools to execute Azure AD B2C policies & securely identify users in your application.  

##### Please note that this functionality is still in "preview"

## Hello.JS 

Hello.js is a client-side JavaScript SDK for authenticating with OAuth2 web services and querying REST APIs. For more details about hello.js, check out their [documentation](https://adodson.com/hello.js/#hellojs).

Microsoft has tested the [hello.js](https://github.com/MrSwitch/hello.js) library in basic scenarios and confirmed that it works with Azure AD B2C. Microsoft does not provide fixes for this library and has not done a review of the library. Issues and feature requests should be directed to the library’s open-source project.

This application has been built with hello.js library version 1.14.1.

## How To Run This Sample

Getting started is simple! To run this sample you will need:

- Visual Studio 2015 or Visual Studio 2017
- An Internet connection
- An Azure subscription (a free trial is sufficient)

If you don't have an Azure AD B2C tenant, you can follow [those instructions](https://azure.microsoft.com/documentation/articles/active-directory-b2c-get-started/) to create one. 
If you just want to see the sample in action, you don't need to create your own tenant as the project comes with some settings associated to a test tenant and application; however it is highly recommend that you register your own app and experience going through the configuration steps below.   

### Step 1:  Clone or download this repository

From your shell or command line:

```powershell
git clone https://github.com/Azure-Samples/active-directory-b2c-javascript-hellojs-singlepageapp.git
```

### [OPTIONAL] Step 2: Get your own Azure AD B2C tenant

You can also modify the sample to use your own Azure AD B2C tenant.  First, you'll need to create an Azure AD B2C tenant by following [these instructions](https://azure.microsoft.com/documentation/articles/active-directory-b2c-get-started).

> *IMPORTANT*: if you choose to perform one of the optional steps, you have to perform ALL of them for the sample to work as expected.

### [OPTIONAL] Step 3: Create your own policies

This sample uses three types of policies: a unified sign-up/sign-in policy & a profile editing policy.  Create one policy of each type by following [the instructions here](https://azure.microsoft.com/documentation/articles/active-directory-b2c-reference-policies).  You may choose to include as many or as few identity providers as you wish.

If you already have existing policies in your Azure AD B2C tenant, feel free to re-use those.  No need to create new ones just for this sample.

### [OPTIONAL] Step 4: Create your own Web API

This sample calls an API at https://fabrikamb2chello.azurewebsites.net which has the same code as the sample [Node.js Web API with Azure AD B2C](https://github.com/Azure-Samples/active-directory-b2c-javascript-nodejs-webapi). You'll need your own API or at the very least, you'll need to [register a Web API with Azure AD B2C](https://docs.microsoft.com/azure/active-directory-b2c/active-directory-b2c-app-registration#register-a-web-api) so that you can define the scopes that your single page application will request access tokens for. 

Your web API registration should include the following information:

- Enable the **Web App/Web API** setting for your application.
- Set the **Reply URL** to the appropriate value indicated in the sample or provide any URL if you're only doing the web api registration, for example `https://myapi`.
- Make sure you also provide a **AppID URI**, for example `demoapi`, this is used to construct the scopes that are configured in you single page application's code.
- (Optional) Once you're app is created, open the app's **Published Scopes** blade and add any extra scopes you want.
- Copy the **AppID URI** and **Published Scopes values**, so you can input them in your application's code.

### [OPTIONAL] Step 5: Create your own application

Now you need to [register your single page application in your B2C tenant](https://docs.microsoft.com/azure/active-directory-b2c/active-directory-b2c-app-registration#register-a-web-application), so that it has its own Application ID. Don't forget to grant your application API Access to the web API you registered in the previous step.

Your single page application registration should include the following information:

- Enable the **Web App/Web API** setting for your application.
- Set the **Reply URL** for your app to `http://localhost:65328/redirect.html`
- Once your app is created, open the app's **API access** blade and **Add** the API you created in the previous step.
- Copy the Application ID generated for your application, so you can use it in the next step.

### [OPTIONAL] Step 6: Configure the sample to use your Azure AD B2C tenant

Now you can replace the app's default configuration with your own.  

Open the index.html file and replace the applicationID, policy names, apiURL and scope

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
Open the aadb2c.js and replace the tenant name and policy names

```javascript
var tenantName = "fabrikamb2c.onmicrosoft.com";
var signInSignUpPolicyName = "b2c_1_susi";
var editProfilePolicyName = "b2c_1_edit_profile";
var redirect_uri = "http://localhost:65328/";
```

### Step 7: Run the sample

Open the B2C-v2jsapp.sln in Visual Studio 2015 or Visual Studio 2017.
Clean and rebuild the solution, and run it.  
You can now sign up / sign in / edit profile to your application using the accounts you configured in your respective policies. 
Once the user is signed in with a policy make a call to the API.

