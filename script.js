var isummonstars = document.getElementById('isummonstars');
var body = document.querySelector('body');
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

var darkColors = [
  '#231651', '#D72638', '#FFBA49', '#90BE6D', '#277DA1',
  '#495057', '#F94144', '#F3722C', '#F8961E', '#F9C74F',
  '#F9844A', '#90BE6D', '#43AA8B', '#577590', '#F94144',
  '#F8961E', '#F3722C', '#90BE6D', '#43AA8B', '#577590'
];

var currentColor = '#090909';
var canChangeColor = true;
var vignetteEffectApplied = false;

function changeColor() {
  if (canChangeColor) {
    var newColor = getRandomColor();
    body.style.transition = 'background-color 0.5s, box-shadow 0.5s';
    body.style.backgroundColor = newColor;
    currentColor = newColor;
    canChangeColor = false;

    // Apply vignette effect after the first color change
    if (!vignetteEffectApplied) {
      applyVignetteEffect();
      vignetteEffectApplied = true;
    }
  }
}

function applyVignetteEffect() {
  body.style.boxShadow = 'inset 0 0 200px rgba(0, 0, 0, 0.8)';
}

function getRandomColor() {
  var previousColor = currentColor;
  var index = Math.floor(Math.random() * darkColors.length);
  var color = darkColors[index];

  // Ensure the new color is not similar to the previous color
  while (isColorSimilar(color, previousColor)) {
    index = Math.floor(Math.random() * darkColors.length);
    color = darkColors[index];
  }

  return color;
}

function isColorSimilar(color1, color2) {
  var threshold = 100;
  var rgb1 = hexToRgb(color1);
  var rgb2 = hexToRgb(color2);

  var rDiff = Math.abs(rgb1.r - rgb2.r);
  var gDiff = Math.abs(rgb1.g - rgb2.g);
  var bDiff = Math.abs(rgb1.b - rgb2.b);

  return rDiff + gDiff + bDiff < threshold;
}

function hexToRgb(hex) {
  var bigint = parseInt(hex.substring(1), 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return { r: r, g: g, b: b };
}

isummonstars.addEventListener('click', function () {
  if (isMobile) {
    changeColor();
  }
});

isummonstars.addEventListener('mouseover', function () {
  if (!isMobile) {
    changeColor();
  }
});

isummonstars.addEventListener('mouseout', function () {
  canChangeColor = true;
});

body.style.backgroundColor = currentColor;
