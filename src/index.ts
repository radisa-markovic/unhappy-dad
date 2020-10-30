import { CaleKomponenta } from './components/CaleKomponenta';
import { ZenaKomponenta } from './components/ZenaKomponenta';
import { DeteKomponenta } from './components/DeteKomponenta';
import { OverlayPonasanje } from './OverlayPonasanje';
//import * as bajaFunkcije from './MojeUtilityFunkcije';
import { BazaPodatakaServis } from './BazaPodatakaServis.js';
import { Porodica } from './models/Porodica';

let caleKomponenta: CaleKomponenta;
let zenaKomponenta: ZenaKomponenta;
const selektor = <HTMLSelectElement>document.querySelector("#selektorIzboraFamilije")!;
const dugmePotvrde = <HTMLButtonElement>document.querySelector('button[name="btnPotvrde"]')!;
dugmePotvrde.disabled = true;//dok se ne ucitaju porodice
//.addEventListener("click", zapocniSimulaciju);
const ponasanjeOverlay = new OverlayPonasanje();

//ovo nisam znao ni da postoji pre izvesnog vremena, a zapravo mi bas to trebalo da popunim selektor opcijama
window.addEventListener("DOMContentLoaded", async (): Promise<void> => {
    let odgovor = await fetch("http://localhost:3000/porodice");
    if(odgovor.status !== 404)
    {
        let porodice: Porodica[] = await odgovor.json();
        porodice.forEach((porodica) => {
            const vrednostZaSelektor = porodica.otac.prezime;
            const novaOpcija = document.createElement("option");
            novaOpcija.value = vrednostZaSelektor;
            novaOpcija.text = vrednostZaSelektor;
            selektor!.options.add(novaOpcija);
            //po default-u je izabran prvi element, a ovde nemam crtanje, pa je onda sve prazno
        });
        dugmePotvrde!.disabled = false;
    }
    else
    {
        throw new Error("Zahtev za podacima nije uspeo");
    }
});

selektor.addEventListener("change", async (): Promise<void> => {
    const divCaleta = document.querySelector("[name='caletovKontejner']")!;
    const divZene = document.querySelector("[name='zeninKontejner']")!;
    const divDece = document.querySelector("#kontejnerDece")!;
    divCaleta.innerHTML = "";
    divZene.innerHTML = "";
    divDece.innerHTML = "";//da ispraznim situaciju pri svakoj promeni

    const selektovanaOpcija = selektor.selectedIndex;
    let odgovor = await fetch("http://localhost:3000/porodice/" + selektovanaOpcija);
    let porodica: Porodica = await odgovor.json();
    
    caleKomponenta = new CaleKomponenta(porodica.otac);
    zenaKomponenta = new ZenaKomponenta(porodica.zena, caleKomponenta);
    divCaleta.appendChild(caleKomponenta.nacrtajCaleta());
    divZene.appendChild(zenaKomponenta.nacrtajZenu());
    
    let deca = porodica.deca;
    deca.forEach((dete) => {
        let deteKomponenta = new DeteKomponenta(dete);
        divDece.appendChild(deteKomponenta.nacrtajDete());
    });
});

dugmePotvrde.addEventListener('click', () => {
    dugmePotvrde.disabled = true;
    //i ovde se zapocinje simulacija kao...
});

// function zapocniSimulaciju() { //ideja za switchMap: ovde dodje klik za start, a ja promenim na emitovanje plate npr
//     //ili nesto slicno, switchMap ne znam gde bih jos mogao da koristim...
//     let selektor = document.querySelector("select");
//     BazaPodatakaServis.ucitajJednuPorodicu(selektor.options[selektor.selectedIndex].value, glavnaFunkcijaPrograma);
//     selektor.disabled = true;
// }


// function glavnaFunkcijaPrograma(podatak)
// {
//     let cale = new Cale(podatak.ime, podatak.prezime, podatak.godine, podatak.plata,
//         podatak.novacOdPlate, podatak.tajniStek);
//     cale.nacrtajCaleta();
//     let zena = new Zena(podatak.zena.ime, podatak.zena.prezime, podatak.zena.godine,
//         podatak.zena.prohtevZaParama, cale);
//     zena.postaviMuza(cale); //koliko je ovaj kod ruzan...
//     zena.nacrtajZenu();
//     cale.postaviZenu(zena);
    
//     podatak.deca.forEach(element => {
//         let dete = new Dete(element.ime, element.prezime, element.godine,
//             element.prohtevZaParama, cale);
//         cale.dodajDete(dete);
//         dete.nacrtajDete();
//     });

//}