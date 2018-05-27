/**
 * Ref: https://github.com/aframevr/aframe/blob/master/docs/components/
 */

AFRAME.registerComponent('dynamic', {
  tick: function (t, dt) {
    if (!dt) return;

    var maxInterval = 1 / 60 * 1000;
    dt = Math.min(dt, maxInterval);

    var el = this.el;

    // 消失判定
    var y = el.object3D.position.y;
    if (y < -100) {
      return el.parentNode.removeChild(el);
    }

    // 重力の計算
    var velocity = el.getAttribute('velocity') || {x: 0, y: 0, z: 0};
    el.setAttribute('velocity', {
      x: velocity.x,
      y: velocity.y - 9.8 * dt / 1000,
      z: velocity.z
    });
  }
});

AFRAME.registerComponent('velocity', {
  schema: {type: 'vec3'},

  tick: function (t, dt) {
    if (!dt) return;

    var maxInterval = 1 / 60 * 1000;
    dt = Math.min(dt, maxInterval);

    var el = this.el;

    var velocity = el.getAttribute('velocity') || {x: 0, y: 0, z: 0};
    var position = el.object3D.position;

    el.object3D.position.set(
      position.x + velocity.x * dt / 1000,
      position.y + velocity.y * dt / 1000,
      position.z + velocity.z * dt / 1000
    );
  }
});

AFRAME.registerComponent('angular-velocity', {
  schema: {type: 'vec3'},

  tick: function (t, dt) {
    if (!dt) return;

    var maxInterval = 1 / 60 * 1000;
    dt = Math.min(dt, maxInterval);

    var el = this.el;

    var angularVelocity = el.getAttribute('angular-velocity') || {x: 0, y: 0, z: 0};
    var rotation = el.object3D.rotation;

    el.object3D.rotation.set(
      rotation.x + angularVelocity.x * dt / 1000,
      rotation.y + angularVelocity.y * dt / 1000,
      rotation.z + angularVelocity.z * dt / 1000
    );
  }
});