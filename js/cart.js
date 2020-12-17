function init() {
    let listeCart = document.getElementById("cartContent");

    if (localStorage.length === 0 || localStorage.getItem("livres") === null) {
        let emptyCart = document.createElement("p");

        emptyCart.innerHTML = "Le panier est vide !";
        listeCart.appendChild(emptyCart);
    } else {
        let localCart = JSON.parse(localStorage.getItem("livres"));

        localCart.forEach(element => {
            let tmpPLivre = document.createElement("p");

            let lname = element.name.slice(element.name.indexOf(':') + 1);
            let lstyle = element.style.slice(element.style.indexOf(':') + 1);
            let ldispo = element.dispo.slice(element.dispo.indexOf(':') + 1);

            let tmpLivre = new livre(lname, lstyle, ldispo);

            console.log(tmpLivre.toShow());

            tmpPLivre.innerHTML = tmpLivre.name;
            tmpLivre.margin = "8px";
            listeCart.appendChild(tmpPLivre);
        });
    }
}

function clearStorage() {
    localStorage.clear();
    let listeCart = document.getElementById("cartContent");

    listeCart.textContent = 'Le panier est vide !';
}

