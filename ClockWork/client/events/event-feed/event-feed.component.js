/**
 * Created by Son on 2/18/2016.
 */
angular
    .module('ClockWork').controller('EventFeedCtrl', EventFeedCtrl);

function EventFeedCtrl($scope, $reactive, $ionicModal) {
    console.log('HomeTabCtrl');

    $ionicModal.fromTemplateUrl('client/modal/modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.timePickerObject = {
        inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
        step: 5,  //Optional
        format: 24,  //Optional
        titleLabel: '24-hour Format',  //Optional
        setLabel: 'Set',  //Optional
        closeLabel: 'Close',  //Optional
        setButtonType: 'button-positive',  //Optional
        closeButtonType: 'button-stable',  //Optional
        callback: function (val) {    //Mandatory
            timePickerCallback(val);
        }
    };

    function timePickerCallback(val) {
        if (typeof (val) === 'undefined') {
            console.log('Time not selected');
        } else {
            var selectedTime = new Date(val * 1000);
            console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
        }
    }

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


