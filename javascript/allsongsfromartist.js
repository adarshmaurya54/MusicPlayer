
if (localStorage.length == 0) {
    window.location.href = "./index.html";
}


const data = JSON.parse(localStorage.getItem("object"))
let imgurl = "./img/" + data.img;
$(".backimg").attr("src", imgurl);
$(".img-artist").attr("src", imgurl);
$(".name-artist").html(data.name);
const indexs = [];
const results = [];
const searchTerm = data.name;
fetch('./jsonFiles/songs.json')
    .then(response => response.json())
    .then(data => {

        // Data is now a JavaScript object
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        // console.log(data);
        // // Perform a basic search by iterating through the object
        data.forEach((e, i) => {
            const lowercaseSongName = e.songName.toLowerCase();
            // You'll need to adapt this condition based on your JSON structure
            if (lowercaseSongName.includes(lowercaseSearchTerm)) {
                indexs.push(i)
                results.push(e);
            }
        })
        results.forEach((songlist, i) => {
            let temp;
            temp = (i < 9) ? "0" + (i + 1) : (i + 1);
            $(".song-table table").append(`
                <tr>
                    <td>${temp}</td>
                    <td>${songlist.songName}</td>
                    <td><i class="bi bi-play-circle-fill" onclick="PlaySong(this)" data-custom-value="${indexs[i]} ${i}"
                    id="${songlist.id}"></i></td>
                </tr>
            `)
        })

        // // Do something with the results
        // console.log('Search Results:', results);
    })
    .catch(error => console.error('Error loading JSON:', error));


function PlaySong(e) {
    pauseAllBtns();
    changeMasterPlay(e.dataset.customValue.split(" ")[1],e.getAttribute("id"),results);
    if (music.paused) {
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




// function to go previous song
function goPrev(e) {
    let index = document.querySelector(".play-and-pause").dataset.customValue.split(" ")[0];
    pauseAllBtns();
    index = parseInt(index) - 1;
    if (index < 0) {
        customAlertShow("This is the first song that you are listening!")
    } else {
        songid = parseInt(results[index].id);
        changeMasterPlay(index, songid,results);
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
    pauseAllBtns()
    let index = document.querySelector(".play-and-pause").dataset.customValue.split(" ")[0];
    let songid;
    if (msg == "linear") {
        index = parseInt(index) + 1;
        if (index >= indexs.length) {
            customAlertShow("This is the last song that you are listening!")
        } else {
            songid = parseInt(results[index].id);
            changeMasterPlay(index,songid,results);
            music.src = `./audio/${songid}.mp3`;
            buffering();
            music.play();
            document.querySelector(".icons .play-and-pause").classList.add("bi-pause-fill")
            document.querySelector(".icons .play-and-pause").classList.remove("bi-play-fill")
            document.querySelector("footer img").classList.add("spining");
            document.querySelector("footer .wave").classList.add("active1");
        }
    } else if (msg == "loopCurrent") {
        songid = parseInt(results[index].id);
        changeMasterPlay(index,songid,results);
        music.src = `./audio/${songid}.mp3`;
        buffering();
        music.play();
        document.querySelector(".icons .play-and-pause").classList.add("bi-pause-fill")
        document.querySelector(".icons .play-and-pause").classList.remove("bi-play-fill")
        document.querySelector("footer img").classList.add("spining");
        document.querySelector("footer .wave").classList.add("active1");
    } else if (msg == "loopAll") {
        index = parseInt(index) + 1;
        if (index >= indexs.length) {
            index = 0; 
        }
        songid = parseInt(results[index].id);
        changeMasterPlay(index, songid,results);
        music.src = `./audio/${songid}.mp3`;
        buffering();
        music.play();
        document.querySelector(".icons .play-and-pause").classList.add("bi-pause-fill")
        document.querySelector(".icons .play-and-pause").classList.remove("bi-play-fill")
        document.querySelector("footer img").classList.add("spining");
        document.querySelector("footer .wave").classList.add("active1");
    }
}