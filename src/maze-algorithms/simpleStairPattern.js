function simpleStairPattern(grid) {

    let row = grid.length-1;
    let col = 0;

    let walls = [];

    while(row > 0 && col < grid[0].length) {
        walls.push([row, col]);

        row--;
        col++;
    }

    while(row < grid.length-2 && col < grid[0].length) {
        walls.push([row, col]);

        row++;
        col++;
    }

    while(row > 0 && col < grid[0].length-1) {
        walls.push([row, col]);

        row--;
        col++;
    }


    return walls;
}



export default simpleStairPattern;