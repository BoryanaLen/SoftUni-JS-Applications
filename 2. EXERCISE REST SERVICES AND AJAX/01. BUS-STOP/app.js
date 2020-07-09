function getInfo() {
   let stopId = document.getElementById("stopId").value;
   let stopNameElement = document.getElementById("stopName");
   let busesElement = document.getElementById("buses");
   let url = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;
   let validIds = ["1287", "1308", "1327", "2334"];

   if(!validIds.includes(stopId)){
        stopNameElement.textContent = 'Error';
        busesElement.textContent = "";
        return;
    }
   
    fetch(url)
    .then(res => res.json())
    .then(data => {
        busesElement.textContent = "";
        stopNameElement.textContent = data.name;
        Object.keys(data.buses).forEach(key => {
            let li = document.createElement("li");
            li.textContent = `Bus ${key} arrives in ${data.buses[key]}`;
            busesElement.appendChild(li);
        });
    })
}