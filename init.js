function initAnimation() {
    objCanvas = document.getElementById('monCanvas'); // (960x640)
    objCanvas.focus();
    objC2D = objCanvas.getContext('2d');
    initDisposition();
    
    if (tabDispo == null) {
        initImages();
        initMurs();
        initLodeRunner();
        dessiner(); // Dessiner une première fois
        animer();  // animer 
    }
}

// Initialiser la disposition initiale dans un tableau => WINDOWS 10
function initDisposition() {
    $.get("dispositions.txt", function(data) {
        tabDispo = data.split("\r\n").map( function(el) {
             return el.split(";");
            }
        );
        console.log(tabDispo)
        initLingotOr();
        initGardePosition();
        initGarde();
    });
}
/*
// Initialiser la disposition initiale dans un tableau => MAC OSX
function initDisposition() {
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

    // image gardeV dpl droite (vert)
    objImageGardeVDroite = new Image();
    objImageGardeVDroite.src = 'Personnages/GardeVert/sprite_dpl_droite_gardeVert.png';

    // image gardeV dpl droite (vert) avec lingot
    objImageGardeVDroiteOr = new Image();
    objImageGardeVDroiteOr.src = 'Personnages/GardeVert/sprite_dpl_droite_gardeVert_or.png';
    
    // image dplGauche garde vert
    objImageGardeVGauche = new Image();
    objImageGardeVGauche.src = 'Personnages/GardeVert/sprite_dpl_gauche_gardeVert.png';

    // image dplGauche garde vert avec lingot 
    objImageGardeVGaucheOr = new Image();
    objImageGardeVGaucheOr.src = 'Personnages/GardeVert/sprite_dpl_gauche_gardeVert_or.png';

    // image echelle garde vert
    objImageGardeVEchelle = new Image();
    objImageGardeVEchelle.src = 'Personnages/GardeVert/sprite_echelle_gardeVert.png';

    // image echelle garde vert avec lingot
    objImageGardeVEchelleOr = new Image();
    objImageGardeVEchelleOr.src = 'Personnages/GardeVert/sprite_echelle_gardeVert_or.png';

    // image barre gauche garde vert
    objImageGardeVBarreGauche = new Image();
    objImageGardeVBarreGauche.src = 'Personnages/GardeVert/sprite_barre_gauche_gardeVert.png';

    // image barre gauche garde vert avec lingot
    objImageGardeVBarreGaucheOr = new Image();
    objImageGardeVBarreGaucheOr.src = 'Personnages/GardeVert/sprite_barre_gauche_gardeVert_or.png';

     // image barre droite garde vert
     objImageGardeVBarreDroite = new Image();
     objImageGardeVBarreDroite.src = 'Personnages/GardeVert/sprite_barre_droite_gardeVert.png';

     // image barre droite garde vert avec lingot
     objImageGardeVBarreDroiteOr = new Image();
     objImageGardeVBarreDroiteOr.src = 'Personnages/GardeVert/sprite_barre_gauche_gardeVert_or.png';

     // image chute garde vert 
     objImageGardeVChute = new Image();
     objImageGardeVChute.src = 'Personnages/GardeVert/sprite_chute_gardeVert.png';

     // image chute garde vert avec lingot
     objImageGardeVChuteOr = new Image();
     objImageGardeVChuteOr.src = 'Personnages/GardeVert/sprite_chute_gardeVert_or.png';

     // image chute garde vert dans un trou
     objImageGardeVChuteTrou = new Image();
     objImageGardeVChuteTrou.src = 'Personnages/GardeVert/chute_gardeVert.png';

     // image chute garde vert dans un trou avec lingot
     objImageGardeVChuteTrouOr = new Image();
     objImageGardeVChuteTrouOr.src = 'Personnages/GardeVert/chute_gardeVert_or.png';



    // image gardeV dpl droite (Mauve)
    objImageGardeMDroite = new Image();
    objImageGardeMDroite.src = 'Personnages/GardeMauve/sprite_dpl_droite_gardeMauve.png';

    // image gardeM dpl droite (mauve) avec lingot
    objImageGardeMDroiteOr = new Image();
    objImageGardeMDroiteOr.src = 'Personnages/GardeMauve/sprite_dpl_droite_gardeMauve_or.png';
    
    // image dplGauche garde mauve
    objImageGardeMGauche = new Image();
    objImageGardeMGauche.src = 'Personnages/GardeMauve/sprite_dpl_gauche_gardeMauve.png';

    // image dplGauche garde mauve avec lingot 
    objImageGardeMGaucheOr = new Image();
    objImageGardeMGaucheOr.src = 'Personnages/GardeMauve/sprite_dpl_gauche_gardeMauve_or.png';

    // image echelle garde mauve
    objImageGardeMEchelle = new Image();
    objImageGardeMEchelle.src = 'Personnages/GardeMauve/sprite_echelle_gardeMauve.png';

    // image echelle garde mauve avec lingot
    objImageGardeMEchelleOr = new Image();
    objImageGardeMEchelleOr.src = 'Personnages/GardeMauve/sprite_echelle_gardeMauve_or.png';

    // image barre gauche garde mauve
    objImageGardeMBarreGauche = new Image();
    objImageGardeMBarreGauche.src = 'Personnages/GardeMauve/sprite_barre_gauche_gardeMauve.png';

    // image barre gauche garde mauve avec lingot
    objImageGardeMBarreGaucheOr = new Image();
    objImageGardeMBarreGaucheOr.src = 'Personnages/GardeMauve/sprite_barre_gauche_gardeMauve_or.png';

     // image barre droite garde mauve
     objImageGardeMBarreDroite = new Image();
     objImageGardeMBarreDroite.src = 'Personnages/GardeMauve/sprite_barre_droite_gardeMauve.png';

     // image barre droite garde mauve avec lingot
     objImageGardeMBarreDroiteOr = new Image();
     objImageGardeMBarreDroiteOr.src = 'Personnages/GardeMauve/sprite_barre_droite_gardeMauve_or.png';

     // image chute garde mauve 
     objImageGardeMChute = new Image();
     objImageGardeMChute.src = 'Personnages/GardeMauve/sprite_chute_gardeMauve.png';

     // image chute garde mauve avec lingot
     objImageGardeMChuteOr = new Image();
     objImageGardeMChuteOr.src = 'Personnages/GardeMauve/sprite_chute_gardeMauve_or.png';

     // image chute garde mauve dans un trou
     objImageGardeMChuteTrou = new Image();
     objImageGardeMChuteTrou.src = 'Personnages/GardeMauve/chute_gardeMauve.png';

     // image chute garde mauve dans un trou avec lingot
     objImageGardeMChuteTrouOr = new Image();
     objImageGardeMChuteTrouOr.src = 'Personnages/GardeMauve/chute_gardeMauve_or.png';
        
    
     /// image gardeR dpl droite (rouge)
    objImageGardeRDroite = new Image();
    objImageGardeRDroite.src = 'Personnages/GardeRouge/sprite_dpl_droite_gardeRouge.png';

    // image gardeR dpl droite (rouge) avec lingot
    objImageGardeRDroiteOr = new Image();
    objImageGardeRDroiteOr.src = 'Personnages/GardeRouge/sprite_dpl_droite_gardeRouge_or.png';
    
    // image dplGauche garde rouge
    objImageGardeRGauche = new Image();
    objImageGardeRGauche.src = 'Personnages/GardeRouge/sprite_dpl_gauche_gardeRouge.png';

    // image dplGauche garde rouge avec lingot 
    objImageGardeRGaucheOr = new Image();
    objImageGardeRGaucheOr.src = 'Personnages/GardeRouge/sprite_dpl_gauche_gardeRouge_or.png';

    // image echelle garde rouge
    objImageGardeREchelle = new Image();
    objImageGardeREchelle.src = 'Personnages/GardeRouge/sprite_echelle_gardeRouge.png';

    // image echelle garde rouge avec lingot
    objImageGardeREchelleOr = new Image();
    objImageGardeREchelleOr.src = 'Personnages/GardeRouge/sprite_echelle_gardeRouge_or.png';

    // image barre gauche garde rouge
    objImageGardeRBarreGauche = new Image();
    objImageGardeRBarreGauche.src = 'Personnages/GardeRouge/sprite_barre_gauche_gardeRouge.png';

    // image barre gauche garde rouge avec lingot
    objImageGardeRBarreGaucheOr = new Image();
    objImageGardeRBarreGaucheOr.src = 'Personnages/GardeRouge/sprite_barre_gauche_gardeRouge_or.png';

     // image barre droite garde rouge
     objImageGardeRBarreDroite = new Image();
     objImageGardeRBarreDroite.src = 'Personnages/GardeRouge/sprite_barre_droite_gardeRouge.png';

     // image barre droite garde rouge avec lingot
     objImageGardeRBarreDroiteOr = new Image();
     objImageGardeRBarreDroiteOr.src = 'Personnages/GardeRouge/sprite_barre_droite_gardeRouge_or.png';

     // image chute garde rouge 
     objImageGardeRChute = new Image();
     objImageGardeRChute.src = 'Personnages/GardeRouge/sprite_chute_gardeRouge.png';

     // image chute garde rouge avec lingot
     objImageGardeRChuteOr = new Image();
     objImageGardeRChuteOr.src = 'Personnages/GardeRouge/sprite_chute_gardeRouge_or.png';

     // image chute garde rouge dans un trou
     objImageGardeRChuteTrou = new Image();
     objImageGardeRChuteTrou.src = 'Personnages/GardeRouge/chute_gardeRouge.png';

     // image chute garde rouge dans un trou avec lingot
     objImageGardeRChuteTrouOr = new Image();
     objImageGardeRChuteTrouOr.src = 'Personnages/GardeRouge/chute_gardeRouge_or.png';

    // image echelle
    objLodeEchelle = new Image();
    objLodeEchelle.src = "Personnages/LodeRunner/sprite_echelle.png";
    
    // image chute 
    objLodeChute = new Image();
    objLodeChute.src = "Personnages/LodeRunner/sprite_chute.png";

    // image chute Lode sans frames (dans un trou)
    objLodeChuteSolo = new Image();
    objLodeChuteSolo.src = "Personnages/LodeRunner/loderunner_chute_1.png";
    


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

    // image brique explose
    objImageBriqueExplose = new Image();
    objImageBriqueExplose.src = 'images/brick decay.png';

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
