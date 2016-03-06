/**
 * Created by Cullin on 2/6/16.
 * File: app.js
 *
 * This file  creates and initializes our angular app with the required dependencies
 * and bootstraps the page.
 */

//list of angular module dependencies
const modulesToLoad = ['angular-meteor','ui.router','ionic','ionic-timepicker','accounts.ui'];

// bootstrap the page
function onReady() {
    angular.bootstrap(document, ['ClockWork'], {
        strictDi: true
    });
}

if (Meteor.isCordova) {
    angular.element(document).on("deviceready", onReady);
}
else {
    angular.element(document).ready(onReady);
}

// load the modules
angular.module('ClockWork',modulesToLoad);