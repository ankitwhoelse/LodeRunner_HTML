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
    if(temps==5 && spriteCount ==3) {
        mettreAjourLodeRunner(3);
        temps=0;
    } else if (temps==5 && spriteCount ==2) {
        mettreAjourLodeRunner(2);
        temps=0;
    }
    temps++;
}

function mettreAjourLodeRunner(spriteCount){
    if (spriteCount==3) {
        curFrame = ++curFrame % frameCount; 				
        srcX = curFrame * width; 
        srcY=0;
        objC2D.clearRect(objLodeRunner.intX,objLodeRunner.intY,width,height);
    } else if (spriteCount ==2) {
        curFrame2 = ++curFrame2 % frameCount2; 				
        srcX2 = curFrame2 * width2; 
        srcY2=0;    
        objC2D.clearRect(objLodeRunner.intX,objLodeRunner.intY,width2,height2); 
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

    switch(toucheAppuye) {
        case "gauche":      // mouvement sur sol/barre de franchissement et placer bombs
            spriteCount = 3;
            break;
        case "droite":    // mouvement sur sol/barre de franchissement et placer bombs
            spriteCount = 3;
            break;
        case "haut":      // echelles
            spriteCount = 2;
            for (var i = 0; i < tabDispo.length; i++) {
                var ligneDispo = tabDispo[i];
                for (var k = 0; k < ligneDispo.length; k++) {
                    if (tabDispo[i][k] == "2") {
                        var ladderX = k*32 + 16;
                        var ladderY = i*32 + 32;

                            
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
                        var ladderX = k*32 + 16;
                        var ladderY = i*32 + 32;

                        if (objLodeRunner.intX == ladderX && 
                            objLodeRunner.intY >= ladderY  && objLodeRunner.intX <= ladderX+32) {
                            // LODE SUR UNE ECHELLE
                            objLodeRunner.Image = objLodeEchelle;
                            
                            objLodeRunner.intY++;
                            console.log(objLodeRunner)
                        }
                            
                    }
                }
            }
            break;

        default: "idk";
            break;
    }

}
