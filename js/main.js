const localStorage = window.localStorage;
let livres = [];

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

function addToCart(livreAjouté)
{
    livres.length = 0;
    let localCart = JSON.parse(localStorage.getItem("livres"));
    if (localCart) {
        localCart.forEach(element => {
            let lname = element.name.slice(element.name.indexOf(':') + 1);
            let lstyle = element.style.slice(element.style.indexOf(':') + 1);
            let ldispo = element.dispo.slice(element.dispo.indexOf(':') + 1);

            let tmpLivre = new livre(lname, lstyle, ldispo);

            livres.push(tmpLivre);
        });
    }

    livres.push(livreAjouté);

    localStorage.setItem("livres", JSON.stringify(livres));

    if(window.Notification && window.Notification !== 'denied') {
        Notification.requestPermission(perm => { // On demande l’autorisation
            if (perm === 'granted') { // Si l’autorisation est accordée
                const options = { // Le message associé à la notification
                    body: livreAjouté.name.replace(':', '') + ' ajouté au panier'
                }
                const notif = new Notification('Panier', options); // Notification crée
            } else {
                console.log('Autorisation de recevoir des notifications refusée');
            }
        });
    }
}
