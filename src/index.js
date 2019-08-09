import { Cale } from './CaleKomponenta/Cale';
import { Zena } from './ZenaKomponenta/Zena';
import { Dete } from './DeteKomponenta/Dete';
import { ponasanjeOverlay } from './OverlayPonasanje.js';
import * as bajaFunkcije from './MojeUtilityFunkcije';
import { BazaPodatakaServis } from './BazaPodatakaServis.js';
import { Tajmer } from './Tajmer';
import { fromEvent, interval, range } from 'rxjs';
import { map, tap, debounceTime, filter, switchMap, scan, take } from 'rxjs/operators';

BazaPodatakaServis.vratiSvePorodice();
document.querySelector('button[name="btnPotvrde"]').addEventListener("click", zapocniSimulaciju);

function zapocniSimulaciju() { //ideja za switchMap: ovde dodje klik za start, a ja promenim na emitovanje plate npr
    //ili nesto slicno, switchMap ne znam gde bih jos mogao da koristim...
    let selektor = document.querySelector("select");
    BazaPodatakaServis.ucitajJednuPorodicu(selektor.options[selektor.selectedIndex].value, glavnaFunkcijaPrograma);
    selektor.disabled = true;
}


function glavnaFunkcijaPrograma(podatak)
{
    let cale = new Cale(podatak.ime, podatak.prezime, podatak.godine, podatak.plata,
        podatak.novacOdPlate, podatak.tajniStek);
    cale.nacrtajCaleta();
    let zena = new Zena(podatak.zena.ime, podatak.zena.prezime, podatak.zena.godine,
        podatak.zena.prohtevZaParama, cale);
    zena.postaviMuza(cale); //koliko je ovaj kod ruzan...
    zena.nacrtajZenu();
    cale.postaviZenu(zena);
    
    podatak.deca.forEach(element => {
        let dete = new Dete(element.ime, element.prezime, element.godine,
            element.prohtevZaParama, cale);
        cale.dodajDete(dete);
        dete.nacrtajDete();
    });

}