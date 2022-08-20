song = "";
leftWristX = 0;
lefttWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
song1 = "";
song2 = "";
function preload() {
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");

}


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#90fcad");
    stroke("#90fcad");

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if (song1_status == false) {
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
        }
    }

    if (rightWristY > 0 && rightWristY <= 100) {

        document.getElementById("speed").innerHTML = 'Speed = 0.5x';
        song.rate(0.5);
    }
    else if (rightWristY > 100 && rightWristY <= 200) {

        document.getElementById("speed").innerHTML = 'Speed = 1x';
        song.rate(1);
    }

    else if (rightWristY > 200 && rightWristY <= 300) {

        document.getElementById("speed").innerHTML = 'Speed = 1.5x';
        song.rate(1.5);
    }

    else if (rightWristY > 300 && rightWristY <= 400) {

        document.getElementById("speed").innerHTML = 'Speed = 2x';
        song.rate(2);
    }

    else if (rightWristY > 400) {

        document.getElementById("speed").innerHTML = 'Speed = 2.5x ';
        song.rate(2.5);
    }
}

if (scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    song1.stop();
    if (song2_status == false) {
        song2.play();
        document.getElementById("song").innerHTML = "Playing - Peter Pan Song"
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY" + rightWristY);

    }
}