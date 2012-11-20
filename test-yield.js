function coroutine(f) {
    var o = f();
    o.send();
    return function(x) {
        o.send(x);
    }
}


function move(event) {
    $('#box').css({left: event.pageX - 50,
                   top: event.pageY - 50});
}

var loop = coroutine(function() {
    var event;
    while (event = yield) {
        if (event.type == 'mousedown') {
            while (event = yield) {
                if (event.type == 'mousemove') move(event);
                if (event.type == 'mouseup') break;
            }
        }
    }
});

// register the listeners:
$(function() {
    $('#box').mousedown(loop);
    $(window).mousemove(loop).mouseup(loop);

    // suppress firefox's annoying dragging behavior:
    $('#box').bind('dragstart', function(event) {
        event.preventDefault();
    });
});
