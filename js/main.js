    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }


    function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        alert(r.response);
    }

    function fail(error) {
        alert("An error has occurred: Code = " = error.code);
    }
    
    function checkPreAuth() {
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
    var form = $("#loginForm");    
    //alert('handlelogin');
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var pass = hex_sha512($("#password", form).val());
    console.log("click");
    if(u != '' && pass!= '') {
      console.log("inside if u != ''");
      var formData = {email:u,p:pass}; //Array 
 
$.ajax({
    url : "https://totalsupply1.com/log_in/process_Applogin.php",
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
        //data - response from server
        //alert(jqXHR);
        //alert(data);
        window.localStorage.setItem("webSessionID", data);
        window.localStorage.setItem("username", u);
        window.localStorage.setItem("password", $("#password", form).val());
        window.location.replace('home.html');
        //jsessionID = data;
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 alert('Loggin FAILd');
    }
});

    } else {
        //Thanks Igor!
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}


   // result contains any message sent from the plugin call
function successHandler (result) {
    //alert('result = ' + result);
}

// result contains any error description text returned from the plugin call
function errorHandler (error) {
    alert('error = ' + error);
}
function onNotificationGCM(e) {
    $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

    switch( e.event )
    {
    case 'registered':
        if ( e.regid.length > 0 )
        {
            $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
            console.log("regID = " + e.regid);
            //alert("regID = " + e.regid);
            davall = "" + e.regid;
              var sesson = window.localStorage["username"];
     var formData = {email:sesson,ppushid:davall}; //Array 
 	//alert(davall);
$.ajax({
    url : "https://totalsupply1.com/log_in/process_push.php",
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {

    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 //alert('Loggin FAILd');
    }
});

        }
    break;

    case 'message':
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if ( e.foreground )
        {
            $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

            // if the notification contains a soundname, play it.
            var my_media = new Media("/android_asset/www/"+e.soundname);
            my_media.play();
        }
        else
        {  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart )
            {
                $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
            }
            else
            {
                $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }
        }

        $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
        $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
    break;

    case 'error':
        $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
    break;

    default:
        $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
    break;
  }
}

    // Called when a photo is successfully retrieved
    //
     function getStatusSearchHistory() {
	searchHistoryReload();
	rochOrdersReload();
	webOrdersReload()
 	setTimeout("getStatusSearchHistory()",40000);
}
function sendCord(pos) {
	//alert(pos.coords.latitude);
	//alert(pos.coords.longitude);
   var lolat = pos.coords.latitude;
   var lolong = pos.coords.longitude;
   var loemail = window.localStorage["username"];
   var formData = {email:loemail,long:lolong,lat:lolat}; //Array 
 
$.ajax({
    url : "https://totalsupply1.com/log_in/process_location.php",
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
        //alert(data);
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
    	//alert(errorThrown);
    }
});
}
function googlepush(pushiid) {
    console.log("click");
     var sesson = 'justin';
     alert(session);
     console.log(session);
      var formData = {email:sesson,ppushid:pushiid}; //Array 
 
$.ajax({
    url : "https://totalsupply1.com/log_in/process_push.php",
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
        alert(data);
       
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 alert('Loggin FAILd');
    }
});
    
    return false;
}

function searchHistoryReload() {
    console.log("click");
     var session = window.localStorage.getItem("webSessionID");
     //alert(session);
     console.log(session);
      var formData = {sessionID:session}; //Array 
 
$.ajax({
    url : "https://totalsupply1.com/log_in/AppAutoReloadHistory.php",
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
        //alert(data);
        if (data == "sessionExpire") {
        	window.location.replace('index.html');
        }
        if (data != "") {
        $('#searchHistory').html(data);
	}
},
    error: function (jqXHR, textStatus, errorThrown)
    {
 alert('Loggin FAILd');
    }
});
    return false;
}

function webOrdersReload() {
    console.log("click");
     var session = window.localStorage.getItem("webSessionID");
     //alert(session);
     console.log(session);
      var formData = {sessionID:session}; //Array 
 
$.ajax({
    url : "https://totalsupply1.com/log_in/AppAutoReloadQuotes.php",
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
        //alert(data);
        if (data == "sessionExpire") {
        	window.location.replace('index.html');
        }
        if (data != "<table border='1'></table>") {
        $('#webOrder').html(data);
        }
        
       
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 alert('Loggin FAILd');
    }
});
    
    return false;
}
    

function rochOrdersReload() {
    console.log("click");
     var session = window.localStorage.getItem("webSessionID");
     //alert(session);
     console.log(session);
      var formData = {sessionID:session}; //Array 
 
$.ajax({
    url : "https://totalsupply1.com/log_in/AppAutoReloadOrders.php",
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
        //alert(data);
        if (data == "sessionExpire") {
        	window.location.replace('index.html');
        }
        if (data != "<table border='1'></table>") {
        $('#rochOrder').html(data);
        }
       
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 alert('Loggin FAILd');
    }
});
    
    return false;
}
    

