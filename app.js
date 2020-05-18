var arrayLength = 140;
var flagResetButton = 1;
const individualColumn = document.getElementsByClassName('individualColumn');

// loads array and column divs.
window.onload = () => {
    randomArray();
    addEvents('add');
    setFlags('activate');
}

function randomIntGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArray() {
    window.flagSortMerge = 1;
    window.flagSortBubble = 1;
    window.s = 0;
    window.t = 0;
    window.array = [];
    for (var x = 0; x < arrayLength; x++) {
        let columnInt = randomIntGenerator(3, 750);
        array.push(columnInt);
        document.getElementById('columns').insertAdjacentHTML('beforeend', '<div class= "individualColumn" style="height:' + columnInt + 'px"></div>');
    }
    setFlags('activate');
    changeColors('whitesmoke', '#424B54');
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
        addEvents('remove');
        changeColors('#890023', 'whitesmoke');
        flagResetButton = 0;
        quickSort(0, array.length - 1);
        setFlags('deactivate');
    } else if (method == 'bubble' && flagSortBubble == 1) {
        addEvents('remove');
        changeColors('#890023', 'whitesmoke');
        flagResetButton = 0;
        bubbleSort();
        setFlags('deactivate');
    } else if (method == 'merge' && flagSortMerge == 1) {
        addEvents('remove');
        changeColors('#890023', 'whitesmoke');
        flagResetButton = 0;
        mergeSortAction();
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
    if(action == 'add') {
        resetButton.addEventListener('click', resetFunction);
        quickButton.addEventListener('click', sortMethodQuick);
        bubbleButton.addEventListener('click', sortMethodBubble);
        mergeButton.addEventListener('click', sortMethodMerge);
    } else if(action == 'remove'){
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
        window.falgSortMerge = 1;
    } else if(action == 'deactivate') {
        window.flagSortQuick = 0;
        window.flagSortBubble = 0;
        window.flagSortMerge = 0;
    }
}

// function changes button colors, UX purposes.
function changeColors(color1, color2) {
    resetButton.style.backgroundColor = color1;
    quickButton.style.backgroundColor = color1;
    bubbleButton.style.backgroundColor = color1;
    mergeButton.style.backgroundColor = color1;
    resetButton.style.color = color2;
    quickButton.style.color = color2;
    bubbleButton.style.color = color2;
    mergeButton.style.color = color2;
}

// function sorting divs utilizing the popular quick sort algorhitm. arguments for recursion purposes.
function quickSort(first, last) {
    if (first >= last) {
        return;
    }
    let animations1Index = 0;
    let animations1 = [];
    let flagSwap = 0;
    let pivotIndex = first;
    let pivotValue = array[last];
    for (let i = first; i < last; i++) {
        if (array[i] < pivotValue) {
            flagSwap++; // flag used in if statement to make the relationship between doSetTimeout -and swapIndex function synchronous as setTimeout runs asynchronously.
            doSetTimeout(i);
            function doSetTimeout(i) {
                setTimeout(() => {
                    const individualColumnHeight1 = individualColumn[i].style.height;
                    const individualColumnHeight2 = individualColumn[pivotIndex].style.height;
                    animations1.push([i, pivotIndex, individualColumnHeight1, individualColumnHeight2]);
                    let [indOneIdx, indTwoIdx, heightNew1, heightNew2] = animations1[animations1Index];
                    let indOneStyle = individualColumn[indOneIdx].style;
                    let indTwoStyle = individualColumn[indTwoIdx].style;
                    let indThreeStyle = individualColumn[last].style
                    indOneStyle.backgroundColor = '#890023';
                    indTwoStyle.backgroundColor = '#890023';
                    indThreeStyle.backgroundColor = '#228CDB';
                    setTimeout(() => {
                        indOneStyle.backgroundColor = 'whitesmoke';
                        indTwoStyle.backgroundColor = 'whitesmoke';
                    }, 10);
                    indOneStyle.height = heightNew2;
                    indTwoStyle.height = heightNew1;
                    swap(array, i, pivotIndex);
                    pivotIndex++;
                    animations1Index++; // animations1Index variable used in conjunction with flagSwap variable.
                    if (flagSwap == animations1Index) {
                        swapIndex();
                        indThreeStyle.backgroundColor = 'whitesmoke';
                    }
                }, flagSwap * 30);
            }
        }
    }
    if (flagSwap == 0) {
        swapIndex();
    }
    function swapIndex() {
        const individualColumnHeight1 = individualColumn[pivotIndex].style.height;
        const individualColumnHeight2 = individualColumn[last].style.height;
        let animations2 = [pivotIndex, last, individualColumnHeight1, individualColumnHeight2];
        let [indOneIdx, indTwoIdx, heightNew1, heightNew2] = animations2;
        let indOneStyle = individualColumn[indOneIdx].style;
        let indTwoStyle = individualColumn[indTwoIdx].style;
        indOneStyle.height = heightNew2;
        indTwoStyle.height = heightNew1;
        swap(array, pivotIndex, last);
        flagVerification();
        // Promise.all used to make rucursion asynchronous
        Promise.all([
            quickSort(pivotIndex + 1, last),
            quickSort(first, pivotIndex - 1)
        ]);
    }
    return;
}

