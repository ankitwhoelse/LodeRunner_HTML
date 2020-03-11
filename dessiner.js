// Pour dessiner
function dessiner() {
    dessinerFond();
    dessinerMurs();
    dessinerBeton();
    dessinerBriques();
    dessinerEchellesBarres();
    dessinerOr();
    dessinerLodeRunner();
    dessinerGarde();
    dessinerBombe();

    if (!binGameOver)
        dessinerTexte();
    else
        dessinerGameOver();

    if (intLingotOrRamasse > 4) {
        if (audioEchelleF)
            audio12.play();
        audioEchelleF = false;
        dessinerEchelleEscape();
    }
}

// Pour dessiner l'image de fond
function dessinerFond() {
    objC2D.save();
    objC2D.fillStyle = 'black';
    objC2D.fillRect(0, 0, objCanvas.width, objCanvas.height);
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

    if (tabDispo != null) {
        for (var i = 0; i < tabDispo.length; i++) {
            var ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (tabDispo[i][k] == "4") {
                    objC2D.drawImage(objImageBeton, k * 32 + 16, i * 32 + 32, 32, 32);
                }
            }
        }
    }

    objC2D.restore();
}

// Pour dessiner les briques du jeu 
//    et ajouter lingots d'or
function dessinerBriques() {
    objC2D.save();

    if (tabDispo != null) {
        for (var i = 0; i < tabDispo.length; i++) {
            var ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (tabDispo[i][k] == "1") {
                    objC2D.drawImage(objImageBrique, k * 32 + 16, i * 32 + 32, 32, 32);
                }
            }
        }
    }

    objC2D.restore();
}

// Pour dessiner les echelles et les barres 
function dessinerEchellesBarres() {
    objC2D.save();

    if (tabDispo != null) {
        for (var i = 0; i < tabDispo.length; i++) {
            var ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (tabDispo[i][k] == "2") {
                    objC2D.drawImage(objImageEchelle, k * 32 + 16, i * 32 + 32, 32, 32);
                } else if (tabDispo[i][k] == "3") {
                    objC2D.drawImage(objImageBarre, k * 32 + 16, i * 32 + 32, 32, 32);
                }
            }
        }
    }

    objC2D.restore();
}

// Pour dessiner l'echelle de fin
function dessinerEchelleEscape() {
    objC2D.save();

    if (tabDispo != null) {
        for (var i = 0; i < tabDispo.length; i++) {
            var ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (tabDispo[i][k] == "7") {
                    objC2D.drawImage(objImageEchelle, k * 32 + 16, i * 32 + 32, 32, 32);
                }
            }
        }
    }

    objC2D.restore();
}

// Pour dessiner les lingots d'or
function dessinerOr() {
    objC2D.save();

    if (tabDispo != null && binNextLevel == true) {
        for (var i = 0; i < tabDispo.length; i++) {
            var ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (tabDispo[i][k] == "6") {
                    objC2D.drawImage(objImageOr, k * 32 + 16, i * 32 + 32, 32, 32);
                }
            }
        }
    }

    objC2D.restore();
}

// Pour dessiner les éléments textes
function dessinerTexte() {
    objC2D.save();

    // Titre dans mur du haut
    objC2D.beginPath();
    objC2D.strokeStyle = 'black';
    objC2D.fillStyle = "black";
    objC2D.lineWidth = 1;
    objC2D.font = '20pt Verdana'; // Police de caractères
    objC2D.textAlign = 'center';
    objC2D.strokeText('Lode Runner par Ribensky/Ankit', objCanvas.width / 2, 25);
    objC2D.fillText('Lode Runner par Ribensky/Ankit', objCanvas.width / 2, 25);
    objC2D.closePath();

    // Texte de pointage
    objC2D.beginPath();
    objC2D.fillStyle = "yellow";
    objC2D.strokeStyle = "orange";
    objC2D.lineWidth = 1;
    objC2D.font = '30pt Impact'; // Police de caractères
    objC2D.textAlign = 'center';
    objC2D.fillText('Points : ' + pad(intPoints, 6), objCanvas.width / 6, objCanvas.height - 40);
    objC2D.strokeText('Points : ' + pad(intPoints, 6), objCanvas.width / 6, objCanvas.height - 40);
    objC2D.closePath();

    // Texte de niveau
    objC2D.beginPath();
    objC2D.fillStyle = "yellow";
    objC2D.strokeStyle = "orange";
    objC2D.lineWidth = 1;
    objC2D.font = '30pt Impact'; // Police de caractères
    objC2D.textAlign = 'center';
    objC2D.fillText('Niveau : ' + pad(intNiveau, 2), objCanvas.width / 2, objCanvas.height - 40);
    objC2D.strokeText('Niveau : ' + pad(intNiveau, 2), objCanvas.width / 2, objCanvas.height - 40);
    objC2D.closePath();

    // Texte de vies restantes
    objC2D.beginPath();
    objC2D.fillStyle = "yellow";
    objC2D.strokeStyle = "orange";
    objC2D.lineWidth = 1;
    objC2D.font = '30pt Impact'; // Police de caractères
    objC2D.textAlign = 'center';
    objC2D.fillText('Vies : ' + pad(intVies, 2), objCanvas.width - 164, objCanvas.height - 40);
    objC2D.strokeText('Vies : ' + pad(intVies, 2), objCanvas.width - 164, objCanvas.height - 40);
    objC2D.closePath();
}


