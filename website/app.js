/* Global Variables */
const apiKey = '6cb1b64495f21d8d3c7123ebb3e3755b&units=metric';
let date = document.getElementById('date');
let temp = document.getElementById('temp');
let content = document.getElementById('content');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
const btn = document.querySelector("#generate");
btn.addEventListener('click', async () => {

    const zipCode = document.getElementById('zip');
    console.log(zipCode.value);
    const feeling = document.getElementById('feelings');

    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&appid=${apiKey}`;


    const getData = async function () {
        try {
            const apiResponse = await fetch(url);
            console.log(apiResponse);
            const response = await apiResponse.json();
            const temperature = response.main.temp;
            console.log(temperature);

        } catch (error) {
            // code to log error
            console.log("catch Get error", error);
        }
    };


    //post function

    const postData = async function (url = "", data = {}) {

        try {
            await fetch(url, {
                method: "POST",
                credentials: "same-origin",
                header: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });


            console.log('done');
            console.log(feeling.value);
        } catch (error) {
            console.log("catch post error", error);
        }
    }


    // update UI
    const updateData = async () => {
        const request = await fetch('/getdata');
        console.log(newDate)
        try {
            // Transform into JSON
            const allData = await request.json()
            console.log(allData)
            console.log(request)
            // Write updated data to DOM elements
            document.getElementById('temp').innerHTML = allData.temp + ' degrees';
            document.getElementById('content').innerHTML = allData.feel;
            document.getElementById("date").innerHTML = allData.date;
        }
        catch (error) {
            console.log("error", error);
            // appropriately handle the error
        }
    }

    //checking
    if (!zipCode.value) {
        alert("please enter the zip code");
        console.log(zipCode.value);
    } else {
        getData().then((data) => {
            postData("/postdata", {
                temp: data,
                date: newDate,
                content: feelings,
            }).then(() => {
                updateData();
            });
        });

    }

}

);