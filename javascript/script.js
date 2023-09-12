

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
        changeMasterPlay(index, songid, songs,"playmasterplay");
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
            // songid = parseInt(songs[index].id);
            songid = songs[index].id;
            changeMasterPlay(index, songid, songs,"playmasterplay");
            music.src = `./audio/${songid}.mp3`;
            buffering();

             
            music.play();
            document.querySelector(".icons .play-and-pause").classList.add("bi-pause-fill")
            document.querySelector(".icons .play-and-pause").classList.remove("bi-play-fill")
            document.querySelector("footer img").classList.add("spining");
            document.querySelector("footer .wave").classList.add("active1");
        }
    } else if (msg == "loopCurrent") {
        songid = songs[index].id;
        // songid = parseInt(songs[index].id);
        changeMasterPlay(index, songid, songs,"playmasterplay");
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
        // songid = parseInt(songs[index].id);
        songid = songs[index].id;
        changeMasterPlay(index, songid, songs,"playmasterplay");
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

    let isNotOn = e.querySelector(".bi").classList.contains("bi-play-circle-fill");
    progressBar.value = 0;
    pauseAllBtns();
    changeMasterPlay(e.dataset.customValue, e.getAttribute("id"), songs,"playmasterplay");
    if (isNotOn) {

        document.querySelector("footer img").classList.add("spining");
        document.querySelector("footer .wave").classList.add("active1");
        music.src = "./audio/" + e.getAttribute("id") + ".mp3";
        buffering()


        music.play();
        e.querySelector(".bi").classList.remove("bi-play-circle-fill");
        e.querySelector(".bi").classList.add("bi-pause-circle-fill");
        document.querySelector(".icons .play-and-pause").classList.remove("bi-play-fill")
        document.querySelector(".icons .play-and-pause").classList.add("bi-pause-fill");
    } else {
        music.pause();
        document.querySelector("footer .wave").classList.remove("active1");
        document.querySelector("footer img").classList.remove("spining");
        document.querySelector(".icons .play-and-pause").classList.remove("bi-pause-fill")
        document.querySelector(".icons .play-and-pause").classList.add("bi-play-fill")
        e.querySelector(".bi").classList.add("bi-play-circle-fill");
        e.querySelector(".bi").classList.remove("bi-pause-circle-fill");
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
                        <li class="song-list list playsong" data-custom-value="${i}" id="${element.id}" onmouseover="this.classList.add('hover');" onmouseout="this.classList.remove('hover');">
                            <div>
                                <span>${temp}</span>
                                <img src="${element.poster}">
                                <h5 class="title">${songs[i].songName} <br> <span class="subtitle">${songs[i].artistName}</span> </h5>
                            </div>
                            <i class="bi playbutton bi-play-circle-fill" ></i>
                        </li>
                        `;
            } else {
                document.querySelector(".pop-songs ul").innerHTML += `
                        <li class="song-list list playsong" data-custom-value="${i}" id="${element.id}">
                            <div class="song">
                            <img src="${element.poster}">
                            <i class="bi playbutton bi-play-circle-fill" ></i>
                            </div>
                            <h5 class="title">${songs[i].songName} <br> <span class="subtitle">${songs[i].artistName}</span></h5>
                        </li>
                        `
            }
        });






        // getting all play button and using this we play songs...
        Array.from(document.getElementsByClassName("playsong")).forEach((e, i) => {
            e.addEventListener("click", () => {
                let isNotOn = e.querySelector(".bi").classList.contains("bi-play-circle-fill");
                progressBar.value = 0;
                pauseAllBtns();
                changeMasterPlay(e.dataset.customValue, e.getAttribute("id"), songs,"playmasterplay");
                if (isNotOn) {
                    
                    document.querySelector("footer img").classList.add("spining");
                    document.querySelector("footer .wave").classList.add("active1");
                    music.src = "./audio/" + e.getAttribute("id") + ".mp3";
                    buffering()
                    
                     
                    music.play();
                    e.querySelector(".bi").classList.remove("bi-play-circle-fill");
                    e.querySelector(".bi").classList.add("bi-pause-circle-fill");
                    document.querySelector(".icons .play-and-pause").classList.remove("bi-play-fill")
                    document.querySelector(".icons .play-and-pause").classList.add("bi-pause-fill");
                } else {
                    music.pause();
                    document.querySelector("footer .wave").classList.remove("active1");
                    document.querySelector("footer img").classList.remove("spining");
                    document.querySelector(".icons .play-and-pause").classList.remove("bi-pause-fill")
                    document.querySelector(".icons .play-and-pause").classList.add("bi-play-fill")
                    e.querySelector(".bi").classList.add("bi-play-circle-fill");
                    e.querySelector(".bi").classList.remove("bi-pause-circle-fill");
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
                    <li class="artist-list" onclick="getAllSongsOfArtist('${element.artistName}','${element.img}')">
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
    document.querySelector(".songs").style.filter = "brightness(10%)";
});
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".menu").classList.remove("show");
    document.querySelector(".songs").style.pointerEvents = "all";
    document.querySelector(".songs").style.filter = "unset";
});





// searching logic

document.getElementById("search-item").addEventListener("input", (e) => {
    // // Load JSON data using Fetch API
    const searchTerm = e.target.value.trim();
    const unwantedCharacters = ['<', '>', '\\', '"', '\n', '\t', '\r', '/', ',', '|'];

    const unwantedArray = Array.from(searchTerm).filter(character => {
        return unwantedCharacters.includes(character);
    });
    
    if (searchTerm != "" && unwantedArray.length == 0) {
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
                    const lowercaseArtistName = e.artistName.toLowerCase();
                    // You'll need to adapt this condition based on your JSON structure
                    if (lowercaseSongName.includes(lowercaseSearchTerm) || lowercaseArtistName.includes(lowercaseSearchTerm)) {
                        // console.log(item);
                        indexs.push(i)
                        results.push(e);
                    }
                })
                results.forEach((songlist, i) => {
                    let temp;
                    temp = (i < 9) ? "0" + (i + 1) : (i + 1);
                    document.querySelector(".song-results ul").innerHTML += `
                    <li class="search-result-song" onclick="playSearchedSong(this)" data-custom-value="${indexs[i]}" id="${songlist.id}" onmouseover="this.classList.add('hover');" onmouseout="this.classList.remove('hover');">
                        <div>
                        <span>${temp}</span>
                        <img src="${songlist.poster}">
                        <h5 class="title">${songlist.songName} <br> <span class=\"subtitle\">${songlist.artistName}</span></h5>
                        </div>
                        <i class="bi playbutton bi-play-circle-fill" ></i>
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
        if (translateXValueInPercentage != -103) {
            document.querySelector(".menu").classList.remove("show");
            document.querySelector(".songs").style.pointerEvents = "all";
            document.querySelector(".songs").style.filter = "unset";
        }
    }
});