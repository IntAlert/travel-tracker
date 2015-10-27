//Firebase = ("https://cdn.firebase.com/js/client/2.0.4/firebase.js");
var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/");

function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", 'lib/jquery.min.js')
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", 'fullcalendar.css')
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}
loadjscssfile("lib/moment.min.js", "js") //dynamically load and add this .js file
loadjscssfile("fullcalendar.js", "js")
loadjscssfile("https://cdn.firebase.com/js/client/2.0.4/firebase.js", "js")
loadjscssfile("/webvanta/js/jquery/1.3/plugins/fullcalendar/1.4.3/fullcalendar.min.js", "js")
//loadjscssfile("mystyle.css", "css") //dynamically load and add this .css file



//function authDataCallback(authData) {
//    console.log(authData)
//    if (authData) {
//        myID = authData.uid.substring(12,16);
//    } 
//} 
//ref.onAuth(authDataCallback);

// Create a callback to handle the result of the authentication
function authHandler(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}

// Or with an email/password combination
ref.authWithPassword({
email    : 'dlucas@international-alert.org',
password : '1'
}, authHandler);

ref.child('trips').on('child_added', function(snapshot){
    var trip = snapshot.val();
    console.log(trip)
});

var count = 0;
var triggered = false;
//var trip = [];
var myText = "";
var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/trips");
ref.on('value', function(snapshot) {
newTrip = snapshot.val();
trip[count] = new Array(6);
trip[count][1] = newTrip.destination;
trip[count][2] = newTrip.leave;
trip[count][3] = newTrip.back;
trip[count][4] = snapshot.key();
trip[count][5] = newTrip.contact;
trip[count][6] = newTrip.name, newTrip.lastname;
myText += 
    
    "<form value='displayTrip("+count+")' id='trips'><b>Name: </b>" + trip[count][6] + "<br><b>Destination: </b>" + trip[count][1] + "<br><b>Contact: </b>" + trip[count][5] + "<br><b>Departing: </b>" + trip[count][2] + "<br><b>Returning: </b>" + trip[count][3] + "</button>";
count = count + 1;
if(count>5 && triggered == false) {
    triggered = true;
    myText = '<form name="back" action="main.html"></form><br>' + myText;
}
document.getElementById("trip").innerHTML = myText;    
});
$('#calendar').fullCalendar({
           events: [
                                { 
                    
                    title: 'asdasdas',
                    start: 2015-02-01,
                    end: 2015-02-10
                },
                ]
});
var id = trip[1][6];
var destination = trip[1][1];
var start = trip[1][2];
var end = trip[1][3];
var contact = trip[1][5];
