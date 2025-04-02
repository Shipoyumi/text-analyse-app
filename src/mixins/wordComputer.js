export const wordComputerMixin = {
    methods: {

        // Separates all valid words by one comma and returns the string
        separateWordsByOneComma(text) {

            // RegExp of all non alphanumerical chars [Specifically includes german usecases]
            // Without Dashes (-): ------------------------------------------------------------------
            //const changeNonAlphaNumSeparatorsToOneComma = /[^0-9a-zA-Zß&äöüÄÖÜ]+/g;
            // With words that contain dashes (e.g. Baden-Württemberg) ------------------------------
            const changeNonAlphaNumSeparatorsToOneComma = /[^0-9a-zA-Zß&äöüÄÖÜ]+[^0-9a-zA-Zß&äöüÄÖÜ]+|-*[^0-9a-zA-Zß&äöüÄÖÜ-]+-*|^-|-$/g;
                                                      // ^-> First: Replace all parts with 2+ dashes/non alphanumerical chars
                                                      // | replace all dashes before and after words and all non alphanumerical chars (except for dashes)
                                                      // | replace standalone dashes at the text beginning
                                                      // | replace standalone dashes at the text end

            // Change all non alphanumerical char sets to one comma
            let oneCommaSeparatorText = text.replaceAll(changeNonAlphaNumSeparatorsToOneComma, ",");

            // If the text starts with a non alphanumerical char, delete it
            if (oneCommaSeparatorText.charAt(0) == ",") {oneCommaSeparatorText = oneCommaSeparatorText.substring(1);}

            // If the text ends with a non alphanumerical char, delete it
            if (oneCommaSeparatorText.charAt(oneCommaSeparatorText.length-1) == ",") {oneCommaSeparatorText = oneCommaSeparatorText.substring(0, oneCommaSeparatorText.length-1);}

            return oneCommaSeparatorText;

        },
        
        // Returns an array, which contains all valid words in a text
        getWordsArray(text) {

            // Check if the user input text is empty
            if (text == "") {return [];}

            // Separate the text to word,word...
            const oneCommaSeparatorText = this.separateWordsByOneComma(text);

            // Check if the user input text is just non alphanumerical chars, e.g. "?!#+"
            if (oneCommaSeparatorText == "") {return 0;}

            // Split the strings at , into array elements (in lowercase)
            return oneCommaSeparatorText.split(",").map(w => w.toLowerCase());

        },

        // Returns the number of words in a text
        countWords(text) {

            // Get the length of the word array
            const textLength = this.getWordsArray(text).length;

            if (textLength == 0 || textLength == null || textLength == undefined) {
                return 0;
            } else {
                return textLength;
            }

        },

        // Returns the number of unique words in a text
        uniqueWords(text) {

            // Get the length of the word array
            const textLength = this.getWordsArray(text).length;

            if (textLength == 0 || textLength == null || textLength == undefined) {
                return 0;
            } else {
                // Spread and compute a Set [only unique words] and return the length
                return [...new Set(this.getWordsArray(text))].length;
            }

        },

        // Return the sorted top 20 word+occurrence pairs
        sortArrayOccurrence(occurrencesObject) {

            const top20WordsAndOccurrence = []; // Max. of 20 entries!
            let lowestOccurrence = 0;
            let arrayIDLowestOccurrence = 0;

            // Loop over all unique pairs
            for (const pair of Object.entries(occurrencesObject)) {

                // If we have 20 elements inside the array, check the lowest occurrence.
                // if the pair's(/words) occurrence is higher than the lowest inside the array, change/update it
                if (top20WordsAndOccurrence.length >= 20) {
                    lowestOccurrence = top20WordsAndOccurrence[0][1] + 1;
                    for (let i=0; i < top20WordsAndOccurrence.length; i++) {
                        if (top20WordsAndOccurrence[i][1] < lowestOccurrence) {
                            arrayIDLowestOccurrence = i;
                            lowestOccurrence = top20WordsAndOccurrence[i][1];
                        }
                    }
                    if (pair[1] > lowestOccurrence) {
                        top20WordsAndOccurrence[arrayIDLowestOccurrence] = pair;
                    }
                // else push the pair into the array
                } else {
                    top20WordsAndOccurrence.push(pair);
                }

            }

            // Return the sorted Array of word-occ pairs [sorted by occurrence]
            return top20WordsAndOccurrence.sort(([, occA], [, occB]) => occB - occA);

        },

        // Returns an array of strings, which contains the print-ready words+occurrence.
        // E.g. "myword = 9"
        printArrayOfPairs(arrayOfPairs) {

            const printStringArray = [];

            for (let i=0; i < arrayOfPairs.length; i++) {

                printStringArray.push(arrayOfPairs[i][0] + " = " + arrayOfPairs[i][1]);

            }

            return printStringArray;

        },

        // Computes and returns the sorted top 20 occurred words as an array of print-ready strings
        mostOccurredWords(text) {

            // Get the valid words as an array
            let splittedWordsArray = this.getWordsArray(text);

            // If empty, return 0
            if (splittedWordsArray.length == 0 || splittedWordsArray.length == null || splittedWordsArray.length == undefined) {return '';}

            // Filter out all words with 4 or less chars
            let splittedWordsArrayWithFourPlusChars = splittedWordsArray.filter(a => a.length > 4);

            // Count the unique words
            const occurrences = {};
            for (const word of splittedWordsArrayWithFourPlusChars) {
                occurrences[word] = (occurrences[word] || 0) + 1;
            }

            // Compute the sorted pairs as an array
            const sortedTop20ArrayPairs = this.sortArrayOccurrence(occurrences);

            return this.printArrayOfPairs(sortedTop20ArrayPairs);

        }

    }
}