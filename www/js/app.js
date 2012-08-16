// CHECK FOR INTERNET CONNECTION
function onLoad() {
  document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  checkConnection();  
  //add class for platform
  var devicePlatform = device.platform;
  $("html").addClass(devicePlatform);  
}

function checkConnection() {
  var networkState = navigator.network.connection.type;
  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.NONE]     = 'No network connection';
  if (states[networkState] == 'Unknown connection' || states[networkState] == 'No network connection'){
    alert('No internet connection detected. Check your connection and restart the app.');
    $('#buttons').html('<div class="nointernet">No internet connection detected. Check your connection and restart the app.</div>')
  }
}


function setContentHeight(){
  var winHeight = window.innerHeight;
  var headHeight = $('.active .header').height();
  if (headHeight == null){
    headHeight = 0;
  }
  else {
    $('.active .content').css('top', headHeight);
    $('.active .header').css('height', headHeight);
  }   
  var footHeight = $('.active .footer').height();
  if (footHeight == null){
    footHeight = 0;
  }
  else {
    $('.active .footer').css('height', footHeight);
  }  
  var conHeight = winHeight - headHeight - footHeight;
  $('.active .content').css('height', conHeight);
}