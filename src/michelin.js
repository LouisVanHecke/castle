const rp = require('request-promise');
const $ = require('cheerio');
//const url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin?indirect=278';
//const urlRestaurantMichelin = require('./urlRestaurantMichelin');
const urlRestaurantMichelin2 = require('./urlRestaurantMichelin2');


exports.grabAllNames = async function grabAllNames (){

  const listeChef=[];
  const listeUrl = [];
  for(var i=1;i<36;i++){
    listeUrl.push("https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-"+i+"?indirect=278")
  }

  try{

    for(var i=0;i<listeUrl.length;i++){
      var nomChef = await urlRestaurantMichelin2.grabUrlAndName(listeUrl[i]);
      for(let j=0;j<nomChef.length;j++){

        listeChef.push(nomChef[j]);
      }
      console.log(i);

    }
  }
  catch(error){
    console.log(error);
  }

  return listeChef;
}
/*
rp(url)
    .then(function(html){
      const listeUrl = [];
      for(var i=1;i<36;i++){
        listeUrl.push("https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-"+i+"?indirect=278")
      }
      return Promise.all(
        listeUrl.map(function(url){
          return urlRestaurantMichelin(url);
        })
      );
    })
    .then(function(listeNom){
      console.log(listeNom);
    })
    .catch(function(err){
      //handle error
});*/
