function move(event) {
    var parent = $('#box').parent().offset();
    $('#box').css({left: event.pageX - parent.left - 50,
                   top: event.pageY - parent.top - 50});
}

var animation = [];
setInterval(function() {
    if (animation.length > 0) {
        $('.highlighted').removeClass('highlighted');
        $(animation.shift()).addClass('highlighted');
    }
}, 300);
function animate(classes, force) {
    if (force || animation.length == 0)
        Array.prototype.push.apply(animation, classes);
}

var dragging = false;
function onmousedown(event) {
    event.preventDefault(); // stop Chrome from trying to select text
    dragging = true;
    animate(['.not-dragging.mousedown-1', '.dragging.yield'], true);
}
function onmousemove(event) {
    if (dragging) {
        move(event);
        animate(['.dragging.mousemove-1', '.dragging.yield']);
    }
}
function onmouseup(event) {
    if (dragging) {
        dragging = false;
        animate(['.dragging.mouseup-1', '.not-dragging.yield'], true);
    }
}

// register the listeners:
$(function() {
    $('#box').mousedown(onmousedown);
    $(window).mousemove(onmousemove).mouseup(onmouseup);

    $('#box').bind('dragstart', function(event) {
        event.preventDefault(); // stop Firefox from doing weird drag-and-drop things
    });
});
