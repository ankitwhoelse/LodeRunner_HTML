function initAnimation() {
    objCanvas = document.getElementById('monCanvas'); // (960x640)
    objCanvas.focus();
    objC2D = objCanvas.getContext('2d');
    initDisposition();

    if (tabDispo == null) {
        initImages();
        initMurs();
        initLodeRunner();
        initGarde();
        dessiner(); // Dessiner une première fois
        animer();  // animer 
    }
}

// Initialiser la disposition initiale dans un tableau => WINDOWS 10
function initDisposition() {
    // apprendre a faire la lecture de fichier
    // creer un tableau 2d (28x17) avec ce qui se trouverait dans la case
    // remplacer la
    $.get("dispositions.txt", function(data) {
        tabDispo = data.split("\r\n").map( function(el) {
             return el.split(";");
            }
        );
        console.log(tabDispo)
        initLingotOr();
        initGardePosition();
    });
}
/*
// Initialiser la disposition initiale dans un tableau => MAC OSX
function initDisposition() {
    // apprendre a faire la lecture de fichier
    // creer un tableau 2d (28x17) avec ce qui se trouverait dans la case
    // remplacer la
    $.get("dispositions.txt", function(data) {
        tabDispo = data.split("\n").map( function(el) {
             return el.split(";");
            }
        );
        console.log(tabDispo)
        initLingotOr();
    });
}
*/

function initLingotOr() {
    // AJOUTER LINGOT D'OR A RANDOM ENDROITS SUR LA MAP
    let rand1 = Math.floor(Math.random() * 10);
    let rand2 = Math.floor(Math.random() * 10);

    if (tabDispo != null) {
        while (intLingotOr > 0) {
            for (var i = 0; i < tabDispo.length; i++) {
                var ligneDispo = tabDispo[i];
                for (var k = 0; k < ligneDispo.length; k++) {
                    if (tabDispo[i][k] == "1") {
                        
                        rand2 = Math.floor(Math.random() * 10);
                        if ((rand1 == rand2) && intLingotOr != 0) {
                            if (tabDispo[i-1][k] == "0") {
                                tabDispo[i-1][k] = 6;
                                intLingotOr--;
                            }
                        }
                    }
                }
            }
        }
    }
  
    intLingotOr = 5;
}

function initGardePosition() {
    // Ajouter gardes sur des positions randoms
    let rand1 = Math.floor(Math.random() * 10);
    let rand2 = Math.floor(Math.random() * 10);
    let gardesInitial = intGardeCompte;

    if (tabDispo != null) {
        while (intGardeCompte > 0) {
            for (var i = 0; i < tabDispo.length-3; i++) {
                var ligneDispo = tabDispo[i];
                for (var k = 0; k < ligneDispo.length; k++) {
                    if (tabDispo[i][k] == "1") {
                        
                        rand2 = Math.floor(Math.random() * 10);
                        if ((rand1 == rand2) && intGardeCompte != 0) {
                            if (tabDispo[i-1][k] == "0") {
                                tabDispo[i-1][k] = 8;
                                intGardeCompte--;
                            }
                        }
                    }
                }
            }
        }
    }

    intGardeCompte = gardesInitial;
}

