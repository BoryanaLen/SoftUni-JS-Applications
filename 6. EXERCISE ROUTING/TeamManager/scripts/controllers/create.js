import {createTeam, getTeamById} from "../data.js";
import { showInfo, showError } from '../notifications.js';

export default async function(){

    if( this.app.userData.teamId){      
        const data = await getTeamById(this.app.userData.teamId);
        alert(`You are ${data.name} team member! If you want to continue you shoul leave it`);
        this.redirect("#/catalog");
        return;
    }

    this.partials = {
        header: await this.load("./templates/common/header.hbs"),
        footer: await this.load("./templates/common/footer.hbs"),
        createForm: await this.load("./templates/create/createForm.hbs"),
    }
       
    this.partial("./templates/create/createPage.hbs", this.app.data);
}

export async function createPost(){

    const newTeam = {
        name: this.params.name,
        comment: this.params.comment,
        memberIDs: [this.app.userData.userId]
    };

    if(Object.values(newTeam).some(v => v.length === 0)){
        alert("All fields are required!");
        return;
    }
    try{
        const result = await createTeam(newTeam);
        if(result.hasOwnProperty("errorData")){
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.hasTeam = true;
        this.app.userData.teamId = result.objectId;
        localStorage.setItem("teamId", result.teamId);

        showInfo("Team created");

        this.redirect(`#/catalog/${result.objectId}`);
    }catch(err){
        console.error(err);
        showError(err.message);
    }
}