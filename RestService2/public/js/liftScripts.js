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
        console.info(res.data);
        $("#LiftTableBody").empty();
        for(var i = 0; i<res.data.length; i++){
        var lift = res.data[i];
        var gymactivity_id = lift.gym_activity_id;
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
  console.info('Before ' +data.days);
  if(data.days == 'Sunday'){
      data.days = "1000000";
  }
  else if (data.days == 'Monday') {
      data.days = "0100000";
  }
  else if(data.days == 'Tuesday') {
      data.days = "0010000";
  }
  else if(data.days == 'Wednesday'){
      data.days = "0001000";
  }
  else if(data.days == 'Thursday'){
      data.days = "0000100";
  }
  else if(data.days == 'Friday'){
      data.days = "0000010";
  }
  else if(data.days == 'Saturday'){
      data.days = "0000001";
  }
  console.info('AFter ' +data.days);
  $.post('/api/lift/insert', data, function(res, status){
    if(res.status == 'FAILED'){
        console.log(data);
        console.log(res.error);
        console.log("Insert lift failed(liftScript.js)");
    }
    else{
        console.info(data);
      $('#addLiftModal').modal('hide');
      getAllUserLifts();
      liftCalendar();
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
        var id = gymactivity.gym_activity_id;
        var name = (gymactivity.name) ? gymactivity.name : "";
        var reps = (gymactivity.reps) ? gymactivity.reps : "";
        var weight = (gymactivity.weight) ? gymactivity.weight : "";
        var days = (gymactivity.days) ? gymactivity.days : "";
        console.info("id", id);
        $("#editName").val(name);
        $("#editReps").val(reps);
        $("#editWeight").val(weight);
        $("#editDays").val(days);
        $("#editLiftId").val(id);
        $("#editLiftModal").modal('show');
    });
};

//Submit the edited activity form
var editLiftSubmit = function(){
  var data = {
    JWT: sessionStorage.token,
    gymactivity_id: parseInt($('#editLiftId')[0].value),
    name: $('#editName')[0].value,
    reps: $('#editReps')[0].value,
    weight: $('#editWeight')[0].value,
    days: $('#editDays')[0].value
  };
  if(data.days == 'Sunday'){
      data.days = "1000000";
  }
  else if (data.days == 'Monday') {
      data.days = "0100000";
  }
  else if(data.days == 'Tuesday') {
      data.days = "0010000";
  }
  else if(data.days == 'Wednesday'){
      data.days = "0001000";
  }
  else if(data.days == 'Thursday'){
      data.days = "0000100";
  }
  else if(data.days == 'Friday'){
      data.days = "0000010";
  }
  else if(data.days == 'Saturday'){
      data.days = "0000001";
  }
  console.info(data);
  $.post('/api/lift/update', data, function(res, status){
    if(res.status == 'FAILED'){
      console.log("Update lift failed");
      console.info(res.error);
    }
    else{
      $('#editLiftModal').modal('hide');
      getAllUserLifts();
      liftCalendar();
    }
  });
};

//delete a meal
var deleteLift = function(gymactivityId){
    $.post('/api/lift/delete',
    {
      gymactivity_id: gymactivityId,
      JWT: sessionStorage.token
    },
    function(res, status){
      if(res.status == 'FAILED'){
        console.log("Get Lifts failed");
        console.log(res.error);
      }
      else{
          getAllUserLifts();
          liftCalendar();
      }
    });
};

var liftCalendar = function(){
    var data = {
    JWT: sessionStorage.token
    };
    $.post('/api/lift/all', data, function(res, status){
    if(res.status == 'FAILED'){
        console.log("Get lifts failed");
    }
    else{
        console.info(res.data);
        for(var i = 0; i<res.data.length; i++){
            var lift = res.data[i];
            var gymactivity_id = lift.gym_activity_id;
            var name = (lift.name) ? lift.name : "N/a";
            var days = (lift.days) ? lift.days : "N/a";
            if( days == "1000000"){
                $("#SunCal").append(`<h3>${name}</h3>`);
            }
            if( days == "0100000"){
                $("#MonCal").append(`<h3>${name}</h3>`);
            }
            if( days == "0010000"){
                $("#TuesCal").append(`<h3>${name}</h3>`);
            }
            if( days == "0001000"){
                $("#WedCal").append(`<h3>${name}</h3>`);
            }
            if( days == "0000100"){
                $("#ThursCal").append(`<h3>${name}</h3>`);
            }
            if( days == "0000010"){
                $("#fridCal").append(`<h3>${name}</h3>`);
            }
            if( days == "0000001"){
                $("#SatCal").append(`<h3>${name}</h3>`);
            }
        }
    }
    });
};
