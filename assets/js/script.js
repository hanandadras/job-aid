var formEl = document.querySelector("#job-form");
var searchFormEl = document.querySelector("#search-form");
var searchHistory = [];
var response;
var data;

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
        // console.log(response);
        setResponse(response);
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
        // console.log(data);
        setData(data);
        
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

    saveSearch(searchHistory);
  // displaySearch();

    formEl.reset();
}

var saveSearch = function (searchObj) {
    localStorage.setItem("search", searchObj);
    console.log(searchObj);
}
 
// var displaySearch = function () {
//     searchObj = localStorage.getItem("search", JSON.stringify(searchObj));

//     for (var i = 0; i < searchArr.length; i++) {
//         var searchItemEl = document.createElement("button");
//         // searchItemEl.className = searchArr[i].searchObj.title;

//         searchItemEl.appendChild(searchFormEl);
//     }
// }

var setResponse = function(response) {
    var testing2 = response;
    console.log(testing2);
}

var setData = function(data) {
    var testing1 = data;
    console.log(testing1);
}


formEl.addEventListener("submit", formHandler);
