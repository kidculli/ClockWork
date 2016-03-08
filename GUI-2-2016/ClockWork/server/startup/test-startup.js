/**
 * Created by Son on 2/20/2016.
 *
 * Description: This is just data for testing purposes when the server get restart.
 *
 *  -2/24/16 C Lam
 *      -changed usage of ClockWork var to Event var name
 *      -removed id from default events
 *      - added cap and fill keys to document
 *  -2/25/16
 *      -added expire field boolean
 *
 */
if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Events.find().count() === 0) {
            var events = [
                {
                    time_created: 1253599140969,
                    time_expire: 1253599140969,
                    title: "Childish Gambino TD",
                    description: "Gambino is a mastermind come with me to go see him",
                    owner: "kidculli",
                    attendees: ['snguyen','andrylora'],
                    cap:5,
                    fill:2,
                    event_type: "Concert",
                    expired: false,
                    loc: {
                        address: "Atrium Rd, Wilmington MA",
                        coord: ["74", "88"]
                    }
                }
            ];

            for (var i = 0; i < events.length; i++) {
                Events.insert(events[i]);
            }
        }
    });
}