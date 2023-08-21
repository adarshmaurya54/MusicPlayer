

const currentStart = document.getElementById("currentStart");



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
        changeMasterPlay(index, songid,songs);
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
            changeMasterPlay(index, songid,songs);
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
        changeMasterPlay(index, songid, songs);
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
        changeMasterPlay(index, songid,songs);
        music.src = `./audio/${songid}.mp3`;
        buffering();
        music.play();
        document.querySelector(".icons .play-and-pause").classList.add("bi-pause-fill")
        document.querySelector(".icons .play-and-pause").classList.remove("bi-play-fill")
        document.querySelector("footer img").classList.add("spining");
        document.querySelector("footer .wave").classList.add("active1");

    }
}

function playSearchedSong(e) {
    pauseAllBtns();
    changeMasterPlay(e.dataset.customValue, e.getAttribute("id"),songs);
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
                changeMasterPlay(e.dataset.customValue, e.getAttribute("id"),songs);
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





// initial dark mode active or deactive if user's device has on dark mode or not... 
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector("meta[name='theme-color']").setAttribute('content', "#121213");
} else {
    document.body.classList.remove("dark");
    document.querySelector("meta[name='theme-color']").setAttribute('content', "#fff");
}





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
                data.forEach((e, i) => {
                    const lowercaseSongName = e.songName.toLowerCase();
                    // You'll need to adapt this condition based on your JSON structure
                    if (lowercaseSongName.includes(lowercaseSearchTerm)) {
                        // console.log(item);
                        indexs.push(i)
                        results.push(e);
                    }
                })
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
                        <button onclick="getAllSongsOfArtist('${artistList.artistName}','${artistList.img}')">all songs</button>
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

function getAllSongsOfArtist(name, img) {
    localStorage.setItem("object", JSON.stringify({ name: name, img: img }));
    window.location.href = "./allsongsfromartist.html";
}



const element = document.querySelector('.result');
const element2 = document.querySelector('section .menu');

document.addEventListener('click', function (event) {
    const isClickInsideElement = element.contains(event.target);
    const isClickInsideElement2 = element2.contains(event.target);

    if (!isClickInsideElement) {
        if (element.style.opacity != 0) {
            element.style.opacity = "0";
            element.style.zIndex = "-1";
            // Event listener for clicks anywhere in the document
        }
        // You can perform actions here that should happen when a click occurs outside the element.
    }

    if (!isClickInsideElement2) {
        // Get the computed style of the element
        const computedStyle = getComputedStyle(element2);

        // Extract the transformation matrix values from the computed style
        const transformMatrix = computedStyle.transform || computedStyle.webkitTransform || computedStyle.mozTransform;
        const matrixValues = transformMatrix.match(/matrix.*\((.+)\)/)[1].split(', ');

        // The translateX value is in the fourth position of the matrix
        const translateXValueInPixel = parseFloat(matrixValues[4]);
        const elementWidth = element2.offsetWidth;
        const translateXValueInPercentage = (translateXValueInPixel / elementWidth) * 100;
        if(translateXValueInPercentage != -103){
            document.querySelector(".menu").classList.remove("show");
            document.querySelector(".songs").style.pointerEvents = "all";
            document.querySelector(".songs").style.filter = "unset";
        }
    }
});