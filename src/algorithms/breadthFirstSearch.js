// pass starting node and ending node as parameter
// pass grid as well

export function breadthFirstSearch(grid, startNode, finishNode) {

    startNode.distance = 0;

    const visitedNodesInOrder = [];
    

    const q = [];
    q.push(startNode);
    startNode.isVisited = true; 
    

    while(q.length > 0) {
        const front = q.shift(); // take front and pop front;
        visitedNodesInOrder.push(front); // front ke sare neighbours ko queue me dalo
        if (front === finishNode) return visitedNodesInOrder;


        if(front.isWall === true) continue;
        if (front.distance === Infinity) return visitedNodesInOrder; 

        // traverse on neighbours of front node
        // console.log("console logging front...", front.row);
        const row = front.row;
        const col = front.col;

        if(row > 0) {
            const top = grid[row-1][col];
            if(top.isVisited === false) {
              q.push(top);
              top.isVisited = true;
              top.distance = front.distance + 1;
              top.previousNode = {...front};
            }
            
        }

        if(row < grid.length-1) {
          const bottom = grid[row+1][col];
          if(bottom.isVisited === false) {
            q.push(bottom);
            bottom.isVisited = true;
            bottom.distance = front.distance + 1;
            bottom.previousNode = {...front};
          }
          
        }


        if(col < grid[0].length-1) {
            const right = grid[row][col+1];
            if(right.isVisited === false) {
              q.push(right);
              right.isVisited = true;
              right.distance = front.distance + 1;
              right.previousNode = {...front};
            }

        }
        
        if(col > 0) {
            const left = grid[row][col-1];
            if(left.isVisited === false) {
              q.push(left);
              left.isVisited = true;
              left.distance = front.distance + 1;
              left.previousNode = {...front};
            }
        }



    }


    return visitedNodesInOrder;


}





// iske bina bhi chal jayega

export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}