const rp = require('request-promise');
const cheerio = require('cheerio');
const nomChefMichelin = require('./nomChefMichelin');

exports.grabUrlAndName = async function grabUrlAndName (url){
  const option = {
    uri: url,
    transform: function (body){
      return cheerio.load(body);
    }
  };
  var temp;
  var listeChef=[];
  var listeUrl = [];
  try{
    let $ = await rp(option);
    var container = $('.poi-card-link').each(function(){
      temp = ($(this).attr('href'));
      listeUrl.push("https://restaurant.michelin.fr"+temp);
    });

    for(var i=0;i<listeUrl.length;i++){
      var nomChef = await nomChefMichelin.grabChefName(listeUrl[i]);
      listeChef.push(nomChef);
    }
  }
  catch(error){
    console.log(error);
  }

  return listeChef;
}
