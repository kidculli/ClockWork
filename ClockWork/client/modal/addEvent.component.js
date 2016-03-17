/**
 * Author: Son Nguyen
 *
 * file: event-feed.component.js
 *
 * This file declare the controller for event-feed.html
 *
 *  -2/24/16 C Lam
 *      -Added fill init to 1
 *      -Added time_created, time_expire, and owner to new event
 *
 *   -2/27/16 C Lam
 *      - Added expired value to new event init false
 *
 *   -3/07/2016
 *      -Added custom and Angular validation.
 *      -Note: Added custom validation because of using directive for picking time. Because of this,
 *             Angular's type="submit" button will not work and clear the form after submission on the modal.
 *             Therefore, using type="button" is a better solution to reset form.
 *
 *   -3/14/16 C Lam
 *      -Added Meteor User username to event create record
 *   -3/15/16 C Lam
 *      - added full and canceled fields
 */
angular
    .module('ClockWork').controller('addEventCtrl', function($scope, $reactive) {

    //uses 'this' instead of '$scope' because of controllerAs.
    $reactive(this).attach($scope);

    // This will be use to trigger ng-show for custom validation on ng-click
    var check_time = false;
    var check_name = false;
    var check_description = false;
    var check_event_type = false;
    var check_capacity = false;

    //declaring empty eventS
    this.newEvent = {};

    //this.events = $meteor.collection(ClockWork);
    this.helpers({
        events: function(){
            return Events.find({});
        }
    });

    //use this variable to store the selected value in the timePicker.
    var expire_time= 0;

    //Edit the dictionary for user's timePicker package preference.
    //For more information visit: https://github.com/rajeshwarpatlolla/ionic-timepicker
    //TimePicker uses Unix time stamp
    this.timePickerObject = {
        inputEpochTime: 0, //((new Date()).getHours() * 60 * 60),  //Optional
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

            // Not part of the timePicker package. check_time will be use to check if the user never selected a time.
            check_time = true
            //console.log(".00", check_time);

        } else {
            var selectedTime = new Date(val * 1000);
            console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');

            //This is not from the timePicker package. Use this variable to append into this.newEvent
            expire_time = val*1000 + (new Date).getTime();  //Have to multiply 1000 to the epoch time.
            check_time = false;
            //console.log(".11", check_time);
        }

        // This is also not form the time picker package.
        // Displace ng-show validation for timePicker if the user selected 00. 0 time does not make logic sense.
        if(val == 0){
            check_time = true;
            //console.log(".22", check_time);
        }
    }

    /* Description: This function validate if the form and model are valid on submission.
     *               Then it'll reinitialize everything, hide and reset the form. Else, trigger all the check
     *               variables on ng-show.
     *  Variable:
     *       valid - type(bool): True if the whole form is valid on submission. Else false.
     *       form - type(form object): form is a variable that store the "name" of a form.
     *       name, description, event_type, and capacity - type(ng-model object): value of the model in the form.*/
    this.addEvent = function(valid, form, name, description, event_type, capacity){

        if(valid === true && check_time === false && typeof(name) != 'undefined' &&
            typeof(description) != 'undefined' && typeof(event_type) != 'undefined' && typeof(capacity) != 'undefined') {

            ////convert cap to int if not 10+
            if (this.newEvent['cap'].search('\\++') == -1) {
                this.newEvent['cap'] = parseInt(this.newEvent['cap'], 10);
            }
            // append time created to newEvent date format is number milliseconds since epoch
            this.newEvent['time_created'] = new Date().getTime();
            //append expire time from timePicker into newEvent
            this.newEvent['time_expire'] = expire_time;
            // initialize current fill of event to 1
            this.newEvent['fill'] = 1;
            this.newEvent['owner'] = Meteor.user().username;
            // add empty array for attendees
            this.newEvent['attendees'] = [];
            // add empty object for loc
            this.newEvent['loc'] = {};
            // add expired field
            this.newEvent['expired'] = false;
            //add event type
            this.newEvent['event_type'] = event_type;
            this.newEvent['full'] = false;
            this.newEvent['canceled'] = false;
            Events.insert(this.newEvent);
            console.log("Added Event:", this.newEvent);
            //reset selected time to 0
            expire_time = 0;
            //reset newEvent
            this.newEvent = {};

            // Reset all check variable to false since form was valid on submission
            check_time = false;
            check_name = false;
            check_description = false;
            check_event_type = false;
            check_capacity = false;

            $scope.modal.hide();

            /* Reset Form */
            form.$setPristine();
            form.$setUntouched();

        }
        else{
            check_time = true;
            check_name = true;
            check_description = true;
            check_event_type = true;
            check_capacity = true;
            $scope.modal.show();
        }

    };

    /* Custom Validation:
     *  Basic rule for all the check functions. Since all check variables are initialize as false.
     *  If any of the check variable equal to true, then tt will trigger ng-show on the html*/

    this.checkName = function(){
        if(check_name == true ){
            return true;
        }else {
            return false;
        }
    }

    this.checkDescription = function(){
        if(check_description == true){
            return true;
        }else {
            return false;
        }
    }

    this.checkType = function(){
        if(check_event_type == true){

            return true;
        }else {
            return false;
        }
    }

    this.checkCapacity = function(){
        if(check_capacity == true){
            return true;
        }else {
            return false;
        }
    }

    // Check this website out for the idea http://codepen.io/sevilayha/pen/HnxkJ
    // Displace ng-show to validate if timePicker have not been selected.
    this.checkTime = function(){
        if(check_time == true){
            // want to return "true" so ng-show will always show up in the html.
            return true;
        }
        else{
            return false;
        }
    }
    /* End of Custom Validation*/

    });




