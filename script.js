const messages = [

"Planting memories...",
"Watering the garden of love...",
"Preparing today's surprise...",
"Gathering flowers...",
"Creating a beautiful day for Rachel..."

];


const loadingText=document.getElementById("loading-text");

let i=0;


setInterval(()=>{

loadingText.textContent=messages[i];

i++;

if(i>=messages.length){

i=0;

}

},1000);





// AUDIO

const music=document.getElementById("background-music");

const hoverSound=document.getElementById("hover-sound");

const clickSound=document.getElementById("click-sound");

music.volume=0;


// Start music on first title screen interaction

document.addEventListener("click", function startMusicOnce(){


    fadeMusic();


    document.removeEventListener(
        "click",
        startMusicOnce
    );


});





function fadeMusic(){

    if(music.paused){

        music.volume = 0;


        music.play().then(()=>{


            let volume = 0;


            const fade = setInterval(()=>{


                if(volume < 0.35){

                    volume += 0.02;

                    music.volume = volume;

                }

                else{

                    clearInterval(fade);

                }


            },200);



        }).catch(error=>{

            console.log("Audio blocked until interaction:", error);

        });


    }

}






// Loading transition

setTimeout(()=>{


const loading=document.getElementById("loading-screen");


loading.style.opacity="0";

loading.style.transform="scale(1.05)";



setTimeout(()=>{


loading.style.display="none";


document.getElementById("title-screen").style.display="flex";


},1800);



},7000);






// Menu buttons

const buttons=document.querySelectorAll(".menu-button");


buttons.forEach(button=>{


button.addEventListener("mouseenter",()=>{


hoverSound.currentTime=0;

hoverSound.volume=.4;

hoverSound.play();


});





button.addEventListener("click",()=>{


clickSound.currentTime=0;

clickSound.volume=.5;

clickSound.play();


});


});



// ==========================================
// ENABLE MUSIC AFTER FIRST CLICK
// ==========================================


document.addEventListener("click", ()=>{


    if(music.paused){

        fadeMusic();

    }


},{once:true});




// Load game

document.getElementById("load-game").onclick=()=>{


const btn=document.getElementById("load-game");


// Start music after user interaction
fadeMusic();


clickSound.currentTime=0;
clickSound.play();


btn.style.transform="scale(.95)";


setTimeout(()=>{


window.location.href="birthday.html";


},800);


};

// ==========================================
// MUSIC TOGGLE
// ==========================================


const musicButton = document.getElementById("music-toggle");


let musicMuted = false;



musicButton.onclick = ()=>{


    musicMuted = !musicMuted;



    if(musicMuted){


        music.volume = 0;


        musicButton.textContent="🔇";


        musicButton.classList.add("muted");


    }


    else{


        music.volume=.35;


        musicButton.textContent="🎵";


        musicButton.classList.remove("muted");


    }


};

// ==========================================
// RACHEL'S DIALOGUE
// ==========================================


const dialogueMessages=[


"Rachel, thank you for making my world brighter every single day. 🌻",


"Every moment with you feels like a beautiful adventure.",


"You are my favorite person, my biggest smile, and my happiest place.",


"I hope today reminds you how loved and appreciated you truly are.",


"Thank you for being you. I am so lucky to have you in my life.",


"Welcome home, Rachel. Your little valley is waiting for you. 🌸"


];



const dialogueText=document.getElementById("dialogue-text");


let dialogueIndex=0;



setInterval(()=>{


dialogueText.style.animation="none";


void dialogueText.offsetWidth;


dialogueText.style.animation="textFade 1s ease";



dialogueIndex++;


if(dialogueIndex>=dialogueMessages.length){

    dialogueIndex=0;

}



dialogueText.textContent=
dialogueMessages[dialogueIndex];


},5000);

// ==========================================
// RACHEL REVEAL EVENT
// ==========================================


const rachelTrigger =
document.getElementById("rachel-trigger");


const rachelCharacter =
document.querySelector(".character-area");


const dialogueBox =
document.querySelector(".dialogue-box");



rachelTrigger.onclick = ()=>{


    // remove glowing button

    rachelTrigger.style.display="none";



    // reveal Rachel

    rachelCharacter.classList.remove("hidden");


    setTimeout(()=>{


        rachelCharacter.classList.add("show");


    },100);




    // reveal dialogue after character appears


    setTimeout(()=>{


        dialogueBox.classList.remove("hidden");


        dialogueBox.classList.add("show");


    },2200);



};

// ==========================================
// MAILBOX LETTER
// ==========================================


const mailbox = document.getElementById("mailbox");

const letterOverlay =
document.getElementById("letter-overlay");

const closeLetter =
document.getElementById("close-letter");



mailbox.onclick = ()=>{


    clickSound.currentTime=0;

    clickSound.volume=.5;

    clickSound.play();


    letterOverlay.classList.remove("hidden");


};



closeLetter.onclick = ()=>{


    letterOverlay.classList.add("hidden");


};