// =====================================
// RACHEL'S VALLEY
// FARM.JS
// =====================================


// =====================================
// ELEMENTS
// =====================================

// Player

const player = document.getElementById("player");


// UI

const interaction = document.getElementById("interaction");

const dialogue = document.getElementById("dialogue-screen");

const closeDialogue = document.getElementById("close-dialogue");


// Quest

const questLetter = document.getElementById("quest-letter");

const questFlowers = document.getElementById("quest-flowers");

const questGift = document.getElementById("quest-gift");

const gift = document.querySelector(".gift");

const giftDialogue = document.createElement("div");


// Mailbox

const mailbox = document.querySelector(".mailbox");


// Flowers

const flowers = document.querySelectorAll(".flower");

const flowerDialogue =
document.getElementById("flower-dialogue");

const flowerText =
document.getElementById("flower-text");

const flowerClose =
document.getElementById("flower-close");


// Sounds

const hoverSound =
document.getElementById("button-hover");

const clickSound =
document.getElementById("button-click");

const pickupSound =
document.getElementById("pickup-sound");


const giftOpenSound =
document.getElementById("gift-open-sound");



// =====================================
// PLAYER SETTINGS
// =====================================


let x = window.innerWidth * 0.45;

let y = window.innerHeight * 0.55;


const speed = 1;


const keys = {};





// =====================================
// GAME STATE
// =====================================


let nearMailbox = false;

let letterRead = false;


let nearFlower = null;


let flowersCollected = 0;

let giftClaimed = false;
let nearGift = false;

let valleyExitUnlocked = false;
let nearExit = false;


// =====================================
// KEYBOARD INPUT
// =====================================


document.addEventListener("keydown",(e)=>{


    keys[e.key.toLowerCase()] = true;



    // Open letter

    if(

        e.key.toLowerCase() === "e" &&

        nearMailbox &&

        !letterRead

    ){

        dialogue.style.display="flex";

    }





    // Pick flower

    if(

        e.key.toLowerCase() === "e" &&

        nearFlower

    ){

        collectFlower(nearFlower);

    }

// Open gift

if(
    e.key.toLowerCase() === "e" &&
    nearGift
){

    openGift();

}

// Leave valley

if(
    e.key.toLowerCase() === "e" &&
    nearExit
){

    leaveValley();

}
// =====================================
// OPEN GIFT
// =====================================

function openGift(){


giftClaimed = true;
nearGift = false;
valleyExitUnlocked = true;
document
.querySelector(".gift-icon")
.classList.add("gift-opened");

    gift.style.display="none";


    interaction.style.display="none";



    questGift.innerHTML =

    "✅ Open your birthday present";

setTimeout(()=>{

    questGift.innerHTML =
    "🌅 Leave the valley through the path";

},1500);


popupTitle.innerHTML = "🎁 Birthday Present Opened!";


flowerDialogue.style.display="flex";


flowerText.innerHTML =


`
<br><br>

Before you continue, I want you to know something...

<br><br>

I am so grateful to have you in my life.

<br><br>

Thank you for every smile, every memory, every moment, and for being the incredible person that you are.

<br><br>

You mean more to me than words could ever explain, and I hope you are enjoying your time in the valley. 

<br><br>

When you're ready, click Continue to carry on your little adventure. ✨

<br><br>

Your surprise is waiting for you at the exit. ❤️

`;


}

});





document.addEventListener("keyup",(e)=>{


    keys[e.key.toLowerCase()] = false;


});










// =====================================
// GAME LOOP
// =====================================


function update(){



    // Movement disabled during dialogue

    if(dialogue.style.display !== "flex"

    && flowerDialogue.style.display !== "flex"){



        if(keys["w"] || keys["arrowup"]){

            y -= speed;

        }



        if(keys["s"] || keys["arrowdown"]){

            y += speed;

        }




        if(keys["a"] || keys["arrowleft"]){

            x -= speed;


            player.style.transform =
            "scaleX(-1)";

        }




        if(keys["d"] || keys["arrowright"]){

            x += speed;


            player.style.transform =
            "scaleX(1)";

        }


    }





    // Boundaries


    const maxX =
    window.innerWidth - player.offsetWidth;


    const maxY =
    window.innerHeight - player.offsetHeight;




    if(x < 0) x = 0;

    if(y < 0) y = 0;


    if(x > maxX) x=maxX;

    if(y > maxY) y=maxY;





    // Move player


    player.style.left = x + "px";

    player.style.top = y + "px";






checkMailbox();

checkFlowers();

checkGift();

checkExit();



    requestAnimationFrame(update);


}





const backgroundMusic =
document.getElementById("background-music");


// =====================================
// VALLEY EXIT
// =====================================

function checkExit(){


    if(!valleyExitUnlocked)

        return;



    const playerRect =
    player.getBoundingClientRect();



    // Top right exit area

    if(

        playerRect.left > window.innerWidth - 150 &&

        playerRect.top < 150

    ){


        nearExit=true;


        interaction.style.display="block";


        interaction.innerHTML =
        "Press E to leave the valley";


    }

    else{


        nearExit=false;


    }


}
// =====================================
// MAILBOX CHECK
// =====================================


function checkMailbox(){



    const playerRect =
    player.getBoundingClientRect();



    const mailboxRect =
    mailbox.getBoundingClientRect();




    const dx =

    (mailboxRect.left + mailboxRect.width/2)

    -

    (playerRect.left + playerRect.width/2);





    const dy =

    (mailboxRect.top + mailboxRect.height/2)

    -

    (playerRect.top + playerRect.height/2);






    const distance =
    Math.sqrt(dx*dx + dy*dy);






    if(distance < 90 && !letterRead){



        interaction.style.display="block";


        interaction.innerHTML =
        "Press E to read letter";



        nearMailbox=true;



    }

    else{


        nearMailbox=false;



        if(!nearFlower){

            interaction.style.display="none";

        }


    }


}









