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
    for (let i = 0; i < tabBombes.length; i++) {

        tabBombes[i].tempsBombeDroite++;
        tabBombes[i].tempsBriqueDroite++;
        if (tabBombes[i].tempsBombeDroite == 15) {
            //binBombeDroite = false;

            tabDispo[tabBombes[i].intI + 1][tabBombes[i].intK + 1] = "0";
            //objC2D.drawImage(objImageBriqueExplose, srcX5, srcY5, width5, height5, bombeDroite.intX, bombeDroite.intY+16, 32, 32);
            bombeDroite.tempsBriqueDroite = 0;
            // binBriqueDroite = true;
        }
        if (tabBombes[i].tempsBriqueDroite == 60) {
            tabDispo[tabBombes[i].intI + 1][tabBombes[i].intK + 1] = "1";
            if (binLodeTrou == true) {
                //mort
                audio5.play();
                binLodeTrou = false;
                spriteCount = 3;
                objLodeRunner.Image = objImageLodeRunner;
                booStart = true;
                binBombeDroite = false;
                binBombeGauche = false;
                framesPerSecond = 60;
                intLingotOr = 5;
                intPoints -= intLingotOrRamasse * 250;
                intLingotOrRamasse = 0;
                objLodeRunner.intY = 0;
                objLodeRunner.intX = 0;
                initDisposition();
                dessiner();
                dessinerLodeRunner();
                intVies--;

                tabBombes[i].tempsBombeDroite++;
                tabBombes[i].tempsBriqueDroite++;
                if (tabBombes[i].tempsBombeDroite == 15) {
                    //binBombeDroite = false;

                    tabDispo[tabBombes[i].intI + 1][tabBombes[i].intK + 1] = "0";
                    //objC2D.drawImage(objImageBriqueExplose, srcX5, srcY5, width5, height5, bombeDroite.intX, bombeDroite.intY+16, 32, 32);
                    tabBombes[i].tempsBriqueDroite = 0;
                    // binBriqueDroite = true;
                }
                // binBriqueDroite = false;
                tabBombes.shift();
            }

        }
        tabBombes.splice(i, 1);
        // binBriqueDroite = false;
        //tabBombes.shift();
    }



    if (tempsBombeGauche == 15 && binBombeGauche) {
        binBombeGauche = false;
        tabDispo[bombeGauche.intI + 1][bombeGauche.intK - 1] = "0";
        tempsBriqueGauche = 0;
        binBriqueGauche = true;
    }

    if (tempsBriqueGauche == 60) {
        tabDispo[bombeGauche.intI + 1][bombeGauche.intK - 1] = "1";
        if (binLodeTrou == true) {
            audio5.play();
            binLodeTrou = false;
            spriteCount = 3;
            objLodeRunner.Image = objImageLodeRunner;
            booStart = true;
            binBombeDroite = false;
            binBombeGauche = false;
            framesPerSecond = 60;
            intLingotOr = 5;
            intPoints -= intLingotOrRamasse * 250;
            intLingotOrRamasse = 0;
            objLodeRunner.intY = 0;
            objLodeRunner.intX = 0;
            initDisposition();
            dessiner();
            dessinerLodeRunner();
            intVies--;
        }
        binBriqueGauche = false;
    }

    if (tabGardien != null) {
        for (let intNoGarde = 0; intNoGarde < tabGardien.length; intNoGarde++) {
            let objGarde = tabGardien[intNoGarde];

            if (Math.floor(objGarde.intX / 32) == Math.floor(objLodeRunner.intX / 32) && Math.floor(objGarde.intY / 32) == Math.floor(objLodeRunner.intY / 32)) {
                console.log("dead")
                audio5.play();
                spriteCount = 3;
                objLodeRunner.Image = objImageLodeRunner;
                booStart = true;
                binBombeDroite = false;
                binBombeGauche = false;
                framesPerSecond = 60;
                intLingotOr = 5;
                intPoints -= intLingotOrRamasse * 250;
                intLingotOrRamasse = 0;
                objLodeRunner.intY = 0;
                objLodeRunner.intX = 0;
                initDisposition();
                dessiner();
                dessinerLodeRunner();
                intVies--;
            }

        }
    }

    if (!booStart)
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

    // CREER DES NOUVEAUX LINGOTS D'OR
    if (intLingotOr == -1) {
        intLingotOr = 5;
        initLingotOr();
    }

    // GAME OVER
    if (intVies == 0 || binGameOver) {
        audio10.pause();
        if (audioGameOver) {
            audio6.play();
            audio11.play();
        }
        audioGameOver = false;
        spriteCount = 2;
        curFrame2 = ++curFrame2 % frameCount2;
        srcX2 = curFrame2 * width2;
        srcY2 = 0;
        objLodeRunner.Image = objLodeEchelle;
        binGameOver = true;
        dessinerGameOver();
        booStart = true;
        binGaucheDroite = false;
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
        }
        else if (tabDispo[Math.floor(espaceSousLodeY / 32)][Math.floor(espaceSousLodeX / 32)] == "4") {

            binGaucheDroite = false;
            binLodeTrou = true;
            objLodeRunner.Image = objLodeChuteSolo;
            spriteCount = 1;
            if (intPositionBloque == 0) {

                objLodeRunner.intX = Math.floor(objLodeRunner.intX / 32) * 32 + 16;
                objLodeRunner.intY = Math.floor(objLodeRunner.intY / 32) * 32 - 1.2;
                /* else if (binBriqueGauche) {
                     objLodeRunner.intX = objLodeRunner.intX - 10;
                     objLodeRunner.intY = objLodeRunner.intY - 5;
                 }*/
                intPositionBloque++;
            }

        }

        else {

            binGaucheDroite = true;
            binTombe = false;
            intPositionBloque = 0;
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
            if (tabDispo[Math.floor(espaceSousLodeY / 32)][Math.floor(espaceSousLodeX / 32)] == "4") {

                binGaucheDroite = false;
                binTombe = false;
            }
            /*  if (binBriqueDroite || binBriqueGauche) {
                  binGaucheDroite = false;
              }*/

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
            //garde1
            curFrame4 = ++curFrame4 % frameCount4;
            srcX4 = curFrame4 * width4;
            srcY4 = 0;
        } else if (sprite == 2) {
            curFrame2 = ++curFrame2 % frameCount2;
            srcX2 = curFrame2 * width2;
            srcY2 = 0;

            curFrame5 = ++curFrame5 % frameCount5;
            srcX5 = curFrame5 * width2;
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
                        objLodeRunner.intY += 5;
                        audio2.play();
                    }
                } else if (touche == "gauche") {
                    if (objLodeRunner.intX > 16) {
                        if (!binBarre)
                            objLodeRunner.Image = objLodeRunnerGauche;
                        curFrame3 = ++curFrame3 % frameCount3;
                        srcX3 = curFrame3 * width3;
                        srcY3 = 0;
                    }
                    if (binTombe) {
                        objLodeRunner.intY += 5;
                        audio2.play();
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


            var espaceHautLodeX = objLodeRunner.intX;
            var espaceHautLodeY = objLodeRunner.intY;

            if (tabDispo[Math.floor(espaceHautLodeY / 32) - 1][Math.floor(espaceHautLodeX / 32)] == "3") {
                //console.log("barre");
                audio13.play();
                binBarre = true;
                objLodeRunner.Image = objLodeBarreGauche;
                objLodeRunner.intX -= 5;
            }
            else {
                binBarre = false;
                objLodeRunner.Image = objImageLodeRunner;

                if (objLodeRunner.intX > 16 && binGaucheDroite == true) {
                    objLodeRunner.intX -= 5;    //test speed is 5
                    audio15.play();

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
                                    audio1.play();
                                    console.log("picked up gold : " + intLingotOrRamasse);
                                }
                            }
                        }
                    }
                }
            }
            break;

        case "droite":    // mouvement sur sol/barre de franchissement et placer bombs
            spriteCount = 3;
            var espaceHautLodeX = objLodeRunner.intX;
            var espaceHautLodeY = objLodeRunner.intY;
            if (tabDispo[Math.floor(espaceHautLodeY / 32) - 1][Math.floor(espaceHautLodeX / 32)] == "3") {
                // console.log("barre");
                audio13.play();
                binBarre = true;
                objLodeRunner.Image = objLodeBarreGauche;
                objLodeRunner.intX += 5;
            }
            else {
                objLodeRunner.Image = objImageLodeRunner;

                if (objLodeRunner.intX < objCanvas.width - 40 && binGaucheDroite == true) {
                    objLodeRunner.intX += 5;    // test speed is 5
                    audio15.play();

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
                                    audio1.play();
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
                            audio14a.play();
                            objLodeRunner.Image = objLodeEchelle;
                            objLodeRunner.intY -= 2;
                            objLodeRunner.intX = ladderX;

                            if (objLodeRunner.intY < 32) {
                                console.log("exit level")
                                audio7.play();
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
                                audio14b.play();
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
            spriteCount = 2;
            objLodeRunner.Image = objImageLodeRunner;
            for (var i = 0; i < tabDispo.length; i++) {
                var ligneDispo = tabDispo[i];
                for (var k = 0; k < ligneDispo.length; k++) {
                    if (i + 1 < tabDispo.length) {
                        if (tabDispo[i + 1][k + 1] == "1") {
                            var briqueX = k * 32 + 16;
                            var briqueY = i * 32 + 32;

                            if ((objLodeRunner.intX - 16 <= briqueX && objLodeRunner.intX + 16 >= briqueX) &&
                                (objLodeRunner.intY + 32 >= briqueY && objLodeRunner.intY <= briqueY + 32)) {
                                //tabDispo[i + 1][k + 1] = "0";
                                //binBombeDroite = true;
                                let bombeDroite = new Object();
                                bombeDroite.tempsBombeDroite = 0;
                                bombeDroite.intI = i;
                                bombeDroite.intK = k;
                                bombeDroite.intX = (k + 1) * 32 + 16;
                                bombeDroite.intY = i * 32 + 32;
                                bombeDroite.intLargeur = 32;
                                bombeDroite.intHauteur = 32;
                                bombeDroite.tempsBriqueDroite = 0;
                                objC2D.drawImage(objIMGBombe, bombeDroite.intX, bombeDroite.intY, bombeDroite.intLargeur, bombeDroite.intHauteur);
                                tabBombes.push(bombeDroite);
                                console.log("tab bombe " + tabBombes);
                                // objC2D.drawImage(objImageBriqueExplose, srcX5, srcY5, width5, height5, bombeDroite.intX, bombeDroite.intY, 32, 32);
                                //objC2D.drawImage(objIMGBombe, (k + 1) * 32 + 16, i * 32 + 32, 32, 32);
                                audio3.play();
                            }
                        }
                    }
                }
            }

            break;


        case "z":   // bombe a la gauche
            spriteCount = 2;
            objLodeRunner.Image = objImageLodeRunner;

            for (var i = 0; i < tabDispo.length; i++) {
                var ligneDispo = tabDispo[i];
                for (var k = 0; k < ligneDispo.length; k++) {
                    if (i + 1 < tabDispo.length) {
                        if (tabDispo[i + 1][k - 1] == "1") {
                            var briqueX = k * 32 + 16;
                            var briqueY = i * 32 + 32;

                            if ((objLodeRunner.intX - 16 <= briqueX && objLodeRunner.intX + 16 >= briqueX) &&
                                (objLodeRunner.intY + 32 >= briqueY && objLodeRunner.intY <= briqueY + 32)) {
                                bombeGauche.intI = i;
                                bombeGauche.intK = k;
                                binBombeGauche = true;
                                tempsBombeGauche = 0;
                                bombeGauche.intX = (k - 1) * 32 + 16;
                                bombeGauche.intY = i * 32 + 32;
                                bombeGauche.intLargeur = 32;
                                bombeGauche.intHauteur = 32;
                                //objC2D.drawImage(objIMGBombe, (k - 1) * 32 + 16, i * 32 + 32, 32, 32);
                                objC2D.drawImage(objIMGBombe, bombeGauche.intX, bombeGauche.intY, bombeGauche.intLargeur, bombeGauche.intHauteur);
                                objC2D.drawImage(objImageBriqueExplose, srcX5, srcY5, width5, height5, bombeGauche.intX, bombeGauche.intY, 32, 32);
                                audio3.play();
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
