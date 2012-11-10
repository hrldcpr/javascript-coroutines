function move(event) {
    $('#thing').css({left: event.pageX - 50,
                     top: event.pageY - 50});
}

var selected = false;
function onclick(event) {
    selected = !selected;
}
function onmousemove(event) {
    if (selected)
        move(event);
}

// register the listeners:
$(function() {
    $('#thing').click(onclick);
    $(window).mousemove(onmousemove);
});
