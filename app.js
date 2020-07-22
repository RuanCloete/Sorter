/* 
Sources:
https://www.youtube.com/watch?v=67k3I2GxTH8&t
https://www.youtube.com/watch?v=eqo2LxRADhU&t
https://www.youtube.com/watch?v=TzerDU-JaY

SPECIAL THANKS: 
Clément Mihailescu for inspiring me^1 to make AlgoSorter, and his guided implementation of the merge sort algorhytm^2 that helped immensely with the 
implementation of the quick -and bubble sort.      

1: https://www.youtube.com/watch?v=n4t_-NjY_Sg&t
2: https://www.youtube.com/watch?v=pFXYym4Wbkc
*/

const arrayLength = 140;
var flagResetButton = 1;
const individualColumn = document.getElementsByClassName('individualColumn');

window.onload = () => {
    randomArray();
    addEvents('addEvents');
    setFlags('activate');
}

// https://stackoverflow.com/questions/363681/how-do-i-generate-random-integers-within-a-specific-range-in-java
function randomIntGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}   

function randomArray() {
    window.array = [];
    for (var x = 0; x < arrayLength; x++) {
        let columnInt = randomIntGenerator(3, 600);
        array.push(columnInt);
        document.getElementById('columns').insertAdjacentHTML('beforeend', '<div class= "individualColumn" style="height:' + columnInt + 'px"></div>');
    }
    setFlags('activate');
    changeColors('#DCDCDC');
    return;
}

function resetArray() {
    if(flagResetButton == 1) {
        document.getElementById('columns').remove();
        document.getElementById('wrapper').insertAdjacentHTML('beforeend', '<div id="columns"></div>');
        randomArray();
    }
}

function sortMethod(method) {
    if (method == 'quick' && flagSortQuick == 1) {
        addEvents('removeEvents');
        changeColors('#890023');
        flagResetButton = 0;
        setFlags('deactivate');
        quickSortAnimation(0, array.length - 1);
    } else if (method == 'bubble' && flagSortBubble == 1) {
        addEvents('removeEvents');
        changeColors('#890023');
        flagResetButton = 0;
        bubbleSortAnimation();
        setFlags('deactivate');
    } else if (method == 'merge' && flagSortMerge == 1) {
        addEvents('removeEvents');
        changeColors('#890023');
        flagResetButton = 0;
        mergeSortAnimation();
        setFlags('deactivate');
    }
}

const resetButton = document.getElementById('reset');
const quickButton = document.getElementById('quick');
const bubbleButton = document.getElementById('bubble');
const mergeButton = document.getElementById('merge');

// function adds eventListeners. FUnction also prevents multiple eventListeners on the same sorting Method.
function addEvents(action) {
    let resetFunction = () => resetArray();
    let sortMethodQuick = () =>  sortMethod('quick');
    let sortMethodBubble = () =>  sortMethod('bubble');
    let sortMethodMerge = () =>  sortMethod('merge');
    if(action == 'addEvents') {
        resetButton.addEventListener('click', resetFunction);
        quickButton.addEventListener('click', sortMethodQuick);
        bubbleButton.addEventListener('click', sortMethodBubble);
        mergeButton.addEventListener('click', sortMethodMerge);
    } else if(action == 'removeEvents'){
        resetButton.removeEventListener('click', resetFunction);
        quickButton.removeEventListener('click', sortMethodQuick);
        bubbleButton.removeEventListener('click', sortMethodBubble);
        mergeButton.removeEventListener('click', sortMethodMerge);
    }
}

function setFlags(action) {
    if(action == 'activate') {
        window.flagSortQuick = 1;
        window.flagSortBubble = 1;
        window.flagSortMerge = 1;
    } else if(action == 'deactivate') {
        window.flagSortQuick = 0;
        window.flagSortBubble = 0;
        window.flagSortMerge = 0;
    }
}

// function changes button colors, UX purposes.
function changeColors(color) {
    resetButton.style.backgroundColor = color;
    quickButton.style.backgroundColor = color;
    bubbleButton.style.backgroundColor = color;
    mergeButton.style.backgroundColor = color;
}

