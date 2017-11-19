$(document).ready(function() {
    $('button').on('click', function(){
       $('.player').add();
    });

    $('.glyphicon-minus-sign').click(function () {
        $(this).parents('tr').remove();
    });
});