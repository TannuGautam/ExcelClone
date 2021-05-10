let btnContainer = document.querySelector(".add-sheet_btn-container");

let sheetList = document.querySelector(".sheet-list");

let firstSheet = document.querySelector(".sheet");

firstSheet.addEventListener("click", handleSheet);

btnContainer.addEventListener("click", function()
{
    let AllSheets = document.querySelectorAll(".sheet");
    
    let lastSheet = AllSheets[AllSheets.length - 1];

    let lastidx = lastSheet.getAttribute("idx");

    //to convert string to number --> for lastidx
    
    lastidx = Number(lastidx);
    
    let newSheet = document.createElement("div");

    newSheet.setAttribute("class","sheet");

    newSheet.setAttribute("idx", `${lastidx + 1}`);

    newSheet.innerText = `Sheet ${lastidx + 2}`;

    sheetList.appendChild(newSheet);

    //active feature

    for(let i = 0; i < AllSheets.length; i++)
    {
        AllSheets[i].classList.remove("active");
    }

    newSheet.classList.add("active");

    newSheet.addEventListener("click", handleSheet);

})

function handleSheet(e)
{
    let sheet = e.currentTarget;

    let AllSheets = document.querySelectorAll(".sheet");

    for(let i = 0; i < AllSheets.length; i++)
    {
        AllSheets[i].classList.remove("active");
    }

    sheet.classList.add("active");
}