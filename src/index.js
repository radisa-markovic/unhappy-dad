import { Cale } from './Cale.js';
import { Zena } from './Zena.js';
import { Dete } from './Dete.js';
import { ucitajOverlay, ucitajFormeZaUnosDece } from './OverlayPonasanje.js';
import { BazaPodatakaServis } from './BazaPodatakaServis.js';


BazaPodatakaServis.vratiSvePorodice(popuniSelektor); //housework takozvani mora da ide u neki drugi fajl
//jer, em je preglednije, em nije u skladu sa Uncle Bobom
document.querySelector('button[name="btnPotvrde"]').addEventListener("click", zapocniSimulaciju);
//ucitajOverlay();//ovo je kao bitno...
//ucitajFormeZaUnosDece();//mora da ima neki lepsi nacin da se postigne ista funkcinalnost..

function zapocniSimulaciju()
{
    let selektor = document.querySelector("select");
    BazaPodatakaServis.ucitajJednuPorodicu(selektor.options[selektor.selectedIndex].value, kreirajObjekteIzPodatka);
    selektor.disabled = true;
    let podaci = BazaPodatakaServis.vratiSvePorodice(popuniSelektor);
}

function popuniSelektor(podaci)
{
    console.log(podaci[0].prezime);
    let selektor = document.querySelector("select");
    let i = 0;
    while(podaci[i])
    {
        let opcija = document.createElement("option");
        opcija.value = i;
        opcija.innerHTML = podaci[i].prezime;
        selektor.appendChild(opcija);
        i++;
    }
    return podaci;//za sledeci then, poluskrpljeno
}

function kreirajObjekteIzPodatka(podatak)
{
    let cale =  new Cale(podatak.ime, podatak.prezime, podatak.godine,
        podatak.novacOdPlate, podatak.tajniStek, null);
    cale.nacrtajCaleta();
    let zena = new Zena(podatak.zena.ime, podatak.zena.prezime, podatak.zena.godine, 
        podatak.zena.prohtevZaParama);
    zena.nacrtajZenu();
    cale.zena = zena;
    zena.muz = cale;
    
    podatak.deca.forEach(element => {//srediti konstruktor za dete, jebem ga
        let dete = new Dete(element.ime, element.prezime, element.godine, 0,
            element.prohtevZaParama, cale);
        cale.deca.push(dete);
        dete.nacrtajDete();
    });
  
}
