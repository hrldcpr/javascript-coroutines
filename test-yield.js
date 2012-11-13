function move(event) {
    $('#box').css({left: event.pageX - 50,
                   top: event.pageY - 50});
}

function loop() {
    var event;
    while (event = (yield)) {
        if (event.type == 'mousedown') {
            while (event = (yield)) {
                if (event.type == 'mousemove') move(event);
                if (event.type == 'mouseup') break;
            }
        }
    }
}

// register the listeners:
$(function() {
    var send = coroutine(loop);
    $('#box').mousedown(send);
    $(window).mousemove(send).mouseup(send);

    // suppress firefox's annoying dragging behavior:
    $('#box').bind('dragstart', function(event) {
        event.preventDefault();
    });
});

function coroutine(f) {
    var handler = f();
    handler.send();
    return function(x) {
        handler.send(x);
    }
}
