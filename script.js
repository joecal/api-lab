$(window).load(function() {
  $('#fadeDiv').animate({opacity: 0 }, 3000).fadeOut(1000);
});

function getISS () {
    $.getJSON('https://api.open-notify.org/iss-now.json?callback=?', function(data) {
        var lat = data['iss_position']['latitude'];
        var lon = data['iss_position']['longitude'];
        var lat2 = Math.round(lat*10000000)/10000000.0;
        var lon2 = Math.round(lon*10000000)/10000000.0;
            $.getJSON("https://www.geocode.farm/v3/json/reverse/?lat="+lat2+"&lon="+lon2+"&lang=en&count=1", function(data2) {
              console.log(data2)
            var status = data2['geocoding_results']['STATUS']['status'];
            if (status == "FAILED, NO_RESULTS"){
              $('#isslat').html(lat2 + "&deg N, ");
              $('#isslon').html(lon2 + "&deg E");
            }
            else if (status == "SUCCESS" && data2['geocoding_results']['RESULTS'][0]['ADDRESS']['admin_1'] != "UNAVAILABLE"){
              var country = data2['geocoding_results']['RESULTS'][0]['ADDRESS']['country'];
              var admin1 = data2['geocoding_results']['RESULTS'][0]['ADDRESS']['admin_1'];
              $('#isslat').html(country + ", ");
              $('#isslon').html(admin1);
            }
            else {
              var country = data2['geocoding_results']['RESULTS'][0]['ADDRESS']['country'];
              $('#isslat').html(country);
              $('#isslon').html("");
            }
          });
    });
    setTimeout(getISS, 5000);
}
getISS();
