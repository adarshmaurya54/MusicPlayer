
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
            const lowercaseSongName = e.artistName.toLowerCase();
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
                    <td>${songlist.songName}<br> <span class=\"subtitle\">${songlist.artistName}</span></td>
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
    changeMasterPlay(e.dataset.customValue.split(" ")[1],e.getAttribute("id"),results,"playmasterplayofaritistsongs");
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




// function to go previous song
function goPrev(e) {
    let index = document.querySelector(".play-and-pause").dataset.customValue.split(" ")[0];
    pauseAllBtns();
    index = parseInt(index) - 1;
    if (index < 0) {
        customAlertShow("This is the first song that you are listening!")
    } else {
        songid = parseInt(results[index].id);
        changeMasterPlay(index, songid,results,"playmasterplayofaritistsongs");
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
            changeMasterPlay(index,songid,results,"playmasterplayofaritistsongs");
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
        changeMasterPlay(index,songid,results,"playmasterplayofaritistsongs");
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
        changeMasterPlay(index, songid,results,"playmasterplayofaritistsongs");
        music.src = `./audio/${songid}.mp3`;
        buffering();
        music.play();
        document.querySelector(".icons .play-and-pause").classList.add("bi-pause-fill")
        document.querySelector(".icons .play-and-pause").classList.remove("bi-play-fill")
        document.querySelector("footer img").classList.add("spining");
        document.querySelector("footer .wave").classList.add("active1");
    }
}


function playmasterplayofaritistsongs(e) {
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