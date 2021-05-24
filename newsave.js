let save = document.querySelector(".save");

let open = document.querySelector(".open");


//to download excel representation

save.addEventListener("click", function()
{
    const data = JSON.stringify(sheetArray);

    //convert it into blob

    const blob = new blob([data], { type:'aplication/json'});

    //convert any type of file into url
    const url = window.URL.createObjectURL(blob);

    let a = document.createElement("a");

    //content in that file
    a.href = url;

    //file download
    a.download = "file.json";

    //anchor click
    a.click();
})

//donwloaded file -> open read
