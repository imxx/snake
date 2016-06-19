define(["calculations", "settings"], function(c, Settings){

    function Subsnake(initialCell){
        this.cells = [initialCell];
        this.next = null;
        this.prev = null;
        this.lastXStep = 0;
        this.lastYStep = 0;
    }

    Subsnake.prototype.addToTheEnd = function(cell){
        this.cells.push(cell);
    };

    Subsnake.prototype.removeFirst = function(){
        return this.cells.shift();
    };

    Subsnake.prototype.empty = function(){
        return !this.cells.length;
    };

    Subsnake.prototype.first = function(){
        return this.cells[0];
    };

    Subsnake.prototype.last = function(){
        return this.cells[ this.cells.length - 1 ];
    }

    Subsnake.prototype.forEach = function(callback){
        var i,
            subsnake = this.cells,
            subsnakeLength = subsnake.length;

        for(i = 0; i < subsnakeLength; i++){
            callback(subsnake[i], i);
        }
    }

    Subsnake.prototype.move = function(){
        var i,
            subsnake = this.cells,
            rad = Settings.cellRadius,
            subsnakeLength = subsnake.length,
            movingSteps;

        for(i = 0; i < subsnakeLength; i++){

            if(i === 0){
                xStep = subsnake[i].xStep;
                yStep = subsnake[i].yStep;
                subsnake[i].x += xStep;
                subsnake[i].y += yStep;
            }else{
                if(c.getDistance(subsnake[i-1], subsnake[i]) > (rad * 2)){
                    movingSteps = c.getMovingSteps(subsnake[i-1], subsnake[i], 2 * rad);
                    xStep = movingSteps.x;
                    yStep = movingSteps.y;

                    subsnake[i].x = subsnake[i-1].x + xStep 
                    subsnake[i].y = subsnake[i-1].y + yStep;
                }
            }
        }
        this.lastXStep = xStep;
        this.lastYStep = yStep;      
    }

    return Subsnake;
});