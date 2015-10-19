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
    }
}

function buildCalendar(){
    var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/trips");
    ref.on('child_added', function(snapshot){
        var newTrip = snapshot.val();
        if (newTrip == "Do not delete"){
            return;
        }
        console.log(newTrip);
        //This sets up an empty array that will be filled with the data pulled from Firebase    
        var count = 0;
        var triggered = false;
        var trip = [];
        var myText = "";
        //This collect the individual values from Firebase       
        trip[count] = new Array;
        trip[count][1] = newTrip.destination;
        trip[count][2] = newTrip.leave;
        trip[count][3] = newTrip.back;
        trip[count][4] = snapshot.key();
        trip[count][5] = newTrip.contactlastname;
        trip[count][6] = newTrip.name +" " + newTrip.lastname;
        trip[count][7] = newTrip.contactemail;
        trip[count][8] = newTrip.contactphone;
        console.log(trip[count][2]);
        //  This block of code re-formats the date into a format that the calendar understands, i.e. the American format (...ugh)
        var newEvent = new Object();
        console.log("adding calendar");
        console.log(trip[count][6]);
        newEvent.title = trip[count][6];
        newEvent.start = parseDMY(trip[count][2]).toYMD();
        newEvent.end = parseDMY(trip[count][3]).toYMD();
        newEvent.allDay = true;
        newEvent.description = trip[count][1];
        newEvent.contact = trip[count][5];
        newEvent.newstart = trip[count][2];
        newEvent.newend = trip[count][3];
        newEvent.contactemail = trip[count][7];
        newEvent.contactphone = trip[count][8];
        console.log(trip[count][2]);
        console.log(parseDMY(trip[count][2]));
        $("#calendar").fullCalendar( 'renderEvent', newEvent, true );
        console.log(parseDMY(trip[count][2]).toYMD());
        count = count + 1;   
    });
}

// Create a callback to handle the result of the authentication
function authHandler(error, authData) {
    if (error) {
        console.log("Login Failed!", error);
    } else {
        console.log("Authenticated successfully with payload:");
        buildCalendar();
    }
}

// Get a reference to our posts
var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/contacts/");
    
// Attach an asynchronous callback to read the data at our posts reference
ref.orderByChild("email").equalTo('dlucas@international-alert.org').on("child_added", function(snapshot) {
    var userid = snapshot.val();
    console.log(userid);
    uName = userid.name;
    uLastname = userid.lastname;
    sessionStorage.setItem("name", uName);
    sessionStorage.setItem("lastname", uLastname);
    console.log(uName);
});
    
function ShowCustomDialog() {
    ShowDialogBox("Trip Information", "Record updated successfully.", "Ok", "", "GoToAssetList", null);
}

function ShowDialogBox(title, content, btn1text, btn2text, functionText, parameterList) {
    var btn1css;
    var btn2css;
    
    if (btn1text == "") {
        btn1css = "hidecss";
    } else {
        btn1css = "showcss";
    }

    if (btn2text == "") {
        btn2css = "hidecss";
    } else {
        btn2css = "showcss";
    }
    $("#lblMessage").html(content);

    $("#alertbox").dialog({
        resizable: false,
        title: title,
        modal: true,
        width: '400px',
        height: 'auto',
        bgiframe: false,
        hide: {
            effect: 'scale',
            duration: 400
        },
        buttons: [{
            text: btn1text,
                "class": btn1css,
            click: function () {
                $("#alertbox").dialog('close');
            }
        }]
    });
}

$(document).ready(function() {
    //this initializes the calendar
    console.log("I'm here!");
    var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/trips/");
    ref.on("child_added", function(snapshot) {
    var data = snapshot.val();
    var datakey = snapshot.key();           
        if ((typeof data.destination != 'undefined'), (typeof data.name != 'undefined'), (typeof data.lastname != 'undefined')){
            console.log(data.lastname);   
        }
        name = data.name +data.lastname;
        
        $('#calendar').fullCalendar({
			theme: true,
			header: {
				left: 'prev,next',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
            selectable: true,
            selectHelper: true,
			editable: true,
			eventLimit: true, // allow "more" link when too many events
            eventClick: function(calEvent, jsEvent, view){ //View event info onClick
                ShowDialogBox('Trip Information', '<b>Name:</b> ' + calEvent.title +'<br/>'+ '<b>Destination:</b> ' + calEvent.description +'<br/>'+ '<b>Start:</b> ' + calEvent.newstart +'<br/>'+ '<b>End:</b> ' + calEvent.newend +'<br/>'+ '<b>Contact:</b> ' + calEvent.contact +'<br/>'+ '<b>Contact Email:</b> ' + calEvent.contactemail +'<br/>'+ '<b>Contact Phone:</b> ' + calEvent.contactphone, 'Ok');  
            }
        });
    });
});

$(document).ready(function () {
    $('#btnTest').click(function () {
        ShowCustomDialog();
    });
});

function logout() {
    //LOGOUT
    console.log("LOGGING OUT");
    ref.unauth();
    window.location="index.html";
}