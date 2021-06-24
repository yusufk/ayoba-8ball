$(document).ready(function(){
    var Ayoba = getAyoba();
    var pathname = window.location.search;

    //$("#shareButton").hide();
    //$("#closeButton").hide();
    var magic8Ball = {};
    magic8Ball.listofanswers = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes, definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."];
   
    magic8Ball.getAnswer = function(question)
    {
      var randomNumber = Math.random();
      var randomAnswer = Math.floor(randomNumber * this.listofanswers.length);
      var answer = this.listofanswers[randomAnswer];
      
      $("#8ball").effect( "shake" );
      $("#answer").text( answer );
      $("#answer").fadeIn(3000);
      if (pathname.includes("jid")) {
        $("#shareButton").show();
        $("#closeButton").show();
      }
      $("#8ball").attr("src", "img/answerside.png");
  
      console.log(question);
      return answer;
    };
    $("#answer").hide();
    
    var question;
    var answer;
    var onClick = function()
    {
      $("#answer").hide();
      $("#8ball").attr("src", "img/magic8ballQuestion.png");
      question = $("#inputText").val();
      answer = magic8Ball.getAnswer(question);
      console.log(answer);
    };
    $("#questionButton").click( onClick );
    $("#shareButton").click( function() {
      Ayoba.sendMessage("Question: "+ question + "\nAnswer: "+ answer) 
    });
    $("#closeButton").click( function() {
      Ayoba.finish()
    });
  });
 
/**
* Determine the mobile operating system and returns the
* proper javascript interface
*/
function getAyoba() {
   var userAgent = navigator.userAgent || navigator.vendor || window.opera;
 
   // Windows Phone must come first because its UA also contains "Android"
   if (/windows phone/i.test(userAgent)) {
       return null;
   }
 
   if (/android/i.test(userAgent)) {
       try {
            return Android;
       } catch (error) {
          return null; 
       }
   }
 
   // iOS detection from: http://stackoverflow.com/a/9039885/177710
   if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
       return null; // todo
   }
 
   return "unknown";
}