// function swaps values in an array, used in BubbleSort and QuickSort respectively
function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

// function verifies if divs are sorted and resets button functionality
function sortVerification() {
    for(let arrayIndex = 1; arrayIndex < array.length; arrayIndex++) {
        let arrayIndex1 = individualColumn[arrayIndex -1].style.height;
        let arrayIndexString1 = arrayIndex1.slice(0, -2);
        let arrayIndexInteger1 = parseInt(arrayIndexString1);
        let arrayIndex2 = individualColumn[arrayIndex].style.height;
        let arrayIndexString2 = arrayIndex2.slice(0, -2);
        let arrayIndexInteger2 = parseInt(arrayIndexString2);
        if(arrayIndexInteger1 > arrayIndexInteger2) {
            return;
        } else if (arrayIndex == array.length - 1 && arrayIndexInteger1 <= arrayIndexInteger2) {
            resetButton.addEventListener('click', resetArray);
            resetButton.style.backgroundColor = '#DCDCDC';
            resetButton.style.color = 'black'
            flagResetButton = 1;
            return;
        }
    }
}

/*
-----------------------
Merge Sort Functionality
-----------------------
*/

// Initializes merge sort
function mergeSortInit(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const dynamicArray = array.slice();
    mergeSortMain(array, 0, array.length - 1, dynamicArray, animations);
    return animations;
}

// Function handles recursion and data by adding values to animations array.
function mergeSortMain(arrayMain, firstIdx, lastIdx, dynamicArray, animations) {
    if (firstIdx === lastIdx) return;
    const halfIdx = Math.floor((firstIdx + lastIdx) / 2);
    mergeSortMain(dynamicArray, firstIdx, halfIdx, arrayMain, animations);
    mergeSortMain(dynamicArray, halfIdx + 1, lastIdx, arrayMain, animations);
    let x = firstIdx;
    let y = firstIdx;
    let z = halfIdx + 1;
    while (y <= halfIdx && z <= lastIdx) {
        animations.push([y, z]);
        animations.push([y, z]);
        if (dynamicArray[y] <= dynamicArray[z]) {
            animations.push([x, dynamicArray[y]]);
            arrayMain[x++] = dynamicArray[y++];
        } else {
            animations.push([x, dynamicArray[z]]);
            arrayMain[x++] = dynamicArray[z++];
        }
    }
    while (y <= halfIdx) {
        animations.push([y, y]);
        animations.push([y, y]);
        animations.push([x, dynamicArray[y]]);
        arrayMain[x++] = dynamicArray[y++];
    }
    while (z <= lastIdx) {
        animations.push([z, z]);
        animations.push([z, z]);
        animations.push([x, dynamicArray[z]]);
        arrayMain[x++] = dynamicArray[z++];
    }
}

// function handles visialization
function mergeSortAnimation() {
    const animations = mergeSortInit(array)
    for (let i = 0; i < animations.length; i++) {
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const [indOneIdx, indTwoIdx] = animations[i];
            const indOneStyle = individualColumn[indOneIdx].style;
            const indTwoStyle = individualColumn[indTwoIdx].style;
            const color = i % 3 === 0 ? '#228CDB' : 'white';
            setTimeout(() => {
                indOneStyle.backgroundColor = color;
                indTwoStyle.backgroundColor = color;
            }, i * 5);
        } else {
            const [indOneIdx, heightNew] = animations[i];
            const indOneStyle = individualColumn[indOneIdx].style;
            setTimeout(() => {
                indOneStyle.height = `${heightNew}px`;
                sortVerification();
            }, i * 5);
        }
    }
}

/*
-----------------------
Quick Sort Functionality
-----------------------
*/

function quickSortInit(first, last) {
    const animations = [];
    quickSortMain(first, last, animations);
    return animations
}

// function sorting divs utilizing the popular quick sort algorhitm. first, last- arguments for recursion purposes.
function quickSortMain(first, last, animations) {
    if (first >= last) return;
    let bubbleIndex = first;
    let pivotValue = array[last];
    for (let i = first; i < last; i++) {
        if (array[i] < pivotValue) {
            animations.push([i, i])
            animations.push([i, i])
            swap(array, i, bubbleIndex); 
            animations.push([bubbleIndex++, i])
        }
    }
    swapPivot(bubbleIndex, first, last, animations);
}

