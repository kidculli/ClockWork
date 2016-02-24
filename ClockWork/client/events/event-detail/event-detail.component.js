angular
    .module('ClockWork').controller('EventDetailCtrl', EventDetailCtrl);

function EventDetailCtrl($scope,$reactive,$stateParams) {
    // attach scope to this object
    $reactive(this).attach($scope);

    var event_id = $stateParams.eventId;
    console.log(event_id);



    //hardcode user's name until we get the User collections up
    this.name = "ClockWork Master";
    this.event = Events.findOne({'_id':event_id});
    console.log(this.event);

    // set if we should display number of spots remaining i.e if 10+ we shouldnt
    if (typeof(this.event.cap) == 'string'){
        this.hide = true;
    }
    else {
        this.hide = false;
    }

    //$scope.name = "Andry Lora"
    //$scope.event = {
    //    title: 'Kanye West Tour',
    //    expire: 1253599140969,
    //    descr: "Gonna go see the GOAT!",
    //    loc: " 144 state street NY"
    //}
}