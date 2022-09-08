import { implantes } from './implantes.js';

let slider = document.getElementById('alturaSlider');
let output = document.getElementById('demo');
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = this.value;
};

let slider2 = document.getElementById('larguraSlider');
let output2 = document.getElementById('demo2');
output2.innerHTML = slider2.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider2.oninput = function () {
  output2.innerHTML = this.value;
};

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//-------------------------------------AQUI COMEÇA O CODIGO PROPRIAMENTE DITO-----
//--------------------------------------------------------------------------------
// ----------------------------------------CAPTURA OS INPUTS E ARMAZENA EM STRINGS

const botao = document.getElementById('botao');
const backBtn = document.getElementById('backButton');
const alturaInput = document.getElementById('altura-input');
const larguraInput = document.getElementById('largura-input');
const typeSelect = document.getElementById('tipo-osseo');
const alturaSlider = document.getElementById('alturaSlider');
const larguraSlider = document.getElementById('larguraSlider');
const platformSelect = document.getElementById('plataforma');

const selectSize = (input, slider) => {
  let size;
  const inputNum = Number(input);
  const sliderNum = Number(slider);

  if ((inputNum > sliderNum) & (sliderNum != 0)) {
    size = sliderNum;
  } else if ((sliderNum != 0) & (sliderNum >= inputNum)) {
    size = sliderNum;
  } else if (sliderNum == 0) {
    size = inputNum;
  }
  return size;
};

// Checa se existe em um determinado array se algum valor satisfaz as medidas de dente solicitadas pelo usuario
const checkValueInRange = (userInput, array, difference) => {
  return array.some(
    (item) => item >= userInput - difference && item <= userInput,
  );
};

const getValueInRange = (userInput, array, difference) => {
  let result = [];
  array.map((item) => {
    if (item >= userInput - difference && item <= userInput) {
      result.push(item);
    }
  });

  return result;
};

function acharImplantes(implantesArray, height, width, platform, type) {
  let implantObj = [];

  implantesArray.forEach((implante) => {
    const plataforma = implante.plataforma == platform;
    const tipoOsseo = implante.osso.filter((tipo) => tipo == type);

    if (
      checkValueInRange(height, implante.altura, 1.5) &&
      checkValueInRange(width, implante.largura, 0.5)
    ) {
      if (platform == implante.plataforma && implante.osso.includes(type)) {
        implantObj.push(implante);
      }
    }
  });

  return implantObj;
}

botao.addEventListener('click', function (event) {
  event.preventDefault();
  // Pegando valor do tipo e da plat inseridas pelo usuario
  const typeValue = typeSelect.options[typeSelect.selectedIndex].value;

  const platformValue =
    platformSelect.options[platformSelect.selectedIndex].value;
  // Pegando valor do tipo e da plat inseridas pelo usuario
  const heightValue = alturaInput.value;
  const widthValue = larguraInput.value;
  const heightSliderValue = alturaSlider.value;
  const widthSliderValue = larguraSlider.value;

  //funçao que faz a verificação da altura e retorna altura possivel
  const alturaUser = selectSize(heightValue, heightSliderValue);
  const larguraUser = selectSize(widthValue, widthSliderValue);

  let implanteCerto;
  implanteCerto = acharImplantes(
    implantes,
    alturaUser,
    larguraUser,
    platformValue,
    typeValue,
  );

  criarResposta(implanteCerto, alturaUser, larguraUser);
});

/// ---------------------------------------CRIAR DIV AO CLICAR NO BOTAO

const divPrincipal = document.querySelector('.sec');
const divRespostas = document.querySelector('.respostas');

function criarResposta(implantesCertos, alturaUser, larguraUser) {
  
  divPrincipal.classList.toggle('hide');
  divRespostas.classList.toggle('hide');

  const respostas = document.createElement('div');
  respostas.className = 'criarresposta';

  document.querySelector('.respostas').appendChild(respostas);
  const implanteList = document.getElementById('implanteList');
  implantesCertos.map((implante) => {
    let entry = document.createElement('li');
    let divAnswer = document.createElement('div');
    let divContainer = document.createElement('div');
    let divAnswerContainer = document.createElement('div');

    let name = document.createElement('div');
    name.className = 'answerName';
    name.innerHTML = implante.name;

    let altura = document.createElement('span');
    altura.className = 'answerHeight';
    altura.innerHTML = getValueInRange(alturaUser, implante.altura, 1.5) +" x ";

    let largura = document.createElement('span');
    largura.className = 'answerWidth';
    largura.innerHTML = getValueInRange(larguraUser, implante.largura, 0.5);

    let tipo = document.createElement('div');
    tipo.className = 'answerType';
    tipo.innerHTML = "<span class='text-span'>Tipo: </span>" + implante.osso;

    let platform = document.createElement('div');
    platform.className = 'answerPlatform';
    platform.innerHTML = implante.plataforma + " " + implante.empresa;

    let value = document.createElement('div');
    value.className = 'answerValue';
    value.innerHTML = "<span class='text-span'>Valor: </span>" + implante.valor;

    let pic = document.createElement('div');
    pic.className = 'answerPic';
    pic.innerHTML = `<a href="${implante.pdf}" target="_blank"><img src='${implante.imagem}'></a>`;
    // '<a href=' + implante.pdf +'><img src=' + implante.imagem + '></a>';

    let imgpdf = document.createElement('span');
    imgpdf.className = 'imgpdf';
    imgpdf.innerHTML = '<img src= "./29587.png"/>';

    divAnswer.className = 'answerDiv';
    divContainer.className = 'divContainer';
    divAnswerContainer.className = 'answerContainer';

    divAnswer.appendChild(name);
    divAnswer.appendChild(divContainer);
    divContainer.appendChild(pic);
    pic.appendChild(imgpdf);
    divContainer.appendChild(divAnswerContainer);
    divAnswerContainer.appendChild(altura);
    divAnswerContainer.appendChild(largura);
    divAnswerContainer.appendChild(tipo);
    divAnswerContainer.appendChild(platform);

    divAnswerContainer.appendChild(value);

    entry.appendChild(divAnswer);
    implanteList.appendChild(entry);
  });
}


// FUNÇÃO QUE FAZ A LEGENDA APARECER E SUMIR CONFORME CLICK BOTAO
let idLegenda = document.getElementById('botaoLegenda');
let displayDaDiv = document.getElementById('legenda');

idLegenda.addEventListener('click', function () {
  if (displayDaDiv.style.display === 'block') {
    displayDaDiv.style.display = 'none';
  } else {
    displayDaDiv.style.display = 'block';
  }
});


// FUNÇÃO QUE VOLTA PRA PAG INICIAL
backBtn.addEventListener('click', function () {
  window.location.reload();
});
