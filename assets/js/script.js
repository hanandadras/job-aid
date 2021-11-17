var formEl = document.querySelector("#job-form");
var searchHistory = [];

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

    titleInput = document.querySelector("input[name='job-title']").value;
    zipInput = document.querySelector("input[name='zip-code']").value;

    getAPI(titleInput);
    getZIP(zipInput);

    var searchObj = {
        title: titleInput,
        zip: zipInput
    };

    searchHistory.push(searchObj);

    saveTasks(searchHistory);

    formEl.reset();
}

var saveTasks = function (searchObj) {
    localStorage.setItem("search", searchObj);
    console.log(searchObj);
};

formEl.addEventListener("submit", formHandler);