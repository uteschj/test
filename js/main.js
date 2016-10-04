 var destinationType; // sets the format of returned value
    var pushNotification;
    var daval;
    var davall;
    
 function pushRegistration()
 {
 	
 	pushNotification = window.plugins.pushNotification;
 	
        if ( device.platform == 'android' || device.platform == 'Android' )
{
    pushNotification.register(
        successHandler,
        errorHandler, {
            "senderID":"7160911895",
            "ecb":"onNotificationGCM"
        });
}
else
{
    pushNotification.register(
        tokenHandler,
        errorHandler, {
            "badge":"true",
            "sound":"true",
            "alert":"true",
            "ecb":"onNotificationAPN"
        });
}
 }
 
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
        alert("An error has occurred: Code = " + error.code);
    }
    
    function checkPreAuth() {
    var form = $("#loginForm");
    
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined && $('#checkbox-a').is(':checked')) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}
function stayloggedin() {
	//alert('starting');
	if ($('#checkbox-a').is(':checked')) {
		window.localStorage.setItem("autoLogin", 'checked');
		//alert('ischecked');
	}
	else
	{
	window.localStorage.setItem("autoLogin", '');
	//alert('Notchecked');
	}
}
function handleExpiredSession() {
    var u = window.localStorage["username"];
    var pass = hex_sha512($("#password", form).val());
    if(u !== '' && pass !== '') {
      console.log("ReAuthenticating");
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
        pushRegistration();
        return true;
        
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 alert('Could Not ReAuthenticate');
 return false;
    }
});

    } else {
        return false;
    }
    return false;
}

function handleLogin() {
    var form = $("#loginForm");    
    //alert('handlelogin');
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var pass = hex_sha512($("#password", form).val());
    //alert("click");
    if(u !== '' && pass !== '') {
      //alert("inside if u != ''");
      var formData = {email:u,p:pass}; //Array 
 
$.ajax({
    url : "https://totalsupply1.com/log_in/process_Applogin.php",
    type: "POST",
    data : formData,
    async: false,
    success: function(data, textStatus, jqXHR)
    {
        //data - response from server
        //alert(jqXHR);
        //alert(data);
        //pushRegistration();
       if (data !== 'login failed'){
        window.localStorage.setItem("webSessionID", data);
        window.localStorage.setItem("username", u);
        window.localStorage.setItem("password", $("#password", form).val());
        if ($('#checkbox-a').is(':checked')) {
	window.localStorage.setItem("autoLogin", 'checked');	
	}
        window.location.replace('home.html?loggedin=yes');
       }
       else
       {
       	//alert('Login Failed');
       	//$toast('Login Failed');
       	navigator.notification.alert(
    "Login Failed",
    callBackFunctionB, // Specify a function to be called 
    'Alert',
    "OK"
);
       }
        //jsessionID = data;
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 //alert('Loggin FAILd');
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
function tokenHandler (result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    //alert('device token = ' + result);
    //alert(device.platform);
     window.localStorage.setItem("pushID", result);
            console.log("regID = " + result);
            //alert("regID = " + e.regid);
            var davall = "" + result;
            davall = davall.trim();
            //alert(device.model);
            var ddevicename = "" + device.model;
            //alert(device.platform);
            var dplatform = "" + device.platform;
            //alert(device.uuid);
            var duuid = "" + device.uuid;
            //alert(device.version);
            var dversion = " " + device.version;
              var sesson = window.localStorage["username"];
     var formData = {email:sesson,ppushid:davall,devicename:ddevicename,platform:dplatform,uuid:duuid,version:dversion}; //Array 
 	//alert(davall);
$.ajax({
    url : "https://totalsupply1.com/log_in/process_push.php",
    type: "POST",
    data : formData,
    
    success: function(data, textStatus, jqXHR)
    {
//alert(data);
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 alert('Push update failed');
    }
    
});

}
function onNotificationGCM(e) {
    //("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
//alert(e.event);
    switch( e.event )
    {
    case 'registered':
        if ( e.regid.length > 0 )
        {
            //$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
             window.localStorage.setItem("pushID", e.regid);
            console.log("regID = " + e.regid);
            //alert("regID = " + e.regid);
            var davall = "" + e.regid;
            davall = davall.trim();
            //alert(device.model);
            var ddevicename = "" + device.model;
            //alert(device.platform);
            var dplatform = "" + device.platform;
            //alert(device.uuid);
            var duuid = "" + device.uuid;
            //alert(device.version);
            var dversion = " " + device.version;
              var sesson = window.localStorage["username"];
     var formData = {email:sesson,ppushid:davall,devicename:ddevicename,platform:dplatform,uuid:duuid,version:dversion}; //Array 
 	//alert(davall);
$.ajax({
    url : "https://totalsupply1.com/log_in/process_push.php",
    type: "POST",
    data : formData,
    
    success: function(data, textStatus, jqXHR)
    {
//alert(data);
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 alert('Push update failed');
    }
    
});

        }
    break;

    case 'message':
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if ( e.foreground )
        {
            //$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
		alert(e.payload.message);
            // if the notification contains a soundname, play it.
            var my_media = new Media("/android_asset/www/"+e.soundname);
            my_media.play();
            
        }
        else
        {  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart )
            {
            	alert(e.payload.message);
                //$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
            }
            else
            {
            	alert(e.payload.message);
                //$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }
        }
	
        //$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
        //$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
    break;

    case 'error':
        alert('<li>ERROR -> MSG:' + e.msg + '</li>');
    break;

    default:
        alert('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
    break;
  }
}

function getStatusSearchHistory() {
	searchHistoryReload();
	rochOrdersReload();
	webOrdersReload();
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
 //alert('Loggin FAILd');
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
        	var reauthenticatesuccess = handleExpiredSession();
        }
        else
        {
        if (data != "") {
        $('#searchHistory').html(data);
	}
        }
},
    error: function (jqXHR, textStatus, errorThrown)
    {
 //alert('Loggin FAILd');
    }
});
   
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
        	var reauthenticatesuccess = handleExpiredSession();
        }
        else
        {
        if (data != "<table border='1'></table>") {
        $('#webOrder').html(data);
        }
        }
        
       
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 //alert('Loggin FAILd');
    }
});

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
        	var reauthenticatesuccess = handleExpiredSession();
        }
        else
        {
        if (data != "<table border='1'></table>") {
        $('#rochOrder').html(data);
        }
        }
       
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 //alert('Loggin FAILd');
    }
});
    

}
    
