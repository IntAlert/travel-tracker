var remember = localStorage.getItem("remember");
console.log("R: " + remember);
var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/");
ref.onAuth(authDataCallback);

$(function() { //ON LOAD
    if (remember === "true") {
        var email = localStorage.getItem("remail"); //PULL EMAIL FROM LOCALSTORAGE
        $('input:checkbox[name=rememberme]').attr('checked',true); //SET JQUERYUI DIALOG ELEMENT
        $("#username").val(email); //SET FIELD TO EMAIL
    } else if (remember === "false") {
        $('input:checkbox[name=rememberme]').attr('checked',false); //SET JQUERYUI DIALOG ELEMENT
        $("#username").val(""); //CLEAR FIELD
    }
});

function authHandler(error, authData) {
    if (error) {
        console.log("Login Failed!", error);
    } else {
        console.log("Authenticated successfully:", authData);
        $( "#dialogLogin" ).dialog( "close" );
        plotTrips();
        plotSOS();
    }
}

function login(username, password) {
    rememberMe(username); //PASS USERNAME
    ref.authWithPassword({
        email    : username,
        password : password
    }, authHandler);
}

// Create a callback which logs the current auth state
function authDataCallback(authData) {
    if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        document.getElementById("navbardropdown").className = "dropdown-toggled"; //ENABLE DROPDOWN
        console.log("i also enabled");
        authHandler();
    }
}

function rememberMe(username) {
    if (document.getElementById("rememberme").checked === true) {
        console.log("REMEMBER EMAIL");
        localStorage.setItem("remember", "true"); //SET REMEMBER TO TRUE
        localStorage.setItem("remail", username); //SET REMEMBER EMAIL
    } else if (document.getElementById("rememberme").checked === false) {
        console.log("DONT REMEMBER EMAIL");
        localStorage.setItem("remember", "false"); //SET REMEMBER FALSE
        localStorage.setItem("remail", ""); //CLEAR REMEMBER EMAIL
    }
}