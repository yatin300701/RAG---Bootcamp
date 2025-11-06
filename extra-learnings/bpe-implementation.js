/*
    Byte Pair Encoding Algorithem

    - find unique set of word in corpus 
    - build vocablury using the symbols used in words
    - stop when vocablury size is of desired len


    Steps: 
     1. Find Unique set of words after normalization and pretoken
     2. split each word to charaters
     3. find pair which has occured the most
     4. add that pair in vocab and merge it in all words 
     5. repeat till len (required len of vocab )
*/

const corpus = [
  "This is the Hugging Face Course.",
  "This chapter is about tokenization.",
  "This section shows several tokenizer algorithms.",
  "Hopefully, you will be able to understand how they are trained and generate tokens.",
];

let vocab = [];
let splitedWordArry = [];

function findUniqueWords(corpus) {
  let wordSet = new Set();
  corpus.forEach((sen) => {
    sen.split(" ").forEach((e, i) => {
      if (i > 0) e = "*" + e;
      wordSet.add(e);
    });
  });
  return Array.from(wordSet);
}

const uniqueWords = findUniqueWords(corpus);

function initialiseVocab(words) {
  let vocabSet = new Set();
  words.forEach((w) => {
    const charaters = w.split("");
    splitedWordArry.push([...charaters]);
    charaters.forEach((ch) => vocabSet.add(ch));
  });

  vocab.push(...Array.from(vocabSet));
}
initialiseVocab(uniqueWords);

function findMaxPairCount() {
  const pairCount = new Map();
  let maxPair = undefined;
  splitedWordArry.forEach((word) => {
    word.forEach((ch, i) => {
      if (i > 0) {
        const pair = word[i - 1] + word[i];
        pairCount.set(pair, (pairCount.get(pair) ?? 0) + 1);
        if (maxPair == undefined || pairCount.get(pair) > maxPair[1]) {
          maxPair = [pair, pairCount.get(pair)];
        }
      }
    });
  });
  return maxPair[0];
}

function pairMaxPairInSplitedWordArry(maxPair) {
  splitedWordArry = splitedWordArry.map((word) => {
    let newWord = [],
      index = 0;
    while (index < word.length) {
      if (index < word.length - 1) {
        const pair = word[index] + word[index + 1];
        if (pair == maxPair) {
          newWord.push(pair);
          index += 2;
        } else {
          newWord.push(word[index]);
          index++;
        }
      } else {
        newWord.push(word[index]);
        index++;
      }
    }

    return newWord;
  });
  vocab.push(maxPair);
}

function fillVocab(limit) {
  while (vocab.length < limit) {
    const pair = findMaxPairCount();
    pairMaxPairInSplitedWordArry(pair);
  }
}

console.log("Initial Vocab ", vocab, vocab.length);
fillVocab(35);

console.log("Final Vocab", vocab, vocab.length);
