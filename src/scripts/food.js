define(["settings"], function(Settings){

    var Food = {
        x: 0,
        y: 0,
        recreateFood: function(){
            this.x = getRandomInt(4*Settings.foodRadius, Settings.board.width - 4*Settings.foodRadius);
            this.y = getRandomInt(4*Settings.foodRadius, Settings.board.height - 4*Settings.foodRadius);
        }
    }

    function getRandomInt(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return Food;
});