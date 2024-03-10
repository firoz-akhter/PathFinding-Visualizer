import React from "react";
import './Node.css';


function Node(props) {
    const {rowIdx, colIdx, grid, handleMouseDown, handleMouseEnter, handleMouseLeave, handleMouseUp} = props;

    let extraClass = '';
    if(grid[rowIdx][colIdx].isStart === true) {
        extraClass = 'green';
    }
    else if(grid[rowIdx][colIdx].isFinish === true) {
        extraClass = 'red';
    }
    else if(grid[rowIdx][colIdx].isWall === true) {
        extraClass = 'blue'
    }








    return <div onMouseUp={handleMouseUp} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseDown={handleMouseDown} id={`${rowIdx}-${colIdx}`} className={`node ${extraClass}`} key={`${rowIdx}-${colIdx}`}></div>
}


export default Node;