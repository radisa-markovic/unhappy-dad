import { Cale } from './Cale.js';
import { Zena } from './Zena.js';
import { Dete } from './Dete.js';
import { ponasanjeOverlay } from './OverlayPonasanje.js';
import { BazaPodatakaServis } from './BazaPodatakaServis.js';
import { interval } from 'rxjs';
import { mapTo, tap, take, takeUntil, filter, map, distinctUntilChanged } from "rxjs/operators";


BazaPodatakaServis.vratiSvePorodice();
document.querySelector('button[name="btnPotvrde"]').addEventListener("click", zapocniSimulaciju);

function zapocniSimulaciju()
{
    let selektor = document.querySelector("select");
    BazaPodatakaServis.ucitajJednuPorodicu(selektor.options[selektor.selectedIndex].value, glavnaFunkcijaPrograma);
    selektor.disabled = true;
}


function glavnaFunkcijaPrograma(podatak)
{
    let cale =  new Cale(podatak.ime, podatak.prezime, podatak.godine, podatak.plata, 
        podatak.novacOdPlate, podatak.tajniStek, null);
    cale.nacrtajCaleta();
    let zena = new Zena(podatak.zena.ime, podatak.zena.prezime, podatak.zena.godine, 
        podatak.zena.prohtevZaParama);
    zena.muz = cale;
    zena.nacrtajZenu();
    cale.zena = zena;
    podatak.deca.forEach(element => {
        let dete = new Dete(element.ime, element.prezime, element.godine,
            element.prohtevZaParama, cale);
        cale.dodajDete(dete);
        dete.nacrtajDete();
    });
    
    //pomereno odozdo, jer opet ide ona evaluacija, tj ne vidi ga ovo dole da postoji (hoisting, aaaa)
    const caletovStek = interval(500)
        .pipe(map(vrednost => cale.tajniStek),
              distinctUntilChanged(),
              filter(vrednost => vrednost >= 200000),
              take(1));

    const caletovaMesecnaPlata = interval(1000)
                                  .pipe(mapTo(cale.plata),
                                  takeUntil(caletovStek));

    const primanjePlate$ = caletovaMesecnaPlata.subscribe(() => {
        cale.primiPlatu();
        if(cale.krajnjiCiljUZivotu())
        {//ne radi lepo
            primanjePlate$.unsubscribe();
            alert("Cale je pobedio, srecan je dosta");
        }//uslov za pobedu ne radi skroz kako treba, takodje srediti "ponasanja" zene i dece
    });
}