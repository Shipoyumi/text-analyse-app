import { mount } from "@vue/test-utils";
import WordCounter from "../components/WordCounter.vue";
import { expect, test } from "vitest";

test("WordCounter.vue empty test", async() => {
    expect(WordCounter).toBeTruthy();

    const wrapper = mount(WordCounter, {
        props: {
            userInputTextAttr: "",
        }
    });

    expect (wrapper.vm.localWordCount).toBe(0);
    expect (wrapper.vm.localUniqueWordCount).toBe(0);
    expect (wrapper.vm.localUniqueWords).toEqual("");
})

test("WordCounter.vue space test", async() => {
    expect(WordCounter).toBeTruthy();

    const wrapper = mount(WordCounter, {
        props: {
            userInputTextAttr: " ",
        }
    });

    expect (wrapper.vm.localWordCount).toBe(0);
    expect (wrapper.vm.localUniqueWordCount).toBe(0);
    expect (wrapper.vm.localUniqueWords).toEqual("");
})

test("WordCounter.vue simple test", async() => {
    expect(WordCounter).toBeTruthy();

    const wrapper = mount(WordCounter, {
        props: {
            userInputTextAttr: "Hello World! These two sentences contain 8 words.",
        }
    });

    expect (wrapper.vm.localWordCount).toBe(8);
    expect (wrapper.vm.localUniqueWordCount).toBe(8);
    expect (wrapper.vm.localUniqueWords).toEqual(["hello = 1", "world = 1", "these = 1", "sentences = 1", "contain = 1", "words = 1"]);
})

test("WordCounter.vue big/small letters test", async() => {
    expect(WordCounter).toBeTruthy();

    const wrapper = mount(WordCounter, {
        props: {
            userInputTextAttr: "javascript JAVASCRIPT jAvAsCrIpT javascripT",
        }
    });

    expect (wrapper.vm.localWordCount).toBe(4);
    expect (wrapper.vm.localUniqueWordCount).toBe(1);
    expect (wrapper.vm.localUniqueWords).toEqual(["javascript = 4"]);
})

test("WordCounter.vue special character test", async() => {
    expect(WordCounter).toBeTruthy();

    const wrapper = mount(WordCounter, {
        props: {
            userInputTextAttr: "-Alatreon- Baden-Württemberg? !+  # *-* % & §$ !grauweiß|_<>^^° /() =====   ----- . .. ... , ,, ,,, ~ モンハン äöü Ä Ö Ü",
        }
    });

    // Attention: Standalone & should be considered as a word (and)
    expect (wrapper.vm.localWordCount).toBe(8);
    expect (wrapper.vm.localUniqueWordCount).toBe(8);
    expect (wrapper.vm.localUniqueWords).toEqual(["alatreon = 1", "baden-württemberg = 1", "grauweiß = 1"]);
})

test("WordCounter.vue multiple word order test", async() => {
    expect(WordCounter).toBeTruthy();

    const wrapper = mount(WordCounter, {
        props: {
            userInputTextAttr: "strawberry cherry cherry avocado cherry cherry strawberry strawberry",
        }
    });

    expect (wrapper.vm.localWordCount).toBe(8);
    expect (wrapper.vm.localUniqueWordCount).toBe(3);
    expect (wrapper.vm.localUniqueWords).toEqual(["cherry = 4", "strawberry = 3", "avocado = 1"]);
})

test("WordCounter.vue many words test", async() => {
    expect(WordCounter).toBeTruthy();

    const wrapper = mount(WordCounter, {
        props: {
            userInputTextAttr: "word1 word2 word2 word3 word3 word3 word4 word4 word4 word4 word5 word5 word5 word5 word5 word6 word6 word6 word6 word6 word6 word7 word7 word7 word7 word7 word7 word7 word8 word8 word8 word8 word8 word8 word8 word8 word9 word9 word9 word9 word9 word9 word9 word9 word9 word10 word10 word10 word10 word10 word10 word10 word10 word10 word10 word11 word11 word11 word11 word11 word11 word11 word11 word11 word11 word11 word12 word12 word12 word12 word12 word12 word12 word12 word12 word12 word12 word12 word13 word13 word13 word13 word13 word13 word13 word13 word13 word13 word13 word13 word13 word14 word14 word14 word14 word14 word14 word14 word14 word14 word14 word14 word14 word14 word14 word15 word15 word15 word15 word15 word15 word15 word15 word15 word15 word15 word15 word15 word15 word15 word16 word16 word16 word16 word16 word16 word16 word16 word16 word16 word16 word16 word16 word16 word16 word16 word17 word17 word17 word17 word17 word17 word17 word17 word17 word17 word17 word17 word17 word17 word17 word17 word17 word18 word18 word18 word18 word18 word18 word18 word18 word18 word18 word18 word18 word18 word18 word18 word18 word18 word18 word19 word19 word19 word19 word19 word19 word19 word19 word19 word19 word19 word19 word19 word19 word19 word19 word19 word19 word19 word20 word20 word20 word20 word20 word20 word20 word20 word20 word20 word20 word20 word20 word20 word20 word20 word20 word20 word20 word20 word0",
        }
    });

    expect (wrapper.vm.localWordCount).toBe(211);
    expect (wrapper.vm.localUniqueWordCount).toBe(21);
    expect (wrapper.vm.localUniqueWords).toEqual(["word20 = 20", "word19 = 19", "word18 = 18", "word17 = 17", "word16 = 16", "word15 = 15", "word14 = 14", "word13 = 13", "word12 = 12", "word11 = 11", "word10 = 10", "word9 = 9", "word8 = 8", "word7 = 7", "word6 = 6", "word5 = 5", "word4 = 4", "word3 = 3", "word2 = 2", "word1 = 1"]);
})