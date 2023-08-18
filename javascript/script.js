
const currentStart = document.getElementById("currentStart");
const currentEnd = document.getElementById("currentEnd");
const music = new Audio();

const songs = [
    {
        id: 1,
        songName: `On My Way <br> <span class="subtitle">Alon Walker</span>`,
        poster: './img/1.jpg'
    },
    {
        id: 2,
        songName: `Alon Walker-Fade <br> <span class="subtitle">Alon Walker</span>`,
        poster: './img/2.jpg'
    },
    {
        id: 3,
        songName: `Cartoon - On & On <br> <span class="subtitle">Daniel Levi</span>`,
        poster: './img/3.jpg'
    },
    {
        id: 4,
        songName: `Warriyo - Mortals <br> <span class="subtitle">Mortals</span>`,
        poster: './img/4.jpg'
    },
    {
        id: 5,
        songName: `Ertugrul Gazi <br> <span class="subtitle">Ertugrul</span>`,
        poster: './img/5.jpg'
    },
    {
        id: 6,
        songName: `Electronic Music <br> <span class="subtitle">Electro</span>`,
        poster: './img/6.jpg'
    },
    {
        id: 7,
        songName: `Agar Tum Sath Ho<br> <span class="subtitle">Tamashaa</span>`,
        poster: './img/7.jpg'
    },
    {
        id: 8,
        songName: `Suna Hai <br> <span class="subtitle">Jubin Nautial</span>`,
        poster: './img/8.jpg'
    },
    {
        id: 9,
        songName: `Dilbar <br> <span class="subtitle">Neha kakkar, Dhvani Bhanushali, Ikka</span>`,
        poster: './img/9.jpg'
    },
    {
        id: 10,
        songName: `Dunia <br> <span class="subtitle">Abhijit Vaghani, Akhil, Dhvani Bhanushali, Bob</span>`,
        poster: './img/10.jpg'
    },
    {
        id: 11,
        songName: `Lagdi Lahore Di <br> <span class="subtitle">Guru Randhawa, Tulsi kumar </span>`,
        poster: './img/11.jpg'
    },
    {
        id: 12,
        songName: `Putt Jatt De <br> <span class="subtitle">Diljit Dosanjh, Kaater</span>`,
        poster: './img/12.jpg'
    },
    {
        id: 13,
        songName: `Baarishein <br> <span class="subtitle">Atif Aslam</span>`,
        poster: './img/13.jpg'
    },
    {
        id: 14,
        songName: `Vaste <br> <span class="subtitle">Dhvani Bhanushali, Nikhil D Souza</span>`,
        poster: './img/14.jpg'
    },
]
// Dynamically modifing all divs that contain music
songs.forEach((element, i) => {
    if (i < 7) {
        let temp = (i < 9) ? "0" + (i + 1) : (i + 1);
        document.querySelector(".menu-songs ul").innerHTML += `
                <li class="song-list list" onmouseover="this.classList.add('hover');" onmouseout="this.classList.remove('hover');">
                    <div>
                        <span>${temp}</span>
                        <img src="${element.poster}" class="" alt="">
                        <h5 class="title">${element.songName}</h5>
                    </div>
                    <i class="bi playbutton bi-play-circle-fill" id="${element.id}"></i>
                </li>
        `;
    } else {
        document.querySelector(".items ul").innerHTML += `
            <li class="song-list list">
                <div class="song">
                    <img src="${element.poster}" alt="">
                    <i class="bi playbutton bi-play-circle-fill" id="${i + 1}"></i>
                </div>
                <h5 class="title">${element.songName}</h5>
            </li>
        `
    }
});

// we pause all the buttons when another music is played
function pauseAllBtns() {
    Array.from(document.getElementsByClassName("bi-pause-circle-fill")).forEach(e => {
        e.classList.remove("bi-pause-circle-fill");
        e.classList.add("bi-play-circle-fill");
    })
}
// this function used to show buffering of the music
function buffering() {
    music.addEventListener("loadedmetadata", function () {
        // Now you can access the duration without getting NaN
        let music_dur = music.duration;
        let min = Math.floor(music_dur / 60);
        let sec = Math.floor(music_dur % 60);
        if (sec <= 9) {
            sec = "0" + sec;
        }
        if (min <= 9) {
            min = "0" + min;
        }
        if (!isNaN(min) && !isNaN(sec)) {
            currentEnd.innerHTML = `${min}:${sec}`;
        }
        const duration = music.duration;
    });
    currentEnd.innerHTML = "Buffering...";

    // Start loading the audio
    music.load();

}
// getting all play button and using this we play songs...
Array.from(document.getElementsByClassName("bi-play-circle-fill")).forEach((e, i) => {
    e.addEventListener("click", () => {
        pauseAllBtns();
        document.querySelector("footer img").src = "./img/" + e.getAttribute("id") + ".jpg";
        changeMasterPlay(e.getAttribute("id") - 1);
        if (music.paused) {
            if (e.getAttribute("id") <= 7) {
                Array.from(document.querySelectorAll(".menu-songs ul .song-list")).forEach(e => {
                    e.style.backgroundColor = "var(--color2)";
                    e.style.color = "var(--color)";
                })
                document.querySelectorAll(".menu-songs ul .song-list")[e.getAttribute("id") - 1].style.backgroundColor = "var(--color)";
                document.querySelectorAll(".menu-songs ul .song-list")[e.getAttribute("id") - 1].style.color = "var(--textcolor1)";
            }
            document.querySelector("footer img").classList.add("spining");
            document.querySelector("footer .wave").classList.add("active1");
            music.src = "./audio/" + e.getAttribute("id") + ".mp3";
            buffering()
            music.play();
            e.classList.remove("bi-play-circle-fill");
            e.classList.add("bi-pause-circle-fill");
            document.querySelector(".icons .play-and-pause").classList.remove("bi-play-fill")
            document.querySelector(".icons .play-and-pause").classList.add("bi-pause-fill");
        } else {
            music.pause();
            document.querySelector("footer .wave").classList.remove("active1");
            document.querySelector("footer img").classList.remove("spining");
            document.querySelector(".icons .play-and-pause").classList.remove("bi-pause-fill")
            document.querySelector(".icons .play-and-pause").classList.add("bi-play-fill")
            e.classList.add("bi-play-circle-fill");
            e.classList.remove("bi-pause-circle-fill");
        }
    })
})

