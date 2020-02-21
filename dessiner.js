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
    dessinerTexte();
    dessinerLodeRunner();
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
    objImageBeton = new Image();
    objImageBeton.src = 'images/beton.png'
    
    if (tabDispo != null) {
        for (var i = 0; i < tabDispo.length; i++) {
            var ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (tabDispo[i][k] == "4") {
                    objC2D.drawImage(objImageBeton, k*32 + 16,i*32 + 32, 32, 32);
                } 
            }
        }
    }

    objC2D.restore();
}

// Pour dessiner les briques du jeu
function dessinerBriques() {
    objC2D.save();
    objImageBrique = new Image();
    objImageBrique.src = 'images/brick.png'
    
    if (tabDispo != null) {
        for (var i = 0; i < tabDispo.length; i++) {
            var ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (tabDispo[i][k] == "1") {
                    objC2D.drawImage(objImageBrique, k*32 + 16,i*32 + 32, 32, 32);
                } 
            }
        }
    }

    objC2D.restore();
}

// Pour dessiner les echelles et les barres 
function dessinerEchellesBarres() {
    objC2D.save();
    objImageBarre = new Image();
    objImageBarre.src = 'images/barre.png'
    objImageEchelle = new Image();
    objImageEchelle.src = 'images/ladder.png'
    
    if (tabDispo != null) {
        for (var i = 0; i < tabDispo.length; i++) {
            var ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (tabDispo[i][k] == "2") {
                    objC2D.drawImage(objImageEchelle, k*32 + 16,i*32 + 32, 32, 32);
                } else if  (tabDispo[i][k] == "3") {
                    objC2D.drawImage(objImageBarre, k*32 + 16,i*32 + 32, 32, 32); 
                }
            }
        }
    }

    objC2D.restore();
}

// Pour dessiner les éléments de texte
function dessinerTexte() {
    objC2D.save();

    // Titre dans mur du haut
    objC2D.beginPath();
    objC2D.strokeStyle = 'black'; 
    objC2D.lineWidth = 2;
    objC2D.font = '20pt Verdana'; // Police de caractères
    objC2D.textAlign = 'center';
    objC2D.strokeText('Lode Runner by the bois',objCanvas.width/2,25);
    objC2D.closePath();

function dessinerLodeRunner(){
    objC2D.save();
    objC2D.drawImage(objLodeRunner.objImage, objLodeRunner.intX, objLodeRunner.intY, objLodeRunner.intLargeur, objLodeRunner.intHauteur);
    objC2D.restore();
}
}