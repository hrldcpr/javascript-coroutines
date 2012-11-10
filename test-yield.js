function move(event) {
    $('#thing').css({left: event.pageX - 50,
                     top: event.pageY - 50});
}

function loop() {
    var event;
    while (event = (yield))
        if (event.type == 'click')
            while (event = (yield)) {
                if (event.type == 'mousemove') move(event);
                if (event.type == 'click') break;
            }
}

// register the listeners:
$(function() {
    var handler = loop(); handler.next();
    function send(event) {
        handler.send(event);
    }

    $('#thing').click(send);
    $(window).mousemove(send);
});