// changing master play content dynamically when music is played
function changeMasterPlay(i) {
    document.querySelector("footer .controles").innerHTML = `
    <div class="wave ">
        <div class="wave1"></div>
        <div class="wave1"></div>
        <div class="wave1"></div>
    </div>
    <img src="./img/${songs[i].id}.jpg" id="poster" alt="">
    <h5 class="title">${songs[i].songName}</span></h5>
    <div class="icons">
        <i class="bi bi-shuffle"></i>
        <i class="bi bi-skip-start-fill" onclick="goPrev(this)"></i>
        <i class="bi bi-play-fill  play-and-pause" onclick="playmasterplay(this)" id="0-${songs[i].id}"></i>
        <i class="bi bi-skip-end-fill" onclick="goNext(this)"></i>
    </div>
    `;
    document.querySelector("footer .tracker").style.pointerEvents = "all";
}

function goPrev(e){
    let songid = document.querySelector(".play-and-pause").getAttribute("id").split('-')[1];
    changeMasterPlay(songid - 2);
}
function goNext(e){
    let songid = document.querySelector(".play-and-pause").getAttribute("id").split('-')[1];
    changeMasterPlay(parseInt(songid));
}
// when we click on masterplay play icon then ...
function playmasterplay(e) {
    if (music.paused) {

        music.src = "./audio/" + e.getAttribute("id").split('-')[1] + ".mp3";
        buffering();
        music.play();
        document.querySelector("footer img").classList.add("spining");
        document.querySelector("footer .wave").classList.add("active1");
        e.classList.remove("bi-play-fill");
        e.classList.add("bi-pause-fill");
        document.getElementById(e.getAttribute("id").split('-')[1]).classList.remove("bi-play-circle-fill");
        document.getElementById(e.getAttribute("id").split('-')[1]).classList.add("bi-pause-circle-fill");
    } else {
        music.pause();
        document.querySelector("footer .wave").classList.remove("active1");
        document.querySelector("footer img").classList.remove("spining");
        e.classList.add("bi-play-fill");
        e.classList.remove("bi-pause-fill");
        document.getElementById(e.getAttribute("id").split('-')[1]).classList.add("bi-play-circle-fill");
        document.getElementById(e.getAttribute("id").split('-')[1]).classList.remove("bi-pause-circle-fill");
    }
}

// hamburgure js
document.querySelector(".mobile-hamb").addEventListener("click", () => {
    document.querySelector(".menu").classList.add("show");
});
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".menu").classList.remove("show");
});

document.querySelector(".popular-songs .bi-caret-left-fill").addEventListener("click", () => {
    document.getElementsByClassName("items")[0].scrollLeft -= 300;
})
document.querySelector(".popular-songs .bi-caret-right-fill").addEventListener("click", () => {
    document.getElementsByClassName("items")[0].scrollLeft += 300;
})
document.querySelector(".popular-artist .bi-caret-left-fill").addEventListener("click", () => {
    document.getElementsByClassName("items")[1].scrollLeft -= 300;
})
document.querySelector(".popular-artist .bi-caret-right-fill").addEventListener("click", () => {
    document.getElementsByClassName("items")[1].scrollLeft += 300;
})
let i = 0;
document.querySelector(".dark-btn").addEventListener("click", () => {
    if (i % 2 == 0) {
        document.querySelector("meta[name='theme-color']").setAttribute('content', "#fff");
    } else {
        document.querySelector("meta[name='theme-color']").setAttribute('content', "#121213");
    }
    document.body.classList.toggle("dark");
    i++;
})
// let music_curr = music.currentTime;

const progressBar = document.getElementById("seek");
const seekBar = document.getElementById("bar1");
music.addEventListener("timeupdate", () => {
    let current_time = music.currentTime;
    let duration = music.duration;
    let min = Math.floor(current_time / 60);
    let sec = Math.floor(current_time % 60);
    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }
    currentStart.innerHTML = `${min}:${sec}`;
    let progressBarVal = parseInt((current_time / duration) * 100);
    progressBar.value = progressBarVal;
    seekBar.style.width = progressBarVal + "%";
    if (progressBarVal == 100) {
        document.querySelector(".icons .play-and-pause").classList.remove("bi-pause-fill")
        document.querySelector(".icons .play-and-pause").classList.add("bi-play-fill")
        pauseAllBtns();
        document.querySelector("footer img").classList.remove("spining");
        document.querySelector("footer .wave").classList.remove("active1");
        progressBar.style.pointerEvents = "none";
    }else{
        progressBar.style.pointerEvents = "all";
    }
})
progressBar.addEventListener("change", () => {
    music.currentTime = (progressBar.value * music.duration) / 100;
    music.play();
})

const hours = new Date().getHours()
const isDayTime = hours > 6 && hours < 20;
if (isDayTime === true) {
    document.querySelector("meta[name='theme-color']").setAttribute('content', "#fff");
    document.body.classList.remove("dark");
} else {
    document.querySelector("meta[name='theme-color']").setAttribute('content', "#121213");
    document.body.classList.add("dark");
}

