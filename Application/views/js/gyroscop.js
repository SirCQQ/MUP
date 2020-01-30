let gyroscope = new Gyroscope({frequency: 1});

gyroscope.addEventListener('reading', e => {
    console.log("Angular velocity along the X-axis " + gyroscope.x);
    console.log("Angular velocity along the Y-axis " + gyroscope.y);
    console.log("Angular velocity along the Z-axis " + gyroscope.z);
});
gyroscope.start();