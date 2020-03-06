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

    var espaceSousGardeX = objGarde1.intX;
    var espaceSousGardeY = objGarde1.intY;

    if (tabDispo[Math.floor(espaceSousGardeY / 32)][Math.floor(espaceSousGardeX / 32)] == "0" ||
        tabDispo[Math.floor(espaceSousGardeY / 32)][Math.floor(espaceSousGardeX / 32)] == "3") {

    } else {

    }

}

function dessinerGarde() {
    objC2D.save();

    if (tabDispo != null && binNextLevel==true) {
        for (var i = 0; i < tabDispo.length; i++) {
            var ligneDispo = tabDispo[i];
            for (var k = 0; k < ligneDispo.length; k++) {
                if (tabDispo[i][k] == 8) {
                    objC2D.drawImage(objImageGardeT, k * 32 + 16, i * 32 + 32, 32, 32);
                }
            }
        }
    }

    objC2D.restore();
}