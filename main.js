function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classify = ml5.ImageClassifier('MobileNet',modelLoaded);
}

function modelLoded()  {
  console.log('model loaded');
}

function draw()  {
  image(video,0,0,300,300);
  classifier.classify(video,gotResult);
}

var previous_result = '';

function gotResult(error,results)  {
  if(error){
    console.error(error);
  }
  else{
    if((results[0].confiedence>0.5)&&(previous_result!= results[0].Label)){
      console.log(results);
      previous_result = results[0].Label;
      var synth = window.speechSynthesis;
      speak_data = 'object Detected is'+ results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("result_object_name").InnerHTML = results[0].label;
      document.getElementById("result_object_accuracy").InnerHTML = results[0].confiedence.toFixed(3);
    }
  }
}