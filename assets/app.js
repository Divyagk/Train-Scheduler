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
});













});