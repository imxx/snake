require.config({
    baseUrl: "./scripts",
    paths: {
        "knockout": "libs/knockout"
    }
});

require(["snake", "pointer", "drawer",
         "collision-detector", "food",
         "knockout", "settings", "viewModel"],

    function(Snake, Pointer, Drawer, ColDet, Food, ko, Settings, vm){

        var gameInterval = null,
            animationFrameTimeout = null,
            foodWorth = 0;


        vm.setStartGameBinding(startGame);
        vm.setPointerTrackerBinding(setDirectionCallback);

        function setDirectionCallback(e){
            if(!Snake.isHeadCopying)
                Pointer.setDirection(e, Snake.head);
        }
        
        function startGame(){
            Snake.init();
            Food.recreateFood();

            gameInterval = requestAnimationFrame(move);

            foodWorth = Settings.foodWorth;
            
            vm.score(0);
            vm.isGamePlay(true);
            vm.isGameEnd(false);
            vm.needToTrack(true);
        }

        function endGame(){
            clearTimeout(animationFrameTimeout);
            cancelAnimationFrame(gameInterval);
            gameInterval = null;
            animationFrameTimeout = null;

            ColDet.reset();

            vm.isGamePlay(false);
            vm.isGameEnd(true);
            vm.needToTrack(false);
            if(vm.highScore() < vm.score()){
                vm.highScore( vm.score() );
            }
        }

        function move(timestamp){
            animationFrameTimeout = setTimeout(function(){

                gameInterval = requestAnimationFrame(move);

                Snake.move();
                ColDet.checkCollisions(Snake, Food);

                if(ColDet.selfCollision){
                    endGame();
                }

                if(ColDet.collisions.length){

                    for(var i = 0; i < ColDet.collisions.length; i++){

                        if(ColDet.collisions[i].type === 'wall'){
                            Snake.teleportCell(ColDet.collisions[i].data);

                        }else if(ColDet.collisions[i].type === "outofview"){
                            Snake.removeCell(ColDet.collisions[i].data);
                        
                        }else if(ColDet.collisions[i].type === "none"){
                            Snake.uncheckEntering(ColDet.collisions[i].data);

                        }
                        else if(ColDet.collisions[i].type === 'food'){
                            Food.recreateFood();
                            Snake.eat();
                            vm.incrementScore(foodWorth);
                            foodWorth = Settings.foodWorth;
                        }
                    }

                    ColDet.reset();     
                }

                Drawer.draw(Snake, Food);
                Drawer.writeFoodWorth(foodWorth);

                if(foodWorth > Settings.speed){
                    foodWorth--;
                }

            }, 1000 / 30);

        }


        ko.applyBindings(vm);
});