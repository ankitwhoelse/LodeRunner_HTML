// Pour dessiner
function dessiner() {
    dessinerFond();
    dessinerMursAvecMotifs();
    dessinerBaton();
    dessinerVortexEnSpiraleAvecPlusieursBranches();
    dessinerBalle();
    dessinerTrajetBalle();
    dessinerPointage();
}

// Pour dessiner l'image de fond
function dessinerFond() {
    objC2D.save();
    objC2D.drawImage(objImageFond, 0, 0, objCanvas.width, objCanvas.height);
    objC2D.restore();
}

// Pour dessiner le vortex
function dessinerVortexEnCercle() {
    objC2D.save()

    const objDegrade = objC2D.createRadialGradient(objVortex.intX, objVortex.intY, 0, objVortex.intX, objVortex.intY, objVortex.intRayon);
    objDegrade.addColorStop(0, 'black');
    objDegrade.addColorStop(1, 'black');
    objDegrade.addColorStop(objVortex.fltPosCouleur, objVortex.strCouleur);
    objC2D.fillStyle = objDegrade;
    objC2D.beginPath();
    objC2D.arc(objVortex.intX, objVortex.intY, objVortex.intRayon, 0, 2 * Math.PI, false);
    objC2D.fill();

    objC2D.restore();
}

// Pour dessiner un vortex en forme de spirale
function dessinerVortexEnSpirale() {
    objC2D.save();

    // Déplacer le contexte au centre de la spirale
    objC2D.translate(objVortex.intX, objVortex.intY);

    const objDegrade = objC2D.createRadialGradient(0, 0, 0, 0, 0, objVortex.intRayon);
    objDegrade.addColorStop(0, 'black');
    objDegrade.addColorStop(1, 'black');
    objDegrade.addColorStop(objVortex.fltPosCouleur, objVortex.strCouleur);
    objC2D.strokeStyle = objDegrade;

    const intNbCirconvolutions = 15;
    const fltAugmentationRayon = objVortex.intRayon / (360 * intNbCirconvolutions);

    objC2D.beginPath();
    // Se déplacer au centre de la spirale
    objC2D.moveTo(0, 0);
    // Au point de départ, le rayom est nul
    let fltRayon = 0;
    // Faire le tracé de la spirale
    for (let intDegres = 360 * objVortex.fltPosCouleur; intDegres <= 360 * (intNbCirconvolutions + objVortex.fltPosCouleur); intDegres++) {
        // Convertir les degrés en radians
        const fltDegresRadians = intDegres * (Math.PI / 180);
        // Les coordonnées (fltX,fltY) à dessiner
        const fltX = fltRayon * Math.cos(fltDegresRadians);
        const fltY = fltRayon * Math.sin(fltDegresRadians);
        objC2D.lineTo(fltX, fltY);
        // Le rayon augmente progressivement
        fltRayon += fltAugmentationRayon;
    }
    objC2D.stroke(); // Dessiner le tracé

    objC2D.restore();
}

// Pour dessiner un vortex en forme de spirale avec plusieurs branches
function dessinerVortexEnSpiraleAvecPlusieursBranches() {
    objC2D.save();

    // Déplacer le contexte au centre de la spirale
    objC2D.translate(objVortex.intX, objVortex.intY);

    const objDegrade = objC2D.createRadialGradient(0, 0, 0, 0, 0, objVortex.intRayon);
    objDegrade.addColorStop(0, 'black');
    objDegrade.addColorStop(1, 'black');
    objDegrade.addColorStop(objVortex.fltPosCouleur, objVortex.strCouleur);
    objC2D.strokeStyle = objDegrade;

    const intNbBranches = 4;
    for (let intNoBranche = 0; intNoBranche < intNbBranches; intNoBranche++) {

        const intNbCirconvolutions = 4;
        const fltAugmentationRayon = objVortex.intRayon / (360 * intNbCirconvolutions);

        objC2D.beginPath();
        // Se déplacer au centre de la spirale
        objC2D.moveTo(0, 0);
        // Au point de départ, le rayon est nul
        let fltRayon = 0;
        // Faire le tracé de la spirale
        for (let intDegres = 360 * objVortex.fltPosCouleur; intDegres <= 360 * (intNbCirconvolutions + objVortex.fltPosCouleur); intDegres++) {
            // Convertir les degrés en radians
            const fltDegresRadians = intDegres * (Math.PI / 180);
            // Les coordonnées (fltX,fltY) à dessiner
            const fltX = fltRayon * Math.cos(fltDegresRadians);
            const fltY = fltRayon * Math.sin(fltDegresRadians);
            objC2D.lineTo(fltX, fltY);
            // Le rayon augmente progressivement
            fltRayon += fltAugmentationRayon;
        }
        objC2D.stroke(); // Dessiner le tracé

        // Tourner le contexte
        objC2D.rotate(Math.PI * 2 / intNbBranches);
    }

    objC2D.restore();
}

