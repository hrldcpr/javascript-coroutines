function move(event) {
    var parent = $('#box').parent().offset();
    $('#box').css({left: event.pageX - parent.left - 50,
                   top: event.pageY - parent.top - 50});
}

var dragging = false;
function onmousedown(event) {
    event.preventDefault(); // stop Chrome from trying to select text
    dragging = true;
}
function onmousemove(event) {
    if (dragging)
        move(event);
}
function onmouseup(event) {
    dragging = false;
}

// register the listeners:
$(function() {
    $('#box').mousedown(onmousedown);
    $(window).mousemove(onmousemove).mouseup(onmouseup);

    $('#box').bind('dragstart', function(event) {
        event.preventDefault(); // stop Firefox from doing weird drag-and-drop things
    });
});
