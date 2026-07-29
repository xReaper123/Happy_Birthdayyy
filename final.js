// =======================================
// Rachel's Valley - Final Heart Event JS
// =======================================



const mailboxArea = 
document.getElementById("mailbox-area");


const mailbox = 
document.getElementById("mailbox");


const mailFlag =
document.getElementById("mail-flag");


const intro =
document.getElementById("intro-text");


const letterBox =
document.getElementById("letter-box");


const letterText =
document.getElementById("letter-text");


const rachelArea =
document.getElementById("rachel-area");


const rachelMessage =
document.getElementById("rachel-message");


const ending =
document.getElementById("ending");


const music =
document.getElementById("finalMusic");







// =======================================
// Birthday Letter Message
// =======================================


const birthdayMessage =

`Every flower.

Every tree.

Every little path...

Was created because someone very special deserves a valley of their own.


You bring happiness into my life in ways I cannot explain.

You make ordinary moments feel magical.

Thank you for being my favorite person,
my best friend,
and my home.


Happy Birthday Rachel ❤️


- Alfredo`;







// =======================================
// Typing Effect
// =======================================


function typeText(element, text, callback){


    let index = 0;


    element.innerHTML = "";



    const timer = setInterval(()=>{


        element.innerHTML += text[index];


        index++;



        if(index >= text.length){


            clearInterval(timer);



            if(callback){

                callback();

            }


        }



    },45);



}








// =======================================
// Intro Finished -> Show Mailbox
// =======================================


setTimeout(()=>{


    intro.style.display = "none";


    mailboxArea.style.display = "block";


},5000);








// =======================================
// Mailbox Click
// =======================================


mailboxArea.addEventListener(
"click",
()=>{


    // prevent multiple clicks

    mailboxArea.style.pointerEvents = "none";



    // Raise flag

    mailFlag.style.transform =
    "rotate(-55deg) translateY(-5px)";



    // Wait for mailbox animation

    setTimeout(()=>{


        mailboxArea.style.display = "none";



        letterBox.style.display = "block";



        // Start music

// Start final scene music

music.volume = 0;


// Fade music in

music.play()
.catch(()=>{});



let volume = 0;


let fadeMusic = setInterval(()=>{


    if(volume < 0.35){


        volume += 0.02;


        music.volume = volume;


    }


    else {


        clearInterval(fadeMusic);


    }


},200);


        typeText(

            letterText,

            birthdayMessage,

            showRachel

        );



    },1200);



});









// =======================================
// Rachel Entrance
// =======================================


function showRachel(){

    music.volume = 0.2;
    setTimeout(()=>{


        letterBox.style.display = "none";


        rachelArea.style.display = "flex";



        typeText(

            rachelMessage,

            "I hope you have a beautiful birthday, you deserve all the happiness in the world... 🌸",


            showEnding

        );



    },2000);



}









// =======================================
// Final Ending
// =======================================


function showEnding(){

    music.volume = 0.45;
    setTimeout(()=>{


        rachelArea.style.display = "none";


        ending.style.display = "block";


        createHearts();



    },5000);



}








// =======================================
// Floating Hearts
// =======================================


function createHearts(){


    for(let i = 0; i < 25; i++){



        const heart =
        document.createElement("div");



        heart.innerHTML = "❤️";



        heart.style.position = "fixed";


        heart.style.left =
        Math.random() * 100 + "vw";


        heart.style.bottom = "-50px";


        heart.style.fontSize =
        Math.random() * 20 + 20 + "px";


        heart.style.zIndex = "50";


        heart.style.pointerEvents = "none";


        document.body.appendChild(
            heart
        );



        setTimeout(()=>{


            heart.style.transition =
            "transform 5s ease, opacity 5s ease";



            heart.style.transform =
            `translateY(-${window.innerHeight + 300}px)
            rotate(360deg)`;


            heart.style.opacity = "0";



        },100);



        setTimeout(()=>{


            heart.remove();



        },6000);



    }



}