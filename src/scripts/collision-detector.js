define(["calculations", "settings"], function(c, Settings){

    var CollisionDetector = {
        collisions: [],

        checkCollisions: function(Snake, Food){
            boardHeight = Settings.board.height,
            boardWidth = Settings.board.width,
            that = this;

            Snake.forEach(function(subsnake, subsnakeIndex){
                subsnake.forEach(function(cell, cellIndex){

                    if(c.getDistance(cell, Food) < Settings.cellRadius + Settings.foodRadius){
                        that.collisions.push({ type: "food" });

                    }else if(cellIndex !== 0 &&
                             cellIndex !== 1 &&
                             c.getDistance(Snake.head, cell) < (Settings.cellRadius * 2)){

                        that.selfCollision = true;

                    }else if(cell.leavingBoard && cell.x + Settings.cellRadius <= 0 ||
                             cell.x >= boardWidth + Settings.cellRadius ||
                             cell.y + Settings.cellRadius <= 0 ||
                             cell.y >= boardHeight + Settings.cellRadius){

                        that.collisions.push({ type: "outofview",
                                               data: {
                                                    subsnake: subsnake,
                                                    i: cellIndex
                                               }
                                            });

                    }else if(cell.x < Settings.cellRadius){

                        if(!cell.enteringBoard && !cell.leavingBoard)
                            that.collisions.push({ type: "wall",
                                                   data: {
                                                        subsnake: subsnake,
                                                        i: cellIndex,
                                                        direction: "w"
                                                   }
                                                });

                    }else if(cell.y < Settings.cellRadius){

                        if(!cell.enteringBoard && !cell.leavingBoard)
                            that.collisions.push({ type: "wall",
                                                   data: {
                                                        subsnake: subsnake,
                                                        i: cellIndex,
                                                        direction: "n"
                                                   }
                                                });

                    }else if(cell.y > boardHeight - Settings.cellRadius){

                        if(!cell.enteringBoard && !cell.leavingBoard)
                            that.collisions.push({ type: "wall",
                                                   data: {
                                                        subsnake: subsnake,
                                                        i: cellIndex,
                                                        direction: "s"
                                                   }
                                                });

                    }else if(cell.x > boardWidth - Settings.cellRadius){

                        if(!cell.enteringBoard && !cell.leavingBoard)
                            that.collisions.push({ type: "wall",
                                                   data: {
                                                        subsnake: subsnake,
                                                        i: cellIndex,
                                                        direction: "e"
                                                   }
                                                });

                    }else if(cell.enteringBoard){

                        that.collisions.push({ type: "none",
                                               data: {
                                                    subsnake: subsnake,
                                                    i: cellIndex
                                               }
                                            });

                    }
                });
            });
        },

        reset: function(){
            this.collisions.length = 0;
            this.selfCollision = false;
        }
    }

    return CollisionDetector;
});