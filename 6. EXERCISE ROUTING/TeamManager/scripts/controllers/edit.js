import {getTeamById, updateTeam} from "../data.js"
import { showInfo, showError } from '../notifications.js';

export default async function(){
    this.partials = {
        header: await this.load("./templates/common/header.hbs"),
        footer: await this.load("./templates/common/footer.hbs"),
        editForm: await this.load("./templates/edit/editForm.hbs"),
        editPage: await this.load("./templates/edit/editPage.hbs")
    }

    const data = await getTeamById(this.params.id);

    if(data.ownerId === this.app.userData.userId){
        data.isAuthor = true;
    }
    if(data.objectId === this.app.userData.teamId){
        data.isOnTeam = true;
    }
       
    this.partial("./templates/edit/editPage.hbs", data);
}

export async function editPost() {
    const teamId = this.params.id;

    try {
        if (this.params.name.length === 0) {
            throw new Error('Name is required');
        }
        if (this.params.comment.length === 0) {
            throw new Error('Comment is required');
        }

        const team = {
            name: this.params.name,
            comment: this.params.comment
        };

        const result = await updateTeam(teamId, team);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        showInfo("Team edited");
        this.redirect("#/catalog");
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
}