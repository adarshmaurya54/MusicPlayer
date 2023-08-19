var xhr = new XMLHttpRequest();
xhr.open("GET", "./songs.json", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var responseData = JSON.parse(xhr.responseText);
        responseData.forEach((element,i) => {
            console.log(element.id);
        });
    }
};
xhr.send();
