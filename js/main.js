function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);
      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');
      // Unhide image elements
      //
      smallImage.style.display = 'block';
      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }
    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);
      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');
      // Unhide image elements
      //
      largeImage.style.display = 'block';
      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }
    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }
    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }
    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }
    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }
    function getImage() {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhoto, function(message) {
alert('get picture failed');
},{
quality: 50,
destinationType: navigator.camera.DestinationType.FILE_URI,
sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
}
        );
alert('done with getimage');
    }

    function uploadPhoto(imageURI) {
      alert('start of uploadPhto');
        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";

        var params = new Object();
        params.value1 = "test";
        params.value2 = "param";

        options.params = params;
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imageURI, "http://192.168.254.15/uploadtester.php", win, fail, options);
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
    //alert(u);
    var pass = hex_sha512($("#password", form).val());
    //alert(pass);
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

function testSession() {
  alert('sessionid ' + window.localStorage.getItem("webSessionID"))
  var formData = {sessionID:window.localStorage.getItem("webSessionID")}; //Array 
  $.ajax({
    url : "https://totalsupply1.com/log_in/testsession.php",
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
        //data - response from server
        //alert(jqXHR);
        alert(data);
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 alert('FAILd');
 alert(jqXHR);
 alert(textStatus);
 alert(errorThrown);
    }
});
}




