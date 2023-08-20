

const currentStart = document.getElementById("currentStart");
const currentEnd = document.getElementById("currentEnd");
const music = new Audio();
function customAlertShow(msg) {
    document.querySelector(".customAlert .alert .message").innerHTML = msg;
    pauseAllBtns();
    document.querySelector(".customAlert").style.opacity = "1";
    document.querySelector(".customAlert").style.zIndex = "10";
    document.querySelector(".customAlert .alert").style.width = "300px";
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
    document.querySelector(".customAlert .alert").style.width = "350px";
    document.querySelector(".customAlert .alert").style.transform = "translateY(-105%)";
}

// we pause all the buttons when another music is played
function pauseAllBtns() {
    Array.from(document.getElementsByClassName("bi-pause-circle-fill")).forEach(e => {
        e.classList.remove("bi-pause-circle-fill");
        e.classList.add("bi-play-circle-fill");
    })
}

const progressBar = document.getElementById("seek");
const seekBar = document.getElementById("bar1");

// changing master play content dynamically when music is played
function changeMasterPlay(i, id) {
    document.querySelector("footer .controles .wave").innerHTML = `
            <div class="wave1"></div>
            <div class="wave1"></div>
            <div class="wave1"></div>
    `
    document.querySelector("footer .controles .imgandname").innerHTML = `
            <img src="${songs[i].poster}" id="poster" alt="">
            <h5 class="title">${songs[i].songName}</h5>
    `
    document.querySelector(".control-icons").innerHTML = `
            <div class="control-icons-inner">
                <i class="bi bi-skip-start-fill" onclick="goPrev(this)"></i>
                <i class="bi bi-play-fill  play-and-pause" data-custom-value="${i} ${id}" onclick="playmasterplay(this)" id="0-${id}"></i>
                <i class="bi bi-skip-end-fill" onclick="goNext('linear')" ></i>
            </div>       
    `;
    document.querySelector("footer .tracker").style.pointerEvents = "all";
}
// function to go previous song
function goPrev(e) {
    let index = document.querySelector(".play-and-pause").dataset.customValue.split(" ")[0];
    let songid = document.querySelector(".play-and-pause").dataset.customValue.split(" ")[1];
    pauseAllBtns();
    deactiveMenuSongs();
    index = parseInt(index) - 1;
    if (index < 0) {
        customAlertShow("This is the first song that you are listening!")
    } else {
        songid = parseInt(songs[index].id);
        changeMasterPlay(index, songid);
        music.src = `./audio/${songid}.mp3`;
        buffering();
        music.play();
        document.querySelector(".icons .play-and-pause").classList.add("bi-pause-fill")
        document.querySelector(".icons .play-and-pause").classList.remove("bi-play-fill")
        document.querySelector("footer img").classList.add("spining");
        document.querySelector("footer .wave").classList.add("active1");
    }
}

