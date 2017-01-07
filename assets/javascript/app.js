mlbTeams = ["Orioles","Diamondbacks", "RedSox", "Braves", "WhiteSox",   "Cubs", "Indians", "Tigers", "Rockies", "Astros", "Dodgers", "Royals",  "Marlins", "Angels", "Brewers", "Twins", "Mets", "Yankees", "Phillies", "Athletics", "Pirates", "Mariners", "Padres", "Rays", "Giants", "Rangers", "Cardinals", "BlueJays", "Nationals"]

for (var i = 0; i < mlbTeams.length; i++) {
  var img = $("<img>");
        img.attr("src", "assets/images/" + mlbTeams[i]+ ".jpg");
        img.attr("alt", mlbTeams[i]);
  $('#logosHere').append(img)
}
 var selectedTeam, selectedState, selectedCity, queryTeam;
  $(".team").on("click", function(){
 
    $("#resultsTarget").empty();
     selectedTeam = $(".team").data().team
     selectedState= $(".team").data().state
     selectedCity= $(".team").data().city
     queryTeam = selectedCity + selectedTeam;
  });

  var espnURL = "https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=3ebf094d9f3c4221a56ceb144325c77f"

      $.ajax({
        url: espnURL,
        method: 'GET',
      })

      .done(function(headlines) { 
        
          console.log(headlines);
        })

var howLong = moment("20170402", "YYYYMMDD").fromNow(); 

var p = $("<p>");
        p.text(howLong);
  $('#openingDay').append(p)
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

  var searchFor = selectedCity + " " + selectedTeam;
    var numRecs = 6;

    var  appKey = "bd02f499a8474a05bd68ce25460bbc9f"
  
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";  
      url += "?api-key=" + appKey ;
      url += "&q=" +  queryTeam ;
   
      $.ajax({
        url: url,
        method: 'GET',
      })
      .done(function(results) { 
        
          console.log(results);
        })

    var espnURL = "https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=3ebf094d9f3c4221a56ceb144325c77f"

      $.ajax({
        url: espnURL,
        method: 'GET',
      })

      .done(function(headlines) { 
        
          console.log(headlines);
        })

});



  

