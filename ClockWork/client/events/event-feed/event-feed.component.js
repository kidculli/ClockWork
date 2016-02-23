/**
 * Author: Son Nguyen
 *
 * file: event-feed.component.js
 *
 * This file declare the controller for event-feed.html
 */
angular
    .module('ClockWork').controller('EventFeedCtrl', EventFeedCtrlFunction);

function EventFeedCtrlFunction($scope, $meteor, $reactive, $ionicModal) {

    //uses 'this' instead of '$scope' because of controllerAs.
    $reactive(this).attach($scope);

    //declaring empty eventS
    this.newEvent = {};

    //this.events = $meteor.collection(ClockWork);
    this.helpers({
            events: function(){
                return ClockWork.find({});
            }
    });

    this.name = 'Cullin';

    //This is a modal to add new event
    $ionicModal.fromTemplateUrl('client/modal/addEvent_modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });


    this.removeEvent = function(event){
        ClockWork.remove({_id: event._id});
    }
}


