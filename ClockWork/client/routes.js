/**
 * Created by Son on 2/15/2016.
 */
angular
    .module('ClockWork')
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "client/tab/tab.html"
        })
        .state('tabs.home', {
            url: "/home",
            views: {
                'home-tab': {
                    templateUrl: "client/events/event-feed/event-feed.html",
                    controller: 'HomeTabCtrl'
                }
            }
        })
        .state('tabs.facts', {
            url: "/facts",
            views: {
                'home-tab': {
                    templateUrl: "client/events/event-detail/event-detail.html",
                    controller: 'FactCtrl'
                }
            }
        })
        .state('tabs.facts2', {
            url: "/facts2",
            views: {
                'home-tab': {
                    templateUrl: "client/templates/facts2.html"
                }
            }
        })
        .state('tabs.about', {
            url: "/about",
            views: {
                'about-tab': {
                    templateUrl: "client/templates/about.html"
                }
            }
        })
        .state('tabs.navstack', {
            url: "/navstack",
            views: {
                'about-tab': {
                    templateUrl: "client/templates/nav-stack.html"
                }
            }
        })
        .state('tabs.contact', {
            url: "/contact",
            views: {
                'contact-tab': {
                    templateUrl: "client/templates/contact.html"
                }
            }
        });


    $urlRouterProvider.otherwise('tab/home');
}