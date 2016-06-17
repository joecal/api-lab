$(document).ready( function() {
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
})
 
