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
        $(".scorecolumn").append("<div id='column" + (Number(c) + 1) + "' class='column'><div>" + (Number(c) + 1) +" </div><div>par " + holepar +"</div></div>");

    }
    fillCard();
}

function fillCard(){
    for(var p = 1; p <= numplayers; p++){
        $(".playercolumn").append("<span class='deletebtn' onclick='deleteplayer(\"+ p +\")'><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"'></i></span><span contenteditable='true' id='pl'>Player</span></span>");
        for (var h = 1; h <= numholes.length; h++){
            $("#column" + h).append("<input id = 'player" + p +"hole" + h +"' type= 'text' class= 'holeinput'/>");
        }

    }

}

function deleteplayer (playerid) {
    $("#pl" + playerid).remove();
    for( var h = 1; h <= numholes.length; h++) {
        $("#player" + playerid + "hole" + h). remove();
    }
}