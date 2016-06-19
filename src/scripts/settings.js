define(function(){

    /*
    *   TEST
    *
    */
    var main = document.querySelector(".main"),
        mainCoords = main.getBoundingClientRect();

        main.style.width = Math.round(mainCoords.width) + "px"; 
        main.style.height = Math.round(mainCoords.height) + "px";

    /*
    *
    *
    *
    */


    var board = document.querySelector(".game-board"),
        boardCoords = board.getBoundingClientRect(),

    Settings = {};

    Settings.speedDefault = 9,
    Settings.cellRadiusDefault = 20,
    Settings.foodRadiusDefault = 15,

    Settings.speed = 9,
    Settings.cellRadius = 20,
    Settings.foodRadius = 15,

    Settings.board = {
        el: board,
        width: Math.round(boardCoords.width),
        height: Math.round(boardCoords.height),
        top: boardCoords.top,
        left: boardCoords.left
    };
    Settings.cellRadius = 20;

    Settings.foodWorth = Settings.speed * 20;
                         //Settings.board.width *
                         //Settings.board.height /
                         //10000;

    Settings.setDefaults = function(){
        this.speed = this.speedDefault;
        this.cellRadius = this.cellRadiusDefault;
        this.foodRadius = this.foodRadiusDefault;
    }

    console.log(Settings);
    console.log(document.querySelector(".main").getBoundingClientRect());

    return Settings;
});