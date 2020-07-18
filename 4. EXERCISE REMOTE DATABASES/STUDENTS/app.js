import * as api from "./data.js";

window.addEventListener("load", () => {
    const tbody = document.querySelector("tbody");
    const submitButton = document.querySelector("form button");
    const loadButton = document.getElementById("loadStudents");
    const firstNameElement = document.getElementById("firstName");
    const lastNameElement = document.getElementById("lastName");
    const facultyNumberElement = document.getElementById("facultyNumber");
    const gradeElement = document.getElementById("grade");

    loadStudents();

    submitButton.addEventListener("click", create);
    loadButton.addEventListener("click", loadStudents);

    async function create(e){
        e.preventDefault();
        const data = getEntryDatafromFields();
        if(!isValidEntry(data)){
            return;
        }
        try{
            firstNameElement.disabled = true;
            lastNameElement.disabled = true;
            facultyNumberElement.disabled = true;
            gradeElement.disabled = true;
            submitButton.disabled = true;
            data.grade = Number(data.grade);
            await api.createEntry(data);
            loadStudents();
            clearEntryDatafromFields();
        }catch(err){
            alert(err);
        }finally{
            firstNameElement.disabled = false;
            lastNameElement.disabled = false;
            facultyNumberElement.disabled = false;
            gradeElement.disabled = false;
            submitButton.disabled = false;
        }     
    }

    async function loadStudents(){
        tbody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';
        const data = (await api.getData()).sort((a, b) => a.id - b.id);
        tbody.innerHTML = "";
        data.forEach(student =>  {
            let row = createTableRowStudentInfo(student);
            tbody.appendChild(row);
        });
    }

    function createTableRowStudentInfo(entry){
        let properties = ["id", "firstName", "lastName", "facultyNumber", "grade"];
        let row = document.createElement("tr");
        properties.forEach(prop => {
            let col = document.createElement("td");
            if(prop === "grade"){
                col.innerHTML = Number(entry[prop]).toFixed(2);
            }
            else{
                col.innerHTML = entry[prop];
            }            
            row.appendChild(col);
        });

        return row;
    }

    function clearEntryDatafromFields(){
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("facultyNumber").value = "";
        document.getElementById("grade").value = "";
    }

    function getEntryDatafromFields(){
        const id = Number(getNextIdInTable());
        const firstName = firstNameElement.value;
        const lastName = lastNameElement.value;
        const facultyNumber = facultyNumberElement.value;
        const grade = gradeElement.value;
        return { id, firstName, lastName, facultyNumber, grade };
    }

    function getNextIdInTable(){
        if (tbody.children.length > 0) {
            let lastId = tbody.lastChild.firstChild.textContent;
            return Number(lastId) + 1;
        }else{
            return 1;
        }
    }

    function isValidEntry(entry){
        let isValid = true;
        Object.entries(entry).find(([key, value]) => {
            if(value.length === 0){
                alert(`Student ${key} cannot be empty`);
                isValid = false;
                return true;
            }
            else{
                return false;
            }
        });

        if(isValidfacultyNumber(entry.facultyNumber) === false && isValid === true){
            alert(`Student faculty number must contain only numbers`);
            isValid = false;
        }

        if(isNaN(entry.grade) && isValid === true){
            alert(`Student grade must be numbers`);
            isValid = false;
        }

        return isValid;
    }

    function isValidfacultyNumber(facultyNumber) {
        let result = /^\d+$/.test(facultyNumber);
        return result;
    }
})