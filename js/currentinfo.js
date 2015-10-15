////////// DIALOG \\\\\\\\\\
$(function() {
    $( "#dialogError" ).dialog({
        autoOpen: false,
        modal: true,
        dialogClass: "dlg-no-close",
        buttons: {
            "OK": function() {
                $( this ).dialog( "close" );
            }
        }
    });
});


////////// MAIN SCRIPTS \\\\\\\\\\
var myID = ""; // THIS IS GLOBAL!!!!!!!!!
var uName = "";
var email = sessionStorage.getItem("email");
function authDataCallback(authData) {
    if (authData) {
    myID = authData.uid.substring(12,16);
    } 
}  
// Register the callback to be fired every time auth state changes
var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/");
ref.onAuth(authDataCallback);

var count = 0;
var triggered = false;
var trip = [];
var myText = "";
var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/trips");
ref.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
newTrip = snapshot.val();
trip[count] = new Array(4);
trip[count][1] = newTrip.destination;
trip[count][2] = newTrip.leave;
trip[count][3] = newTrip.back;
trip[count][4] = snapshot.key();
myText += "<button onClick='displayTrip("+count+")' id='trips'><b>Destination: </b>" + trip[count][1] + "<br><b>Departing: </b>" + trip[count][2] + "<br><b>Returning: </b>" + trip[count][3] + "</button>";
count = count + 1;
if(count>5 && triggered == false) {
    triggered = true;
    myText = '<form name="back" action="main.html"><input class="backbutton" type="submit" value="Back"></form><br>' + myText;
}
document.getElementById("trip").innerHTML = myText;    
});

function displayTrip(count) {
    if(typeof(Storage) !== "undefined") {
        sessionStorage.setItem("thistripid", trip[count][4]);
        window.location = "mytrip.html";
    } else {
        $( "#dialogError" ).dialog( "open" );
    }
}

function createEvent(startDate, endDate, destination, uName) {
                var id = uName;
                var title = destination;
                var start = startDate;
                var end = endDate;
            };