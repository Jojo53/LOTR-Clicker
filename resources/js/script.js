//#region Global
//#region Variables
let attribLang = 'data-i18n-key';
let langClose = '&times;';
let score = 0;
let bonus = 0;
//#endregion
//#region Tableaux
buildBuying = [
    {name: 'Dwarf', level: 0, score: 0},
    {name: 'Anvil', level: 0, score: 0}
];
bonusShop = [
    {name: 'ironAnvil', bonus: 2, require: 10, describFr: 'Acheter une enclume en fer', nameFr: "Enclume en fer" , describEn: 'Buy an iron anvil', nameEn: 'Iron Anvil'},
    {name: 'mithrilAnvil', bonus: 5, require: 15, describFr: 'Acheter une enclume en mithril', nameFr: 'Enclume en Mithril', describEn: 'Buy a mithril anvil', nameEn: 'Mithril Anvil'}
];
buildShop = [
    {name: 'Dwarf', price: 5 , score: 1, describFr: 'Acheter une petite créature', describEn: 'Buy a little creature'},
    {name: 'Anvil', price: 10, score: 5, describFr: 'Acheter une enclume', describFr: 'Buy an anvil'}
];
//#endregion
//#endregion
//#region Choix de la langue
window.onload = displayLanguage();
function SetLanguage(newlocale){
  CloseLanguage();
  setLocale(newlocale);
}
function CloseLanguage(){
    document.getElementById('Language').remove();
}
//#endregion
//#region Mise à jour de la page
setInterval(function(){
    //#region Langue
    ChoiceLanguage();
    //#endregion
    //#region Magasin
    AddBonus();
    ActionBonus();
    //#endregion
    //#region Constructeur
    AddBuild();
    ActionBuild();
    ShowBuild();
    HideBuild();
    //#endregion
    setLocale(locale);
}, 1);
setInterval(function(){
    for (let buying = 0; buying < buildBuying.length; buying++) {
        if(buildBuying[buying].score > 0){
            score = score + buildBuying[buying].score;
        } 
    }
    document.getElementById('score').innerHTML = score;
}, 1000);
//#endregion
//#region Clique sur l'objet
function Click(){
    document.getElementById('score').innerHTML = UpScore();
}
function UpScore(){
    if(bonus == 0){
        score ++;
    }else{
        
        score = score + bonus;
    }
    return score;
}
//#endregion
//#region Magasin
//#region Bonus
//#region Ajout
function AddBonus(){
    let ShopBonus = document.getElementById('Shop');
    for (let i = 0; i < bonusShop.length; i++) {
        if(score >= bonusShop[i].require && (Content.querySelector('#'+ bonusShop[i].name) == null)){
            let bonusContent = document.createElement('div');
            bonusContent.setAttribute('id', bonusShop[i].name);
            bonusContent.classList.add('bonus', 'Span');
            let bonusText = document.createElement('span');
            if(locale == 'fr'){
                bonusText.innerHTML = bonusShop[i].nameFr;
            }else{
                bonusText.innerHTML = bonusShop[i].nameEn;
            }
            bonusContent.appendChild(bonusText); 
            ShopBonus.appendChild(bonusContent);
        }
    }
}
//#endregion
//#region Action
function ActionBonus(){
    for (let shop = 0; shop < bonusShop.length; shop++) {
        if(document.getElementById(bonusShop[shop].name) != null){
            let bonusItem = document.getElementById(bonusShop[shop].name);
            bonusItem.onclick = function(){
                BuyBonus(bonusShop[shop].name);
            }
            bonusItem.onmouseover = function(){
                ShowDescrib(bonusShop[shop].name, null);
            }
            bonusItem.onmouseout = function(){
                HideDescrib(bonusShop[shop].name, null);
            }
        }
    }
}
//#endregion
//#region Achat
function BuyBonus(bonusItem){
    let bonusName;
    let bonusRequire;
    let bonusContent;
    for (let index = 0; index < bonusShop.length; index++) {
        if(bonusShop[index].name == bonusItem){
            bonusName = bonusShop[index].name;
            bonusRequire = bonusShop[index].require;
            bonusContent = bonusShop[index].bonus;
        }
    }
    score = score - bonusRequire;
    if(score >= 0){
        let removeContent = document.getElementById(bonusName);
        removeContent.parentNode.removeChild(removeContent);
        document.getElementById('score').innerHTML = score;
        for (let i = 0; i < bonusShop.length; i++) {
           if(bonusShop[i].name == bonusName){
            bonusShop.splice(i,1);
           }    
        } 
        bonus += parseInt(bonusContent);
    }
}
//#endregion
//#endregion
//#region Constructeurs
//#region Ajout
function AddBuild(){
    let ShopBuild = document.getElementById('Build');
    for (let i = 0; i < buildShop.length; i++) {
        if(document.getElementById(buildShop[i].name) == null){
            let buildContent = document.createElement('div');
            buildContent.setAttribute('id', buildShop[i].name);
            buildContent.classList.add('build', 'Span');
            let buildText = document.createElement('span');
            buildText.setAttribute('id', buildShop[i].name + 'Text');
            buildText.setAttribute(attribLang, buildContent.getAttribute('id') + 'Title');
            buildContent.appendChild(buildText);
            ShopBuild.appendChild(buildContent);
        } 
    }
}
//#endregion
//#region Action
function ActionBuild(){
    for (let build = 0; build < buildShop.length; build++) {
        if(document.getElementById(buildShop[build].name) != null){
            let buildItem = document.getElementById(buildShop[build].name);
            buildItem.onclick = function(){
                BuyBuild(buildShop[build].name);
            }
            buildItem.onmouseover = function(){
                ShowDescrib(null, buildShop[build].name);
                
            }
            buildItem.onmouseout = function(){
                HideDescrib(null, buildShop[build].name);
            }
        }  
    }
}
//#endregion
//#region  Affichage
//#region Show
function ShowBuild(){
    let item;
    for (let build = 0; build < buildShop.length; build++) {
        if(score >= buildShop[build].price){
            item = document.getElementById(buildShop[build].name);
            item.classList.add('Show');
        }
    }
}
//#endregion
//#region Hide
function HideBuild(){
    let item;
    for (let build = 0; build < buildShop.length; build++) {
        if(score < buildShop[build].price){
            item = document.getElementById(buildShop[build].name);
            item.classList.remove('Show');
            item.classList.add('Hide');
        }
    }
}
//#endregion
//#endregion
//#region Achat
function BuyBuild(Item){
    let Price;
    for (let build = 0; build < buildShop.length; build++) {
        if(buildShop[build].name == Item){
            if(score >= buildShop[build].price){
                Price = buildShop[build].price;
                score = score - Price;
                Price  = Price * 2;
                for (let level = 0; level < buildBuying.length; level++) {
                    if(buildBuying[level].name == buildShop[build].name){
                        buildBuying[level].level = buildBuying[level].level + 1;
                        
                        buildBuying[level].score = buildShop[build].score * buildBuying[level].level;
                        buildShop[build].price  = buildShop[build].price * 2;
                    }
                    document.getElementById('score').innerHTML = score;
                }
                
            }
        }    
    }
}
//#endregion
//#endregion
//#region Tooltip
//#region Show
function ShowDescrib(bonusName = null, buildName = null){
    let Describ;
    let Name;
    let Item;
    let Level;
    let Price;
    if(bonusName != null){
        Item = document.getElementById(bonusName);
        Name = bonusName;
        for (let i = 0; i < bonusShop.length; i++) {
            if(bonusShop[i].name == Name){
                if(locale == 'fr'){
                    Describ = bonusShop[i].describFr;
                    Price = 'prix : ' + bonusShop[i].require;
                }else{
                    Describ = bonusShop[i].describEn;
                    Price = 'price : ' + bonusShop[i].require;
                }
            }
        }
    }
    if(buildName != null){
        Item = document.getElementById(buildName);
        Name = buildName;
        for (let i = 0; i < buildShop.length; i++) {
            if(buildShop[i].name == Name){
                if(locale == 'fr'){
                    Describ = buildShop[i].describFr;
                    Level = 'niveau : ' + buildBuying[i].level;
                    Price = 'prix : ' + buildShop[i].price;
                }else{
                    Describ = buildShop[i].describEn;
                    Level = 'level : ' + buildBuying[i].level;
                    Price = 'price : ' + buildShop[i].price;
                }
            }
        }
    }
    let describMain = document.createElement('div');
    describMain.setAttribute('id', Name + 'Describ');
    describMain.classList.add('Tooltip');
    let priceContent = document.createElement('span');
    priceContent.setAttribute('id', Name + 'PriceContent');
    priceContent.innerHTML = Price;
    let describContent = document.createElement('span');
    describContent.setAttribute('id', Name + 'DescribContent');
    describContent.innerHTML = Describ;
    if(Level != null){
        let levelContent = document.createElement('span');
        levelContent.setAttribute('id', Name + 'LevelContent');
        levelContent.innerHTML = Level;
        Item.appendChild(describMain);
        describMain.appendChild(priceContent);
        describMain.appendChild(describContent);
        describMain.appendChild(levelContent);
    }else{
        Item.appendChild(describMain);
        describMain.appendChild(priceContent);
        describMain.appendChild(describContent);
    }
    setLocale(locale);
}
//#endregion
//#region Hide
function HideDescrib(bonusName = null, buildName = null){
    let Item;
    if(bonusName != null){
        Item = document.getElementById(bonusName + 'Describ');
    }
    if(buildName != null){
        Item = document.getElementById(buildName + 'Describ'); 
    }
    Item.remove();
}
//#endregion
//#endregion
//#endregion
//#region Langue
//#region Affichage
function displayLanguage(){
    let mainTitle = document.getElementById('title');
    //#region Main
    let language = document.createElement('div');
    language.setAttribute('id', 'Language');
    language.classList.add('Language-Main');
    //#endregion
    //#region Content
    let languageContent = document.createElement('div');
    languageContent.classList.add('Language-Content');
    //#endregion
    //#region Menu
    let languageMenu = document.createElement('div');
    languageMenu.classList.add('Language-Menu');
    let languageTitle = document.createElement('span');
    languageTitle.setAttribute(attribLang, 'languageTitle');
    let languageClose = document.createElement('span');
    languageClose.setAttribute('id', 'Language-Close');
    languageClose.innerHTML = langClose;
    languageClose.classList.add('close');
    //#endregion
    //#region Choice
    let languageFr = document.createElement('span');
    languageFr.classList.add('Language-Choice');
    languageFr.setAttribute(attribLang, 'languageFr');
    let languageEn = document.createElement('span');
    languageEn.classList.add('Language-Choice');
    languageEn.setAttribute(attribLang, 'languageEn');
    //#endregion
    //#region Click
    languageClose.onclick = function(){
        CloseLanguage();
    }
    languageFr.onclick = function(){
        SetLanguage('fr');
    }
    languageEn.onclick = function(){
        SetLanguage('en');
    }
    //#endregion
    //#region Child
    document.body.insertBefore(language, mainTitle);
    language.appendChild(languageContent);
    languageContent.appendChild(languageMenu);
    languageMenu.appendChild(languageTitle);
    languageMenu.appendChild(languageClose);
    languageContent.appendChild(languageFr);
    languageContent.appendChild(languageEn);
    //#endregion
}
//#endregion
//#region Fermer
function ChoiceLanguage(){
    let languageMain = document.getElementById('Language');
    if(languageMain != null){  
        window.onclick = function(event){
            if(event.target == languageMain){
                CloseLanguage();
            }  
        }
    }
}
//#endregion
//#endregion