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
    if(event.time_expire - new Date().getTime() < 500)
    {
        Events.update({_id:event._id},{$set:{expired:true}});
        console.log("Updated '" + event.title + "' to expired at" + new Date());
    }
})};