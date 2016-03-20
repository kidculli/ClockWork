/**
 * Created by Cullin on 2/28/16.
 *
 * file : update_expired
 *  this file updates any events that are now expired according to the server's clock
 */


//set call interval to every second
Meteor.setInterval(check_expire,1000);

function check_expire(){
    Events.find({expired:false}).forEach(function(event){
    // if there is less then 0.5 seconds left before expiration we will make the event expired
    // also if the event is at capacity we will expire the event
    if(event.full || !event.expired && event.time_expire - new Date().getTime() < 500)
    {
        Events.update({_id:event._id},{$set:{expired:true}});
        console.log("Updated '" + event.title + "' to expired at " + new Date());
        // Notify attendees that the event is ready to begin
        Meteor.call("Notify",{
            from:"Server",
            to: event.attendees.concat([event.owner]),
            readby:[],
            time_created: new Date().getTime(),
            type:"Event Ready",
            content: {
                link_id:event._id,
                message:"Event: " + event.title + " is ready to begin with " + event.fill + "/" + event.cap
                + " attending."
            }
        });
    }
})}