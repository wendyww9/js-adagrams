export const drawLetters = () => {
  const letterPool = {
    'A': 9, 
    'B': 2, 
    'C': 2, 
    'D': 4, 
    'E': 12, 
    'F': 2, 
    'G': 3, 
    'H': 2, 
    'I': 9, 
    'J': 1, 
    'K': 1, 
    'L': 4, 
    'M': 2, 
    'N': 6, 
    'O': 8, 
    'P': 2, 
    'Q': 1, 
    'R': 6, 
    'S': 4, 
    'T': 6, 
    'U': 4, 
    'V': 2, 
    'W': 2, 
    'X': 1, 
    'Y': 2, 
    'Z': 1
    };
  const drawnTiles = [];
  const availableTiles = []; 
  
  for (const letter in letterPool) {
    for (let i = 1; i <= letterPool[letter]; i++) {
      availableTiles.push(letter);
    } 
  };

  for (let i=0; i < 10; i++) {
    let letterIndex = Math.floor(Math.random() * availableTiles.length);
    drawnTiles.push(availableTiles.splice(letterIndex, 1)[0]);
    
  };
  return drawnTiles;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const letterCount = letterFrequency(lettersInHand);

  for (const letter of input.toUpperCase()) {
    if (letter in letterCount && letterCount[letter] > 0) {
      letterCount[letter] -= 1;
    } else {return false;}
  }

  return true;
};

function letterFrequency(drawnTiles) {
  const letterCount = {};

  for (const letter of drawnTiles) {
    if (letter in letterCount) {
      letterCount[letter] += 1;
    } else {letterCount[letter] = 1;}
  }

  return letterCount;
};

export const scoreWord = (word) => {
  const letterValues = {
    'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1,
    'D': 2, 'G': 2,
    'B': 3, 'C': 3, 'M': 3, 'P': 3,
    'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
    'K': 5,
    'J': 8, 'X': 8,
    'Q': 10, 'Z': 10
  };

  let wordScore = 0;
  for (const letter of word.toUpperCase()) {
    wordScore += letterValues[letter];
  }

  if (word.length >= 7 && word.length <= 10) {
    wordScore += 8;
  }

  return wordScore;
};

export const highestScoreFrom = (words) => {
  let highestScoringWord = {
    word: '',
    score: 0
  };

  for (const word of words) {
    const score = scoreWord(word);

    const isBetterScore = score > highestScoringWord.score;
    const isTie = score === highestScoringWord.score;
    const currentIsTen = word.length === 10;
    const bestIsTen = highestScoringWord.word.length === 10;

    const isTieCurrentBetter =
      (currentIsTen && !bestIsTen) ||
      (!bestIsTen && word.length < highestScoringWord.word.length);

    if (isBetterScore || (isTie && isTieCurrentBetter)) {
      highestScoringWord = { word, score };
    }
  }

  return highestScoringWord;
};
