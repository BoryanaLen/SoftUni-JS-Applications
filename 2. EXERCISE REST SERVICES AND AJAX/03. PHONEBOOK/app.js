import * as api from "./data.js";

window.addEventListener("load", () => {
    let phonebookElement = document.getElementById("phonebook");
    let personElement = document.getElementById("person");
    let phoneElement = document.getElementById("phone");   
    let createButton = document.getElementById("btnCreate");
    let loadButton = document.getElementById("btnLoad");
   
    createButton.addEventListener("click", create);
    loadButton.addEventListener("click", load);

    async function load(){
        const data = await api.getData();

        phonebookElement.innerHTML = "";
        Object.entries(data).forEach(element => {
            let li = document.createElement("li");
            let text = document.createTextNode(`${element[1].person}:${element[1].phone}  `);
            li.appendChild(text);
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", async () => {
                try{
                    await api.deleteEntry(element[0]);
                    li.remove();
                }
                catch(error){
                    console.error(error);
                }
            })
            li.appendChild(deleteButton);
            phonebookElement.appendChild(li);
        });
    }

    async function create(){
        let person = personElement.value;
        let phone = phoneElement.value;
        const data = { person, phone };

        const result = await api.createEntry(data);

        await load();
        personElement.value = "";
        phoneElement.value = "";
    }
})