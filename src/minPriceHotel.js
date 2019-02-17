const rp = require('request-promise');
const cheerio = require('cheerio');

exports.grabPriceHotel = async function grabPriceHotel (url){
  const option = {
    uri: url,
    transform: function (body){
      return cheerio.load(body);
    }
  };
  let prix;
  try{
    let $ = await rp(option);
    if(String($('.priceTag').children().children().first().attr("class")) != "priceLabel"){
      prix = $('.price').text();
    }
    else{
      prix=0;
    }
  }
  catch(error){
    console.log(error);
  }
  return prix;
}
