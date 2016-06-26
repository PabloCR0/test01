import { Mongo } from 'meteor/mongo';
 
export const ShorterUrl = new Mongo.Collection('shorterurl');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('shorterurl', function publichFunction() {
    return ShorterUrl.find();
  });
} else {
	Meteor.subscribe('shorterurl');
}

