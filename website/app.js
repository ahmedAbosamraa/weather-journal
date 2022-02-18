/* Global Variables */
const apiKey = '6cb1b64495f21d8d3c7123ebb3e3755b&units=metric';
let date = document.getElementById('date');
let temp = document.getElementById('temp');
let cont = document.getElementById('content');
const feelings = document.getElementById('feelings');
const zipCode = document.getElementById('zip');
let temperature;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
const btn = document.querySelector("#generate");
btn.addEventListener('click', async () => {

    console.log(zipCode.value);

    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&appid=${apiKey}`;


    const getData = async function () {
        try {
            const apiRes = await fetch(url);
            console.log(apiRes);
            const res = await apiRes.json();
            temperature = res.main.temp;
            console.log(temperature);
            return temperature
        } catch (error) {

            console.log("error in get", error);
        }
    };


    //post

    const postData = async (url = '', data = {}) => {
        console.log('data');
        console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            // Body data type must match "Content-Type" header        
            body: JSON.stringify(data),
        });

        try {
            const newData = await response.json();
            console.log(newData);
            return newData;
        } catch (error) {
            console.log("error", error);
        }
    }



    const updateData = async () => {
        const request = await fetch('/getdata');
        console.log(newDate)
        console.log(request)
        try {
            // Transform into JSON
            const allData = await request.json()
            console.log(allData)
            // Write updated data to DOM elements
            temp.innerHTML = allData.temp + ' degrees';
            content.innerHTML = allData.content;
            date.innerHTML = allData.date;
        }
        catch (error) {
            console.log("error", error);

        }
    }


    if (!zipCode.value) {
        alert("please enter the zip code");
        console.log(zipCode.value);
    } else {
        getData().then((d) => {
            console.log(d);
            postData("/postdata", {
                temp: temperature,
                date: newDate,
                content: feelings.value,
            }).then(() => {
                updateData();
            });
        });

    }

}

);