function clearCache() {
    navigator.camera.cleanup();
}

    function takepicture(picturecode) {
      //alert('takepicture');
      if (picturecode == "zero")
      {

        navigator.camera.getPicture(uploadPhoto, onFail, { quality: 100,
        encodingType: navigator.camera.EncodingType.JPEG,
        destinationType: destinationType.FILE_URI,
        correctOrientation: true,
        saveToPhotoAlbum: true });

      }
      else if (picturecode == "A") {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhotoA, onFail, { quality: 100,
        encodingType: navigator.camera.EncodingType.JPEG,
        destinationType: destinationType.FILE_URI,
        correctOrientation: true,
        saveToPhotoAlbum: true });
      }
      else if (picturecode == "B") {
        // Retrieve image file location from specified source
       navigator.camera.getPicture(uploadPhotoB, onFail, { quality: 100,
        encodingType: navigator.camera.EncodingType.JPEG,
        destinationType: destinationType.FILE_URI,
        correctOrientation: true,
        saveToPhotoAlbum: true });
      }
      else if (picturecode == "C") {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhotoC, onFail, { quality: 100,
        encodingType: navigator.camera.EncodingType.JPEG,
        destinationType: destinationType.FILE_URI,
        correctOrientation: true,
        saveToPhotoAlbum: true });
      }
      else if (picturecode == "D") {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhotoD, onFail, { quality: 100,
        encodingType: navigator.camera.EncodingType.JPEG,
        destinationType: destinationType.FILE_URI,
        correctOrientation: true,
        saveToPhotoAlbum: true });
      }
      else if (picturecode == "E") {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhotoE, onFail, { quality: 100,
        encodingType: navigator.camera.EncodingType.JPEG,
        destinationType: destinationType.FILE_URI,
        correctOrientation: true,
        saveToPhotoAlbum: true });
      }
        
        
    }
    var retries = 0;
 function uploadPhoto(imageURI) {
      //clearCache();
      var vwin = function (r) {
        //clearCache();
        retries = 0;
        alert('Done!');
        getItem(jsitem);
        
    }
 
    var vfail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                uploadPhoto(imageURI)
            }, 1000)
        } else {
            retries = 0;
            //clearCache();
            alert('Ups. Something wrong happens!');
        }
    }
    
      var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";
        var params = new Object();
        params.itemNumber = jsitem;
        params.Delim = "None";
         var session = window.localStorage.getItem("webSessionID");
        params.email = window.localStorage["username"];
        params.p = hex_sha512(window.localStorage["password"]);
      
        options.params = params;
        options.headers = {
            Connection: "close"
            
        }
        options.chunkedMode = false;
        var ft = new FileTransfer();
        ft.upload(imageURI, "https://totalsupply1.com/log_in/AppItemupload.processor.php", vwin, vfail, options);
    
    
    }
    function uploadPhotoA(imageURI) {
     //clearCache();
      var vwin = function (r) {
        //clearCache();
        retries = 0;
        alert("Done!");
        getItem(jsitem);
        
    }
 
    var vfail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                uploadPhotoA(imageURI)
            }, 1000)
        } else {
            retries = 0;
            //clearCache();
            alert('Ups. Something wrong happens!');
        }
    }
    
      var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";
        var params = new Object();
        params.itemNumber = jsitem;
        params.Delim = "A";
         var session = window.localStorage.getItem("webSessionID");
        params.email = window.localStorage["username"];
        params.p = hex_sha512(window.localStorage["password"]);
        options.params = params;
        options.headers = {
            Connection: "close"
            
        }
        options.chunkedMode = false;
        var ft = new FileTransfer();
        ft.upload(imageURI, "https://totalsupply1.com/log_in/AppItemupload.processor.php", vwin, vfail, options);
    }
    function uploadPhotoB(imageURI) {
      //clearCache();
      var vwin = function (r) {
        //clearCache();
        retries = 0;
        alert('Done!');
        getItem(jsitem);
        
    }
 
    var vfail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                uploadPhotoB(imageURI)
            }, 1000)
        } else {
            retries = 0;
            //clearCache();
            alert('Ups. Something wrong happens!');
        }
    }
    
      var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";
        var params = new Object();
        params.itemNumber = jsitem;
        params.Delim = "B";
         var session = window.localStorage.getItem("webSessionID");
        params.email = window.localStorage["username"];
        params.p = hex_sha512(window.localStorage["password"]);
        options.params = params;
        options.headers = {
            Connection: "close"
        }
        options.chunkedMode = false;
        var ft = new FileTransfer();
        ft.upload(imageURI, "https://totalsupply1.com/log_in/AppItemupload.processor.php", vwin, vfail, options);
    }
    function uploadPhotoC(imageURI) {
      //clearCache();
      var vwin = function (r) {
        //clearCache();
        retries = 0;
        alert('Done!');
        getItem(jsitem);
        
    }
 
    var vfail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                uploadPhotoC(imageURI)
            }, 1000)
        } else {
            retries = 0;
            //clearCache();
            alert('Ups. Something wrong happens!');
        }
    }
    
      var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";
        var params = new Object();
        params.itemNumber = jsitem;
        params.Delim = "C";
         var session = window.localStorage.getItem("webSessionID");
        params.email = window.localStorage["username"];
        params.p = hex_sha512(window.localStorage["password"]);
        options.params = params;
        options.headers = {
            Connection: "close"
        }
        options.chunkedMode = false;
        var ft = new FileTransfer();
        ft.upload(imageURI, "https://totalsupply1.com/log_in/AppItemupload.processor.php", vwin, vfail, options);
    }
    function uploadPhotoD(imageURI) {
      //clearCache();
      var vwin = function (r) {
        //clearCache();
        retries = 0;
        alert('Done!');
        getItemD(jsitem);
    }
 
    var vfail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                uploadPhoto(imageURI)
            }, 1000)
        } else {
            retries = 0;
            //clearCache();
            alert('Ups. Something wrong happens!');
        }
    }
    
      var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";
        var params = new Object();
        params.itemNumber = jsitem;
        params.Delim = "D";
         var session = window.localStorage.getItem("webSessionID");
        params.email = window.localStorage["username"];
        params.p = hex_sha512(window.localStorage["password"]);
        options.params = params;
        options.headers = {
            Connection: "close"
        }
        options.chunkedMode = false;
        var ft = new FileTransfer();
        ft.upload(imageURI, "https://totalsupply1.com/log_in/AppItemupload.processor.php", vwin, vfail, options);
    }
    function uploadPhotoE(imageURI) {
      //clearCache();
      var vwin = function (r) {
        //clearCache();
        retries = 0;
        alert('Done!');
        getItem(jsitem);
    }
 
    var vfail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                uploadPhotoE(imageURI)
            }, 1000)
        } else {
            retries = 0;
            //clearCache();
            alert('Ups. Something wrong happens!');
        }
    }
    
      var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";
        var params = new Object();
        params.itemNumber = jsitem;
        params.Delim = "E";
         var session = window.localStorage.getItem("webSessionID");
        params.email = window.localStorage["username"];
        params.p = hex_sha512(window.localStorage["password"]);
        options.params = params;
        options.headers = {
            Connection: "close"
        }
        options.chunkedMode = false;
        var ft = new FileTransfer();
        ft.upload(imageURI, "https://totalsupply1.com/log_in/AppItemupload.processor.php", vwin, vfail, options);
    }    
    
 function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}    

