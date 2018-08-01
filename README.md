# card-game-exercise
Simple card game exercise demo application.

## Installation

Clone the repository

    git clone git@github.com:elcobvg/card-game-exercise.git

Switch to the repo folder

    cd card-game-exercise
    
Run the game

    node app.js
    
## Note on modelling vs. performance

For this exercise I've chosen to model the application so that it closely resembles its real-world counterpart. This has the benefit that the code is easy to read and understand.
However, it doesn't necessarily give the optimal result in terms of performance. In this scenario that isn't relevant, but in a 'real' application, this may become an issue. For example, if instead of a single deck of cards we have a *very* large array of data objects, to be distributed over a large number of container objects instead of a handful of players, it will be necessary to optimise for performance. Even if that will make the code harder to follow.

For example, shuffling such a very large array may become too expensive, so it may be better to retrieve an item by removing it at a random index. Or instead of using iteration to find a match, it might be better to build an indexed dictionary first, for direct lookups.
If I find the time, I'll  try to add a version that implements some optimisations along these lines.

## Game tactics

This is a simple, naive implementation of the game, i.e. in each turn the first encountered matching card is played. Of course, it may be smarter to keep track of which cards have already been played and - in case a player has more than one match to choose from - play the card that minimises the opponents chances. 
Again, if I find the time I'll try to add a version implementing some simple tactical heuristics.
