var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/trips");
ref.onAuth(authDataCallback);

// Create a callback which logs the current auth state
function authDataCallback(authData) {
    if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
        //UNAUTH JUST IN CASE AND REDIRECT
        ref.unauth();
        window.location="index.html";
//        console.log("Login Failed")
    }
}

function logout() {
    ref.unauth();
    window.location="index.html";
}

////////// DIALOG \\\\\\\\\\
$(function() {
    $( "#dialogTripAdded" ).dialog({
        autoOpen: false,
        modal: true,
        dialogClass: "dlg-no-close",
        buttons: {
            "Yes": function() {
                $( this ).dialog( "close" );
                window.location.reload();
                document.getElementById("tripdetails").reset();
            },
            "No": function() {
                $( this ).dialog( "close" );
                window.location = "index.html";
            }
        }
    });
});

////////// MAIN SCRIPTS \\\\\\\\\\
var myID = "";
var uName = "";
var contact = [];
var userid = "";
var uLastname = "";
//uemail = "";

var ref = new Firebase(("https://crackling-fire-1447.firebaseio.com/"));
var uemail = ref.getAuth().password.email;

function authDataCallback(authData) {
    if (authData) {
    myID = authData.uid;
//    myID = authData.uid.substring(12,16);
        console.log(myID);
    } 
}

//// Register the callback to be fired every time auth state changes
//var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/");
//ref.onAuth(authDataCallback);
//// Get a reference to our posts
//var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/contacts/");
//ref.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
//    var userid = snapshot.val();
//    uName = userid.name;
//    uLastname = userid.lastname;
//    sessionStorage.setItem("name", uName);
//    sessionStorage.setItem("lastname", uLastname);
//}, function (errorObject) {
//});


function addTrip() {            

    var leave = document.getElementById("startdate").value;
    var startDate = ($( "#startdate" ).datepicker( "getDate" )); //get date for event
    console.log(startDate);
//    userid = authData.uid
    var back = document.getElementById("enddate").value;
    var endDate = ($( "#enddate" ).datepicker( "getDate" )); //get date for event
    var destination = document.getElementById("countrydd").value;
    var mycontact = document.getElementById("contactdd").value;
    var name = sessionStorage.getItem("name");
    var lastname = sessionStorage.getItem("lastname");
    var tripType = document.getElementById("tripType").value;
//    var tripType = triptypevalue.options[triptypevalue.selectedIndex].value;
    console.log(tripType);
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
        lastname: lastname,
        triptype: tripType
    })
    
    var tripID = newTripsRef.key();
    sessionStorage.setItem("thistripid", tripID); //store tripid into session storage
    
    var called = false;
    
    if (!called) {
        window.alert("Trip Added");
        document.getElementById("tripdetails").reset();
        called = true;
    }
    
}



//function confirmation() {
//    $(document).ready(function() {
//			$('#button').click(function(e) { // Button which will activate our modal
//			   	$('#modal').reveal({ // The item which will be opened with reveal
//				  	animation: 'fade',                   // fade, fadeAndPop, none
//					animationspeed: 600,                       // how fast animtions are
//					closeonbackgroundclick: true,              // if you click background will modal close?
//					dismissmodalclass: 'close'    // the class of a button or element that will close an open modal
//				});
//			return false;
//			});
//		});
//}

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

