/**
 * Created by Cullin on 3/15/16.
 *
 * file: update_db.js
 *
 * This file implements a service called UpdateDb that takes a query and performs update on the
 * given collection
 */

angular.module("ClockWork").service("UpdateDb",function(){
   this.update = function(collection_name,query) {
       var query_result;
       if (collection_name == "Events")
       {
           query_result = Events.update()
       }
       else if( collection_name == "Notifications")
       {
           return;
       }
   }
});
