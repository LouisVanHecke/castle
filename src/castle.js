const rp = require('request-promise');
//const $ = require('cheerio');
//const urlDepart = 'https://www.relaischateaux.com/fr/site-map/etablissements';
const cheerio = require('cheerio');

exports.grabChefName = async function grabChefName (url){
  const option = {
    uri: url,
    transform: function (body){
      return cheerio.load(body);
    }
  };
  var text = "France";
  var listeFrance;
  var listeLienEtChef=[];
  try{
    let $ = await rp(option);
    $("#countryF").find('h3').each(function(i,elem){
      if($(this).text()==text){
        listeFrance=$(this).next().find('li').each(function(i,elem){
          var urlHotel = String($(this).find('a').attr('href'));
          var nom = resize(String($(this).find('a').first().text()));

          var chef = String($(this).find('a').next().attr('href'));
          if(chef.slice(34,38)=="chef"){
            chef = chef.slice(39);
            var nomPrenom = chef.split('-');
            chef='';
            for(let i=0;i<nomPrenom.length-1;i++){
              chef=chef + nomPrenom[i]+" ";
            }
            chef = chef + nomPrenom[nomPrenom.length-1];

          }else{
            chef="";
          }
          if(chef != ""){

            listeLienEtChef.push({urlHotel,chef,nom});
          }
        });
      }
    });
    //console.log($(this).first('a'));
  }
  catch(error){
    console.log(error);
  }

  return listeLienEtChef;
}

function resize(str){
  str=str.slice(45);
  var size = str.length * (-1);
  str=str.slice(size,-41);
  return str;
}
