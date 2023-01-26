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
            gHero.pos.j -= 1
            updateCell(gHero.pos, prevLocation, HERO)
            break;
        case 'ArrowRight':
            gHero.pos.j += 1
            updateCell(gHero.pos, prevLocation, HERO)
            break;
        case ' ':
            if (gHero.isShoot) return
            blinkLaser(gHero.pos)
    }
}

function blinkLaser(pos) {
    var prevLocation = null
    var display = updateCell(pos, prevLocation, HERO)
    gHero.isShoot = true
    for (var i = 0; i <= pos.i; i++) {
        if (i === 0) continue
        for (var j = 0; j <= pos.i; j++) {
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