var formEl = document.querySelector("#job-form");
var searchEl = document.querySelector("#recent-searches")
var searchHistory = [];

function getAPI(title, zip) {
    fetch("https://job-search4.p.rapidapi.com/linkedin/search?query=" + title + "&page=1", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "job-search4.p.rapidapi.com",
            "x-rapidapi-key": "7d3981e8bemsh702d01ad1635c18p10dd1fjsn83e5763a1078"
        }
    })
    .then(resp => resp.json())
    .then(response => {
        console.log(response);

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

            // var x = response.jobs.length;

            // console.log("Size of response: " + x);

            // var y = JSON.stringify(data[0].AreaCode);

            // console.log("Area Code: " + y);

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

// function getZIP(zip) {
//     fetch("https://us-zip-code-information.p.rapidapi.com/?zipcode=" + zip, {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "us-zip-code-information.p.rapidapi.com",
//             "x-rapidapi-key": "7d3981e8bemsh702d01ad1635c18p10dd1fjsn83e5763a1078"
//         }
//     })
//     .then(resp => resp.json())
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.error(err);
//     });   
// }

var formHandler = function(event) {
    event.preventDefault();

    titleInput = document.querySelector("input[name='job-title']").value;
    zipInput = document.querySelector("input[name='zip-code']").value;

    getAPI(titleInput, zipInput);
    // getZIP(zipInput);

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