/**
 * Ref: https://github.com/aframevr/aframe/blob/master/docs/components/
 */

AFRAME.registerComponent('dynamic', {
  tick: function (t, dt) {
    if (!dt) return;

    var maxInterval = 1 / 60 * 1000;
    dt = Math.min(dt, maxInterval);

    var entity = this.el;

    // 消失判定
    var y = entity.object3D.position.y;
    if (y < -100) {
      return entity.parentNode.removeChild(entity);
    }

    // 重力の計算
    var velocity = entity.getAttribute('velocity') || {x: 0, y: 0, z: 0};
    entity.setAttribute('velocity', {
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

    var entity = this.el;

    var velocity = entity.getAttribute('velocity') || {x: 0, y: 0, z: 0};
    var position = entity.object3D.position;

    entity.object3D.position.set(
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

    var entity = this.el;

    var angularVelocity = entity.getAttribute('angular-velocity') || {x: 0, y: 0, z: 0};
    var rotation = entity.object3D.rotation;

    entity.object3D.rotation.set(
      rotation.x + angularVelocity.x * dt / 1000,
      rotation.y + angularVelocity.y * dt / 1000,
      rotation.z + angularVelocity.z * dt / 1000
    );
  }
});