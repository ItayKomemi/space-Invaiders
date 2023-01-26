'use strict'

var gAliensTopRowIdx
var gAliensBottomRowIdx
var gIsAlienFreeze = true
var gAlienLocation = []

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
    gGame.aliensCount--
    gScore += 10
    chackGameOver()

    var elScore = document.querySelector('.score span')
    elScore.innerText = gScore
}

function onStopAlien() {
    if (gIsAlienFreeze) {
        gIsAlienFreeze = false
        gFreezeInterval = setInterval(moveAliens, 1000, gBoard)
        console.log('unFreeze');
    } else {
        gIsAlienFreeze = true
        clearInterval(gFreezeInterval)
        console.log('freeze');
    }
}

function moveAliens(board) {

    var fromI = gAlienLocation[0].i
    var toI = gAlienLocation[gAlienLocation.length - 1].i

    shiftBoardRight(board, fromI, toI)
    // if (gAlienLocation[0].j < gBoard[0].length - 1) {
    // } else if (gAlienLocation[gAlienLocation.length].j > 13) {
    // shiftBoardLeft(board, fromI, toI)
    // }


}

function shiftBoardRight(board, fromI, toI) {

    for (var i = fromI; i <= toI; i++) {

        for (var j = gAlienLocation.length - 1; j >= 0; j--) {
            if (gAlienLocation[gAlienLocation.length - 1].j > gBoard[0].length - 1) {
                shiftBoardDown(board, fromI, toI)
                return
            }
            var location = {}
            location.i = gAlienLocation[j].i
            location.j = gAlienLocation[j].j

            gAlienLocation[j].j++

            console.log('gAlien location right',gAlienLocation[j]);
            console.log('location right',location);
            updateCell(gAlienLocation[j], location, ALIEN)
        }
    }
}

function shiftBoardLeft(board, fromI, toI) {

    for (var i = fromI; i <= toI; i++) {

        for (var j = 0; j <= gAlienLocation.length - 1; j++) {

            var location = {}
            if (gAlienLocation[0].j < 0) return

            location.i = gAlienLocation[j].i
            location.j = gAlienLocation[j].j
            gAlienLocation[j].j--
            console.log('gAlien location left',gAlienLocation[j]);
            console.log('location left',location);
            updateCell(gAlienLocation[j], location, ALIEN)
        }
    }
}

function shiftBoardDown(board, fromI, toI) {

    gAliensTopRowIdx = 1
    gAliensBottomRowIdx = board.length - 2

    for (var i = fromI; i <= toI; i++) {

        for (var j = gAlienLocation.length - 1; j >= 0; j--) {

            var location = {}

            if (gAlienLocation[j].i === gAliensBottomRowIdx) {
                chackGameOver()
            }else{
                shiftBoardLeft(board, fromI, toI)
            }

            location.i = gAlienLocation[j].i
            location.j = gAlienLocation[j].j

            gAlienLocation[j].i++

            console.log('gAlien location down',gAlienLocation[j]);
            console.log('location down',location);

            updateCell(gAlienLocation[j], location, ALIEN)
        }
    }
}

