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
                    objGarde.intX = (k) * 32;
                    objGarde.intY = (i + 1) * 32;
                    tabGardien.push(objGarde);
                }
            }
        }
    }


}

function deplacementGarde() {
    // Advanced AI... aka une tonne de if else
    let posLodeX = objLodeRunner.intX;
    let posLodeY = objLodeRunner.intY;
    curFrame4 = ++curFrame4 % frameCount4;
            srcX4 = curFrame4 * width4;
            srcY4 = 0;
    for (let intNoGarde = 0; intNoGarde < tabGardien.length; intNoGarde++) {

        let objGarde = tabGardien[intNoGarde];
        let intMouvement = 0;

        let posGardeX = objGarde.intX;
        let posGardeY = objGarde.intY;

        // MOUVEMENT BASIC DROITE / GAUCHE   ||   Artificial intelligence alpha 1.2
        if (tabDispo != null) {
            for (var i = 0; i < tabDispo.length; i++) {
                var ligneDispo = tabDispo[i];
                for (var k = 0; k < ligneDispo.length; k++) {
                    if ([i - 1] > 0) {
                        if (tabDispo[i-1][k] == "2") {
                            if (posLodeX > posGardeX && tabDispo[i][k+1] != "1")
                            {
                                
                                intMouvement = 1;
                                objGarde.Image = objImageGardeVDroite;
                            }
                            else if (posLodeX < posGardeX  && tabDispo[i][k-1] != "1")
                            {
                                intMouvement = 2;
                                objGarde.Image = objImageGardeVGauche;
                            }
                                
                        }
                    }
                }
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
                            if ((objGarde.intX - 16 < videX && objGarde.intX + 16 > videX) &&
                                (objGarde.intY + 32 > videY && objGarde.intY < videY + 32)) {
                                    intMouvement = 4;
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
                                intMouvement = 3;
                                objGarde.intX = ladderX;
                                objGarde.Image = objImageGardeVEchelle;
                        }
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
                                    intMouvement = 4;
                                    objGarde.intX = ladderX;
                                    objGarde.Image = objImageGardeVEchelle;
                            }
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
    sprite = 2;

    objC2D.save();

    if (tabGardien != null) {
        for (let intNoGarde = 0; intNoGarde < tabGardien.length; intNoGarde++) {
            let objGarde = tabGardien[intNoGarde];
            
            objC2D.drawImage(objGarde.Image, srcX4, srcY4, width4, height4, objGarde.intX, objGarde.intY, 32, 32);
        }
    }

    objC2D.restore();
}