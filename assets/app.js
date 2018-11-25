$(document).ready(function(){
    var config = {
    apiKey: "AIzaSyDuxFJKGiqu5_42_q03l09hftlwgdPIN40",
    authDomain: "bootcamp-cdeef.firebaseapp.com",
    databaseURL: "https://bootcamp-cdeef.firebaseio.com",
    projectId: "bootcamp-cdeef",
    storageBucket: "bootcamp-cdeef.appspot.com",
    messagingSenderId: "1056053592800"
  };
  firebase.initializeApp(config);
  
var database = firebase.database();
var name;
var destination;
var firstTrain;
var frequency = 0;

$("#add-train-btn").on("click", function() {
    event.preventDefault();
    // Storing and retreiving new train data
    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

    // Pushing to database
    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    $("form")[0].reset();


    database.ref().on("child_added", function(childSnapshot) {
        var nextArr;
        var minAway;
      // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
        // Difference between the current and firstTrain
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % childSnapshot.val().frequency;
        // Minutes until next train
        var minAway = childSnapshot.val().frequency - remainder;
        // Next train time
        var nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");

        $("#add-row").append("<tr><td>" + childSnapshot.val().name +
                "</td><td>" + childSnapshot.val().destination +
                "</td><td>" + childSnapshot.val().frequency +
                "</td><td>" + nextTrain + 
                "</td><td>" + minAway + "</td></tr>");

            // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
    });
});













});