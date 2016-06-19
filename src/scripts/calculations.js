define(["settings"], function(Settings){
    var Calcaulations = {

        getDistance: function(p2, p1){
            if(typeof p1 == "undefined") return NaN;
            return Math.round(
                      Math.sqrt(
                          Math.pow((p2.x - p1.x),2) + Math.pow((p2.y - p1.y),2)
                      )
                );
        },

        getDirection: function(leadingPoint, followingPoint){
                if(leadingPoint.x < followingPoint.x && leadingPoint.y < followingPoint.y)
                    return "nw";
                if(leadingPoint.x == followingPoint.x && leadingPoint.y < followingPoint.y)
                    return "n";
                if(leadingPoint.x > followingPoint.x && leadingPoint.y < followingPoint.y)
                    return "ne";
                if(leadingPoint.x > followingPoint.x && leadingPoint.y == followingPoint.y)
                    return "e";
                if(leadingPoint.x > followingPoint.x && leadingPoint.y > followingPoint.y)
                    return "se";
                if(leadingPoint.x == followingPoint.x && leadingPoint.y > followingPoint.y)
                    return "s";
                if(leadingPoint.x < followingPoint.x && leadingPoint.y > followingPoint.y)
                    return "sw";
                if(leadingPoint.x < followingPoint.x && leadingPoint.y == followingPoint.y)
                    return "w";
        },

        getMovingFactors: function(direction, afterMouseMovement){
            var xFactor, yFactor;

            switch(direction){
                case "nw":
                    xFactor = 1;
                    yFactor = 1;
                    break;
                case "ne":
                    xFactor = -1;
                    yFactor = 1;
                    break;
                case "se":
                    xFactor = -1;
                    yFactor = -1;
                    break;
                case "sw":
                    xFactor = 1;
                    yFactor = -1;
                    break;
                case "e":
                    xFactor = -1;
                    yFactor = 1;
                    break;
                case "w":
                    xFactor = 1;
                    yFactor = 1;
                    break;
                case "n":
                    xFactor = 1;
                    yFactor = 1;
                    break;
                case "s":
                    xFactor = 1;
                    yFactor = -1;
                    break;
              }
            if(afterMouseMovement){
                xFactor *= -1;
                yFactor *= -1;
            }
            return {x: xFactor, y: yFactor};
        },

        findAngleThroughLegs: function(oppositeLeg, adjacentLeg){
            return Math.atan( Math.abs(oppositeLeg) / Math.abs(adjacentLeg) );
        },

        getAngle: function(leadingPoint, followingPoint){
            var adjacentLeg = Math.abs(leadingPoint.x - followingPoint.x),
                oppositeLeg = Math.abs(leadingPoint.y - followingPoint.y);

            return this.findAngleThroughLegs(oppositeLeg, adjacentLeg);
        },

        getAdjacentLeg: function(hypothenuse, angleRad){
            return hypothenuse * Math.abs(Math.cos(Math.abs(angleRad)));
        },
        
        getOppositeLeg: function(hypothenuse, angleRad){
            return hypothenuse * Math.abs(Math.sin(Math.abs(angleRad)));
        },

        getMirroredPosition: function(el, direction){
            var x, y;

            if(direction === "n"){
                x = el.x;
                y = Settings.board.height + el.y;

            }else if(direction === "e"){
                x =  -Settings.board.width + el.x;
                y = el.y;
            
            }else if(direction === "s"){
                x = el.x;
                y = -Settings.board.height + el.y
            
            }else if(direction === "w"){
                x = Settings.board.width + el.x;
                y = el.y;
            }

            return { x: x, y: y };
        },

        getMovingSteps: function(leadingEl, followingEl, hypothenuse, reverseMovingFactors){
            var angle = this.getAngle(leadingEl, followingEl),
                direction = this.getDirection(leadingEl, followingEl);
                movingFactor = this.getMovingFactors(direction, reverseMovingFactors);
                xStep = this.getAdjacentLeg(hypothenuse, angle) * movingFactor.x;;
                yStep = this.getOppositeLeg(hypothenuse, angle)  * movingFactor.y;

                return {
                    x: xStep,
                    y: yStep
                }
        }
    }

    return Calcaulations;

});