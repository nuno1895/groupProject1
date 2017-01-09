//declaring Global Variables
var selectedTeam, selectedState, selectedCity, queryTeam,timesTeamQuery, selectedTimesTeam ;
$("#resultsSectionId").hide();
$("#clearButton").hide();


var config = {
   apiKey: "AIzaSyB5CwFc0sgIaz5PNkMCPVvp9LWO6GClfNg",
   authDomain: "rcbgroup1.firebaseapp.com",
   databaseURL: "https://rcbgroup1.firebaseio.com",
   storageBucket: "rcbgroup1.appspot.com",
   messagingSenderId: "444807120694"
 };
 firebase.initializeApp(config);



///////////////////////////////////////////////////////////////////////////////////////////
// Countdown to Opening day Calculations
var daysToOD ,hoursToOD , minsToOD ,secsToOD, epochDelta, epochTimeNow ;
var p1 = $("<p class='countD'>Countdown To Opening Day - April 2, 2017</p><p class='countD'>First game starts in: </p>");
var p = $("<p class='countD'>");
  
  p.text(daysToOD + " days " + hoursToOD + " hours " + minsToOD + " minutes " + secsToOD + " seconds");
  $('#openingDay').append(p1);

function countDown(){
  var dateNow = new Date();
  var epochMilliSecs = dateNow.getTime();
  epochTimeNow = Math.floor(epochMilliSecs/1000);;
  var openingDayEpoch = 1491183000;

  epochDelta = openingDayEpoch - epochTimeNow;

   daysToOD = Math.floor(epochDelta / 86400) ;
   hoursToOD = Math.floor((epochDelta % 86400)/ 3600);
   minsToOD = Math.floor(((epochDelta % 86400) % 3600)/60);
   secsToOD = Math.floor((((epochDelta % 86400) % 3600) % 60));
 
  p = $("<p class='countD'>");
  p.text(daysToOD + " days " + hoursToOD + " hours " + minsToOD + " minutes " + secsToOD + " seconds");
  $('#openingDay').html(p1).append(p)
}

countDown();
setInterval(countDown, 1000);

if (epochDelta < 0){
  $('#openingDay').remove();
}
///////////////////////////////////////////////////////////////////////////////////////////
//start of button click function for favorite team
$(document).on("click", ".team" , function(){
  
  $("#resultsTarget").empty(); // Clear previous search result
  $("#resultsSectionId").show();
  $("#clearButton").show();
 
  selectedTeam = $(this).data("team")
  selectedState= $(this).data("state")
  selectedCity= $(this).data("city")
  selectedTimesTeam = $(this).data("teamtimes")
  timesTeamQuery = selectedTimesTeam.toLowerCase()
  queryTeam = selectedTeam;
  
  
  var stateId, startDate, endDate; //  initialize variables for search
  // 1) get content from the form
  
  startDate = $("#startDate").val();
  endDate = $("#endDate").val();
  startDate += "T00:00:00Z"
  endDate += "T00:00:00Z"
  
  // 2) build search query
  var API_key_value = "&apikey=OtZP0uNORyGGudirFRnAFeu6VJ6ix8Kq";
  
  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?"

  var ticketKey = "&keyword=" + selectedTeam + API_key_value;
  
  queryURL +=  ticketKey + "&classification=Baseball" ;
  // if (startDate == "" && endDate == ""){}
  
  // 3) Make Ajax call
  $.ajax({
    url: queryURL,
    method: "GET",
  })
  .done(function(response) {
    
    var eventsArray = response._embedded.events; // gets an array of articles
    
    
    // 1) create a target div to append each event to!
    var resultsContainer = $("<div>");
    // 2) loop through the array of articles & get key data
    for (var count1 = 0; count1 < eventsArray.length; count1++) {
      var name, eventUrl;
      var gameEvent = "GE" ;
      var gameDay = "GD";
      var gameTime= "GT";
      var event = eventsArray[count1];
      name = event.name;
      eventUrl = event.url; 
      startTime = event.dates.start.localTime ;
      localStartDate = event.dates.start.localDate;
      localStartDate = moment(localStartDate).calendar();
      gameEvent += count1;
      gameDay += count1;
      gameTime += count1;
      $("#event-table > tbody").append("<tr data-toggle='modal' data-target='#Modal1' class='gameRow'><td id=" + gameEvent + ">" + name + "</td><td id=" + gameDay +">" + localStartDate +"</td><td id=" + gameTime +">" +startTime + "</td></tr>");
    }
  });
  
//////////////////////////////////////////////////////////////////////////////////////////
///Clear Results Button
  $("#clearResults").on('click', function() {
    $("tbody").empty();
    $("#resultsTarget").empty();
  });


///////////////////////////////////////////////////////////////////////////////////////////
// NY Times Search
var qTerm =selectedCity + " " + selectedTeam;
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "bd02f499a8474a05bd68ce25460bbc9f",
  'q': qTerm,
  'fq': 'section_name:("Sports")',
  'sort': "newest"
});
  $.ajax({
    url: url,
    method: 'GET',
  })
  .done(function(object){
    var articlesArray = object.response.docs; // gets an array of articles
    // 1) create a target div to append each article to!
    

    if (articlesArray.length > 5){
      var numToPop = articlesArray.length - 5;
      for (var i = 0; i < numToPop; i++) {
       articlesArray.pop();
      }
    }
    
    var resultsContainer = $("<div id=articles>");
    
    // 2) loop through the array of articles & get key data
    articlesArray.forEach(function(article){
      // initialize variables
      var title, snippetText, date, articleURL, multimediaArray, thumbnailURL, dateFormat;
      // set variables
      title = article.headline.main;
      // snippetText = article.lead_paragraph;
      snippetText = article.snippet;
      date = article.pub_date;
      articleURL = article.web_url;
      multimediaArray = article.multimedia;
      thumbnailURL = undefined; // assume its not there first
      dateFormat = moment(date).format("MM/DD/YYYY h:m:s A");
      
      var articleWrapper = $("<div>").addClass("media col-sm-12");
      // 3b) check to see if article has a thumbnail image to addClass
      // and make the DOM if it exists
      if (multimediaArray.length !== 0){
        // assume now there is content here
        // loop through the array
        multimediaArray.forEach(function(media){
          if (media.subtype != ""){
            thumbnailURL = "https://static01.nyt.com/" + media.url;
          }
        }) // exits forEach loop
      }
      // 3b) cont. check to see if there is a thumbnailURL
      if (thumbnailURL){
        var mediaObject = $("<div>").addClass("media-left")
        .append( $("<img>")
        .addClass("media-object")
        .attr("src",thumbnailURL)
        );
        // .append( $("<a>").attr("href", articleURL) )
        articleWrapper.append(mediaObject);
      }

      // 3c) Get the main contents of the article
      
      var mediaBody = $("<div>").addClass("media-body")
      
      .append( $("<h4>").addClass("media-heading").text(title) )
      .append( $("<p>").text(snippetText) )
      .append( $("<p>").text(dateFormat) )
      .append( $("<a>").attr("href", articleURL)
      .attr("target", "_blank")
      .html("<p>Read More</p>") );
      articleWrapper.append(mediaBody);
      
      // 4) append to the resultsContainer
      resultsContainer.append(articleWrapper);
      
    }); // closes forEach
    
    //5) update the DOM with the results Container;
    $("#resultsTarget").append(resultsContainer);
    
  }) //closes .done() promise
  .fail(function(error){
    // console.log(error);
    $("#resultsTarget").append( $("<h4>").text("Sorry, could not load data.") );
  })

});


