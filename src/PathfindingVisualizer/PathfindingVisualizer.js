import React, { useState } from "react";
import { useEffect } from "react";
import "./PathfindingVisualizer.css";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import Node from "../Node/Node";
import { breadthFirstSearch } from "../algorithms/breadthFirstSearch";
import { depthFirstSearch } from "../algorithms/depthFirstSearch";
import visualizeAStar from "../algorithms/aStarSearch";
import greedyBestFirstSearch from "../algorithms/greedyBestFirstSearch";
import { randomMaze } from "../maze-algorithms/randomMaze";
import simpleStairPattern from "../maze-algorithms/simpleStairPattern";
import { recursiveDivisionMaze } from "../maze-algorithms/recursiveDivision";



let startRow = 12;
let startCol = 11;
let finishRow = 12;
let finishCol = 55;



function PathfindingVisualizer() {

  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isMazeOpen, setIsMazeOpen] = useState(false);
  const [isAlgorithmsOpen, setIsAlgorithmsOpen] = useState(false);
  const [isInitialNode, setIsInitialNode] = useState(false);
  const [isLastNode, setIsLastNode] = useState(false);


  useEffect(() => {

    initializeGrid();

  }, []);


  function initializeGrid() {
    let nodes = [];

    for(let i=0; i<25; i++) {
      let row = [];
      for(let j=0; j<65; j++) {
        row.push({
          previousNode: null,
          distance: Infinity,
          isWall: false,
          isVisited: false,
          row: i,
          col: j,
          isStart: i===startRow && j===startCol,
          isFinish: i===finishRow && j===finishCol,
          fScore: Infinity,
          gScore: Infinity,
        });
      }
      nodes.push(row);
    }

    
    setGrid(nodes);

  }



  function animateShortestPath(nodesInShortestPathOrder) {
    
    for(let i=0; i<nodesInShortestPathOrder.length-1; i++) {

      setTimeout(() => {
        let node = nodesInShortestPathOrder[i];
        const element = document.getElementById(`${node.row}-${node.col}`);
        element.classList.remove('visited');
        element.classList.add('path');

      }, 25* i);
    }
  }




  function showAnimationOfDijkstra() {
    toggleAlgorithmDropDown();

    let startNode = grid[startRow][startCol];
    let finishNode = grid[finishRow][finishCol];

    let visitedNodesInSortedOrder = dijkstra(grid, startNode, finishNode);
    // console.log("visited nodes in order-->", visitedNodesInSortedOrder);
    let nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    nodesInShortestPathOrder.shift(); // popping the first element out of the list...

    for(let i=1; i <= visitedNodesInSortedOrder.length; i++) {

      if(i === visitedNodesInSortedOrder.length-1) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return ;
      }

      setTimeout(() => {
        let node = visitedNodesInSortedOrder[i];
        const element = document.getElementById(`${node.row}-${node.col}`);
        element.classList.add('visited');

      }, 10* i);

    }
    
  }

  function showAnimationOfBFS() {
    toggleAlgorithmDropDown();

    let startNode = grid[startRow][startCol];
    let finishNode = grid[finishRow][finishCol];

    let visitedNodesInSortedOrder = breadthFirstSearch(grid, startNode, finishNode);
    visitedNodesInSortedOrder.shift();
    // console.log("console logging visitedNodesInSortedOrder...", visitedNodesInSortedOrder);
    let nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    nodesInShortestPathOrder.shift();

    for(let i=0; i <= visitedNodesInSortedOrder.length; i++) {

      if(i === visitedNodesInSortedOrder.length-1) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return ;
      }

      setTimeout(() => {
        let node = visitedNodesInSortedOrder[i];
        // console.log("console logging node", node);

        const element = document.getElementById(`${node.row}-${node.col}`);
        element.classList.add('visited');

      }, 10* i);

    }

  }







  function showAnimationOfDFS() {
    toggleAlgorithmDropDown();

    let startNode = grid[startRow][startCol];
    let finishNode = grid[finishRow][finishCol];

    let visitedNodesInSortedOrder = depthFirstSearch(grid, startNode, finishNode);
    let nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    visitedNodesInSortedOrder.shift(); // popping the first element out
    nodesInShortestPathOrder.shift(); // popping the first element out only...

    for(let i=0; i <= visitedNodesInSortedOrder.length; i++) {
      if(i === visitedNodesInSortedOrder.length-1) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return ;
      }

      setTimeout(() => {
        let node = visitedNodesInSortedOrder[i];
        // node.isWall = true;

        const element = document.getElementById(`${node.row}-${node.col}`);
        element.classList.add('visited');
      }, 10* i);

    }

  }


  function showAnimationOfAStarSearch() {
    toggleAlgorithmDropDown();
    console.log("showing the animation of A * Search");
    
    
    let startNode = grid[startRow][startCol];
    let finishNode = grid[finishRow][finishCol];

    let [visitedNodesInSortedOrder, path] = visualizeAStar(grid, startNode, finishNode);
    // let nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    visitedNodesInSortedOrder.shift();
    path.shift();

    for(let i=0; i < visitedNodesInSortedOrder.length; i++) {
      if(i === visitedNodesInSortedOrder.length-1) {
        setTimeout(() => {
          animateShortestPath(path);
        }, 10 * i);
        return ;
      }

      setTimeout(() => {
        let node = visitedNodesInSortedOrder[i];

        const element = document.getElementById(`${node.row}-${node.col}`);
        element.classList.add('visited');
      }, 10* i);

    }

  }


  function showAnimationOfGreedyBestFirstSearch() {
    toggleAlgorithmDropDown();

    console.log("showing animation of greedy best first search...")

    let startNode = grid[startRow][startCol];
    let finishNode = grid[finishRow][finishCol];

    const [visitedNodesInSortedOrder, path] = greedyBestFirstSearch(grid, startNode, finishNode);
    visitedNodesInSortedOrder.shift();
    path.shift();


    for(let i=0; i < visitedNodesInSortedOrder.length; i++) {
      if(i === visitedNodesInSortedOrder.length-1) {
        setTimeout(() => {
          animateShortestPath(path);
        }, 10 * i);
        return ;
      }

      setTimeout(() => {
        let node = visitedNodesInSortedOrder[i];

        const element = document.getElementById(`${node.row}-${node.col}`);
        element.classList.add('visited');
      }, 10* i);

    }

  }














