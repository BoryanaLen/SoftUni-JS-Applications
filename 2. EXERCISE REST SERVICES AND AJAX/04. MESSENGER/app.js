import * as api from "./data.js";

window.addEventListener("load", () => {
    let authorElement = document.getElementById("author");
    let messageElement = document.getElementById("content");
    let submitButton = document.getElementById("submit");
    let refreshButton = document.getElementById("refresh");
    let messages = document.getElementById("messages");
   
    submitButton.addEventListener("click", submit);
    refreshButton.addEventListener("click", refresh);

    async function refresh(){
        const data = await api.getData();
        let allMessages = Object.values(data).map(x => `${x.author}: ${x.content}`);
        messages.textContent = allMessages.join("\n");
    }

    async function submit(){
        let author = authorElement.value;
        let content = messageElement.value;
        let data = { author, content };

        const result = await api.createEntry(data);

        authorElement.value = "";
        messageElement.value = "";
    }
})