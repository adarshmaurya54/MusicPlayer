
const music = new Audio();
const currentEnd = document.getElementById("currentEnd");
function buffering() {
    document.querySelector(".poster-container").classList.add("loading");
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
let i = 0;
function loop(e) {
    const arr = [
        "bi-repeat",
        "bi-repeat-1",
        "bi-shuffle"
    ];
    e.removeAttribute("class");
    e.classList.add("bi");
    e.classList.add(arr[i]);
    if (arr[i] == "bi-repeat") {
        document.querySelector(".bi-skip-end-fill").setAttribute("onclick", "goNext('loopAll')")
    } else if (arr[i] == "bi-repeat-1") {
        document.querySelector(".bi-skip-end-fill").setAttribute("onclick", "goNext('loopCurrent')")
    } else if (arr[i] == "bi-shuffle") {
        document.querySelector(".bi-skip-end-fill").setAttribute("onclick", "goNext('linear')")
    }
    i++;
    if (i >= 3) {
        i = 0;
    }
}

setInterval(() => {
    if (document.querySelector(".icons .bi-shuffle")) {
        document.querySelector(".bi-skip-end-fill").setAttribute("onclick", "goNext('linear')")
    } else if (document.querySelector(".icons .bi-repeat")) {
        document.querySelector(".bi-skip-end-fill").setAttribute("onclick", "goNext('loopAll')")
    } else if (document.querySelector(".icons .bi-repeat-1")) {
        document.querySelector(".bi-skip-end-fill").setAttribute("onclick", "goNext('loopCurrent')")
    }
}, 300)

function customAlertShow(msg) {
    document.querySelector(".customAlert .alert .message").innerHTML = msg;
    pauseAllBtns();
    document.querySelector(".customAlert").style.opacity = "1";
    document.querySelector(".customAlert").style.zIndex = "10";
    document.querySelector(".customAlert .alert").style.transform = "translateY(0%)";
    music.pause();
    document.querySelector("footer img").classList.remove("spining");
    document.querySelector("footer .wave").classList.remove("active1");
    document.querySelector(".icons .play-and-pause").classList.remove("bi-pause-fill")
    document.querySelector(".icons .play-and-pause").classList.add("bi-play-fill")
}
function customAlertHide() {
    document.querySelector(".customAlert").style.opacity = "0";
    document.querySelector(".customAlert").style.zIndex = "-10";
    document.querySelector(".customAlert .alert").style.transform = "translateY(-105%)";
}

function playmasterplay(e) {
    if (music.paused) {
        if (progressBar.value == 0) {
            music.src = "./audio/" + e.getAttribute("id").split('-')[1] + ".mp3";
            buffering();
            music.play();
        } else {
            music.currentTime = (progressBar.value * music.duration) / 100;
            music.play();
        }
        document.querySelector("footer img").classList.add("spining");
        document.querySelector("footer .wave").classList.add("active1");
        e.classList.remove("bi-play-fill");
        e.classList.add("bi-pause-fill");
        document.getElementById(e.getAttribute("id").split('-')[1]).querySelector(".bi").classList.remove("bi-play-circle-fill");
        document.getElementById(e.getAttribute("id").split('-')[1]).querySelector(".bi").classList.add("bi-pause-circle-fill");
    } else {
        music.pause();
        document.querySelector("footer .wave").classList.remove("active1");
        document.querySelector("footer img").classList.remove("spining");
        e.classList.add("bi-play-fill");
        e.classList.remove("bi-pause-fill");
        document.getElementById(e.getAttribute("id").split('-')[1]).querySelector(".bi").classList.add("bi-play-circle-fill");
        document.getElementById(e.getAttribute("id").split('-')[1]).querySelector(".bi").classList.remove("bi-pause-circle-fill");
    }
}

// hamburgure toggle
document.querySelector(".mobile-hamb").addEventListener("click", () => {
    document.querySelector(".menu").classList.add("show");
    document.querySelector(".songs").style.pointerEvents = "none";
    document.querySelector(".songs").style.filter = "blur(5px)";
});
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".menu").classList.remove("show");
    document.querySelector(".songs").style.pointerEvents = "all";
    document.querySelector(".songs").style.filter = "unset";
});



document.querySelector(".dark-btn").addEventListener("click", () => {
    if (document.body.classList.contains('dark')) {
        document.querySelector("meta[name='theme-color']").setAttribute('content', "#fff");
    } else {
        document.querySelector("meta[name='theme-color']").setAttribute('content', "#121213");
    }
    document.body.classList.toggle("dark");
})
// initial dark mode active or deactive if user's device has on dark mode or not... 
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector("meta[name='theme-color']").setAttribute('content', "#121213");
} else {
    document.body.classList.remove("dark");
    document.querySelector("meta[name='theme-color']").setAttribute('content', "#fff");
}


function pauseAllBtns() {
    Array.from(document.getElementsByClassName("bi-pause-circle-fill")).forEach(e => {
        e.classList.remove("bi-pause-circle-fill");
        e.classList.add("bi-play-circle-fill");
    })
}

const progressBar = document.getElementById("seek");
const seekBar = document.getElementById("bar1");
progressBar.addEventListener("change", () => {
    music.currentTime = (progressBar.value * music.duration) / 100;
    music.play();
    document.querySelector(".icons .play-and-pause").classList.add("bi-pause-fill")
    document.querySelector(".icons .play-and-pause").classList.remove("bi-play-fill")
    document.querySelector("footer img").classList.add("spining");
    document.querySelector("footer .wave").classList.add("active1");
})

// when user want to close alert box...
document.querySelector(".customAlert .alert .bi").addEventListener("click", () => {
    customAlertHide()
})
document.getElementById("no-song").addEventListener("click", () => {
    customAlertShow("There is no song to play!");
})

function changeMasterPlay(indexs, id, arrayname,functionName) {
    document.querySelector("footer .controles .wave").innerHTML = `
                <div class="wave1"></div>
                <div class="wave1"></div>
                <div class="wave1"></div>
        `
    document.querySelector("footer .controles .imgandname").innerHTML = `
                <div class="poster-container">
                    <img src="${arrayname[indexs].poster}" id="poster" alt="">
                </div>
                <h5 class="title">${arrayname[indexs].songName} <br> <span class="subtitle">${arrayname[indexs].artistName}</h5>
        `
    document.querySelector(".control-icons").innerHTML = `
                <div class="control-icons-inner">
                    <i class="bi bi-skip-start-fill" onclick="goPrev(this)"></i>
                    <i class="bi bi-play-fill  play-and-pause" data-custom-value="${indexs}" onclick="${functionName}(this)" id="0-${id}"></i>
                    <i class="bi bi-skip-end-fill" onclick="goNext('linear')" ></i>
                </div>       
        `;
    document.querySelector("footer .tracker").style.pointerEvents = "all";
}



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
        if (document.querySelector(".icons .bi-shuffle")) {
            goNext("linear");
        } else if (document.querySelector(".icons .bi-repeat")) {
            goNext("loopAll");
        } else if (document.querySelector(".icons .bi-repeat-1")) {
            goNext("loopCurrent");
        }
    } else {
        progressBar.style.pointerEvents = "all";
    }
})

setInterval(()=>{
    if(currentEnd.innerHTML == "Buffering..."){
        document.querySelector(".poster-container").classList.add("loading");
        document.getElementById("poster").style.width = "30px";
        document.getElementById("poster").style.height = "30px";
    }else{
        document.querySelector(".poster-container").classList.remove("loading");
        document.getElementById("poster").style.width = "50px";
        document.getElementById("poster").style.height = "50px";
    }
},500)
    