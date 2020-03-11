// pad un nombre avec des 0
function pad(number, length) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;
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