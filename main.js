objects= []
function preload(){
    //img = loadVideo("car.mp4") 
}
function setup(){
    canvas = createCanvas(640 , 420)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(640 , 420)
    video.hide()

    
}
function draw(){
    image(video, 0 ,0 ,640 , 420 )
    if(status !=""){
        objectDetector.detect(video , gotResults)
        for (let i = 0; i < objects.length; i++) {
          
            fill("red")
            percent = Math.floor(objects[i].confidence*100)
            name = objects[i].label
            text(name+percent+"%" , objects[i].x , objects[i].y)
            noFill()
            stroke("red")
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)
            objectName= document.getElementById("objectip").value 
            if(objects[i].label == objectName){
                document.getElementById("status").innerHTML = objectName + " object is detected"
            }
            else{
                document.getElementById("status").innerHTML = objectName + " object is not detected" 
            }
        }
    }
}
function modelLoaded(){

        console.log("model is loaded")
        status = true ; 
}
function gotResults(error , results){
    if (error) {
console.log(error)        
    } else {
        console.log(results)
        objects = results
    }
}
function start(){

    objectDetector = ml5.objectDetector("cocossd" , modelLoaded)
    document.getElementById("status").innerHTML = "status : detecting objects"
}