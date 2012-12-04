function coroutine(f) {
    var o = f();
    o.send();
    return function(x) {
        o.send(x);
    }
}


function move(event) {
    var parent = $('#box').parent().offset();
    $('#box').css({left: event.pageX - parent.left - 50,
                   top: event.pageY - parent.top - 50});
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

    $('#box').bind('dragstart', function(event) {
        event.preventDefault(); // stop Firefox from doing weird drag-and-drop things
    });
});
