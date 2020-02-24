function initAnimation() {
    objCanvas = document.getElementById('monCanvas'); // (960x640)
    objCanvas.focus();
    objC2D = objCanvas.getContext('2d');
    initDisposition();

    if (tabDispo == null) {
        initMurs();
        initLodeRunner();
        dessiner(); // Dessiner une première fois
        animer();  // animer 
    }
}

// Initialiser la disposition initiale dans un tableau
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
    });
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

    // L'espace du jeu TEST
    // objMur = new Object();
    // objMur.intXDebut = 16;
    // objMur.intYDebut = 32;
    // objMur.intXFin = 16 + 896;
    // objMur.intYFin = 32 + 544;
    // objMur.strCouleur = 'blue';
    // tabObjMurs.push(objMur);
} 

function initLodeRunner(){ 
    objImageLodeRunner = new Image();
    objLodeRunner = new Object();
    objImageLodeRunner.src = 'Personnages/LodeRunner/loderunner_dpl_droite_1.png';
    objLodeRunner.Image = objImageLodeRunner;
    objLodeRunner.intX = 0;
    objLodeRunner.intY = 0;
    
    // initialisation des images


}