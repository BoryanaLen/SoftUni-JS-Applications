export function host(endpoint){
    if(endpoint === undefined){
        return "https://fisher-game.firebaseio.com/catches.json";
    }
    else{
        return `https://fisher-game.firebaseio.com/catches/${endpoint}.json`;
    }
}

export async function getData(){
    const data = await(await fetch(host())).json();
    return data;
}

export function deleteEntry(id){
    return fetch(host(id), {
        method: "DELETE"
    })
}

export function updateEntry(id, entry){
    return fetch(host(id), {
        method: "PUT",
        body: JSON.stringify(entry)
    }).json();
}

export async function createEntry(entry){
    return (await fetch(host(), {
        method: "POST",
        body: JSON.stringify(entry)
    })).json();
}