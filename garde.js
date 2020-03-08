// liste de fonctions / choses a faire
// initialiser caracteristiques
// init position random unique
// mouvement
// dessiner

function initGarde() {
    tabGardien = new Array();
    let objGarde = null;

    if (tabDispo != null && tabGardien != null) {
        console.log("initGarde")
        for (var i = 0; i < tabDispo.length; i++) {
            var ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (tabDispo[i][k] == 8) {
                    objGarde = new Object();
                    objGarde.Image = objImageGardeV;
                    objGarde.intX = (k) * 32;
                    objGarde.intY = (i+1) * 32;
                    objGarde.vitesse = 4;
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
    for (let intNoGarde = 0; intNoGarde < tabGardien.length; intNoGarde++) {
        
        let objGarde = tabGardien[intNoGarde];
        
        let posGardeX = objGarde.intX;
        let posGardeY = objGarde.intY;

        //  garde EN BAS DE lode
        if (posGardeY > posLodeY) { 
            if (tabDispo != null) {
                for (var i = 0; i < tabDispo.length; i++) {
                    var ligneDispo = tabDispo[i];
                    for (var k = Math.floor(posGardeY/32); k < ligneDispo.length; k++) {
                        if ([i-1]>0) {
                            if (tabDispo[i  -1][k] == 2) {
                            }
                        }
                    }
                }
            }
        }

        // meme niveau axeY    
        
        if (posLodeX > posGardeX && posLodeY == posGardeY) {
            spriteCount = 3;
            sprite = 3;
            curFrame3 = ++curFrame3 % frameCount3;
            srcX3 = curFrame3 * width3;
            srcY3 = 0;
            objGarde.intX++;
        } else if (posLodeX < posGardeX && posLodeY == posGardeY) 
            objGarde.intX--;
    
    }


    // different niveau (garde cherche escalier)


}

function dessinerGarde() {
    sprite = 3;

    objC2D.save();

    if (tabGardien != null) {
        for (let intNoGarde = 0; intNoGarde < tabGardien.length; intNoGarde++) {
            let objGarde = tabGardien[intNoGarde];
            
            objC2D.drawImage(objGarde.Image, srcX3, srcY3, width3, height3, objGarde.intX, objGarde.intY, 32, 32);
}
    }

    objC2D.restore();
}