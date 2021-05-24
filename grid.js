let leftCol = document.querySelector(".left_col");

let rows = 100;

let grid = document.querySelector(".grid");

let topRow = document.querySelector(".top_row");

let cols = 26;

let fontFamilyElem = document.querySelector(".font-family");

let fontSizeElement = document.querySelector(".font-size");

let boldBtn = document.querySelector(".bold");

let underlineBtn = document.querySelector(".underline");

let italicBtn = document.querySelector(".italics");

let alignBtn = document.querySelectorAll(".align-container>*");

let textColor = document.querySelector(".color");

let backgroundColor = document.querySelector(".bg-color");

let leftAlign = document.querySelector(".left");

let rightAlign = document.querySelector(".right");

let centerAlign = document.querySelector(".center");

for(let i = 0; i < rows; i++)
{
    let colBox = document.createElement("div");

    colBox.innerText = i + 1;

    colBox.setAttribute("class","box");

    leftCol.appendChild(colBox);

}



for(let i = 0; i < cols; i++)
{
    let cell = document.createElement("div");

    cell.innerText = String.fromCharCode(65 + i);

    cell.setAttribute("class","cell");

    topRow.appendChild(cell);
}

//grid
for(let i = 0; i < rows; i++)
{
    let row = document.createElement("div");

    row.setAttribute("class", "row");

    for(let j = 0; j < cols; j++)
    {
        let cell = document.createElement("div");

        // cell.innerText=`${String.fromCharCode(65 + j)}  ${i+1}`;

        cell.setAttribute("class", "cell");

        cell.setAttribute("rid",i);

        cell.setAttribute("cid",j);

        cell.setAttribute("contentEditable","true");

        row.appendChild(cell);
    }
    grid.appendChild(row);
}


//each cell must be displayed in address bar

let allCells = document.querySelectorAll(".grid .cell");

let addressInput = document.querySelector(".address-input");

for(let i = 0; i < allCells.length; i++)
{
    allCells[i].addEventListener("click", function()
    {
        let rid = allCells[i].getAttribute("rid");

        let cid = allCells[i].getAttribute("cid");

        rid = Number(rid);

        cid = Number(cid);

        let address = `${String.fromCharCode(65 + cid)}${rid + 1}`;

        addressInput.value = address;

        let cellObject = sheetDB[rid][cid];

        if(cellObject.bold == "normal")
        {
            boldBtn.classList.remove("active-btn");
        }
        else
        {
            boldBtn.classList.add("active-btn");
        }

        if(cellObject.underline == "none")
        {
            underlineBtn.classList.remove("active-btn");
        }
        else
        {
            underlineBtn.classList.add("active-btn");
        }

        if(cellObject.italic == "normal")
        {
            italicBtn.classList.remove("active-btn");
        }
        else
        {
            italicBtn.classList.add("active-btn");
        }


    })
}

//creating database for sheet ie adding the default values.

//*****SHEEET**********/
let sheetArray = [];

let sheetDB = [];

// function createSheet()
// {
//     let NewDB = [];

    for(let i = 0; i < rows; i++)
    {
        let row = [];

        for(let j = 0; j < cols; j++)
        {
            let cell = {
                bold : "normal",
                italic:"normal",
                underline: "none",
                hAlign: "center",
                fontFamily: "sans-serif",
                color:"white",
                bColor:"none",
                value:"",
                formula: "",
                children: []
            }

            // let elem = document.querySelector(`.grid .cell[rid = '${i}'][cid = '${j}']`);

            // elem.innerText = "";
            
            row.push(cell);

        }

        sheetDB.push(row)
       
    }
// }

// ********************FORMATTING ****************

//getting address for font change n color change n alignment
function findUICellElement()
{
    let address = addressInput.value;

    let rcid = getRIDCIDfromAddress(address);

    let rid = rcid.rid;

    let cid = rcid.cid;

    let uiCellElement = document.querySelector(`.cell[rid = "${rid}"][cid = "${cid}"]`)

    return uiCellElement;
}

function getRIDCIDfromAddress(address)
{
    let cid = Number(address.charCodeAt(0)) - 65;

    let rid = Number(address.slice(1)) - 1;

    return {"rid" : rid, "cid" : cid};

}


//changing fonts
fontFamilyElem.addEventListener("change", function()
{
    let list = fontFamilyElem.value; 

    let uiCellElement = findUICellElement();

    uiCellElement.style.fontFamily = list;
})

//changing fonts size
fontSizeElement.addEventListener("change", function()
{
    let val = fontSizeElement.value ;

    let uiCellElement = findUICellElement();

    uiCellElement.style.fontSize = val + "px";

})

allCells[0].click();

//adding the bold , underline and italics

boldBtn.addEventListener("click", function()
{

    let uiCellElement = findUICellElement();

    let cid = uiCellElement.getAttribute("cid");

    let rid = uiCellElement.getAttribute("rid");

    let cellObject = sheetDB[rid][cid];

    if(cellObject.bold == "normal")
    {
        uiCellElement.style.fontWeight = "bold";

        boldBtn.classList.add("active-btn");

        cellObject.bold = "bold";
    }
    else
    {
        boldBtn.classList.remove("active-btn");

        uiCellElement.style.fontWeight = "normal";

        cellObject.bold = "normal";
    }
})

underlineBtn.addEventListener("click", function()
{
    let uiCellElement = findUICellElement();

    let cid = uiCellElement.getAttribute("cid");

    let rid = uiCellElement.getAttribute("rid");

    let cellObject = sheetDB[rid][cid];

    if(cellObject.underline == "none")
    {
        uiCellElement.style.textDecoration = "underline";

        underlineBtn.classList.add("active-btn");

        cellObject.underline = "underline";
    }
    else
    {
        underlineBtn.classList.remove("active-btn");

        uiCellElement.style.textDecoration = "none";

        cellObject.underline = "none";
    }
  
})

italicBtn.addEventListener("click", function()
{
    let uiCellElement = findUICellElement();

    let cid = uiCellElement.getAttribute("cid");

    let rid = uiCellElement.getAttribute("rid");

    let cellObject = sheetDB[rid][cid];

    if(cellObject.italic == "normal")
    {
        uiCellElement.style.fontStyle = "italic";

        italicBtn.classList.add("active-btn");

        cellObject.italic = "italic";
    }
    else
    {
        italicBtn.classList.remove("active-btn");

        uiCellElement.style.fontStyle = "normal";

        cellObject.italic = "normal";
    }
    
})


//horizontal alignment
leftAlign.addEventListener("click", function()
{
    let uiCellElement = findUICellElement();

    uiCellElement.style.textAlign = "left";

    console.log(uiCellElement.style.textAlign);

})

centerAlign.addEventListener("click", function()
{
    let uiCellElement = findUICellElement();

    uiCellElement.style.textAlign = "center";

})

rightAlign.addEventListener("click", function()
{
    let uiCellElement = findUICellElement();

    uiCellElement.style.textAlign = "right";


})

//textColor
textColor.addEventListener("click", function()
{
    let uiCellElement = findUICellElement();


    uiCellElement.style.color = textColor.value;
})

//backgroundcolor
backgroundColor.addEventListener("click", function()
{
    let uiCellElement = findUICellElement();

    uiCellElement.style.backgroundColor = backgroundColor.value;
})


