// Un cycle d'animation
function animer() {
    setTimeout(function () {
        objCycleAnimation = requestAnimationFrame(animer);
        effacerDessin();
        mettreAjourAnimation();
        dessiner();
    }, 1000 / framesPerSecond);
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
function mettreAjourAnimation() {
    if (temps == 5 && spriteCount == 3 && booStart == true) {
        mettreAjourLodeRunner(3, touche);
        temps = 0;
    } else if (spriteCount == 2) {
        mettreAjourLodeRunner(2, touche);
        temps = 0;
    }
    if (booStart == false) {
        mettreAjourLodeRunner(3, touche);
        temps = 0;
    }
    temps++;
}

function mettreAjourLodeRunner(sprite, touche) {
    if (booStart == true) {
        if (sprite == 3) {
            curFrame3 = ++curFrame3 % frameCount3;
            srcX3 = curFrame3 * width3;
            srcY3 = 0;
        } else if (sprite == 2) {
            curFrame2 = ++curFrame2 % frameCount2;
            srcX2 = curFrame2 * width2;
            srcY2 = 0;
        }

    }

    if (!booStart) {
        switch (sprite) {
            case 2:      // mouvement sur sol/barre de franchissement et placer bombs
                if (touche == "haut" || touche == "bas") {
                    curFrame2 = ++curFrame2 % frameCount2;
                    srcX2 = curFrame2 * width2;
                    srcY2 = 0;
                }
                break;
            case 3:    // mouvement sur sol/barre de franchissement et placer bombs
                if (touche == "droite") {
                    if(objLodeRunner.intX< objCanvas.width-36 )
                    {
                    curFrame3 = ++curFrame3 % frameCount3;
                    srcX3 = curFrame3 * width3;
                    srcY3 = 0;
                    }
                } else if (touche == "gauche") {
                    if( objLodeRunner.intX>16){
                    objLodeRunner.Image = objLodeRunnerGauche;
                    curFrame3 = ++curFrame3 % frameCount3;
                    srcX3 = curFrame3 * width3;
                    srcY3 = 0;
                }
                
                break;
            }
            default: "idk";
                break;
        }
    }

    /*  if(left && x>0){
          srcY = trackLeft * height; 
          x-=speed; 
      }
      if(right && x<canvasWidth-width){
          srcY = trackRight * height; 
          x+=speed; 
      }*/
}


// Pour gerer le changement de direction
function changementDirection(toucheAppuye) {

    switch (toucheAppuye) {
        case "gauche":      // mouvement sur sol/barre de franchissement et placer bombs
            spriteCount = 3;
            objLodeRunner.Image = objImageLodeRunner;
            if (objLodeRunner.intX > 16)
                objLodeRunner.intX -= 2;
            break;

        case "droite":    // mouvement sur sol/barre de franchissement et placer bombs
            spriteCount = 3;
            objLodeRunner.Image = objImageLodeRunner;
            if (objLodeRunner.intX < objCanvas.width - 40)
                objLodeRunner.intX += 5;

                if (objLodeRunner.intX >= objCanvas.width-16)
                    objLodeRunner.intX = objCanvas.width-17;

            break;

        case "haut":      // echelles
            spriteCount = 2;
            for (var i = 0; i < tabDispo.length; i++) {
                var ligneDispo = tabDispo[i];
                for (var k = 0; k < ligneDispo.length; k++) {
                    if (tabDispo[i][k] == "2") {
                        var ladderX = k * 32 + 16;
                        var ladderY = i * 32 + 32;

                        if ((objLodeRunner.intX - 16 <= ladderX && objLodeRunner.intX + 16 >= ladderX) &&
                            (objLodeRunner.intY - 32 <= ladderY && objLodeRunner.intY >= ladderY - 32)) {

                            // LODE SUR UNE ECHELLE
                            objLodeRunner.Image = objLodeEchelle;
                            objLodeRunner.intY -= 1.5;
                        }
                    }
                }
            }
            break;

        case "bas":       // echelles
            spriteCount = 2;
            for (var i = 0; i < tabDispo.length; i++) {
                var ligneDispo = tabDispo[i];
                for (var k = 0; k < ligneDispo.length; k++) {
                    if (tabDispo[i][k] == "2") {
                        var ladderX = k * 32 + 16;
                        var ladderY = i * 32 + 32;

                        if ((objLodeRunner.intX - 16 <= ladderX && objLodeRunner.intX + 16 >= ladderX) &&
                            (objLodeRunner.intY + 32 >= ladderY && objLodeRunner.intY <= ladderY + 32)) {

                            // LODE SUR UNE ECHELLE
                            objLodeRunner.Image = objLodeEchelle;
                            objLodeRunner.intY += 1.5;
                        }
                    }
                }
            }
            break;

        default: "idk";
            break;
    }

}
