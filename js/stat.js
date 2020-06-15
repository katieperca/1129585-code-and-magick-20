'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var TEXT_HEIGHT = 20;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var barHeight = CLOUD_HEIGHT - GAP - TEXT_HEIGHT * 4 - GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP / 2, CLOUD_Y + GAP / 2, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgb(255, 0, 0, 1)';
    } else {
      var playersColor = 'hsl(' + 240 + ',' +
      (1 + 99 * Math.random()) + '%,' +
      50 + '%)';
      ctx.fillStyle = playersColor;
    }
    ctx.fillRect(CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - (barHeight * times[i]) / maxTime - CLOUD_Y - TEXT_HEIGHT, BAR_WIDTH, (barHeight * times[i]) / maxTime);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - (barHeight * times[i]) / maxTime - TEXT_HEIGHT * 2);
    ctx.fillText(players[i], CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - CLOUD_Y);
  }

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура, вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP * 2);
};
