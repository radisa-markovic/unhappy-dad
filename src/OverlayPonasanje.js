export class OverlayPonasanje
{
    constructor()
    {
        this.kontejnerZaCeoOverlay = document.getElementById("overlay");
        this.caletovDivOverlay = document.getElementById("caletovDivOverlay");
        this.zeninDivOverlay = document.getElementById("zeninDivOverlay");
        this.kontejnerSveDeceOverlay = document.getElementById("velikiKontejnerDeceOverlay");
        this.dugmeZaPotvrdu = document.getElementById("btnPotvrdaPodataka");

        this.dodajDogadjajeElementima();
    }

    dodajDogadjajeElementima()
    {
        document.querySelector("button[name='btnOverlay']").addEventListener("click", () => {
            this.kontejnerZaCeoOverlay.style.height = '100%';
        });

        this.kontejnerZaCeoOverlay.querySelector("input[name='inpOverlayBrojDece']")
        .addEventListener("change", () => this.ucitajFormeZaUnosDece());//bez () se samo jednom izvrsava

        document.getElementById("btnPotvrdaPodataka").addEventListener("click", () => {
            this.kontejnerZaCeoOverlay.style.height = '0%';
            console.log(this.vratiPodatkeIzCaletovihKontrola());
            console.log(this.vratiPodatkeIzZeninihKontrola());
            console.log(this.vratiPodatkeIzDetetovihKontrola(1));
            console.log(this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDeteProhtevZaParama']")[1]);
        });
    }

    ucitajFormeZaUnosDece()
    {
        let poljeZaBrojDece = this.kontejnerZaCeoOverlay.querySelector("input[name='inpOverlayBrojDece']");
        while(this.kontejnerSveDeceOverlay.firstChild)
            this.kontejnerSveDeceOverlay.removeChild(this.kontejnerSveDeceOverlay.firstChild);//eksperimentalna stvar, da ne ostanu nevalidna deca
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
            this.kontejnerSveDeceOverlay.appendChild(divJednogDeteta);
        }
    }

    //sad, imam dve filozofije, da li da "rucno" pravim JSON ili da kreiram objekat, pa onda JSON.stringify()?
    //mislim da je druga metoda "pouzdanija", sad cu da vidim njen ishod
    vratiPodatkeIzCaletovihKontrola()
    {
        let caletoviPodaciJSON = `
            {
                "ime": "${this.caletovDivOverlay.querySelector("input[name='inpCaletovoImeOverlay']").value}",
                "prezime": "${this.caletovDivOverlay.querySelector("input[name='inpCaletovoPrezimeOverlay']").value}",
                "godine": "${this.caletovDivOverlay.querySelector("input[name='inpCaletoveGodineOverlay']").value}",
                "nivoZadovoljstva": "${this.caletovDivOverlay.querySelector("input[name='inpCaletovoZadovoljstvoOverlay']").value}",
                "tajniStek": "${this.caletovDivOverlay.querySelector("input[name='inpCaletovStekOverlay']").value}"
            }
            `
        return caletoviPodaciJSON;
    }

    vratiPodatkeIzZeninihKontrola()
    {
        return `
            {
                "ime": "${this.zeninDivOverlay.querySelector("input[name='inpZeninoImeOverlay']").value}",
                "prezime": "${this.zeninDivOverlay.querySelector("input[name='inpZeninoPrezimeOverlay']").value}",
                "nivoZadovoljstva": "${this.zeninDivOverlay.querySelector("input[name='inpZeninoZadovoljstvoOverlay']").value}",
                "godine": "${this.zeninDivOverlay.querySelector("input[name='inpZenineGodineOverlay']").value}"
            }
        `;
    }

    vratiPodatkeIzDetetovihKontrola(redniBrojDeteta)
    {
        return `
        {
            "ime": "${this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDeteIme']")[redniBrojDeteta].value}",
            "prezime": "${this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDetePrezime']")[redniBrojDeteta].value}",
            "godine": "${this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDeteGodine']")[redniBrojDeteta].value}",
            "nivoZadovoljstva": "${this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDeteNivoZadovoljstva']")[redniBrojDeteta].value}",
            "prohtevZaParama": "${this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDeteProhtevZaParama']")[redniBrojDeteta].value}"
        }`
    }
}
