import { BazaPodatakaServis } from "./BazaPodatakaServis.js";
import { Cale } from './Cale.js';
import { Zena } from './Zena.js';
import { Dete } from "./Dete.js";

class OverlayPonasanje
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

        this.kontejnerZaCeoOverlay.querySelector("button[name='btnPonisti']").addEventListener("click", () => {
            this.kontejnerZaCeoOverlay.style.height = '0%';
        });

        this.kontejnerZaCeoOverlay.querySelector("input[name='inpOverlayBrojDece']")
        .addEventListener("change", () => this.ucitajFormeZaUnosDece());//bez () se samo jednom izvrsava

        document.getElementById("btnPotvrdaPodataka").addEventListener("click", () => {
            this.kontejnerZaCeoOverlay.style.height = '0%';
            let cale = this.ucitajCaletaIzKontrola();
            let zena = this.ucitajZenuIzKontrola();
            let porodicaJSONObliku = {
                "ime": cale.ime,
                "prezime": cale.prezime,
                "godine": cale.godine,
                "plata": cale.plata,
                "novacOdPlate": cale.novacOdPlate,
                "tajniStek": cale.tajniStek,
                "zena":{
                    "ime": zena.ime,
                    "prezime": zena.prezime,
                    "godine": zena.godine,
                    "prohtevZaParama": zena.prohtevZaParama
                },
                "deca":
                []
            }
            for(let i=0; i<this.kontejnerZaCeoOverlay.querySelector("input[name='inpOverlayBrojDece']").value; i++)
            {
                let privremenoDete = this.ucitajDeteIzKontrola(i);
                let JSONPrivremenoDete = {
                    "ime": privremenoDete.ime,
                    "prezime": privremenoDete.prezime,
                    "godine": privremenoDete.godine,
                    "nivoZadovoljstva": privremenoDete.nivoZadovoljstva,
                    "prohtevZaParama": privremenoDete.prohtevZaParama
                };
                porodicaJSONObliku.deca.push(JSONPrivremenoDete);
            }
            BazaPodatakaServis.dodajPorodicu(porodicaJSONObliku);
        });
    }

    ucitajFormeZaUnosDece()
    {
        let poljeZaBrojDece = this.kontejnerZaCeoOverlay.querySelector("input[name='inpOverlayBrojDece']");
        while(this.kontejnerSveDeceOverlay.firstChild)
            this.kontejnerSveDeceOverlay.removeChild(this.kontejnerSveDeceOverlay.firstChild);
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

    ucitajCaletaIzKontrola()
    {
        let imeCaleta = this.caletovDivOverlay.querySelector("input[name='inpCaletovoImeOverlay']").value;
        let prezimeCaleta = this.caletovDivOverlay.querySelector("input[name='inpCaletovoPrezimeOverlay']").value;
        let godineCaleta = this.caletovDivOverlay.querySelector("input[name='inpCaletoveGodineOverlay']").value;
        let caletovaPlata = this.caletovDivOverlay.querySelector("input[name='inpCaletovaPlataOverlay']").value;
        let novacOdPlate = this.caletovDivOverlay.querySelector("input[name='inpCaletovaPlataOverlay']").value;
        let tajniStek = this.caletovDivOverlay.querySelector("input[name='inpCaletovStekOverlay']").value;
            
        return new Cale(imeCaleta, prezimeCaleta, godineCaleta, caletovaPlata, novacOdPlate, tajniStek, null);
    }

    ucitajZenuIzKontrola()
    {
        let ime = this.zeninDivOverlay.querySelector("input[name='inpZeninoImeOverlay']").value;
        let prezime = this.zeninDivOverlay.querySelector("input[name='inpZeninoPrezimeOverlay']").value;
        let godine = this.zeninDivOverlay.querySelector("input[name='inpZenineGodineOverlay']").value;
        let prohtevZaParama = this.zeninDivOverlay.querySelector("input[name='inpZeninProhtevZaParama']").value;

        return new Zena(ime, prezime, godine, prohtevZaParama);
    }

    ucitajDeteIzKontrola(redniBrojDeteta)
    {
        let ime = this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDeteIme']")[redniBrojDeteta].value;
        let prezime = this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDetePrezime']")[redniBrojDeteta].value;
        let godine = this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDeteGodine']")[redniBrojDeteta].value;
        let nivoZadovoljstva = this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDeteNivoZadovoljstva']")[redniBrojDeteta].value;
        let prohtevZaParama = this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDeteProhtevZaParama']")[redniBrojDeteta].value;
        
        return new Dete(ime, prezime, godine, nivoZadovoljstva, prohtevZaParama, null);
    }
}

export const ponasanjeOverlay = new OverlayPonasanje();