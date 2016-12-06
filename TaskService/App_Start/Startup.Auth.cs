using Microsoft.Owin.Security.ActiveDirectory;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskService.App_Start;

namespace TaskService
{
    public partial class Startup
    {
        // These values are pulled from web.config
        public static string aadInstance = ConfigurationManager.AppSettings["ida:AadInstance"];
        public static string tenant = ConfigurationManager.AppSettings["ida:Tenant"];
        public static string clientId = ConfigurationManager.AppSettings["ida:ApplicationId"];
        public static string signUpSignInPolicy = ConfigurationManager.AppSettings["ida:SignUpSignInPolicyId"];
        public static string signInPolicy = ConfigurationManager.AppSettings["ida:SignInPolicyId"];
        public static string editProfilePolicy = ConfigurationManager.AppSettings["ida:UserProfilePolicyId"];

        public void ConfigureAuth(IAppBuilder app)
        {   
            app.UseOAuthBearerAuthentication(CreateBearerOptionsFromPolicy(signUpSignInPolicy));
            app.UseOAuthBearerAuthentication(CreateBearerOptionsFromPolicy(signInPolicy));
            app.UseOAuthBearerAuthentication(CreateBearerOptionsFromPolicy(editProfilePolicy));
        }

        public OAuthBearerAuthenticationOptions CreateBearerOptionsFromPolicy(string policy)
        {
            TokenValidationParameters tvps = new TokenValidationParameters
            {
                // This is where you specify that your API only accepts tokens from its own clients
                ValidAudience = clientId,
                AuthenticationType = policy,
            };

            return new OAuthBearerAuthenticationOptions
            {
                // This SecurityTokenProvider fetches the Azure AD B2C metadata & signing keys from the OpenIDConnect metadata endpoint
                AccessTokenFormat = new JwtFormat(tvps, new OpenIdConnectCachingSecurityTokenProvider(String.Format(aadInstance, tenant, policy))),
            };
        }
    }
}
