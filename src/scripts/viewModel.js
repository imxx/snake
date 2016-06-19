define(["settings", "knockout"], function(Settings, ko){

    var vm = {
        isGamePlay: ko.observable(false),
        isGameEnd: ko.observable(false),
        showSettings: ko.observable(false),
        needToTrack: ko.observable(false),

        score: ko.observable(0),
        highScore: ko.observable(0),

        foodWorth: ko.observable(undefined),
        speed: ko.observable(Settings.speedDefault),
        cellRadius: ko.observable(Settings.cellRadiusDefault),
        foodRadius: ko.observable(Settings.foodRadiusDefault),

        setDefaults: setDefaults,
        incrementScore: incrementScore,
        toggleShowSettings: toggleShowSettings,
        setStartGameBinding: setStartGameBinding,
        setPointerTrackerBinding: setPointerTrackerBinding
    };

    vm.speed.subscribe(function(newValue){
        Settings.speed = parseInt(newValue);
    });
    vm.cellRadius.subscribe(function(newValue){
        Settings.cellRadius = parseInt(newValue);
    });
    vm.foodRadius.subscribe(function(newValue){
        Settings.foodRadius = parseInt(newValue);
    });

    function setStartGameBinding(cb){
        ko.bindingHandlers.startGame = {
            init: function(el){
                el.addEventListener("click", cb);
            }
        }
    };

    function setPointerTrackerBinding(cb){
        ko.bindingHandlers.pointerTracker = {
            update: function(el, val, allBindings, ctx){
                if(val()())
                    el.addEventListener("mousemove", cb);
                else
                    el.removeEventListener("mousemove", cb);
            }
        };
    };

    function setDefaults(){
        Settings.setDefaults();
        vm.speed(Settings.speedDefault);
        vm.cellRadius(Settings.cellRadiusDefault);
        vm.foodRadius(Settings.foodRadiusDefault);
    }

    function incrementScore(addend){
        vm.score( vm.score() + addend );
    }

    function toggleShowSettings(){
        vm.showSettings( !vm.showSettings() );
    }

    return vm;
});