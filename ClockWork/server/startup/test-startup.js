/**
 * Created by Son on 2/20/2016.
 *
 * Description: This is just data for testing purposes when the server get restart.
 */
if (Meteor.isServer) {
    Meteor.startup(function () {
        if (ClockWork.find().count() === 0) {
            var events = [
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

            for (var i = 0; i < events.length; i++) {
                ClockWork.insert(events[i]);
            }
        }
    });
}