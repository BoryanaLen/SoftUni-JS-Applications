window.addEventListener("load", async () => {
    const container = document.getElementById("allCats");  
    Handlebars.registerPartial("cat", await(await fetch("./cat.hbs")).text());
    const templateString = await(await fetch("./list.hbs")).text();
    
    const templateFunction = Handlebars.compile(templateString);
    const generateHTML = templateFunction({cats});
    container.innerHTML = generateHTML;

    container.addEventListener("click", function(e) {
        const target = e.target;

        if(target.tagName.toLowerCase() === "button"){
            const divStatus = target.parentElement.querySelector(".status");

            if(target.textContent === "Show status code"){
                divStatus.style.display = "";
                target.textContent = "Hide status code";
            }
            else if(target.textContent === "Hide status code"){
                divStatus.style.display = "none";
                target.textContent = "Show status code";
            }
        }
    })
})