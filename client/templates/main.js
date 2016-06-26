import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ShorterUrl } from '../../lib/persistence/shorterurl.js';

import './main.html';
import './home.html';
import './shortenerUrlSection.html';
import './allUrl.html';



//it validates the inserted  url
function validateURL(currentUrl) {
    var regexp = new RegExp("^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$");
    if (!regexp.test(currentUrl)) {
        return false;
    } else {
        return true;
    }
}

//it checks if there is ahother shorturl  
function isCurrentShortUrl(shortURL){
  var obj = ShorterUrl.find({ shorter_url: shortURL }, {fields: {'url':1}}).fetch();
  if(obj[0] != undefined){
    return false;
  } else {
    return true;
  }
}

//it generates the url code
function generateURLCode(){
  //generate a random number 5 - 9
  var op = Math.floor(Math.random() * (10 - 5)) + 5;
  //generate the url code
  return Random.id(op);
}

function validateGeneratedCode(){
  var newCode = generateURLCode();
  if(isCurrentShortUrl(newCode)){
    validateGeneratedCode();
  } else {
    return newCode;
  }
}


Template.home.events({

  'submit .shorter-url-form'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
    if(validateURL(text)){
      var newCode = generateURLCode();
      
	    ShorterUrl.insert({
	      url: text,
	      shorter_url: newCode,
	      counter:0
	    });
	    // Clear form
	    target.text.value = '';
	    Router.go("/view/"+newCode); 
  	} else {
  		target.text.value = '';
      Modal.show('errorModal');
  	}
  },

});

Template.allUrl.helpers({
    'allURL': function(){
      var x = ShorterUrl.find();
      if(x != undefined){
        return x;
      }
    },
    'currentDomain': function(){
      return Meteor.absoluteUrl();      
    }
    
});




