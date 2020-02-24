   // Un cycle d'animation	
   function animer() {
    // Requête pour le prochain cycle
    objCycleAnimation = requestAnimationFrame(animer);

    // Le cycle d'animation
    effacerDessin();
    mettreAjourAnimation();
    dessiner();
}

// Arrêter l'animation
function arreterAnimation() {
    if (objCycleAnimation != null)
        cancelAnimationFrame(objCycleAnimation);
    objCycleAnimation = null;
}
    
// Pour effacer le dessin
function effacerDessin() {
    objC2D.clearRect(0,0, objCanvas.width, objCanvas.height); 
}

// Pour mettre à jour l'animation
function mettreAjourAnimation() {
}

// Pour gerer le changement de direction
function changementDirection(toucheAppuye) {

    switch(toucheAppuye) {
        case "gauche":      // mouvement sur sol/barre de franchissement et placer bombs

            break;
        case "droite":    // mouvement sur sol/barre de franchissement et placer bombs
        
            break;
        case "haut":      // echelles
            for (var i = 0; i < tabDispo.length; i++) {
                var ligneDispo = tabDispo[i];
                for (var k = 0; k < ligneDispo.length; k++) {
                    if (tabDispo[i][k] == "2") {
                        if (objLodeRunner.intX == i*32 && objLodeRunner.intY == k*32)
                            console.log("on ladder")
                    } 
                }
            }


            break;
        case "bas":       // echelles
            
            break;

        default: "idk";
            break;
    }

}
