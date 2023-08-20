if(localStorage.length == 0){
    window.location.href = "./index.html";
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

$(document).ready(function () {

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

const data = JSON.parse(localStorage.getItem("object"))
let imgurl = "./img/" + data.img;
$(".backimg").attr("src", imgurl);
$(".img-artist").attr("src", imgurl);
$(".name-artist").html(data.name);
const searchTerm = data.name;
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
                        <td><i class="bi bi-play-circle-fill"></i></td>
                    </tr>
                `)
        })

        // // Do something with the results
        // console.log('Search Results:', results);
    })
    .catch(error => console.error('Error loading JSON:', error));