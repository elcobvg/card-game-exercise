'use strict'

import Card from './card'
import Player from './player'

const suits : Array<string> = [
  '\u2660',  // Spades
  '\u2663',  // Clubs
  '\u2665',  // Hearts
  '\u2666',  // Diamonds
]
const ranks : Array<string> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

/**
 * The main class of our game. Sets up the game and runs
 * until we have a winner.
 *
 */
export default class Game {

  /**
   * The players of our game
   * @type {Array<Player>}
   */
  protected players : Array<Player>

  /**
   * Deck of cards
   * @type {Array<Card>}
   */
  protected deck : Array<Card>

  /**
   * The last played card
   * @type {Card}
   */
  protected topCard : Card

  /**
   * Class constructor, creates our players
   * @param  {Array} names
   */
  public constructor (names : Array<string>) {
    console.log('Starting game with', names.join(', '))

    this.players = []
    for (const name of names) {
      this.players.push(new Player(name))
    }
  }

  /**
   * Initialize the game
   */
  public init () {
    this.deck = []
    for (const suit of suits) {
      for (const rank of ranks) {
        this.deck.push(new Card(suit, rank))
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
  protected shuffle () {
    console.log('Shuffling deck...')

    let m = this.deck.length

    // Fisher-Yates shuffle
    while (m) {
      const i = Math.floor(Math.random() * m--)
      const temp = this.deck[m]
      this.deck[m] = this.deck[i]
      this.deck[i] = temp
    }
  }

  /**
   * Deal each player seven cards
   */
  protected deal () {
    for (const player of this.players) {
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
  public run () {
    while (1) { // Infinite loop
      let i = 0
      const numPlayers = this.players.length

      while (i < numPlayers) {
        const player = this.players[i]
        const match = player.tryWith(this.topCard)
        if (match) {
          if (player.hasWon()) {
            return  // End program
          }
          this.topCard = match
        } else {
          const card = player.takeCard(this.deck.pop())
          if (!card && this.allSkipped()) {
            console.log('No winner this time...')
            return  // End program
          }
        }
        // Keep looping...
        i < numPlayers ? i++ : i = 0
      }
    }
  }

  /**
   * If all players had to skip, the game dies...
   * @return {Boolean}
   */
  protected allSkipped () : boolean {
    for (const player of this.players) {
      if (!player.skipped) {
        return false
      }
    }
    return true
  }
}
