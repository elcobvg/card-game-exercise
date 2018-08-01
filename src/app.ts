/**
 * Simple card game exercise
 *
 * @author  Elco Brouwer von Gonzenbach <elco.brouwer@gmail.com>
 * @version 0.1.0
 */
'use strict'

import Game from './game'

const players : Array<string> = ['Alice', 'Bob', 'Carol', 'Eve']

/**
 * Start a new game
 */
const game = new Game(players)
game.init()
game.run()