// function to go next song
function goNext(msg) {
    deactiveMenuSongs();
    pauseAllBtns()
    let index = document.querySelector(".play-and-pause").dataset.customValue.split(" ")[0];
    let songid = document.querySelector(".play-and-pause").dataset.customValue.split(" ")[1];
    if (msg == "linear") {
        index = parseInt(index) + 1;
        if (index >= songs.length) {
            customAlertShow("This is the last song that you are listening!")
        } else {
            songid = parseInt(songs[index].id);
            changeMasterPlay(index, songid);
            music.src = `./audio/${songid}.mp3`;
            buffering();
            music.play();
            document.querySelector(".icons .play-and-pause").classList.add("bi-pause-fill")
            document.querySelector(".icons .play-and-pause").classList.remove("bi-play-fill")
            document.querySelector("footer img").classList.add("spining");
            document.querySelector("footer .wave").classList.add("active1");
        }
    } else if (msg == "loopCurrent") {
        songid = parseInt(songs[index].id);
        changeMasterPlay(index, songid);
        music.src = `./audio/${songid}.mp3`;
        buffering();
        music.play();
        document.querySelector(".icons .play-and-pause").classList.add("bi-pause-fill")
        document.querySelector(".icons .play-and-pause").classList.remove("bi-play-fill")
        document.querySelector("footer img").classList.add("spining");
        document.querySelector("footer .wave").classList.add("active1");
    } else if (msg == "loopAll") {
        index = parseInt(index) + 1;
        if (index >= songs.length) {
            index = 0;
        }
        songid = parseInt(songs[index].id);
        changeMasterPlay(index, songid);
        music.src = `./audio/${songid}.mp3`;
        buffering();
        music.play();
        document.querySelector(".icons .play-and-pause").classList.add("bi-pause-fill")
        document.querySelector(".icons .play-and-pause").classList.remove("bi-play-fill")
        document.querySelector("footer img").classList.add("spining");
        document.querySelector("footer .wave").classList.add("active1");

    }
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
function playSearchedSong(e) {
    pauseAllBtns();
    changeMasterPlay(e.dataset.customValue, e.getAttribute("id"));
    if (music.paused) {
        if (e.getAttribute("id") <= 7) {
            deactiveMenuSongs();
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
}

function deactiveMenuSongs() {
    Array.from(document.querySelectorAll(".menu-songs ul .song-list")).forEach(e => {
        e.style.backgroundColor = "var(--color2)";
        e.style.color = "var(--color)";
    })
}
var songs;
// Xhr requestion to getting all the songs stored on songs.json file
var xhr = new XMLHttpRequest();
xhr.open("GET", "./jsonFiles/songs.json", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        songs = JSON.parse(xhr.responseText);
        // Handle the responseData here
        // console.log(songs); // You can replace this with your desired handling code
        songs.forEach((element, i) => {
            if (i < 7) {
                let temp = (i < 9) ? "0" + (i + 1) : (i + 1);
                document.querySelector(".menu-songs ul").innerHTML += `
                        <li class="song-list list " onmouseover="this.classList.add('hover');" onmouseout="this.classList.remove('hover');">
                            <div>
                                <span>${temp}</span>
                                <img src="./img/${element.id}.jpg">
                                <h5 class="title">${songs[i].songName}</h5>
                            </div>
                            <i class="bi playbutton bi-play-circle-fill" data-custom-value="${i}" id="${element.id}"></i>
                        </li>
                        `;
            } else {
                document.querySelector(".pop-songs ul").innerHTML += `
                        <li class="song-list list">
                            <div class="song">
                            <img src="./img/${element.id}.jpg">
                            <i class="bi playbutton bi-play-circle-fill" data-custom-value="${i}" id="${element.id}"></i>
                            </div>
                            <h5 class="title">${songs[i].songName}</h5>
                        </li>
                        `
            }
        });






        // getting all play button and using this we play songs...
        Array.from(document.getElementsByClassName("bi-play-circle-fill")).forEach((e, i) => {
            e.addEventListener("click", () => {
                pauseAllBtns();
                changeMasterPlay(e.dataset.customValue, e.getAttribute("id"));
                if (music.paused) {
                    if (e.getAttribute("id") <= 7) {
                        deactiveMenuSongs();
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

        // let music_curr = music.currentTime;

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

        progressBar.addEventListener("change", () => {
            music.currentTime = (progressBar.value * music.duration) / 100;
            music.play();
            document.querySelector(".icons .play-and-pause").classList.add("bi-pause-fill")
            document.querySelector(".icons .play-and-pause").classList.remove("bi-play-fill")
        })
    }
};
xhr.send();

// ajax for artist
let artist;
let xhr1 = new XMLHttpRequest();
xhr1.open("GET", "./jsonFiles/artist.json", true);
xhr1.onreadystatechange = function () {
    if (xhr1.readyState === 4 && xhr1.status === 200) {
        artist = JSON.parse(xhr1.responseText);
        artist.forEach((element) => {
            document.querySelector(".pop-artist ul").innerHTML += `
                    <li class="artist-list">
                        <img src="./img/${element.img}" class="" alt="">
                        <h5 class="title">${element.artistName}</span></h5>
                    </li>
        `
        })
    }
};
xhr1.send();

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

// when darkmode button clicked then meta tag of theme color change logic and dark class toggle logic also...

document.querySelector(".dark-btn").addEventListener("click", () => {
    if (document.body.classList.contains('dark')) {
        document.querySelector("meta[name='theme-color']").setAttribute('content', "#fff");
    } else {
        document.querySelector("meta[name='theme-color']").setAttribute('content', "#121213");
    }
    document.body.classList.toggle("dark");

})

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

// when we click on masterplay play icon then ...
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

// initial dark mode active or deactive if user's device has on dark mode or not... 
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector("meta[name='theme-color']").setAttribute('content', "#121213");
} else {
    document.body.classList.remove("dark");
    document.querySelector("meta[name='theme-color']").setAttribute('content', "#fff");
}


// when user want to close alert box...
document.querySelector(".customAlert .alert .bi").addEventListener("click", () => {
    customAlertHide()
})
document.getElementById("no-song").addEventListener("click", () => {
    customAlertShow("There is no song to play!");
})


setInterval(() => {
    if (document.querySelector(".icons .bi-shuffle")) {
        document.querySelector(".bi-skip-end-fill").setAttribute("onclick", "goNext('linear')")
    } else if (document.querySelector(".icons .bi-repeat")) {
        document.querySelector(".bi-skip-end-fill").setAttribute("onclick", "goNext('loopAll')")
    } else if (document.querySelector(".icons .bi-repeat-1")) {
        document.querySelector(".bi-skip-end-fill").setAttribute("onclick", "goNext('loopCurrent')")
    }
}, 300)





// searching logic

document.getElementById("search-item").addEventListener("input", (e) => {
    // // Assuming you have a JSON file named data.json
    // // Load JSON data using Fetch API
    searchTerm = e.target.value.trim();
    if (searchTerm != "") {
        document.querySelector(".result").style.opacity = "1";
        document.querySelector(".result").style.zIndex = "100";
        document.querySelector(".song-results ul").innerHTML = "";
        document.querySelector(".artist-results ul").innerHTML = "";
        fetch('./jsonFiles/songs.json')
            .then(response => response.json())
            .then(data => {
                // Data is now a JavaScript object
                const results = [];
                const indexs = [];
                const lowercaseSearchTerm = searchTerm.toLowerCase();
                // console.log(data);
                // // Perform a basic search by iterating through the object
                data.forEach((e,i)=>{
                    const lowercaseSongName = e.songName.toLowerCase();
                    // You'll need to adapt this condition based on your JSON structure
                    if (lowercaseSongName.includes(lowercaseSearchTerm)) {
                        // console.log(item);
                        indexs.push(i)
                        results.push(e);
                    }
                })
                // for (const item of data) {
                //     const lowercaseSongName = item.songName.toLowerCase();
                //     // You'll need to adapt this condition based on your JSON structure
                //     if (lowercaseSongName.includes(lowercaseSearchTerm)) {
                //         // console.log(item);
                //         results.push(item);
                //     }
                // }
                results.forEach((songlist, i) => {
                    let temp;
                    temp = (i < 9) ? "0" + (i + 1) : (i + 1);
                    document.querySelector(".song-results ul").innerHTML += `
                    <li class="search-result-song" onmouseover="this.classList.add('hover');" onmouseout="this.classList.remove('hover');">
                    <div>
                    <span>${temp}</span>
                    <img src="${songlist.poster}">
                    <h5 class="title">${songlist.songName}</h5>
                    </div>
                    <i class="bi playbutton bi-play-circle-fill" onclick="playSearchedSong(this)" data-custom-value="${indexs[i]}"
                    id="${songlist.id}"></i>
                    </li>
                    `;
                })

                // // Do something with the results
                // console.log('Search Results:', results);
            })
            .catch(error => console.error('Error loading JSON:', error));

        fetch('./jsonFiles/artist.json')
            .then(response => response.json())
            .then(data => {
                // Data is now a JavaScript object
                const results = [];
                const lowercaseSearchTerm = searchTerm.toLowerCase();
                // console.log(data);
                // // Perform a basic search by iterating through the object
                for (const item of data) {
                    const lowercaseArtistName = item.artistName.toLowerCase();
                    // You'll need to adapt this condition based on your JSON structure
                    if (lowercaseArtistName.includes(lowercaseSearchTerm)) {
                        results.push(item);
                    }
                }
                results.forEach((artistList, i) => {
                    document.querySelector(".artist-results ul").innerHTML += `
                    <li class="search-result-artist">
                        <img src="./img/${artistList.img}" alt="">
                        <p>${artistList.artistName}</p>
                        <button id="artist-${artistList.id}">all songs</button>
                    </li>
                    `
                })

                // // Do something with the results
                // console.log('Search Results:', results);
            })
            .catch(error => console.error('Error loading JSON:', error));

    } else {
        document.querySelector(".result").style.opacity = "0";
        document.querySelector(".result").style.zIndex = "-1";
    }
})