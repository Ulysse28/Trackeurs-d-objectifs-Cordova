/*
Tableau de bord
Windows Cordova Application
Javascript File
By Ulysse Valdenaire
01/08/2021
*/

/*Variables globales*/

/*En rapport avec le formualire*/
/*Liste des types d'objectifs possibles*/
let listTypeObjectifs = ['IT', 'Sport', 'Lecture', "Ecriture", "Autres"];
/*Div qui contient les objectifs du jour et donc le formualire d'objectifs*/
const sectionOjectif = document.getElementById('box2');
/*Boutton pour ajouter un objectifs*/
const btnAdd = document.getElementById('btnAdd');
/*Déclaration des éléments qui vons constituer le formulaire pour ajouter un objectif*/
const divForm = document.createElement('div');
divForm.setAttribute('id', "divForm");
const form = document.createElement('form');
/*Nom de l'objectif*/
const labelName = document.createElement('label');
const inputName = document.createElement('input');
/*Type de l'objectif*/
const labelType = document.createElement('label');
const selectType = document.createElement('select');
/*Temporalité de l'objectif*/
let listTime = ["day", "week", "month", "year"];
const labelTime = document.createElement('label');
const selectTime = document.createElement('select');
/*Difficulté de l'objectif*/
let listDifficulty = [1, 2, 3, 4, 5];
const labelDifficulty = document.createElement('label');
const selectDifficulty = document.createElement('select');
/*Priorité de l'objectif*/
let listPriority = ["Prioritaire", "Moyen", "Peu prioritaire"];
const labelPriority = document.createElement('label');
const selectPriority = document.createElement('select');
/*Bouton valider l'objectif*/
const validBtnForm = document.createElement('button');
//La div qui contient la liste des objectifs
const divObjectif = document.getElementById('objectifs');
//variable pour écrire ou lire dans un fichier
let check_rw;
//data --> les données écrites dans un fichier
let data;
//dataRead = les données lues dans le fichier
let dataRead;
//boutton voir les ojectifs
let buttonObjectifs = document.getElementById('seeObjectifs');

//Bouton modifier un objectif
let buttonModifie = document.getElementById('btnModifier');

//les checkbox
let checkboxInput = document.getElementsByClassName('checkboxInput');


/*constructor de l'objet Objectif*/
function Objectif(name, type, time, difficulty, priority, valider) {
    this.name = name;
    this.type = type;
    this.time = time;
    this.difficulty = difficulty;
    this.priority = priority;
    this.valider = valider;
}

//liste qui contient tous les objectifs
listObjectifs = [];

//ondeviceready on écrit et on lit dans le fichier
document.addEventListener("deviceready", onDeviceReady, false);

/*Quand on clique sur btnAdd, un formulaire apparait pour ajouter un objectif*/
btnAdd.addEventListener('click', function () {
    createForm();
})

/*fonction qui créé un formulaire d'objectif*/
function createForm() {
    /*Création d'un label et d'un input pour le nom de l'objectif*/
    labelName.textContent = "Nom de l'objectif"
    form.appendChild(labelName);
    inputName.setAttribute('type', 'text');
    
    form.appendChild(inputName);

    /*Création du label et du select pour le type d'objecti*/
    const br1 = document.createElement('br');
    form.appendChild(br1);
    labelType.textContent = "Quel est le type de l'objectif ?";
    form.appendChild(labelType);
    form.appendChild(selectType);
    /*Création des options d'objectifs à l'aide d'une boucle for*/
    for (let i = 0; i < listTypeObjectifs.length; i++) {
        let options = document.createElement('option');
        options.textContent = listTypeObjectifs[i];
        selectType.appendChild(options);
    }
    const br2 = document.createElement('br');
    form.appendChild(br2);
    /*Ajout des options pour la temporalité des objectifs*/
    labelTime.textContent = "Quand cet objectif doit il être atteint ?";
    form.appendChild(labelTime);
    for (let i = 0; i < listTime.length; i++) {
        let optionsTime = document.createElement('option');
        optionsTime.textContent = listTime[i];
        selectTime.appendChild(optionsTime);
    }
    form.appendChild(selectTime);
    const br3 = document.createElement('br');
    form.appendChild(br3);
    /*Ajout des niveaux de diificulté d'un objectif 1 --> 5*/
    labelDifficulty.textContent = "Quel est le niveau de difficulté de l'objectif ?";
    form.appendChild(labelDifficulty);
    for (let i = 0; i < listDifficulty.length; i++) {
        let optionsDif = document.createElement('option');
        optionsDif.textContent = listDifficulty[i];
        selectDifficulty.appendChild(optionsDif);
    }
    form.appendChild(selectDifficulty);
    const br4 = document.createElement('br');
    form.appendChild(br4);
    /*Ajout des niveaux de priorité*/
    labelPriority.textContent = "Quel est le niveau de priorité ?";
    form.appendChild(labelPriority);
    form.appendChild(selectPriority);
    for (let i = 0; i < listPriority.length; i++) {
        let optionsPriority = document.createElement('option');
        optionsPriority.textContent = listPriority[i];
        selectPriority.appendChild(optionsPriority);
    }
    /*Ajouter le bouton valider à la fin du formulaire*/
    validBtnForm.textContent = "Valider";
    form.appendChild(validBtnForm);
    /*Ajouter du formulaire à la divForm + ajout de divForm à la div principale des objectifs du jour*/
    divForm.appendChild(form);
    sectionOjectif.appendChild(divForm);
}

