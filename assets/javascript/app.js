$("#buttonSearch").on("click", function(){
 
    $("#resultsTarget").empty(); // Clear previous search result

    var stateId, startDate, endDate; //  initialize variables for search
    // 1) get content from the form
  
    startDate = $("#startDate").val();
    endDate = $("#endDate").val();
    startDate += "T00:00:00Z"
    endDate += "T00:00:00Z"

    // 2) build search query
    var API_key_value = "&apikey=OtZP0uNORyGGudirFRnAFeu6VJ6ix8Kq";
    
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + selectedTeam + API_key_value;
    console.log(queryURL);

    // 3) Make Ajax call
    $.ajax({
      url: queryURL,
      method: "GET",
    })
    .done(function(response) {

      var eventsArray = response._embedded.events; // gets an array of articles
        console.log(eventsArray);

      // 1) create a target div to append each event to!
        var resultsContainer = $("<div>");
      // 2) loop through the array of articles & get key data
        eventsArray.forEach(function(event){
      // initialize variables
        var name, eventUrl;
      // set variables
        name = event.name;
        url = event.url
        startTime = event.dates.start.localTime
        localStartDate = event.dates.start.localDate
        
       
        $("#event-table > tbody").append("<tr><td>" + name + "</td><td>" + localStartDate + "</td><td>" + startTime + "</td><td>" + "</td></tr>");
          });

    }); 
    var weatherURL = "https://api.wunderground.com/api/517830656e79f22a/hourly10day/q/"
    $.ajax({
      url: weatherURL + selectedState + "/" + selectedCity + ".json",
      method: "GET",
    })
    
    .done(function(weatherData) {
      console.log(weatherData)
     });

var searchFor = $('#sTerm')[0].value
    var numRecs = 6;

    var  appKey = "bd02f499a8474a05bd68ce25460bbc9f"
  
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";  
      url += "?api-key=" +appKey ;
      url += "&q=" +  queryTeam ;
   
      $.ajax({
        url: url,
        method: 'GET',
      })
      .done(function(results) { 
        
          console.log(results);

        })

});



  

