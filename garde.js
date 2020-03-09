 
// liste de fonctions / choses a faire
// initialiser caracteristiques
// init position random unique
// mouvement
// dessiner

function initGarde() {
    tabGardien = new Array();
    let objGarde = null;

    if (tabDispo != null && tabGardien != null) {
        for (var i = 0; i < tabDispo.length; i++) {
            var ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (tabDispo[i][k] == 8) {
                    objGarde = new Object();
                    objGarde.Image = objImageGardeVDroite;
                    objGarde.spriteWidth = 96;
                    objGarde.spriteHeight = 32;
                    objGarde.rows = 1;
                    objGarde.cols = 3;
                    objGarde.width = objGarde.spriteWidth / objGarde.cols;
                    objGarde.height = objGarde.spriteHeight / objGarde.rows;
                    objGarde.curFrame = 0;
                    objGarde.frameCount = 3;
                    objGarde.srcX = objGarde.curFrame * objGarde.width;
                    objGarde.srcY = 0;
                    objGarde.or = false;
                    objGarde.intX = (k) * 32;
                    objGarde.intY = (i + 1) * 32;
                    objGarde.initIntX = objGarde.intX;
                    objGarde.initIntY = objGarde.intY;
                    objGarde.intPositionBloqueGarde = 0;
                    objGarde.Trou = false;
                    tabGardien.push(objGarde);
                    tabDispo[i][k] = 0;
                }
            }
        }
    }


}

