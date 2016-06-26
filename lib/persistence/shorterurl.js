import { Mongo } from 'meteor/mongo';
 
export const ShorterUrl = new Mongo.Collection('shorterurl');

if (Meteor.isServer) {
	Meteor.publish('shorterurl', function publishFunction() {
    	return ShorterUrl.find();
	});
}



