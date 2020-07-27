import home from "./controllers/home.js";
import about from "./controllers/about.js";
import register, {registerPost} from "./controllers/register.js";
import login, {loginPost, logout} from "./controllers/login.js";
import catalog from "./controllers/catalog.js";
import details from "./controllers/details.js";
import create, {createPost} from "./controllers/create.js";
import edit, {editPost} from "./controllers/edit.js";
import leave from "./controllers/leave.js";
import join from "./controllers/join.js";

$(() => {
    const app = Sammy("#main", function(){
        this.use("Handlebars", "hbs");

        this.userData = {           
            username: localStorage.getItem('username') || '',
            userId: localStorage.getItem('userId') || '',
            teamId: localStorage.getItem('teamId') || '',
            loggedIn: false,
            hasTeam: false
        };

        if(this.userData.userId){
            this.userData.loggedIn = true
        }

        if(this.userData.teamId){
            this.userData.hasTeam = true
        }
        
        this.get("index.html", home);
        this.get("#/home", home);
        this.get("/", home);
        this.get("#/about", about);
        this.get("#/register", register);
        this.get("#/login", login);
        this.get("#/logout", logout);
        this.get("#/catalog", catalog);
        this.get("#/catalog/:id", details);
        this.get("#/create", create);
        this.get("#/edit/:id", edit);
        this.get("#/leave", leave);
        this.get("#/join/:id", join);

        this.post("#/register", (ctx) => {registerPost.call(ctx)});
        this.post("#/login", (ctx) => {loginPost.call(ctx)});
        this.post("#/create", (ctx) => {createPost.call(ctx)});
        this.post('#/edit/:id', ctx => { editPost.call(ctx); });
    });

    app.run();
});
