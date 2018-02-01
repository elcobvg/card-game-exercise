'use strict'

const Card = require('./card')
const Player = require('./player')
const suites = [
  String.fromCharCode('0x2660'),  // Spades
  String.fromCharCode('0x2663'),  // Clubs
  String.fromCharCode('0x2665'),  // Hearts
  String.fromCharCode('0x2666')  // Diamonds
]
const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

/**
 * The main class of our game. Sets up the game and runs
 * until we have a winner.
 *
 */
class Game {
  /**
   * Class constructor, creates our players
   * @param  {Array} names
   */
  constructor (names) {
    console.log('Starting game with', names.join(', '))

    this.players = []
    for (let name of names) {
      this.players.push(new Player(name))
    }
  }

  /**
   * Initialize the game
   */
  init () {
    this.deck = []
    for (let suite of suites) {
      for (let rank of ranks) {
        this.deck.push(new Card(suite, rank))
      }
    }
    this.shuffle()
    this.deal()
    this.topCard = this.deck.pop()

    console.log('Top card is:', this.topCard.get())
  }

  /**
   * Shuffle the pack of cards
   */
  shuffle () {
    console.log('Shuffling deck...')

    let m = this.deck.length
    let i, temp

    // Fisher-Yates shuffle
    while (m) {
      i = Math.floor(Math.random() * m--)
      temp = this.deck[m]
      this.deck[m] = this.deck[i]
      this.deck[i] = temp
    }
  }

  /**
   * Deal each player seven cards
   */
  deal () {
    for (let player of this.players) {
      let numCards = 7
      while (numCards--) {
        player.hand.push(this.deck.pop())
      }
      player.renderHand()
    }
  }

  /**
   * Run the game until we have a winner
   * @return {Void} on program end
   */
  run () {
    while (1) { // Infinite loop, but program is guaranteed to end
      let i = 0
      let numPlayers = this.players.length

      while (i < numPlayers) {
        let player = this.players[i]
        let match = player.tryWith(this.topCard)
        if (match) {
          if (player.hasWon()) {
            return  // End program
          }
          this.topCard = match
        } else {
          player.takeCard(this.deck.pop())
        }
        // Keep looping...
        i < numPlayers ? i++ : i = 0
      }
    }
  }
}

module.exports = Game
