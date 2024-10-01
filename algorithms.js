const arrayContainer = document.getElementById('array-container');
let array = [];

function generateArray(size = 20) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    drawArray();
}

function drawArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        arrayContainer.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                drawArray();
                await sleep(100);
            }
        }
    }
}

async function quickSort(arr = array, low = 0, high = array.length - 1) {
    if (low < high) {
        const pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            drawArray();
            await sleep(100);
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    drawArray();
    await sleep(100);
    return i + 1;
}

async function mergeSort(arr = array) {
    if (arr.length < 2) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return await merge(await mergeSort(left), await mergeSort(right));
}

async function merge(left, right) {
    let result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    result = [...result, ...left.slice(i), ...right.slice(j)];
    drawArray();
    await sleep(100);
    return result;
}


document.getElementById('start-btn').addEventListener('click', async () => {
    const algorithm = document.getElementById('algorithms').value;
    if (algorithm === 'bubble') {
        await bubbleSort();
    } else if (algorithm === 'quick') {
        await quickSort(arr = array, low = 0, high = array.length - 1);
    } else if (algorithm === 'merge') {
        await mergeSort(arr = array);
    }
});

document.getElementById('reset-btn').addEventListener('click', generateArray);


generateArray();