// Pour dessiner les murs
function dessinerMurs() {
    objC2D.save();
    objC2D.globalAlpha = 0.8;

    for (let intNoMur = 0; intNoMur < tabObjMurs.length; intNoMur++) {
        let objMur = tabObjMurs[intNoMur];
        let intCentreX = (objMur.intXDebut + objMur.intXFin) / 2;
        let intCentreY = (objMur.intYDebut + objMur.intYFin) / 2;
        let intRayon = (intNoMur == 1) ? Math.abs(objMur.intXFin - objMur.intXDebut) / 2 : Math.abs(objMur.intYFin - objMur.intYDebut) / 2;
        let objDegrade = objC2D.createRadialGradient(intCentreX, intCentreY, 0, intCentreX, intCentreY, intRayon);
        objDegrade.addColorStop(0, 'white');
        objDegrade.addColorStop(1, objMur.strCouleur);
        objC2D.fillStyle = objDegrade;
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

function dessinerMursAvecMotifs() {
    objC2D.save();
    objC2D.globalAlpha = 0.8;
    var objImage = new Image();
    objImage.src = 'motif-mur.jpg'
    objMotif = objC2D.createPattern(objImage, 'repeat'); // Créer le motif (répétitif)




    for (let intNoMur = 0; intNoMur < tabObjMurs.length; intNoMur++) {
        let objMur = tabObjMurs[intNoMur];
        let intCentreX = (objMur.intXDebut + objMur.intXFin) / 2;
        let intCentreY = (objMur.intYDebut + objMur.intYFin) / 2;
        let intRayon = (intNoMur == 1) ? Math.abs(objMur.intXFin - objMur.intXDebut) / 2 : Math.abs(objMur.intYFin - objMur.intYDebut) / 2;
        let objDegrade = objC2D.createRadialGradient(intCentreX, intCentreY, 0, intCentreX, intCentreY, intRayon);
        objDegrade.addColorStop(0, 'white');
        objDegrade.addColorStop(1, objMur.strCouleur);
        objC2D.fillStyle = objMotif;
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


// Pour dessiner le bâton
function dessinerBaton() {
    objC2D.save();
    objC2D.drawImage(objBaton.objImage, objBaton.intX, objBaton.intY, objBaton.intLargeur, objBaton.intHauteur);
    objC2D.restore();
}

// Pour dessiner la balle

function dessinerBalle() {
    // console.log(tabX) ;
    objC2D.save();
    const objDegrade = objC2D.createRadialGradient(objBalle.fltX, objBalle.fltY, 0, objBalle.fltX, objBalle.fltY, objBalle.intRayon);
    objDegrade.addColorStop(0, 'white');
    objDegrade.addColorStop(1, objBalle.strCouleur);
    objC2D.fillStyle = objDegrade;
    objC2D.strokeStyle = 'black';
    objC2D.beginPath();
    objC2D.arc(objBalle.fltX, objBalle.fltY, objBalle.intRayon, 0, 2 * Math.PI, false);
    objC2D.fill();
    objC2D.stroke();
    if(objBalle.binTrait)
    {
    objC2D.translate(objBalle.fltX, objBalle.fltY);
    objC2D.moveTo(0, 0);
    objC2D.rotate(Math.cos(objBalle.intDirectionDegre * Math.PI / 180));
    objC2D.lineTo(0, -objBalle.intRayon);
    objC2D.stroke();
    }
    objC2D.restore();


}
function dessinerTrajetBalle() {
    for(let points=0;points<=tabX.length;points++)
    {
    objC2D.fillStyle = objBalleJaune.couleurTrajet;
    objC2D.beginPath();
    objC2D.arc(tabX[points], tabY[points], 1, 0, 2 * Math.PI, false);
    objC2D.fill();
    }
}
// Pour dessiner le pointage
function dessinerPointage() {
    objC2D.save();
    // La couleur de chaque carte de pointage
    const tabCouleurs = ['gray', 'green', 'red'];
    // L'image de chaque carte de pointage
    const tabImages = [objPointage.objImageBalle, objPointage.objImageVortex, objPointage.objImagePerdu];
    // Le nombre de balles sur chaque carte de pointage
    const tabNbBalles = [objPointage.intNbBallesRestantes, objPointage.intNbBallesVortex, objPointage.intNbBallesPerdues];

    // Pour conserver la position de la balle 
    const fltXBalle = objBalle.fltX; const fltYBalle = objBalle.fltY;

    // Dessiner chacune des cartes de pointage
    for (let i = 0; i < 3; i++) {
        // Dessiner le rectangle de la carte de pointage (en transparence) 
        objC2D.globalAlpha = 0.5;
        objC2D.fillStyle = tabCouleurs[i];
        const intLargeur = Math.floor(objPointage.intLargeur / 3);
        objC2D.fillRect(objPointage.intX + i * intLargeur, objPointage.intY, intLargeur - 4, objPointage.intHauteur);
        // Dessiner l'image (en transparence)
        objC2D.drawImage(tabImages[i], objPointage.intX + i * intLargeur, objPointage.intY, (intLargeur - 4) / 3, objPointage.intHauteur);
        // Dessiner les balles (opaque)
        objC2D.globalAlpha = 1;
        const intNbBallesParColonne = 3; const intNbBallesParLigne = 5;
        let intNbBallesDessinees = tabNbBalles[i];

        const fltEspacementHorizontal = 2 * (intLargeur - 4) / 3 / (intNbBallesParLigne + 1);
        const fltEspacementVertical = objPointage.intHauteur / (intNbBallesParColonne + 1);
        for (let intNoLigne = 1; intNoLigne <= intNbBallesParColonne; intNoLigne++)
            for (let intNoColonne = 1; intNoColonne <= intNbBallesParLigne; intNoColonne++) {
                if (intNbBallesDessinees != 0) {
                    objBalle.fltX = objPointage.intX + i * intLargeur + (intLargeur - 4) / 3 + fltEspacementHorizontal * intNoColonne;
                    objBalle.fltY = objPointage.intY + fltEspacementVertical * intNoLigne;
                    dessinerBalle();
                    intNbBallesDessinees--;
                }
            }
    }

    // Pour remettre en place la position de la balle
    objBalle.fltX = fltXBalle; objBalle.fltY = fltYBalle;

    // La fin du jeu
    if (objPointage.intNbBallesRestantes == 0) {
        ecrireMessageFin();
        arreterAnimation();
    }

    objC2D.restore();
}