function getItem(s) {
  //alert(s + ' ' + pagenumber);
     var session = window.localStorage.getItem("webSessionID");
     console.log(session);
      var formData = {sessionID:session,item:s}; //Array 
$.ajax({
    url : "https://totalsupply1.com/log_in/AppItem.php",
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
      //alert(data);
      if (data == "sessionExpire") {
        	var reauthenticatesuccess = handleExpiredSession();
        	getItem(s);
        }
        else
        {
        $('#itemlist').html(data);
        }
            },
    error: function (jqXHR, textStatus, errorThrown)
    {
 alert('Loggin FAILd');
    }
});

}

function GoBack() {
  window.location.replace('search.html?search='+jssearch+'&page='+jspage);
}
function handleSearch() {
    var form = $("#searchForm");    
    //alert('handleSearch');
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var s = $("#search", form).val();
    console.log("click");
     var session = window.localStorage.getItem("webSessionID");
     //alert(session);
     console.log(session);
      var formData = {sessionID:session,search:s}; //Array 
 
$.ajax({
    url : "https://totalsupply1.com/log_in/AppSearch.php",
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
        //alert(data);
        if (data == "sessionExpire") {
        	var reauthenticatesuccess = handleExpiredSession();
        	handleSearch();
        }
        else
        {
        $('#itemlist').html(data);
        }
        return false;
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 alert('Loggin FAILd');
    }
});
    
    return false;
}
function pagination(s, pagenumber) {
  //alert(s + ' ' + pagenumber);
     var session = window.localStorage.getItem("webSessionID");
     console.log(session);
      var formData = {sessionID:session,search:s,page:pagenumber}; //Array 
$.ajax({
    url : "https://totalsupply1.com/log_in/AppSearch.php",
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
      if (data == "sessionExpire") {
        	var reauthenticatesuccess = handleExpiredSession();
        	pagination(s, pagenumber);
        }
        else
        {
        $('#itemlist').html(data);
        }
        
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 alert('Loggin FAILd');
    }
});
    return false;
}
function toast(message) {
    var $toast = $('<div class="ui-loader ui-overlay-shadow ui-body-e ui-corner-all"><h3>' + message + '</h3></div>');

    $toast.css({
        display: 'block', 
        background: '#fff',
        opacity: 0.90, 
        position: 'fixed',
        padding: '7px',
        'text-align': 'center',
        width: '270px',
        left: ($(window).width() - 284) / 2,
        top: $(window).height() / 2 - 20
    });

    var removeToast = function(){
        $(this).remove();
    };

    $toast.click(removeToast);

    $toast.appendTo($.mobile.pageContainer).delay(2000);
    $toast.fadeOut(400, removeToast);
}
function callBackFunctionB(){
    console.log('ok');
}

function getRorder(s) {
  //alert(s + ' ' + pagenumber);
     var session = window.localStorage.getItem("webSessionID");
     console.log(session);
      var formData = {sessionID:session,cartid:s}; //Array 
$.ajax({
    url : "https://totalsupply1.com/log_in/AppROrder.php",
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
      //alert(data);
      if (data == "sessionExpire") {
        	var reauthenticatesuccess = handleExpiredSession();
        	getRorder(s);
        }
        else
        {
        $('#itemlist').html(data);
        }
            },
    error: function (jqXHR, textStatus, errorThrown)
    {
    	alert(textStatus);
    	alert(errorThrown);
 alert('Loggin FAILd');
    }
});

}
function scan() {
        console.log('scanning');
        
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) { 

            alert("We got a barcode\n" + 
            "Result: " + result.text + "\n" + 
            "Format: " + result.format + "\n" + 
            "Cancelled: " + result.cancelled);  

           console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
            document.getElementById("doc").val(result.text);
            console.log(result);
            /*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

        }, function (error) { 
            console.log("Scanning failed: ", error); 
        } );
    }