/*Fonction qui crée un élément objectif à partir d'un objet objectif*/
function createElementObjectif(objectif) {
    //la checkbox
    let checkboxObjectif = document.createElement('input');
    checkboxObjectif.setAttribute('type', 'checkbox');
    checkboxObjectif.setAttribute('class', 'checkboxInput');
    let name = JSON.stringify(objectif.name);

    checkboxObjectif.setAttribute('name', objectif.name);
    divObjectif.appendChild(checkboxObjectif);
    //l'objectif à partir d'un objet objectif
    let labelObjectif1 = document.createElement('label');
    labelObjectif1.textContent = objectif.name;
    divObjectif.appendChild(labelObjectif1);
    let labelObjectif = document.createElement('label');
    labelObjectif.textContent = objectif.name + "  Type : " + objectif.type + " Diffculté :  " +
    + objectif.difficulty + "  Quand  : " + objectif.time +" Priorité :  " + objectif.priority +"  " + objectif.valider;
    divObjectif.appendChild(labelObjectif);
    const br5 = document.createElement('br');
    divObjectif.appendChild(br5);
}
function onDeviceReady() {

    console.log(cordova.file);
    check_rw = 'r';
    accessFileStorageToWriteData();
   



    buttonModifie.addEventListener('click', function () {

        let objectifToModifie;
        for (let i = 0; i < checkboxInput.length; i++) {
            if (checkboxInput[i].checked == true) {
                console.log(checkboxInput[i].name);
                objectifToModifie = checkboxInput[i].name;
            }
        }

        console.log(dataRead);

        let dataObjectif = JSON.parse(dataRead);

        for (let i = 0; i < dataObjectif.length; i++) {
            if (dataObjectif[i].name == objectifToModifie) {
                console.log(dataObjectif[i]);
            }
        }

        createForm();


    })



    let dataObjectifs;
    
    //function pour afficher les objectifs quand on clique qur le bouton 'voir les objectifs'
    buttonObjectifs.addEventListener('click', function () {
        console.log(dataRead);
        dataObjectifs = JSON.parse(dataRead);

        console.log(dataObjectifs);
        for (objectif of dataObjectifs) {
            console.log(objectif);
            createElementObjectif(objectif)
        }

       

    })
    

    /*Evenement sur le bouton valider du formulaire*/
    validBtnForm.addEventListener('click', function (e) {
        e.preventDefault();
        /*Creation d'un objet objectif à partir des données du formulaire*/
        let objectif = new Objectif(inputName.value, selectType.value, selectTime.value, selectDifficulty.value, selectPriority.value, false)
        /*On supprime le formulaire*/
        divForm.remove(form);
        /*On affiche l'objectif*/
        createElementObjectif(objectif)


        //On vérifie si l'objectif existe deja dans listObjectif(si on modifie, l'objectif existe deja')'
        //on supprimme l'ancien et on le remplace par le nouveau'
        let arrayObj = JSON.parse(dataRead);
        console.log(arrayObj);
        console.log(dataObjectifs);
        console.log(objectif.name);

        for (let i = 0; i < arrayObj.length; i++) {
            console.log(arrayObj[i].name);
            if (arrayObj[i].name == objectif.name) {
                console.log('ok');
                arrayObj.splice(i - 1, i);
                console.log(arr)
            } else {
                console.log('pas ok');
            }
        }

        console.log(arrayObj);
        //on ajoute l'objet objectif à la liste des objectifs
        listObjectifs.push(objectif);
        //liste2 --> liste finale qui va contenir les données
        let liste2;
        //On verifie si le fichier est vide ou pas
        if (dataRead.length == 0) {
            //si ele fichier est vide alors liste2 prend la valeur de listObjectifs
            liste2 = listObjectifs;
        } else {
            //si le ficheor n'est pas vide alors on recupere le contenu du fichier et on le concat à listObjeectif
            let fileReturn = JSON.parse(dataRead);
            liste2 = fileReturn.concat(listObjectifs); 
        }
        //puis on le met sous forme de string
        data = JSON.stringify(liste2);
        //et on l'envoie dans le fichier'
        check_rw = 'w';
        accessFileStorageToWriteData();     
    })
}


/**
 * -----------------------CODE DU FILE PLUGIN-----------------------------------------------------------------------
 */
//Code du plugin file
let accessFileStorageToWriteData = function () {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, createDirectoryFS, failureInGettingFile);
};

//on créé un dossier
let createDirectoryFS = function (fileSystem) {
    fileSystem.root.getDirectory("Tableau de Bord", { create: true }, localStorageGetFS);
};

//On crée un fichier
let localStorageGetFS = function (dirEntry) {
    dirEntry.getFile("file1.json", {
        create: true,
        exclusive: false
    }, gotFileEntry, failureInGettingFile);
};

let gotFileEntry = function (fileEntry) {
    //soit on écrit
    if (check_rw == "w") {
        fileEntry.createWriter(gotFileWriter, failureInGettingFile);
    }
    //soit on lit
    else if (check_rw == "r") {
        fileEntry.file(gotFile, failureInGettingFile);
    }
};

//on écrit les données dans le fichier
let gotFileWriter = function (writer) {
    let dataToStore = data;
    writer.write(dataToStore);
    console.log("write sucess");
};

//on lit les données dans le fichier
let gotFile = function (file) {
    readAsText(file);
};

//on lit
let readAsText = function (file) {
    let reader = new FileReader();
    reader.onloadend = function (evt) {
        dataRead = this.result;
        console.log("dataRead : " + dataRead);

    };
    reader.readAsText(file);

};

//fonction d'erreur
let failureInGettingFile = function (error) {
    console.log(error.code);
};





