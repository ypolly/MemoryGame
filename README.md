# Schmemory starter kit

This starter kit includes babel, sass, webpack and webpack-dev-server to hopefully help with
reducing the time spent on boilerplate stuff. Please start by running

```bash
npm install
```

This will get these packages installed. When that's done, you can — at any time — do `npm start` to
run a development server.

If you are interested in using a simple server to produce images for your cards, you can look in the
sub-folder [example-image-server](./example-image-server).


# How does it work?

* A player chooses one of three avalible filed size options and preses "start"

* Timer starts

* The player flips one card, it remains opened

* The player flips the second card, trying to find corresponding card

* If cards match they stay opened, if not the trun back in 1 second.

* Each card flip adds 1 to "Moves"

* Once all card have been mached with their pair game ends, showing pop-up window with time-moves result on it.

* To restart, again choose the field size and press "start"



# What could be added in the furute?

1. User enters name

2. The game can have a score board, with "Best Time" and "Best Moves", the results could be stored in "localcalStorage" or/and even on server :)

3. Multiple players mode, with following logic: The first player flips the cards, if they don't match the turn goes to the next player. If cards match the next turn remains to him.

4. Better design and responsiveness 


