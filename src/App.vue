<script setup>

    import WordCounter from './components/WordCounter.vue';

    const userInputTextAttr = defineModel('userInputTextAttr');

</script>

<template>

    <header>

        <div class="flex-wrapper">
            <div class="headerText">
                Textanalyse App
            </div>
            <div class="headerInfo">
                by Yuminda | v1.0 | 30.03.2025
            </div>
        </div>

    </header>

    <main>

        <div class="flex-wrapper">

            <div class="textInputDiv">
                <textarea v-model="userInputTextAttr" type="search" id="userInputText" name="user-input-text" placeholder="Bitte hier den zu analysierenden Text einfügen..."></textarea>
            </div>

            <WordCounter :user-input-text-attr="userInputTextAttr" />

        </div>

    </main>

</template>

<style scoped>

    body{
        background-color: var(--darkgrey);
        color: var(--lightgrey);
    }

    .headerText{
        font-size: 2.4rem;
        color: var(--lightorange);
    }

    .headerInfo{
        font-size: 1.2rem;
        color: var(--lightgrey);
    }

    .flex-wrapper{
        display: flex;
        flex-direction: column;
        width: 90vw;
        height: auto;
        place-items: center;
        margin: auto;
    }

    .textInputDiv textarea{
        font-size: 1rem;
        text-align: justify;
        vertical-align: top;
        width: 90vw;
        min-height: 400px;
        resize: vertical;
        overflow: auto;
        outline: none;
        border-radius: 10px;
        border: 2px solid var(--lightgrey);
        box-sizing: border-box;
        background-color: var(--darkgrey);
        color: var(--lightgrey);
        margin: 20px;
        padding: 5px;
    }

</style>
