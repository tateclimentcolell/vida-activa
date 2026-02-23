// LES TEVES 14 IMATGES amb les seves parelles
const cartes = [
  { imatge: "Imatges/01.png", parella: 1 },
  { imatge: "Imatges/02.png", parella: 1 },
  { imatge: "Imatges/03.png", parella: 2 },
  { imatge: "Imatges/04.png", parella: 2 },
  { imatge: "Imatges/05.png", parella: 3 },
  { imatge: "Imatges/06.png", parella: 3 },
  { imatge: "Imatges/07.png", parella: 4 },
  { imatge: "Imatges/08.png", parella: 4 },
  { imatge: "Imatges/09.png", parella: 5 },
  { imatge: "Imatges/10.png", parella: 5 },
  { imatge: "Imatges/11.png", parella: 6 }, 
  { imatge: "Imatges/12.png", parella: 6 },
  { imatge: "Imatges/13.png", parella: 7 },
  { imatge: "Imatges/14.png", parella: 7 }
];

// Carta del darrere (inici)
const imatgeDors = "Imatges/dors.png";

let cartesGirades = []; 
let cartesEmparellades = [];
let bloquejat = false;

// Barrejar les cartes 
function barrejar(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Crear tauler 
function iniciarJoc() {
  const tauler = document.getElementById('tauler');
  const victoria = document.getElementById('victoria');
  
  tauler.innerHTML = '';
  victoria.classList.remove('mostrar');
  cartesGirades = [];
  cartesEmparellades = [];
  bloquejat = false;

  const cartesBarrejades = barrejar([...cartes]);

  cartesBarrejades.forEach((carta, index) => {
    const divCarta = document.createElement('div');
    divCarta.className = 'carta';
    divCarta.dataset.imatge = carta.imatge;
    divCarta.dataset.parella = carta.parella;
    divCarta.dataset.index = index;
    
    divCarta.innerHTML = `
      <div class="carta-interior">
        <div class="cara dors">
          <img src="${imatgeDors}" alt="Dors">
        </div>
        <div class="cara davant">
          <img src="${carta.imatge}" alt="Carta ${index + 1}">
        </div>
      </div>
    `;

    divCarta.addEventListener('click', girarCarta);
    tauler.appendChild(divCarta);
  });
}

// GIRAR CARTA
function girarCarta() {
  if (bloquejat) return;
  if (this.classList.contains('girada')) return;
  if (this.classList.contains('emparellada')) return;

  this.classList.add('girada');
  cartesGirades.push(this);

  if (cartesGirades.length === 2) {
    comprovarParella();
  }
}

// COMPROVAR SI FAN PARELLA
function comprovarParella() {
  bloquejat = true;
  const [carta1, carta2] = cartesGirades;
  const parella1 = carta1.dataset.parella;
  const parella2 = carta2.dataset.parella;

  if (parella1 === parella2) {
    // PARELLA CORRECTA - Mostrar en gran
    const img1 = carta1.dataset.imatge;
    const img2 = carta2.dataset.imatge;
    
    // Mostrar overlay amb les dues cartes
    document.getElementById('cartaParella1').src = img1;
    document.getElementById('cartaParella2').src = img2;
    document.getElementById('overlayParella').classList.add('mostrar');
    
    setTimeout(() => {
      // Amagar overlay
      document.getElementById('overlayParella').classList.remove('mostrar');
      
      // Marcar com emparellades i AMAGAR les cartes
      carta1.classList.add('emparellada');
      carta2.classList.add('emparellada');
      carta1.style.visibility = 'hidden';
      carta2.style.visibility = 'hidden';
      
      cartesEmparellades.push(carta1, carta2);
      cartesGirades = [];
      bloquejat = false;

      // Comprovar victòria
      if (cartesEmparellades.length === cartes.length) {
        setTimeout(() => {
          mostrarVictoria();
        }, 500);
      }
    }, 5000);
    
  } else {
    // ERROR
    carta1.classList.add('error');
    carta2.classList.add('error');
    
    setTimeout(() => {
      carta1.classList.remove('girada', 'error');
      carta2.classList.remove('girada', 'error');
      cartesGirades = [];
      bloquejat = false;
    }, 1500);
  }
}

// MOSTRAR PANTALLA DE VICTÒRIA AMB TOTES LES CARTES
function mostrarVictoria() {
  const victoria = document.getElementById('victoria');
  const taulerFinal = document.getElementById('tauler-final');
  
  taulerFinal.innerHTML = '';
  
  // FILA 1: Primera carta de cada parella (1 a 7)
  for (let parella = 1; parella <= 7; parella++) {
    const cartesParella = cartes.filter(c => c.parella === parella);
    const divCarta = document.createElement('div');
    divCarta.className = 'carta';
    divCarta.innerHTML = `<img src="${cartesParella[0].imatge}" alt="Parella ${parella}">`;
    taulerFinal.appendChild(divCarta);
  }
  
  // FILA 2: Segona carta de cada parella (1 a 7)
  for (let parella = 1; parella <= 7; parella++) {
    const cartesParella = cartes.filter(c => c.parella === parella);
    const divCarta = document.createElement('div');
    divCarta.className = 'carta';
    divCarta.innerHTML = `<img src="${cartesParella[1].imatge}" alt="Parella ${parella}">`;
    taulerFinal.appendChild(divCarta);
  }
  
  victoria.classList.add('mostrar');
}

// INICIAR JOC AL CARREGAR
iniciarJoc();
