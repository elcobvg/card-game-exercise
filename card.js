'use strict'

/**
 * Simple Card class
 */
class Card {
  /**
   * Class constructor
   * @param  {String} suite
   * @param  {String} rank
   */
  constructor (suite, rank) {
    this.suite = suite
    this.rank = rank
  }

  /**
   * See if given card matches this one
   * @param  {Card} card
   */
  matches (card) {
    return this.suite === card.suite || this.rank === card.rank
  }

  /**
   * Get card properties for output
   * @return {String}
   */
  get () {
    return this.suite + this.rank
  }
}

module.exports = Card
