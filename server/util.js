const mongoose = require('mongoose');
const User = mongoose.model('User');
const Authentication = mongoose.model('Authentication');
const UserToEvent = mongoose.model('UserToEvent');


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

                return { isValid: true }
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
            const userList = await UserToEvent.find({
                events: { $in: [eventID] }
            })
            console.log(userList)
            userList.forEach(element => {
                element.events = element.events.filter( event => event !== eventID);
                UserToEvent.updateOne({ username: element.username }
                    , { events: element.events });
            });

        } catch (err) {
            console.log(error);
        }
    }
}