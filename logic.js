var scene = document.querySelector('a-scene');
var ballRef = document.querySelector('a-scene').systems.firebase.firebase.database().ref("/ball");
var ball = document.querySelector('#idunnoman');
var score1 = 0;
var score2 = 0;
var fun = [
  "magenta",
  "red",
  "blue",
  "lime"
]
var lastCollidedWith = "";
ball.addEventListener('loaded', function (e) {
  ball.setAttribute('color', fun[Math.floor(Math.random() * 4)])
});
ball.addEventListener('body-loaded', function (e) {
  var bodyPos = new CANNON.Vec3().copy(ball.getComputedAttribute('position'));
   ball.body.applyImpulse(
    /* impulse */        new CANNON.Vec3(Math.random(), Math.random(), -10),
    /* world position */ new CANNON.Vec3(bodyPos.x + 0, bodyPos.y, bodyPos.z)
    );
});
ball.addEventListener('collide', function (e) {
    if (e.detail.body.el.id != lastCollidedWith){
        if (e.detail.body.el.id == "hand1") {
            score1 += 1;
        }

        if (e.detail.body.el.id == "hand2") {
            score2 += 1;
        }

        document.querySelector('#score1').setAttribute('text', 'text: ' + score1.toString());
        document.querySelector('#score2').setAttribute('text', 'text: ' + score2.toString());
        lastCollidedWith = e.detail.body.el.id;
    }

});

var hand1 = document.querySelector('#hand1');
var hand2 = document.querySelector('#hand2');

var OK1 = false;
var OK2 = false;

hand2.addEventListener('body-loaded', function (e) {
  OK2 = true;
});

hand1.addEventListener('body-loaded', function (e) {
  OK1 = true;
});

function paddleImpulseHandler(e) {
  e.detail.body.applyImpulse(new CANNON.Vec3().copy(e.detail.contact.ni).scale(1.2), new CANNON.Vec3().copy(e.detail.contact.ri));
}


hand1.addEventListener('collide', paddleImpulseHandler);
hand2.addEventListener('collide', paddleImpulseHandler);

var hand1Ref = document.querySelector('a-scene').systems.firebase.firebase.database().ref('/hand/1');
var hand2Ref = document.querySelector('a-scene').systems.firebase.firebase.database().ref('/hand/2');
hand1Ref.on('value', function(snapshot) {
  if (OK1) {
      hand1.setAttribute('position', { x: snapshot.child('x').val()/200, y: snapshot.child('y').val()/200, z: -6 });
  }
});
hand2Ref.on('value', function(snapshot) {
  if (OK2){
      hand2.setAttribute('position', { x: snapshot.child('x').val()/200, y: snapshot.child('y').val()/200, z: -2 });
  }
});
