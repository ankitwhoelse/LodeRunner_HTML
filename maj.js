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

let binTombe = false;

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
                    if(objLodeRunner.intX< objCanvas.width-36 ) {
                        curFrame3 = ++curFrame3 % frameCount3;
                        srcX3 = curFrame3 * width3;
                        srcY3 = 0;
                    }
                    if (binTombe) {
                        console.log("tombe")
                        objLodeRunner.intY += 5;
                    }
                } else if (touche == "gauche") {
                    if (objLodeRunner.intX>16) {
                        objLodeRunner.Image = objLodeRunnerGauche;
                        curFrame3 = ++curFrame3 % frameCount3;
                        srcX3 = curFrame3 * width3;
                        srcY3 = 0;
                    }
                    if (binTombe) {
                        console.log("tombe")
                        objLodeRunner.intY += 5;
                    }
                }  
                
               
                break;
            
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

let binGauche = true;
let binDroite = true;

// Pour gerer le changement de direction
function changementDirection(toucheAppuye) {

    switch (toucheAppuye) {
        case "gauche":      // mouvement sur sol/barre de franchissement et placer bombs
            spriteCount = 3;
            objLodeRunner.Image = objImageLodeRunner;
            
            if (objLodeRunner.intX > 16 && binGauche==true) {
                objLodeRunner.intX -= 5;    //test speed is 5
                
                if (objLodeRunner.intY%32 != 0)
                    objLodeRunner.intY = objLodeRunner.intY - (objLodeRunner.intY%32);
            }
            
            console.log("X: " + objLodeRunner.intX + "\nY: " + objLodeRunner.intY )

            // VIDE EN DESSOUS DE LODE
            var espaceSousLodeX = objLodeRunner.intX + 10;
            var espaceSousLodeY = objLodeRunner.intY;

            if (tabDispo[Math.floor(espaceSousLodeY/32)][Math.floor(espaceSousLodeX/32)] == "0" ||
                    tabDispo[Math.floor(espaceSousLodeY/32)][Math.floor(espaceSousLodeX/32)] == "3") {
                console.log("vide under")    
                binGauche = false;
                binTombe = true;
            } else {
                binGauche = true; 
                binTombe = false;
            }
            
            
        break;

        case "droite":    // mouvement sur sol/barre de franchissement et placer bombs
            spriteCount = 3;
            objLodeRunner.Image = objImageLodeRunner;
            
            if (objLodeRunner.intX < objCanvas.width - 40 && binDroite==true)
                objLodeRunner.intX += 5;    // test speed is 5

                if (objLodeRunner.intX >= objCanvas.width-16)
                    objLodeRunner.intX = objCanvas.width-17;

             // VIDE EN DESSOUS DE LODE
             var espaceSousLodeX = objLodeRunner.intX - 10;
             var espaceSousLodeY = objLodeRunner.intY;
 
             if (tabDispo[Math.floor(espaceSousLodeY/32)][Math.floor(espaceSousLodeX/32)] == "0" ||
                    tabDispo[Math.floor(espaceSousLodeY/32)][Math.floor(espaceSousLodeX/32)] == "3") {
                 console.log("vide under")    
                 binDroite = false;
                 binTombe = true;
             } else {
                 binDroite = true; 
                 binTombe = false;
             }


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
                            objLodeRunner.intY -= 2;
                            objLodeRunner.intX = ladderX;
                            
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
                    if (i+1 < tabDispo.length) {
                        if (tabDispo[i+1][k] == "2") {
                            var ladderX = k * 32 + 16;
                            var ladderY = i * 32 + 32;

                            if ((objLodeRunner.intX - 16 <= ladderX && objLodeRunner.intX + 16 >= ladderX) &&
                                (objLodeRunner.intY + 32 >= ladderY && objLodeRunner.intY <= ladderY + 32)) {

                                // LODE SUR UNE ECHELLE
                                objLodeRunner.Image = objLodeEchelle;
                                objLodeRunner.intY += 2;
                                objLodeRunner.intX = ladderX;
                            }
                        }
                    }
                }
            }
            break;

        default: "idk";
            break;
    }

}
