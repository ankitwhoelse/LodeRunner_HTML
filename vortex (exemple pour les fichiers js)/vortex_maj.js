function mettreAjourAnimation() {
    if (!objVortex.binEnDisparition) {
        mettreAjourAnimationBalle();
        mettreAJourTrajetBalle();
        mettreAJourAnimationVortex();
    }
    else
        mettreAJourDisparitionVortex();
}

// Pour mettre à jour l'animation du vortex
function mettreAJourAnimationVortex() {
    if (objVortex.fltPosCouleur > 0.99)
        objVortex.fltPosCouleur = 0
    else
        objVortex.fltPosCouleur += 0.01;

    // Vérifier si la balle est dans le vortex
    if (balleEstDansLeVortex()) {
        objVortex.binEnDisparition = true;
        objSons.disparitionVortex.play(); // Le son du vortex qui disparaît
        initBalle();
        initTrajetBalle();
        
    }
}

// Pour mettre à jour la disparition du vortex
function mettreAJourDisparitionVortex() {
    objVortex.intRayon--;
    if (objVortex.intRayon == 0) {
        // Le décompte des balles
        objPointage.intNbBallesRestantes--;
        objPointage.intNbBallesVortex++;
        if (objPointage.intNbBallesRestantes == 0)
            // Pour que la balle ne soit plus visible
            objBalle.fltY = objCanvas.height + objBalle.intRayon;
        else // Création d'un nouveau vortex
            initVortex();
    }
}

function mettreAJourTrajetBalle() {
    if (objBalle.binEnMouvement) {
        tabX.push(objBalle.fltX);
        tabY.push(objBalle.fltY);
    }
}
// Pour mettre à jour l'animation de la balle
function mettreAjourAnimationBalle() {
    if (objBalle.binEnMouvement) {
        // Déplacer virtuellement
        let fltDeplX = Math.cos(objBalle.intDirectionDegre * Math.PI / 180) * objBalle.intVitesse;
        let fltDeplY = -Math.sin(objBalle.intDirectionDegre * Math.PI / 180) * objBalle.intVitesse;
        const fltXBalle = objBalle.fltX + fltDeplX;
        const fltYBalle = objBalle.fltY + fltDeplY;

        // Vérifier les collisions
        const binCollAvecMurVertical = (fltXBalle + objBalle.intRayon > tabObjMurs[2].intXFin) ||
            (fltXBalle - objBalle.intRayon < tabObjMurs[0].intXFin);
        const binCollAvecMurHorizontal = fltYBalle - objBalle.intRayon <= tabObjMurs[1].intYFin;
        const binCollAvecBaton = balleEstEnCollisionAvecBaton(fltXBalle, fltYBalle);

        // Appliquer le changement d'angle

        if (binCollAvecMurVertical) {
            objBalle.intDirectionDegre = 180 - objBalle.intDirectionDegre;
            objSons.balleMur.play(); // Le son de la balle sur le mur
        }
        if (binCollAvecMurHorizontal) {
            objBalle.intDirectionDegre = 360 - objBalle.intDirectionDegre;
            objSons.balleMur.play(); // Le son de la balle sur le mur
        }

        if (binCollAvecBaton) {
            const intAngle = 90 + Math.floor((objBalle.fltX - objBalle.intRayon - objBaton.intX) / objBaton.intLargeur * 180);
            objBalle.intDirectionDegre -= intAngle;
            objSons.balleBaton.play(); // Le son de la balle sur le bâton

        }

        // Pour éviter un angle négatif
        if (objBalle.intDirectionDegre < 0)
            objBalle.intDirectionDegre += 360;

        // Pour éviter les rebonds infinis
        if (objBalle.intDirectionDegre == 0 || objBalle.intDirectionDegre == 180)
            objBalle.intDirectionDegre++;

        // Déplacer réellement
        fltDeplX = Math.cos(objBalle.intDirectionDegre * Math.PI / 180) * objBalle.intVitesse;
        fltDeplY = -Math.sin(objBalle.intDirectionDegre * Math.PI / 180) * objBalle.intVitesse;
        objBalle.fltX += fltDeplX; objBalle.fltY += fltDeplY;

        // La balle est sortie du jeu
        if (objBalle.fltY > objCanvas.height) {
            objSons.ballePerdue.play(); // Le son de la balle perdue
            // Le décompte des balles
            objPointage.intNbBallesRestantes--;
            objPointage.intNbBallesPerdues++;
            if (objPointage.intNbBallesRestantes != 0)
            {
                initBalle();
                initTrajetBalle();
            }
        }
    }
}