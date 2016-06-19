define(["subsnake", "cell", "Settings"], function(Subsnake, Cell, Settings){
    "use strict";

    var Snake = {
        subsnakes: [],
        head: null,
        isheadCopying: false,
        first: null,
        last: null,

        init: function(){
            var headCell = new Cell(Settings.board.width/2, Settings.board.height/2),
                firstSubsnake = new Subsnake(headCell);

            this.head = headCell;
            this.first = firstSubsnake;
            this.last = firstSubsnake;
            firstSubsnake.next = firstSubsnake;
            firstSubsnake.prev = firstSubsnake;
            firstSubsnake.id = 0;

            this.subsnakes.length = 0;
            this.subsnakes.push(firstSubsnake);
            this.subsnakesLength = this.subsnakes.length;
        },

        createNewSubsnake: function(oldSubsnake, newCell){
            var newSubsnake = new Subsnake(newCell);

            newSubsnake.prev = oldSubsnake;
            newSubsnake.next = this.last;
            newSubsnake.id = oldSubsnake.id + 1;
            oldSubsnake.next = newSubsnake;
            oldSubsnake.prev = this.first;
            this.first = newSubsnake;
            this.subsnakes.push(newSubsnake)
            this.subsnakesLength = this.subsnakes.length;
        },

        move: function(){
                this.forEach(function(subsnake){
                    subsnake.move();
                });
        },

        eat: function(){
            var lastSubsnake = this.last;

            this.last.addToTheEnd(
                new Cell(
                    lastSubsnake.last().x + lastSubsnake.lastXStep,
                    lastSubsnake.last().y + lastSubsnake.lastYStep
                )
            );
        },

        forEach: function(callback){
            for(var i = 0; i < this.subsnakesLength; i++){
                callback(this.subsnakes[i], i);
            }
        },

        teleportCell: function(data){
            var currCell = data.subsnake.cells[data.i] ||
                           data.subsnake.first();

            if(currCell.leavingBoard) return;

            if(this.head == currCell)
                this.isHeadCopying = true;

            var clonedCell = currCell.copyToTheMirroredPosition(data.direction);
         
            if(this.first === data.subsnake){

                if(!data.subsnake.next.empty()){
                    this.createNewSubsnake(data.subsnake, clonedCell);

                }else{
                    data.subsnake.next.addToTheEnd(clonedCell);
                    this.first = data.subsnake.next;
                }

                this.head = clonedCell;
                this.isHeadCopying = false;

            }else{
                data.subsnake.next.addToTheEnd(clonedCell);
            }
        },

        uncheckEntering: function(data){
            data.subsnake.cells[data.i].setEntering(false);
        },

        removeCell: function(data){
            if(data.subsnake.cells[data.i+1]){
                data.subsnake.cells[data.i].copySteps(data.subsnake.cells[data.i+1]);
            }

            data.subsnake.removeFirst();

            if(data.subsnake.empty()){
                this.last = data.subsnake.next;
            }
        }
    }

    return Snake;
});