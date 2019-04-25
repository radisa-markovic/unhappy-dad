ucitajOverlay();//da ga odmah pozovem, mozda moze i ovako
ucitajFormeZaUnosDece(); //odmah zovem, a eksportujem skriptu, da sve bude na jednom mestu, bem ga

export function ucitajOverlay() //mozda da ovo umotam u klasu i da imam pokazivac na servis baze podataka
{//pa da tu prebacim funkciju za vracanje podataka, a ovde samo preusmeravam taj objekat koji ubacujem
    document.getElementsByName("btnOverlay")[0].addEventListener("click", () => {
        document.getElementById("overlay").style.height = '100%';
    });

    //logika je prebacena u BazaPodatakaServis, sad samo da uhvatim podatke iz onih kontrola...
    //...pa da ih ubacim ovde dole i da upakujem u podatak
    document.getElementById("btnPotvrdaPodataka").addEventListener("click", () => {
        document.getElementById("overlay").style.height = '0%';
        let caletovDiv = document.getElementById("caletovDivOverlay");
        console.log( `
        {
            "ime": "${caletovDiv.querySelector("input[name='inpCaletovoImeOverlay']").value}",
            "prezime": "${caletovDiv.querySelector("input[name='inpCaletovoPrezimeOverlay']").value}",
            "godine": "${caletovDiv.querySelector("input[name='inpCaletoveGodineOverlay']").value}",
            "nivoZadovoljstva": "${caletovDiv.querySelector("input[name='inpCaletovoZadovoljstvoOverlay']").value}",
            "tajniStek": "${caletovDiv.querySelector("input[name='inpCaletovStekOverlay']").value}"
        }
    `);
    });
}
//posle cu da ubacim kod gde treba, sad mi samo treba nesto sto radi

export function ucitajFormeZaUnosDece()
{
    let poljeZaBrojDece = document.querySelector("input[name='inpOverlayBrojDece']");

    poljeZaBrojDece.addEventListener("change", () => {
        let kontejnerSveDece = document.getElementById("velikiKontejnerDeceOverlay");
        while(kontejnerSveDece.firstChild)
            kontejnerSveDece.removeChild(kontejnerSveDece.firstChild);//eksperimentalna stvar, da ne ostanu nevalidna deca
        let brojDece = parseInt(poljeZaBrojDece.value);
        for(let i=0; i<brojDece; i++)
        {
            let divJednogDeteta = document.createElement("div");
            divJednogDeteta.className = "list-group";
            divJednogDeteta.innerHTML = `
            <h3>Dete ${i + 1} </h3>
            <input type="text" name="inpOverlayDeteIme" placeholder="Unesi ime">
            <input type="text" name="inpOverlayDetePrezime" placeholder="Unesi prezime">
            <input type="number" name="inpOverlayDeteGodine" placeholder="Unesi godine">
            <input type="number" name="inpOverlayDeteNivoZadovoljstva" placeholder="Unesi pocetno zadovoljsvo">
            <input type="number" name="inpOverlayDeteProhtevZaParama" placeholder="Unesi prohtev za parama">
            `;
            kontejnerSveDece.appendChild(divJednogDeteta);
        }
    });

    function preuzmiPodatkeIzCaletovihKontrola()
    {
        let caletovDiv = document.getElementById("caletovDivOverlay");
        let caletoviPodaciJSON = `
            {
                "ime": "${caletovDiv.querySelector("input[name='inpCaletovoImeOverlay']").value}",
                "prezime": "${caletovDiv.querySelector("input[name='inpCaletovoPrezimeOverlay']").value}",
                "godine": "${caletovDiv.querySelector("input[name='inpCaletoveGodineOverlay']").value}",
                "nivoZadovoljstva": "${caletovDiv.querySelector("input[name='inpCaletovoZadovoljstvoOverlay']").value}",
                "tajniStek": "${caletovDiv.querySelector("input[name='inpCaletovStekOverlay']").value}"
            }
        `
        return caletoviPodaciJSON;
    }
}