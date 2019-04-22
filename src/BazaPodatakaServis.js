import { Cale } from './Cale.js';
import { Zena } from './Zena.js';
import { Dete } from './Dete.js';

export const PUTANJA_DO_BAZE_PODATAKA = "http://localhost:3000";

export class BazaPodatakaServis
{
   constructor(putanjaDoBazePodataka)
   {
       this.putanjaDoBazePodataka = putanjaDoBazePodataka; 
   }

   ucitajPorodicu(redniBroj, callbackZaObjekte)//mozda ima i neki callback parametar
   {
       fetch(this.putanjaDoBazePodataka + "/porodice/" + redniBroj)
       .then(odgovor => odgovor.json())
       .then(odgovor => callbackZaObjekte(odgovor));
   }

   dodajPorodicu(prosledjeniObjekat)
   {
       fetch(this.putanjaDoBazePodataka + "/porodice/", {
            method: "POST",
            headers:
            {
               'Accept': 'application/json',
               'Content-type': 'application/json'
            },
            body: prosledjeniObjekat
        }).catch(greska => console.log(greska)); //najbezbolnije cu da resim problem selektora ako ga ovde...
        //...azuriram nakon sto se podatak ucita ovde
        //..ali sta se dogadja kad ponovo pokrenem aplikaciju, trebaju podaci da su tu?
        //...izgleda sa ogroman jedan fetch("porodice"), pa da vadim id-eve odatle, i to da u selektor ubacujem
        //...nek bude da cu to da uradim, aj da vidim kako ce to da izgleda
        //...->asocijativni niz u javaScriptu, php stil sa web-a? (while (mysqli_fetch_assoc())) ?
        //...->lokalna kopija podataka na nekom "papirnom medijumu"(fajl) (glumim kes?), (moze li sa fajlovima ovde?)
        //... CSS tricks moze da mi pomogne
   }
}