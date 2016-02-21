angular
    .module('ClockWork').controller('EventDetailCtrl', EventDetailCtrl);

function EventDetailCtrl($scope,$reactive) {
    // attach scope to this object
    $reactive(this).attach($scope);

    $scope.name = "Andry Lora"
    $scope.event = {
        title: 'Kanye West Tour',
        expire: 1253599140969,
        descr: "Gonna go see the GOAT!",
        loc: " 144 state street NY"
    }
}