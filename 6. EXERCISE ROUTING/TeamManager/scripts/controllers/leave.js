import {updateUserTeamId} from "../data.js"
import { showInfo, showError } from '../notifications.js';

export default async function(){
   
    if (!confirm("Are you sure you want to leave the team?")) {
        return;
    }

    const userId = localStorage.getItem("userId");

    try {
        const user = {
            teamId: "",
        };

        const result = await updateUserTeamId(userId, user);

        this.app.userData.hasTeam = false;
        this.app.userData.teamId = "";

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo("Successfully leaved");

        this.redirect("#/catalog");
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}
