$(document).ready(function() {


    $('#addPlayer').on('click', addPlayer);

    function addPlayer() {
        //collects new item and stores in this variable
        //adds new item to the list
        $('#addPlayer').append('<tr><label contenteditable="true">'+  newTodoText + '</label><span class = "glyphicon glyphicon-minus-sign"></span></tr>');{
        });
    });


