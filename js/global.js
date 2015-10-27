var isConnected = false;
var firebaseRef = new Firebase('https://crackling-fire-1447.firebaseio.com/');
firebaseRef.child('.info/connected').on('value', function(connectedSnap) {
  if (connectedSnap.val() === true) {
    isConnected = true;
  } else {
    isConnected = false;
  }
});

var isSMSWaiting = false;