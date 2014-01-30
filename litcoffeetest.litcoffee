This is an example ModPE Script mod written in Literate CoffeeScript.

This mod will detect players tapping on the ground with a stick and then give
them diamonds.

First, we define a useItem method to listen for taps on ground:

    useItem = (x, y, z, itemId, blockId, side) ->

Now, we detect whether the passed in itemId is equal to stick's item ID, 280.
if it matches, we use the addItemInventory method to give the player some
diamonds (ID of 264)

      if itemId is 280
        addItemInventory 264, 64

And that's it.

