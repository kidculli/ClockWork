/**
 * Created by Cullin on 2/24/16.
 *
 * file:time_filter.js
 *
 * This filter converts a number in seconds to a Date object which can be filtered using angular time
 * -source
 *  http://stackoverflow.com/questions/28394572/angularjs-seconds-to-time-filter
 *  usage
 *      - {{seconds | secondsToDateTime | date:'HH:mm:ss'}}
 */

angular.module("ClockWork").filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);