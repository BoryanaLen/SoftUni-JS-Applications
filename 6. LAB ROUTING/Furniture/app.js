(function(){
    const templates = {};
    const loadingBoxEl = document.getElementById("loadingBox");
    const infoBoxEl = document.getElementById("infoBox");
    const errorBoxEl = document.getElementById("errorBox");
    const baseUrl = "https://api.backendless.com/0E4285CC-EA14-3A08-FF51-1FE313763300/F9B342AF-9647-486D-977A-9C60B4180DDD/data";

    function toggleLoader(showLoader){
        if(showLoader){
            loadingBoxEl.style.display = "inline";
        }
        loadingBoxEl.style.display = "none";
    }

    function getTemplate(templatePath){
        const existingTemplate = templates[templatePath];
        if(existingTemplate){
            return Promise.resolve(existingTemplate);
        }

       return fetch(`/templates/${templatePath}.hbs`)
        .then(res => res.text())
        .then(templateString => {
            const template = Handlebars.compile(templateString);
            templates[templatePath] = template;
            return template;
        })
    }

    function renderTemplate(templatePath, templateContext, SwapFn){
        return getTemplate(templatePath)
        .then(templateFn => {
            const content = templateFn(templateContext);
            SwapFn(content);
        })
    }

    function loadRegisterPartialTemplate(templatePath, templateName){
        return fetch(`/templates/partials/${templatePath}.hbs`)
        .then(res => res.text())
        .then(templateString => {
             Handlebars.registerPartial(templateName, templateString);
             return templateString;
        });     
    }

    function loadFurniture(){
        return fetch(`${baseUrl}/furniture`)
        .then(res => res.json())
        .then(data => {
            return Object.keys(data).reduce((acc, currId) => {
                const currentItem = data[currId];
                return acc.concat({ id: currId, ...currentItem});
            }, []);
        })
    }

    function loadFurnitureWithId(id){
        return fetch(`${baseUrl}/furniture/${id}`)
        .then(res => res.json());
    }

    function onCreateFurnitureLoaded(createHandlerFn){
        const createBtn = document.getElementById("create-btn");
        createBtn.addEventListener("click", createHandlerFn);
    }

    const app = Sammy("#container", function(){
        this.before({}, function(){
            toggleLoader(true);
        });

        this.get("#/", function(){
            Promise.all([loadFurniture(), loadRegisterPartialTemplate("furniture-item", "furnitureItem")])           
            .then(([items]) => renderTemplate("home", { items }, this.swap.bind(this)))
            .then(() => {
                toggleLoader(false);
            });
        })
        this.get("#/profile", function(){
           renderTemplate("profile", {}, this.swap.bind(this))
                .then(() => {
                    toggleLoader(false);
                });
        })
        this.get("#/create-furniture", function(){
            renderTemplate("create-furniture", {}, this.swap.bind(this))
                .then(() => {
                    toggleLoader(false);

                    const onCreateHandler = () => {
                        const newMakeEl = document.getElementById("new-make");
                        const newModelEl = document.getElementById("new-model");
                        const newYearEl = document.getElementById("new-year");
                        const newDescriptionEl = document.getElementById("new-description");
                        const newPriceEl = document.getElementById("new-price");
                        const newImageEl = document.getElementById("new-image");
                        const newMaterialEl = document.getElementById("new-material");

                        const inputs = [
                            newMakeEl,
                            newModelEl,
                            newYearEl,
                            newDescriptionEl,
                            newPriceEl,
                            newImageEl,
                            newMaterialEl
                        ]
            
                        const values = inputs.map(input => input.value);
                        const missingInputValue = values.findIndex(v => !v);
                        if(missingInputValue !== -1){
                            console.error("Missing data", inputs[missingInputValue]);
                            return;
                        }

                        const body = values.reduce((acc, curr, index) => {
                            const currentInput = inputs[index];
                            acc[currentInput.name] = curr;
                            return acc;
                        }, {})
            
                        const url = `${baseUrl}/furniture`
                        body.price = Number(body.price);
                        body.year = Number(body.year);
                        fetch(url, {method: "POST", body: JSON.stringify(body)})
                        .then(() => {
                            this.redirect("#/");
                        })
                    }
        
                    onCreateFurnitureLoaded(onCreateHandler);
            });
        });

        this.get(`#/furniture-details/:id`, function(context){
            const id = context.params.id;
            loadFurnitureWithId(id)
            .then(furniture => renderTemplate("furniture-details", {furniture }, this.swap.bind(this)))
            .then(() => {
                toggleLoader(false);
            });
        })
    })

    app.run("#/");
})();