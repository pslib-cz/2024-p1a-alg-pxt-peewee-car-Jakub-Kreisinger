radio.setGroup(54);
radio.setTransmitPower(7)
radio.setFrequencyBand(4)
radio.setTransmitSerialNumber(true)

let a = 0;
let b = 0;
let turn = 0;
let speed = 0;


function servoControl(aTilt: number, bTilt: number) {
    speed = Math.map(aTilt, -1023, 1023, -200, 200);
    speed = Math.constrain(speed, 0, 200);
    turn = Math.map(bTilt, -1023, 1023, -200, 200);
    turn = Math.constrain(turn, 0, 200);

    if (aTilt < -1) {
        // vpřed (forward)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, (aTilt + bTilt)/2.15);
        PCAmotor.MotorRun(PCAmotor.Motors.M1, (aTilt - bTilt)*1.5);
    } else if (bTilt > 1) {
        // pozpátku (reverse)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, aTilt);
        PCAmotor.MotorRun(PCAmotor.Motors.M4, aTilt);
    } else {
        // stop
        PCAmotor.MotorStopAll();
    }
}

radio.onReceivedString(function (receivedString: string) {
    if (receivedString == "Stop") {
        PCAmotor.MotorStopAll();
        basic.pause(1000);
    } else {
        let parts = receivedString.split(",");
        if (parts.length == 2) {
            a = parseInt(parts[0]);
            b = parseInt(parts[1]);
            servoControl(a, b);
        }
    }
});

input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Skull);
});
