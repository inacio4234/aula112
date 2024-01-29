prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 275,
    imageFormat: 'png',
    pngQuality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function tirarFoto(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = 
        '<img id="captured_image" src="' + data_uri +'"/>';
    });
}

console.log('ml5.version', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Q-PiXbaOf/model.json", modelLoaded);

function modelLoaded(){
    console.log("Modelo Carregado!");
}

function speak(){
    var synth = window.SpeechSynthesis;
    speakData1 = "A primeira previsão é " + prediction1;
    speakData1 = "A segunda previsão é " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

function modelLoaded(){
    console.log('Model Loaded!');
}

function check(){
    img = document.getElementById('captured image');
    classifier.classify(img,gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;
        document.getElementById("resultEmotionName2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if(results[0].label == "feliz")
        {
            document.getElementById("resultEmoji").innerHTML = "&#128516;";
        }
        if(results[0].label == "triste")
        {
            document.getElementById("resultEmoji").innerHTML = "&#128532;";
        }
        if(results[0].label == "irritado")
        {
            document.getElementById("resultEmoji").innerHTML = "&#128544;";
        }

        if(results[1].label == "feliz")
        {
            document.getElementById("resultEmoji2").innerHTML = "&#128516";
        }
        if(results[1].label == "triste")
        {
            document.getElementById("resultEmoji2").innerHTML = "&#128532;";
        }
        if(results[1].label == "irritado")
        {
            document.getElementById("resultEmoji2").innerHTML = "&#128544;";
        }
    }
    
}