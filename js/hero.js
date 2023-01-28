'use strict'

const LASER_SPEED = 80
var gHero = { pos: { i: 12, j: 5 }, isShoot: false }


function createHero(board) {

    board[gHero.pos.i][gHero.pos.j].gameObject = HERO

}

function onKeyUp(event) {
    var prevLocation = {}
    prevLocation.i = gHero.pos.i
    prevLocation.j = gHero.pos.j
    switch (event.key) {
        case 'ArrowLeft':
            if(gHero.pos.j < 1) return
            gHero.pos.j -= 1
            updateCell(gHero.pos, prevLocation, HERO)
            break;
            case 'ArrowRight':
            if(gHero.pos.j > gBoard.length - 2) return
            gHero.pos.j += 1
            updateCell(gHero.pos, prevLocation, HERO)
            break;
        case ' ':
            if (gHero.isShoot) return
            blinkLaser(gHero.pos)
        case 'KeyN':
            handleAlienHit(gHero.pos)
    }
}

function blinkLaser(pos) {
    var prevLocation = null
    var display = updateCell(pos, prevLocation, HERO)
    for (var i = 1; i <= pos.i; i++) {
        for (var j = 0; j <= pos.i; j++) {
            gHero.isShoot = true
            setTimeout(() => gHero.isShoot = false,800)

            var currRow = { i: display.i - i, j: display.j }
            if (currRow.j < 0 || currRow.j > gBoard[0].length) return
            if (gBoard[currRow.i][currRow.j].gameObject === ALIEN) {
                handleAlienHit(currRow)
                return
            }
        }
            var elCell = getElCell(currRow)
            elCell.innerHTML = LASER
            setTimeout(updateCell, 200, currRow)
            gHero.isShoot = false
    }
}