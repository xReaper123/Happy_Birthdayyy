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



continueButton.onclick=()=>{


    continueButton.style.transform="scale(.9)";



    setTimeout(()=>{


        window.location.href="farm.html";


    },700);



};