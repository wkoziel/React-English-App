export function shuffle(sourceArray) {
   for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));

      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
   }
   return sourceArray;
}

export const prepareLearnData = (data, typePolish) =>
   typePolish
      ? data.map((word, index) => ({
           id: index,
           display: word.english,
           type: word.polish,
           correct: 0,
           learned: false,
           old_id: word.word_id,
        }))
      : data.map((word, index) => ({
           id: index,
           display: word.polish,
           type: word.english,
           correct: 0,
           learned: false,
           old_id: word.word_id,
        }));
