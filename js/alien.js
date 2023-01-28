'use strict'

var gAliensTopRowIdx
var gAliensBottomRowIdx
var gAlienLocation = []
var indicator = 0

function createAliens(board) {

    for (var i = 1; i <= ALIENS_ROW_COUNT; i++) {
        for (var j = 0; j < ALIENS_ROW_LENGTH; j++) {
            board[i][j].gameObject = ALIEN
            gAlienLocation.push({ i, j })
            
        }
    }
    return board
}

function handleAlienHit(pos) {

    gBoard[pos.i][pos.j].gameObject = null
    updateCell(pos)

    var posInIdx


    for (var i = 0; i <= gAlienLocation.length - 1; i++) {
        if (gAlienLocation[i].i === pos.i && gAlienLocation[i].j === pos.j) {
            posInIdx = i

            updateCell(gAlienLocation[posInIdx])
            gAlienLocation.splice(posInIdx, 1)

            
            // var alienNegs = negsCount(pos.i, pos.j)
            // console.log(alienNegs);
            gGame.aliensCount--
        
            gScore += 10
        
            chackGameOver()

        }
    }


    var elScore = document.querySelector('.score span')
    elScore.innerText = gScore
}

function onStopAlien() {
    var elBtn = document.querySelector('.freeze')

    if (gIsAlienFreeze) {
        gIsAlienFreeze = false
        gFreezeInterval = setInterval(moveAliens, 1000)
        elBtn.innerText = 'Freeze Aliens'
    } else {
        gIsAlienFreeze = true
        clearInterval(gFreezeInterval)
        elBtn.innerText = 'Un Freeze Aliens'
    }
}

function moveAliens() {
    if (!indicator) {
        shiftBoardRight()
    } else if (indicator === 1) {
        shiftBoardDown()
    } else if (indicator === 2) {
        shiftBoardLeft()
    }
}

function shiftBoardRight() {

    var rightestIdx = { i: 0, j: 0 }

    for (var j = gAlienLocation.length - 1; j >= 0; j--) {

        var location = {}
        location.i = gAlienLocation[j].i
        location.j = gAlienLocation[j].j

        gAlienLocation[j].j += 1

        updateCell(gAlienLocation[j], location, ALIEN)


        if (gAlienLocation[j].j > rightestIdx.j) {
            rightestIdx.i = gAlienLocation[j].i
            rightestIdx.j = gAlienLocation[j].j
        }

        // console.log(rightestIdx);
        // console.log(gAlienLocation[rightestIdx]);
    }
    if (rightestIdx.j >= gBoard[0].length - 1) {
        indicator++
        return
    }

}

function shiftBoardLeft() {

    for (var j = 0; j <= gAlienLocation.length - 1; j++) {

        var location = {}

        location.i = gAlienLocation[j].i
        location.j = gAlienLocation[j].j

        gAlienLocation[j].j--

        updateCell(gAlienLocation[j], location, ALIEN)

    }
    if (gAlienLocation[0].j === 0) {
        indicator = 0
        return
    }
}

function shiftBoardDown() {

    for (var j = gAlienLocation.length - 1; j >= 0; j--) {

        var location = {}

        location.i = gAlienLocation[j].i
        location.j = gAlienLocation[j].j

        gAlienLocation[j].i++

        updateCell(gAlienLocation[j], location, ALIEN)
    }
    indicator++
    chackGameOver()
    return
}


function negsCount(cellI, cellJ) {

    var negsCount = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            else if (gBoard[i][j].gameObject === ALIEN) negsCount++
        }
    }
    return negsCount
}