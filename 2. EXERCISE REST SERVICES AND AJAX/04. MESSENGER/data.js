export function host(endpoint){
    if(endpoint === undefined){
        return "http://localhost:8000/messenger";
    }
    else{
        return `http://localhost:8000/messenger/${endpoint}`;
    }
}

export async function getData(){
    const data = await(await fetch(host())).json();
    return data;
}

export async function createEntry(entry){
    return (await fetch(host(), {
        method: "POST",
        body: JSON.stringify(entry)
    })).json();
}