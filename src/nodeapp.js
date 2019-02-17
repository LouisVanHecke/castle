const rp = require('request-promise');
const cheerio = require('cheerio');
const castle = require('./castle');
const michelin = require('./michelin');
const allPrices = require('./allPrices');
var fs = require('fs');
const url = 'https://www.relaischateaux.com/fr/site-map/etablissements';


Main();

async function Main(){
  /*var tab = jsonToTab('./endResult.json'); // ligne pour lire un fichier JSON
  console.log(tab);*/


  var allNomChefMichelin = await michelin.grabAllNames();
  var allNomHotelChefCastle = await castle.grabChefName(url);
  console.log(allNomHotelChefCastle);

  console.log(allNomChefMichelin);
  console.log(allNomHotelChefCastle);
  var tri = isInside(allNomHotelChefCastle,allNomChefMichelin);
  var allPricesAndUrlAndChef = await allPrices.grabAllPrices(tri);
  tabToJson(allPricesAndUrlAndChef,'endResult.json');
}
function tabToJson(tab,file){
  var str = JSON.stringify(tab);
  fs.writeFile(file,str,function (err) {
  if (err) throw err;
  console.log('Saved!');
  });
}
function jsonToTab(file){
  var result = fs.readFileSync(file);
  result= result.toString();
  var tabResult = JSON.parse(result);
  return tabResult;
}
function isInside(tab1,tab2){
  let tabResultat=[];
  for(let i =0;i<tab1.length;i++){
    for(let j=0;j<tab2.length;j++){
      if(tab1[i].chef==tab2[j]){
        tabResultat.push(tab1[i]);
      }
    }
  }

  return tabResultat;
}
