import { Cale } from './Cale.js';
import { Zena } from './Zena.js';
import { Dete } from './Dete.js';
import { ponasanjeOverlay } from './OverlayPonasanje.js';
import { BazaPodatakaServis } from './BazaPodatakaServis.js';


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
    let cale =  new Cale(podatak.ime, podatak.prezime, podatak.godine,
        podatak.novacOdPlate, podatak.tajniStek, null);
    cale.nacrtajCaleta();
    let zena = new Zena(podatak.zena.ime, podatak.zena.prezime, podatak.zena.godine, 
        podatak.zena.prohtevZaParama);
    zena.nacrtajZenu();
    cale.zena = zena;
    zena.muz = cale;
    
    podatak.deca.forEach(element => {
        let dete = new Dete(element.ime, element.prezime, element.godine,
            element.prohtevZaParama, cale);
        cale.dodajDete(dete);
        dete.nacrtajDete();
    });
    
}