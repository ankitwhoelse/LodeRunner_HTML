
 function initAnimation() {
    objCanvas = document.getElementById('monCanvas');
    objCanvas.focus();
    objC2D = objCanvas.getContext('2d');
    initImageFond();
    initMurs();
    initBaton();
    initBalle();
    initTrajetBalle();
    initVortex();
    initSons();
    initPointage();
    dessiner(); // Dessiner une première fois
    animer();  // animer
}

function initImageFond() {
    objImageFond = new Image();
    objImageFond.src = 'fond.jpg';
}


// Construire les murs
function initMurs() {
    tabObjMurs = new Array();
    let objMur = null;

    // Le mur de gauche (#0)
    objMur = new Object();
    objMur.intXDebut = 0;
    objMur.intYDebut = 0;
    objMur.intXFin = Math.floor(objCanvas.width / 60);
    objMur.intYFin = objCanvas.height
    objMur.strCouleur = 'midnightblue';
    tabObjMurs.push(objMur);

    // Le mur du centre (en haut) (#1)
    objMur = new Object();
    objMur.intXDebut = 0;
    objMur.intYDebut = 0;
    objMur.intXFin = objCanvas.width;
    objMur.intYFin = Math.floor(objCanvas.width / 60);
    objMur.strCouleur = 'midnightblue';
    tabObjMurs.push(objMur);

    // Le mur de droite (#2)
    objMur = new Object();
    objMur.intXDebut = objCanvas.width;
    objMur.intYDebut = 0;
    objMur.intXFin = objCanvas.width - Math.floor(objCanvas.width / 60);
    objMur.intYFin = objCanvas.height;
    objMur.strCouleur = 'midnightblue';
    tabObjMurs.push(objMur);
}

// Construire le bâton
function initBaton() {
    let objImageBaton = new Image();
    objImageBaton.src = 'baton.png';
    objBaton = new Object();
    objBaton.objImage = objImageBaton;
    objBaton.intLargeur = Math.floor(objCanvas.width / 10);
    objBaton.intHauteur = Math.floor(objCanvas.height / 20);
    objBaton.intX = (objCanvas.width - objBaton.intLargeur) / 2;
    objBaton.intY = objCanvas.height - Math.floor(objCanvas.height / 5);
    objBaton.intVitesse = Math.floor(objCanvas.width / 30);
    objBaton.intDirection = 1;
}

// Construire la balle

function initBalle() {
    objBalle = new Object();
    objBalle.intRayon = Math.floor(objCanvas.width / 150);
    objBalle.fltX = objBaton.intX + objBaton.intLargeur / 2;
    objBalle.fltY = objBaton.intY - objBalle.intRayon;
    objBalle.strCouleur = 'silver';
    objBalle.intVitesse = 5;
    objBalle.intDirectionDegre = Math.floor(Math.random() * 181);
    objBalle.binEnMouvement = false;
    objBalle.binTrait=false;
}
function initTrajetBalle() {
    objBalleJaune = new Object();
    objBalleJaune.couleurTrajet = 'red';
    objBalleJaune.x = objBalle.fltX;
    objBalleJaune.y = objBalle.fltY;
    tabX = new Array();
    tabY = new Array();
}
// Construire le vortex
function initVortex() {
    objVortex = new Object();
    objVortex.intRayon = objBalle.intRayon * Math.floor(3 + Math.random() * 8);
    //objVortex.intRayon = 120;
    objVortex.intX = tabObjMurs[0].intXFin + objVortex.intRayon + Math.floor(Math.random() * (tabObjMurs[2].intXFin - tabObjMurs[0].intXFin - 2 * objVortex.intRayon));
    objVortex.intY = tabObjMurs[1].intYFin + objVortex.intRayon + Math.floor(Math.random() * (objBaton.intY - tabObjMurs[1].intYFin - 2 * objVortex.intRayon));
    objVortex.strCouleur = 'pink';
    objVortex.fltPosCouleur = 0.5;
    objVortex.binEnDisparition = false;
}

// Construire les sons
function initSons() {
    objSons = new Object();

    let objSon = document.createElement('audio');
    objSon.setAttribute('src', 'SonBalleMur.mp3');
    objSon.load();
    objSons.balleMur = objSon;

    objSon = document.createElement('audio');
    objSon.setAttribute('src', 'SonBallePerdue.mp3');
    objSon.load();
    objSons.ballePerdue = objSon;

    objSon = document.createElement('audio');
    objSon.setAttribute('src', 'SonDisparitionVortex.mp3');
    objSon.load();
    objSons.disparitionVortex = objSon;

    objSon = document.createElement('audio');
    objSon.setAttribute('src', 'SonBalleBaton.mp3');
    objSon.load();
    objSons.balleBaton = objSon;
}

// Construire les cartes de pointage
function initPointage() {
    objPointage = new Object();
    objPointage.intX = tabObjMurs[0].intXFin + 4;
    objPointage.intY = objBaton.intY + objBaton.intHauteur + 4;
    objPointage.intLargeur = tabObjMurs[2].intXFin - objPointage.intX;
    objPointage.intHauteur = objCanvas.height - objPointage.intY - 4;

    objPointage.intNbBallesRestantes = 15;
    objPointage.intNbBallesPerdues = 0;
    objPointage.intNbBallesVortex = 0;

    let objImage = new Image();
    objImage.src = 'balle.jpg';
    objPointage.objImageBalle = objImage;

    objImage = new Image();
    objImage.src = 'vortex.jpg';
    objPointage.objImageVortex = objImage;

    objImage = new Image();
    objImage.src = 'Perdu.jpg';
    objPointage.objImagePerdu = objImage;
}
