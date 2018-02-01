'use strict'

/**
 * Player class for simple card game
 */
class Player {
  /**
   * Class constructor
   * @param  {String} name
   */
  constructor (name) {
    this.name = name
    this.hand = []
  }

  /**
   * Take a turn and try to match with given card
   * @param  {Card} topCard
   * @return {Card|null}
   */
  tryWith (topCard) {
    let i = this.hand.length
    while (i--) {
      let card = this.hand[i]
      if (card.matches(topCard)) {
        this.hand.splice(i, 1)
        this.renderPlayed(card)

        return card
      }
    }
    return null  // No match found
  }

  /**
   * Take a card from the rest stack if no match found
   * @param  {Card|null} card
   */
  takeCard (card) {
    if (card === undefined) {
      console.log(`${this.name} has to skip a turn`)
    } else {
      this.hand.push(card)
      console.log(`${this.name} does not have a suitable card, taking from deck:`, card.get())
    }
  }

  /**
   * Check if player has won, i.e. has no more cards left
   * @return {Boolean}
   */
  hasWon () {
    if (this.hand.length === 0) {
      console.log(`${this.name} has won!`)
      return true
    }
    return false
  }

  /**
   * Output player's cards in hand
   */
  renderHand () {
    const cards = []
    for (let card of this.hand) {
      cards.push(card.get())
    }
    console.log(`${this.name} has been dealt:`, cards.join(', '))
  }

  /**
   * Output played card in this turn
   * @param  {Card} card
   */
  renderPlayed (card) {
    console.log(`${this.name} plays`, card.get())
    if (this.hand.length === 1) {
      console.log(`${this.name} has 1 card remaining!`)
    }
  }
}

module.exports = Player
