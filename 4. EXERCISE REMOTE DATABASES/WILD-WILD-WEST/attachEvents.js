function attachEvents() {
    const baseUrl = "https://api.backendless.com/0E4285CC-EA14-3A08-FF51-1FE313763300/F9B342AF-9647-486D-977A-9C60B4180DDD/data/players";
    const playersElement = document.getElementById("players");
    const inpputAddNameElement = document.getElementById("addName");
    const addPlayerButton = document.getElementById("addPlayer");
    const saveButton = document.getElementById("save");
    const reloadButton = document.getElementById("reload");
    const canvas = document.getElementById("canvas");

    addPlayerButton.addEventListener("click", addPlayer);

    loadPlayers();

    function loadPlayers(){
        fetch(baseUrl)
        .then(res => res.json())
        .then(data => 
            data.forEach(player => {
                let container = document.createElement("div");
                container.className = "player";
                let divName = document.createElement("div");
                divName.textContent = `Name:${player.name}`;
                container.appendChild(divName);
                let divMoney = document.createElement("div");
                divMoney.textContent = `Money:${player.money}`;
                container.appendChild(divMoney);
                let divBullet = document.createElement("div");
                divBullet.textContent = `Bullets:${player.bullets}`;
                container.appendChild(divBullet);
                let divPlayButton = document.createElement("div");
                let playButton = document.createElement("button");
                playButton.textContent = "Play";
                playButton.addEventListener("click",() => {
                    saveButton.style.display = "inline-block";  
                    saveButton.addEventListener("click", function(){
                        updatePlayer(player);
                    }, false);                                   
                    reloadButton.style.display = "inline-block";
                    reloadButton.addEventListener("click", function(){
                        reloadPlayer(player);
                    })
                    canvas.style.display = "block";
                    loadCanvas(player);
                });
                divPlayButton.appendChild(playButton);
                container.appendChild(divPlayButton);
                let divDeleteButton = document.createElement("div");
                let deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", () => {
                    try{
                        deleteButton.disabled = true;
                        deleteButton.textContent = "Please wait...";
                        fetch((`${baseUrl}/${player.objectId}`), {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(res => res.json());
                        container.remove();
                    }
                    catch(error){
                        console.error(error);
                        deleteButton.disabled = false;
                        deleteButton.textContent = "Delete";
                    }
                })
                divDeleteButton.appendChild(deleteButton);
                container.appendChild(divDeleteButton);

                playersElement.appendChild(container);
            })
        )

    }

    function addPlayer(){
        const name = inpputAddNameElement.value;
        
        if(name.length === 0){
            alert("Field can not be empty");
            return;
        }
        const data = { name, "money":500, "bullets":6 };

        try{
            fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                inpputAddNameElement.disabled = true;
                addPlayerButton.disabled = true;
                playersElement.innerHTML = "";
                loadPlayers();
                inpputAddNameElement.value = "";
            })
           
        }catch(err){
            alert(err);
        }finally{
            inpputAddNameElement.disabled = false;
            addPlayerButton.disabled = false;
        }     
    }

    function updatePlayer (player) {
        try{
            fetch(`${baseUrl}/${player.objectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(player)
            })
            .then(res => res.json())
            .then(res => {
                playersElement.innerHTML = "";
                loadPlayers();
                saveButton.style.display = "none";               
                reloadButton.style.display = "none";
                canvas.style.display = "none";
                clearInterval(canvas.intervalId);
            })
           
        }catch(err){
            alert(err);
        }
    }

    function reloadPlayer(player){
        try{
            if(player.money < 60){
                alert("Not enough money to reload!");
                return;
            }
            player.money -= 60;
            player.bullets = 6;
            fetch(`${baseUrl}/${player.objectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(player)
            })
            .then(res => res.json())
            .then(res => {
                playersElement.innerHTML = "";
                loadPlayers();
            })
           
        }catch(err){
            alert(err);
        }
    }
}