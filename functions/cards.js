import cardData from '../data/cards'

const difficultySettings = {
    // @todo - findIndexInArray function needed
    pictureCards: [
        {id: 1, value: 10},
        {id: 11, value: 11},
        {id: 12, value: 12},
        {id: 13, value: 13},
        {id: 14, value: 21}
    ],
    multiplier: 1
};

export function assignDetailsToSuits(cards, exercises) {
    return cards.map(card => {
        card.details = exercises.find(({id}) => id === card.suit);
        return card
    });
}

export function initCardDeck(jokers = true) {
    let cards = [],
        s = 0,
        i = 1,
        j = 1,
        o = i;
    // Create 4 suits and 13 cards for each = 52 playing cards
    while (s < 4) {
        for (i = 1; i < 14; i++) {
            if (i > 10) {
                // o = difficultySettings.pictureCards; // this is 'picture card multiplier'
                // @todo - swap the conditional loop to just check for override value in difficultySettings.pictureCards
                const theObj = difficultySettings.pictureCards.find(({ id }) => id === i);
                o = theObj.value; // this is 'picture card multiplier'
            } else {
                o = i * difficultySettings.multiplier;
            }
            cards.push({
                id: cardData.suits[s] + i,
                suit: cardData.suits[s],
                number: o,
                cardValue: cardData.readableValues[i]
            });
        }
        s++;
    }
    // Create 2 Joker cards
    if (jokers !== false) {
        while (j < 3) {
            o = difficultySettings;
            cards.push({
                id: 'J' + j,
                suit: 'J',
                cardValue: 'joker',
                number: difficultySettings.pictureCards.find(({id}) => id === 14).value  // this is 'picture card multiplier'            cardValue: cardData.readableValues[i],
            });
            j++;
        }
    }

    return cards
}

// Returns a random order to any array passed
export function shuffleTheDeck(theCards) {
    for (let i = theCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [theCards[i], theCards[j]] = [theCards[j], theCards[i]];
    }
}

// Returns the 'count' of the given array
export function splitTheDeck(theCards, count = theCards.length) {
    return theCards.slice(theCards.length - count);
}

export function setupCards(count, jokers = false) {
    let cards = initCardDeck(jokers);
    shuffleTheDeck(cards);
    cards = splitTheDeck(cards, count, jokers);
    return cards;
}
export function setupCardsWithData(data, count, jokers = false) {
    let cards = initCardDeck(jokers);
    assignDetailsToSuits(cards, data);
    shuffleTheDeck(cards);
    cards = splitTheDeck(cards, count);
    return cards;
}