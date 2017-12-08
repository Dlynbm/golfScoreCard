var closeCourses;
var currentCourse;
var local_obj = {latitude: 40.4426135, longitude: -111.8631116, radius:100};
var numholes;
var numplayers = 4;




function loadMe(){
    $.post("https://golf-courses-api.herokuapp.com/courses", local_obj, function(data,status){
        closeCourses = JSON.parse(data);
        console.log(closeCourses);
        for(var p in closeCourses.courses){
            $("#courseselect").append("<option value='"+ closeCourses.courses[p].id + "'>"+ closeCourses.courses[p].name +"</option>");
        }
    });
}

function getCourse(courseid) {
    $("#teeselect").html("");
    $.get("https://golf-courses-api.herokuapp.com/courses/" + courseid, function (data) {
        currentCourse = JSON.parse(data);
        console.log(currentCourse);
        for (var t in currentCourse.course.tee_types) {
            var teename = currentCourse.course.tee_types[t].tee_type;
            $("#teeselect").append("<option value='" + t +"'>"+ teename + "</option>");
        }
    });

}

function buildCard(mytee){
    numholes = currentCourse.course.holes;

    for(var c in numholes){
        var holepar = currentCourse.course.holes[c].tee_boxes[mytee].par;
        var gethcp = currentCourse.course.holes[c].tee_boxes[mytee].hcp;
        var getyards = currentCourse.course.holes[c].tee_boxes[mytee].yards;

        if(c == 10) {
            $(".scorecolumn").append("<div class = 'outtotal column'><div class = 'holeheader'>OUT</div></div>");
        }

        $(".scorecolumn").append("<div id='column" + (Number(c) + 1) + "' class='column'><div class = 'holeheader'>Hole <div>" + (Number(c) + 1) +" </div><div class = 'par'>Par " + holepar +"</div><div class='hcp'>HCP "+ gethcp + "</div> <div class='yards'>Yards "+ getyards + "</div></div>");

    }

    $(".scorecolumn").append("<div class = 'intotal column'><div class = 'holeheader'>IN</div></div>");
    $(".scorecolumn").append("<div class = 'totalc column'><div class = 'holeheader'>Total</div></div>");

    fillCard();
}

function fillCard(){
    for(var p = 1; p <= numplayers; p++){
        $(".playercolumn").append("<div id='pl" + p +"'><span class='deletebtn' onclick='deleteplayer("+ p +")'><i class=\"glyphicon glyphicon-remove-circle\" aria-hidden=\"true\"'></i></span><span contenteditable='true' id='pl'>Player</span></span>");
        $(".outtotal").append("<input type = 'text' class = 'holeinput' id = 'outtotal" + p + "'>");
        $(".totalc").append("<input type = 'text' class = 'holeinput' id = 'totalhole" + p + "'>");
        $(".intotal").append("<input type = 'text' class = 'holeinput' id = 'intotal" + p + "'>");

        for (var h = 1; h <= numholes.length; h++){
            $("#column" + h).append("<input id = 'player" + p +"hole" + h +"' type= 'number' class= 'holeinput' onkeyup = 'updatescore(" + p +")'/>");
        }

    }

}

function deleteplayer (playerid) {
    $("#pl" + playerid).remove();
    $("#totalhole"+ playerid).remove();
    $("#intotal"+ playerid).remove();
    $("#outtotal"+ playerid).remove();


    for( var h = 1; h <= numholes.length; h++) {
        $("#player" + playerid + "hole" + h).remove();
    }
}

function updatescore(playerid) {
    var playertotal = 0;
    var outtotal = 0;
    var intotal = 0;
    var finished = true;
    for (var t = 1; t <= numholes.length; t++) {
        var score = Number($("#player" + playerid + "hole" + t).val());
        if (score == 0){
            finished = false;
        }
        if( t <= 9){
            outtotal += score ;
        }
        if(t > 9) {
            intotal += score;
        }

        playertotal += score;
    }
    $("#totalhole" + playerid).val(playertotal);
    $("#outtotal" + playerid).val(outtotal);
    $("#intotal" + playerid).val(intotal);
    if (finished) {
        if(playertotal <=72) {
            toastr.success("Good Job!");
        }
        else{
            toastr.warning("Sorry, you're not very good at this!")
        }
    }
}



function addplayer(playerid) {
    var numplayers = 1;
    for(var p = 1; p <= numplayers; p++) {
        $(".playercolumn").append("<div id='pl" + p + "'><span class='deletebtn' onclick='deleteplayer(" + p + ")'><i class=\"glyphicon glyphicon-remove-circle\" aria-hidden=\"true\"'></i></span><span contenteditable='true' id='pl'>Player</span></span>");
        $(".outtotal").append("<input type = 'text' class = 'holeinput' id = 'outtotal" + p + "'>");
        $(".intotal").append("<input type = 'text' class = 'holeinput' id = 'intotal" + p + "'>");
        $(".totalc").append("<input type = 'number' class = 'holeinput' id = 'totalhole" + p + "'>");
        for (var h = 1; h <= numholes.length; h++) {
            $("#column" + h).append("<input id = 'player" + p + "hole" + h + "' type= 'number' class= 'holeinput' onkeyup = 'updatescore(" + p + ")'/>");
        }
    }

}















