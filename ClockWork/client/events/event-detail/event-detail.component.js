/**
 * Created by Cullin on 2/16/16.
 */

//create directive for event-detail

angular.module('ClockWork').directive('eventDetail',function(){
    return {
        restrict:'E',
        templateUrl:'client/events/event-detail/event-detail.html',
        controllerAs:'eventDetail',
        controller: function($scope,$reactive) {
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
    }
});  //event-detail

