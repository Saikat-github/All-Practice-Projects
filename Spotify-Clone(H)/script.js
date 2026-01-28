
//audioElement.play();

//Initialize the variables
//Step-1
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.querySelector("#masterSongName");

//Step-2
let songs = [
    {
        songName: "Let me Love you",
        filename: "songs/0.mp3",
        coverPath: "covers/1.jpg"
    },
    {
        songName: "Let me Love you1",
        filename: "songs/1.mp3",
        coverPath: "covers/1.jpg"
    },
    {
        songName: "Let me Love you2",
        filename: "songs/2.mp3",
        coverPath: "covers/2.jpg"
    },
    {
        songName: "Let me Love you3",
        filename: "songs/3.mp3",
        coverPath: "covers/3.jpg"
    },
    {
        songName: "Let me Love you4",
        filename: "songs/4.mp3",
        coverPath: "covers/4.jpg"
    },
    {
        songName: "Let me Love you5",
        filename: "songs/5.mp3",
        coverPath: "covers/5.jpg"
    },
    {
        songName: "Let me Love you6",
        filename: "songs/6.mp3",
        coverPath: "covers/6.jpg"
    },
    {
        songName: "Let me Love you7",
        filename: "songs/7.mp3",
        coverPath: "covers/7.jpg"
    },
];



//Step-6
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
}
);


//Step-3
//Handle play/pause click
masterPlay.addEventListener("click", () => {
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play()
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = "1"
        console.log( audioElement.duration)
    } else {
        audioElement.pause()
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = "0";
    }
});


//Step-4
//Listen to events 
audioElement.addEventListener('timeupdate', () => {
    //Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});


//Step-5
myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;

});


//Step-7
const makeAllPlays = () => {
    songItems.forEach((element) => {
       element.getElementsByClassName("gif")[0].style.opacity = "0";
    })
}




//Step-6
songItems.forEach((element) => {
    element.addEventListener('click', () => {
            makeAllPlays();
            songIndex = element.id
            audioElement.src = `songs/${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = "1"
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            element.getElementsByClassName("gif")[0].style.opacity = "1";
            console.log(songIndex)
    })
});


//Step-8
document.querySelector("#next").addEventListener('click', () => {
    if(songIndex>=7) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
    songItems[songIndex].getElementsByClassName("gif")[0].style.opacity = "1";
    gif.style.opacity = "1"
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    console.log(songIndex);
});


//Step-9
document.querySelector("#previous").addEventListener('click', () => {
    if(songIndex<=0) {
        songIndex = 7;
    } else {
        songIndex -= 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
    songItems[songIndex].getElementsByClassName("gif")[0].style.opacity = "1";
    gif.style.opacity = "1"
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});