// ------------------ Mouse handlers --------------->
  

  function handleMouseDown(e, rowIdx, colIdx) {
    e.preventDefault();  // hat gaya bug -->kind of

    if(grid[rowIdx][colIdx].isStart === true) {
      grid[rowIdx][colIdx].isStart = false;
      setIsInitialNode(true);
      // return ;
    }
    if(grid[rowIdx][colIdx].isFinish === true) {
      grid[rowIdx][colIdx].isFinish = false;
      setIsLastNode(true);
      // return ;
    }

    else {
      let nodes = toggleNode(grid, rowIdx, colIdx); // changing the color either blue or white
      setGrid(nodes);
      setMouseIsPressed(true);
    }

    
  }

  function handleMouseEnter(rowIdx, colIdx) {

    if(mouseIsPressed === false) {
      // console.log("Mouse is not pressed...");
      return ;
    }

    // if initialNode state variable === true then mark node.isStart = true
    // then return
    if(isInitialNode === true) {
      grid[rowIdx][colIdx].isStart = true;

      let node = grid[rowIdx][colIdx];
      const element = document.getElementById(`${node.row}-${node.col}`);
      element.classList.add('green');
      console.log("Mouse is entered...");
      // return ;
    }
    if(isLastNode === true) {
      grid[rowIdx][colIdx].isFinish = true;
      let node = grid[rowIdx][colIdx];
      const element = document.getElementById(`${node.row}-${node.col}`);
      element.classList.add('red');
      console.log("Mouse is entered...");
      return ;
    }
    
    
    let nodes = toggleNode(grid, rowIdx, colIdx); // flipping the color of node either blue or white
    setGrid(nodes);
      
  }

  function handleMouseLeave(rowIdx, colIdx) {

    if(isInitialNode === true) {
      grid[rowIdx][colIdx].isStart = false;

      let node = grid[rowIdx][colIdx];
      const element = document.getElementById(`${node.row}-${node.col}`);
      element.classList.remove('green');
      element.classList.remove('blue');
      grid[rowIdx][colIdx].isWall = false;

      return;
    }
    if(isLastNode === true) {
      grid[rowIdx][colIdx].isFinish = false;

      let node = grid[rowIdx][colIdx];
      const element = document.getElementById(`${node.row}-${node.col}`);
      element.classList.remove('red');
      element.classList.remove('blue');
      grid[rowIdx][colIdx].isWall = false;

      return ;
    }

  }

  function handleMouseUp(rowIdx, colIdx) {

    // if initialNode state variable === true then mark it false
    if(isInitialNode === true) {
      setIsInitialNode(false);
      startRow = rowIdx;
      startCol = colIdx;
      grid[rowIdx][colIdx].isStart = true;
      
    }
    if(isLastNode === true) {
      setIsLastNode(false);
      finishRow = rowIdx;
      finishCol = colIdx;
      grid[rowIdx][colIdx].isFinish = true;
    }
    

    setMouseIsPressed(false);
  }



  // maze generator handler functions

  function generateRandomMaze() {
    console.log("generating random maze...");

    let startNode = grid[startRow][startCol];
    let finishNode = grid[finishRow][finishCol];

    let walls = randomMaze(grid, startNode, finishNode);

    for(let i=0; i<walls.length; i++) {
      let row = walls[i][0];
      let col = walls[i][1];

      setTimeout(() => {
        let node = grid[row][col];

        const element = document.getElementById(`${node.row}-${node.col}`);
        element.classList.add('blue');
        node.isWall = true;
      }, 10* i);

    }
    toggleDropDown();
  }


  function generateSimpleStairPattern() {
    console.log("generating simple stair pattern...");

    let walls = simpleStairPattern(grid);

    for(let i=0; i<walls.length; i++) {
      let row = walls[i][0];
      let col = walls[i][1];

      setTimeout(() => {
        let node = grid[row][col];

        const element = document.getElementById(`${node.row}-${node.col}`);
        element.classList.add('blue');
        node.isWall = true;
      }, 10* i);

    }
    toggleDropDown();
  }


  function generateRecursiveDivision() {
    console.log("generating recursive division...");

    let startNode = grid[startRow][startCol];
    let finishNode = grid[finishRow][finishCol];
    
    let walls = recursiveDivisionMaze(grid, startNode, finishNode);


    for(let i=0; i<walls.length; i++) {
      let row = walls[i][0];
      let col = walls[i][1];

      setTimeout(() => {
        let node = grid[row][col];

        const element = document.getElementById(`${node.row}-${node.col}`);
        element.classList.add('blue');
        node.isWall = true;
      }, 10* i);

    }
    toggleDropDown();
  }

  function clearBoard() {
    console.log("Clearing board");

    initializeGrid();

    for(let row=0; row<grid.length; row++) {
      for(let col=0; col<grid[0].length; col++) {

        let node = grid[row][col];
        const element = document.getElementById(`${node.row}-${node.col}`);
        element.classList.remove('blue');
        element.classList.remove('visited');
        element.classList.remove('path');

      }
    }
  }

  function clearPath() {
    console.log("Clearing Path");

    let currentGrid = grid;

    for(let row = 0; row<currentGrid.length; row++) {
      for(let col=0; col<currentGrid[0].length; col++) {

        let node = grid[row][col];
        node.isVisited = false;

        const element = document.getElementById(`${node.row}-${node.col}`);
        element.classList.remove('visited');
        element.classList.remove('path');
        

      }
    }

    setGrid(currentGrid);


  }


  function toggleDropDown() {
    setIsMazeOpen(!isMazeOpen);
  }

  function toggleAlgorithmDropDown() {
    setIsAlgorithmsOpen(!isAlgorithmsOpen);
  }






  // add clear Path and clear Grid button...   



  return (
    <div className="gridContainer">
      <div className="navbar">
        <div className="logo">Pathfinding Visualizer</div>
        <div className="algorithms-buttons-div dropdown">
            <span onClick={toggleAlgorithmDropDown}>algorithms</span> {/* onclick={toggleAlgorithmDropDown} */}
            {isAlgorithmsOpen && (
              <div className="dropdown-content">
                <button onClick={showAnimationOfDijkstra}>Dijkstra's Algorithm</button>
                <button onClick={showAnimationOfBFS}>Breadth first Search</button>
                <button onClick={showAnimationOfDFS}>Depth first Search</button>
                <button onClick={showAnimationOfAStarSearch}>A* Search</button>
                <button onClick={showAnimationOfGreedyBestFirstSearch}>Greedy Best First Search</button>
              </div>
            )}
        </div>
        <div className="maze-generator-buttons-div dropdown">
          <span onClick={toggleDropDown} >Mazes and Patterns</span>  {/*onClick={toggleDropDown} */}
          {isMazeOpen && (
            <div className="dropdown-content">
              <button onClick={generateRandomMaze}>Random Maze</button>
              <button onClick={generateSimpleStairPattern}>Simple Stair Pattern</button>
              <button onClick={generateRecursiveDivision}>Recursive Division</button>
            </div>
          )}
          
          
        </div>
        <div className="clear-buttons">
          <button className="clearBoard" onClick={clearBoard}>Clear Board</button>
          <button className="clearPath" onClick={clearPath}>Clear Path</button>
        </div>
      </div>
      
      <br/>
      {/* grid pe iterate kro and UI pe show kro divs */}
      {grid.map((row, rowIdx) => {
      
        return <div key={`${rowIdx}`}>

          {row.map((col, colIdx) => {
            return <Node 
              handleMouseUp={() => handleMouseUp(rowIdx, colIdx)}
              handleMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
              handleMouseLeave={() => handleMouseLeave(rowIdx, colIdx)}
              handleMouseDown={(e) => handleMouseDown(e, rowIdx, colIdx)} 
              key={colIdx} 
              rowIdx={rowIdx} 
              colIdx={colIdx} 
              grid={grid}>

            </Node>
          })}

        </div>
        
        
      })}
        
      
    </div>
  )

}





function toggleNode(grid, rowIdx, colIdx) {
  let nodes = grid.slice();
  let node = nodes[rowIdx][colIdx];
  node.isWall = !node.isWall;

  nodes[rowIdx][colIdx] = node;
  return nodes;
}



export default PathfindingVisualizer;
