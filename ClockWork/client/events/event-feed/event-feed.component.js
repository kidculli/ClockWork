/**
 * Author: Son Nguyen
 *
 * file: event-feed.component.js
 *
 * This file declare the controller for event-feed.html
 *
 * 2/28/16
 *  -CLAM
 *      -added expired filter to events helper function
 * 3/19/16
 *  -CLAM
 *      -cleaned up documentation and console logs
 */
angular
    .module('ClockWork').controller('EventFeedCtrl',function($scope, $meteor, $reactive, $ionicModal) {
        console.log("Running Event Feed Ctrl");
        //uses 'this' instead of '$scope' because of controllerAs.
        $reactive(this).attach($scope);

        //declaring new empty event for add event modal
        this.newEvent = {};

        this.helpers({
            events: function(){
                return Events.find({expired:false,full:false});
            }
        });

        this.get_pic = function(u_name){
           Users.find({username:u_name});
        };

        //This is a modal to add new event
        $ionicModal.fromTemplateUrl('client/modal/addEvent_modal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        this.removeEvent = function(event){
            Events.remove({_id: event._id});
        }
    }
);



