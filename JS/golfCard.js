var closeCourses;
var currentCourse;
var local_obj = {latitude: 40.4426135, longitude: -111.8631116, radius:100};
var numholes;
var numplayers = 5;



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
        $(".scorecolumn").append("<div id='column" + (Number(c) + 1) + "' class='column'><div class = 'holeheader'>Hole <div>" + (Number(c) + 1) +" </div><div>Par " + holepar +"</div><div class='hcp'>HCP "+ gethcp + "</div></div>");

    }
    $(".scorecolumn").append("<div class = 'totalc column'><div class = 'holeheader'>Total</div></div>");
    fillCard();
}

function fillCard(){
    for(var p = 1; p <= numplayers; p++){
        $(".playercolumn").append("<div id='pl" + p +"'><span class='deletebtn' onclick='deleteplayer(\"+ p +\")'><i class=\"glyphicon glyphicon-remove-circle\" aria-hidden=\"true\"'></i></span><span contenteditable='true' id='pl'>Player</span></span>");
        $(".totalc").append("<input type = 'text' class = 'holeinput' id = 'totalhole" + p + "'>");
        for (var h = 1; h <= numholes.length; h++){
            $("#column" + h).append("<input id = 'player" + p +"hole" + h +"' type= 'text' class= 'holeinput' onkeyup = 'updatescore(" + p +")'/>");
        }

    }

}

function deleteplayer (playerid) {
    $("#pl" + playerid).remove();
    $(".totalc" + playerid).remove();
    $(".scorecolumn" + playerid).remove();

    for( var h = 1; h <= numholes.length; h++) {
        $("#player" + playerid + "hole" + h).remove();
    }
}

function updatescore(playerid){
    var playertotal = 0;
    for (var t = 1; t <= numholes.length; t++){
        playertotal += Number($("#player" + playerid + "hole" + t).val());
    }

    $("#totalhole" + playerid).val(playertotal);
}

function addPlayer(playerid) {
    $("#pl" + playerid).append();
    $("totalc" + playerid).append();

    for( var h = 1; h <= numholes.length; h++) {
        $("#player" + playerid + "hole" + h).append();
    }


}