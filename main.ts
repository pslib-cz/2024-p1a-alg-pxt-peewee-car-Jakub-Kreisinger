radio.setGroup(54)
radio.setTransmitPower(7)
radio.setFrequencyBand(4)
radio.setTransmitSerialNumber(true)

let serialNumber: number
let x = 0
let y = 0
let tn = 0
let sd = 0
let parts: string[] = []

function ServoControl(xTilt: number, yTilt: number) {
    sd = Math.map(xTilt, -1023, 1023, -200, 200)
    sd = Math.constrain(sd, 0, 200)
    tn = Math.map(yTilt, -1023, 1023, -200, 200)
    tn = Math.constrain(tn, 0, 200)
    if (xTilt < -100) {
        // vpřed (forward)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, (xTilt + yTilt) / 2)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, (xTilt - yTilt) / 2)
    } else if (yTilt > 100) {
        // pozpátku (reverse)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, xTilt)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, xTilt)
    } else {
        // stop
        PCAmotor.MotorStopAll()
    }
}
serialNumber = radio.receivedPacket(RadioPacketProperty.SerialNumber)

radio.onReceivedString(function (receivedString) {
    radio.receivedPacket(RadioPacketProperty.SerialNumber)
    if (serialNumber = 1569162800) {
        if (receivedString == "Stop") {
            PCAmotor.MotorStopAll()
            basic.pause(1000)
        } else {
            parts = receivedString.split(",")
            if (parts.length == 2) {
                x = parseInt(parts[0])
                y = parseInt(parts[1])
                ServoControl(x, y)
            }
        }
    }
})

input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Skull)
})

type IRC = {
    l: DigitalPin,
    c: DigitalPin,
    r: DigitalPin
}
const IR: IRC = {
    l: DigitalPin.P14,
    c: DigitalPin.P15,
    r: DigitalPin.P13
}
pins.setPull(IR.l, PinPullMode.PullNone);
pins.setPull(IR.c, PinPullMode.PullNone);
pins.setPull(IR.r, PinPullMode.PullNone);