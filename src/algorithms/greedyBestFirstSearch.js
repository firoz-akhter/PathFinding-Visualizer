const numRows = 25;
const numCols = 65;

// let startRow = 8;
// let startCol = 11;
// let finishRow = 8;
// let finishCol = 40;




// Greedy Best-First Search function
function greedyBestFirstSearch(grid, start, finish) {

    // const startNode = grid[startRow][startCol];
    // const targetNode = grid[finishRow][finishCol];

    const startNode = start;
    const targetNode = finish;

    let visitedNodesInOrder = [];
  
    const queue = [];
    startNode.distance = 0;
    queue.push(startNode);
  
    while (queue.length > 0) {
      queue.sort((a, b) => a.distance - b.distance);
      const currentNode = queue.shift();
  
      if (currentNode === targetNode) {
        let path = getPath(targetNode);    // returns the shortest path
        return [visitedNodesInOrder, path];
      }
  
      visitedNodesInOrder.push(currentNode);
      currentNode.visited = true;
  
      const neighbors = getNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        if (!neighbor.visited && !neighbor.isWall) {
          neighbor.distance = heuristic(neighbor, targetNode);
          neighbor.previousNode = currentNode;
          queue.push(neighbor);
        }
      }
    }
  
    return [];
  }
  
  // Get heuristic distance between nodes (Euclidean distance)
  function heuristic(nodeA, nodeB) {
    const dx = nodeA.col - nodeB.col;
    const dy = nodeA.row - nodeB.row;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  // Get neighboring nodes
  function getNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
  
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < numRows - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < numCols - 1) neighbors.push(grid[row][col + 1]);
  
    return neighbors;
  }
  
  // Get path from target node to start node
  function getPath(targetNode) {
    const path = [];
    let currentNode = targetNode;
  
    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
  
    return path;
  }
  



export default greedyBestFirstSearch;