define(["calculations", "settings"], function(c, Settings){
    
    var Pointer = {

        setDirection: function(moveEvent, head){
            var steps = c.getMovingSteps({
                            x: moveEvent.clientX - Settings.board.left,
                            y: moveEvent.clientY - Settings.board.top
                        }, head, Settings.speed , true);

            head.xStep = steps.x;
            head.yStep = steps.y;
        }
    };

    return Pointer;
});