(function(){
    const container = document.getElementById("root");
    const btnLoadTowns = document.getElementById("btnLoadTowns");
    const input = document.getElementById("towns");

    function init(){
        Promise.all([
            fetch("./town.hbs").then(res => res.text()),
            fetch("./list.hbs").then(res => res.text()),
        ])
        .then(([townTemplateString, listTownsTemplateString]) => {
           
            btnLoadTowns.addEventListener("click", function(e) {
                e.preventDefault()
                
                const towns = input.value.split(", ");
                Handlebars.registerPartial("town", townTemplateString);
                const template = Handlebars.compile(listTownsTemplateString);
                container.innerHTML =  template({towns});
            })
        })
    }

    init();
}());