// liste de fonctions / choses a faire
// initialiser caracteristiques
// init position random unique
// mouvement
// dessiner

function initGarde() {
    objGarde1 = new Object();
    objGarde1.Image = objImageGardeV;
    objGarde1.intX = 15*32;
    objGarde1.intY = 10*32;
    objGarde1.vitesse = 3;

}

function deplacementGarde() {
    // Advanced AI... aka une tonne de if else
    let posLodeX = objLodeRunner.intX;
    let posLodeY = objLodeRunner.intY;

    let posGardeX = objGarde1.intX;
    let posGardeY = objGarde1.intY;

    // meme niveau axeY
    if (posLodeX > posGardeX && posLodeY == posGardeY) {
        objGarde1.intX++;
    } else if (posLodeX > posGardeX && posLodeY == posGardeY) { 
        objGarde1.intX--;
    }

    // different niveau (garde cherche escalier)
    

}

function dessinerGarde() {
    objC2D.save();

    sprite = 3;
    if (tabDispo != null && binNextLevel==true) {
        for (var i = 0; i < tabDispo.length; i++) {
            var ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (tabDispo[i][k] == 8) {
                    //if (booStart) {
                        objImageGardeT.intX = k * 32 + 16;
                        objImageGardeT.intY = i * 32 + 32;
                    //}
                    //if (spriteCount == 3)
                        objC2D.drawImage(objImageGardeT.Image,srcX4,srcY4,width4,height4, objImageGardeT.intX,objImageGardeT.intY, 32, 32);
                        
                }
            }
        }
    }

    objC2D.restore();
}
