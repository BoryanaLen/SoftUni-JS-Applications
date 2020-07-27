import { login, logout as logoutGet } from "../data.js";
import { showInfo, showError } from '../notifications.js';

export default async function(){
    this.partials = {
        header: await this.load("./templates/common/header.hbs"),
        footer: await this.load("./templates/common/footer.hbs"),
        loginForm: await this.load("./templates/login/loginForm.hbs")
    }
    this.partial("./templates/login/loginPage.hbs");
}

export async function loginPost(){
    try{
        const result = await login(this.params.username, this.params.password);
        if(result.hasOwnProperty("errorData")){
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.loggedIn = true;
        this.app.userData.username = result.username;
        this.app.userData.userId = result.objectId;
        this.app.userData.teamId = result.teamId;
        
        (result.teamId)? this.app.userData.hasTeam = true : this.app.userData.hasTeam = false;

        localStorage.setItem("userToken", result["user-token"]);
        localStorage.setItem("username", result.username);
        localStorage.setItem("userId", result.objectId);
        localStorage.setItem("teamId", result.teamId);

        showInfo(`Logged in as ${result.username}`);
        this.redirect("#/home");
    }catch(err){
        console.error(err);
        showError(err.message);
    }
}

export async function logout(){
    try {
        const result =  await logoutGet();
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.loggedIn = false;
        this.app.userData.username = undefined;
        this.app.userData.userId = undefined;
        this.app.userData.hasTeam = false;
        this.app.userData.teamId = undefined;
        localStorage.removeItem("userToken");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        localStorage.removeItem("teamId");

        showInfo('Successfully logged out');
        this.redirect("#/home");

    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}

