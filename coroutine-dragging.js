function coroutine(f) {
    var o = f();
    o.next();
    return function(x) {
        o.next(x);
    }
}

function initDragging(box, animation) {
    function move(event) {
        var parent = box.parent().offset();
        box.css({left: event.pageX - parent.left - 50,
                 top: event.pageY - parent.top - 50});
    }

    var animate;
    if (animation) {
        animation = [];
        setInterval(function() {
            if (animation.length > 0) {
                var class_ = animation.shift();
                if (class_) { // empty class is used to slow things down
                    $('.highlighted').removeClass('highlighted');
                    $(class_).addClass('highlighted');
                }
            }
        }, 100);
        animate = function(classes, force) {
            if (force || animation.length == 0) {
                if (force && animation.length > 0) // skip to end of current animation
                    animation.splice(0, animation.length - 1);
                Array.prototype.push.apply(animation, classes);
            }
        }
    }
    else {
        animate = function() {}
    }

    var loop = coroutine(function*() {
        var event;
        while (event = yield) {
            if (event.type == 'mousedown') {
                event.preventDefault(); // stop Chrome from trying to select text
                animate(['', '.not-dragging.mousedown-1', '', '.not-dragging.mousedown-2', '.dragging.yield'], true);
                while (event = yield) {
                    if (event.type == 'mousemove') {
                        animate(['', '.dragging.mousemove-1', '.dragging.mousemove-2', '.dragging.mousemove-3', '.dragging.yield']);
                        move(event);
                    }
                    if (event.type == 'mouseup') {
                        animate(['', '.dragging.mouseup-1', '.dragging.mouseup-2', '.dragging.mouseup-3', '.not-dragging.yield'], true);
                        break;
                    }
                }
            }
            else if (event.type == 'mousemove')
                animate(['', '.not-dragging.mousemove-1', '.not-dragging.mousemove-2', '.not-dragging.mousemove-3', '.not-dragging.yield']);
        }
    });

    // register the listeners:
    box.mousedown(loop);
    box.parent().mousemove(loop);
    $(window).mouseup(loop);

    box.bind('dragstart', function(event) {
        event.preventDefault(); // stop Firefox from doing weird drag-and-drop things
    });

}
