// pad un nombre avec des 0
function pad(number, length) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;
}

// start timer
function secondTick() {
    setInterval(function() { intSec++; }, 1000);
}

// sleep for millisecond
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}

let singleAlert = 0;
// fonction GameOver
function GameOver() {
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
    if (singleAlert==0)
      alert("\nGAME OVER\nPoints: " + intPoints + "\n\nVeuillez rafraichir la page ou appuyer la touche F5.\n ")
    singleAlert++;
}

// fonction LodeRunner meurt
function LodeRunnerMeurt() {
    audio5.play()
    binLodeTrou = false;
    spriteCount = 3;
    objLodeRunner.Image = objImageLodeRunner;
    booStart = true;
    binBombeDroite = false;
    binBombeGauche = false;
    framesPerSecond = 60;
    intLingotOr = 6;
    intPoints = intOldPoints;
    intLingotOrRamasse = 0;
    objLodeRunner.intY = 0;
    objLodeRunner.intX = 0;
    initDisposition();
    dessiner();
    dessinerLodeRunner();
    intVies--;
}

// fonction LodeRunner gagne
function LodeRunnerGagne() {
    audio7.play();
    intOldPoints = intPoints;
    binNextLevel = true;
    spriteCount = 3;
    objLodeRunner.Image = objImageLodeRunner
    booStart = true;
    framesPerSecond = 60;
    intNiveau++;
    intGardeCompte++;
    intPoints += 1500;
    intLingotOr = 6;
    intLingotOrRamasse -= 6;
    objLodeRunner.intY = 0;
    objLodeRunner.intX = 0;
    initDisposition();
    dessiner();
    dessinerLodeRunner();
}

// Instructions
function instructions() {
  alert("Bonjour.\n\nVoiçi les instructions pour le jeu\nMouvement: Flèches ou WASD\nCreuser: C pour la droite, Z pour la gauche");
}