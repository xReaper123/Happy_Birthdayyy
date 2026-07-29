// =====================================
// MORNING MUSIC
// =====================================


const morningMusic =
document.getElementById("morning-music");



morningMusic.volume = 0;



function fadeInMusic(){


    morningMusic.play().then(()=>{


        let volume = 0;



        const fade = setInterval(()=>{


            if(volume < .35){


                volume += .02;


                morningMusic.volume = volume;


            }

            else{


                clearInterval(fade);


            }


        },200);



    }).catch(error=>{


        console.log(
            "Music waiting for interaction:",
            error
        );


    });


}





fadeInMusic();








// =====================================
// CONTINUE BUTTON
//=====================================


const continueButton =
document.getElementById("continue-button");


const transition =
document.getElementById("page-transition");



continueButton.addEventListener("click",()=>{


    // button press animation

    continueButton.style.transform="scale(.9)";



    // play click sound

    const clickSound =
    document.getElementById("click-sound");


    if(clickSound){

        clickSound.currentTime = 0;

        clickSound.play();

    }



    // fade screen

    transition.classList.add("fade-out");



    setTimeout(()=>{


        window.location.href="farm.html";


    },1000);


});




// =====================================
// PAGE LOAD FADE IN
//=====================================


window.addEventListener("load",()=>{


    transition.classList.remove("fade-out");


});

