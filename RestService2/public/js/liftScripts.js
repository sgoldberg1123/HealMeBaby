//get all activites for a given user and load
//get all the meals for a user
var getAllUserLifts = function(){
    var data = {
    JWT: sessionStorage.token
    };
    $.post('/api/lift/all', data, function(res, status){
    if(res.status == 'FAILED'){
        console.log("Get lifts failed");
    }
    else{
        $("#LiftTableBody").empty();
        for(var i = 0; i<res.data.length; i++){
        var lift = res.data[i];
        var gymactivity_id = lift.gymactivity_id;
        var name = (lift.name) ? lift.name : "N/a";
        var reps = (lift.reps) ? lift.reps : "N/a";
        var weight = (lift.weight) ? lift.weight : "N/a";
        var days = (lift.days) ? lift.days : "N/a";
        var length = (lift.length) ? lift.length : "N/a";
        $("#LiftTableBody").append(
            `
            <tr>
                <td>${name}</td>
                <td>${reps}</td>
                <td>${weight}</td>
                <td>${days}</td>
                
                <td><button class="btn btn-warning btn-sm" data-toggle="tooltip" title="Edit This Lift" onclick="editLift(${gymactivity_id})"><span class="glyphicon glyphicon-pencil"></span></button></td>
                <td><button class="btn btn-danger btn-sm" data-toggle="tooltip" title="Delete This Meal" onclick="deleteLift(${gymactivity_id})"><span class="glyphicon glyphicon-remove"></span></button></td>
            </tr>
            `
        );
        }
    }
    });
};

//add a new activity item
var newLiftSubmit = function(){
  var data = {
    JWT: sessionStorage.token,
    name: $('#liftName')[0].value,
    reps: $('#reps')[0].value,
    weight: $('#weight')[0].value,
    days: $('#days')[0].value
  };
  if(data.days == "Sunday"){
      data.days = 1;
  }
  $.post('/api/lift/insert', data, function(res, status){
    if(res.status == 'FAILED'){
        console.log(data);
        console.log(res.error)
        console.log("Insert lift failed(liftScript.js)");
    }
    else{
      $('#addLiftModal').modal('hide');
      getAllUserLifts();
    }
  });
};

var editLift = function(gymactivity_id){
    $.post('/api/lift',
    {
        gymactivity_id: gymactivity_id,
        JWT: sessionStorage.token
    },
    function(res, status){
        var gymactivity = res.data;
        console.info(gymactivity);
        var name = (gymactivity.name) ? gymactivity.name : "";
        var reps = (gymactivity.reps) ? gymactivity.reps : "";
        var weight = (gymactivity.weight) ? gymactivity.weight : "";
        var days = (gymactivity.days) ? gymactivity.days : "";
        $("#editName").val(name);
        $("editReps").val(reps);
        $("editWeight").val(weight);
        $("editDays").val(days);
    });
};