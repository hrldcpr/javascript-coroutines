function move(event) {
    $('#thing').css({left: event.pageX - 50,
                     top: event.pageY - 50});
}

var dragging = false;
function onmousedown(event) {
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
    $('#thing').mousedown(onmousedown);
    $(window).mousemove(onmousemove).mouseup(onmouseup);

    // suppress firefox's annoying dragging behavior:
    $('#thing').bind('dragstart', function(event) {
        event.preventDefault();
    });
});
