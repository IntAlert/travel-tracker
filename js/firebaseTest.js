var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/");

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
            
            var startDate = ($( "#leave" ).datepicker( "getDate" )); //get date for event
            var endDate = ($( "#back" ).datepicker( "getDate" )); //get date for event
            var destination = document.getElementById("destination").value;
            var name = sessionStorage.getItem("name");
            var lastname = sessionStorage.getItem("lastname");
            var mycontact = document.getElementById("contactdd").value;
            var ref = new Firebase("https://crackling-fire-1447.firebaseio.com/");
            var tripsRef = ref.child("trips");
            var newTripsRef = tripsRef.push({
                destination: destination,
                contact: mycontact,
                contactname: contact[mycontact][1],
                contactlastname: contact[mycontact][2],
                name: name,
                lastname: lastname
            }, function(){
                createEvent(startDate, endDate, destination, contact[mycontact][2]);
                 });
            var tripID = newTripsRef.key();

            function createEvent(startDate, endDate, destination, name, lastname) {
                var id = name +lastname;
                var title = destination;
                var start = startDate;
                var end = endDate;
            };