function dessinerGameOver() {
    // gray box
    objC2D.save();
    objC2D.beginPath(); objC2D.moveTo(16, objCanvas.height - 16);
    objC2D.lineTo(16, objCanvas.height - 96); objC2D.lineTo(objCanvas.width - 16, objCanvas.height - 96);
    objC2D.lineTo(objCanvas.width - 16, objCanvas.height - 16);
    objC2D.fillStyle = 'gray'; objC2D.strokeStyle = 'white';
    objC2D.fill(); objC2D.lineWidth = 5; objC2D.stroke();
    objC2D.restore();

    // Texte de GAME-OVER
    objC2D.save();
    objC2D.beginPath();
    objC2D.fillStyle = "white";
    objC2D.font = '40pt Impact'; // Police de caractères
    objC2D.textAlign = 'center';
    objC2D.fillText('GAME-OVER : ' + pad(intPoints, 6) + " Points", objCanvas.width / 2, objCanvas.height - 35);
    objC2D.strokeStyle = "red"; objC2D.lineWidth = 4;
    objC2D.strokeText('GAME-OVER : ' + pad(intPoints, 6) + " Points", objCanvas.width / 2 + 1, objCanvas.height - 35);
    objC2D.strokeStyle = "cyan"; objC2D.lineWidth = 2;
    objC2D.strokeText('GAME-OVER : ' + pad(intPoints, 6) + " Points", objCanvas.width / 2 - 1, objCanvas.height - 35);
    objC2D.closePath();
    objC2D.restore();

    objC2D.beginPath();
    objC2D.strokeStyle = 'gray';
    objC2D.fillStyle = "white";
    objC2D.lineWidth = 8;
    objC2D.font = '25pt Verdana'; // Police de caractères
    objC2D.textAlign = 'center';
    objC2D.strokeText('Veuillez appuyer sur la touche F5', objCanvas.width / 2, 28);
    objC2D.fillText('Veuillez appuyer sur la touche F5', objCanvas.width / 2, 28);
    objC2D.closePath();
}


function dessinerLodeRunner() {
    objC2D.save();

    if (tabDispo != null) {
        for (var i = 0; i < tabDispo.length; i++) {
            var ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (tabDispo[i][k] == "5") {
                    if (booStart) {
                        objLodeRunner.intX = k * 32 + 16;
                        objLodeRunner.intY = i * 32 + 32;
                    }
                    if (spriteCount == 3)
                        objC2D.drawImage(objLodeRunner.Image, srcX3, srcY3, width3, height3, objLodeRunner.intX, objLodeRunner.intY, 32, 32);
                    else if (spriteCount == 2) {
                        objC2D.drawImage(objLodeRunner.Image, srcX2, srcY2, width2, height2, objLodeRunner.intX, objLodeRunner.intY, 32, 32);
                        touche = null;
                    }
                    else if (spriteCount == 1) {
                        objC2D.drawImage(objLodeRunner.Image, objLodeRunner.intX, objLodeRunner.intY, 32, 32);
                        touche = null;
                    }
                    if (booStart == false)
                        touche = null;
                    // objC2D.drawImage(character,srcX,srcY,width,height,x,y,width,height);
                }
            }
        }
    }

    objC2D.restore();
}
function dessinerBombe(){
if(tabBombesDroite.length!=0)
{
    for(let i=0;i<tabBombesDroite.length;i++)
    {
        if(tabBombesDroite[i].tempsBombeDroite<15)
        objC2D.drawImage(objIMGBombe,tabBombesDroite[i].intX,tabBombesDroite[i].intY,tabBombesDroite[i].intLargeur,tabBombesDroite[i].intHauteur);
    }
}
    if(binBombeGauche==true)
    {
        objC2D.drawImage(objIMGBombe,bombeGauche.intX,bombeGauche.intY,bombeGauche.intLargeur,bombeGauche.intHauteur);
    }

}