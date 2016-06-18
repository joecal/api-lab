$(window).load(function() {
  $('#ID-of-second-div').animate({opacity: 0 }, 4000, function(){
  });
    var both = $('#ID-of-second-div');
    both.click(function(){
    both.hide();
    callPlayer('player', 'playVideo');
  });

});

function apiCall() {
  $.ajax({
  url: "http://api.open-notify.org/iss-now.json?callback=?",
  type: "GET",
  dataType: "json"
}).done ( function(response){
    var lat = response.iss_position.latitude;
    var lon = response.iss_position.longitude;
    $('#isslat').html(Math.round(lat*1000)/1000.0);
    $('#isslon').html(Math.round(lon*1000)/1000.0);
    setTimeout(apiCall, 3000);
}).fail ( function (){
  console.log("fail");
})
}
apiCall();


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


// $(document).ready( function() {
//   function apiCall() {
//     $.ajax({
//     url: "https://www.geocode.farm/v3/json/reverse/?lat=47.9311632&lon=-99.3464880&lang=en&count=1",
//     type: "GET",
//     dataType: "json"
//   }).done ( function(response){
//     console.log(response.geocoding_results['RESULTS']ADDRESS)
//       var country = response.country;
//       var admin1 = response['admin_1'];
//       $('#isslat').html(country);
//       $('#isslon').html(admin1);
//       // setTimeout(apiCall, 3000);
//   }).fail ( function (){
//     console.log("fail");
//   })
// }
// apiCall();
// })
