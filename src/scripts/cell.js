define(["calculations", "settings"], function(c, Settings){

    var id = 0;

    function Cell(x, y){
        this.x = x;
        this.y = y;
        this.enteringBoard = false;
        this.leavingBoard = false;
        this.setId();
    };

    Cell.prototype.isCrossingBorder = function(){
        return this.enteringBoard && this.leavingBoard;
    }

    Cell.prototype.setStepsAfterClonning = function(originalDirection){
        this.xStep = 0;
        this.yStep = 0;

        this.xStep = (originalDirection === "e") ? Settings.speed :
                                    (originalDirection === "w") ? -Settings.speed:0;

        this.yStep = (originalDirection === "s") ? Settings.speed :
                                    (originalDirection === "n") ? -Settings.speed:0; 
    }

    Cell.prototype.copySteps = function(receiver){
        receiver.xStep = this.xStep;
        receiver.yStep = this.yStep;
    }

    Cell.prototype.copyToTheMirroredPosition = function(originalDirection){
        var coords = c.getMirroredPosition(this, originalDirection),
            newCell =  new Cell(coords.x, coords.y);

        newCell.setStepsAfterClonning(originalDirection);

        newCell.enteringBoard = true;
        this.leavingBoard = true;

        return newCell;
    }

    Cell.prototype.setEntering = function(bool){
        this.enteringBoard = bool;
    }

    Cell.prototype.setId = function(){
        this.id = id++;
    };

    return Cell;
})