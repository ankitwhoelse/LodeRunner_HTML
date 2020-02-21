// Pour dessiner
function dessiner() {
    dessinerFond();
    dessinerMurs();
    // creer une fonction dessinerXYZ:
    //  qui va lire le tableau2D, puis va appeler les 3 fonctions si-dessous
    //  dépendament de ce qui est neccessaire pour dessiner un objet a la fois
        dessinerBeton();
        dessinerBriques();
        dessinerEchellesBarres();
    // ajouter une fonction qui enleve les briques/ajoute gold en utilisant le 
    //    même tableau2D, pour enlever briques, on ajoute par dessus l'image nobrick.png
    //dessinerVide();
    //dessinerOr();

}

// Pour dessiner l'image de fond
function dessinerFond() {
    objC2D.save();
    objC2D.fillStyle = 'black';    
    objC2D.fillRect(0,0,objCanvas.width,objCanvas.height);    
    objC2D.restore();
}

// Pour dessiner les murs
function dessinerMurs() {
    objC2D.save();

    for (let intNoMur = 0; intNoMur < tabObjMurs.length; intNoMur++) {
        let objMur = tabObjMurs[intNoMur];
        objC2D.fillStyle = objMur.strCouleur;
        objC2D.beginPath();
        objC2D.moveTo(objMur.intXDebut, objMur.intYDebut);
        objC2D.lineTo(objMur.intXFin, objMur.intYDebut);
        objC2D.lineTo(objMur.intXFin, objMur.intYFin);
        objC2D.lineTo(objMur.intXDebut, objMur.intYFin);
        objC2D.closePath();
        objC2D.fill();
    }
    objC2D.restore();
    }

// Pour dessiner la base de beton du jeu
function dessinerBeton() {
    objC2D.save();
    objImageBrique = new Image();
    objImageBrique.src = 'images/beton.png'
    for (var i = 0; i < 28; i++) {
        objC2D.drawImage(objImageBrique, 16 + i*32, objCanvas.height - 128, 32, 32);
    }
    objC2D.restore();
}

// Pour dessiner les briques du jeu
function dessinerBriques() {


}

// Pour dessiner les echelles et les barres 
function dessinerEchellesBarres() {

    
}
