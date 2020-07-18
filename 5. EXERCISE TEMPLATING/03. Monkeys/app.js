import monkeys from "./monkeys.js";

window.addEventListener("load", async () => {
    const container = document.querySelector("section");

    Promise.all([
        fetch("./monkey.hbs").then(res => res.text()),
        fetch("./list.hbs").then(res => res.text()),
    ])
    .then(([monkeyTemplateString, listTemplateString]) => {
        Handlebars.registerPartial("monkey", monkeyTemplateString);
        const template = Handlebars.compile(listTemplateString);
        container.innerHTML =  template({monkeys});

        container.addEventListener("click", function(e){

            const target = e.target;

            if(target.tagName.toLowerCase() === "button"){
                const paragraphInfo = target.parentElement.querySelector("p");
   
                if(paragraphInfo.style.display === "none"){
                    paragraphInfo.removeAttribute("style");
                }
               else{
                paragraphInfo.style.display = "none";
               }
            }
        });
    })
})