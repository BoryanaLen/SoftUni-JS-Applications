export function host(endpoint){
    if(endpoint === undefined){
        return "http://localhost:8000/phonebook";
    }
    else{
        return `http://localhost:8000/phonebook/${endpoint}`;
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

export async function createEntry(entry){
    return (await fetch(host(), {
        method: "POST",
        body: JSON.stringify(entry)
    })).json();
}