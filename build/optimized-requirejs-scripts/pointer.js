define(["calculations","settings"],function(t,e){var n={setDirection:function(n,i){var o=t.getMovingSteps({x:n.clientX-e.board.left,y:n.clientY-e.board.top},i,e.speed,!0);i.xStep=o.x,i.yStep=o.y}};return n});