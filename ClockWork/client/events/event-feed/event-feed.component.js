/**
 * Created by Cullin on 2/14/16.
 *
 * file: event-feed.component.js
 *
 * This file declares an angular directive for the event-feed view
 */

angular.module("ClockWork").directive('eventFeed',function(){
    return {
        restrict:"E",
        templateUrl:"client/events/event-feed/event-feed.html",
        controllerAs:"eventFeed",
        controller: function($scope,$reactive) {
            // attach scope to this object
            $reactive(this).attach($scope);

            // hardcode events
            $scope.event =
                {title:"Twerk Zone",
                description:"She's a twerkaholic!",
                    owner:'kidculli',
                    cap:4,
                    fill:2,
                    id:"123edf",
                    expire:1455499140969
                };
            $scope.events = [
                {title:"Twerk Zone",
                    description:"She's a twerkaholic!",
                    owner:'kidculli',
                    cap:4,
                    fill:2,
                    id:"123edf",
                    expire:1455499140969
                },
                {title:"CG Concert",
                    description:"Sick Boi !!!",
                    owner:'kidculli',
                    cap:10,
                    fill:1,
                    id:"123edfdqkgFW",
                    expire:1355496140969
                },
                {title:"Bowl Zone",
                    description:"Bowling Niggah",
                    owner:'kidculli',
                    cap:6,
                    fill:3,
                    id:"123edf",
                    expire:1253599140969
                },
                {title:"Kanye Tour",
                    description:"She's a twerkaholic!",
                    owner:'kidculli',
                    cap:4,
                    fill:2,
                    id:"123edf",
                    expire:1455499140969
                },
                {title:"Kanye Tour",
                    description:"She's a twerkaholic!",
                    owner:'kidculli',
                    cap:4,
                    fill:2,
                    id:"123edf",
                    expire:1455499140969
                },
                {title:"Kanye Tour",
                    description:"She's a twerkaholic!",
                    owner:'kidculli',
                    cap:4,
                    fill:2,
                    id:"123edf",
                    expire:1455499140969
                }
            ];
            $scope.name = 'Cullin';


        }
    }

});