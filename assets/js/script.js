var formEl = document.querySelector("#job-form");
var searchEl = document.querySelector("#search-results")
var recentSearchEl = document.querySelector("#recent-searches");
var searchStorage = JSON.parse(localStorage.getItem("search"));
var searchHistoryEl = document.querySelector("#searchId");
var searchHistory = [];

function getAPI(title, zip) {
    fetch("https://job-search4.p.rapidapi.com/linkedin/search?query=" + title + "&page=1", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "job-search4.p.rapidapi.com",
            "x-rapidapi-key": "7800f6ab27msh86ca571e1f81d0ep10babajsnd3809ee93354"
        }
    })
    .then(resp => resp.json())
    .then(response => {
        console.log(response);

        fetch("https://us-zip-code-information.p.rapidapi.com/?zipcode=" + zip, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "us-zip-code-information.p.rapidapi.com",
                "x-rapidapi-key": "7800f6ab27msh86ca571e1f81d0ep10babajsnd3809ee93354"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);

            var headerEl = document.querySelector("#results-header");
            headerEl.removeAttribute("hidden");

            for(var i = 0; i < response.jobs.length; i++) {

                // create div to hold task info and add to list item
                var searchInfoEl = document.createElement("div");
            
                // add HTML content to div
                searchInfoEl.innerHTML = "<div class='uk-card uk-card-default uk-card-body'><h3 class='uk-card-title'>" + response.jobs[i].title + "</h3>" + 
                "<a href='" + response.jobs[i].detail_url + "' target='_blank'>Job Posting</a><p>" + response.jobs[i].description + "</p><p>" + response.jobs[i].source + "</p></div>";
    
                searchEl.appendChild(searchInfoEl);
            }

        })
        .catch(err => {
            console.error(err);
        });


    })
    .catch(err => {
        console.error(err);
    });
}

var formHandler = function(event) {
    event.preventDefault();

    var titleInput = document.querySelector("input[name='job-title']").value;
    var zipInput = document.querySelector("input[name='zip-code']").value;
    var stateInput = document.querySelector("select[id='form-stacked-select']").value;


    getAPI(titleInput, zipInput);

    var searchObj = {
        title: titleInput,
        zip: zipInput,
        state: stateInput
    };

    searchHistory.push(searchObj);

    saveSearch(searchHistory);
    loadSearch();

    formEl.reset();
}

var saveSearch = function (search) {
    localStorage.setItem("search", JSON.stringify(search));
};

var loadSearch = function () {

    if(searchStorage != null) {
        
        var headerEl = document.querySelector("#recent-searches-header");
            headerEl.removeAttribute("hidden");

        for(var i = 0; i < searchStorage.length; i++) {    
            var recentSearchInfoEl = document.createElement("div");
            // recentSearchInfoEl.onclick='test()';
            // recentSearchInfoEl.addEventListener("click", test);

            var x = searchStorage[i].title;
            var y = searchStorage[i].zip;

            recentSearchInfoEl.innerHTML = "<div onclick='test()' class='uk-card uk-card-secondary uk-card-body' id='searchId'><h3 class='uk-card-title'>" + searchStorage[i].title + "</h3><p>" + searchStorage[i].zip + "</p></div>";

            // var stringTest = "#searchId" + i;

            // searchHistoryEl = document.querySelector(stringTest);

            recentSearchEl.appendChild(recentSearchInfoEl);

        }
    }
};

loadSearch();

var test = function() {
    console.log("You clicked the search history!");
    // getAPI(title,zip);
}

// if(searchHistoryEl != null) {
//     searchHistoryEl.addEventListener("click", test);
// }

formEl.addEventListener("submit", formHandler);