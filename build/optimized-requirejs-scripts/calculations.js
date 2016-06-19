define(["settings"],function(t){var e={getDistance:function(t,e){return"undefined"==typeof e?NaN:Math.round(Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)))},getDirection:function(t,e){return t.x<e.x&&t.y<e.y?"nw":t.x==e.x&&t.y<e.y?"n":t.x>e.x&&t.y<e.y?"ne":t.x>e.x&&t.y==e.y?"e":t.x>e.x&&t.y>e.y?"se":t.x==e.x&&t.y>e.y?"s":t.x<e.x&&t.y>e.y?"sw":t.x<e.x&&t.y==e.y?"w":void 0},getMovingFactors:function(t,e){var n,a;switch(t){case"nw":n=1,a=1;break;case"ne":n=-1,a=1;break;case"se":n=-1,a=-1;break;case"sw":n=1,a=-1;break;case"e":n=-1,a=1;break;case"w":n=1,a=1;break;case"n":n=1,a=1;break;case"s":n=1,a=-1}return e&&(n*=-1,a*=-1),{x:n,y:a}},findAngleThroughLegs:function(t,e){return Math.atan(Math.abs(t)/Math.abs(e))},getAngle:function(t,e){var n=Math.abs(t.x-e.x),a=Math.abs(t.y-e.y);return this.findAngleThroughLegs(a,n)},getAdjacentLeg:function(t,e){return t*Math.abs(Math.cos(Math.abs(e)))},getOppositeLeg:function(t,e){return t*Math.abs(Math.sin(Math.abs(e)))},getMirroredPosition:function(e,n){var a,r;return"n"===n?(a=e.x,r=t.board.height+e.y):"e"===n?(a=-t.board.width+e.x,r=e.y):"s"===n?(a=e.x,r=-t.board.height+e.y):"w"===n&&(a=t.board.width+e.x,r=e.y),{x:a,y:r}},getMovingSteps:function(t,e,n,a){var r=this.getAngle(t,e),i=this.getDirection(t,e);return movingFactor=this.getMovingFactors(i,a),xStep=this.getAdjacentLeg(n,r)*movingFactor.x,yStep=this.getOppositeLeg(n,r)*movingFactor.y,{x:xStep,y:yStep}}};return e});