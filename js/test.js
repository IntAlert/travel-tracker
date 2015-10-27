////////// MAIN SCRIPTS \\\\\\\\\\
var myID = "";
var uName = "";
var contact = [];
function authDataCallback(authData) {
    if (authData) {
    myID = authData.uid.substring(12,16);
    } 
}
// Register the callback to be fired every time auth state changes
//var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/");
//ref.onAuth(authDataCallback);
//// Get a reference to our posts
//var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/contacts/");
//var uemail = sessionStorage.getItem("email");
//ref.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
//    var userid = snapshot.val();
//    uName = userid.name;
//    uLastname = userid.lastname;
//    sessionStorage.setItem("name", uName);
//    sessionStorage.setItem("lastname", uLastname);
//});

var uemail = sessionStorage.getItem("email");

function addTrip() {            
//    if(isConnected === false) {
//        $( '#dialogNoSignal' ).dialog('open');
//        return;
//    }
    var leave = document.getElementById("startdate").value;
    var startDate = ($( "#startdate" ).datepicker( "getDate" )); //get date for event
    console.log(startDate);
    var back = document.getElementById("enddate").value;
    var endDate = ($( "#enddate" ).datepicker( "getDate" )); //get date for event
    var destination = document.getElementById("countrydd").value;
    var mycontact = document.getElementById("contactdd").value;
    var name = sessionStorage.getItem("name");
    var lastname = sessionStorage.getItem("lastname");
    var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/");
    var tripsRef = ref.child("trips");
    var newTripsRef = tripsRef.push({
        leave: leave,
        destination: destination,
        back: back,
        uid: myID,
        email: uemail,
        contact: mycontact,
        contactname: contact[mycontact][1],
        contactlastname: contact[mycontact][2],
        contactemail: contact[mycontact][3],
        contactphone: contact[mycontact][4],
        name: name,
        lastname: lastname
    }, function(){
            console.log("Creating Event");
            createEvent(startDate, endDate, destination, contact[mycontact][2],function(){});
            $( '#dialogTripAdded' ).dialog('open');
        });
    var tripID = newTripsRef.key();
    sessionStorage.setItem("thistripid", tripID); //store tripid into session storage
}

function contactdd() {
    var count = 1;
    var myText = "";
    var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/contacts");
    ref.on("child_added", function(snapshot) {
        newContact = snapshot.val();
        contact[count] = new Array(4);
        contact[count][1] = newContact.name;
        contact[count][2] = newContact.fullname;
        contact[count][3] = newContact.email;
        contact[count][4] = newContact.phone;
        select = document.getElementById("contactdd");
        var optn = document.createElement("OPTION");
        optn.text = contact[count][2] + " | " + contact[count][3];
        optn.value = snapshot.key();
        select.options.add(optn);
        count = count + 1; 
    });
}

function countrydd() {
    var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/Countries");
    ref.on("child_added", function(snapshot) {
        var countries = snapshot.val();
        select = document.getElementById("countrydd");
        var optn = document.createElement("OPTION");
        optn.text = countries;
        optn.value = snapshot.val();
        select.options.add(optn);
    });
}
$(function() {
    contactdd();
    countrydd();
});

$(document).ready(function(){
    $("#startdate").datepicker({
        minDate: 0,
        dateFormat: "dd/mm/yy",
        onSelect: function(selected) {
          $("#enddate").datepicker("option","minDate", selected)
        }
    });
    $("#enddate").datepicker({
        minDate: 0,
        dateFormat: "dd/mm/yy",
        onSelect: function(selected) {
           $("#startdate").datepicker("option","maxDate", selected)
        }
    }); 
});