define(["settings"], function(Settings){

    Settings.board.el.width = Settings.board.width;
    Settings.board.el.height = Settings.board.height;

    var Drawer = {};

    Drawer.ctx = Settings.board.el.getContext("2d");
    Drawer.ctx.font = "60px serif";
    Drawer.ctx.textAlign = "center";

    Drawer.draw = function(Snake, Food){

        var i,
            subsnakesLength = Snake.subsnakes.length,
            j,
            subsnake,
            subsnakeLength;

        this.ctx.clearRect(0,0, Settings.board.width, Settings.board.height);
        this.ctx.beginPath();
    
        for(i = 0; i < subsnakesLength; i++){

            subsnake = Snake.subsnakes[i].cells;
            subsnakeLength = subsnake.length;

            for(j = 0; j < subsnakeLength; j++){
                this.ctx.moveTo(subsnake[j].x,subsnake[j].y);
                this.ctx.arc(subsnake[j].x,subsnake[j].y, Settings.cellRadius, 0, 2 * Math.PI);
            }
        }

        this.ctx.fillStyle = "red";
        this.ctx.stroke();
        this.ctx.fill();


        this.ctx.beginPath();

        this.ctx.arc(Food.x, Food.y, Settings.foodRadius, 0, 2* Math.PI);
        this.ctx.stroke();
        this.ctx.fillStyle = "yellow";
        this.ctx.fill();
        
    }

    Drawer.writeFoodWorth = function(num){
        this.ctx.fillStyle = "#000";
        this.ctx.fillText(num, Settings.board.width/2, 50);
    };

    return Drawer;
});