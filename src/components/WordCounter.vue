<script>

    //import { ref } from 'vue';
    import { wordComputerMixin } from '../mixins/wordComputer.js';

    export default {
        mixins: [wordComputerMixin],
        props: {
            // The attribute for the user input text
            userInputTextAttr: {
                type: String,
                default: ''
            }
        },
        computed: {
            // Number of words
            localWordCount() {
                return this.countWords(this.userInputTextAttr);
            },
            // Number of unique words
            localUniqueWordCount() {
                return this.uniqueWords(this.userInputTextAttr);
            },
            // Array of word+occurrence pairs [[word, occurrence], ...]
            localUniqueWords() {
                return this.mostOccurredWords(this.userInputTextAttr);
            }
        }
    }



</script>

<template>
    
    <div class="textOutputDiv centered">

        <div>
            Dieser Text enthält <span class="textHighlighted">{{ localWordCount }}</span> Wörter.
        </div>

        <div>
            Dieser Text enthält <span class="textHighlighted">{{ localUniqueWordCount }}</span> eindeutige Wörter.
        </div>

        <div class="centered">
            Dieser Text enthält diese 20 häufigsten Wörter mit mehr als vier Zeichen:
            <br>
            <p v-for="(string, index) in localUniqueWords" :key="index">
                {{ string }}
            </p>
        </div>

    </div>

</template>

<style lang="css" scoped>

    .textOutputDiv {
        color: var(--lightgrey);
        font-size: 1.4rem;
    }

    .centered {
        place-items: center;
    }

    .textHighlighted {
        color: var(--lightorange);
    }

</style>