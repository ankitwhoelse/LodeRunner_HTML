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
    } else if (spriteCount == 1) {
        mettreAjourLodeRunner(1, touche);
        temps = 0;
    }


    if (booStart == false) {
        mettreAjourLodeRunner(3, touche);
        temps = 0;
    }
    temps++;

    if (tabDispo != null) {
        // VIDE EN DESSOUS DE LODE
        var espaceSousLodeX1 = objLodeRunner.intX;
        var espaceSousLodeY = objLodeRunner.intY;

        if (tabDispo[Math.floor(espaceSousLodeY/32)][Math.floor(espaceSousLodeX1/32)] == "0" ||
                tabDispo[Math.floor(espaceSousLodeY/32)][Math.floor(espaceSousLodeX1/32)] == "3" )  {
            
            binGaucheDroite = false;
            binTombe = true;
        } else {
            binGaucheDroite = true; 
            binTombe = false;
        }

        if(binTombe) {
            objLodeRunner.intY += 6;
        }
    }

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
        } else if (sprite == 1) {
            curFrame1 = ++curFrame1 % frameCount1;
            srcX1 = curFrame1 * width1;
            srcY1 = 0;
        }

    }

    if (!booStart) {
        switch (sprite) {
            case 1:
                if (touche== "gauche" || touche=="droite") {
                    curFrame1 = ++curFrame1 % frameCount1;
                    srcX1 = curFrame1 * width1;
                    srcY1 = 0;
                }
                break;
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

let binGaucheDroite = true;

// Pour gerer le changement de direction
function changementDirection(toucheAppuye) {

    switch (toucheAppuye) {
        case "gauche":      // mouvement sur sol/barre de franchissement et placer bombs
            spriteCount = 3;
            objLodeRunner.Image = objImageLodeRunner;
            
            if (objLodeRunner.intX > 16 && binGaucheDroite==true) {
                objLodeRunner.intX -= 5;    //test speed is 5
                
                if (objLodeRunner.intY%32 != 0)
                    objLodeRunner.intY = objLodeRunner.intY - (objLodeRunner.intY%32);
            }
            
        break;

        case "droite":    // mouvement sur sol/barre de franchissement et placer bombs
            spriteCount = 3;
            objLodeRunner.Image = objImageLodeRunner;
            
            if (objLodeRunner.intX < objCanvas.width - 40 && binGaucheDroite==true) {
                objLodeRunner.intX += 5;    // test speed is 5

                if (objLodeRunner.intY%32 != 0)
                    objLodeRunner.intY = objLodeRunner.intY - (objLodeRunner.intY%32);

                for (var i = 0; i < tabDispo.length; i++) {
                    var ligneDispo = tabDispo[i];
                    for (var k = 0; k < ligneDispo.length; k++) {
                        if (tabDispo[i][k] == "6") {
                            var goldX = k * 32 + 16;
                            var goldY = i * 32 + 32;
    
                            if ((objLodeRunner.intX - 16 <= goldX && objLodeRunner.intX + 16 >= goldX) &&
                                (objLodeRunner.intY - 32 <= goldY && objLodeRunner.intY >= goldY - 32)) {
    
                                console.log("picked up gold");
                                tabDispo[i][k] = "0";
                                intLingotOr++;
                            }
                        }
                    }
                }                
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

            case "c":   // bombe a la droite
                spriteCount = 1;
                objLodeRunner.Image = objIMGLodeRunnerDroite;
            
                for (var i = 0; i < tabDispo.length; i++) {
                    var ligneDispo = tabDispo[i];
                    for (var k = 0; k < ligneDispo.length; k++) {
                        if (i+1 < tabDispo.length) {
                            if (tabDispo[i+1][k+1] == "1") {
                                var briqueX = k * 32 + 16;
                                var briqueY = i * 32 + 32;
    
                                if ((objLodeRunner.intX - 16 <= briqueX && objLodeRunner.intX + 16 >= briqueX) &&
                                    (objLodeRunner.intY + 32 >= briqueY && objLodeRunner.intY <= briqueY + 32)) {
                                        
                                        objC2D.drawImage(objIMGBombe, (k+1) * 32 + 16, i * 32 + 32, 32, 32);
                                }
                            }
                        }
                    }
                }


                break;

                
            case "z":   // bombe a la gauche
                
            break;

        default: "idk";
            break;
    }

}
