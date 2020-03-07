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

    deplacementGarde();

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

    if (intLingotOr == -1) {
        intLingotOr = 5;
        initLingotOr();
    }

    if (intVies==0) {
        dessinerGameOver();
    }

    if (booStart == false) {
        mettreAjourLodeRunner(3, touche);
        temps = 0;
    }
    temps++;

    if (tabDispo != null && binBarre == false) {
        // VIDE EN DESSOUS DE LODE
        var espaceSousLodeX = objLodeRunner.intX;
        var espaceSousLodeY = objLodeRunner.intY;
        if (tabDispo[Math.floor(espaceSousLodeY / 32)][Math.floor(espaceSousLodeX / 32)] == "0" ||
            tabDispo[Math.floor(espaceSousLodeY / 32)][Math.floor(espaceSousLodeX / 32)] == "3") {

            binGaucheDroite = false;
            binTombe = true;
        } else {
            binGaucheDroite = true;
            binTombe = false;
            binDecrocherBarre = false;
        }

        if (binTombe) {
            objLodeRunner.intY += 7;
            objLodeRunner.Image = objLodeChute;
            spriteCount = 2;
            curFrame2 = ++curFrame2 % frameCount2;
            srcX2 = curFrame2 * width2;
            srcY2 = 0;
            if (booStart) {
                objLodeRunner.Image = objImageLodeRunner;
                spriteCount = 3;
            }
            else if (tabDispo[Math.floor(objLodeRunner.intY / 32) - 1][Math.floor(objLodeRunner.intX / 32)] == "3" && binDecrocherBarre == false) {
                binGaucheDroite = true;
                binTombe = false;
                binBarre = true;
                objLodeRunner.Image = objLodeBarreGauche;
            }

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
                if (touche == "gauche" || touche == "droite") {
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
                    if (objLodeRunner.intX < objCanvas.width - 36) {
                        curFrame3 = ++curFrame3 % frameCount3;
                        srcX3 = curFrame3 * width3;
                        srcY3 = 0;
                    }
                    if (binTombe) {
                        console.log("tombe")
                        objLodeRunner.intY += 5;
                    }
                } else if (touche == "gauche") {
                    if (objLodeRunner.intX > 16) {
                        if (!binBarre)
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
            //console.log(tabDispo[Math.floor(objLodeRunner.intY / 32) - 1][Math.floor(objLodeRunner.intX / 32)]);

            //Si lode touche un garde
            if (tabDispo[Math.floor(objLodeRunner.intY / 32) - 1][Math.floor(objLodeRunner.intX / 32)] == "8") {
                console.log("dead")
                spriteCount = 3;
                objLodeRunner.Image = objImageLodeRunner;
                booStart = true;
                framesPerSecond = 60;
                intLingotOr = 5;
                intPoints -= intLingotOrRamasse*250;
                intLingotOrRamasse = 0;
                objLodeRunner.intY = 0;
                objLodeRunner.intX = 0;
                initDisposition();
                dessiner();
                dessinerLodeRunner();
                intVies--;
            }
            
            var espaceHautLodeX = objLodeRunner.intX;
            var espaceHautLodeY = objLodeRunner.intY;

            if (tabDispo[Math.floor(espaceHautLodeY / 32) - 1][Math.floor(espaceHautLodeX / 32)] == "3") {
                //console.log("barre");
                binBarre = true;
                objLodeRunner.Image = objLodeBarreGauche;
                objLodeRunner.intX -= 5;
            }
            else {
                binBarre = false;
                objLodeRunner.Image = objImageLodeRunner;

                if (objLodeRunner.intX > 16 && binGaucheDroite == true) {
                    objLodeRunner.intX -= 5;    //test speed is 5

                    if (objLodeRunner.intY % 32 != 0)
                        objLodeRunner.intY = objLodeRunner.intY - (objLodeRunner.intY % 32);

                    // lingot d'or
                    for (var i = 0; i < tabDispo.length; i++) {
                        var ligneDispo = tabDispo[i];
                        for (var k = 0; k < ligneDispo.length; k++) {
                            if (tabDispo[i][k] == "6") {
                                var goldX = k * 32 + 16;
                                var goldY = i * 32 + 32;

                                if ((objLodeRunner.intX - 16 <= goldX && objLodeRunner.intX + 16 >= goldX) &&
                                    (objLodeRunner.intY - 32 <= goldY && objLodeRunner.intY >= goldY - 32)) {

                                    intLingotOr--;
                                    intLingotOrRamasse++;
                                    tabDispo[i][k] = "0";
                                    intPoints += 250;
                                    console.log("picked up gold : " + intLingotOrRamasse);
                                }
                            }
                        }
                    }

                    // collision garde

                }
            }
            break;

        case "droite":    // mouvement sur sol/barre de franchissement et placer bombs
            spriteCount = 3;
            
            if (tabDispo[Math.floor(objLodeRunner.intY / 32) - 1][Math.floor(objLodeRunner.intX / 32)] == "8") {
                console.log("dead")
                spriteCount = 3;
                objLodeRunner.Image = objImageLodeRunner;
                booStart = true;
                framesPerSecond = 60;
                intLingotOr = 5;
                intPoints -= intLingotOrRamasse*250;
                intLingotOrRamasse = 0;
                objLodeRunner.intY = 0;
                objLodeRunner.intX = 0;
                initDisposition();
                dessiner();
                dessinerLodeRunner();
                intVies--;
            }
            
            var espaceHautLodeX = objLodeRunner.intX;
            var espaceHautLodeY = objLodeRunner.intY;
            if (tabDispo[Math.floor(espaceHautLodeY / 32) - 1][Math.floor(espaceHautLodeX / 32)] == "3") {
                // console.log("barre");
                binBarre = true;
                objLodeRunner.Image = objLodeBarreGauche;
                objLodeRunner.intX += 5;

            }
            else {
                objLodeRunner.Image = objImageLodeRunner;

                if (objLodeRunner.intX < objCanvas.width - 40 && binGaucheDroite == true) {
                    objLodeRunner.intX += 5;    // test speed is 5

                    if (objLodeRunner.intY % 32 != 0)
                        objLodeRunner.intY = objLodeRunner.intY - (objLodeRunner.intY % 32);

                    // lingot d'or
                    for (var i = 0; i < tabDispo.length; i++) {
                        var ligneDispo = tabDispo[i];
                        for (var k = 0; k < ligneDispo.length; k++) {
                            if (tabDispo[i][k] == "6") {
                                var goldX = k * 32 + 16;
                                var goldY = i * 32 + 32;

                                if ((objLodeRunner.intX - 16 <= goldX && objLodeRunner.intX + 16 >= goldX) &&
                                    (objLodeRunner.intY - 32 <= goldY && objLodeRunner.intY >= goldY - 32)) {

                                    intLingotOr--;
                                    intLingotOrRamasse++;
                                    tabDispo[i][k] = "0";
                                    intPoints += 250;
                                    console.log("picked up gold : " + intLingotOrRamasse);
                                }
                            }
                        }
                    }
                }
            }

            break;

        case "haut":      // echelles

            for (var i = 0; i < tabDispo.length; i++) {
                var ligneDispo = tabDispo[i];
                for (var k = 0; k < ligneDispo.length; k++) {
                    if (tabDispo[i][k] == "2" || tabDispo[i][k] == "7") {

                        var ladderX = k * 32 + 16;
                        var ladderY = i * 32 + 32;

                        if ((objLodeRunner.intX - 16 <= ladderX && objLodeRunner.intX + 16 >= ladderX) &&
                            (objLodeRunner.intY - 32 <= ladderY && objLodeRunner.intY >= ladderY - 32)) {
                            spriteCount = 2;
                            // LODE SUR UNE ECHELLE
                            objLodeRunner.Image = objLodeEchelle;
                            objLodeRunner.intY -= 2;
                            objLodeRunner.intX = ladderX;

                            if (objLodeRunner.intY < 32) {
                                console.log("exit level")
                                binNextLevel = true;
                                spriteCount = 3;
                                objLodeRunner.Image = objImageLodeRunner
                                booStart = true;
                                framesPerSecond = 60;
                                intNiveau++;
                                intGardeCompte++;
                                intPoints += 1500;
                                intLingotOr = -1;
                                intLingotOrRamasse -= 5;
                                objLodeRunner.intY = 0;
                                objLodeRunner.intX = 0;
                                dessiner();
                                dessinerLodeRunner();

                                console.log("new level")
                            }

                        }
                    }
                }
            }
            break;

        case "bas":       // echelles
            if (binBarre) {
                binBarre = false;
                binTombe = true;
                binDecrocherBarre = true;
                //objLodeRunner.intY=objLodeRunner.intY+17;
            }

            for (var i = 0; i < tabDispo.length; i++) {
                var ligneDispo = tabDispo[i];
                for (var k = 0; k < ligneDispo.length; k++) {
                    if (i + 1 < tabDispo.length) {

                        if (tabDispo[i + 1][k] == "2" || tabDispo[i + 1][k] == "7") {
                            var ladderX = k * 32 + 16;
                            var ladderY = i * 32 + 32;

                            if ((objLodeRunner.intX - 16 <= ladderX && objLodeRunner.intX + 16 >= ladderX) &&
                                (objLodeRunner.intY + 32 >= ladderY && objLodeRunner.intY <= ladderY + 32)) {
                                spriteCount = 2;
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
                    if (i + 1 < tabDispo.length) {
                        if (tabDispo[i + 1][k + 1] == "1") {
                            var briqueX = k * 32 + 16;
                            var briqueY = i * 32 + 32;

                            if ((objLodeRunner.intX - 16 <= briqueX && objLodeRunner.intX + 16 >= briqueX) &&
                                (objLodeRunner.intY + 32 >= briqueY && objLodeRunner.intY <= briqueY + 32)) {

                                objC2D.drawImage(objIMGBombe, (k + 1) * 32 + 16, i * 32 + 32, 32, 32);
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
