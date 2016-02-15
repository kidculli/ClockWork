/**
 * Created by Cullin on 2/14/16.
 *
 * file: routes.js
 *
 * This file specifies app view routing using angular ui.router
 *
 * 2/14/16
 *  - Added eventFeed route and abstract tab route
 *  - Set default route to /eventFeed
 */

// create config for url routes
angular.module('ClockWork').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {

    // make url look normal
    //$locationProvider.html5Mode(true);

    // define state values and corresponding views and url
    $stateProvider.state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'client/tab/tab.html'
    })
    // setup an abstract state for the tabs directive

        .state('eventFeed', {
            url: '/eventFeed',
            template: '<event-feed></event-feed>'
        });
        //.state('partyDetails', {
        //    url: '/parties/:partyId',
        //    template: '<party-details></party-details>',
        //    // add permission to view the page
        //    resolve: {
        //        currentUser: ($q) => {
        //            if(Meteor.userId() == null)
        //            {
        //                return $q.reject();
        //            }
        //            else
        //            {
        //                return $q.resolve();
        //            }
        //        }
        //    }
        //});

// default url
    $urlRouterProvider.otherwise("/eventFeed");
});
