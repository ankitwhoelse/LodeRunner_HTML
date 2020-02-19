

// Aller chercher l'image de fond

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
    objC2D.clearRect(0, 0, objCanvas.width, objCanvas.height);
}

// Pour mettre à jour l'animation


// Pour vérifier si la balle est en collision avec la bâton
function balleEstEnCollisionAvecBaton(fltXBalle, fltYBalle) {
    // Rectangle de la balle
    const fltGaucheBalle = fltXBalle - objBalle.intRayon;
    const fltDroiteBalle = fltXBalle + objBalle.intRayon;
    const fltHautBalle = fltYBalle - objBalle.intRayon;
    const fltBasBalle = fltYBalle + objBalle.intRayon;

    // Rectangle du bâton
    const intGaucheBaton = objBaton.intX;
    const intDroiteBaton = objBaton.intX + objBaton.intLargeur;
    const intHautBaton = objBaton.intY;
    const intBasBaton = objBaton.intY + objBaton.intHauteur;

    return (objBalle.intDirectionDegre > 180) && (fltBasBalle > intHautBaton) && (fltHautBalle < intBasBaton) && (fltDroiteBalle > intGaucheBaton) && (fltGaucheBalle < intDroiteBaton);
}

// Pour vérifier si la balle est dans la vortex
function balleEstDansLeVortex() {
    let binBalleEstDansLeVortex = true;
    const intRayonVortexCarre = objVortex.intRayon * objVortex.intRayon;
    const tabPositionXBalle = [objBalle.fltX - objVortex.intX,
    objBalle.fltX + objBalle.intRayon - objVortex.intX,
    objBalle.fltX - objVortex.intX,
    objBalle.fltX - objBalle.intRayon - objVortex.intX];
    const tabPositionYBalle = [-objBalle.fltY + objBalle.intRayon + objVortex.intY,
    -objBalle.fltY + objVortex.intY,
    -objBalle.fltY - objBalle.intRayon + objVortex.intY,
    -objBalle.fltY + objVortex.intY];
    for (let i = 0; i < 4; i++) {
        if ((tabPositionXBalle[i] * tabPositionXBalle[i]) + (tabPositionYBalle[i] * tabPositionYBalle[i]) > intRayonVortexCarre)
            binBalleEstDansLeVortex = false;
    }
    return binBalleEstDansLeVortex;
}



// Pour écrire le message à la fin du jeu 
function ecrireMessageFin() {
    objC2D.lineWidth = 1;
    objC2D.strokeStyle = 'black';
    objC2D.font = '50px Arial';
    objC2D.textAlign = 'center';
    objC2D.textBaseline = 'middle';

    if (objPointage.intNbBallesVortex > objPointage.intNbBallesPerdues) {
        objC2D.fillStyle = 'green';
        strTexte = 'Vous avez détruit ' + objPointage.intNbBallesVortex + ' vortex. Bravo!!!'
    }
    else {
        objC2D.fillStyle = 'red';
        strTexte = 'Vous avez perdu ' + objPointage.intNbBallesPerdues + ' balle(s)!!!'
    }

    objC2D.fillText(strTexte, objCanvas.width / 2, objCanvas.height / 2);
    objC2D.strokeText(strTexte, objCanvas.width / 2, objCanvas.height / 2);
}

function trait()
{
    switch (event.button) {
        case 0: // Flèche-à-droite
          if(objBalle.binTrait)
          objBalle.binTrait=false;
          else
          objBalle.binTrait=true;
            break;
        case 1: // Flèche-à-gauche
            break;
        case 2: // Flèche-en-haut
            break;
    }
}
// Pour déplacer le bâton
function deplacerBaton() {
    let binDeplacable = false;
    let objMur = null
    switch (event.keyCode) {
        case 39: // Flèche-à-droite
            // Déplacer à droite si le bâton n'entre pas en collision avec le mur droite
            objMur = tabObjMurs[2];
            binDeplacable = (objBaton.intX + objBaton.intLargeur + objBaton.intVitesse) <= objMur.intXFin;
            objBaton.intDirection = 1;
            break;
        case 37: // Flèche-à-gauche
            // Déplacer à gauche si le bâton n'entre pas en collision avec le mur gauche
            objMur = tabObjMurs[0];
            binDeplacable = (objBaton.intX - objBaton.intVitesse) >= objMur.intXFin;
            objBaton.intDirection = -1;
            break;
        case 38: // Flèche-en-haut
            objBalle.binEnMouvement = true;
            break;
    }

    if (binDeplacable) {
        objBaton.intX += objBaton.intVitesse * objBaton.intDirection;
        if (!objBalle.binEnMouvement)
            objBalle.fltX += objBaton.intVitesse * objBaton.intDirection;
    }
}
