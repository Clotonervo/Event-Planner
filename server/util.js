const mongoose = require('mongoose');
const User = mongoose.model('User');
const Authentication = mongoose.model('Authentication');
const Event = mongoose.model('Event');


module.exports = {
    isValidAuth: async (token) => {
        try {
            const authentication = await Authentication.findOne({
                authToken: token,
            })
            let expirationTime = new Date().getTime() + 15000;

            if(authentication == null){
                return { isValid: false, timeout: false };
            }
            else if(authentication.expiration > expirationTime){
                return { isValid: false, timeout: true };
            }
            else {
                await Authentication.findOneAndUpdate({
                    authToken: token
                }, {
                    expiration: expirationTime,  
                });

                return { isValid: true, timeout: false }
            }
        } catch (error){
            console.log(error);
        }
    },
    getCurrentUser: async (token) => {
        try {
            const authentication = await Authentication.findOne({
                authToken: token,
            })

            if(authentication == null){
                return null;
            }
            else {
                return authentication.username;
            }

        } catch (error){
            console.log(error);
        }
    },
    removeEventFromUsers: async (eventID) => {
        try {
            const event = await Event.findOneAndDelete({
                eventID: eventID
            });
            
        } catch (err) {
            console.log(error);
        }
    }
}