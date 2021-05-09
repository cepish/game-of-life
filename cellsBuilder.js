const buildCellPatterns = pattern => {
    if(pattern && typeof cellMatrix[pattern] === "object") {
        const { id, matrix } = cellMatrix[pattern]
        
        if(!id || !matrix || !matrix.length) {
            console.log('No pattern (id | matrix) have been provided.', id)
            return
        }

        const cellsNumber = matrix[0].length // 0 or any
        const cellWidthHeight = 13
        const borderWidth = 1
        const patternHolder = document.getElementById(id)

        patternHolder.innerHTML = ''
        patternHolder.style.maxWidth =  (cellWidthHeight + borderWidth * 2) * cellsNumber + 'px'
        
        const flatCellsArray = matrix.toString().split(',')

        flatCellsArray.forEach(cell => {
            const cellEl = document.createElement('div')

            cellEl.className = 'cell'
            cellEl.classList.add(+cell ? 'live' : 'dead')

            cellEl.style.width = cellWidthHeight + 'px'
            cellEl.style.height = cellWidthHeight + 'px'
            cellEl.style.border = 1 + 'px solid grey'

            patternHolder.appendChild(cellEl)
        })
    }
    else {
        console.log('Something went wrong. No patterns have been provided.')
    }
}
