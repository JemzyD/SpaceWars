function totalPlayer () {
  this.cards = []
  this.moves = []
};

totalPlayer.prototype.playTurn = function (choice) {
  if (game.isGameOver === false) {
    if (game.explosionStatus === true) {
      if (this.cards[choice].type !== 'defuse') {
        return;
      }
    };

    game.playedCards.unshift(this.cards[choice])
    this.moves.unshift(this.cards[choice].type)
    var temp = {}
    temp[game.currentPlayer] = this.cards[choice].type
    game.moves.unshift(temp)
    this.cards.splice(choice, 1)
    game.playedCards[0].render()
  };

  console.log('player', game.player[0])
  console.log('game', game)
  updateDisplay()
  updateNotice()
};

totalPlayer.prototype.drawCard = function (num) {
  console.log('totalPlayer', game.currentPlayer, 'drawCard')

  if (drawingPile[num].type === 'death-star') {
    drawingPile[num].render()
    game.checkGameOver()
  } else {
    this.cards.push(drawingPile[num])
    drawingPile.splice(num, 1)

    if (num === 0) {
      this.moves.unshift('draw')
      var temp = {}
      temp[game.currentPlayer] = 'draw'
      game.moves.unshift(temp)
    }
    game.checkTurns()
  }

  if (game.knownCards.length > 0 && num === 0) {
    game.knownCards.shift()
  }

  updateDisplay()
  updateNotice()
};
