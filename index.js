let matrix = [
  [1, 0, 0, 1, 0, 1],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 0],
];
function createMaze(matrix) {
  let newMatrix = [];
  let parentDiv = document.getElementById("field");
  for (let i = 0; i < matrix.length; i++) {
    newMatrix[i] = [];
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] == 0) {
        let whiteBlock = document.createElement("div");
        whiteBlock.className = "whiteBlock";
        parentDiv.appendChild(whiteBlock);
        newMatrix[i].push(whiteBlock);
      } else {
        let blackBlock = document.createElement("div");
        blackBlock.className = "blackBlock";
        parentDiv.appendChild(blackBlock);
        let smallBlackBox = document.createElement("div");
        smallBlackBox.className = "smallBlackBox";
        blackBlock.appendChild(smallBlackBox);
        newMatrix[i].push(blackBlock);
      }
    }
  }
  return newMatrix;
}
let newArr = createMaze(matrix);
function selectSells() {
  let count = 0;
  let allWhiteBlock = document.querySelectorAll(".whiteBlock");
  for (let whiteBlock of allWhiteBlock) {
    whiteBlock.onclick = function (e) {
      whiteBlock.classList.add("start");
      count++;
      if (count == 2) {
        whiteBlock.classList.remove("start");
        whiteBlock.classList.add("end");
        return findShortestPath(
          searchStartPoint(newArr),
          searchEndPoint(newArr)
        );
      }
      if (count > 2) {
        whiteBlock.classList.remove("end");
        whiteBlock.classList.remove("start");
      }
    };
  }
}
function searchStartPoint(inputArray) {
  let start = document.querySelector(".whiteBlock.start");
  for (let i = 0; i < inputArray.length; i++) {
    let j = inputArray[i].indexOf(start);
    if (j >= 0) {
      return [i, j];
    }
  }
  return null;
}
function searchEndPoint(inputArray) {
  let end = document.querySelector(".whiteBlock.end");
  for (let i = 0; i < inputArray.length; i++) {
    let j = inputArray[i].indexOf(end);
    if (j >= 0) {
      return [i, j];
    }
  }
  return null;
}
function findShortestPath(position, end) {
  let queue = [];
  matrix[position[0]][position[1]] = "startPoint";
  matrix[end[0]][end[1]] = "endPoint";
  queue.push([position]);
  let fullPath = [];
  // store a path, not just a position
  while (queue.length > 0) {
    let path = queue.shift();
    // get the path out of the queue
    let pos = path[path.length - 1];
    // ... and then the last position from it
    let direction = [
      [pos[0] + 1, pos[1]],
      [pos[0], pos[1] + 1],
      [pos[0] - 1, pos[1]],
      [pos[0], pos[1] - 1],
    ];
    for (var i = 0; i < direction.length; i++) {
      // Perform this check first:
      if (direction[i][0] == end[0] && direction[i][1] == end[1]) {
        // return the path that led to the find
        fullPath = path.concat([end]);
        return createPath(fullPath, matrix);
      }
      if (
        direction[i][0] < 0 ||
        direction[i][0] >= matrix[0].length ||
        direction[i][1] < 0 ||
        direction[i][1] >= matrix[0].length ||
        matrix[direction[i][0]][direction[i][1]] != 0
      ) {
        continue;
      }
      matrix[direction[i][0]][direction[i][1]] = 5;
      // extend and push the path on the queue
      queue.push(path.concat([direction[i]]));
    }
  }
}
function createPath(path, matrix) {
  for (let i = 0; i < path.length; i++) {
    if (matrix[path[i][0]][path[i][1]] == 5) {
      if (path[i][0] < path[i + 1][0] && path[i][1] == path[i + 1][1]) {
        matrix[path[i][0]][path[i][1]] = "arrowDown";
      }
      if (path[i][0] > path[i + 1][0] && path[i][1] == path[i + 1][1]) {
        matrix[path[i][0]][path[i][1]] = "arrowUp";
      }
      if (path[i][0] == path[i + 1][0] && path[i][1] > path[i + 1][1]) {
        matrix[path[i][0]][path[i][1]] = "arrowLeft";
      }
      if (path[i][0] == path[i + 1][0] && path[i][1] < path[i + 1][1]) {
        matrix[path[i][0]][path[i][1]] = "arrowRight";
      }
      if (path[i][0] < path[i + 1][0] && path[i][1] > path[i - 1][1]) {
        matrix[path[i][0]][path[i][1]] = "arrowLeftDown";
      }
      if (path[i][0] > path[i + 1][0] && path[i][1] > path[i - 1][1]) {
        matrix[path[i][0]][path[i][1]] = "arrowLeftUp";
      }
      if (path[i][0] < path[i + 1][0] && path[i][1] < path[i - 1][1]) {
        matrix[path[i][0]][path[i][1]] = "arrowRightDown";
      }
      if (path[i][0] > path[i + 1][0] && path[i][1] < path[i - 1][1]) {
        matrix[path[i][0]][path[i][1]] = "arrowRightUp";
      }
      if (path[i][0] > path[i - 1][0] && path[i][1] < path[i + 1][1]) {
        matrix[path[i][0]][path[i][1]] = "arrowDownRight";
      }
      if (path[i][0] > path[i - 1][0] && path[i][1] > path[i + 1][1]) {
        matrix[path[i][0]][path[i][1]] = "arrowDownLeft";
      }
      if (path[i][0] < path[i - 1][0] && path[i][1] < path[i + 1][1]) {
        matrix[path[i][0]][path[i][1]] = "arrowUpRight";
      }
      if (path[i][0] < path[i - 1][0] && path[i][1] > path[i + 1][1]) {
        matrix[path[i][0]][path[i][1]] = "arrowUpLeft";
      }
      drawShortestPath(matrix);
    }
  }
}
function drawShortestPath(matrix) {
  let parentDiv = document.getElementById("field");
  let allDivs = document.querySelectorAll("#field > div");
  for (let div of allDivs) {
    div.remove();
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] == 0 || matrix[i][j] == 5) {
        let whiteBlock = document.createElement("div");
        whiteBlock.className = "whiteBlock";
        parentDiv.appendChild(whiteBlock);
      }
      if (matrix[i][j] == 1) {
        let blackBlock = document.createElement("div");
        blackBlock.className = "blackBlock";
        parentDiv.appendChild(blackBlock);
        let smallBlackBox = document.createElement("div");
        smallBlackBox.className = "smallBlackBox";
        blackBlock.appendChild(smallBlackBox);
      }
      if (matrix[i][j] == "arrowDown") {
        createBlockImg("images/down.png");
      }
      if (matrix[i][j] == "startPoint") {
        let start = document.createElement("div");
        start.className = "whiteBlock start";
        parentDiv.appendChild(start);
      }
      if (matrix[i][j] == "endPoint") {
        let end = document.createElement("div");
        end.className = "whiteBlock end";
        parentDiv.appendChild(end);
      }
      if (matrix[i][j] == "arrowLeft") {
        createBlockImg("images/left.png");
      }
      if (matrix[i][j] == "arrowUp") {
        createBlockImg("images/up.png");
      }
      if (matrix[i][j] == "arrowRight") {
        createBlockImg("images/right.png");
      }
      if (matrix[i][j] == "arrowLeftDown") {
        createBlockImg("images/left-down.png");
      }
      if (matrix[i][j] == "arrowLeftUp") {
        createBlockImg("images/left-up.png");
      }
      if (matrix[i][j] == "arrowRightDown") {
        createBlockImg("images/right-down.png");
      }
      if (matrix[i][j] == "arrowRightUp") {
        createBlockImg("images/right-up.png");
      }
      if (matrix[i][j] == "arrowDownRight") {
        createBlockImg("images/down-right.png");
      }
      if (matrix[i][j] == "arrowDownLeft") {
        createBlockImg("images/down-left.png");
      }
      if (matrix[i][j] == "arrowUpRight") {
        createBlockImg("images/up-right.png");
      }
      if (matrix[i][j] == "arrowUpLeft") {
        createBlockImg("images/up-left.png");
      }
    }
  }
  return matrix;
}
function createBlockImg(imageSrc) {
  let path = document.createElement("div");
  let parentDiv = document.getElementById("field");
  path.className = "arrow";
  parentDiv.appendChild(path);
  let img = document.createElement("img");
  img.src = imageSrc;
  path.appendChild(img);
}
selectSells();
