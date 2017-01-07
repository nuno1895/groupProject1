
 var selectedTeam, selectedState, selectedCity, queryTeam;
  $(".team").on("click", function(){
 
    $("#resultsTarget").empty();
     selectedTeam = $(".team").data().team
     selectedState= $(".team").data().state
     selectedCity= $(".team").data().city
     queryTeam = selectedCity + selectedTeam;
  });

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
        
        // console.log("outside function", localStartDate);

        // var weatherURL = "https://api.wunderground.com/api/517830656e79f22a/hourly10day/q/"

        // $.ajax({
        //   url: weatherURL + selectedState + "/" + selectedCity + ".json",
        //   method: "GET",
        // })
            
        // .done(function(weatherData) {
        //     //console.log("test for weather: " , localStartDate);

        //     //console.log(weatherData);
        //     console.log(weatherData.hourly_forecast)
        // });
        
       
        $("#event-table > tbody").append("<tr><td>" + name + "</td><td>" + localStartDate + "</td><td>" + startTime + "</td><td>" + "</td></tr>");
          });



    }); 
      
    var numRecs = 5;

    var  appKey = "bd02f499a8474a05bd68ce25460bbc9f"
  
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";  
      url += "?api-key=" + appKey ;
      url += "&q=" +  queryTeam ;
   
      $.ajax({
        url: url,
        method: 'GET',
      })
      .done(function(object){
         var articlesArray = object.response.docs; // gets an array of articles
         // 1) create a target div to append each article to!
         console.log(articlesArray)
         var resultsContainer = $("<div id=articles>");
         // 2) loop through the array of articles & get key data
         articlesArray.forEach(function(article){
           // initialize variables
           var title, snippetText, date, articleURL, multimediaArray, thumbnailURL;
           // set variables
           title = article.headline.main;
           // snippetText = article.lead_paragraph;
           snippetText = article.snippet;
           date = article.pub_date;
           articleURL = article.web_url;
           multimediaArray = article.multimedia;
           thumbnailURL = undefined; // assume its not there first

         var articleWrapper = $("<div>").addClass("media col-sm-12");
         // 3b) check to see if article has a thumbnail image to addClass
         // and make the DOM if it exists
         if (multimediaArray.length !== 0){
           // assume now there is content here
           // loop through the array
           multimediaArray.forEach(function(media){
             if (media.subtype === "thumbnail"){
               // console.log(this); // window!!
               // console.log(media);
               // debugger;
               thumbnailURL = media.url;
             }
           }) // exits forEach loop
         }
         // 3b) cont. check to see if there is a thumbnailURL
         if (thumbnailURL){
           var mediaObject = $("<div>").addClass("media-left")
                                       .append( $("<img>")
                                         .addClass("media-object")
                                         .attr("src", NYT_URL + thumbnailURL)
                                       );
                                       // .append( $("<a>").attr("href", articleURL) )
           articleWrapper.append(mediaObject);
         }



         // 3c) Get the main contents of the article
         
         var mediaBody = $("<div>").addClass("media-body")
      
                       .append( $("<h4>").addClass("media-heading").text(title) )
                       .append( $("<p>").text(snippetText) )
                       .append( $("<p>").text(date) )
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

$('#articles').children()[5].style.display = "none"
$('#articles').children()[6].style.display = "none"
$('#articles').children()[7].style.display = "none"





  