function bubbleSort() {
    if (t < arrayLength) {
        let animations = [];
        for (s = 0; s < array.length - t - 1; s++) {
            doSetTimeout(s);
            function doSetTimeout(s) {
                setTimeout(() => {
                    const individualColumnHeight1 = individualColumn[s].style.height;
                    const individualColumnHeight2 = individualColumn[s + 1].style.height;
                    animations.push([s, s + 1, individualColumnHeight1, individualColumnHeight2]);
                    let [indOneIdx, indTwoIdx, heightNew1, heightNew2] = animations[s];
                    let indOneStyle = individualColumn[indOneIdx].style;
                    let indTwoStyle = individualColumn[indTwoIdx].style;
                    a = s;
                    b = s + 1;
                    if (array[a] > array[b]) {
                        animations[s].push('compared');
                        compared1 = animations[s].splice(-1, 1);
                        compared1Str = compared1[0];
                        if (compared1Str === 'compared') {
                            indOneStyle.backgroundColor = '#228CDB';
                            indTwoStyle.backgroundColor = '#228CDB';
                            setTimeout(() => {
                                indOneStyle.backgroundColor = 'whitesmoke';
                                indTwoStyle.backgroundColor = 'whitesmoke';
                            }, 0);
                        }
                        indOneStyle.height = heightNew2;
                        indTwoStyle.height = heightNew1;
                        swap(array, a, b);
                    }
                }, s * 2);
            }
        }
        t++;
        setTimeout(() => {
            s = 0;
            bubbleSort();
        }, s * 2);
    } else if (t == arrayLength) {
        flagVerification();
        return;
    }
}

// function swaps values in an array.
function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const arrayHolder = array.slice();
    mergeSortFinder(array, 0, array.length - 1, arrayHolder, animations);
    return animations;
}

function mergeSortFinder(arrayMain, firstIdx, lastIdx, arrayHolder, animations) {
    if (firstIdx === lastIdx) return;
    const halfIdx = Math.floor((firstIdx + lastIdx) / 2);
    mergeSortFinder(arrayHolder, firstIdx, halfIdx, arrayMain, animations);
    mergeSortFinder(arrayHolder, halfIdx + 1, lastIdx, arrayMain, animations);
    mergeSortMain(arrayMain, firstIdx, halfIdx, lastIdx, arrayHolder, animations);
}

function mergeSortMain(arrayMain, firstIdx, halfIdx, lastIdx, arrayHolder, animations) {
    let x = firstIdx;
    let y = firstIdx;
    let z = halfIdx + 1;
    while (y <= halfIdx && z <= lastIdx) {
        animations.push([y, z]);
        animations.push([y, z]);
        if (arrayHolder[y] <= arrayHolder[z]) {
            animations.push([x, arrayHolder[y]]);
            arrayMain[x++] = arrayHolder[y++];
        } else {
            animations.push([x, arrayHolder[z]]);
            arrayMain[x++] = arrayHolder[z++];
        }
    }
    while (y <= halfIdx) {
        animations.push([y, y]);
        animations.push([y, y]);
        animations.push([x, arrayHolder[y]]);
        arrayMain[x++] = arrayHolder[y++];
    }
    while (z <= lastIdx) {
        animations.push([z, z]);
        animations.push([z, z]);
        animations.push([x, arrayHolder[z]]);
        arrayMain[x++] = arrayHolder[z++];
    }
}

function mergeSortAction() {
    const animations = mergeSort(array)
    for (let i = 0; i < animations.length; i++) {
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const [indOneIdx, indTwoIdx] = animations[i];
            const indOneStyle = individualColumn[indOneIdx].style;
            const indTwoStyle = individualColumn[indTwoIdx].style;
            const color = i % 3 === 0 ? '#228CDB' : 'whitesmoke';
            setTimeout(() => {
                indOneStyle.backgroundColor = color;
                indTwoStyle.backgroundColor = color;
            }, i * 4);
        } else {
            const [indOneIdx, heightNew] = animations[i];
            const indOneStyle = individualColumn[indOneIdx].style;
            setTimeout(() => {
                indOneStyle.height = `${heightNew}px`;
                flagVerification()
            }, i * 4);
        }
    }
}

// function verifies if array and divs are sorted
function flagVerification() {
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
            console.log('finished!');
            resetButton.addEventListener('click', resetArray);
            resetButton.style.backgroundColor = 'whitesmoke';
            resetButton.style.color = '#424B54'
            flagResetButton = 1;
            return;
        }
    }
}