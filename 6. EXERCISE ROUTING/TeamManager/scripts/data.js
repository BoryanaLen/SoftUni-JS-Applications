function host(endpoint){
   return `https://api.backendless.com/ACED8D55-1FE3-1040-FFE8-9F81BA533500/F2FB652C-5792-4129-ADBD-609401597F87/${endpoint}`;
}

const endpoints = {
    REGISTER: "users/register",
    LOGIN: "users/login",
    TEAMS: "data/teams",
    UPDATE_USER: "users/",
    LOGOUT: "users/logout",
    USERS: "data/Users",
    TEAM_BY_ID: "data/teams/"
}

export async function register(username, password){
   return(await fetch(host(endpoints.REGISTER), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
   })).json();
}

export async function login(username, password){
    return(await fetch(host(endpoints.LOGIN), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: username,
            password
        })
   })).json();
}

export async function logout(){
    const token =  localStorage.getItem("userToken");
    if(!token){
        throw new Error("User is not logged in");
    }

    return fetch(host(endpoints.LOGOUT), {
        method: "GET",
        headers: {
            "user-token": token
        } 
    });
}

async function setUserTeamId(userId, teamId){
    const token =  localStorage.getItem("userToken");
    if(!token){
        throw new Error("User is not logged in");
    }

    return (await fetch(host(endpoints.UPDATE_USER + userId), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        },
        body: JSON.stringify({
            teamId
        })
   })).json();
}

export async function createTeam(team){
    const token =  localStorage.getItem("userToken");
    if(!token){
        throw new Error("User is not logged in");
    }

    const result = await (await fetch(host(endpoints.TEAMS), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user-token": token
        },
        body: JSON.stringify(team)
   })).json();

   if(result.hasOwnProperty("errorData")){
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }

    const userUpdateResult = await setUserTeamId(result.ownerId, result.objectId)

    if(userUpdateResult.hasOwnProperty("errorData")){
        const error = new Error();
        Object.assign(error, userUpdateResult);
        throw error;
    }

   return result;
}

export async function getTeams(){
    return (await fetch(host(endpoints.TEAMS))).json();
}

export async function getTeamById(id){
    return (await fetch(host(endpoints.TEAMS  + "/" + id))).json();
}

export async function getMembers(teamId){

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.USERS + `?where=teamId%3D%27${teamId}%27`), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();

    return result;
}

export async function updateTeam(id, updatedProps) {
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.TEAM_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();

    return result;
}

export async function updateUserTeamId(userId, updatedProps){
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.USERS + "/" + userId), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();

    return result;
}
