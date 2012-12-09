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
                    if (class_ == '.dragging.yield') $('#dragging').text('true');
                    else if (class_ == '.not-dragging.yield') $('#dragging').text('false');
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

    var dragging = false;
    function onmousedown(event) {
        event.preventDefault(); // stop Chrome from trying to select text
        dragging = true;
        animate(['.not-dragging.mousedown-1', '', '.not-dragging.mousedown-2', '', '.dragging.yield'], true);
    }
    function onmousemove(event) {
        if (dragging) {
            move(event);
            animate(['.dragging.mousemove-1', '.dragging.mousemove-2', '.dragging.mousemove-3', '.dragging.yield']);
        }
    }
    function onmouseup(event) {
        if (dragging) {
            dragging = false;
            animate(['.dragging.mouseup-1', '.dragging.mouseup-2', '.dragging.mouseup-3', '', '.not-dragging.yield'], true);
        }
    }

    // register the listeners:
    box.mousedown(onmousedown);
    $(window).mousemove(onmousemove).mouseup(onmouseup);

    box.bind('dragstart', function(event) {
        event.preventDefault(); // stop Firefox from doing weird drag-and-drop things
    });

    box.parent().mousemove(function() { // only animate non-dragging moves
        if (!dragging)
            animate(['.not-dragging.mousemove-1', '.not-dragging.mousemove-2', '.not-dragging.mousemove-3', '.not-dragging.yield']);
    });
}
