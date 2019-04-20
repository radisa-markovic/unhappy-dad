import { Cale } from './Cale.js';
import { Zena } from './Zena.js';
import { Dete } from './Dete.js';
import { Observable } from 'rxjs/Rx';
import { fromEvent } from 'rxjs/add/Observable/fromEvent';
import { BazaPodatakaServis } from './BazaPodatakaServis.js';


const baza = new BazaPodatakaServis("http://localhost:3000");
baza.ucitajPorodicu(0, kreirajObjekteIzPodatka);

function kreirajObjekteIzPodatka(podatak)
{
    let cale =  new Cale(podatak.ime, podatak.prezime, podatak.godine, podatak.nivoZadovoljstva,
        podatak.novacOdPlate, podatak.tajniStek, null);
    cale.nacrtajCaleta();
    let zena = new Zena(podatak.zena.ime, podatak.zena.prezime, podatak.zena.godine, 
        podatak.zena.nivoZadovoljstva, podatak.zena.prohtevZaParama);
    zena.nacrtajZenu();
    cale.zena = zena;
    
    podatak.deca.forEach(element => {
        let dete = new Dete(element.ime, element.prezime, element.godine, 
            element.nivoZadovoljstva, element.prohtevZaParama);
        cale.deca.push(dete);
        dete.nacrtajDete();
    });
    

    while(cale.krajnjiCiljUZivotu())
    {

    }
    //zavrsio sam posao
    
}
