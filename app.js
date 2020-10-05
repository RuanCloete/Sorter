/* 
Sources:
https://www.youtube.com/watch?v=67k3I2GxTH8&t
https://www.youtube.com/watch?v=eqo2LxRADhU&t

SPECIAL THANKS: 
Clément Mihailescu for inspiring me^1 to make AlgoSorter, and his guided implementation of the merge sort algorhytm^2 that helped immensely with the 
implementation of the quick -and bubble sort.      

1: https://www.youtube.com/watch?v=n4t_-NjY_Sg&t
2: https://www.youtube.com/watch?v=pFXYym4Wbkc
*/

const arrayLength = 120;
var flagResetButton = true;
var flagIsReset = true;
const individualColumn = document.getElementsByClassName('individualColumn');

window.onload = () => {
    randomArray();
    addEvents('addEvents');
}

// https://stackoverflow.com/questions/363681/how-do-i-generate-random-integers-within-a-specific-range-in-java
function randomIntGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}   

function randomArray() {
    window.array = [];
    for (var x = 0; x < arrayLength; x++) {
        let columnInt = randomIntGenerator(2, 100);
        array.push(columnInt);
        document.getElementById('columns').insertAdjacentHTML('beforeend', '<div class= "individualColumn" style="height:' + columnInt + '%"></div>');
    }
    changeColors('#DCDCDC');
    return;
}

function resetArray() {
    if(flagResetButton == true) {
        document.getElementById('columns').remove();
        document.getElementById('wrapper').insertAdjacentHTML('beforeend', '<div id="columns"></div>');
        randomArray();
        changeColors('rgb(220, 220, 220)', 'black', 'rgb(220, 220, 220)', 'black');
        flagIsReset = true;
    }
}

function sortMethod(method) {
    if (mergeSort.flag == false || quickSort.flag == false || bubbleSort.flag == false || flagIsReset == false) return;
    if (method == 'quick') {
        start();
        quickSort.quickSortAnimation(0, array.length - 1);
    } else if (method == 'bubble') {
        start();
        bubbleSort.bubbleSortAnimation();
    } else if (method == 'merge') {
        start();
        mergeSort.mergeSortAnimation();
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
    switch(action) {
        case 'addEvents':
            resetButton.addEventListener('click', resetFunction);
            quickButton.addEventListener('click', sortMethodQuick);
            bubbleButton.addEventListener('click', sortMethodBubble);
            mergeButton.addEventListener('click', sortMethodMerge);
            break;
        case 'removeEvents':
            resetButton.removeEventListener('click', resetFunction);
            quickButton.removeEventListener('click', sortMethodQuick);
            bubbleButton.removeEventListener('click', sortMethodBubble);
            mergeButton.removeEventListener('click', sortMethodMerge);
            break;
        default:
            console.log("error, event listeners unaffected")
    }
}

// function changes button colors, UX purposes.
function changeColors(color, textColor, goColor, goTextColor) {
    resetButton.style.backgroundColor = goColor;
    quickButton.style.backgroundColor = color;
    bubbleButton.style.backgroundColor = color;
    mergeButton.style.backgroundColor = color;

    resetButton.style.color = goTextColor;
    quickButton.style.color = textColor;
    bubbleButton.style.color = textColor;
    mergeButton.style.color = textColor;
}

// function swaps values in an array, used in BubbleSort and QuickSort respectively
function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function start() {
    flagIsReset = false;
    addEvents('removeEvents');
    changeColors('#890023', 'white', '#890023', 'white');
}

function finish() {
    flagResetButton = true;
    changeColors('#890023', 'white', 'rgb(220, 220, 220)', 'black');
    console.log("finished");
}

/*
-----------------------
Merge Sort Functionality
-----------------------
*/

var mergeSort = {

    flag: true,

    // Initializes merge sort
    mergeSortInit(array) {
        const animations = [];
        if (array.length <= 1) return array;
        const dynamicArray = array.slice();
        this.mergeSortMain(array, 0, array.length - 1, dynamicArray, animations);
        return animations;
    },

    // Function handles recursion and data by adding values to animations array.
    mergeSortMain(arrayMain, firstIdx, lastIdx, dynamicArray, animations) {
        if (firstIdx === lastIdx) return;
        const halfIdx = Math.floor((firstIdx + lastIdx) / 2);
        this.mergeSortMain(dynamicArray, firstIdx, halfIdx, arrayMain, animations);
        this.mergeSortMain(dynamicArray, halfIdx + 1, lastIdx, arrayMain, animations);
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
    },

    // function handles visialization
    mergeSortAnimation() {
        this.flag = false;
        flagResetButton = false;
        const animations = this.mergeSortInit(array)
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
                }, i * 6);
            } else {
                const [indOneIdx, heightNew] = animations[i];
                const indOneStyle = individualColumn[indOneIdx].style;
                setTimeout(() => {
                    indOneStyle.height = `${heightNew}%`;
                }, i * 6);
            }
        }
        setTimeout(() => {
            this.flag = true;
            finish();
        }, animations.length * 6);
    }

}

