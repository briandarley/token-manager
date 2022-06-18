/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable no-debugger */
import injector from 'vue-inject';

export default function UserProfileService(ConfigReaderService, LocalStorageService, RouterService, axios, Oidc, settings) {
  {
    return {
      userManager: null,
      async initialize() {

        this.userManager = new Oidc.UserManager(settings);
        
      },
      async getUserName() {
        let user = await this.getUser();
        if(!user || !user.profile) return null;
        return user.profile.name;
      },
      async getUser() {
        return await this.userManager.getUser();
      },
      async login() {
        
        await this.userManager.clearStaleState(null);
        const args = { prompt: "login",state: "duo", extraQueryParams: { uid: "", duo: "" } };
        return this.userManager.signinRedirect(args);
      },
      async logOut() {
        await this.userManager.clearStaleState(null);
        let user = await this.getUser();
        await this.userManager.removeUser();
        
        this.userManager.signoutRedirect({
          id_token_hint: user.id_token,
        });
      }
    }
    
  }
}
injector.service('UserProfileService', ["ConfigReaderService", "LocalStorageService", "RouterService", "axios", "Oidc", "config.security"], UserProfileService)
