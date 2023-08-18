document.querySelector(".mobile-hamb").addEventListener("click",() => {
    document.querySelector(".menu").classList.add("show");
});
document.querySelector(".close").addEventListener("click",() => {
    document.querySelector(".menu").classList.remove("show");
});
