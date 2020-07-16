import {assignDetailsToSuits, initCardDeck, shuffleTheDeck, splitTheDeck, setupCards, setupCardsWithData} from './cards';

// init cards creates a full array of standard playing cards and two jokers
test('initCardDeck creates array of 54 cards', () => {
    expect(initCardDeck().length).toEqual(54);
});
test('initCardDeck creates array of 52 cards if joker false flag is set', () => {
    expect(initCardDeck(false).length).toEqual(52);
});
test('initCardDeck creates array of objects and first one is Ace of Hearts', () => {
    expect(initCardDeck()[0]['id']).toEqual("H1");
});
test('initCardDeck creates array of objects and last one is the second joker of the pack', () => {
    expect(initCardDeck()[53]['id']).toEqual("J2");
});

// Setup cards gives random deck with count of whatever is provided
const exercises = [{id: 'H', exercise: 'Push ups'}, {id: 'C', exercise: 'Squats'}, {id: 'D', exercise: 'Burpies'}, {id: 'S', exercise: 'Crunches'}];
test('setupCards creates array of 52 cards if no count supplied', () => {
    expect(setupCards().length).toEqual(52);
});

test('setupCardsWithData creates array of 54 cards if no count supplied', () => {
    expect(setupCardsWithData(exercises).length).toEqual(52);
});
test('setupCardsWithData creates array of cards equalling supplied count value', () => {
    expect(setupCardsWithData(exercises,5).length).toEqual(5);
});
test('setupCardsWithData creates array of cards with details added', () => {
    expect(setupCardsWithData(exercises,1)[0].details).toBeDefined();
});

// assignDetailsToSuits adds details of exercises to the suits in each instance
test('assignDetailsToSuits maps array of objects to exercise details', () => {
    let cardData = [{id: "H2", suit: 'H'}];
    let exerciseData = [{id: "H", exercise: 'Exercise 1'}, {id: 'C', exercise: 'Squats'}];
    expect(assignDetailsToSuits(cardData, exerciseData)).toBeDefined();
    expect(assignDetailsToSuits(cardData, exerciseData)).toEqual(
        [{id: "H2", suit: "H", details: {exercise: 'Exercise 1', id: 'H'}}]
    );
});
test('assignDetailsToSuits maps array of objects to exercise details ad works with joker cards', () => {
    let cardData = [{id: "J1", suit: 'J'}];
    let exerciseData = [{id: "J", exercise: 'Exercise X'}];
    expect(assignDetailsToSuits(cardData, exerciseData)).toBeDefined();
    expect(assignDetailsToSuits(cardData, exerciseData)).toEqual(
        [{id: "J1", suit: "J", details: {exercise: 'Exercise X', id: 'J'}}]
    );
});

// Shuffle the deck to create random order
test('shuffleTheDeck returns a different array than it was passed', () => {
    const initCardDeck = [1, 2, 3, 4];
    expect(shuffleTheDeck(initCardDeck)).not.toEqual(initCardDeck);
});

// splitTheDeck
test('splitTheDeck returns an array with the specified count', () => {
    const initCardDeck = [1, 2, 3, 4];
    expect(splitTheDeck(initCardDeck, 2).length).toEqual(2);
    expect(splitTheDeck(initCardDeck, 2)[1]).toEqual(4);
});