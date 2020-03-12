// INITIALISER LES OBJETS GARDES
function initGarde() {
    tabGardien = new Array();
    let objGarde = null;
    let intCouleur = 0;

    if (tabDispo != null && tabGardien != null) {
        for (var i = 0; i < tabDispo.length; i++) {
            var ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (tabDispo[i][k] == 8) {
                    intCouleur++;
                    objGarde = new Object();
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

                    if (intCouleur%3 == 0) {     // VERT     0
                        objGarde.couleur = 0;
                        objGarde.Image = objImageGardeVDroite; }
                    else if (intCouleur%3 == 1){ // MAUVE    1
                        objGarde.couleur = 1;
                        objGarde.Image = objImageGardeMDroite; }
                    else if (intCouleur%3 == 2){ // ROUGE    2
                        objGarde.couleur = 2;
                        objGarde.Image = objImageGardeRDroite; }

                    tabGardien.push(objGarde);
                    tabDispo[i][k] = 0;
                }
            }
        }
    }


}


// Advanced AI... aka une tonne de if else
function deplacementGarde() {
    let posLodeX = objLodeRunner.intX;
    let posLodeY = objLodeRunner.intY;

    for (let intNoGarde = 0; intNoGarde < tabGardien.length; intNoGarde++) {

        let objGarde = tabGardien[intNoGarde];
        let intMouvement = 0;

        let posGardeX = objGarde.intX;
        let posGardeY = objGarde.intY;

        // GARDE TOMBE DANS UN TROU tabDispo[Math.floor(objGarde.intY / 32)+1][Math.floor(objGarde.intX / 32)] == "1"
        if (tabDispo[Math.floor(objGarde.intY / 32)][Math.floor(objGarde.intX / 32)] == "4"|| objGarde.intY>=544) {
            
            if (objGarde.or) // if garde possede un lingot, il l'échappe
                tabDispo[Math.floor(objGarde.intY / 32) - 2][Math.floor(objGarde.intX / 32)] = "6";

            objGarde.Trou = true;
            audio8.play();

            if (objGarde.couleur==0)
                objGarde.Image = objImageGardeVChuteTrou;
            else if (objGarde.couleur==1)
                objGarde.Image = objImageGardeMChuteTrou;
            else if (objGarde.couleur==2)
                objGarde.Image = objImageGardeRChuteTrou;

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

                if (objGarde.couleur==0)
                    objGarde.Image = objImageGardeVGauche;
                else if (objGarde.couleur==1)
                    objGarde.Image = objImageGardeMGauche;
                else if (objGarde.couleur==2)
                    objGarde.Image = objImageGardeRGauche;

                objGarde.or = false;
                objGarde.intPositionBloqueGarde = 0;
                intPoints += 75;
                objGarde.Trou = false;
                audio9.play();
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
                                        break;
                                    }
                                    else if (ladderX <= posGardeX && (objGarde.intY + 32 > ladderY && objGarde.intY < ladderY + 32)) {
                                        intMouvement = 2;   // gauche
                                        break;
                                    }
                                } else if (ladderX > objCanvas.width/2 && posLodeX > objCanvas.width/2) { 
                                    // right side
                                    if (ladderX <= posGardeX && (objGarde.intY + 32 > ladderY && objGarde.intY < ladderY + 32)) {
                                        intMouvement = 2;   // gauche
                                        break;
                                    }
                                    else if (ladderX >= posGardeX && (objGarde.intY + 32 > ladderY && objGarde.intY < ladderY + 32)) {
                                        intMouvement = 1;   // droite
                                        break;
                                    }
                                }
                            }

                        } else if (posGardeY == posLodeY) { 
                            // garde au meme niveau on map

                            if (posGardeX > posLodeX) {
                                intMouvement = 2;   // gauche
                            } else if (posGardeX < posLodeX) {
                                intMouvement = 1;   // droite
                            }
                        } else {
                            objGarde.cols = 2;
                            objGarde.spriteWidth = 64;
                            objGarde.frameCount = 2;
                        }

                        //  PANTALON DORÉ
                        if (intMouvement == 1) {
                            if (objGarde.or) {
                                if (objGarde.couleur==0)
                                    objGarde.Image = objImageGardeVDroiteOr;
                                else if (objGarde.couleur==1)
                                    objGarde.Image = objImageGardeMDroiteOr;
                                else if (objGarde.couleur==2)
                                    objGarde.Image = objImageGardeRDroiteOr;
                            }
                            else {
                                if (objGarde.couleur==0)
                                    objGarde.Image = objImageGardeVDroite;
                                else if (objGarde.couleur==1)
                                    objGarde.Image = objImageGardeMDroite;
                                else if (objGarde.couleur==2)
                                    objGarde.Image = objImageGardeRDroite;
                            }

                        } else if (intMouvement == 2) {
                            if (objGarde.or) {
                                if (objGarde.couleur==0)
                                    objGarde.Image = objImageGardeVGaucheOr;
                                else if (objGarde.couleur==1)
                                    objGarde.Image = objImageGardeMGaucheOr;
                                else if (objGarde.couleur==2)
                                    objGarde.Image = objImageGardeRGaucheOr;
                            }
                            else {
                                if (objGarde.couleur==0)
                                    objGarde.Image = objImageGardeVGauche;
                                else if (objGarde.couleur==1)
                                    objGarde.Image = objImageGardeMGauche;
                                else if (objGarde.couleur==2)
                                    objGarde.Image = objImageGardeRGauche;
                            }
                        }

                    }
                }
            }
        

            // Barre de franchissement
            if (tabDispo[Math.floor(objGarde.intY / 32) - 1][Math.floor(objGarde.intX / 32)] == "3") {
                objGarde.cols = 3;
                objGarde.spriteWidth = 96;
                objGarde.frameCount = 3;

                if (objGarde.or && intMouvement == 2) {         
                    if (objGarde.couleur==0)
                        objGarde.Image = objImageGardeVBarreGaucheOr;
                    else if (objGarde.couleur==1)
                        objGarde.Image = objImageGardeMBarreGaucheOr;
                    else if (objGarde.couleur==2)
                        objGarde.Image = objImageGardeRBarreGaucheOr;

                } else if (!objGarde.or && intMouvement == 2) {  
                    if (objGarde.couleur==0)
                        objGarde.Image = objImageGardeVBarreGauche;
                    else if (objGarde.couleur==1)
                        objGarde.Image = objImageGardeMBarreGauche;
                    else if (objGarde.couleur==2)
                        objGarde.Image = objImageGardeRBarreGauche;

                } else if (objGarde.or && intMouvement == 1) {  
                    if (objGarde.couleur==0)
                        objGarde.Image = objImageGardeVBarreDroiteOr;
                    else if (objGarde.couleur==1)
                        objGarde.Image = objImageGardeMBarreDroiteOr;
                    else if (objGarde.couleur==2)
                        objGarde.Image = objImageGardeRBarreDroiteOr;

                } else if (!objGarde.or && intMouvement == 1) {     
                    if (objGarde.couleur==0)
                        objGarde.Image = objImageGardeVBarreDroite;
                    else if (objGarde.couleur==1)
                        objGarde.Image = objImageGardeMBarreDroite;
                    else if (objGarde.couleur==2)
                        objGarde.Image = objImageGardeRBarreDroite;
                }

            }

            // Barre de franchissement lorsqu'il tombe
            if (tabDispo[Math.floor(objGarde.intY / 32)][Math.floor(objGarde.intX / 32)] == "3") {
                objGarde.intY = objGarde.intY + 16;
                intMouvement = 2;
                objGarde.cols = 3;
                objGarde.spriteWidth = 96;
                objGarde.frameCount = 3;

                if (objGarde.or && intMouvement == 2) {         
                    if (objGarde.couleur==0)
                        objGarde.Image = objImageGardeVBarreGaucheOr;
                    else if (objGarde.couleur==1)
                        objGarde.Image = objImageGardeMBarreGaucheOr;
                    else if (objGarde.couleur==2)
                        objGarde.Image = objImageGardeRBarreGaucheOr;

                } else if (!objGarde.or && intMouvement == 2) {  
                    if (objGarde.couleur==0)
                        objGarde.Image = objImageGardeVBarreGauche;
                    else if (objGarde.couleur==1)
                        objGarde.Image = objImageGardeMBarreGauche;
                    else if (objGarde.couleur==2)
                        objGarde.Image = objImageGardeRBarreGauche;

                } else if (objGarde.or && intMouvement == 1) {  
                    if (objGarde.couleur==0)
                        objGarde.Image = objImageGardeVBarreDroiteOr;
                    else if (objGarde.couleur==1)
                        objGarde.Image = objImageGardeMBarreDroiteOr;
                    else if (objGarde.couleur==2)
                        objGarde.Image = objImageGardeRBarreDroiteOr;

                } else if (!objGarde.or && intMouvement == 1) {     
                    if (objGarde.couleur==0)
                        objGarde.Image = objImageGardeVBarreDroite;
                    else if (objGarde.couleur==1)
                        objGarde.Image = objImageGardeMBarreDroite;
                    else if (objGarde.couleur==2)
                        objGarde.Image = objImageGardeRBarreDroite;
                }

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

                                    if (objGarde.or) {
                                        if (objGarde.couleur==0)
                                            objGarde.Image = objImageGardeVChuteOr;
                                        else if (objGarde.couleur==1)
                                            objGarde.Image = objImageGardeMChuteOr;
                                        else if (objGarde.couleur==2)
                                            objGarde.Image = objImageGardeRChuteOr;

                                    } else {
                                        if (objGarde.couleur==0)
                                            objGarde.Image = objImageGardeVChute;
                                        else if (objGarde.couleur==1)
                                            objGarde.Image = objImageGardeMChute;
                                        else if (objGarde.couleur==2)
                                            objGarde.Image = objImageGardeRChute;
                                    }

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

                                if (objGarde.or) {
                                    if (objGarde.couleur==0)
                                        objGarde.Image = objImageGardeVEchelleOr;
                                    else if (objGarde.couleur==1)
                                        objGarde.Image = objImageGardeMEchelleOr;
                                    else if (objGarde.couleur==2)
                                        objGarde.Image = objImageGardeREchelleOr;

                                } else {
                                    if (objGarde.couleur==0)
                                        objGarde.Image = objImageGardeVEchelle;
                                    else if (objGarde.couleur==1)
                                        objGarde.Image = objImageGardeMEchelle;
                                    else if (objGarde.couleur==2)
                                        objGarde.Image = objImageGardeREchelle;
                                }

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

                                    if (objGarde.or) {
                                        if (objGarde.couleur==0)
                                            objGarde.Image = objImageGardeVEchelleOr;
                                        else if (objGarde.couleur==1)
                                            objGarde.Image = objImageGardeMEchelleOr;
                                        else if (objGarde.couleur==2)
                                            objGarde.Image = objImageGardeREchelleOr;
    
                                    } else {
                                        if (objGarde.couleur==0)
                                            objGarde.Image = objImageGardeVEchelle;
                                        else if (objGarde.couleur==1)
                                            objGarde.Image = objImageGardeMEchelle;
                                        else if (objGarde.couleur==2)
                                            objGarde.Image = objImageGardeREchelle;
                                    }

                                }
                            }
                        }
                    }
                }
            }

            // LINGOT D'OR
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
                                tabDispo[i][k] = "0";
                                audio1.play();
                            }
                        }
                    }
                }
            }
        }

        switch (intMouvement) {
            case 1: // mouvement a DROITE
                objGarde.intX += 3;
                break;
            case 2: // mouvement a GAUCHE
                objGarde.intX -= 3;
                break;
            case 3: // mouvement en HAUT
                objGarde.intY -= 2;
                break;
            case 4: // mouvement en BAS
                objGarde.intY += 4;
                break;
        }
    }
}

//  DESSINER GARDE
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