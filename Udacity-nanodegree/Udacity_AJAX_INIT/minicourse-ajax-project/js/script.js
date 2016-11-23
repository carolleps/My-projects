
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var addressText = street + ", " + city;
    $greeting.text('So you\'ll like to live at ' + addressText);

    var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + addressText;

    $body.append('<img class="bgimg" src="' + streetViewUrl + '">');

    // load NY Times
    var nyTimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nyTimesUrl += '?' + $.param({
      'api-key': "d1d12903dc14a3facff4768ab684467",
      'q': city,
      'sort': "newest"
    });
    $.ajax({
      url: nyTimesUrl,
      method: 'GET',
    }).done(function(result) {
        $nytHeaderElem.text('New York Times articles about ' + city);
        var articles = result.response.docs;
        for (var i=0; i < articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class="article"><a href="' + article.web_url +'">'+ article.headline.main +'<a><p>'+ article.snippet +'</p></li>');
    }
    }).fail(function(err) {
      $nytHeaderElem.text('Sorry, New York Times articles about ' + city + ' could not be loaded');
      throw err;
    });

    //load wikipedia
    var wikiUrl = 'https://en.wikipedias.org/w/api.php?action=opensearch&search=' + city + ' &format=json&callback=wikiCallback';
    $.ajax({
      url: wikiUrl,
      // method: 'GET'
      dataType: "jsonp"
    }).done(function(response) {
        var articlesList = response[1];
        for (var i=0; i < articlesList.length; i++){
            var articleStr = articlesList[i];
            var url = 'https://en.wikipedia.org/wiki/' + articleStr;
            $wikiElem.append('<li class="wikipedia"><a href="' + url +'">'+ articleStr +'<a></li>');
        }
        clearTimeout(wikiRequestTimeout);
      });

    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text('Sorry, wikipedia articles for ' +city+ ' can\'t be loaded')
    }, 8000);


    return false;
};

$('#form-container').submit(loadData);
