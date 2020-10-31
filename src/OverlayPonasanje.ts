import { CaleKomponenta } from './components/CaleKomponenta';
import { ZenaKomponenta } from './components/ZenaKomponenta';
import { DeteKomponenta } from "./components/DeteKomponenta";

export class OverlayPonasanje
{
    constructor()
    {
    //     this.kontejnerZaCeoOverlay = document.getElementById("overlay");
    //     this.caletovDivOverlay = document.getElementById("caletovDivOverlay");
    //     this.caletovoPrezime$ = fromEvent(document.querySelector("input[name='inpCaletovoPrezimeOverlay']"), 'input')
    //                             .pipe(
    //                                 map(event => event.target.value),
    //                                 debounceTime(1000)
    //                             );
    //     this.emitovanjeCaletovogPrezimena = new BehaviorSubject("");
    //     this.supskripcijaCale = this.caletovoPrezime$.subscribe(prezimeCaleta => this.emitovanjeCaletovogPrezimena.next(prezimeCaleta));
       
    //     this.zeninDivOverlay = document.getElementById("zeninDivOverlay");
    //     this.zeninoPrezime$;
    //     this.kontejnerSveDeceOverlay = document.getElementById("velikiKontejnerDeceOverlay");
    //     this.dugmeZaPotvrdu = document.getElementById("btnPotvrdaPodataka");

    //     //ovo je hack koji je ruzan kao nista, al radi
    //     this.dodajDogadjajeElementima();
    //     this.pretplatiZeninoPrezime();
    // }

    // pretplatiZeninoPrezime()
    // {
    //     this.zeninoPrezime$ = this.emitovanjeCaletovogPrezimena.subscribe((prezime) =>  
    //         document.querySelector("input[name='inpZeninoPrezimeOverlay']").value = prezime
    //     )
    // }

    // dodajDogadjajeElementima()
    // {
    //     this.spustiOverlay();
    //     this.podigniOverlay();
    //     this.hendlerBrojaDece();        
    //     this.potvrdiUpisPorodice();

    //     // document.getElementById("btnPotvrdaPodataka").addEventListener("click", () => {
    //     //     this.kontejnerZaCeoOverlay.style.height = '0%';
    //     //     this.zeninoPrezime$.unsubscribe();
    //     //     let cale = this.ucitajCaletaIzKontrola();
    //     //     let zena = this.ucitajZenuIzKontrola();
    //     //     let porodicaJSONObliku = {
    //     //         "ime": cale.ime,
    //     //         "prezime": cale.prezime,
    //     //         "godine": parseInt(cale.godine),
    //     //         "plata": parseInt(cale.plata),
    //     //         "novacOdPlate": parseInt(cale.novacOdPlate),
    //     //         "tajniStek": parseInt(cale.tajniStek),
    //     //         "zena":{
    //     //             "ime": zena.ime,
    //     //             "prezime": zena.prezime,
    //     //             "godine": parseInt(zena.godine),
    //     //             "prohtevZaParama": parseInt(zena.prohtevZaParama)
    //     //         },
    //     //         "deca":
    //     //         []
    //     //     }
    //     //     for(let i=0; i<this.kontejnerZaCeoOverlay.querySelector("input[name='inpOverlayBrojDece']").value; i++)
    //     //     {
    //     //         let privremenoDete = this.ucitajDeteIzKontrola(i);
    //     //         let JSONPrivremenoDete = {
    //     //             "ime": privremenoDete.ime,
    //     //             "prezime": privremenoDete.prezime,
    //     //             "godine": parseInt(privremenoDete.godine),
    //     //             "nivoZadovoljstva": parseInt(privremenoDete.nivoZadovoljstva),
    //     //             "prohtevZaParama": parseInt(privremenoDete.prohtevZaParama)
    //     //         };
    //     //         porodicaJSONObliku.deca.push(JSONPrivremenoDete);
    //     //     }
    //     //     BazaPodatakaServis.dodajPorodicu(porodicaJSONObliku);
    //     // });
    // }

    // spustiOverlay()
    // {
    //     document.querySelector("button[name='btnOverlay']").addEventListener("click", () => {
    //         this.kontejnerZaCeoOverlay.style.height = '100%';
    //     });
    // }

    // podigniOverlay()
    // {
    //     this.kontejnerZaCeoOverlay.querySelector("button[name='btnPonisti']").addEventListener("click", () => {
    //         this.kontejnerZaCeoOverlay.style.height = '0%';
    //         this.zeninoPrezime$.unsubscribe();//pokusaj sprecavanje curenja memorije
    //     });
    // }

    // hendlerBrojaDece()
    // {
    //     this.kontejnerZaCeoOverlay.querySelector("input[name='inpOverlayBrojDece']")
    //     .addEventListener("change", () => this.ucitajFormeZaUnosDece());
    // }

    // potvrdiUpisPorodice()
    // {
    //     document.getElementById("btnPotvrdaPodataka").addEventListener("click", () => {
    //         this.kontejnerZaCeoOverlay.style.height = '0%';
    //         this.zeninoPrezime$.unsubscribe();
    //         let cale = this.ucitajCaletaIzKontrola();
    //         let zena = this.ucitajZenuIzKontrola();
    //         let porodicaJSONObliku = {
    //             "ime": cale.ime,
    //             "prezime": cale.prezime,
    //             "godine": parseInt(cale.godine),
    //             "plata": parseInt(cale.plata),
    //             "novacOdPlate": parseInt(cale.novacOdPlate),
    //             "tajniStek": parseInt(cale.tajniStek),
    //             "zena":{
    //                 "ime": zena.ime,
    //                 "prezime": zena.prezime,
    //                 "godine": parseInt(zena.godine),
    //                 "prohtevZaParama": parseInt(zena.prohtevZaParama)
    //             },
    //             "deca":
    //             []
    //         }
    //         for(let i=0; i<this.kontejnerZaCeoOverlay.querySelector("input[name='inpOverlayBrojDece']").value; i++)
    //         {
    //             let privremenoDete = this.ucitajDeteIzKontrola(i);
    //             let JSONPrivremenoDete = {
    //                 "ime": privremenoDete.ime,
    //                 "prezime": privremenoDete.prezime,
    //                 "godine": parseInt(privremenoDete.godine),
    //                 "nivoZadovoljstva": parseInt(privremenoDete.nivoZadovoljstva),
    //                 "prohtevZaParama": parseInt(privremenoDete.prohtevZaParama)
    //             };
    //             porodicaJSONObliku.deca.push(JSONPrivremenoDete);
    //         }
    //         BazaPodatakaServis.dodajPorodicu(porodicaJSONObliku);
    //     });
    // }

    // ucitajFormeZaUnosDece()
    // {
    //     let poljeZaBrojDece = this.kontejnerZaCeoOverlay.querySelector("input[name='inpOverlayBrojDece']");
    //     while(this.kontejnerSveDeceOverlay.firstChild)
    //         this.kontejnerSveDeceOverlay.removeChild(this.kontejnerSveDeceOverlay.firstChild);
        
    //     let brojDece = parseInt(poljeZaBrojDece.value);
    //     if(brojDece < 0)
    //         brojDece = 0;
        
    //     this.kontejnerZaCeoOverlay.querySelector("input[name='inpOverlayBrojDece']").value = brojDece;
    //     for(let i=0; i < brojDece; i++)
    //     {
    //         let divJednogDeteta = document.createElement("div");
    //         divJednogDeteta.className = "list-group";
    //         divJednogDeteta.innerHTML = `
    //             <h3>Dete ${i + 1} </h3>
    //             <input type="text" name="inpOverlayDeteIme" placeholder="Unesi ime">
    //             <input type="text" name="inpOverlayDetePrezime" readonly>
    //             <input type="number" name="inpOverlayDeteGodine" placeholder="Unesi godine">
    //             <input type="number" name="inpOverlayDeteNivoZadovoljstva" placeholder="Unesi pocetno zadovoljsvo">
    //             <input type="number" name="inpOverlayDeteProhtevZaParama" placeholder="Unesi prohtev za parama">
    //             `;
    //         this.kontejnerSveDeceOverlay.appendChild(divJednogDeteta);
    //         let pretplataDeteta = this.emitovanjeCaletovogPrezimena.subscribe((prezime) => { 
    //             this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDetePrezime']")[i].value = prezime;
    //         });
    //         this.zeninoPrezime$.add(pretplataDeteta);
    //     }
    // }

    // ucitajCaletaIzKontrola()
    // {
    //     let imeCaleta = this.caletovDivOverlay.querySelector("input[name='inpCaletovoImeOverlay']").value;
    //     let prezimeCaleta = this.caletovDivOverlay.querySelector("input[name='inpCaletovoPrezimeOverlay']").value;
    //     let godineCaleta = this.caletovDivOverlay.querySelector("input[name='inpCaletoveGodineOverlay']").value;
    //     let caletovaPlata = this.caletovDivOverlay.querySelector("input[name='inpCaletovaPlataOverlay']").value;
    //     let novacOdPlate = this.caletovDivOverlay.querySelector("input[name='inpCaletovaPlataOverlay']").value;
    //     let tajniStek = this.caletovDivOverlay.querySelector("input[name='inpCaletovStekOverlay']").value;
            
    //     return new Cale(imeCaleta, prezimeCaleta, godineCaleta, caletovaPlata, novacOdPlate, tajniStek, null);
    // }

    // ucitajZenuIzKontrola()
    // {
    //     let ime = this.zeninDivOverlay.querySelector("input[name='inpZeninoImeOverlay']").value;
    //     let prezime = this.zeninDivOverlay.querySelector("input[name='inpZeninoPrezimeOverlay']").value;
    //     let godine = this.zeninDivOverlay.querySelector("input[name='inpZenineGodineOverlay']").value;
    //     let prohtevZaParama = this.zeninDivOverlay.querySelector("input[name='inpZeninProhtevZaParama']").value;

    //     return new Zena(ime, prezime, godine, prohtevZaParama);//ovo je fora sto caleta nemam u konstruktoru...
    // }

    // ucitajDeteIzKontrola(redniBrojDeteta)
    // {
    //     let ime = this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDeteIme']")[redniBrojDeteta].value;
    //     let prezime = this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDetePrezime']")[redniBrojDeteta].value;
    //     let godine = this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDeteGodine']")[redniBrojDeteta].value;
    //     let nivoZadovoljstva = this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDeteNivoZadovoljstva']")[redniBrojDeteta].value;
    //     let prohtevZaParama = this.kontejnerSveDeceOverlay.querySelectorAll("input[name='inpOverlayDeteProhtevZaParama']")[redniBrojDeteta].value;
        
    //     return new Dete(ime, prezime, godine, nivoZadovoljstva, prohtevZaParama, null);
    // }
    }
}

//export const ponasanjeOverlay = new OverlayPonasanje();