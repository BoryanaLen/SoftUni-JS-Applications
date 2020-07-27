import {updateUserTeamId} from "../data.js"
import { showInfo, showError } from '../notifications.js';

export default async function(){

    if( this.app.userData.teamId){
        alert("You are another team member!");
        this.redirect("#/catalog");
        return;
    }
    
    if (!confirm("Are you sure you want to join the team?")) {
        return;
    }

    const userId = localStorage.getItem("userId");

    try {
        const teamId = this.params.id;

        const user = {
            teamId: teamId,
        };

        const result = await updateUserTeamId(userId, user);

        this.app.userData.hasTeam = true;
        this.app.userData.teamId = teamId;

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo("Successfully joined");
        this.redirect("#/catalog");
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}