// =====================================
// FLOWERS
// =====================================


function checkFlowers(){


    nearFlower=null;



    flowers.forEach((flower)=>{



        if(flower.style.display==="none")

            return;




        const playerRect =
        player.getBoundingClientRect();


        const flowerRect =
        flower.getBoundingClientRect();




        const dx =

        (flowerRect.left + flowerRect.width/2)

        -

        (playerRect.left + playerRect.width/2);





        const dy =

        (flowerRect.top + flowerRect.height/2)

        -

        (playerRect.top + playerRect.height/2);






        const distance =
        Math.sqrt(dx*dx + dy*dy);





        if(distance < 90){



            nearFlower=flower;



            interaction.style.display="block";


            interaction.innerHTML =
            "Press E to pick flower";


        }


    });


}







const popupTitle =
document.getElementById("popup-title");

function collectFlower(flower){


    flower.style.display="none";


    flowersCollected++;


    if(pickupSound){

        pickupSound.currentTime=0;

        pickupSound.play();

    }



    popupTitle.innerHTML = "🌻 Flower Collected";


    flowerDialogue.style.display="flex";



    let flowerMessages = [

`
You picked a beautiful flower 🌻

<br><br>

This flower reminds me of your kindness.

<br><br>

You have one of the warmest hearts I know. Your compassion and empathy make the world a better place, and I am so grateful to have you in my life.

<br><br>

Never forget that your kindness is one of the most beautiful things about you. ❤️

`,

`
You picked a beautiful flower 🌻

<br><br>

This flower reminds me of your beautiful spirit.

<br><br>

You bring happiness into the lives of the people around you in ways you probably don't even realize.

<br><br>

Your smile, your laughter, and the little moments we share are memories I will always treasure.

<br><br>

You make ordinary days feel extraordinary. ❤️

`,

`
You picked a beautiful flower 🌻

<br><br>

This flower represents your strength and everything that makes you unique.

<br><br>

You are someone who continues to shine even when things get difficult. Your determination, your heart, and the person you are becoming inspire me more than words can say.

<br><br>

You are truly one of a kind, and I hope you always remember how amazing you are. ❤️

`

];


flowerText.innerHTML =
flowerMessages[flowersCollected - 1];





if(flowersCollected < 3){


    questFlowers.innerHTML =

    `🌻 Pick ${flowersCollected}/3 flowers`;


}

else{


    questFlowers.innerHTML =

    "✅ Pick 3 flowers";


}



nearFlower=null;


}









// =====================================
// CLOSE BIRTHDAY LETTER
// =====================================


closeDialogue.addEventListener("mouseenter",()=>{


    if(hoverSound){


        hoverSound.currentTime=0;

        hoverSound.play();


    }


});






closeDialogue.addEventListener("click",()=>{



    if(clickSound){


        clickSound.currentTime=0;

        clickSound.play();


    }





    dialogue.style.display="none";



    letterRead=true;




    questLetter.innerHTML =

    "✅ Read your birthday letter";



});









// =====================================
// CLOSE FLOWER POPUP
// =====================================


flowerClose.addEventListener("click",()=>{



    if(clickSound){


        clickSound.currentTime=0;

        clickSound.play();


    }



    flowerDialogue.style.display="none";


});









// =====================================
// RESIZE
// =====================================


window.addEventListener("resize",()=>{


    const maxX =
    window.innerWidth - player.offsetWidth;


    const maxY =
    window.innerHeight - player.offsetHeight;




    if(x > maxX) x=maxX;


    if(y > maxY) y=maxY;


});



// =====================================
// GIFT CHECK
// =====================================

function checkGift(){


if(giftClaimed){

    nearGift = false;

    return;

}



    const playerRect =
    player.getBoundingClientRect();



    const giftRect =
    gift.getBoundingClientRect();



    const dx =

    (giftRect.left + giftRect.width/2)

    -

    (playerRect.left + playerRect.width/2);



    const dy =

    (giftRect.top + giftRect.height/2)

    -

    (playerRect.top + playerRect.height/2);



    const distance =
    Math.sqrt(dx*dx + dy*dy);



    if(distance < 100){


        if(letterRead && flowersCollected >= 3){


            nearGift=true;


            interaction.style.display="block";

            interaction.innerHTML =
            "Press E to open gift";


        }

        else{


            nearGift=false;


            interaction.style.display="block";

            interaction.innerHTML =
            "Complete your birthday quest first";


        }


    }

    else{


        nearGift=false;


    }


}





// =====================================
// START GAME
// =====================================


// =====================================
// BACKGROUND MUSIC
// =====================================


function startMusic(){

    if(backgroundMusic){

        backgroundMusic.volume = 0;

        backgroundMusic.play();


        let volume = 0;


        const fade = setInterval(()=>{

            if(volume < 0.35){

                volume += 0.01;

                backgroundMusic.volume = volume;

            }

            else{

                clearInterval(fade);

            }


        },100);


    }

}

// =====================================
// LEAVE VALLEY TRANSITION
// =====================================


function leaveValley(){

    nearGift = false;
    nearExit = false;

    interaction.style.display="none";


    // fade screen

    document.body.style.transition =
    "opacity 1.5s ease";


    document.body.style.opacity = "0";



    setTimeout(()=>{


        window.location.href = "forest.html";


    },1500);


}

// =====================================
// START GAME
// =====================================


startMusic();

update();