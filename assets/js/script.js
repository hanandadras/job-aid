var formEl = document.querySelector("#job-form");

function getAPI(title) {
    fetch("https://job-search4.p.rapidapi.com/monster/search?query=" + title + "&state=CA&page=1", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "job-search4.p.rapidapi.com",
            "x-rapidapi-key": "7d3981e8bemsh702d01ad1635c18p10dd1fjsn83e5763a1078"
        }
    })
    .then(resp => resp.json())
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
}

function getZIP(zip) {
    fetch("https://us-zip-code-information.p.rapidapi.com/?zipcode=" + zip, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "us-zip-code-information.p.rapidapi.com",
            "x-rapidapi-key": "7d3981e8bemsh702d01ad1635c18p10dd1fjsn83e5763a1078"
        }
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    });   
}

var formHandler = function(event) {
    event.preventDefault();

    title = document.querySelector("input[name='job-title']").value;

    getAPI(title);
    getZIP(95758);

    formEl.reset();
}

formEl.addEventListener("submit", formHandler);