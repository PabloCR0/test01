import { ShorterUrl } from '../persistence/shorterurl.js';

/*
* display the home page
*/
Router.route('/', {
    template: 'home'
});

/*
* redirect the short url to the valid url 
*/
Router.route('/:_new_short_url', {where: 'server'}).get(function() {
  if(typeof this.params._new_short_url != 'undefined'){
    this.response.writeHead(302, {
      'Location': routesGetValidURL(this.params._new_short_url) 
    });
    this.response.end();
  }
});

/*
* display the short url
*/
Router.route('/view/:_short_url', {
	name:"shortenerUrl",
    template: 'shortenerUrlSection',
    data: function () {
    	return {_short_url: Meteor.absoluteUrl() + this.params._short_url};
	}
});

/*
* display all the urls
*/
Router.route('/show-all/urls', {
    template: 'allUrl'
});

