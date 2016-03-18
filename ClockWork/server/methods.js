/**
 * Created by Cullin on 3/15/16.
 *
 * file: method.js
 *
 * this file specifies server code that can be called from the client
 *
 * We shall wrap database interactions here to make our application more secure
 * allows more complex queries to be written as well and called from client
 *
 * ref: http://meteortips.com/first-meteor-tutorial/methods/
 *
 * 3/18/16
 *      -Added leave method
 *
 */




Meteor.methods({
    "Update": function (collection_name, query_params) {
        /*
         This function takes a collection name along with an object representing the mongo query params
         and performs the query on the collection

         Args
         collection_name(Str):name of mongodb collection to query
         query(Object): valid mongodb update query with form {query:{},update:{},options:{}}
         */
        if (collection_name == "Events") {
            // update returns number of records updated
            var result = Events.update(query_params.query, query_params.update, query_params.options);
            console.log(typeof result);
            if (result == 0) {
                console.log("" + query_params.query._id + ": updated 0 records");
                return false;
            }
            else if (result == 1) {
                console.log("Successfully performed update with query ");
                return true;
            }
            else {
                console.log("Error occurred while updating");
                return false;
            }
        }
        else if (collection_name == "Notifications") {
            // not yet implemented
            return {success: false, reason: "!exist"};
        }
        else {
            console.log(collection_name + "collection not found");
            return {success: false, reason: "!exist"};
        }
    },

    "Attend": function (event, username) {
        /*
         This function updates an event with the user attending.

         Args
         event(obj): Event object
         username(Str): username of attending user
         Return
         Status
         */
        var cap = event.cap - 1;
        // check if user is already attending
        if (event.attendees.indexOf(username) == -1) {
            //perform update on full field
            //var result = update_full();
            console.log(event.cap - 1);
            var result = Meteor.call("Update", "Events", {
                query: {_id: event._id, full: false, fill: {$in: [cap]}},
                update: {
                    $set: {full: true},
                    $push: {attendees: username},
                    $inc: {fill: 1}
                },
                options: {
                    upsert: false
                }

            });

            if(!result) {
                result = Meteor.call("Update", "Events", {
                    query: {_id: event._id, full: false},
                    update: {
                        $push: {attendees: username},
                        $inc: {fill: 1}
                    },
                    options: {
                        upsert: false
                    }

                });
                if(!result) {
                    console.log("Event: " + event.title + " is full, id:" + event._id);
                    return {success:false,reason:"full"};
                }
            }

            console.log("Successfully updated event: " + event.title + " id: " +event._id);
            return {success:true,reason:"none"};
        }
        else {
            console.log(username + " already attending " + event.title);
        }
    },

    "Leave": function(event, username) {
        if (event.attendees.indexOf(username) > -1) {
            var result = Meteor.call("Update", "Events",{
               query: {_id: event._id},
                update: {
                    $pull: {attendees:username},
                    $inc: {fill:-1}
                },
                options: {
                    upsert:false
                }
            });
        }
        if(result) {
            console.log(username + " is no longer attending event: " + event._id);
        }
        else{
            console.log("No changes made " +username + " was not attending event: "+ event._id);
        }
    }

});