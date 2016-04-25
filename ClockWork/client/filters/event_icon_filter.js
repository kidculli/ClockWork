/**
 * Created by Cullin on 3/14/16.
 *
 * file: event_icon_filter.js
 *
 * This filter takes an event type and returns the appropriate ion icon class
 *
 */

angular.module("ClockWork").filter('icon', [function() {
    return function(type) {
        var icon_map = {
            "Coffee":"ion-coffee",
            "Dining":"ion-android-restaurant",//"ion-fork"
            "Outdoors":"ion-leaf",
            "Music":"ion-music-note",
            "Personal Care":"ion-ios-body",
            "Movie":"ion-film-marker",
            "Game":"ion-ios-game-controller-b",
            "Sport":"ion-ios-football",
            "Shopping":"ion-bag",
            "Drinking/Partying":"ion-beer",
            "Other":"ion-star",
            "User Joined":"ion-ios-plus",
            "User Left":"ion-ios-minus",
            "Event Ready":"ion-android-done-all"
        };
        return icon_map[type];
    };
}]);