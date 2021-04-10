status = "";
video = "";
objects = [];

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 360);
    canvas.center();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status= Detecting objects";

}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if (error) {

        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }

    function draw() {
        image(video, 0, 0, 480, 360);

        if (status != "") {
            objectDetector.detect(video, gotResult);

            for (i = 0; 1 < objects.length; i++);
            {
                document.getElementById("status").innerHTML = "Status= Object detected";
                document.getElementById("number_of_objects").innerHTML = "Number of objects = " + objects.length;

                fill("#FF0000");
                percent = floor(objects[i].confidence * 100);
                noFill();
                text(objects[i].label+" "+percent+"%"+objects[i].x+15, objects[i].y+15);
                stroke("#FF0000");
                rect(objects[i].x , objects[i].y, objects[i].width , objects[i].height);
            }
        }