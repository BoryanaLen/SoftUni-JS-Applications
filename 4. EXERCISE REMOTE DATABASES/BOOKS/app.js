import * as api from "./data.js";

window.addEventListener("load", () => {
    const loadButton = document.getElementById("loadBooks");
    const submitButton = document.querySelector("form button");
    const titleElement = document.getElementById("title");
    const authorElement = document.getElementById("author");
    const isbnElement = document.getElementById("isbn");
    const tbody = document.querySelector("tbody");

    loadButton.addEventListener("click", loadBooks);
    submitButton.addEventListener("click", create);

    loadBooks();

    async function create(e){
        e.preventDefault();
        const data = getEntryDatafromFields();
        if(!isValidEntry(data)){
            return;
        }
        try{
            titleElement.disabled = true;
            authorElement.disabled = true;
            isbnElement.disabled = true;
            submitButton.disabled = true;
            await api.createEntry(data);
            loadBooks();
            clearEntryDatafromFields()
        }catch(err){
            alert(err);
        }finally{
            titleElement.disabled = false;
            authorElement.disabled = false;
            isbnElement.disabled = false;
            submitButton.disabled = false;
        }     
    }

    async function loadBooks(){
        tbody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';
        const data = await api.getData();
        tbody.innerHTML = "";
        data.forEach(book =>  {
            let row = createTableRowBookInfo(book);
            tbody.appendChild(row);
        });
    }

    function createTableRowBookInfo(entry){
        let properties = ["title", "author", "isbn"];
        let row = document.createElement("tr");
        properties.forEach(prop => {
            let col = document.createElement("td");
            col.innerHTML = entry[prop];
            row.appendChild(col);
        });
        let col = document.createElement("td");
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", async () => {
            try{
                let newRow = await createTableRowBookUpdate(entry);
                tbody.replaceChild(newRow, row);
            }
            catch(error){
                console.error(error);
            }
        })
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", async () => {
            try{
                deleteButton.disabled = true;
                deleteButton.textContent = "Please wait...";
                await api.deleteEntry(entry.objectId);
                row.remove();
            }
            catch(error){
                console.error(error);
                deleteButton.disabled = false;
                deleteButton.textContent = "Delete";
            }
        })
        col.appendChild(editButton);
        col.appendChild(deleteButton);
        row.appendChild(col);
        return row;
    }

    function getEntryDatafromFields(){
        const title = titleElement.value;
        const author = authorElement.value;
        const isbn = isbnElement.value;
        return { author, title, isbn };
    }

    function clearEntryDatafromFields(){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }

    function isValidEntry(entry){
        let isValid = true;
        Object.entries(entry).find(([key, value]) => {
            if(value.length === 0){
                alert(`Book ${key} cannot be empty`);
                isValid = false;
                return true;
            }
            else{
                return false;
            }
        });
       return isValid;
    }

    function createTableRowBookUpdate(entry){
        let properties = ["title", "author", "isbn"];
        let row = document.createElement("tr");
        properties.forEach(prop => {
            let col = document.createElement("td");
            let input = document.createElement("input");
            input.value = entry[prop];
            col.appendChild(input);
            row.appendChild(col);
        });
        let col = document.createElement("td");
        let saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.addEventListener("click", async () => {
            try{
                const title = row.getElementsByTagName("td")[0].getElementsByTagName("input")[0].value;
                const author = row.getElementsByTagName("td")[1].getElementsByTagName("input")[0].value;
                const isbn = row.getElementsByTagName("td")[2].getElementsByTagName("input")[0].value;
                let data =  { author, title, isbn };
                let id = entry.objectId;
                if(!isValidEntry(data)){
                    return;
                }
                await api.updateEntry(id, data);
                loadBooks();
            }
            catch(error){
                console.error(error);
            }
        })
        let cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener("click", async () => {
            try{
                let newRow = await createTableRowBookInfo(entry);
                tbody.replaceChild(newRow, row);
            }
            catch(error){
                console.error(error);
            }
        })
        col.appendChild(saveButton);
        col.appendChild(cancelButton);
        row.appendChild(col);
        return row;
    }
})