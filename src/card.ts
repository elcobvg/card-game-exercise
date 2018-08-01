'use strict'

/**
 * Simple Card class
 */
export default class Card {

  /**
   * The 'suit' type of the card
   * @type {string}
   */
  protected suit : string

  /**
   * The value of the card
   * @type {string}
   */
  protected rank : string

  /**
   * Class constructor
   * @param  {String} suit
   * @param  {String} rank
   */
  public constructor (suit : string, rank : string) {
    this.suit = suit
    this.rank = rank
  }

  /**
   * See if given card matches this one
   * @param  {Card} card
   * @return {Boolean}
   */
  public matches (card : Card) : boolean {
    return this.suit === card.suit || this.rank === card.rank
  }

  /**
   * Get card properties for output
   * @return {String}
   */
  public get () : string {
    return this.suit + this.rank
  }
}
