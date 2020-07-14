import * as api from "./data.js";

function attachEvents() {
    
    window.addEventListener("load", () => {
        const catchesElement = document.getElementById("catches");
        const addButton = document.querySelector("#addForm .add");
        const loadButton = document.querySelector("aside .load");
       
        addButton.addEventListener("click", create);
        loadButton.addEventListener("click", load);
        
        async function load(){
            const data = await api.getData();
            catchesElement.innerHTML = "";
            createList(data);   
        }
    
        async function create(){
            const data =  getEntryDatafromFields("#addForm");
            await api.createEntry(data);
            clearEntryDatafromFields();
            load();
        }
    
        function createList(data){
            Object.entries(data).forEach(([key, value]) => {
                let containerDiv = document.createElement("div");
                containerDiv.className = "catch";
                containerDiv.id = key;
    
                let properties = ["angler", "weight", "species", "location", "bait", "captureTime"];
    
                properties.forEach(prop => {
                    let label = document.createElement("label");
                    label.textContent = `${prop.charAt(0).toUpperCase() + prop.slice(1)}`
                    containerDiv.appendChild(label);
                    let input = document.createElement("input");
                    input.className = prop;
                    input.value = value[prop];
                    if(prop === "weight" || prop === "captureTime"){
                        input.type = "number";
                    }
                    else{
                        input.type = "text";
                    }
                    containerDiv.appendChild(input);
                    containerDiv.appendChild(document.createElement("hr"));
                });
    
                
                let updateButton = document.createElement("button");
                updateButton.textContent = "Update";
                updateButton.className = "update";
                updateButton.addEventListener("click", async () => {
                    const entry = getEntryDatafromFields(`#${key}`);
                    try{
                        await api.updateEntry(key, entry);
                    }
                    catch(error){
                        console.error(error);
                    }
                })
                containerDiv.appendChild(updateButton);
    
                let deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.className = "delete";
                deleteButton.addEventListener("click", async () => {
                    try{
                        await api.deleteEntry(key);
                        containerDiv.remove();
                    }
                    catch(error){
                        console.error(error);
                    }
                })
                containerDiv.appendChild(deleteButton);          
                catchesElement.appendChild(containerDiv);
            });
        }
    
        function getEntryDatafromFields(divClassOrId){
            const angler = document.querySelector(`${divClassOrId} .angler`).value;
            const weight = document.querySelector(`${divClassOrId} .weight`).value;
            const species = document.querySelector(`${divClassOrId} .species`).value;
            const location = document.querySelector(`${divClassOrId} .location`).value;
            const bait = document.querySelector(`${divClassOrId} .bait`).value;
            const captureTime = document.querySelector(`${divClassOrId} .captureTime`).value;
           
            return { angler, weight, species, location, bait, captureTime };
        }
    
        function clearEntryDatafromFields(){
            document.querySelector(`#addForm .angler`).value = "";
            document.querySelector(`#addForm .weight`).value = "";
            document.querySelector(`#addForm .species`).value = "";
            document.querySelector(`#addForm .location`).value = "";
            document.querySelector(`#addForm .bait`).value = "";
            document.querySelector(`#addForm .captureTime`).value = "";
        }
    })
}

attachEvents();

