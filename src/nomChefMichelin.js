const rp = require('request-promise');
const cheerio = require('cheerio');

exports.grabChefName = async function grabChefName (url){
  const option = {
    uri: url,
    transform: function (body){
      return cheerio.load(body);
    }
  };
  let chef;
  try{
    let $ = await rp(option);
    chef = $('.field--name-field-chef').find('div').children().text();
    var nomPrenom = chef.split('-');
    chef='';
    for(let i=0;i<nomPrenom.length-1;i++){
      chef=chef + nomPrenom[i]+" ";
    }
    chef = chef + nomPrenom[nomPrenom.length-1];
    chef=chef.toLowerCase();
  }
  catch(error){
    console.log(error);
  }

  return chef;
}
