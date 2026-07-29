// =======================================
// Rachel's Valley - Forest Puzzle JS
// =======================================


// ===============================
// Words
// ===============================

const words = [
    "RACHEL",
    "SMILE",
    "LOVE",
    "HEART",
    "JOY",
    "HUG",
    "ROSE",
    "BLOOM",
    "SUN",
    "STAR",
    "FOREST",
    "KIND"
];


const gridSize = 12;


let grid = [];

let placedWords = {};

let foundWords = [];

let selectedLetters = [];

let isSelecting = false;



const directions = [

    [0,1],
    [1,0],
    [1,1],
    [-1,1],
    [0,-1],
    [-1,0]

];



// ===============================
// Create Puzzle
// ===============================


function createEmptyGrid(){

    grid = [];

    for(let r = 0; r < gridSize; r++){

        grid[r] = [];

        for(let c = 0; c < gridSize; c++){

            grid[r][c] = "";

        }

    }

}





function generatePuzzle(){


    createEmptyGrid();



    words.forEach(word => {


        let placed = false;


        while(!placed){


            let row =
            Math.floor(Math.random()*gridSize);


            let col =
            Math.floor(Math.random()*gridSize);



            let direction =
            directions[
                Math.floor(
                    Math.random()*directions.length
                )
            ];



            if(canPlace(word,row,col,direction)){


                placeWord(
                    word,
                    row,
                    col,
                    direction
                );



                placedWords[word] =
                getCoordinates(
                    word,
                    row,
                    col,
                    direction
                );



                placed = true;


            }


        }


    });



    fillRemaining();


    drawGrid();


}




// ===============================
// Word Placement
// ===============================


function canPlace(word,row,col,direction){


    for(let i=0;i<word.length;i++){


        let r =
        row + direction[0]*i;


        let c =
        col + direction[1]*i;



        if(

            r < 0 ||
            c < 0 ||
            r >= gridSize ||
            c >= gridSize

        ){

            return false;

        }



        if(

            grid[r][c] !== "" &&
            grid[r][c] !== word[i]

        ){

            return false;

        }


    }


    return true;

}




function placeWord(word,row,col,direction){


    for(let i=0;i<word.length;i++){


        grid[
            row + direction[0]*i
        ][
            col + direction[1]*i
        ] = word[i];


    }


}




function getCoordinates(word,row,col,direction){


    let positions = [];


    for(let i=0;i<word.length;i++){


        positions.push({

            row:
            row + direction[0]*i,


            col:
            col + direction[1]*i


        });


    }


    return positions;


}





function fillRemaining(){


    const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";



    for(let r=0;r<gridSize;r++){


        for(let c=0;c<gridSize;c++){


            if(grid[r][c] === ""){


                grid[r][c] =
                alphabet[
                    Math.floor(
                        Math.random()*alphabet.length
                    )
                ];


            }


        }


    }


}




// ===============================
// Draw Grid
// ===============================


function drawGrid(){


    const container =
    document.getElementById(
        "word-grid"
    );



    container.innerHTML = "";



    for(let r=0;r<gridSize;r++){


        for(let c=0;c<gridSize;c++){


            let tile =
            document.createElement("div");



            tile.className="letter";



            tile.textContent =
            grid[r][c];



            tile.dataset.row=r;

            tile.dataset.col=c;



            container.appendChild(tile);


        }


    }


}




// ===============================
// Selecting
// ===============================


document.addEventListener(
"mousedown",
(e)=>{


    if(
        e.target.classList.contains("letter")
    ){


        isSelecting=true;


        clearSelection();


        selectTile(e.target);


    }


});





document.addEventListener(
"mouseover",
(e)=>{


    if(

        isSelecting &&
        e.target.classList.contains("letter")

    ){


        selectTile(e.target);


    }


});





document.addEventListener(
"mouseup",
()=>{


    if(isSelecting){


        isSelecting=false;


        checkSelection();


    }


});





function selectTile(tile){


    if(!selectedLetters.includes(tile)){


        selectedLetters.push(tile);


        tile.classList.add(
            "selected"
        );


    }


}





function clearSelection(){


    selectedLetters.forEach(tile=>{


        tile.classList.remove(
            "selected"
        );


    });


    selectedLetters=[];


}




// ===============================
// Check Word
// ===============================


function checkSelection(){


    let attempt="";


    selectedLetters.forEach(tile=>{


        attempt += tile.textContent;


    });



    let reverse =
    attempt
    .split("")
    .reverse()
    .join("");



    let answer = null;



    if(words.includes(attempt)){


        answer=attempt;


    }
    else if(words.includes(reverse)){


        answer=reverse;


    }




    if(answer){


        foundWord(answer);


    }
    else{


        clearSelection();


    }


}





