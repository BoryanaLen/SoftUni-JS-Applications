function solve() {
    let infoElement = document.getElementsByClassName("info")[0];
    let departButton = document.getElementById("depart");
    let arriveButton = document.getElementById("arrive");
    let currentId = "depot";
    let currentName = "";

    function depart() {
        fetch( `https://judgetests.firebaseio.com/schedule/${currentId}.json`)
        .then(res => res.json())
        .then(data => {
            if(data !== null){
                infoElement.textContent = `Next stop ${data.name}`;
                currentId = data.next;
                currentName = data.name;
                departButton.disabled = true;
                arriveButton.disabled = false;
            }
            else{
                throw Error("Invalid data received");
            }
        })
        .catch((err)=>{
            infoElement.textContent = err;
            departButton.disabled = true;
            arriveButton.disabled = true;
        })
    }

    function arrive() {
        infoElement.textContent = `Arriving at ${currentName}`;
        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();