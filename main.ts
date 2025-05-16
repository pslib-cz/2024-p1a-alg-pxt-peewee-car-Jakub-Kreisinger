radio.setGroup(11)

let y = 0
let x = 0
let zataceni = 0
let rychlost = 0

function controlServo(xTilt: number, yTilt: number) {
    rychlost = Math.map(yTilt, -1023, 1023, -200, 200)
    rychlost = Math.constrain(rychlost, 0, 200)
    zataceni = Math.map(xTilt, -1023, 1023, -200, 200)
    zataceni = Math.constrain(zataceni, 0, 200)
    if (yTilt < -10) {
        // vpřed
        PCAmotor.MotorRun(PCAmotor.Motors.M4, yTilt + xTilt / 3)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, yTilt - xTilt / 3)
    } else if (yTilt > 10) {
        // pozpátku
        PCAmotor.MotorRun(PCAmotor.Motors.M1, yTilt)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, yTilt)
    } else {
        // stop
        PCAmotor.MotorStopAll()
    }
}
radio.onReceivedValue(function (name, value) {
    if (name == "x") {
        x = value
    } else if (name == "y") {
        y = value
    }
    controlServo(x, y)
})