function deplacementGarde() {
    // Advanced AI... aka une tonne de if else
    let posLodeX = objLodeRunner.intX;
    let posLodeY = objLodeRunner.intY;

    for (let intNoGarde = 0; intNoGarde < tabGardien.length; intNoGarde++) {

        let objGarde = tabGardien[intNoGarde];
        let intMouvement = 0;

        let posGardeX = objGarde.intX;
        let posGardeY = objGarde.intY;

        // GARDE TOMBE DANS UN TROU
        if (tabDispo[Math.floor(objGarde.intY / 32)][Math.floor(objGarde.intX / 32)] == "4") {
            
            if (objGarde.or) // if garde possede un lingot, il l'échappe
                tabDispo[Math.floor(objGarde.intY / 32) - 2][Math.floor(objGarde.intX / 32)] = "6";

            objGarde.Trou = true;

            objGarde.Image = objImageGardeVChuteTrou;
            if (objGarde.intPositionBloqueGarde == 0) {
                if (binBriqueDroite) {
                    objGarde.intX = objGarde.intX + 10;
                    objGarde.intY = objGarde.intY - 5;
                }
                else if (binBriqueGauche) {
                    objGarde.intX = objGarde.intX - 10;
                    objGarde.intY = objGarde.intY - 5;
                }+
                objGarde.intPositionBloqueGarde++;
                intPoints += 75;

            } else if (tabDispo[Math.floor(objGarde.intY / 32) - 1][Math.floor(objGarde.intX / 32)] == "1") {
                objGarde.intX = objGarde.initIntX;
                objGarde.intY = objGarde.initIntY;
                objGarde.Image = objImageGardeVGauche;
                objGarde.intPositionBloqueGarde = 0;
                intPoints += 75;
                objGarde.Trou = false;
            }

        }

        if (!objGarde.Trou) {
            objGarde.curFrame = ++objGarde.curFrame % objGarde.frameCount;
            objGarde.srcX = objGarde.curFrame * objGarde.width;
            objGarde.srcY = 0;

            // MOUVEMENT BASIC DROITE / GAUCHE   ||   Artificial intelligence alpha 0.4
            if (tabDispo != null) {
                for (var i = 0; i < tabDispo.length; i++) {
                    var ligneDispo = tabDispo[i];
                    for (var k = 0; k < ligneDispo.length; k++) {

                        objGarde.cols = 3;
                        objGarde.spriteWidth = 96;
                        objGarde.frameCount = 3;

                        if (posGardeY > posLodeY && ([i - 1] > 0)) { 
                            // garde plus bas on map

                            if (tabDispo[i][k] == "2") {
                                let ladderX = k * 32 + 16;
                                let ladderY = i * 32 + 32;


                                if (ladderX < objCanvas.width/2 && posLodeX < objCanvas.width/2) {
                                    // left side

                                    if (ladderX >= posGardeX && (objGarde.intY - 32 < ladderY && objGarde.intY > ladderY - 32)) {
                                        intMouvement = 1;   // droite
                                        break;
                                    } else if (ladderX <= posGardeX && (objGarde.intY - 32 < ladderY && objGarde.intY > ladderY - 32)) {
                                        intMouvement = 2;   // gauche
                                        break;
                                    }
                                } else if (ladderX > objCanvas.width/2 && posLodeX > objCanvas.width/2) {
                                    // right side
                                    
                                    if (ladderX <= posGardeX && (objGarde.intY - 32 < ladderY && objGarde.intY > ladderY - 32)) {
                                        intMouvement = 2;   // gauche
                                        break;
                                    } else if (ladderX >= posGardeX && (objGarde.intY - 32 < ladderY && objGarde.intY > ladderY - 32)) {
                                        intMouvement = 1;   // droite
                                        break;
                                    }
                                }
                            }

                        } else if (posGardeY < posLodeY && ([i + 1] < tabDispo.length)) {  
                            // garde plus haut on map

                            if (tabDispo[i+1][k] == "2" && tabDispo[i][k] == "0" || tabDispo[i+1][k] == "0" && tabDispo[i][k] == "0") {
                                let ladderX = k * 32 + 16;
                                let ladderY = i * 32 + 32;

                                if (ladderX < objCanvas.width/2 && posLodeX < objCanvas.width/2) {  
                                    // left side

                                    if (ladderX >= posGardeX && (objGarde.intY + 32 > ladderY && objGarde.intY < ladderY + 32)) {
                                        intMouvement = 1;   // droite
                                    }
                                    else if (ladderX <= posGardeX && (objGarde.intY + 32 > ladderY && objGarde.intY < ladderY + 32)) {
                                        intMouvement = 2;   // gauche
                                    }
                                } else if (ladderX > objCanvas.width/2 && posLodeX > objCanvas.width/2) { 
                                    // right side
                                    
                                    if (ladderX <= posGardeX && (objGarde.intY + 32 > ladderY && objGarde.intY < ladderY + 32)) {
                                        intMouvement = 2;   // gauche
                                        break;
                                    }
                                    else if (ladderX >= posGardeX && (objGarde.intY + 32 > ladderY && objGarde.intY < ladderY + 32)) {
                                        intMouvement = 1;   // droite
                                    }
                                }
                            }
                        } else if (posGardeY == posLodeY) { // garde au meme niveau on map

                            if (posGardeX > posLodeX) {
                                intMouvement = 2;
                                break;
                            } else if (posGardeX < posLodeX) {
                                intMouvement = 1;
                            }
                        }

                        if (intMouvement == 1) {
                            if (objGarde.or)
                                objGarde.Image = objImageGardeVDroiteOr;
                            else
                                objGarde.Image = objImageGardeVDroite;
                        } else if (intMouvement == 2) {
                            if (objGarde.or)
                                objGarde.Image = objImageGardeVGaucheOr;
                            else
                                objGarde.Image = objImageGardeVGauche;
                        }

                    }
                }
            }
        }

        //Barre de franchissement
        if (tabDispo[Math.floor(objGarde.intY / 32) - 1][Math.floor(objGarde.intX / 32)] == "3") {
            objGarde.cols = 3;
            objGarde.spriteWidth = 96;
            objGarde.frameCount = 3;
            if (objGarde.or && intMouvement == 2)
                objGarde.Image = objImageGardeVBarreGaucheOr;
            else if (!objGarde.or && intMouvement == 2)
                objGarde.Image = objImageGardeVBarreGauche;
            else if (objGarde.or && intMouvement == 1)
                objGarde.Image = objImageGardeVBarreDroiteOr;
            else if (!objGarde.or && intMouvement == 1)
                objGarde.Image = objImageGardeVBarreDroite;
        }

        //Barre de franchissement lorsqu'il tombe
        if (tabDispo[Math.floor(objGarde.intY / 32)][Math.floor(objGarde.intX / 32)] == "3") {
            objGarde.intY = objGarde.intY + 16;
            intMouvement = 2;
            objGarde.cols = 3;
            objGarde.spriteWidth = 96;
            objGarde.frameCount = 3;
            if (objGarde.or && intMouvement == 2)
                objGarde.Image = objImageGardeVBarreGaucheOr;
            else if (!objGarde.or && intMouvement == 2)
                objGarde.Image = objImageGardeVBarreGauche;
            else if (objGarde.or && intMouvement == 1)
                objGarde.Image = objImageGardeVBarreDroiteOr;
            else if (!objGarde.or && intMouvement == 1)
                objGarde.Image = objImageGardeVBarreDroite;
        }

        // MOUVEMENT VERS LE BAS (TOMBER)
        for (var i = 0; i < tabDispo.length; i++) {
            let ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (i + 1 < tabDispo.length) {

                    if (tabDispo[i + 1][k] == "0" && tabDispo[i][k] != "1" && tabDispo[i][k] != "2" && tabDispo[i][k] == "0") {
                        let videX = k * 32 + 16;
                        let videY = i * 32 + 32;

                        if (posLodeY > posGardeY || posLodeY < posGardeY || posLodeY == posGardeY) {
                            // console.log("x "+ videX + " Y"+videY);
                            if ((objGarde.intX - 16 < videX && objGarde.intX + 16 > videX) &&
                                (objGarde.intY + 32 > videY && objGarde.intY < videY + 32)) {
                                objGarde.cols = 2;
                                objGarde.spriteWidth = 64;
                                objGarde.frameCount = 2;
                                intMouvement = 4;
                                if (objGarde.or)
                                    objGarde.Image = objImageGardeVChuteOr;
                                else
                                    objGarde.Image = objImageGardeVChute;
                            }
                        }

                    }

                }
            }
        }


        // MOUVEMENT VERS LE HAUT (ECHELLE)
        for (var i = 0; i < tabDispo.length; i++) {
            let ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (tabDispo[i][k] == "2") {
                    let ladderX = k * 32 + 16;
                    let ladderY = i * 32 + 32;

                    if (posLodeY < posGardeY) {
                        if ((objGarde.intX - 16 < ladderX && objGarde.intX + 16 > ladderX) &&
                            (objGarde.intY - 32 < ladderY && objGarde.intY > ladderY - 32)) {
                            objGarde.cols = 2;
                            objGarde.spriteWidth = 64;
                            objGarde.frameCount = 2;
                            intMouvement = 3;
                            objGarde.intX = ladderX;
                            if (objGarde.or)
                                objGarde.Image = objImageGardeVEchelleOr;
                            else
                                objGarde.Image = objImageGardeVEchelle;
                        }
                    } else {

                    }
                }
            }
        }

        // MOUVEMENT VERS LE BAS (ECHELLE)
        for (var i = 0; i < tabDispo.length; i++) {
            let ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (i + 1 < tabDispo.length) {
                    if (tabDispo[i + 1][k] == "2") {
                        let ladderX = k * 32 + 16;
                        let ladderY = i * 32 + 32;

                        if (posLodeY > posGardeY) {
                            if ((objGarde.intX - 16 < ladderX && objGarde.intX + 16 > ladderX) &&
                                (objGarde.intY + 32 > ladderY && objGarde.intY < ladderY + 32)) {
                                objGarde.cols = 2;
                                objGarde.spriteWidth = 64;
                                objGarde.frameCount = 2;
                                intMouvement = 4;
                                objGarde.intX = ladderX;
                                if (objGarde.or)
                                    objGarde.Image = objImageGardeVEchelleOr;
                                else
                                    objGarde.Image = objImageGardeVEchelle;
                            }
                        }
                    }
                }
            }
        }
        // lingot d'or
        if (!objGarde.or) {
            for (var i = 0; i < tabDispo.length; i++) {
                var ligneDispo = tabDispo[i];
                for (var k = 0; k < ligneDispo.length; k++) {
                    if (tabDispo[i][k] == "6") {
                        var goldX = k * 32 + 16;
                        var goldY = i * 32 + 32;

                        if ((objGarde.intX - 16 <= goldX && objGarde.intX + 16 >= goldX) &&
                            (objGarde.intY - 32 <= goldY && objGarde.intY >= goldY - 32)) {
                            objGarde.or = true;
                            intLingotOr--;
                            //intLingotOrRamasse++;
                            tabDispo[i][k] = "0";
                            //intPoints += 250;
                            audio1.play();
                            // console.log("picked up gold : " + intLingotOrRamasse);
                        }
                    }
                }
            }
        }
        switch (intMouvement) {
            case 1: // mouvement a DROITE
                objGarde.intX += 2;
                break;
            case 2: // mouvement a GAUCHE
                objGarde.intX -= 2;
                break;
            case 3: // mouvement en HAUT
                objGarde.intY -= 2;
                break;
            case 4: // mouvement en BAS
                objGarde.intY += 2;
                break;
        }
    }
}



function dessinerGarde() {
    sprite = 3;

    objC2D.save();

    if (tabGardien != null) {
        for (let intNoGarde = 0; intNoGarde < tabGardien.length; intNoGarde++) {
            let objGarde = tabGardien[intNoGarde];
            if (!objGarde.Trou)
                objC2D.drawImage(objGarde.Image, objGarde.srcX, objGarde.srcY, objGarde.width, objGarde.height, objGarde.intX, objGarde.intY, 32, 32);
            else
                objC2D.drawImage(objGarde.Image, objGarde.intX, objGarde.intY, objGarde.width, objGarde.height);
        }
    }

    objC2D.restore();
}