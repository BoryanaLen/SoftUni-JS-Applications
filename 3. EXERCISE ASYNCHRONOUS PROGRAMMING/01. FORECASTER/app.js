import * as data from "./data.js";

function attachEvents() {

    window.addEventListener("load", () => {

        const buton = document.getElementById("submit");
        const mainDiv = document.getElementById("forecast");
        const todayDiv = document.getElementById("current");
        const upcomingDiv = document.getElementById("upcoming");
        let input = document.getElementById("location");
        let errorDiv = document.createElement("div");
        errorDiv.id = "error";
        document.getElementById("request").appendChild(errorDiv);

        buton.addEventListener("click", getWeather);

        async function getWeather(){
            const locationName = input.value;
            let code = "";
            try{
                code = await data.getCode(locationName);
            }
            catch(error){
                mainDiv.style.display = "block";
                errorDiv.textContent = "Error!";
                mainDiv.style.display = "none";
                return
            }

            const todayElement = data.getToday(code);
            const upcomingElement = data.getUpcoming(code);
    
            const [today, upcoming] = [
                await todayElement,
                await upcomingElement
            ];

            const symbols = {
                "Sunny": "&#x2600;",
                "Partly sunny": "&#x26C5;",
                "Overcast":	"&#x2601;",
                "Rain":	"&#x2614;",
                "Degrees": "&#176;"
            }

            mainDiv.style.display = "block";
            todayDiv.innerHTML = "";
            document.getElementById("error").innerHTML = "";
            let currentLabelDiv = document.createElement("div");
            currentLabelDiv.className = "label";
            currentLabelDiv.textContent = "Current conditions";
            todayDiv.appendChild(currentLabelDiv);
            let divCurrentForecast = document.createElement("div");
            divCurrentForecast.className = "forecast";
            let spanSymbol = document.createElement("span");
            spanSymbol.className = "condition symbol";
            spanSymbol.innerHTML = symbols[today.forecast.condition];
            divCurrentForecast.appendChild(spanSymbol);    
            let spanData = document.createElement("span");
            spanData.className = "condition";
            let spanName = document.createElement("span");
            spanName.className = "forecast-data"
            spanName.textContent = today.name;
            spanData.appendChild(spanName);
            let spanDegree = document.createElement("span");
            spanDegree.className = "forecast-data"
            spanDegree.innerHTML = `${today.forecast.low}${symbols.Degrees}/${today.forecast.high}${symbols.Degrees}`;
            spanData.appendChild(spanDegree);
            let spanCondition = document.createElement("span");
            spanCondition.className = "forecast-data"
            spanCondition.textContent = today.forecast.condition;
            spanData.appendChild(spanCondition);
            divCurrentForecast.appendChild(spanData);
            todayDiv.appendChild(divCurrentForecast);

            //---------------------------------------------------------------
            upcomingDiv.innerHTML = "";
            let upcomingLabelDiv = document.createElement("div");
            upcomingLabelDiv.className = "label";
            upcomingLabelDiv.textContent = "Three-day forecast";
            upcomingDiv.appendChild(currentLabelDiv);

            let upcomingDivInfo = document.createElement("div");
            upcomingDivInfo.className = "forecast-info";

            let array = Object.values(upcoming)[0];

            for (let index = 0; index < array.length; index++) {
                const day = array[index];
                let spanFirstDay = document.createElement("span");
                spanFirstDay.className = "upcoming";
                let spanSymbolFirstDay = document.createElement("span");
                spanSymbolFirstDay.className = "symbol";
                spanSymbolFirstDay.innerHTML = symbols[day.condition];
                spanFirstDay.appendChild(spanSymbolFirstDay);   
                let spanDegreeFirstDay = document.createElement("span");
                spanDegreeFirstDay.className = "forecast-data"
                spanDegreeFirstDay.innerHTML = `${day.low}${symbols.Degrees}/${day.high}${symbols.Degrees}`;
                spanFirstDay.appendChild(spanDegreeFirstDay);
                let spanConditionFirstDay = document.createElement("span");
                spanConditionFirstDay.className = "forecast-data"
                spanConditionFirstDay.textContent = day.condition;
                spanFirstDay.appendChild(spanConditionFirstDay);
                upcomingDivInfo.appendChild(spanFirstDay);               
            }
            upcomingDiv.appendChild(upcomingDivInfo);
        }
    })
}

attachEvents();