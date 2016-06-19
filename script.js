$(window).load(function() {
  $('#ID-of-second-div').animate({opacity: 0 }, 4000, function(){
  });
    var both = $('#ID-of-second-div');
    both.click(function(){
    both.hide();
  });

});

function getISS () {
    $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
        var lat = data['iss_position']['latitude'];
        var lon = data['iss_position']['longitude'];
        var lat2 = Math.round(lat*10000000)/10000000.0;
        var lon2 = Math.round(lon*10000000)/10000000.0;
        console.log(lat2)
        console.log(lon2)
        setTimeout(5000);
            $.getJSON("https://www.geocode.farm/v3/json/reverse/?lat="+lat2+"&lon="+lon2+"&lang=en&count=1", function(data2) {
            var status = data2['geocoding_results']['STATUS']['status'];
            console.log(data2)
            setTimeout(5000);
            if (status == "FAILED, NO_RESULTS"){
              $('#isslat').html(lat2 + "&deg N");
              $('#isslon').html(lon2 + "&deg E");
            }
            else if (status == "SUCCESS" && data2['geocoding_results']['RESULTS'][0]['ADDRESS']['admin_1'] != "UNAVAILABLE"){
              var country = data2['geocoding_results']['RESULTS'][0]['ADDRESS']['country'];
              var admin1 = data2['geocoding_results']['RESULTS'][0]['ADDRESS']['admin_1'];
              console.log(country)
              console.log(admin1)
              $('#isslat').html(country);
              $('#isslon').html(admin1);
            }
            else {
              var country = data2['geocoding_results']['RESULTS'][0]['ADDRESS']['country'];
              console.log(country)
              $('#isslat').html(country);
            }
          });
    });
    setTimeout(getISS, 5000);
}
getISS();

var tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
		playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3};
var vid = [
			{'videoId': '3DBVIQgsX3A', 'startSeconds': 0, 'endSeconds': 240, 'suggestedQuality': 'hd720'},
		],
		randomvid = Math.floor(Math.random() * (vid.length - 1 + 1));

function onYouTubePlayerAPIReady(){
  tv = new YT.Player('tv', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
}

function onPlayerReady(){
  tv.loadVideoById(vid[randomvid]);
  tv.mute();
}

function onPlayerStateChange(e) {
  if (e.data === 1){
    $('#tv').addClass('active');
  } else if (e.data === 0){
    tv.seekTo(vid[randomvid].startSeconds)
  }
}

function vidRescale(){

  var w = $(window).width()+20,
    h = $(window).height()+20;

  if (w/h > 16/9){
    tv.setSize(w, w/16*9);
    $('.tv .screen').css({'left': '0px'});
  } else {
    tv.setSize(h/9*16, h);
    $('.tv .screen').css({'left': -($('.tv .screen').outerWidth()-w)/2});
  }
}

$(window).on('load resize', function(){
  vidRescale();
});

$('.hi span').on('click', function(){
  $('#tv').toggleClass('mute');
  if($('#tv').hasClass('mute')){
    tv.mute();
  } else {
    tv.unMute();
  }
});
