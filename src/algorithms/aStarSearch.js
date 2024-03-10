




const numRows = 25;
const numCols = 65;

// let startRow = 8;
// let startCol = 11;
// let finishRow = 8;
// let finishCol = 40;

// const createNode = (row, col) => {
//   return {
//     row,
//     col,
//     isStart: row === startRow && col === startCol,
//     isFinish: row === finishRow && col === finishCol,
//     distance: Infinity,
//     isVisited: false,
//     isWall: false,
//     previousNode: null,
//     fScore: Infinity,
//     gScore: Infinity,
//   };
// };







  const visualizeAStar = (grid, start, finish) => {
    
    const startNode = start;
    const finishNode = finish;


    console.log("visualizing a * search algo")
    let visitedNodesInOrder = [];

    const openSet = [];
    const closedSet = [];

    startNode.gScore = 0;
    startNode.fScore = heuristic(startNode, finishNode);
    openSet.push(startNode);

    while (openSet.length > 0) {
      let currentNode = openSet[0];
      let currentIndex = 0;

      // Find node with lowest fScore in the openSet
      openSet.forEach((node, index) => {
        if (node.fScore < currentNode.fScore) {
          currentNode = node;
          currentIndex = index;
        }
      });

      visitedNodesInOrder.push(currentNode);

      // If reached the finish node
      if (currentNode === finishNode) {
        let path = [];
        let temp = currentNode;
        while (temp !== null) {
          path.unshift(temp);
          temp = temp.previousNode;
        }
        // showVisitedNodes(visitedNodesInOrder);
        // visualizePath(path);
        // return;

        // return visitedNodesInOrder;
        return [visitedNodesInOrder, path];
      }

      openSet.splice(currentIndex, 1);
      closedSet.push(currentNode);

      const neighbors = getNeighbors(grid, currentNode);
      neighbors.forEach((neighbor) => {
        if (!closedSet.includes(neighbor) && !neighbor.isWall) {
          const tempGScore = currentNode.gScore + 1; // Assuming a constant cost for moving to a neighbor
          let newPath = false;
          if (openSet.includes(neighbor)) {
            if (tempGScore < neighbor.gScore) {
              neighbor.gScore = tempGScore;
              newPath = true;
            }
          } else {
            neighbor.gScore = tempGScore;
            openSet.push(neighbor);
            newPath = true;
          }

          if (newPath) {
            neighbor.hScore = heuristic(neighbor, finishNode);
            neighbor.fScore = neighbor.gScore + neighbor.hScore;
            neighbor.previousNode = currentNode;
          }
        }
      });
    }
  };





const heuristic = (nodeA, nodeB) => {
  // Manhattan distance heuristic
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
};



const getNeighbors = (grid, node) => {
  const neighbors = [];
  const { row, col } = node;

  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < numRows - 1) neighbors.push(grid[row + 1][col]);
  if (col < numCols - 1) neighbors.push(grid[row][col + 1]);

  
  
  return neighbors;
};

  // const visualizePath = (path) => {
  //   // Visualize the shortest path
  //   const newGrid = grid.slice();
  //   // for (const node of path) {
  //   for(let i=0; i<path.length; i++) {
  //     let node = path[i];
      
  //     if (!node.isStart && !node.isFinish) {
  //       console.log("this is node...", node);
  //       // fetch the element by id and toggle the color

  //       setTimeout(() => {
  //         const element = document.getElementById(`${node.row}-${node.col}`);
  //         element.classList.add('path');


  //         newGrid[node.row][node.col].isVisited = true;
  //       }, i*20);
        
  //     }
  //   }
  //   setGrid(newGrid);
  // };















export default visualizeAStar;










  // function showVisitedNodes(visitedNodesInOrder) {

  //   for(let i=0; i<visitedNodesInOrder.length; i++) {
  //     let node = visitedNodesInOrder[i];

  //     setTimeout(() => {
  //       const element = document.getElementById(`${node.row}-${node.col}`);
  //       element.classList.add('visited');
  //     }, i*10);

      


  //   }

  // }














