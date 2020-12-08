let livres = [];
class livre {
    constructor(name, style, dispo) {
        this.name = name;
        this.style = style;
        this.dispo = dispo;
    }

    toShow()
    {
        return "name: " + this.name + "\nstyle: " + this.style + "\ndispo: " + this.dispo;
    }
}

async function fetchLivres() {
    let response = await fetch('http://127.0.0.1:3001/livres');

    if(response.ok)
    {
        let json = await response.json();
        let nbrLivres = json.length;
        let cardDiv = document.getElementById("cardContainer");

        for (let i = 0; i < nbrLivres; i ++)
        {
            let tempDiv = document.createElement("div");
            let tmpNameP = document.createElement("p");
            let tmpStyleP = document.createElement("p");
            let tmpDispoP = document.createElement("p");
            let tmpBtn = document.createElement("button");

            tmpNameP.innerHTML = "Nom : " + json[i].name;
            tmpStyleP.innerHTML = "Style : " + json[i].style;
            tmpDispoP.innerHTML = "Disponibilité : " + json[i].dispo;
            tmpBtn.innerHTML = "Add to Cart";
            tmpBtn.addEventListener("click", btnClicked);
            tempDiv.appendChild(tmpNameP);
            tempDiv.appendChild(tmpStyleP);
            tempDiv.appendChild(tmpDispoP);
            tempDiv.appendChild(tmpBtn);
            tempDiv.style.border = "thick solid black";
            tempDiv.style.margin = "10px";
            tempDiv.style.padding = "10px";
            cardDiv.appendChild(tempDiv);
        }
    }
    else
    {
        alert("Erreur fetch : " + response.status);
    }
}

function btnClicked(event) {
    let divE = event.target.parentElement;
    let children = divE.childNodes;

    let lname = children[0].innerHTML.slice(children[0].innerHTML.indexOf(' ', 2) + 1);
    let lstyle = children[1].innerHTML.slice(children[1].innerHTML.indexOf(' ', 2) + 1);
    let ldispo = children[2].innerHTML.slice(children[2].innerHTML.indexOf(' ', 2) + 1);

    let tmpLivre = new livre(lname, lstyle, ldispo);

    addToCart(tmpLivre);
}

function addToCart(livre)
{
    for(let i = 0; i < livres.length; i ++)
    {
        console.log(livres[i].toShow());
    }
    console.log("\n");
    livres.push(livre);
    for(let i = 0; i < livres.length; i ++)
    {
        console.log(livres[i].toShow());
    }
    console.log("\n");
    const localStorage = window.localStorage;
    localStorage.setItem("livres", livres);

    let testLocalStorage = localStorage.getItem("livres");
}