function swapPivot(bubbleIndex, first, last, animations) {
    animations.push([bubbleIndex, bubbleIndex, "pivot"]);
    animations.push([bubbleIndex, bubbleIndex, "pivot"]);
    swap(array, bubbleIndex, last);
    animations.push([last, bubbleIndex, "pivot"]);
    Promise.all[
        quickSortMain(bubbleIndex + 1, last, animations),
        quickSortMain(first, bubbleIndex - 1, animations)
    ]
}

function quickSortAnimation(first, last) {
    const animations = quickSortInit(first, last);
    for (let i = 0; i < animations.length; i++) {
        const isColorChange = i % 3 !== 2;
        if(isColorChange) {
            const [indOneIdx, indTwoIdx] = animations[i];
            const indOneStyle = individualColumn[indOneIdx].style;
            const indTwoStyle = individualColumn[indTwoIdx].style;
            const animationValues = animations[i].slice(2, 3);
            const isPivot = animationValues[0] === "pivot";
            if(isPivot) {
                const color = i % 3 === 0 ? '#228CDB' : 'white';
                setTimeout(() => {
                    indOneStyle.backgroundColor = color;
                    indTwoStyle.backgroundColor = color;
                }, i * 5)
            } else {
                const color = i % 3 === 0 ? '#890023' : 'white';
                setTimeout(() => {
                    indOneStyle.backgroundColor = color;
                    indTwoStyle.backgroundColor = color;
                }, i * 5);
            }
        } else {
            const [indOneIdx, indTwoIdx] = animations[i];
            const indOneStyle = individualColumn[indOneIdx].style;
            const indTwoStyle = individualColumn[indTwoIdx].style;
            setTimeout(() => {
                const indOneInheritedStyle = indOneStyle.height;
                indOneStyle.height = indTwoStyle.height;
                indTwoStyle.height = indOneInheritedStyle;
                sortVerification();
            }, i * 5);
        }
    }
}

/*
-----------------------
Bubble Sort Functionality
-----------------------
*/

function bubbleSortInit() {
    const animations = []
    var bubbleSortRecursiveIndex = 0;
    bubbleSortMain(animations, bubbleSortRecursiveIndex)
    return animations;
}

function bubbleSortMain(animations, bubbleSortRecursiveIndex) {
    if (bubbleSortRecursiveIndex >= arrayLength) return;
    for (bubbleSortIndex = 0; bubbleSortIndex < array.length - bubbleSortRecursiveIndex - 1; bubbleSortIndex++) {
        a = bubbleSortIndex;
        b = bubbleSortIndex + 1;
        if (array[a] > array[b]) {
            animations.push([a, b]);
            animations.push([a, b]);
            swap(array, a, b);
            animations.push([b, a]);
        }
    }
    bubbleSortRecursiveIndex++;
    bubbleSortMain(animations, bubbleSortRecursiveIndex);
}

function bubbleSortAnimation() {
    const animations = bubbleSortInit(array)
    for (let i = 0; i < animations.length; i++) {
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const [indOneIdx, indTwoIdx] = animations[i];
            const indOneStyle = individualColumn[indOneIdx].style;
            const indTwoStyle = individualColumn[indTwoIdx].style;
            const color = i % 3 === 0 ? '#890023' : 'white';
            setTimeout(() => {
                indOneStyle.backgroundColor = color;
                indTwoStyle.backgroundColor = color;
            }, i * 2.5);
        } else {
            const [indOneIdx, indTwoIdx] = animations[i];
            const indOneStyle = individualColumn[indOneIdx].style;
            const indTwoStyle = individualColumn[indTwoIdx].style;
            setTimeout(() => {
                const indOneInheritedStyle = indOneStyle.height;
                indOneStyle.height = indTwoStyle.height;
                indTwoStyle.height = indOneInheritedStyle;
                sortVerification();
            }, i * 2.5);
        }
    }
}