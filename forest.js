const hoverSound =
document.getElementById("button-hover");


const clickSound =
document.getElementById("button-click");

const storyText =
document.getElementById("story-text");


const continueButton =
document.getElementById("continue");


const music =
document.getElementById("forest-music");





let messages = [


"Rachel followed the path beyond the valley...",


"The familiar fields slowly disappeared behind her.",


"But something about this place felt different...",


"A warm glow appeared between the trees.",


"Hidden among the forest was a place prepared just for her.",


"Someone wanted her to know how special she truly is. ❤️"


];



let index = 0;




function startMusic(){


music.volume=.25;

music.play();


}



function showStory(){


storyText.innerHTML =
messages[index];


}

continueButton.addEventListener("mouseenter",()=>{


    if(hoverSound){

        hoverSound.currentTime = 0;

        hoverSound.play();

    }


});

continueButton.addEventListener("click",()=>{


    if(clickSound){

        clickSound.currentTime = 0;

        clickSound.play();

    }


index++;



if(index < messages.length){


showStory();


}

else{


continueButton.innerHTML =
"Enter the grove ✨";


continueButton.onclick=()=>{


    if(clickSound){

        clickSound.currentTime = 0;

        clickSound.play();

    }



    document.body.style.transition =
    "opacity 1.5s ease";


    document.body.style.opacity = "0";



    setTimeout(()=>{


        window.location.href="puzzle.html";


    },1500);



};



}



});





startMusic();

showStory();