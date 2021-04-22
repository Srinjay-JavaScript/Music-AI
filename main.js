//Global Variable
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var ScoreLeftWrist = 0;

var peter_pan = "";
var harry_potter = "";

function preload(){
   peter_pan = loadSound("music2.mp3");
   harry_potter = loadSound("music.mp3");
}
   
function setup()
{
 canvas = createCanvas(400, 400);
 canvas.center();
 video = createCapture(VIDEO);
 video.hide();
 posenet = ml5.poseNet(video, initialized);
 posenet.on("pose", gotPoses);
 
}
function draw()
{
 image(video, 0, 0, 400, 400);
 pStatus = peter_pan.isPlaying();
 fill("red");
 stroke("red");

 if (ScoreLeftWrist > 0.2)
 {
     circle(leftWristX, leftWristY, 20);
     harry_potter.stop();
     if(pStatus == false)
     {
         peter_pan.play();
         document.getElementById("song").style.display = "inline";
         document.getElementById("song").innerHTML = "Peter Pan";
     }
 }

}
function initialized()
{
    console.log("Posenet is ready to detect poses.");
}
function gotPoses(result)
{
 if (result.length > 0)
 {
     // Left Wrist
     leftWristX = result[0].pose.leftWrist.x;
     leftWristY = result[0].pose.leftWrist.y;
    //Right Wrist
     rightWristX = result[0].pose.rightWrist.x;
     rightWristY = result[0].pose.rightWrist.y;
     ScoreLeftWrist = result[0].pose.keypoints[9].score;

 }
}