function foundWord(word){


    if(foundWords.includes(word))
        return;



    foundWords.push(word);



    placedWords[word].forEach(pos=>{


        let tile =
        document.querySelector(

        `[data-row="${pos.row}"][data-col="${pos.col}"]`

        );



        if(tile){


            tile.classList.remove(
                "selected"
            );


            tile.classList.add(
                "found"
            );


        }


    });



    updateChecklist(word);


    playSound("selectSound");


    checkCompletion();


}




function updateChecklist(word){


    let item =
    document.querySelector(
        `[data-word="${word}"]`
    );



    if(item){


        item.classList.add(
            "completed"
        );


        item.innerHTML =
        "☑ " + word;


    }


}





// ===============================
// Rachel Dialogue Typing
// ===============================


let typingTimer;



function typeDialogue(text){


    let box =
    document.getElementById(
        "hint-message"
    );


    let closeButton =
    document.getElementById(
        "close-hint"
    );



    box.innerHTML="";


    closeButton.style.display="none";



    let index=0;



    clearInterval(
        typingTimer
    );



    typingTimer=setInterval(()=>{


        box.innerHTML += text[index];



        if(index % 3 === 0){

            playSound(
                "textSound"
            );

        }



        index++;



        if(index >= text.length){


            clearInterval(
                typingTimer
            );


            closeButton.style.display="block";


        }



    },40);


}





// ===============================
// Rachel Hint Button
// ===============================


document
.getElementById("hint-button")
.addEventListener(
"click",
()=>{


    let remaining =
    words.filter(
        word =>
        !foundWords.includes(word)
    );



    let dialogue;



    if(remaining.length){


        let hint =
        remaining[
            Math.floor(
                Math.random()*remaining.length
            )
        ];

highlightHintLetter(hint);

        dialogue =

        `The forest spirits found something...

Look carefully for:

🌿 ${hint}

I know you can find it!`;



    }
    else{


        dialogue =

        `You found every hidden secret...

The valley is smiling. 🌸`;



    }




    document
    .getElementById(
        "hint-popup"
    )
    .style.display="flex";



    typeDialogue(dialogue);


});





document
.getElementById("close-hint")
.addEventListener(
"click",
()=>{


    document
    .getElementById(
        "hint-popup"
    )
    .style.display="none";


});



// =======================================
// Highlight First Letter Hint
// =======================================


function highlightHintLetter(word){


    let positions =
    placedWords[word];



    if(!positions)
        return;



    let firstLetter =
    positions[0];



    let tile =
    document.querySelector(

        `[data-row="${firstLetter.row}"][data-col="${firstLetter.col}"]`

    );



    if(tile){


        tile.classList.add(
            "hint-highlight"
        );



        setTimeout(()=>{


            tile.classList.remove(
                "hint-highlight"
            );


        },5000);


    }


}


// ===============================
// Background Music
// ===============================


const music =
document.getElementById(
    "backgroundMusic"
);



function startMusic(){


    if(music){


        music.volume=.35;


        music.play()
        .catch(()=>{});


    }


}




document.addEventListener(
"click",
()=>{


    startMusic();


},
{
    once:true
});






// ===============================
// Completion
// ===============================


function checkCompletion(){


    if(foundWords.length === words.length){


        setTimeout(()=>{


            document
            .getElementById(
                "completion-screen"
            )
            .style.display="flex";



            playSound(
                "completeSound"
            );



            createLeaves();



        },1000);


    }


}




// ===============================
// Sounds
// ===============================


function playSound(id){


    let sound =
    document.getElementById(id);



    if(sound){


        sound.currentTime=0;


        sound.play()
        .catch(()=>{});


    }


}





// ===============================
// Falling Leaves
// ===============================


function createLeaves(){


    for(let i=0;i<50;i++){


        let leaf =
        document.createElement("div");



        leaf.innerHTML="🍃";



        leaf.style.position="fixed";

        leaf.style.left =
        Math.random()*100+"vw";


        leaf.style.top="-50px";


        leaf.style.fontSize="25px";


        leaf.style.zIndex="100";



        leaf.style.transition=
        "5s linear";



        document.body.appendChild(leaf);



        setTimeout(()=>{


            leaf.style.transform =

            `translateY(${window.innerHeight+100}px)
            rotate(720deg)`;


        },100);



        setTimeout(()=>{


            leaf.remove();


        },6000);


    }


}



// =======================================
// Final Page Transition
// =======================================


document
.getElementById("continue-button")
.addEventListener(
"click",
()=>{


    let transition =
    document.getElementById(
        "page-transition"
    );



    transition.classList.add(
        "active"
    );



    setTimeout(()=>{


        window.location.href =
        "final.html";



    },1500);



});

// ===============================
// Start Game
// ===============================


generatePuzzle();