
const cellExists = cell => typeof cell !== 'undefined'

const getNeighbourCellsCount = (cells, cRI, cCI, lCC = 0, iCC = false, pCR = true) => {
    let _lCC = lCC // lCC - live cell count
    
    const cellRow = cells[cRI] // cRI - cell row index
    const prevCellRow = cells[cRI - 1]
    const nextCellRow = cells[cRI + 1]
    
    const currentCell = cellRow[cCI] // cCI - current cell index
    const prevCell = cellRow[cCI - 1]
    const nextCell = cellRow[cCI + 1]
    
    if (iCC && currentCell) ++_lCC // iCC = include current cell
            

    if (cellExists(prevCell) && prevCell) ++_lCC
    

    if (cellExists(nextCell) && nextCell) ++_lCC
    

    if (nextCellRow && pCR) {
        // pCR proceed (with) cell recursion
        _lCC = getNeighbourCellsCount(cells, cRI + 1, cCI, _lCC, true, false)
    }

    if (prevCellRow && pCR) {
        // pCR proceed (with) cell recursion
        _lCC = getNeighbourCellsCount(cells, cRI - 1, cCI, _lCC, true, false)
    }
    
    return _lCC
}

const generateNewLifeCycleCells = pattern => {
    const cells = pattern.matrix
    const lCCG = [] // (new) life cycle cells generated
    const unB = 2 // underpopulation boundary
    const ovB = 3 // overcrowding boundary
    
    for(let i = 0; i < cells.length; i++) {

        lCCG[i] = []

        for(let j = 0; j < cells[i].length; j++) {
            const lCC = getNeighbourCellsCount(cells, i, j) // live Cell Count

            if(cells[i][j]) {
                // life cell case
                lCCG[i][j] = +(lCC === unB || lCC === ovB) // if statement is truthy get 1 otherwise 0
            }
            else {
                // dead cell case
                lCCG[i][j] = +(lCC === ovB) // if statement is truthy get 1 otherwise 0
            }
        }
    }

    pattern.matrix = lCCG

    return lCCG
}

// Blinker initial
buildCellPatterns('Blinker')
// Toad initial
buildCellPatterns('Toad')
// Toad initial
buildCellPatterns('Beacon')
// Pulsar initial
buildCellPatterns('Pulsar')
// Penta-decathlon initial
buildCellPatterns('Decathlon')

setInterval(() => {
    // Blinker
    generateNewLifeCycleCells(cellMatrix['Blinker'])
    buildCellPatterns('Blinker')
    // Toad
    generateNewLifeCycleCells(cellMatrix['Toad'])
    buildCellPatterns('Toad')
    // Beacon
    generateNewLifeCycleCells(cellMatrix['Beacon'])
    buildCellPatterns('Beacon')
    // Pulsar
    generateNewLifeCycleCells(cellMatrix['Pulsar'])
    buildCellPatterns('Pulsar')
    // Penta-decathlon
    generateNewLifeCycleCells(cellMatrix['Decathlon'])
    buildCellPatterns('Decathlon')
}, 1000)