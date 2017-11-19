var closeCourses;
var local_obj = {latitude: 40.4426135, longitude: -111.8631116, radius:100};

function loadMe(){
    $.post("https://golf-courses-api.herokuapp.com/courses", local_obj, function(data,status){
        closeCourses = JSON.parse(data);
        for(var p in closeCourses.courses){
            $("#selectCourse").append("<option value='"+ closeCourses.courses[p].id + "'>"+ closeCourses.courses[p].name +"</option");
        }
    });
}

function getCourse(courseid){
    $.get("https://golf-courses-api.herokuapp.com/courses/" + courseid, function (data) {
        currentCourse = JSON.parse(data);
        console.log(currentCourse);

    });
}