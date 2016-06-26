import { ShorterUrl } from '../persistence/shorterurl.js';


function routesGetValidURL(shortURL){
  var obj = ShorterUrl.find({ shorter_url: shortURL }, {fields: {'url':1}}).fetch();
  if(obj[0] != undefined){
    ShorterUrl.update({ shorter_url: shortURL }, { $inc: { counter: 1 }});
    return obj[0].url;
  } else {
    routesGetValidURL(shortURL);
  }
}


Router.route('/', {
    template: 'home'
});

Router.route('/:_new_short_url', {where: 'server'}).get(function() {
  this.response.writeHead(302, {
    'Location': routesGetValidURL(this.params._new_short_url) 
  });
  this.response.end();
});

Router.route('/view/:_short_url', {
	name:"shortenerUrl",
    template: 'shortenerUrlSection',
    data: function () {
    	return {_short_url: Meteor.absoluteUrl() + this.params._short_url};
	}
});

Router.route('/show-all/urls', {
    template: 'allUrl'
});

