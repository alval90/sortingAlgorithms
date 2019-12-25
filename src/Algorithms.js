const algorithm = {
  bubbleSort: function(arr, index = 0, counter = 0) {
    if (index === arr.length - counter - 1) {
      arr = setItemStatus(arr, [], [], [index]);
      if (this.state.isSorted) {
        arr = setItemStatus(arr, [], [], [], true);
        this.setState({ arr: arr });
      } else {
        this.setState({ arr: arr, isSorted: true }, () =>
          algorithm.bubbleSort.call(this, this.state.arr, 0, counter + 1)
        );
      }
      return;
    }
    if (index < arr.length) {
      if (arr[index].height > arr[index + 1].height) {
        arr = swapItems(arr, index, index + 1);
        arr = setItemStatus(arr, [index], [index + 1, index + 2]);
        this.setState({ arr: arr, isSorted: false }, () =>
          setTimeout(
            () =>
              algorithm.bubbleSort.call(
                this,
                this.state.arr,
                index + 1,
                counter
              ),
            30
          )
        );
        return;
      } else {
        arr = setItemStatus(arr, [index], [index + 1, index + 2]);
        this.setState({ arr: arr }, () =>
          setTimeout(
            () =>
              algorithm.bubbleSort.call(
                this,
                this.state.arr,
                index + 1,
                counter
              ),
            30
          )
        );
        return;
      }
    }
  },
  // Planned optimization:
  // 1) Move break condition to top of recursive function for better readability
  // 2) Reduce amount of loops by one via skipping the first iteration
  // 3) Encapsulate color highlighting and value swapping
  selectionSort: function(arr, index = 0, minIndex = 0, counter = 0) {
    // Check if every itemblock has been considered as current minimum value
    if (index < arr.length) {
      // Define new minimum, if current item that is being analyzed is smaller than the current minimum
      // Change status of itemBlocks to highlight in respective color
      if (arr[index].height <= arr[minIndex].height) {
        arr = setItemStatus(arr, [minIndex], [index, index + 1]);
        minIndex = index;
        this.setState({ arr: arr, isSorted: false }, () =>
          setTimeout(
            () =>
              algorithm.selectionSort.call(
                this,
                this.state.arr,
                index + 1,
                minIndex,
                counter
              ),
            30
          )
        );
        // Move one item ahead, if current item that is being analyzed is not smaller than the current minimum
        // Change status accordingly to use color highlighting
      } else if (arr[index].height > arr[minIndex].height) {
        arr = setItemStatus(arr, [index], [index + 1]);
        this.setState({ arr: arr }, () =>
          setTimeout(
            () =>
              algorithm.selectionSort.call(
                this,
                this.state.arr,
                index + 1,
                minIndex,
                counter
              ),
            30
          )
        );
      }
      // After going through all items to check for a new minimum, check if items need to be swapped to further sort the array
      // Swap new minimum with current starting item of the loop - Otherwise, consider array as sorted and fill the itemBlockStatus accordingly for color highlighting.
    } else {
      if (this.state.isSorted) {
        arr = setItemStatus(arr, [], [], [], true);
        this.setState({ arr: arr });
      } else {
        arr = swapItems(arr, counter, minIndex);
        arr = setItemStatus(arr, [minIndex], [counter + 1], [counter]);
        this.setState({ arr: arr, isSorted: true }, () =>
          setTimeout(
            () =>
              algorithm.selectionSort.call(
                this,
                this.state.arr,
                counter + 1,
                counter + 1,
                counter + 1
              ),
            30
          )
        );
      }
    }
  },
  insertionSort: function(arr) {
    // change code below this line
    for (let i = 0; i < arr.length; i++) {
      for (let j = i; j >= 0; j--) {
        if (arr[j] <= arr[j - 1]) {
          let tmp = arr[j];
          arr[j] = arr[j - 1];
          arr[j - 1] = tmp;
        }
      }
    }
    return arr;
  },
  quickSort: function(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    let pivot = arr[0];
    let right = [];
    let equal = [];
    let left = [];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else if (arr[i] === pivot) {
        equal.push(arr[i]);
      } else if (arr[i] > pivot) {
        right.push(arr[i]);
      }
    }
    arr = algorithm
      .quickSort(left)
      .concat(equal, pivot, algorithm.quickSort(right));
    return arr;
  },
  mergeSort: function(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    let leftHalf = arr.splice(0, Math.floor(arr.length / 2));
    let rightHalf = arr.splice(0, arr.length);
    let left = algorithm.mergeSort.call(this, leftHalf);
    let right = algorithm.mergeSort.call(this, rightHalf);
    arr = merge.call(this, left, right);
    return arr;
  }
};

function setItemStatus(arr, defaultItems = [], analyzedItems = [], sortedItems = [], globalySorted = false) {
  for (let i = 0; i < defaultItems.length; i++) {
    if (arr[defaultItems[i]] && arr[defaultItems[i]].status !== "sorted") {
      arr[defaultItems[i]].status = "default";
    }
  }
  for (let i = 0; i < analyzedItems.length; i++) {
    if (arr[analyzedItems[i]] && arr[analyzedItems[i]].status !== "sorted") {
      arr[analyzedItems[i]].status = "analyzed";
    }
  }
  for (let i = 0; i < sortedItems.length; i++) {
    if (arr[sortedItems[i]]) {
      arr[sortedItems[i]].status = "sorted";
    }
  }
  if (globalySorted) {
    arr.map(item => (item.status = "sorted"));
  }
  return arr;
}

function swapItems(arr, firstItemIndex, secondItemIndex) {
  let tmp = arr[firstItemIndex];
  arr[firstItemIndex] = arr[secondItemIndex];
  arr[secondItemIndex] = tmp;
  return arr;
}

function merge(left, right, sortedArray = []) {
  while (left.length > 0 && right.length > 0) {
    if (left[0].height < right[0].height) {
      console.log(left[0].index);
      sortedArray = [...sortedArray, left.shift()];
    } else {
      console.log(right[0].index);
      sortedArray = [...sortedArray, right.shift()];
    }
  }
  while (left.length > 0) {
    console.log(left[0].index);
    sortedArray = [...sortedArray, left.shift()];
  }
  while (right.length > 0) {
    console.log(right[0].index);
    sortedArray = [...sortedArray, right.shift()];
  }
  return sortedArray;
}

export default algorithm;
