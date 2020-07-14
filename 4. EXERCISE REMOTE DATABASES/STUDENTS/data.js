export function host(endpoint){
    if(endpoint === undefined){
        return "https://api.backendless.com/0E4285CC-EA14-3A08-FF51-1FE313763300/F9B342AF-9647-486D-977A-9C60B4180DDD/data/students";
    }
    else{
        return `https://api.backendless.com/0E4285CC-EA14-3A08-FF51-1FE313763300/F9B342AF-9647-486D-977A-9C60B4180DDD/data/students/${endpoint}`;
    }
}

export async function getData(){
    const data = await(await fetch(host())).json();
    return data;
}

export async function createEntry(entry){
    const data = await(await fetch(host(), {
        method: "POST",
        body: JSON.stringify(entry),
        headers: {
            "Content-Type": "application/json"
        }
    })).json();
    return data;
}