// Construire les murs
function initMurs() {
    tabObjMurs = new Array();
    let objMur = null;

    // Le mur de gauche (#0)
    objMur = new Object();
    objMur.intXDebut = 0;
    objMur.intYDebut = 0;
    objMur.intXFin = 16;
    objMur.intYFin = objCanvas.height
    objMur.strCouleur = 'orange';
    tabObjMurs.push(objMur);

    // Le mur du haut (#1)
    objMur = new Object();
    objMur.intXDebut = 0;
    objMur.intYDebut = 0;
    objMur.intXFin = objCanvas.width;
    objMur.intYFin = 32;
    objMur.strCouleur = 'orange';
    tabObjMurs.push(objMur);

    // Le mur de droite (#2)
    objMur = new Object();
    objMur.intXDebut = objCanvas.width;
    objMur.intYDebut = 0;
    objMur.intXFin = objCanvas.width - 16;
    objMur.intYFin = objCanvas.height;
    objMur.strCouleur = 'orange';
    tabObjMurs.push(objMur);

    // Le mur du bas (#3)
    objMur = new Object();
    objMur.intXDebut = 0;
    objMur.intYDebut = objCanvas.height;
    objMur.intXFin = objCanvas.width;
    objMur.intYFin = objCanvas.height - 16;
    objMur.strCouleur = 'orange';
    tabObjMurs.push(objMur);

    // L'espace du score
    objMur = new Object();
    objMur.intXDebut = 16;
    objMur.intYDebut = objCanvas.height - 16;
    objMur.intXFin = objCanvas.width - 16;
    objMur.intYFin = objCanvas.height - 96;
    objMur.strCouleur = 'gray';
    tabObjMurs.push(objMur);

} 

// Initialiser LodeRunner
function initLodeRunner(){ 
    objLodeRunner = new Object();
    objLodeRunner.Image = objImageLodeRunner;
    objLodeRunner.intX = 0;
    objLodeRunner.intY = 0;
}


// Initialiser toutes les images
function initImages() {
    // image LodeRunner
    objImageLodeRunner = new Image();
    objImageLodeRunner.src = 'Personnages/LodeRunner/sprite_dpl_droite.png';

    // image gardeTEST
    objImageGardeT = new Image();
    objImageGardeT.src = 'Personnages/GardeVert/New Piskel-41.png.png';

    // image gardeV (vert)
    objImageGardeV = new Image();
    objImageGardeV.src = 'Personnages/GardeVert/sprite_dpl_droite_gardeVert.png';

    // image gardeM (mauve)
    objImageGardeM = new Image();
    //objImageGardeM.src = 'Personnages/GardeVert/sprite_dpl_droite_gardeVert.png';
        
    // image gardeR (rouge)
    objImageGardeR = new Image();
    //objImageGardeR.src = 'Personnages/GardeVert/sprite_dpl_droite_gardeVert.png';

    // image echelle
    objLodeEchelle = new Image();
    objLodeEchelle.src = "Personnages/LodeRunner/sprite_echelle.png";
    
    // image chute 
    objLodeChute = new Image();
    objLodeChute.src = "Personnages/LodeRunner/sprite_chute.png";

    // image barre droite 
    objLodeBarreDroite = new Image();
    objLodeBarreDroite.src = "Personnages/LodeRunner/sprite_barre_droite.png";
    
    // image barre gauche 
    objLodeBarreGauche = new Image();
    objLodeBarreGauche.src = "Personnages/LodeRunner/sprite_barre_gauche.png";
   
    // image barre droite 
    objLodeBarreDroite= new Image();
    objLodeBarreDroite.src = "Personnages/LodeRunner/sprite_barre_droite.png";
   
    // image bombe gauche
    objLodeRunnerGauche= new Image();
    objLodeRunnerGauche.src= "Personnages/LodeRunner/sprite_dpl_gauche.png";

    // image bombe droite
    objIMGLodeRunnerDroite = new Image();
    objIMGLodeRunnerDroite.src = "Personnages/LodeRunner/loderunner_dpl_droite_1.png";

    // image bomb 
    objIMGBombe = new Image();
    objIMGBombe.src = "images/bomb.gif";

    // image lingot d'or
    objImageOr = new Image();
    objImageOr.src = "images/gold.png";

    // image brique
    objImageBrique = new Image();
    objImageBrique.src = 'images/brick.png'

    // image beton
    objImageBeton = new Image();
    objImageBeton.src = 'images/beton.png'

    // image barre
    objImageBarre = new Image();
    objImageBarre.src = 'images/barre.png'
    
    // image echelle
    objImageEchelle = new Image();
    objImageEchelle.src = 'images/ladder.png'
}