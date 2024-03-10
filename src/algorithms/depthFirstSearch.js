export function depthFirstSearch(grid, startNode, finishNode) {
    const numRows = grid.length;
    const numCols = grid[0].length;
    const visited = new Array(numRows).fill(false).map(() => new Array(numCols).fill(false));
    const path = [];
  
    // Helper function for DFS traversal
    function dfs(row, col, distance) {
      if (row < 0 || col < 0 || row >= numRows || col >= numCols || grid[row][col].isWall === true || visited[row][col]) {
        return false;
      }
  
      visited[row][col] = true;
      grid[row][col].isVisited = true; // making it true as well // this is the current node we are standing
      grid[row][col].distance = distance;
    //   path.push({ row, col });
      path.push(grid[row][col]);
    //   console.log("currentn node inside recursion", grid[row][col]);
  
    //   if (row === finish[0] && col === finish[1]) {
    //     return true;
    //   }
      if(row === finishNode.row && col === finishNode.col) {
        return true;
      }

    //   update the previous node 
    // so the current node is going to be the previous node for top, right, bottom, left
    // top
      // for top row-1
      // for right col+1
      // for bottom row+1
      // for left col-1

      if(row-1 >= 0) {
        grid[row-1][col].previousNode = { ...grid[row][col] };
      }
      if(col+1 < numCols) {
        grid[row][col+1].previousNode = { ...grid[row][col] };
      }
      if(row+1 < numRows) {
        grid[row+1][col].previousNode = { ...grid[row][col] };
      }
      if(col-1 >= 0) {
        grid[row][col-1].previousNode = { ...grid[row][col] };
      }
      
  
      // Explore in four directions: top, right, bottom, left
      if (dfs(row - 1, col, distance+1) || dfs(row, col + 1, distance+1) || dfs(row + 1, col, distance+1) || dfs(row, col - 1, distance+1) ) {
        return true;
      }
  
      // If the finish node is not reached through this path, backtrack
    //   path.pop();
      return false;
    }
    
    startNode.distance = 0;
    dfs(startNode.row, startNode.col, startNode.distance);
    return path;
}