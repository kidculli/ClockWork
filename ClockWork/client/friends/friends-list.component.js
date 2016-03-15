/*
 Author: Andry Lora
 file: friends-list.component.js
 Created on 3/11/16
*/

 angular
    .module('ClockWork').controller('FriendsCtrl', function FriendsCtrl($scope,$reactive) {
    $reactive(this).attach($scope);

    $scope.name = "Friends"
    $scope.friends = {
        friend1:{
            owner:"Charlie Walker",
            loc:"Boston"
        },
        friend2:{
            owner:"Cats Meow",
            loc:"Litter Box"
        },
        friend3:{
            owner:"The Sun",
            loc:"California"
        }
    }
});