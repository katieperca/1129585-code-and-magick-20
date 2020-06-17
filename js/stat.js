'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var TEXT_HEIGHT = 20;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var maxBarHeight = CLOUD_HEIGHT - GAP - TEXT_HEIGHT * 4 - GAP;
var TEXT_COLOR = '#000';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, x, y, color, message, font, aligning) {
  ctx.font = font ? font : '';
  ctx.textBaseline = aligning ? aligning : '';
  ctx.fillStyle = color;
  ctx.fillText(message, x, y);
};

var renderBar = function (ctx, x, y, player, playersTime, maxTime) {
  if (player === 'Вы') {
    ctx.fillStyle = 'rgb(255, 0, 0, 1)';
  } else {
    var playersColor = 'hsl(' + 240 + ',' +
    (1 + 99 * Math.random()) + '%,' +
    50 + '%)';
    ctx.fillStyle = playersColor;
  }
  var barHeight = (maxBarHeight * playersTime) / maxTime;
  ctx.fillRect(x, y, BAR_WIDTH, barHeight);
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
    var barX = CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i;
    var barY = CLOUD_HEIGHT - (maxBarHeight * times[i]) / maxTime - CLOUD_Y - TEXT_HEIGHT;
    var scoreX = CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i;
    var scoreY = CLOUD_HEIGHT - (maxBarHeight * times[i]) / maxTime - TEXT_HEIGHT * 2;
    var playersNameX = CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i;
    var playersNameY = CLOUD_HEIGHT - CLOUD_Y;

    renderBar(ctx, barX, barY, players[i], times[i], maxTime);
    renderText(ctx, scoreX, scoreY, TEXT_COLOR, Math.round(times[i]));
    renderText(ctx, playersNameX, playersNameY, TEXT_COLOR, players[i]);
  }

  renderText(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, TEXT_COLOR, 'Ура, вы победили!', '16px PT Mono', 'hanging');
  renderText(ctx, CLOUD_X + GAP, CLOUD_Y + GAP * 2, TEXT_COLOR, 'Список результатов:', '16px PT Mono', 'hanging');
};
