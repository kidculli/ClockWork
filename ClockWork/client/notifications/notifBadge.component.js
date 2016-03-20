/**
 * Created by Cullin on 3/19/16.
 *
 * file: notifBadge.component.js
 *
 * Notification badge component
 *
 * This component uses an instance of notifCtrl to get the number of notifications that have yet to be dismissed
 * uses jQuery to set the child element text of the directive
 */

angular.module("ClockWork").directive('notifBadge',function(){
return {
    controller:"notifCtrl",
    controllerAs:"Notification",
    restrict: 'E',
    template: '<span class="badge badge-assertive"></span>',
    link: function($scope,$elem,$attrs,notifCtrl) {
        //console.log(notifCtrl.notifs.length);
        //console.log(notifCtrl.show_badge);
        $scope.true = true;
        $scope.false = false;
        $scope.$watch(
            //set watch on length of notifs array
          function() {return notifCtrl.notifs.length; },
            function(newValue, oldValue) {
                if(newValue == 0) {
                    $elem.children().attr('ng-hide',"true");
                }
                else {
                    $elem.children().attr('ng-hide',"false");
                }
                //else {
                //    $attrs.$set('ng-hide',false);
                //    $elem.children().$attr.$set('ng-hide',false);
                //    //$scope.hide_badge = false;
                //}
                if ( newValue !== oldValue ) {
                    $elem.children().text(newValue);
                }
                else {
                    $elem.children().text(oldValue);
                }
            }
        );
    }
}
});