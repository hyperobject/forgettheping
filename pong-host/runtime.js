var controllerOptions = {};

Leap.loop(function (frame){
    console.log(frame.hands.map(function (hand) {
        console.log(hand.palmPosition);
    }));
});
