import { Cale } from './Cale.js';
import { Zena } from './Zena.js';
import { Dete } from './Dete.js';
import { ucitajOverlay } from './OverlayPonasanje.js';
import { Observable } from 'rxjs/Rx';
import { fromEvent } from 'rxjs/add/Observable/fromEvent';
import { BazaPodatakaServis } from './BazaPodatakaServis.js';

document.querySelector('button[name="btnPotvrde"]').addEventListener("click", zapocniSimulaciju);
ucitajOverlay();//ovo je kao bitno...
console.log(document.getElementsByName("btnOverlay")[0]);

function zapocniSimulaciju()
{
    let selektor = document.querySelector("select");
    const baza = new BazaPodatakaServis("http://localhost:3000");
    baza.ucitajPorodicu(/*selektor.options[selektor.selectedIndex].value*/9, kreirajObjekteIzPodatka);
    selektor.disabled = true;//mislim da ovako korigujem situaciju
}

function kreirajObjekteIzPodatka(podatak)
{
    console.log(podatak);//zivo me zanima kako izgleda polje u bazi podataka koje nema nista u sebi
    let cale =  new Cale(podatak.ime, podatak.prezime, podatak.godine,
        podatak.novacOdPlate, podatak.tajniStek, null);
    cale.nacrtajCaleta();
    let zena = new Zena(podatak.zena.ime, podatak.zena.prezime, podatak.zena.godine, 
        podatak.zena.prohtevZaParama);
    zena.nacrtajZenu();
    cale.zena = zena;
    zena.muz = cale;
    
    /*podatak.deca.forEach(element => {//srediti konstruktor za dete, jebem ga
        let dete = new Dete(element.ime, element.prezime, element.godine, 0,
            element.prohtevZaParama, cale);
        cale.deca.push(dete);
        dete.nacrtajDete();
    });
  */
}
