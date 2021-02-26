let video;
let yolo;
let status;
let synth = window.speechSynthesis;
let objects = [];

function setup() {
    createCanvas(900, 600);
    video = createCapture(VIDEO);
    video.size(1080, 1920);


    yolo = ml5.YOLO(video, startDetecting);


    video.hide();
    status = select('#status');
}

function draw() {
    image(video, 0, 0, width, height);
    for (let i = 0; i < objects.length; i++) {
        noStroke();
        fill(0, 0, 255);
        textSize(50);
        text(objects[i].className, objects[i].x * width, objects[i].y * height - 5);
        noFill();
        synth.speak(new SpeechSynthesisUtterance(objects[i].className))
        strokeWeight(4);
        stroke(0, 0, 255);
        rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
    }
}

function startDetecting() {

    console.log('Model Ready');
    detect();
}

function detect() {
    yolo.detect(function(err, results) {
        objects = results;
        detect();
    });
}