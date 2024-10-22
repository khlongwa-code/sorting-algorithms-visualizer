let array = [];
let arraySize = 50;  // Number of elements in the array
let animationSpeed = 500;  // Time delay in milliseconds
let algorithmSelector = document.getElementById('algorithm');
let speedSlider = document.getElementById('speed');
let stopButton = document.getElementById('stop');
let stopped = false;  // To track if the process is stopped

// Initialize the array with random values
function initializeArray() {
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    renderArray();
    document.getElementById('start').disabled = false;  // Enable start button
}

// Render the array as bars
function renderArray() {
    const arrayBars = document.getElementById('array-bars');
    arrayBars.innerHTML = '';  // Clear previous bars
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;  // Adjust the height based on the value
        arrayBars.appendChild(bar);
    });
}

// Quicksort algorithm with visualization
async function quicksort(start, end) {
    if (stopped || start >= end) return;
    
    let index = await partition(start, end);
    await quicksort(start, index - 1);
    await quicksort(index + 1, end);
}

async function partition(start, end) {
    let pivotValue = array[end];
    let pivotIndex = start;
    
    for (let i = start; i < end; i++) {
        if (stopped) return;
        if (array[i] < pivotValue) {
            swap(i, pivotIndex);
            pivotIndex++;
        }
        await sleep(animationSpeed);
        renderArray();
    }
    swap(pivotIndex, end);
    await sleep(animationSpeed);
    renderArray();
    return pivotIndex;
}

// Bubble Sort algorithm with visualization
async function bubbleSort() {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        if (stopped) return;
        for (let j = 0; j < n - i - 1; j++) {
            if (stopped) return;
            if (array[j] > array[j + 1]) {
                swap(j, j + 1);
                await sleep(animationSpeed);
                renderArray();
            }
        }
    }
}

// Merge Sort algorithm with visualization
async function mergeSort(start, end) {
    if (stopped || start >= end) return;

    let mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        if (stopped) return;
        if (left[i] < right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }
        k++;
        await sleep(animationSpeed);
        renderArray();
    }

    while (i < left.length) {
        if (stopped) return;
        array[k] = left[i];
        i++;
        k++;
        await sleep(animationSpeed);
        renderArray();
    }

    while (j < right.length) {
        if (stopped) return;
        array[k] = right[j];
        j++;
        k++;
        await sleep(animationSpeed);
        renderArray();
    }
}

// Insertion Sort algorithm with visualization
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        if (stopped) return;
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            if (stopped) return;
            array[j + 1] = array[j];
            j--;
            await sleep(animationSpeed);
            renderArray();
        }
        array[j + 1] = key;
        await sleep(animationSpeed);
        renderArray();
    }
}

// Selection Sort algorithm with visualization
async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
        if (stopped) return;
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (stopped) return;
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        swap(i, minIndex);
        await sleep(animationSpeed);
        renderArray();
    }
}

// Swap two elements in the array
function swap(i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// Sleep function to add delay for visualization
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Stop the current algorithm
function stopAlgorithm() {
    stopped = true;
    stopButton.disabled = true;
    document.getElementById('start').disabled = false;  // Enable start button again
}

// Reset the array and visualization
function resetVisualizer() {
    stopped = true;
    stopButton.disabled = true;
    document.getElementById('start').disabled = false;
    initializeArray();
}

// Event listeners for controls
document.getElementById('start').addEventListener('click', () => {
    stopped = false;  // Reset the stop flag
    stopButton.disabled = false;  // Enable stop button
    document.getElementById('start').disabled = true;  // Disable start button during execution
    let algorithm = algorithmSelector.value;
    switch (algorithm) {
        case 'quicksort':
            quicksort(0, array.length - 1);
            break;
        case 'bubblesort':
            bubbleSort();
            break;
        case 'mergesort':
            mergeSort(0, array.length - 1);
            break;
        case 'insertionsort':
            insertionSort();
            break;
        case 'selectionsort':
            selectionSort();
            break;
    }
});

speedSlider.addEventListener('input', () => {
    animationSpeed = 1000 - speedSlider.value * 100;
});

// Stop button event listener
stopButton.addEventListener('click', stopAlgorithm);

// Reset button event listener
document.getElementById('reset').addEventListener('click', resetVisualizer);

// Initialize the array on load
initializeArray();
