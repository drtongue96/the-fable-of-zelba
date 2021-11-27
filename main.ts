enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const NPC = SpriteKind.create()
    export const House = SpriteKind.create()
    export const King = SpriteKind.create()
    export const Item = SpriteKind.create()
    export const Shmoblin = SpriteKind.create()
    export const HeartContainer = SpriteKind.create()
    export const Sword = SpriteKind.create()
    export const Arrow = SpriteKind.create()
    export const FireOoze = SpriteKind.create()
    export const All = SpriteKind.create()
    export const Bat = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const Ammo = SpriteKind.create()
    export const Orb = SpriteKind.create()
    export const Portal = SpriteKind.create()
    export const FireBall = SpriteKind.create()
    export const OrbsScreen = SpriteKind.create()
    export const Egg = SpriteKind.create()
    export const Cannon = SpriteKind.create()
    export const BombBlast = SpriteKind.create()
    export const NewWall = SpriteKind.create()
    export const Background = SpriteKind.create()
    export const Morph = SpriteKind.create()
    export const Wall = SpriteKind.create()
    export const Merchant = SpriteKind.create()
    export const Potion = SpriteKind.create()
    export const Gun = SpriteKind.create()
    export const Zelba = SpriteKind.create()
    export const Special = SpriteKind.create()
}
namespace StrProp {
    export const Name = StrProp.create()
    export const Text = StrProp.create()
}
namespace ConnectionKind {
    export const Door3 = ConnectionKind.create()
    export const Door4 = ConnectionKind.create()
    export const Door5 = ConnectionKind.create()
    export const Door6 = ConnectionKind.create()
    export const Door7 = ConnectionKind.create()
    export const NoDoor = ConnectionKind.create()
    export const Door8 = ConnectionKind.create()
}
function spriteInRange (spr1: Sprite, spr2: Sprite, range: number) {
    return distanceFormula(spr1.x, spr2.x, spr1.y, spr2.y) <= range
}
sprites.onOverlap(SpriteKind.BombBlast, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.fire, 100)
    damageMonster(otherSprite, sprite, false, false)
})
function setupLevel (level: number, tileX: number, tileY: number, save: boolean) {
    console.log("setupLevel")
    dink.setFlag(SpriteFlag.Invisible, false)
    scroller.scrollBackgroundWithSpeed(0, 0)
    currentLevel = level
    music.setTempo(120)
    color.FadeToBlack.startScreenEffect(200)
    tiles.loadMap(tilemapLst[level])
    if (tileX != 999) {
        tiles.placeOnTile(dink, tiles.getTileLocation(tileX, tileY))
    }
    levelStart = tiles.locationOfSprite(dink)
    story.cancelAllCutscenes()
    color.startFade(color.Black, color.originalPalette, 200)
    cleanUp()
    scene.setBackgroundImage(backgrounds[level])
    if (txtLst[currentLevel] != "") {
        story.startCutscene(function () {
            story.printDialog(txtLst[currentLevel], 80, 30, 20, 150)
        })
    }
    setTheScene(currentLevel, styleLst[level])
    if (save) {
        saveGame()
    }
}
function clearSave () {
    blockSettings.clear()
    game.reset()
}
function cleanUp () {
    console.log("cleanUp")
    for (let value of sprites.allOfKind(SpriteKind.Special)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.NPC)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.House)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Enemy)) {
        value4.destroy()
    }
    for (let value5 of sprites.allOfKind(SpriteKind.Item)) {
        value5.destroy()
    }
    for (let value6 of sprites.allOfKind(SpriteKind.Food)) {
        value6.destroy()
    }
    for (let value7 of sprites.allOfKind(SpriteKind.Ammo)) {
        value7.destroy()
    }
    for (let value7 of sprites.allOfKind(SpriteKind.FireBall)) {
        value7.destroy()
    }
    for (let value7 of sprites.allOfKind(SpriteKind.Orb)) {
        value7.destroy()
    }
    for (let value7 of sprites.allOfKind(SpriteKind.Portal)) {
        value7.destroy()
    }
    for (let value7 of sprites.allOfKind(SpriteKind.Cannon)) {
        value7.destroy()
    }
    for (let value7 of sprites.allOfKind(SpriteKind.NewWall)) {
        value7.destroy()
    }
    for (let value7 of sprites.allOfKind(SpriteKind.Wall)) {
        value7.destroy()
    }
    for (let value7 of sprites.allOfKind(SpriteKind.Gun)) {
        value7.destroy()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Orb, function (sprite, otherSprite) {
    if (currentLevel != 7) {
        console.log("overlap all orbs")
    } else {
    	
    }
    if (currentLevel == 10) {
        story.startCutscene(function () {
            otherSprite.destroy(effects.rings, 1000)
            myPortal = sprites.create(assets.image`sprPortal`, SpriteKind.Portal)
            tiles.placeOnTile(myPortal, tiles.getTileLocation(0, 3))
            tiles.setWallAt(tiles.getTileLocation(0, 3), false)
            animation.runImageAnimation(
            myPortal,
            assets.animation`animPortal`,
            200,
            true
            )
            music.playMelody("C - G - C5 B C5 C5 ", 400)
            story.printDialog("You got the Forest ORB.  Take it to the Temple of Lime for an extra heart.", 80, 40, 50, 150)
            sprites.setDataNumber(dink, "numOrbs", sprites.readDataNumber(dink, "numOrbs") + 1)
            sprites.setDataNumber(dink, "hasGreenOrb", 1)
        })
    }
    if (currentLevel == 11) {
        story.startCutscene(function () {
            otherSprite.destroy(effects.rings, 1000)
            myPortal = sprites.create(assets.image`sprPortal`, SpriteKind.Portal)
            tiles.placeOnTile(myPortal, tiles.getTileLocation(1, 4))
            tiles.setWallAt(tiles.getTileLocation(1, 4), false)
            animation.runImageAnimation(
            myPortal,
            assets.animation`animPortal`,
            200,
            true
            )
            music.playMelody("C - G - C5 B C5 C5 ", 400)
            story.printDialog("You got the WATER ORB.  Take it to the Temple of Lime for an extra heart.", 80, 40, 50, 150)
        })
        sprites.setDataNumber(dink, "numOrbs", sprites.readDataNumber(dink, "numOrbs") + 1)
        sprites.setDataNumber(dink, "hasBlueOrb", 1)
    }
    if (currentLevel == 12) {
        story.startCutscene(function () {
            otherSprite.destroy(effects.rings, 1000)
            myPortal = sprites.create(assets.image`sprPortalFlat`, SpriteKind.Portal)
            tiles.placeOnTile(myPortal, tiles.getTileLocation(14, 12))
            mySprite = sprites.create(assets.image`sprFallBitL`, SpriteKind.Portal)
            tiles.placeOnTile(mySprite, tiles.getTileLocation(14, 14))
            mySprite = sprites.create(assets.image`sprFallCornerL`, SpriteKind.Portal)
            tiles.placeOnTile(mySprite, tiles.getTileLocation(13, 14))
            tiles.setWallAt(tiles.getTileLocation(13, 14), true)
            animation.runImageAnimation(
            myPortal,
            assets.animation`animPortalFlat`,
            200,
            true
            )
            music.playMelody("C - G - C5 B C5 C5 ", 400)
            story.printDialog("You got the DESERT ORB.  Take it to the Temple of Lime for an extra heart.", 80, 40, 50, 150)
        })
        sprites.setDataNumber(dink, "numOrbs", sprites.readDataNumber(dink, "numOrbs") + 1)
        sprites.setDataNumber(dink, "hasYellowOrb", 1)
    }
    if (currentLevel == 13) {
        story.startCutscene(function () {
            otherSprite.destroy(effects.rings, 1000)
            myPortal = sprites.create(assets.image`sprPortal`, SpriteKind.Portal)
            tiles.placeOnTile(myPortal, tiles.getTileLocation(9, 0))
            tiles.setWallAt(tiles.getTileLocation(9, 0), false)
            animation.runImageAnimation(
            myPortal,
            assets.animation`animPortal`,
            200,
            true
            )
            music.playMelody("C - G - C5 B C5 C5 ", 400)
            story.printDialog("You got the FIRE ORB.  Take it to the Temple of Lime for an extra heart.", 80, 40, 50, 150)
        })
        sprites.setDataNumber(dink, "numOrbs", sprites.readDataNumber(dink, "numOrbs") + 1)
        sprites.setDataNumber(dink, "hasRedOrb", 1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Item, function (sprite, otherSprite) {
    if (currentLevel == 3) {
        scene.cameraShake(2, 200)
        otherSprite.destroy()
        music.playMelody("E E G - G G B C5 ", 500)
        game.showLongText("You got the bow!", DialogLayout.Bottom)
        game.showLongText("Press B to shoot", DialogLayout.Bottom)
        sprites.setDataNumber(dink, "hasBow", 1)
        sprites.setDataNumber(dink, "numArrows", 10)
    }
    if (currentLevel == 12) {
        otherSprite.destroy()
        music.playMelody("E E G - G G B C5 ", 500)
        sprites.setDataNumber(dink, "numBombs", 5)
    }
})
function stopTalking () {
    talking = false
    controller.moveSprite(dink, 50, 50)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (story.isMenuOpen()) {
    	
    } else {
        transitioning = false
        lastDirection = 0
        if (platformFlag) {
            lastDirection = 1
            if (dink.isHittingTile(CollisionDirection.Bottom)) {
                if (dink.vy == 0) {
                    dink.vy = -100
                    playMusic("bounce")
                }
            }
        } else {
        	
        }
    }
})
function playMusic (song: string) {
    if (song == "shootarrow") {
        music.setTempo(138)
        music.playTone(554, music.beat(BeatFraction.Eighth))
        music.playTone(698, music.beat(BeatFraction.Sixteenth))
        music.playTone(587, music.beat(BeatFraction.Sixteenth))
        music.playTone(494, music.beat(BeatFraction.Sixteenth))
        music.playTone(392, music.beat(BeatFraction.Sixteenth))
        music.playTone(330, music.beat(BeatFraction.Sixteenth))
        music.playTone(262, music.beat(BeatFraction.Sixteenth))
    } else if (song == "paco") {
        music.setTempo(176)
        music.playTone(220, music.beat(BeatFraction.Half))
        music.playTone(247, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(277, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(370, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(330, music.beat(BeatFraction.Breve))
    } else if (song == "shicken") {
        music.setTempo(160)
        timer.background(function () {
            music.playTone(523, music.beat(BeatFraction.Quarter))
            music.rest(music.beat(BeatFraction.Quarter))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(330, music.beat(BeatFraction.Half))
            music.playTone(349, music.beat(BeatFraction.Half))
            music.playTone(370, music.beat(BeatFraction.Half))
            music.playTone(392, music.beat(BeatFraction.Half))
            music.playTone(440, music.beat(BeatFraction.Half))
            music.playTone(494, music.beat(BeatFraction.Half))
            music.playTone(523, music.beat(BeatFraction.Quarter))
            music.rest(music.beat(BeatFraction.Quarter))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(370, music.beat(BeatFraction.Half))
            music.playTone(392, music.beat(BeatFraction.Quarter))
        })
        timer.background(function () {
            music.playTone(165, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(220, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(147, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(196, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(139, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(185, music.beat(BeatFraction.Half))
            music.playTone(196, music.beat(BeatFraction.Quarter))
            music.rest(music.beat(BeatFraction.Quarter))
            music.playTone(131, music.beat(BeatFraction.Double))
        })
    } else if (song == "gurg") {
        music.setTempo(192)
        music.playTone(392, music.beat(BeatFraction.Quarter))
        music.rest(music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Quarter))
        music.playTone(392, music.beat(BeatFraction.Quarter))
        music.rest(music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Quarter))
        music.playTone(392, music.beat(BeatFraction.Whole))
        music.playTone(262, music.beat(BeatFraction.Half))
        music.playTone(294, music.beat(BeatFraction.Half))
        music.playTone(330, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(294, music.beat(BeatFraction.Half))
        music.rest(music.beat(BeatFraction.Half))
        music.playTone(262, music.beat(BeatFraction.Double))
    } else if (song == "baldhead") {
        music.setTempo(100)
        timer.background(function () {
            music.playTone(554, music.beat(BeatFraction.Half))
            music.playTone(659, music.beat(BeatFraction.Half))
            music.playTone(659, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Quarter))
            music.playTone(740, music.beat(BeatFraction.Quarter))
            music.playTone(659, music.beat(BeatFraction.Half))
            music.playTone(587, music.beat(BeatFraction.Half))
            music.playTone(554, music.beat(BeatFraction.Double))
        })
        timer.background(function () {
            music.playTone(277, music.beat(BeatFraction.Half))
            music.playTone(330, music.beat(BeatFraction.Half))
            music.playTone(330, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Quarter))
            music.playTone(370, music.beat(BeatFraction.Quarter))
            music.playTone(330, music.beat(BeatFraction.Half))
            music.playTone(294, music.beat(BeatFraction.Half))
            music.playTone(277, music.beat(BeatFraction.Double))
        })
    } else if (song == "bounce") {
        music.setTempo(320)
        music.playTone(294, music.beat(BeatFraction.Triplet))
        music.playTone(220, music.beat(BeatFraction.Triplet))
        music.playTone(277, music.beat(BeatFraction.Triplet))
        music.playTone(311, music.beat(BeatFraction.Quarter))
        music.playTone(370, music.beat(BeatFraction.Quarter))
    } else if (song == "gammon") {
        music.setTempo(120)
        timer.background(function () {
            music.playTone(233, music.beat(BeatFraction.Double))
            music.playTone(247, music.beat(BeatFraction.Triplet))
            music.playTone(208, music.beat(BeatFraction.Triplet))
            music.playTone(370, music.beat(BeatFraction.Triplet))
            music.playTone(330, music.beat(BeatFraction.Whole))
            music.playTone(277, music.beat(BeatFraction.Whole))
            music.playTone(294, music.beat(BeatFraction.Whole))
            music.playTone(233, music.beat(BeatFraction.Whole))
            music.playTone(247, music.beat(BeatFraction.Double))
        })
        timer.background(function () {
            music.playTone(175, music.beat(BeatFraction.Double))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(233, music.beat(BeatFraction.Whole))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(208, music.beat(BeatFraction.Whole))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(175, music.beat(BeatFraction.Double))
        })
    } else if (song == "death") {
        timer.background(function () {
            music.setTempo(112)
            music.playTone(139, music.beat(BeatFraction.Triplet))
            music.playTone(139, music.beat(BeatFraction.Triplet))
            music.changeTempoBy(-42)
            music.playTone(139, music.beat(BeatFraction.Triplet))
            music.playTone(208, music.beat(BeatFraction.Half))
            music.playTone(175, music.beat(BeatFraction.Half))
            music.playTone(196, music.beat(BeatFraction.Double))
        })
        timer.background(function () {
            music.playTone(277, music.beat(BeatFraction.Triplet))
            music.playTone(277, music.beat(BeatFraction.Triplet))
            music.playTone(277, music.beat(BeatFraction.Triplet))
            music.playTone(262, music.beat(BeatFraction.Quarter))
            music.rest(music.beat(BeatFraction.Quarter))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(247, music.beat(BeatFraction.Double))
        })
    } else if (song == "intro") {
        music.setTempo(192)
        music.rest(music.beat(BeatFraction.Whole))
        timer.background(function () {
            music.playTone(554, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(554, music.beat(BeatFraction.Half))
            music.playTone(554, music.beat(BeatFraction.Breve))
            music.playTone(554, music.beat(BeatFraction.Half))
            music.playTone(554, music.beat(BeatFraction.Whole))
            music.playTone(554, music.beat(BeatFraction.Whole))
            music.playTone(831, music.beat(BeatFraction.Whole))
            music.playTone(831, music.beat(BeatFraction.Half))
            music.playTone(831, music.beat(BeatFraction.Breve))
            music.rest(music.beat(BeatFraction.Breve))
            music.rest(music.beat(BeatFraction.Half))
        })
        timer.background(function () {
            music.playTone(123.47, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(123.47, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(139, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(139, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(156, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(156, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(175, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(175, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(110, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(110, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(123.47, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(123.47, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(139, music.beat(BeatFraction.Double))
        })
        timer.background(function () {
            music.playTone(349, music.beat(BeatFraction.Whole))
            music.playTone(370, music.beat(BeatFraction.Whole))
            music.playTone(349, music.beat(BeatFraction.Whole))
            music.playTone(370, music.beat(BeatFraction.Whole))
            music.playTone(349, music.beat(BeatFraction.Whole))
            music.playTone(370, music.beat(BeatFraction.Whole))
            music.playTone(349, music.beat(BeatFraction.Whole))
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(330, music.beat(BeatFraction.Double))
            music.playTone(311, music.beat(BeatFraction.Whole))
            music.playTone(349, music.beat(BeatFraction.Double))
        })
    } else if (song == "gammondeath") {
        music.setTempo(120)
        timer.background(function () {
            music.rest(music.beat(BeatFraction.Whole))
            music.playTone(147, music.beat(BeatFraction.Triplet))
            music.playTone(147, music.beat(BeatFraction.Triplet))
            music.playTone(147, music.beat(BeatFraction.Triplet))
            music.playTone(147, music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.rest(music.beat(BeatFraction.Half))
            music.playTone(147, music.beat(BeatFraction.Half))
            music.playTone(175, music.beat(BeatFraction.Double))
            music.playTone(196, music.beat(BeatFraction.Double))
            music.playTone(185, music.beat(BeatFraction.Breve))
        })
    } else {
        timer.background(function () {
            music.playTone(294, music.beat(BeatFraction.Whole))
            music.rest(music.beat(BeatFraction.Whole))
            music.rest(music.beat(BeatFraction.Double))
            music.playTone(233, music.beat(BeatFraction.Double))
            music.playTone(262, music.beat(BeatFraction.Double))
            music.playTone(294, music.beat(BeatFraction.Breve))
        })
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (story.isMenuOpen()) {
    	
    } else {
        if (sprites.readDataNumber(dink, "hasBow") == 1) {
            if (sprites.readDataNumber(dink, "numArrows") > 0) {
                if (shootingArrow == 0) {
                    sprites.setDataNumber(dink, "numArrows", sprites.readDataNumber(dink, "numArrows") - 1)
                    if (lastDirection == 0) {
                        arrow = sprites.createProjectileFromSprite(assets.image`sprRArrowUp`, dink, 0, -150)
                    } else if (lastDirection == 1) {
                        arrow = sprites.createProjectileFromSprite(assets.image`sprRArrowRight`, dink, 150, 0)
                    } else if (lastDirection == 2) {
                        arrow = sprites.createProjectileFromSprite(assets.image`sprRArrowDown`, dink, 0, 150)
                    } else {
                        arrow = sprites.createProjectileFromSprite(assets.image`sprRArrowLeft`, dink, -150, 0)
                    }
                    playMusic("shootarrow")
                    shootingArrow = 1
                }
                timer.after(300, function () {
                    shootingArrow = 0
                })
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tSandOuch`, function (sprite, location) {
    dink.setFlag(SpriteFlag.GhostThroughTiles, true)
    damagePlayer(sprite, false)
    timer.after(1000, function () {
        dink.setFlag(SpriteFlag.GhostThroughTiles, false)
        backToStart(currentLevel)
    })
})
// Initialize the player's data
function initializePlayer () {
    maxHealth = 10
    dink = sprites.create(assets.image`sprDink0`, SpriteKind.Player)
    dink.setFlag(SpriteFlag.Invisible, true)
    sprites.setDataNumber(dink, "swordDamage", 1)
    sprites.setDataNumber(dink, "hasBow", 1)
    sprites.setDataNumber(dink, "hasGreenOrb", 1)
    sprites.setDataNumber(dink, "hasBlueOrb", 1)
    sprites.setDataNumber(dink, "hasYellowOrb", 1)
    sprites.setDataNumber(dink, "hasRedOrb", 1)
    sprites.setDataNumber(dink, "numArrows", 30)
    sprites.setDataNumber(dink, "maxArrows", 30)
    sprites.setDataNumber(dink, "numOrbs", 4)
    sprites.setDataNumber(dink, "gravity", 400)
    sprites.setDataNumber(dink, "invincibilityPeriod", 2000)
    sprites.setDataNumber(dink, "numBombs", 0)
    sprites.setDataNumber(dink, "hasPotion", 0)
    playerLife = 10
    sword = sprites.create(assets.image`sprBlank`, SpriteKind.Sword)
    arrow = sprites.create(assets.image`sprBlank`, SpriteKind.Arrow)
    dink.z = 10
    sword.z = 5
    scene.cameraFollowSprite(dink)
    characterAnimations.loopFrames(
    dink,
    assets.animation`animDinkRight`,
    200,
    characterAnimations.rule(Predicate.FacingRight, Predicate.Moving)
    )
    characterAnimations.loopFrames(
    dink,
    assets.animation`animDinkLeft`,
    200,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.Moving)
    )
    characterAnimations.loopFrames(
    dink,
    assets.animation`animDinkIdleUp`,
    200,
    characterAnimations.rule(Predicate.FacingUp, Predicate.Moving)
    )
    characterAnimations.loopFrames(
    dink,
    assets.animation`animDinkIdleUp`,
    200,
    characterAnimations.rule(Predicate.FacingUp, Predicate.Moving)
    )
    characterAnimations.loopFrames(
    dink,
    assets.animation`animDinkIdleR`,
    300,
    characterAnimations.rule(Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    dink,
    assets.animation`animDinkIdleR`,
    300,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    dink,
    assets.animation`animDinkIdleL`,
    300,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    dink,
    assets.animation`animDinkUp0`,
    300,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingUp)
    )
    characterAnimations.loopFrames(
    dink,
    assets.animation`animDinkIdleDown`,
    300,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingDown)
    )
}
function doWalk () {
    console.log("doWalk")
    if (lastDirection == 0) {
        animation.runImageAnimation(
        dink,
        assets.animation`animDinkIdleUp`,
        200,
        true
        )
    } else if (lastDirection == 1) {
        animation.runImageAnimation(
        dink,
        assets.animation`animDinkRight`,
        200,
        true
        )
    } else if (lastDirection == 2) {
        animation.runImageAnimation(
        dink,
        assets.animation`animDinkDown`,
        200,
        true
        )
    } else if (lastDirection == 3) {
        animation.runImageAnimation(
        dink,
        assets.animation`animDinkLeft`,
        200,
        true
        )
    } else {
        animation.runImageAnimation(
        dink,
        assets.animation`animDinkIdleR`,
        100,
        true
        )
    }
    timer.after(500, function () {
        transitioning = false
    })
}
function spawnMonsters () {
    for (let value of tiles.getTilesByType(tiles.util.object4)) {
        myEnemy = sprites.create(assets.image`Shmoblin`, SpriteKind.Enemy)
        tiles.placeOnTile(myEnemy, value)
        sprites.setDataNumber(myEnemy, "id", monsterId)
        sprites.setDataString(myEnemy, "monster", "shmoblin")
        sprites.setDataString(myEnemy, "talk", "!")
        sprites.setDataNumber(myEnemy, "damage", 1)
        sprites.setDataNumber(myEnemy, "health", 2)
        sprites.setDataNumber(myEnemy, "followDistance", 64)
        sprites.setDataNumber(myEnemy, "speed", 20)
        sprites.setDataNumber(myEnemy, "invincible", 0)
        if (platformFlag) {
            tiles.setTileAt(value, assets.tile`transparency16`)
            myEnemy.ay = 300
        }
        monsterId += 1
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`animShmoblinR`,
        200,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`animShmoblinL`,
        200,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`animShmoblinR`,
        200,
        characterAnimations.rule(Predicate.NotMoving)
        )
    }
    for (let value of tiles.getTilesByType(tiles.util.object6)) {
        myEnemy = sprites.create(assets.image`FireOoze`, SpriteKind.Enemy)
        tiles.placeOnTile(myEnemy, value)
        sprites.setDataNumber(myEnemy, "id", monsterId)
        sprites.setDataString(myEnemy, "monster", "fire ooze")
        sprites.setDataString(myEnemy, "talk", "!")
        sprites.setDataNumber(myEnemy, "damage", 2)
        sprites.setDataNumber(myEnemy, "health", 2)
        sprites.setDataNumber(myEnemy, "followDistance", 64)
        sprites.setDataNumber(myEnemy, "speed", 20)
        sprites.setDataNumber(myEnemy, "invincible", 0)
        if (platformFlag) {
            tiles.setTileAt(value, assets.tile`transparency16`)
        }
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`animFireOozeRight`,
        200,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`animFireOozeLeft`,
        200,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`animFireOozeRight`,
        200,
        characterAnimations.rule(Predicate.NotMoving)
        )
        monsterId += 1
    }
    for (let value of tiles.getTilesByType(tiles.util.object12)) {
        myEnemy = sprites.create(assets.image`sprBat`, SpriteKind.Enemy)
        tiles.placeOnTile(myEnemy, value)
        sprites.setDataNumber(myEnemy, "id", monsterId)
        sprites.setDataString(myEnemy, "monster", "bat")
        sprites.setDataString(myEnemy, "talk", "")
        sprites.setDataNumber(myEnemy, "damage", 2)
        sprites.setDataNumber(myEnemy, "health", 2)
        sprites.setDataNumber(myEnemy, "followDistance", 64)
        sprites.setDataNumber(myEnemy, "speed", 30)
        sprites.setDataNumber(myEnemy, "invincible", 0)
        if (platformFlag) {
            tiles.setTileAt(value, assets.tile`transparency16`)
        }
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`animBatRight`,
        150,
        characterAnimations.rule(Predicate.NotMoving)
        )
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`animBatRight`,
        150,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`animBatLeft`,
        150,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        monsterId += 1
    }
    for (let value of tiles.getTilesByType(tiles.util.object14)) {
        myEnemy = sprites.create(assets.image`sprGhost`, SpriteKind.Enemy)
        tiles.placeOnTile(myEnemy, value)
        sprites.setDataNumber(myEnemy, "id", monsterId)
        sprites.setDataString(myEnemy, "monster", "ghost")
        sprites.setDataString(myEnemy, "talk", "boo")
        sprites.setDataNumber(myEnemy, "damage", 2)
        sprites.setDataNumber(myEnemy, "health", 2)
        sprites.setDataNumber(myEnemy, "followDistance", 64)
        sprites.setDataNumber(myEnemy, "speed", 20)
        sprites.setDataNumber(myEnemy, "invincible", 0)
        if (platformFlag) {
            tiles.setTileAt(value, assets.tile`transparency16`)
            myEnemy.ay = 300
        }
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`animGhostRight`,
        200,
        characterAnimations.rule(Predicate.NotMoving)
        )
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`animGhostRight`,
        200,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`animGhostLeft`,
        200,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        monsterId += 1
    }
    for (let value of tiles.getTilesByType(assets.tile`tFrog`)) {
        myEnemy = sprites.create(assets.image`sprFrog`, SpriteKind.Enemy)
        tiles.placeOnTile(myEnemy, value)
        sprites.setDataNumber(myEnemy, "id", monsterId)
        sprites.setDataString(myEnemy, "monster", "froggy")
        sprites.setDataString(myEnemy, "talk", "beh")
        sprites.setDataNumber(myEnemy, "damage", 2)
        sprites.setDataNumber(myEnemy, "health", 3)
        sprites.setDataNumber(myEnemy, "followDistance", 64)
        sprites.setDataNumber(myEnemy, "speed", 30)
        sprites.setDataNumber(myEnemy, "invincible", 0)
        if (platformFlag) {
            tiles.setTileAt(value, assets.tile`transparency16`)
            myEnemy.ay = 300
        }
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`animFrogRight`,
        200,
        characterAnimations.rule(Predicate.NotMoving)
        )
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`animFrogRight`,
        200,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        myEnemy,
        assets.animation`animFrogLeft`,
        200,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        monsterId += 1
    }
    for (let value of tiles.getTilesByType(assets.tile`tmGurg`)) {
        myGurg = sprites.create(assets.image`sprGurg`, SpriteKind.Enemy)
        tiles.placeOnTile(myGurg, value)
        sprites.setDataNumber(myGurg, "id", monsterId)
        sprites.setDataString(myGurg, "monster", "gurg")
        sprites.setDataString(myGurg, "talk", "kmmphh")
        sprites.setDataNumber(myGurg, "damage", 1)
        sprites.setDataNumber(myGurg, "health", 8)
        sprites.setDataNumber(myGurg, "followDistance", 80)
        sprites.setDataNumber(myGurg, "speed", 30)
        sprites.setDataNumber(myGurg, "invincible", 0)
        characterAnimations.loopFrames(
        myGurg,
        assets.animation`animGurgR`,
        200,
        characterAnimations.rule(Predicate.NotMoving)
        )
        characterAnimations.loopFrames(
        myGurg,
        assets.animation`animGurgR`,
        200,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        myGurg,
        assets.animation`animGurgL`,
        200,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        monsterId += 1
    }
    for (let value of tiles.getTilesByType(assets.tile`tmPaco`)) {
        myPaco = sprites.create(assets.image`sprPacoPaco`, SpriteKind.Enemy)
        tiles.placeOnTile(myPaco, value)
        sprites.setDataNumber(myPaco, "id", monsterId)
        sprites.setDataString(myPaco, "monster", "paco")
        sprites.setDataString(myPaco, "talk", "Ehhnn")
        sprites.setDataNumber(myPaco, "damage", 1)
        sprites.setDataNumber(myPaco, "health", 2)
        sprites.setDataNumber(myPaco, "followDistance", 0)
        sprites.setDataNumber(myPaco, "speed", 35)
        sprites.setDataNumber(myPaco, "invincible", 1)
        sprites.setDataNumber(myPaco, "numEyes", 2)
        sprites.setDataNumber(myPaco, "isShooting", 1)
        myPaco.vx = sprites.readDataNumber(myPaco, "speed")
        animation.runImageAnimation(
        myPaco,
        assets.animation`myAnim1`,
        200,
        true
        )
        monsterId += 1
        myLeftEye = sprites.create(assets.image`sprEye`, SpriteKind.Enemy)
        tiles.placeOnTile(myLeftEye, value)
        sprites.setDataNumber(myLeftEye, "id", monsterId)
        sprites.setDataString(myLeftEye, "monster", "pacolefteye")
        sprites.setDataString(myLeftEye, "talk", "Ehhnn")
        sprites.setDataNumber(myLeftEye, "damage", 1)
        sprites.setDataNumber(myLeftEye, "health", 2)
        sprites.setDataNumber(myLeftEye, "followDistance", 0)
        sprites.setDataNumber(myLeftEye, "speed", 30)
        sprites.setDataNumber(myLeftEye, "invincible", 0)
        animation.runImageAnimation(
        myLeftEye,
        assets.animation`animPacoEye`,
        400,
        true
        )
        monsterId += 1
        myRightEye = sprites.create(assets.image`sprEye`, SpriteKind.Enemy)
        tiles.placeOnTile(myRightEye, value)
        sprites.setDataNumber(myRightEye, "id", monsterId)
        sprites.setDataString(myRightEye, "monster", "pacorighteye")
        sprites.setDataString(myRightEye, "talk", "Ehhnn")
        sprites.setDataNumber(myRightEye, "damage", 1)
        sprites.setDataNumber(myRightEye, "health", 2)
        sprites.setDataNumber(myRightEye, "followDistance", 0)
        sprites.setDataNumber(myRightEye, "speed", 30)
        sprites.setDataNumber(myRightEye, "invincible", 0)
        animation.runImageAnimation(
        myRightEye,
        assets.animation`animPacoEye`,
        400,
        true
        )
        monsterId += 1
        setEyePosition()
    }
    for (let value of tiles.getTilesByType(assets.tile`tShicken`)) {
        myShicken = sprites.create(assets.image`sprShicken`, SpriteKind.Enemy)
        tiles.placeOnTile(myShicken, value)
        sprites.setDataNumber(myShicken, "id", monsterId)
        sprites.setDataString(myShicken, "monster", "shicken")
        sprites.setDataString(myShicken, "talk", "bok")
        sprites.setDataNumber(myShicken, "damage", 1)
        sprites.setDataNumber(myShicken, "health", 4)
        sprites.setDataNumber(myShicken, "followDistance", 0)
        sprites.setDataNumber(myShicken, "speed", 40)
        sprites.setDataNumber(myShicken, "invincible", 1)
        sprites.setDataNumber(myShicken, "isShooting", 1)
        myShicken.vx = sprites.readDataNumber(myShicken, "speed") * -1
        if (platformFlag) {
            tiles.setTileAt(value, assets.tile`transparency16`)
        }
        characterAnimations.loopFrames(
        myShicken,
        assets.animation`animShickenRight`,
        300,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        myShicken,
        assets.animation`animShickenLeft`,
        300,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        monsterId += 1
        myBelly = sprites.create(assets.image`sprShickenBelly`, SpriteKind.Enemy)
        tiles.placeOnTile(myBelly, value)
        sprites.setDataNumber(myBelly, "id", monsterId)
        sprites.setDataString(myBelly, "monster", "shickenbelly")
        sprites.setDataString(myBelly, "talk", "bok")
        sprites.setDataNumber(myBelly, "damage", 1)
        sprites.setDataNumber(myBelly, "health", 4)
        sprites.setDataNumber(myBelly, "followDistance", 0)
        sprites.setDataNumber(myBelly, "speed", 40)
        sprites.setDataNumber(myBelly, "invincible", 0)
        monsterId += 1
        setBellyPosition()
    }
    for (let value of tiles.getTilesByType(assets.tile`tBald`)) {
        myBald = sprites.create(assets.image`sprBaldHead`, SpriteKind.Enemy)
        myBald.z = 5
        myBald.setPosition(32, 32)
        sprites.setDataNumber(myBald, "id", monsterId)
        sprites.setDataString(myBald, "monster", "bald")
        sprites.setDataString(myBald, "talk", "klonk")
        sprites.setDataNumber(myBald, "damage", 2)
        sprites.setDataNumber(myBald, "health", 5)
        sprites.setDataNumber(myBald, "followDistance", 0)
        sprites.setDataNumber(myBald, "speed", 30)
        sprites.setDataNumber(myBald, "invincible", 1)
        sprites.setDataNumber(myBald, "isShooting", 0)
        sprites.setDataNumber(myBald, "isVisible", 0)
        monsterId += 1
        myEnemy = sprites.create(assets.image`sprLavaFloor`, SpriteKind.Wall)
        myEnemy.setPosition(72, 48)
        sprites.setDataNumber(myEnemy, "id", monsterId)
        sprites.setDataString(myEnemy, "monster", "floor")
        sprites.setDataString(myEnemy, "talk", "")
        sprites.setDataNumber(myEnemy, "damage", 2)
        sprites.setDataNumber(myEnemy, "health", 5)
        sprites.setDataNumber(myEnemy, "followDistance", 0)
        sprites.setDataNumber(myEnemy, "speed", 0)
        sprites.setDataNumber(myEnemy, "invincible", 1)
        animation.runImageAnimation(
        myEnemy,
        assets.animation`animLavaFloor`,
        500,
        true
        )
        monsterId += 1
    }
    for (let value of tiles.getTilesByType(assets.tile`tGunL`)) {
        myGun = sprites.create(assets.image`sprGunLeft`, SpriteKind.Gun)
        tiles.placeOnTile(myGun, value)
        sprites.setDataNumber(myGun, "id", monsterId)
        sprites.setDataString(myGun, "monster", "gunleft")
        sprites.setDataString(myGun, "talk", "")
        sprites.setDataNumber(myGun, "damage", 1)
        sprites.setDataNumber(myGun, "health", 5)
        sprites.setDataNumber(myGun, "followDistance", 0)
        sprites.setDataNumber(myGun, "speed", 50)
        sprites.setDataNumber(myGun, "invincible", 1)
        sprites.setDataNumber(myGun, "isShooting", 1)
        sprites.setDataNumber(myGun, "isVisible", 1)
        monsterId += 1
    }
    for (let value of tiles.getTilesByType(assets.tile`tGunR`)) {
        myGun = sprites.create(assets.image`sprGunRight`, SpriteKind.Gun)
        tiles.placeOnTile(myGun, value)
        sprites.setDataNumber(myGun, "id", monsterId)
        sprites.setDataString(myGun, "monster", "gunright")
        sprites.setDataString(myGun, "talk", "")
        sprites.setDataNumber(myGun, "damage", 1)
        sprites.setDataNumber(myGun, "health", 5)
        sprites.setDataNumber(myGun, "followDistance", 0)
        sprites.setDataNumber(myGun, "speed", 50)
        sprites.setDataNumber(myGun, "invincible", 1)
        sprites.setDataNumber(myGun, "isShooting", 1)
        sprites.setDataNumber(myGammon, "isVisible", 1)
        monsterId += 1
    }
    tiles.replaceAllTiles(assets.tile`tGunL`, assets.tile`tFloorGrey`)
    tiles.replaceAllTiles(assets.tile`tGunR`, assets.tile`tFloorGrey`)
    for (let value of tiles.getTilesByType(assets.tile`tBoss`)) {
        myGammon = sprites.create(assets.image`sprGammon`, SpriteKind.Enemy)
        myGammon.setPosition(32, 48)
        sprites.setDataNumber(myGammon, "id", monsterId)
        sprites.setDataString(myGammon, "monster", "gammon")
        sprites.setDataString(myGammon, "talk", "oink")
        sprites.setDataNumber(myGammon, "damage", 2)
        sprites.setDataNumber(myGammon, "health", 6)
        sprites.setDataNumber(myGammon, "followDistance", 0)
        sprites.setDataNumber(myGammon, "speed", 40)
        sprites.setDataNumber(myGammon, "invincible", 1)
        sprites.setDataNumber(myGammon, "isShooting", 0)
        sprites.setDataNumber(myGammon, "isVisible", 1)
        monsterId += 1
        statusbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
        statusbar.attachToSprite(myGammon)
        statusbar.max = sprites.readDataNumber(myGammon, "health")
        statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, false)
        statusbar.setOffsetPadding(0, 3)
        characterAnimations.loopFrames(
        myGammon,
        assets.animation`animGammonR`,
        200,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        myGammon,
        assets.animation`animGammonL`,
        200,
        characterAnimations.rule(Predicate.MovingLeft)
        )
    }
}
sprites.onOverlap(SpriteKind.Sword, SpriteKind.FireBall, function (sprite, otherSprite) {
    if (sprites.readDataNumber(otherSprite, "pingpong") == 1) {
        console.log("sword hit fireball")
        otherSprite.destroy()
        myImage = assets.image`sprFireBallGammon`
        createFollowingProjectile(myGammon, sword, 60, 0, 0, myImage, 1)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tRedGem`, function (sprite, location) {
    console.log("overlap red")
    if (sprites.readDataNumber(dink, "hasRedOrb") == 1) {
        tiles.replaceAllTiles(assets.tile`tRedGem`, assets.tile`tRedOrbSpot`)
        if (redPlaced) {
        	
        } else {
            myOrb = sprites.create(assets.image`sprRedGem`, SpriteKind.Orb)
            tiles.placeOnTile(myOrb, tiles.getTileLocation(9, 2))
            redPlaced = true
            myHeartContainer = sprites.create(img`
                ....................
                ....................
                ....................
                ....................
                ....................
                ......cccc.cccc.....
                .....cc44ccc44cc....
                ....cc4444c4444cc...
                ....cc444444444cc...
                ....cc444444444cc...
                .....cc4444444cc....
                ......cc44444cc.....
                .......cc444cc......
                ........cc4cc.......
                .........ccc........
                ..........c.........
                ....................
                ....................
                ....................
                ....................
                `, SpriteKind.HeartContainer)
            tiles.placeOnTile(myHeartContainer, tiles.getTileLocation(12, 2))
            music.playMelody("C - E - C C5 C5 - ", 500)
            story.startCutscene(function () {
                doCutScene(4)
                timer.after(4000, function () {
                    story.printDialog("Take this heart container before it disappears!", 80, 40, 50, 150)
                })
            })
        }
    }
})
function backToStart (level: number) {
    animation.runImageAnimation(
    dink,
    assets.animation`animDeath`,
    200,
    false
    )
    tiles.placeOnTile(dink, levelStart)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (playerChoosing) {
    	
    } else {
        if (currentLevel == 0 || (currentLevel == 2 || currentLevel == 16)) {
            if (!(talking)) {
                if (dink.overlapsWith(myNPC1)) {
                    startTalking()
                    if (sprites.readDataNumber(dink, "numOrbs") == 0) {
                        doConversation(myNPC1, "The store is closed.", "Steve")
                    } else if (sprites.readDataNumber(dink, "numOrbs") == 1) {
                        doConversation(myNPC1, "The store will be opening soon.", "Steve")
                    } else if (sprites.readDataNumber(dink, "numOrbs") == 2) {
                        doConversation(myNPC1, "Check out the store.  It's that purple place.", "Steve")
                    } else if (sprites.readDataNumber(dink, "numOrbs") == 3) {
                        doConversation(myNPC1, "You need a SHERRY IN A BOTTLE for difficult areas.", "Steve")
                    } else {
                        doConversation(myNPC1, "Gammon's castle is in the East.", "Steve")
                    }
                }
                if (dink.overlapsWith(myKing)) {
                    startTalking()
                    doConversation(myKing, "Defeat GAMMON!", "The King")
                }
                if (dink.overlapsWith(myZelba)) {
                    startTalking()
                    doConversation(mySprite, "Thank you for saving me", "Zelba")
                }
                if (dink.overlapsWith(myNPC2)) {
                    startTalking()
                    doConversation(myNPC2, "I am a witch.  Now you are fully healed.", "Hashley")
                    music.playTone(466, music.beat(BeatFraction.Half))
                    playerLife = maxHealth
                }
                if (dink.overlapsWith(myNPC3)) {
                    startTalking()
                    if (sprites.readDataNumber(dink, "numOrbs") == 0) {
                        doConversation(myNPC3, "There is a bow hidden in the forest area.", "Tipsy")
                    } else if (sprites.readDataNumber(dink, "numOrbs") == 1) {
                        doConversation(myNPC3, "Make sure you have lots of arrows in the water area.", "Tipsy")
                    } else if (sprites.readDataNumber(dink, "numOrbs") == 2) {
                        doConversation(myNPC3, "I hear there's a dangerous bird in the desert area.", "Tipsy")
                    } else if (sprites.readDataNumber(dink, "numOrbs") == 3) {
                        doConversation(myNPC3, "On fire mountain, you may need a lot of arrows.", "Tipsy")
                    } else {
                        doConversation(myNPC3, "Go save Princess Zelba!", "Tipsy")
                    }
                }
            }
        } else if (currentLevel == 12) {
            console.log("at the cannon")
            if (sprites.readDataNumber(dink, "numBombs") > 0) {
                sprites.setDataNumber(dink, "numBombs", sprites.readDataNumber(dink, "numBombs") - 1)
                if (spriteutils.distanceBetween(dink, myCannon) <= 16) {
                    animation.runImageAnimation(
                    myCannon,
                    assets.animation`animCannon`,
                    150,
                    false
                    )
                    timer.after(500, function () {
                        myBombBlast = sprites.createProjectileFromSprite(assets.image`sprSpray`, myCannon, 0, -60)
                        myBombBlast.setPosition(myCannon.x + 0, myCannon.y - 10)
                        myBombBlast.setKind(SpriteKind.BombBlast)
                        animation.runImageAnimation(
                        myBombBlast,
                        assets.animation`animBaldShot`,
                        200,
                        true
                        )
                    })
                }
                if (sprites.readDataNumber(dink, "numBombs") == 0) {
                    myBomb = sprites.create(assets.image`sprBomb`, SpriteKind.Item)
                    if (nextBombRight) {
                        tiles.placeOnTile(myBomb, tiles.getTileLocation(14, 14))
                        nextBombRight = false
                    } else {
                        tiles.placeOnTile(myBomb, tiles.getTileLocation(1, 14))
                        nextBombRight = true
                    }
                }
            }
        } else {
            music.thump.play()
            if (!(isSlashing)) {
                isSlashing = true
                if (lastDirection == 0) {
                    animation.runImageAnimation(
                    sword,
                    assets.animation`animSwordUp`,
                    50,
                    false
                    )
                } else if (lastDirection == 1) {
                    animation.runImageAnimation(
                    sword,
                    assets.animation`animSwordRight`,
                    50,
                    false
                    )
                } else if (lastDirection == 2) {
                    animation.runImageAnimation(
                    sword,
                    assets.animation`animSwordDown`,
                    50,
                    false
                    )
                } else {
                    animation.runImageAnimation(
                    sword,
                    assets.animation`animSwordLeft`,
                    50,
                    false
                    )
                }
                characterAnimations.setCharacterAnimationsEnabled(dink, false)
                timer.after(200, function () {
                    characterAnimations.setCharacterAnimationsEnabled(dink, true)
                    sword.setImage(assets.image`sprBlank`)
                    isSlashing = false
                })
            }
        }
    }
})
function startGame () {
    cleanUp()
    currentLevel = 0
    initializePlayer()
    initializeGame()
    if (checkSaveGame()) {
        loadGame()
    } else {
        setupLevel(currentLevel, 1, 5, true)
    }
}
sprites.onOverlap(SpriteKind.FireBall, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (currentLevel == 15) {
        sprite.destroy(effects.warmRadial, 200)
        damageGammon(otherSprite, sprite, false, false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tGreenGem`, function (sprite, location) {
    if (sprites.readDataNumber(dink, "hasGreenOrb") == 1) {
        tiles.replaceAllTiles(assets.tile`tGreenGem`, assets.tile`tGreenOrbSpot`)
        if (greenPlaced) {
        	
        } else {
            myOrb = sprites.create(assets.image`sprGreenGem`, SpriteKind.Orb)
            tiles.placeOnTile(myOrb, tiles.getTileLocation(3, 2))
            greenPlaced = true
            myHeartContainer = sprites.create(img`
                ....................
                ....................
                ....................
                ....................
                ....................
                ......cccc.cccc.....
                .....cc44ccc44cc....
                ....cc4444c4444cc...
                ....cc444444444cc...
                ....cc444444444cc...
                .....cc4444444cc....
                ......cc44444cc.....
                .......cc444cc......
                ........cc4cc.......
                .........ccc........
                ..........c.........
                ....................
                ....................
                ....................
                ....................
                `, SpriteKind.HeartContainer)
            tiles.placeOnTile(myHeartContainer, tiles.getTileLocation(12, 2))
            music.playMelody("C - E - C C5 C5 - ", 500)
            story.startCutscene(function () {
                doCutScene(1)
                timer.after(4000, function () {
                    story.printDialog("Take this heart container before it disappears!", 80, 40, 50, 150)
                })
            })
        }
    }
})
function enemyChase (monster: Sprite) {
    console.log("enemyChase")
    monster.follow(dink, sprites.readDataNumber(monster, "speed"))
}
function setEyePosition () {
    myLeftEye.setPosition(myPaco.x - 6, myPaco.y + 12)
    myRightEye.setPosition(myPaco.x + 6, myPaco.y + 12)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tSpikes`, function (sprite, location) {
    dink.setFlag(SpriteFlag.GhostThroughTiles, true)
    damagePlayer(sprite, false)
    timer.after(1000, function () {
        dink.setFlag(SpriteFlag.GhostThroughTiles, false)
        backToStart(currentLevel)
    })
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    transitioning = false
    lastDirection = 3
})
function distanceFormula (x1: number, x2: number, y1: number, y2: number) {
    return Math.sqrt((y1 - y2) ** 2 + (x1 - x2) ** 2)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.HeartContainer, function (sprite, otherSprite) {
    maxHealth += 1
    playerLife = maxHealth
    otherSprite.destroy()
    music.jumpDown.play()
})
function checkSaveGame () {
    if (blockSettings.exists("playerX")) {
        playerChoosing = true
        story.showPlayerChoices("Continue", "New Game")
        playerChoosing = false
        if (story.getLastAnswer().includes("New")) {
            blockSettings.clear()
            return false
        } else {
            return true
        }
    }
    return false
}
function damagePlayer (source: Sprite, kb: boolean) {
    playerLife += -1
    controller.moveSprite(dink, 0, 0)
    characterAnimations.setCharacterAnimationsEnabled(dink, false)
    if (playerLife == 0) {
        if (sprites.readDataNumber(dink, "hasPotion") == 1) {
            playerLife = maxHealth
            sprites.setDataNumber(dink, "hasPotion", 0)
            music.magicWand.play()
        } else {
            dink.setFlag(SpriteFlag.Ghost, true)
            playMusic("death")
            tiles.destroySpritesOfKind(SpriteKind.Enemy)
            tiles.destroySpritesOfKind(SpriteKind.Projectile)
            animation.runImageAnimation(
            dink,
            assets.animation`animDeath`,
            150,
            true
            )
            timer.after(2500, function () {
                dink.destroy()
                startGame()
            })
        }
    } else {
        music.playTone(784, music.beat(BeatFraction.Sixteenth))
        music.playTone(880, music.beat(BeatFraction.Sixteenth))
        if (kb) {
            spriteutils.setVelocityAtAngle(dink, spriteutils.angleFrom(source, dink), 25)
        }
        animation.runImageAnimation(
        dink,
        makeBlinkingAnimation(dink),
        100,
        true
        )
        dink.setFlag(SpriteFlag.GhostThroughSprites, true)
        timer.after(1000, function () {
            animation.stopAnimation(animation.AnimationTypes.All, dink)
            dink.setVelocity(0, 0)
            if (platformFlag) {
                controller.moveSprite(dink, 50, 0)
            } else {
                controller.moveSprite(dink, 50, 50)
            }
            characterAnimations.setCharacterAnimationsEnabled(dink, true)
            dink.setFlag(SpriteFlag.GhostThroughSprites, false)
        })
    }
}
function makeBlinkingAnimation (spr: Sprite) {
    console.log("makeBlinkingAnimation")
    animationArray = []
    animationArray.push(spr.image)
    picture = spr.image.clone()
    animationArray.push(picture)
    picture.replace(2, 4)
    picture.replace(10, 2)
    picture.replace(11, 2)
    picture.replace(8, 7)
    picture.replace(15, 1)
    picture.replace(3, 5)
    return animationArray
}
// Initialize game wide variables/settings and initialize certain sprites so they don't cause errors
function initializeGame () {
    music.stopAllSounds()
    music.setVolume(100)
    monsterId = 1
    boss = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Boss)
    bossBattle = false
    talking = false
    myNPC1 = sprites.create(assets.image`sprBlank`, SpriteKind.Player)
    myNPC2 = sprites.create(assets.image`sprBlank`, SpriteKind.Player)
    myNPC3 = sprites.create(assets.image`sprBlank`, SpriteKind.Player)
    myKing = sprites.create(assets.image`sprBlank`, SpriteKind.Player)
    myZelba = sprites.create(assets.image`sprBlank`, SpriteKind.Player)
    shootingArrow = 0
    myArrows = textsprite.create("")
    myArrows.setOutline(1, 15)
    myArrows.setPosition(126, 10)
    myArrows.setFlag(SpriteFlag.RelativeToCamera, true)
    myBombs = textsprite.create("")
    myBombs.setOutline(1, 12)
    myBombs.setPosition(127, 104)
    myBombs.setFlag(SpriteFlag.RelativeToCamera, true)
    myLife = textsprite.create("")
    myLife.setOutline(1, 12)
    myLife.setPosition(0, 0)
    myLife.setFlag(SpriteFlag.RelativeToCamera, true)
    myGurg = sprites.create(assets.image`sprBlank`, SpriteKind.Enemy)
    myPaco = sprites.create(assets.image`sprBlank`, SpriteKind.Enemy)
    myLeftEye = sprites.create(assets.image`sprBlank`, SpriteKind.Enemy)
    myRightEye = sprites.create(assets.image`sprBlank`, SpriteKind.Enemy)
    myShicken = sprites.create(assets.image`sprBlank`, SpriteKind.Enemy)
    myBelly = sprites.create(assets.image`sprBlank`, SpriteKind.Enemy)
    myBald = sprites.create(assets.image`sprBlank`, SpriteKind.Enemy)
    greenPlaced = false
    bluePlaced = false
    redPlaced = false
    yellowPlaced = false
}
function bossDies (monster: Sprite) {
    if (currentLevel == 10) {
        monster.setVelocity(0, 0)
        story.startCutscene(function () {
            story.spriteSayText(monster, "GREAT")
            playMusic("gurg")
        })
        scene.cameraShake(4, 200)
        monster.destroy(effects.disintegrate, 2000)
        timer.after(2000, function () {
            bossBattle = false
            if (sprites.readDataNumber(dink, "hasGreenOrb") == 0) {
                myOrb = sprites.create(assets.image`sprGreenGem`, SpriteKind.Orb)
                tiles.placeOnTile(myOrb, tiles.getTileLocation(8, 1))
            } else {
                myPortal = sprites.create(assets.image`sprPortal`, SpriteKind.Portal)
                tiles.placeOnTile(myPortal, tiles.getTileLocation(0, 3))
                tiles.setWallAt(tiles.getTileLocation(0, 3), false)
                animation.runImageAnimation(
                myPortal,
                assets.animation`animPortal`,
                200,
                true
                )
            }
        })
    }
    if (currentLevel == 11) {
        if (sprites.readDataString(monster, "monster") == "pacorighteye" || sprites.readDataString(monster, "monster") == "pacolefteye") {
            sprites.setDataNumber(myPaco, "numEyes", sprites.readDataNumber(myPaco, "numEyes") - 1)
            monster.destroy(effects.fire, 2000)
            scene.cameraShake(4, 500)
            if (sprites.readDataNumber(myPaco, "numEyes") == 0) {
                story.startCutscene(function () {
                    scene.cameraShake(4, 200)
                    timer.after(1000, function () {
                    	
                    })
                    sprites.setDataNumber(myPaco, "invincible", 0)
                    sprites.setDataNumber(myPaco, "speed", 60)
                    sprites.setDataNumber(myPaco, "isShooting", 0)
                    myPaco.vx = sprites.readDataNumber(myPaco, "speed")
                    myPaco.vy = sprites.readDataNumber(myPaco, "speed")
                    myPaco.setBounceOnWall(true)
                })
            }
        }
        if (sprites.readDataString(monster, "monster") == "paco") {
            myPaco.setVelocity(0, 0)
            story.startCutscene(function () {
                story.spriteSayText(monster, "so....")
                playMusic("paco")
            })
            scene.cameraShake(4, 200)
            monster.destroy(effects.disintegrate, 2000)
            timer.after(2000, function () {
                bossBattle = false
                if (sprites.readDataNumber(dink, "hasBlueOrb") == 0) {
                    myOrb = sprites.create(assets.image`sprBlueGem`, SpriteKind.Orb)
                    tiles.placeOnTile(myOrb, tiles.getTileLocation(7, 3))
                } else {
                    myPortal = sprites.create(assets.image`sprPortal`, SpriteKind.Portal)
                    tiles.placeOnTile(myPortal, tiles.getTileLocation(1, 4))
                    tiles.setWallAt(tiles.getTileLocation(1, 4), false)
                    animation.runImageAnimation(
                    myPortal,
                    assets.animation`animPortal`,
                    200,
                    true
                    )
                }
            })
        }
    }
    if (currentLevel == 12) {
        if (sprites.readDataString(monster, "monster") == "shickenbelly") {
            sprites.setDataNumber(myShicken, "isShooting", 0)
            myShicken.setVelocity(0, 0)
            story.startCutscene(function () {
                story.spriteSayText(monster, "kookoo")
                playMusic("shicken")
            })
            scene.cameraShake(4, 200)
            monster.destroy(effects.disintegrate, 2000)
            myShicken.destroy(effects.fire, 2000)
            timer.after(2000, function () {
                bossBattle = false
                if (sprites.readDataNumber(dink, "hasYellowOrb") == 0) {
                    myOrb = sprites.create(assets.image`sprYellowGem`, SpriteKind.Orb)
                    tiles.placeOnTile(myOrb, tiles.getTileLocation(1, 12))
                    mySprite = sprites.create(assets.image`sprFallBitR`, SpriteKind.NewWall)
                    tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 14))
                    mySprite = sprites.create(assets.image`sprFallCornerR`, SpriteKind.NewWall)
                    tiles.placeOnTile(mySprite, tiles.getTileLocation(2, 14))
                    tiles.setWallAt(tiles.getTileLocation(2, 14), true)
                } else {
                    console.log("already has orb")
                    mySprite = sprites.create(assets.image`sprFallBitR`, SpriteKind.NewWall)
                    tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 14))
                    mySprite = sprites.create(assets.image`sprFallCornerR`, SpriteKind.NewWall)
                    tiles.placeOnTile(mySprite, tiles.getTileLocation(2, 14))
                    tiles.setWallAt(tiles.getTileLocation(2, 14), true)
                    mySprite = sprites.create(assets.image`sprFallBitL`, SpriteKind.NewWall)
                    tiles.placeOnTile(mySprite, tiles.getTileLocation(14, 14))
                    mySprite = sprites.create(assets.image`sprFallCornerL`, SpriteKind.NewWall)
                    tiles.placeOnTile(mySprite, tiles.getTileLocation(13, 14))
                    tiles.setWallAt(tiles.getTileLocation(13, 14), true)
                    myPortal = sprites.create(assets.image`sprPortalFlat`, SpriteKind.Portal)
                    tiles.placeOnTile(myPortal, tiles.getTileLocation(14, 12))
                    animation.runImageAnimation(
                    myPortal,
                    assets.animation`animPortalFlat`,
                    200,
                    true
                    )
                }
            })
        }
    }
    if (currentLevel == 13) {
        monster.setVelocity(0, 0)
        story.startCutscene(function () {
            story.spriteSayText(monster, "shmeh")
            playMusic("baldhead")
        })
        scene.cameraShake(4, 200)
        monster.destroy(effects.disintegrate, 4000)
        myEnemy.destroy(effects.ashes, 4000)
        timer.after(2000, function () {
            bossBattle = false
            if (sprites.readDataNumber(dink, "hasRedOrb") == 0) {
                myOrb = sprites.create(assets.image`sprRedGem`, SpriteKind.Orb)
                tiles.placeOnTile(myOrb, tiles.getTileLocation(9, 3))
            } else {
                myPortal = sprites.create(assets.image`sprPortal`, SpriteKind.Portal)
                tiles.placeOnTile(myPortal, tiles.getTileLocation(9, 0))
                tiles.setWallAt(tiles.getTileLocation(9, 0), false)
                animation.runImageAnimation(
                myPortal,
                assets.animation`animPortal`,
                200,
                true
                )
            }
        })
    }
    if (currentLevel == 15) {
        console.log("Gammon is dead")
        monster.setVelocity(0, 0)
        story.startCutscene(function () {
            story.spriteSayText(monster, "I don't like it.")
            playMusic("gammondeath")
        })
        scene.cameraShake(4, 1000)
        monster.destroy(effects.disintegrate, 2000)
        timer.after(2000, function () {
            bossBattle = false
        })
    }
    console.log(locationList.length)
    locationList.push([
    15,
    4,
    0,
    16,
    4,
    7,
    1
    ])
    console.log(locationList.length)
    locationLength = locationList.length - 1
}
sprites.onDestroyed(SpriteKind.FireBall, function (sprite) {
    if (sprites.readDataNumber(sprite, "pingpong") == 1) {
        console.log("gammon missed")
        gammonPlaced = false
        sprites.setDataNumber(myGammon, "isShooting", 0)
    }
})
tiles.onMapLoaded(function (tilemap2) {
    console.log("on tilemap loaded")
    if (platformFlag) {
    	
    } else {
        tiles.coverAllTiles(tiles.util.object6, sprites.castle.tilePath5)
        tiles.coverAllTiles(assets.tile`tmGurg`, sprites.dungeon.floorLight1)
        tiles.coverAllTiles(assets.tile`tmPaco`, assets.tile`tLightBlue`)
        tiles.coverAllTiles(assets.tile`tGreenGem`, assets.tile`tGreenOrbSpot`)
        tiles.coverAllTiles(assets.tile`tBlueGem`, assets.tile`tBlueOrbSpot`)
        tiles.coverAllTiles(assets.tile`tYellowGem`, assets.tile`tYellowOrbSpot`)
        tiles.coverAllTiles(assets.tile`tRedGem`, assets.tile`tRedOrbSpot`)
        tiles.coverAllTiles(assets.tile`tBald`, sprites.dungeon.floorLight0)
        tiles.coverAllTiles(assets.tile`tBoss`, sprites.dungeon.darkGroundNorthWest0)
        tiles.coverAllTiles(assets.tile`tFrog`, sprites.castle.tilePath5)
        if (currentLevel == 14) {
            tiles.coverAllTiles(tiles.util.object4, sprites.dungeon.floorLight0)
            tiles.coverAllTiles(tiles.util.object12, sprites.dungeon.floorLight0)
        } else {
            tiles.coverAllTiles(tiles.util.object4, sprites.castle.tilePath5)
            tiles.coverAllTiles(tiles.util.object12, sprites.castle.tilePath5)
        }
    }
    spawnMonsters()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ammo, function (sprite, otherSprite) {
    music.beamUp.play()
    sprites.setDataNumber(dink, "numArrows", sprites.readDataNumber(dink, "numArrows") + 5)
    sprites.setDataNumber(dink, "numArrows", Math.min(sprites.readDataNumber(dink, "numArrows"), sprites.readDataNumber(dink, "maxArrows")))
    otherSprite.destroy()
})
function doCutScene (scene2: number) {
    story.startCutscene(function () {
        controller.moveSprite(dink, 0, 0)
        dink.setFlag(SpriteFlag.Invisible, true)
        for (let value of sprites.allOfKind(SpriteKind.Orb)) {
            value.setFlag(SpriteFlag.Invisible, true)
        }
        savedTilemap = tiles.getLoadedMap()
        if (scene2 == 1) {
            tiles.loadMap(tiles.createMap(tilemap`tmCutScene1`))
            myFromMorph = sprites.create(assets.image`sprMorphSidewalk`, SpriteKind.Morph)
            myToMorph = sprites.create(assets.image`sprMorphSouth`, SpriteKind.Morph)
            tiles.placeOnTile(myFromMorph, tiles.getTileLocation(2, 7))
        } else if (scene2 == 2) {
            tiles.loadMap(tiles.createMap(tilemap`tmCutScene2`))
            myFromMorph = sprites.create(assets.image`sprDesertSand`, SpriteKind.Morph)
            myToMorph = sprites.create(assets.image`sprMorphDesert`, SpriteKind.Morph)
            tiles.placeOnTile(myFromMorph, tiles.getTileLocation(5, 3))
        } else if (scene2 == 3) {
            tiles.loadMap(tiles.createMap(tilemap`tmCutScene0`))
            myFromMorph = sprites.create(assets.image`myImage3`, SpriteKind.Morph)
            myToMorph = sprites.create(assets.image`sprMountainPortal`, SpriteKind.Morph)
            tiles.placeOnTile(myFromMorph, tiles.getTileLocation(4, 4))
        } else if (scene2 == 4) {
            tiles.loadMap(tiles.createMap(tilemap`tmCutScene4`))
            myFromMorph = sprites.create(assets.image`sprPurpleWall`, SpriteKind.Morph)
            myToMorph = sprites.create(assets.image`sprGreyTile`, SpriteKind.Morph)
            tiles.placeOnTile(myFromMorph, tiles.getTileLocation(8, 4))
        }
        myToMorph.setFlag(SpriteFlag.Invisible, true)
        scene.centerCameraAt(80, 70)
        scene.cameraShake(2, 4000)
        music.spooky.play()
        timer.after(1000, function () {
            imagemorph.morph(myFromMorph, myToMorph.image)
        })
    })
    timer.after(4000, function () {
        dink.setFlag(SpriteFlag.Invisible, false)
        for (let value of sprites.allOfKind(SpriteKind.Orb)) {
            value.setFlag(SpriteFlag.Invisible, false)
        }
        tiles.loadMap(savedTilemap)
        controller.moveSprite(dink, 50, 50)
        scene.cameraFollowSprite(dink)
        myFromMorph.destroy()
    })
}
function createFollowingProjectile (sprVictim: Sprite, sprAttacker: Sprite, speed: number, xoffset: number, yoffset: number, myImage: Image, pingpong: number) {
    angleToTarget = Math.atan2(sprVictim.y - (sprAttacker.y + yoffset), sprVictim.x - (sprAttacker.x + xoffset))
    myFireBall = sprites.createProjectileFromSide(myImage, 50, 50)
    myFireBall.setKind(SpriteKind.FireBall)
    myFireBall.setPosition(sprAttacker.x + xoffset, sprAttacker.y + yoffset)
    myFireBall.setVelocity(Math.cos(angleToTarget) * speed, Math.sin(angleToTarget) * speed)
    sprites.setDataNumber(myFireBall, "pingpong", pingpong)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    transitioning = false
    lastDirection = 1
})
sprites.onOverlap(SpriteKind.Egg, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.destroy(effects.blizzard, 100)
    damagePlayer(sprite, false)
})
function doConversation (npcSprite: Sprite, text: string, label: string) {
    story.startCutscene(function () {
        story.printCharacterText(text, label)
    })
    stopTalking()
}
function enemyDrops (enemy: Sprite) {
    randomTreasure = randint(0, 1)
    if (Math.percentChance(35)) {
        if (randomTreasure == 0) {
            myHeart = sprites.create(assets.image`sprHeart`, SpriteKind.Food)
            sprites.setDataString(myHeart, "food", "heart")
            myHeart.x = enemy.x
            myHeart.y = enemy.y
        } else {
            if (sprites.readDataNumber(dink, "hasBow") == 1) {
                myQuiver = sprites.create(assets.image`sprRArrowRight`, SpriteKind.Ammo)
                myQuiver.x = enemy.x
                myQuiver.y = enemy.y
            }
        }
    }
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    damagePlayer(sprite, true)
})
function loadGame () {
    transitioning = true
    dink.setPosition(blockSettings.readNumber("playerX"), blockSettings.readNumber("playerY"))
    currentLevel = blockSettings.readNumber("currentLevel")
    sprites.setDataNumber(dink, "numOrbs", blockSettings.readNumber("numOrbs"))
    sprites.setDataNumber(dink, "hasBow", blockSettings.readNumber("hasBow"))
    sprites.setDataNumber(dink, "numArrows", blockSettings.readNumber("numArrows"))
    sprites.setDataNumber(dink, "hasGreenOrb", blockSettings.readNumber("hasGreenOrb"))
    sprites.setDataNumber(dink, "hasBlueOrb", blockSettings.readNumber("hasBlueOrb"))
    sprites.setDataNumber(dink, "hasYellowOrb", blockSettings.readNumber("hasYellowOrb"))
    sprites.setDataNumber(dink, "hasRedOrb", blockSettings.readNumber("hasRedOrb"))
    sprites.setDataNumber(dink, "numBombs", blockSettings.readNumber("numBombs"))
    sprites.setDataNumber(dink, "hasPotion", blockSettings.readNumber("hasPotion"))
    maxHealth = blockSettings.readNumber("maxHealth")
    playerLife = blockSettings.readNumber("playerLife")
    if (blockSettings.readNumber("bluePlaced") == 1) {
        bluePlaced = true
    } else {
        bluePlaced = false
    }
    if (blockSettings.readNumber("greenPlaced") == 1) {
        greenPlaced = true
    } else {
        greenPlaced = false
    }
    if (blockSettings.readNumber("yellowPlaced") == 1) {
        yellowPlaced = true
    } else {
        yellowPlaced = false
    }
    if (blockSettings.readNumber("redPlaced") == 1) {
        redPlaced = true
    } else {
        redPlaced = false
    }
    setupLevel(currentLevel, 999, 999, false)
}
function specialTalks (sprite: Sprite) {
    if (sprites.readDataBoolean(sprite, "talking")) {
        return
    }
    sprites.setDataBoolean(sprite, "talking", true)
    if (sprites.readDataString(sprite, "name") == "king") {
        story.startCutscene(function () {
            story.printDialog("Hey Dink.  I am the King.  Save the princess ZELBA and defeat GAMMON!", 80, 40, 50, 150)
        })
    } else if (sprites.readDataString(sprite, "name") == "merchant") {
        if (sprites.readDataNumber(dink, "numOrbs") < 2) {
            story.startCutscene(function () {
                story.printDialog("Come back soon.  No stock yet.", 80, 40, 50, 150)
            })
        } else {
            if (sprites.readDataNumber(dink, "hasPotion") == 0) {
                story.startCutscene(function () {
                    story.printDialog("No cash register yet.  But take this SHERRY IN A BOTTLE", 80, 40, 50, 150)
                })
                myHeart = sprites.create(assets.image`sprPotion`, SpriteKind.Food)
                sprites.setDataString(myHeart, "food", "potion")
                tiles.placeOnTile(myHeart, tiles.getTileLocation(5, 1))
            } else {
                story.startCutscene(function () {
                    story.printDialog("Be safe out there.", 80, 40, 50, 150)
                })
            }
        }
    } else if (sprites.readDataString(sprite, "name") == "zelba") {
        story.startCutscene(function () {
            story.printDialog("Dink! You're the last person I'd expect to save me.", 80, 40, 50, 150)
        })
    } else {
    	
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (story.isMenuOpen()) {
        console.log("menu is open")
    } else {
        transitioning = false
        lastDirection = 2
    }
})
// Save the game using settings extension
function saveGame () {
    blockSettings.writeNumber("playerX", dink.x)
    blockSettings.writeNumber("playerY", dink.y)
    blockSettings.writeNumber("currentLevel", currentLevel)
    blockSettings.writeNumber("numOrbs", sprites.readDataNumber(dink, "numOrbs"))
    blockSettings.writeNumber("hasBow", sprites.readDataNumber(dink, "hasBow"))
    blockSettings.writeNumber("numArrows", sprites.readDataNumber(dink, "numArrows"))
    blockSettings.writeNumber("hasGreenOrb", sprites.readDataNumber(dink, "hasGreenOrb"))
    blockSettings.writeNumber("hasBlueOrb", sprites.readDataNumber(dink, "hasBlueOrb"))
    blockSettings.writeNumber("hasYellowOrb", sprites.readDataNumber(dink, "hasYellowOrb"))
    blockSettings.writeNumber("hasRedOrb", sprites.readDataNumber(dink, "hasRedOrb"))
    blockSettings.writeNumber("numBombs", sprites.readDataNumber(dink, "numBombs"))
    blockSettings.writeNumber("hasPotion", sprites.readDataNumber(dink, "hasPotion"))
    blockSettings.writeNumber("maxHealth", maxHealth)
    blockSettings.writeNumber("playerLife", playerLife)
    if (bluePlaced) {
        blockSettings.writeNumber("bluePlaced", 1)
    } else {
        blockSettings.writeNumber("bluePlaced", 0)
    }
    if (greenPlaced) {
        blockSettings.writeNumber("greenPlaced", 1)
    } else {
        blockSettings.writeNumber("greenPlaced", 0)
    }
    if (yellowPlaced) {
        blockSettings.writeNumber("yellowPlaced", 1)
    } else {
        blockSettings.writeNumber("yellowPlaced", 0)
    }
    if (redPlaced) {
        blockSettings.writeNumber("redPlaced", 1)
    } else {
        blockSettings.writeNumber("redPlaced", 0)
    }
}
function setTheScene (level: number, style: number) {
    if (style == 0) {
        platformFlag = false
        dink.ay = 0
        controller.moveSprite(dink, 50, 50)
    } else {
        platformFlag = true
        dink.ay = 300
        controller.moveSprite(dink, 50, 0)
        lastDirection = 1
    }
    if (level == 0) {
        scroller.scrollBackgroundWithSpeed(randint(-5, -10), 0)
        myKing = sprites.create(assets.image`sprKing`, SpriteKind.Special)
        sprites.setDataString(myKing, "name", "king")
        tiles.placeOnTile(myKing, tiles.getTileLocation(7, 5))
        animation.runImageAnimation(
        myKing,
        assets.animation`animKing`,
        500,
        true
        )
    }
    if (level == 1) {
        if (greenPlaced) {
            mySprite = sprites.create(assets.image`sprMorphSouth`, SpriteKind.NewWall)
            tiles.placeOnTile(mySprite, tiles.getTileLocation(2, 19))
            tiles.setWallAt(tiles.getTileLocation(2, 19), false)
        }
        if (bluePlaced) {
            mySprite = sprites.create(assets.image`sprMorphDesert`, SpriteKind.NewWall)
            tiles.placeOnTile(mySprite, tiles.getTileLocation(22, 15))
            tiles.setWallAt(tiles.getTileLocation(22, 15), false)
        }
        if (yellowPlaced) {
            mySprite = sprites.create(assets.image`sprMountainPortal`, SpriteKind.NewWall)
            tiles.placeOnTile(mySprite, tiles.getTileLocation(21, 4))
            tiles.setWallAt(tiles.getTileLocation(21, 4), false)
        }
        if (redPlaced) {
            mySprite = sprites.create(assets.image`sprGreyTile`, SpriteKind.NewWall)
            tiles.placeOnTile(mySprite, tiles.getTileLocation(26, 10))
            tiles.setWallAt(tiles.getTileLocation(26, 10), false)
        }
    }
    if (level == 2) {
        for (let value of tiles.getTilesByType(tiles.util.object5)) {
            myHouse = sprites.create(assets.image`sprRedHouse`, SpriteKind.House)
            tiles.placeOnTile(myHouse, value)
        }
        for (let value of tiles.getTilesByType(tiles.util.object7)) {
            myHouse = sprites.create(assets.image`sprPurpleHouse`, SpriteKind.House)
            tiles.placeOnTile(myHouse, value)
        }
        myNPC1 = sprites.create(assets.image`sprSteve`, SpriteKind.NPC)
        animation.runImageAnimation(
        myNPC1,
        assets.animation`animSteve`,
        500,
        true
        )
        myNPC2 = sprites.create(assets.image`sprTipsy`, SpriteKind.NPC)
        animation.runImageAnimation(
        myNPC2,
        assets.animation`animTipsy`,
        500,
        true
        )
        myNPC3 = sprites.create(assets.image`sprTrista`, SpriteKind.NPC)
        animation.runImageAnimation(
        myNPC3,
        assets.animation`animTrista`,
        500,
        true
        )
        for (let value of tiles.getTilesByType(tiles.util.object1)) {
            tiles.placeOnTile(myNPC1, value)
            tiles.coverAllTiles(tiles.util.object1, sprites.castle.tilePath5)
        }
        for (let value of tiles.getTilesByType(tiles.util.object3)) {
            tiles.placeOnTile(myNPC2, value)
            tiles.coverAllTiles(tiles.util.object3, sprites.castle.tilePath5)
        }
        for (let value of tiles.getTilesByType(tiles.util.object9)) {
            tiles.placeOnTile(myNPC3, value)
            tiles.coverAllTiles(tiles.util.object9, sprites.castle.tilePath5)
        }
    }
    if (level == 3) {
        tilemapLst[level] = tiles.createMap(tilemap`tmForest`)
        for (let value of tiles.getTilesByType(assets.tile`myTile9`)) {
            if (sprites.readDataNumber(dink, "hasBow") == 0) {
                myChest = sprites.create(assets.image`sprChest`, SpriteKind.Item)
                tiles.placeOnTile(myChest, value)
            }
            tiles.setTileAt(value, assets.tile`transparency16`)
        }
    }
    if (level == 4) {
        tilemapLst[level] = tiles.createMap(tilemap`tWater`)
    }
    if (level == 5) {
        tilemapLst[level] = tiles.createMap(tilemap`tFire`)
    }
    if (level == 6) {
        tilemapLst[level] = tiles.createMap(tilemap`tDesert`)
    }
    if (level == 7) {
        if (greenPlaced) {
            myOrb = sprites.create(assets.image`sprGreenGem`, SpriteKind.Orb)
            tiles.placeOnTile(myOrb, tiles.getTileLocation(3, 2))
        }
        if (bluePlaced) {
            myOrb = sprites.create(assets.image`sprBlueGem`, SpriteKind.Orb)
            tiles.placeOnTile(myOrb, tiles.getTileLocation(5, 2))
        }
        if (yellowPlaced) {
            myOrb = sprites.create(assets.image`sprYellowGem`, SpriteKind.Orb)
            tiles.placeOnTile(myOrb, tiles.getTileLocation(7, 2))
        }
        if (redPlaced) {
            myOrb = sprites.create(assets.image`sprRedGem`, SpriteKind.Orb)
            tiles.placeOnTile(myOrb, tiles.getTileLocation(9, 2))
        }
    }
    if (level == 8) {
        myNPC4 = sprites.create(assets.image`sprSteve`, SpriteKind.Special)
        sprites.setDataString(myNPC4, "name", "merchant")
        animation.runImageAnimation(
        myNPC4,
        assets.animation`animMerchant`,
        500,
        true
        )
        for (let value of tiles.getTilesByType(tiles.util.object11)) {
            tiles.placeOnTile(myNPC4, value)
            tiles.coverAllTiles(tiles.util.object11, assets.tile`tBrownFloor3`)
        }
        for (let value of tiles.getTilesByType(assets.tile`tCounter`)) {
            myHouse = sprites.create(assets.image`sprCounter`, SpriteKind.House)
            tiles.placeOnTile(myHouse, value)
        }
        for (let value of tiles.getTilesByType(assets.tile`tBed`)) {
            myHouse = sprites.create(assets.image`sprBed`, SpriteKind.House)
            tiles.placeOnTile(myHouse, value)
        }
    }
    if (level == 9) {
        playMusic("gammon")
        tilemapLst[level] = tiles.createMap(tilemap`tCastle`)
        for (let value of tiles.getTilesByType(assets.tile`tArrowDrop`)) {
            if (sprites.readDataNumber(dink, "hasBow") == 1) {
                myQuiver = sprites.create(assets.image`sprRArrowRight`, SpriteKind.Ammo)
                tiles.placeOnTile(myQuiver, value)
            }
            tiles.replaceAllTiles(assets.tile`tArrowDrop`, sprites.dungeon.floorLight0)
        }
        for (let value of tiles.getTilesByType(assets.tile`tHeart`)) {
            myHeart = sprites.create(assets.image`sprHeart`, SpriteKind.Food)
            sprites.setDataString(myHeart, "food", "heart")
            tiles.placeOnTile(myHeart, value)
            tiles.replaceAllTiles(assets.tile`tHeart`, assets.tile`tFloorGrey`)
        }
    }
    if (level == 10) {
        bossBattle = true
        for (let value of tiles.getTilesByType(assets.tile`tArrowDrop`)) {
            if (sprites.readDataNumber(dink, "hasBow") == 1) {
                myQuiver = sprites.create(assets.image`sprRArrowRight`, SpriteKind.Ammo)
                tiles.placeOnTile(myQuiver, value)
            }
            tiles.replaceAllTiles(assets.tile`tArrowDrop`, sprites.dungeon.floorLight0)
        }
    }
    if (level == 11) {
        bossBattle = true
        for (let value of tiles.getTilesByType(assets.tile`tArrowDrop`)) {
            if (sprites.readDataNumber(dink, "hasBow") == 1) {
                myQuiver = sprites.create(assets.image`sprRArrowRight`, SpriteKind.Ammo)
                tiles.placeOnTile(myQuiver, value)
            }
            tiles.replaceAllTiles(assets.tile`tArrowDrop`, assets.tile`tLightBlue`)
        }
    }
    if (level == 12) {
        bossBattle = true
        tilemapLst[level] = tiles.createMap(tilemap`tmDesertArena`)
        myBomb = sprites.create(assets.image`sprBomb`, SpriteKind.Item)
        tiles.placeOnTile(myBomb, tiles.getTileLocation(1, 14))
        nextBombRight = true
        myCannon = sprites.create(assets.image`sprCannon`, SpriteKind.Cannon)
        tiles.placeOnTile(myCannon, tiles.getTileLocation(8, 14))
    }
    if (level == 13) {
        bossBattle = true
    }
    if (level == 14) {
        tilemapLst[level] = tiles.createMap(tilemap`tmGauntlet`)
        for (let value of tiles.getTilesByType(assets.tile`tArrowDrop`)) {
            if (sprites.readDataNumber(dink, "hasBow") == 1) {
                myQuiver = sprites.create(assets.image`sprRArrowRight`, SpriteKind.Ammo)
                tiles.placeOnTile(myQuiver, value)
            }
            tiles.replaceAllTiles(assets.tile`tArrowDrop`, assets.tile`tFloorGrey`)
        }
        for (let value of tiles.getTilesByType(assets.tile`tHeart`)) {
            myHeart = sprites.create(assets.image`sprHeart`, SpriteKind.Food)
            sprites.setDataString(myHeart, "food", "heart")
            tiles.placeOnTile(myHeart, value)
            tiles.replaceAllTiles(assets.tile`tHeart`, assets.tile`tFloorGrey`)
        }
    }
    if (level == 15) {
        tilemapLst[level] = tiles.createMap(tilemap`tmGauntlet`)
        for (let value of tiles.getTilesByType(assets.tile`tPotion`)) {
            if (sprites.readDataNumber(dink, "hasPotion") == 0) {
                myHeart = sprites.create(assets.image`sprPotion`, SpriteKind.Food)
                sprites.setDataString(myHeart, "food", "potion")
                tiles.placeOnTile(myHeart, value)
            }
            tiles.replaceAllTiles(assets.tile`tPotion`, assets.tile`tFloorGrey`)
        }
        gammonPosition = 0
        gammonPlaced = false
        gammonPingPongActive = false
        gannonIncapacitated = false
        gammonPhase = 1
        bossBattle = true
    }
    if (level == 16) {
        console.log("Final Scene")
        for (let value of tiles.getTilesByType(assets.tile`tZelba`)) {
            myZelba = sprites.create(assets.image`sprZelba2`, SpriteKind.Special)
            tiles.placeOnTile(myZelba, value)
            sprites.setDataString(myZelba, "name", "zelba")
            tiles.replaceAllTiles(assets.tile`tZelba`, assets.tile`tFloorGrey`)
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tYellowGem`, function (sprite, location) {
    console.log("overlap yellow")
    if (sprites.readDataNumber(dink, "hasYellowOrb") == 1) {
        tiles.replaceAllTiles(assets.tile`tYellowGem`, assets.tile`tYellowOrbSpot`)
        if (yellowPlaced) {
        	
        } else {
            myOrb = sprites.create(assets.image`sprYellowGem`, SpriteKind.Orb)
            tiles.placeOnTile(myOrb, tiles.getTileLocation(7, 2))
            yellowPlaced = true
            myHeartContainer = sprites.create(img`
                ....................
                ....................
                ....................
                ....................
                ....................
                ......cccc.cccc.....
                .....cc44ccc44cc....
                ....cc4444c4444cc...
                ....cc444444444cc...
                ....cc444444444cc...
                .....cc4444444cc....
                ......cc44444cc.....
                .......cc444cc......
                ........cc4cc.......
                .........ccc........
                ..........c.........
                ....................
                ....................
                ....................
                ....................
                `, SpriteKind.HeartContainer)
            tiles.placeOnTile(myHeartContainer, tiles.getTileLocation(12, 2))
            music.playMelody("C - E - C C5 C5 - ", 500)
            story.startCutscene(function () {
                doCutScene(3)
                timer.after(4000, function () {
                    story.printDialog("Take this heart container before it disappears!", 80, 40, 50, 150)
                })
            })
        }
    }
})
function increaseHearts (hearts: number) {
    tempLife = playerLife + hearts
    if (tempLife > maxHealth) {
        playerLife = maxHealth
    } else {
        playerLife = tempLife
    }
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    stats.turnStats(true)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tLava1Ouch`, function (sprite, location) {
    dink.setFlag(SpriteFlag.GhostThroughTiles, true)
    damagePlayer(sprite, false)
    timer.after(1000, function () {
        dink.setFlag(SpriteFlag.GhostThroughTiles, false)
        backToStart(currentLevel)
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tLava2Ouch`, function (sprite, location) {
    dink.setFlag(SpriteFlag.GhostThroughTiles, true)
    damagePlayer(sprite, false)
    timer.after(1000, function () {
        dink.setFlag(SpriteFlag.GhostThroughTiles, false)
        backToStart(currentLevel)
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tBlueGem`, function (sprite, location) {
    if (sprites.readDataNumber(dink, "hasBlueOrb") == 1) {
        tiles.replaceAllTiles(assets.tile`tBlueGem`, assets.tile`tBlueOrbSpot`)
        if (bluePlaced) {
        	
        } else {
            myOrb = sprites.create(assets.image`sprBlueGem`, SpriteKind.Orb)
            tiles.placeOnTile(myOrb, tiles.getTileLocation(5, 2))
            bluePlaced = true
            myHeartContainer = sprites.create(img`
                ....................
                ....................
                ....................
                ....................
                ....................
                ......cccc.cccc.....
                .....cc44ccc44cc....
                ....cc4444c4444cc...
                ....cc444444444cc...
                ....cc444444444cc...
                .....cc4444444cc....
                ......cc44444cc.....
                .......cc444cc......
                ........cc4cc.......
                .........ccc........
                ..........c.........
                ....................
                ....................
                ....................
                ....................
                `, SpriteKind.HeartContainer)
            tiles.placeOnTile(myHeartContainer, tiles.getTileLocation(12, 2))
            music.playMelody("C - E - C C5 C5 - ", 500)
            story.startCutscene(function () {
                doCutScene(2)
                timer.after(4000, function () {
                    story.printDialog("Take this heart container before it disappears!", 80, 40, 50, 150)
                })
            })
        }
    }
})
function setBellyPosition () {
    myBelly.setPosition(myShicken.x + 0, myShicken.y + 24)
}
sprites.onOverlap(SpriteKind.Sword, SpriteKind.Enemy, function (sprite, otherSprite) {
    damageMonster(otherSprite, sprite, true, false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (sprites.readDataString(otherSprite, "food") == "heart") {
        increaseHearts(1)
        music.jumpUp.play()
    } else if (sprites.readDataString(otherSprite, "food") == "potion") {
        if (sprites.readDataNumber(dink, "hasPotion") == 0) {
            sprites.setDataNumber(dink, "hasPotion", 1)
            music.magicWand.play()
        }
    }
    otherSprite.destroy()
})
function createDatabase () {
    locationList = [
    [
    0,
    9,
    5,
    1,
    0,
    8,
    1
    ],
    [
    1,
    0,
    8,
    0,
    9,
    5,
    1
    ],
    [
    1,
    10,
    8,
    2,
    0,
    6,
    1
    ],
    [
    1,
    4,
    4,
    3,
    1,
    8,
    1
    ],
    [
    1,
    2,
    19,
    4,
    0,
    9,
    1
    ],
    [
    1,
    22,
    15,
    6,
    1,
    13,
    1
    ],
    [
    1,
    21,
    4,
    5,
    1,
    12,
    1
    ],
    [
    1,
    13,
    12,
    7,
    6,
    8,
    1
    ],
    [
    2,
    0,
    6,
    1,
    9,
    8,
    1
    ],
    [
    3,
    0,
    8,
    1,
    4,
    5,
    1
    ],
    [
    3,
    47,
    7,
    10,
    1,
    7,
    1
    ],
    [
    10,
    0,
    3,
    1,
    11,
    12,
    1
    ],
    [
    7,
    5,
    8,
    1,
    13,
    13,
    1
    ],
    [
    1,
    14,
    12,
    7,
    5,
    7,
    1
    ],
    [
    2,
    0,
    5,
    1,
    9,
    8,
    1
    ],
    [
    4,
    3,
    9,
    11,
    5,
    9,
    1
    ],
    [
    11,
    1,
    4,
    1,
    11,
    12,
    1
    ],
    [
    7,
    6,
    8,
    1,
    14,
    13,
    1
    ],
    [
    7,
    7,
    8,
    1,
    14,
    13,
    1
    ],
    [
    6,
    47,
    12,
    12,
    0,
    12,
    1
    ],
    [
    12,
    14,
    12,
    1,
    11,
    12,
    1
    ],
    [
    6,
    0,
    13,
    1,
    23,
    15,
    1
    ],
    [
    1,
    3,
    10,
    9,
    5,
    22,
    1
    ],
    [
    1,
    11,
    8,
    2,
    5,
    10,
    1
    ],
    [
    2,
    5,
    11,
    1,
    11,
    9,
    1
    ],
    [
    5,
    0,
    12,
    1,
    21,
    5,
    1
    ],
    [
    5,
    47,
    4,
    13,
    5,
    7,
    1
    ],
    [
    13,
    9,
    0,
    1,
    11,
    12,
    1
    ],
    [
    1,
    27,
    10,
    9,
    5,
    22,
    1
    ],
    [
    9,
    5,
    23,
    1,
    26,
    10,
    1
    ],
    [
    2,
    7,
    9,
    8,
    4,
    6,
    1
    ],
    [
    8,
    4,
    6,
    2,
    7,
    9,
    1
    ],
    [
    8,
    5,
    6,
    2,
    7,
    9,
    1
    ],
    [
    9,
    5,
    0,
    14,
    5,
    22,
    1
    ],
    [
    14,
    5,
    23,
    9,
    5,
    1,
    1
    ],
    [
    14,
    5,
    0,
    15,
    4,
    7,
    1
    ]
    ]
    backgrounds = [
    assets.image`bLvl1`,
    assets.image`sprGreen`,
    assets.image`sprGreen`,
    assets.image`forest2`,
    assets.image`bLake`,
    assets.image`bFire`,
    assets.image`bDesert`,
    assets.image`sprGreen`,
    assets.image`sprGreen`,
    assets.image`sprGreen`,
    img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,
    assets.image`sprBlank`,
    assets.image`bDesert`,
    assets.image`sprGreen`,
    assets.image`bLvl1`,
    assets.image`bLvl1`,
    assets.image`bLvl1`
    ]
    tilemapLst = [
    tiles.createMap(tilemap`tIntro`),
    tiles.createMap(tilemap`tWorldMap`),
    tiles.createMap(tilemap`tmCacareek`),
    tiles.createMap(tilemap`tmForest`),
    tiles.createMap(tilemap`tWater`),
    tiles.createMap(tilemap`tFire`),
    tiles.createMap(tilemap`tDesert`),
    tiles.createMap(tilemap`tTemple`),
    tiles.createMap(tilemap`tmStore`),
    tiles.createMap(tilemap`tCastle`),
    tiles.createMap(tilemap`tmForestArena`),
    tiles.createMap(tilemap`tmWaterArena`),
    tiles.createMap(tilemap`tmDesertArena`),
    tiles.createMap(tilemap`tmFireArena`),
    tiles.createMap(tilemap`tmGauntlet`),
    tiles.createMap(tilemap`tmGammon0`),
    tiles.createMap(tilemap`tmFinalScene`)
    ]
    styleLst = [
    1,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0
    ]
    locationLength = locationList.length - 1
    txtLst = [
    "",
    "",
    "Cacareek Village",
    "Forest Dungeon",
    "Water Dungeon",
    "Fire Dungeon",
    "Desert Dungeon",
    "Temple of Lime",
    "The Store",
    "Gammon's Castle",
    "\"The Gurg\"",
    "\"Paco Paco\"",
    "Desert Shicken",
    "Hot Bald Head",
    "Gauntlet",
    "\"Gammon\"",
    "Ending Scene"
    ]
}
function createDropProjectile (sprVictim: Sprite, sprAttacker: Sprite, speed: number, xoffset: number, yoffset: number, myImage: Image, direction: number) {
    angleToTarget = Math.atan2(sprVictim.y - sprAttacker.y, sprVictim.x - sprAttacker.x)
    myFireBall = sprites.createProjectileFromSide(myImage, 50, 50)
    myFireBall.setKind(SpriteKind.Egg)
    if (sprAttacker.vx > 0) {
        myFireBall.setPosition(sprAttacker.x + xoffset, sprAttacker.y + yoffset)
    } else {
        myFireBall.setPosition(sprAttacker.x - xoffset, sprAttacker.y + yoffset)
    }
    myFireBall.setVelocity(direction, speed)
}
function startTalking () {
    talking = true
    controller.moveSprite(dink, 0, 0)
}
// Start/Initialize section
function spriteInTile (sx: number, sy: number, tx: number, ty: number) {
    if (sx >= tx * 16 + 4 && (sx <= tx * 16 + 11 && (sy >= ty * 16 + 4 && sy <= ty * 16 + 11))) {
        return true
    } else {
        return false
    }
}
function damageGammon (myMonster: Sprite, source: Sprite, kb: boolean, arrow: boolean) {
    console.log("damageGammon")
    if (sprites.readDataNumber(source, "pingpong") == 1) {
        sprites.setDataNumber(myMonster, "health", sprites.readDataNumber(myMonster, "health") - 1)
        statusbar.value = sprites.readDataNumber(myMonster, "health")
        sprites.setDataNumber(myMonster, "invincible", 0)
        myMonster.sayText(sprites.readDataString(myMonster, "talk"), 300, false)
        gammonPlaced = true
        gannonIncapacitated = true
        if (kb) {
            console.log("set velocity to monster")
            console.logValue("monster is ", sprites.readDataString(myMonster, "monster"))
            spriteutils.setVelocityAtAngle(myMonster, spriteutils.angleFrom(source, myMonster), 10)
        }
        myMonster.setFlag(SpriteFlag.GhostThroughSprites, true)
        animation.runImageAnimation(
        myMonster,
        makeBlinkingAnimation(myMonster),
        100,
        true
        )
        timer.after(500, function () {
            animation.stopAnimation(animation.AnimationTypes.All, myMonster)
            myMonster.setFlag(SpriteFlag.GhostThroughSprites, false)
            characterAnimations.setCharacterAnimationsEnabled(myMonster, true)
            picture = myMonster.image.clone()
            picture.replace(3, 2)
            myGammon.setImage(picture)
        })
        timer.after(3000, function () {
            myGammon.setImage(assets.image`sprGammon`)
            sprites.setDataNumber(myMonster, "invincible", 1)
            gammonPlaced = false
            gannonIncapacitated = false
        })
    }
}
function damageMonster (myMonster: Sprite, source: Sprite, kb: boolean, arrow: boolean) {
    console.log("damageMonster")
    if (sprites.readDataNumber(myMonster, "invincible") == 0) {
        if (currentLevel == 15) {
        	
        }
        sprites.setDataNumber(myMonster, "health", sprites.readDataNumber(myMonster, "health") - sprites.readDataNumber(dink, "swordDamage"))
        if (currentLevel == 15) {
            statusbar.value = sprites.readDataNumber(myMonster, "health")
        }
        if (sprites.readDataNumber(myMonster, "health") <= 0) {
            if (bossBattle) {
                bossDies(myMonster)
            } else {
                enemyDrops(myMonster)
                myMonster.destroy(effects.ashes, 1000)
                music.smallCrash.play()
            }
        } else {
            if (sprites.readDataString(myMonster, "talk") != "") {
                myMonster.sayText(sprites.readDataString(myMonster, "talk"), 300, false)
            }
            if (kb) {
                console.log("set velocity to monster")
                console.logValue("monster is ", sprites.readDataString(myMonster, "monster"))
                if (arrow) {
                    spriteutils.setVelocityAtAngle(myMonster, spriteutils.angleFrom(source, myMonster), 40)
                } else {
                    spriteutils.setVelocityAtAngle(myMonster, spriteutils.angleFrom(sword, myMonster), 40)
                }
            }
            if (bossBattle) {
                if (sprites.readDataString(myMonster, "monster") != "paco") {
                    myMonster.setVelocity(0, 0)
                }
            } else {
            	
            }
            myMonster.setFlag(SpriteFlag.GhostThroughSprites, true)
            animation.runImageAnimation(
            myMonster,
            makeBlinkingAnimation(myMonster),
            100,
            true
            )
            timer.after(500, function () {
                animation.stopAnimation(animation.AnimationTypes.All, myMonster)
                myMonster.setFlag(SpriteFlag.GhostThroughSprites, false)
                characterAnimations.setCharacterAnimationsEnabled(myMonster, true)
            })
        }
    }
}
sprites.onOverlap(SpriteKind.Wall, SpriteKind.Player, function (sprite, otherSprite) {
    damagePlayer(sprite, true)
})
sprites.onOverlap(SpriteKind.FireBall, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.destroy(effects.fire, 200)
    damagePlayer(sprite, false)
    if (currentLevel == 15) {
        gammonPingPongActive = false
        gammonPlaced = false
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.ashes, 200)
    damageMonster(otherSprite, sprite, true, true)
})
// Game setup, which calls the 3 setup functions and the first level (0)
let locActive = 0
let locToY = 0
let locToX = 0
let locToMap = 0
let locY = 0
let locX = 0
let locMap = 0
let newOrb: Sprite = null
let shickenDirection = 0
let playerX = 0
let moving = false
let tempLife = 0
let gammonPhase = 0
let gannonIncapacitated = false
let gammonPingPongActive = false
let gammonPosition = 0
let myNPC4: Sprite = null
let myChest: Sprite = null
let myHouse: Sprite = null
let myQuiver: Sprite = null
let myHeart: Sprite = null
let randomTreasure = 0
let myFireBall: Sprite = null
let angleToTarget = 0
let myToMorph: Sprite = null
let myFromMorph: Sprite = null
let savedTilemap: tiles.WorldMap = null
let gammonPlaced = false
let locationLength = 0
let locationList: number[][] = []
let yellowPlaced = false
let bluePlaced = false
let myLife: TextSprite = null
let myBombs: TextSprite = null
let myArrows: TextSprite = null
let bossBattle = false
let boss: Sprite = null
let picture: Image = null
let animationArray: Image[] = []
let greenPlaced = false
let isSlashing = false
let nextBombRight = false
let myBomb: Sprite = null
let myBombBlast: Sprite = null
let myCannon: Sprite = null
let myNPC3: Sprite = null
let myNPC2: Sprite = null
let myZelba: Sprite = null
let myKing: Sprite = null
let myNPC1: Sprite = null
let playerChoosing = false
let myHeartContainer: Sprite = null
let myOrb: Sprite = null
let redPlaced = false
let myImage: Image = null
let statusbar: StatusBarSprite = null
let myGammon: Sprite = null
let myGun: Sprite = null
let myBald: Sprite = null
let myBelly: Sprite = null
let myShicken: Sprite = null
let myRightEye: Sprite = null
let myLeftEye: Sprite = null
let myPaco: Sprite = null
let myGurg: Sprite = null
let monsterId = 0
let myEnemy: Sprite = null
let sword: Sprite = null
let playerLife = 0
let maxHealth = 0
let arrow: Sprite = null
let shootingArrow = 0
let platformFlag = false
let lastDirection = 0
let transitioning = false
let talking = false
let mySprite: Sprite = null
let myPortal: Sprite = null
let styleLst: number[] = []
let txtLst: string[] = []
let backgrounds: Image[] = []
let levelStart: tiles.Location = null
let tilemapLst: tiles.WorldMap[] = []
let currentLevel = 0
let dink: Sprite = null
console.log("on start")
if (controller.B.isPressed()) {
    clearSave()
}
scene.setBackgroundColor(6)
spriteutils.setConsoleOverlay(false)
createDatabase()
game.setDialogCursor(assets.image`sprDink0`)
game.splash("The Fable of Zelba")
startGame()
game.onUpdate(function () {
    moving = controller.left.isPressed() || (controller.right.isPressed() || (controller.up.isPressed() || controller.down.isPressed()))
    if (lastDirection == 0) {
        sword.bottom = dink.top + 4
        sword.x = dink.x + 0
    } else if (lastDirection == 1) {
        sword.left = dink.right - 5
        sword.y = dink.y + 3
    } else if (lastDirection == 2) {
        sword.top = dink.bottom - 4
        sword.x = dink.x + 0
    } else {
        sword.right = dink.left + 5
        sword.y = dink.y + 3
    }
    if (currentLevel == 11) {
        if (sprites.readDataNumber(myPaco, "speed") != 60) {
            if (myPaco.isHittingTile(CollisionDirection.Left)) {
                myPaco.vx = sprites.readDataNumber(myPaco, "speed")
            } else if (myPaco.isHittingTile(CollisionDirection.Right)) {
                myPaco.vx = sprites.readDataNumber(myPaco, "speed") * -1
            }
        }
        setEyePosition()
    }
    if (currentLevel == 6 || currentLevel == 12) {
        if (myShicken.isHittingTile(CollisionDirection.Left) || playerX - myShicken.x > 80) {
            myShicken.vx = sprites.readDataNumber(myShicken, "speed")
            shickenDirection = 1
            playerX = dink.x
        } else if (myShicken.isHittingTile(CollisionDirection.Right) || myShicken.x - playerX > 80) {
            myShicken.vx = sprites.readDataNumber(myShicken, "speed") * -1
            shickenDirection = -1
            playerX = dink.x
        }
        setBellyPosition()
    }
})
game.onUpdateInterval(1400, function () {
    if (bossBattle) {
        if (currentLevel == 11 && sprites.readDataNumber(myPaco, "isShooting") == 1) {
            if (spriteInRange(dink, myPaco, 100)) {
                myImage = assets.image`sprFireBall`
                createFollowingProjectile(dink, myPaco, 60, 6, 20, myImage, 0)
                animation.runImageAnimation(
                myFireBall,
                assets.animation`animFireBall`,
                50,
                true
                )
            }
        }
    }
})
game.onUpdateInterval(800, function () {
    if (bossBattle) {
        if (currentLevel == 13 && sprites.readDataNumber(myBald, "isShooting") == 1) {
            if (spriteInRange(dink, myBald, 100)) {
                myImage = assets.image`sprFireBall`
                createFollowingProjectile(dink, myBald, 40, 6, 20, myImage, 1)
                animation.runImageAnimation(
                myFireBall,
                assets.animation`animBaldShot`,
                200,
                true
                )
            }
        }
    }
})
game.onUpdateInterval(1500, function () {
    if (bossBattle) {
        if (currentLevel == 15 && (sprites.readDataNumber(myGammon, "isShooting") == 1 && !(gannonIncapacitated))) {
            animation.runImageAnimation(
            myGammon,
            assets.animation`animGammonAttack`,
            250,
            false
            )
            myImage = assets.image`sprFireBallGammon`
            createFollowingProjectile(dink, myGammon, 60, 20, 20, myImage, 1)
            sprites.setDataNumber(myGammon, "isShooting", 0)
            gammonPingPongActive = true
        }
    }
})
game.onUpdateInterval(600, function () {
    if (currentLevel == 14) {
        for (let value of sprites.allOfKind(SpriteKind.Gun)) {
            if (Math.percentChance(30)) {
                if (sprites.readDataString(value, "monster") == "gunleft") {
                    myImage = assets.image`sprBulletSprayL`
                    createDropProjectile(dink, value, 1, 1, 1, myImage, 100)
                } else {
                    myImage = assets.image`sprBulletSprayR`
                    createDropProjectile(dink, value, 1, 1, 1, myImage, -100)
                }
            }
        }
    }
})
game.onUpdateInterval(900, function () {
    if (currentLevel == 6 && sprites.readDataNumber(myShicken, "isShooting") == 1 || currentLevel == 12 && sprites.readDataNumber(myShicken, "isShooting") == 1) {
        if (spriteInRange(dink, myShicken, 100)) {
            myImage = assets.image`sprEgg`
            console.log("should be shooting an egg")
            createDropProjectile(dink, myShicken, 40, -20, 20, myImage, 0)
        }
    }
    if (bossBattle) {
    	
    }
})
game.onUpdateInterval(500, function () {
    for (let value of sprites.allOfKind(SpriteKind.Special)) {
        if (spriteutils.distanceBetween(value, dink) < 24) {
            specialTalks(value)
        }
    }
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (sprites.readDataNumber(value, "followDistance") > 0) {
            if (spriteutils.distanceBetween(value, dink) < sprites.readDataNumber(value, "followDistance")) {
                enemyChase(value)
            }
        }
    }
    myLife.setIcon(img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ......cccc.cccc.....
        .....cc44ccc44cc....
        ....cc4444c4444cc...
        ....cc444444444cc...
        ....cc444444444cc...
        .....cc4444444cc....
        ......cc44444cc.....
        .......cc444cc......
        ........cc4cc.......
        .........ccc........
        ..........c.........
        ....................
        ....................
        ....................
        ....................
        `)
    myLife.setText(" " + convertToText(playerLife))
    if (sprites.readDataNumber(dink, "hasBow") == 1) {
        myArrows.setIcon(assets.image`sprRArrowRight`)
        myArrows.setText(" " + convertToText(sprites.readDataNumber(dink, "numArrows")))
    }
    if (currentLevel == 12) {
        myBombs.setIcon(assets.image`sprBomb`)
        myBombs.setText(" " + convertToText(sprites.readDataNumber(dink, "numBombs")))
    }
    if (sprites.readDataNumber(dink, "numOrbs") > 0) {
        tiles.destroySpritesOfKind(SpriteKind.OrbsScreen)
        if (sprites.readDataNumber(dink, "hasGreenOrb") == 1) {
            newOrb = sprites.create(assets.image`sprGreenGem`, SpriteKind.OrbsScreen)
            newOrb.setFlag(SpriteFlag.RelativeToCamera, true)
            newOrb.top = 0
            newOrb.left = 40
        }
        if (sprites.readDataNumber(dink, "hasBlueOrb") == 1) {
            newOrb = sprites.create(assets.image`sprBlueGem`, SpriteKind.OrbsScreen)
            newOrb.setFlag(SpriteFlag.RelativeToCamera, true)
            newOrb.top = 0
            newOrb.left = 53
        }
        if (sprites.readDataNumber(dink, "hasYellowOrb") == 1) {
            newOrb = sprites.create(assets.image`sprYellowGem`, SpriteKind.OrbsScreen)
            newOrb.setFlag(SpriteFlag.RelativeToCamera, true)
            newOrb.top = 0
            newOrb.left = 66
        }
        if (sprites.readDataNumber(dink, "hasRedOrb") == 1) {
            newOrb = sprites.create(assets.image`sprRedGem`, SpriteKind.OrbsScreen)
            newOrb.setFlag(SpriteFlag.RelativeToCamera, true)
            newOrb.top = 0
            newOrb.left = 79
        }
    }
    tiles.destroySpritesOfKind(SpriteKind.Potion)
    if (sprites.readDataNumber(dink, "hasPotion") == 1) {
        newOrb = sprites.create(assets.image`sprPotion`, SpriteKind.Potion)
        newOrb.setFlag(SpriteFlag.RelativeToCamera, true)
        newOrb.top = 96
        newOrb.left = 10
    }
})
game.onUpdateInterval(100, function () {
    for (let index = 0; index <= locationLength; index++) {
        locMap = locationList[index][0]
        locX = locationList[index][1]
        locY = locationList[index][2]
        locToMap = locationList[index][3]
        locToX = locationList[index][4]
        locToY = locationList[index][5]
        locActive = locationList[index][6]
        if (locActive == 1) {
            if (locMap == currentLevel) {
                if (spriteInTile(dink.x, dink.y, locX, locY)) {
                    if (!(transitioning)) {
                        transitioning = true
                        setupLevel(locToMap, locToX, locToY, true)
                        break;
                    }
                }
            }
        }
    }
})
game.onUpdateInterval(1200, function () {
    if (currentLevel == 13) {
        if (sprites.readDataNumber(myBald, "isVisible") == 1) {
            sprites.setDataNumber(myBald, "isVisible", 0)
            sprites.setDataNumber(myBald, "isShooting", 0)
            sprites.setDataNumber(myBald, "invincible", 1)
            myBald.setFlag(SpriteFlag.Ghost, true)
            myBald.setFlag(SpriteFlag.Invisible, true)
        } else {
            sprites.setDataNumber(myBald, "isVisible", 1)
            sprites.setDataNumber(myBald, "isShooting", 1)
            sprites.setDataNumber(myBald, "invincible", 0)
            myBald.setFlag(SpriteFlag.Ghost, false)
            myBald.setFlag(SpriteFlag.Invisible, false)
            myBald.setPosition(randint(16, 96), randint(32, 80))
            animation.runImageAnimation(
            myBald,
            assets.animation`myAnim2`,
            100,
            true
            )
        }
    }
})
game.onUpdateInterval(3000, function () {
    if (bossBattle) {
        if (currentLevel == 10) {
            myGurg.setPosition(myGurg.x + randint(-15, 15), myGurg.y + randint(-15, 15))
        }
    }
})
game.onUpdateInterval(3000, function () {
    if (currentLevel == 15) {
        if (!(gammonPlaced) && !(gannonIncapacitated)) {
            sprites.setDataNumber(myGammon, "isShooting", 0)
            gammonPosition = randint(0, 100)
            if (gammonPosition % 3 == 1) {
                story.startCutscene(function () {
                    story.spriteMoveToLocation(myGammon, 32, 48, 50)
                    gammonPlaced = true
                    sprites.setDataNumber(myGammon, "isShooting", 1)
                })
            } else if (gammonPosition % 3 == 2) {
                story.startCutscene(function () {
                    story.spriteMoveToLocation(myGammon, 80, 48, 50)
                    gammonPlaced = true
                    sprites.setDataNumber(myGammon, "isShooting", 1)
                })
            } else {
                story.startCutscene(function () {
                    story.spriteMoveToLocation(myGammon, 128, 48, 50)
                    gammonPlaced = true
                    sprites.setDataNumber(myGammon, "isShooting", 1)
                })
            }
        }
    }
})
