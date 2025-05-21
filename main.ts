radio.setGroup(54)
radio.setTransmitSerialNumber(true)

let x = 0
let y = 0
let zatoc = 0
let rychlost = 0

function controlServo(xTilt: number, yTilt: number) {
    rychlost = Math.map(xTilt, -1023, 1023, -255, 255)
    rychlost = Math.constrain(rychlost, 100, 255)
    zatoc = Math.map(yTilt, 0, 1023, 0, 255)
    zatoc = Math.constrain(zatoc, 100, 255)

    if (xTilt < -10) {
        PCAmotor.MotorRun(PCAmotor.Motors.M4, xTilt + yTilt / 3)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, xTilt - yTilt / 20)
    } else if (xTilt > 10) {
        PCAmotor.MotorRun(PCAmotor.Motors.M1, xTilt)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, xTilt)
    } else {
        PCAmotor.MotorStopAll()
    }
}


radio.onReceivedString(function (receivedString: string) {
    if (receivedString == "Stop") {
        PCAmotor.MotorStopAll()
        basic.pause(1000)
    } else {
        let parts = receivedString.split(",")
        if (parts.length == 2) {
            x = parseInt(parts[0])
            y = parseInt(parts[1])
            controlServo(x, y)
        }
    }
})

input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Heart)

})