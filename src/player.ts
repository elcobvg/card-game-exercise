'use strict'

import Card from './card'

/**
 * Player class for simple card game
 */
export default class Player {

  /**
   * Player's name
   * @type {string}
   */
  protected name : string

  /**
   * The player's cards
   * @type {Array<Card>}
   */
  public hand : Array<Card>

  /**
   * Flag if player has skipped previous turn
   * @type {boolean}
   */
  public skipped : boolean

  /**
   * Class constructor
   * @param  {String} name
   */
  public constructor (name : string) {
    this.name = name
    this.hand = []
    this.skipped = false
  }

  /**
   * Take a turn and try to match with given card
   * @param  {Card} topCard
   * @return {Card|undefined}
   */
  public tryWith (topCard : Card) : Card|undefined {
    let i = this.hand.length
    while (i--) {
      const card = this.hand[i]
      if (card.matches(topCard)) {
        this.hand.splice(i, 1)
        this.skipped = false
        this.renderPlayed(card)

        return card
      }
    }
    return undefined  // No match found
  }

  /**
   * Take a card from the rest stack if no match found
   * @param  {Card|undefined} card
   * @return {Boolean}
   */
  public takeCard (card : Card|undefined) : boolean {
    if (card === undefined) {
      console.log(`${this.name} has to skip a turn`)
      this.skipped = true
      return false
    }
    this.hand.push(card)
    console.log(`${this.name} does not have a suitable card, taking from deck:`, card.get())
    return true
  }

  /**
   * Check if player has won, i.e. has no more cards left
   * @return {Boolean}
   */
  public hasWon () : boolean {
    if (this.hand.length === 0) {
      console.log(`${this.name} has won!`)
      return true
    }
    return false
  }

  /**
   * Output player's cards in hand
   */
  public renderHand () {
    const cards = []
    for (const card of this.hand) {
      cards.push(card.get())
    }
    console.log(`${this.name} has been dealt:`, cards.join(', '))
  }

  /**
   * Output played card in this turn
   * @param  {Card} card
   */
  protected renderPlayed (card : Card) {
    console.log(`${this.name} plays`, card.get())
    if (this.hand.length === 1) {
      console.log(`${this.name} has 1 card remaining!`)
    }
  }
}
