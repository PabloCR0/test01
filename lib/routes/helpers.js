import { ShorterUrl } from '../persistence/shorterurl.js';

routesGetValidURL = function (shortURL){
   var obj = ShorterUrl.find({ shorter_url: shortURL }, {fields: {'url':1}}).fetch();
   ShorterUrl.update({ shorter_url: shortURL }, { $inc: { counter: 1 }});
   return obj[0].url;
}