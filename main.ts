radio.setGroup(54)
radio.setTransmitPower(7)
radio.setFrequencyBand(4)
radio.setTransmitSerialNumber(true)

let serialNumber: number
let xd = 0
let yd = 0
let tn = 0
let sd = 0
let parts: string[] = []

function ServoControl(xdTilt: number, ydTilt: number) {
    sd = Math.map(xdTilt, -1023, 1023, -200, 200)
    sd = Math.constrain(sd, 0, 200)
    tn = Math.map(ydTilt, -1023, 1023, -200, 200)
    tn = Math.constrain(tn, 0, 200)
    if (xdTilt < -100) {
        // vpřed (forward)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, (xdTilt + ydTilt) / 2)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, (xdTilt - ydTilt) / 2)
    } else if (ydTilt > 100) {
        // pozpátku (reverse)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, xdTilt)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, xdTilt)
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
                xd = parseInt(parts[0])
                yd = parseInt(parts[1])
                ServoControl(xd, yd)
            }
        }
    }
})

input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Skull)
})