//////////////////////////////////////////////////////////////////////////////////////////
///Weather API
function runWeather() {
    var weatherQueryEpoch = (moment("1/15/2018 9:00").valueOf())/1000
    var weatherTimeDelta = weatherQueryEpoch-epochTimeNow;

      if (weatherTimeDelta <= 864000) {
          var weatherURL = "https://api.wunderground.com/api/517830656e79f22a/hourly10day/q/"
          $.ajax({
               url: weatherURL + selectedState + "/" + selectedCity + ".json",
               method: "GET",
                })
                 .done(function(weatherData) {
                    var weatherHour = Math.floor(weatherTimeDelta / 3600);
                    var tenDayForecast = weatherData;
                        tenDayForecast = tenDayForecast.hourly_forecast[weatherHour];
                          var temp = tenDayForecast.temp.english;
                          var feelsLike =tenDayForecast.feelslike.english;
                          var condition = tenDayForecast.wx;
                          var icon = tenDayForecast.icon_url;
                          var wind = tenDayForecast.wspd.english
                  })
          }
      else {
        var maxTemp , minTemp;
        var weatherURL = "https://api.wunderground.com/api/517830656e79f22a/history_"
        var lastYearDate = "20160115";
            weatherURL = weatherURL + lastYearDate + "/q/" + selectedState + "/" + selectedCity + ".json",
          $.ajax({
               url: weatherURL + lastYearDate + "/q/" + selectedState + "/" + selectedCity + ".json",
               method: "GET",
                })
                 .done(function(historicalWeather) {
                    var lastYearWeather = historicalWeather.history.dailysummary[0];
                    maxTemp = lastYearWeather.maxtempi ;
                    minTemp = lastYearWeather.mintempi ;

                })
      }
}
//////////////////////////////////////////////////////////////////////////////////////////
///Modal Section
$(document).on("click", ".gameRow" , function(){

 var printGame = this.childNodes[0].innerText;
 var printDate = this.childNodes[1].innerText;
 var printTime = this.childNodes[2].innerText
 $('#modalh2').text(printGame);
 $('#modalDate').text(printDate);
 $('#modalTime').text(printTime);
 runWeather();
});