/*
-----------------------
Quick Sort Functionality
-----------------------
*/
var quickSort = {

    flag: true,

    quickSortInit(first, last) {
        const animations = [];
        this.quickSortMain(first, last, animations);
        return animations
    },

    // function sorting divs utilizing the popular quick sort algorhitm. first, last- arguments for recursion purposes.
    quickSortMain(first, last, animations) {
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
        this.swapPivot(bubbleIndex, first, last, animations);
    },

    swapPivot(bubbleIndex, first, last, animations) {
        animations.push([bubbleIndex, bubbleIndex, "pivot"]);
        animations.push([bubbleIndex, bubbleIndex, "pivot"]);
        swap(array, bubbleIndex, last);
        animations.push([last, bubbleIndex, "pivot"]);
        Promise.all[
            this.quickSortMain(bubbleIndex + 1, last, animations),
            this.quickSortMain(first, bubbleIndex - 1, animations)
        ]
    },

    quickSortAnimation(first, last) {
        this.flag = false;
        flagResetButton = false;
        const animations = this.quickSortInit(first, last);
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
                    }, i * 6)
                } else {
                    const color = i % 3 === 0 ? '#890023' : 'white';
                    setTimeout(() => {
                        indOneStyle.backgroundColor = color;
                        indTwoStyle.backgroundColor = color;
                    }, i * 6);
                }
            } else {
                const [indOneIdx, indTwoIdx] = animations[i];
                const indOneStyle = individualColumn[indOneIdx].style;
                const indTwoStyle = individualColumn[indTwoIdx].style;
                setTimeout(() => {
                    const indOneInheritedStyle = indOneStyle.height;
                    indOneStyle.height = indTwoStyle.height;
                    indTwoStyle.height = indOneInheritedStyle;
                }, i * 6);
            }
        }
        setTimeout(() => {
            this.flag = true;
            finish();
        }, animations.length * 6);
    }

}
/*
-----------------------
Bubble Sort Functionality
-----------------------
*/
var bubbleSort = {

    flag : true,

    bubbleSortInit() {
        const animations = []
        var bubbleSortRecursiveIndex = 0;
        this.bubbleSortMain(animations, bubbleSortRecursiveIndex)
        return animations;
    },

    bubbleSortMain(animations, bubbleSortRecursiveIndex) {
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
        this.bubbleSortMain(animations, bubbleSortRecursiveIndex);
    },

    bubbleSortAnimation() {
        this.flag = false;
        flagResetButton = false;
        const animations = this.bubbleSortInit(array);
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
                }, i * 2);
            } else {
                const [indOneIdx, indTwoIdx] = animations[i];
                const indOneStyle = individualColumn[indOneIdx].style;
                const indTwoStyle = individualColumn[indTwoIdx].style;
                setTimeout(() => {
                    const indOneInheritedStyle = indOneStyle.height;
                    indOneStyle.height = indTwoStyle.height;
                    indTwoStyle.height = indOneInheritedStyle;
                }, i * 2);
            }
        }
        setTimeout(() => {
            this.flag = true;
            finish();
        }, animations.length * 2);
    }

}