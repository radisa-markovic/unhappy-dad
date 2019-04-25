import { Cale } from './Cale.js';
import { Zena } from './Zena.js';
import { Dete } from './Dete.js';

export const PUTANJA_DO_BAZE_PODATAKA = "http://localhost:3000";

export class BazaPodatakaServis
{
   static vratiSvePorodice(callbackZaSelektor)
   {
       fetch(PUTANJA_DO_BAZE_PODATAKA + "/porodice")
       .then(odgovor => odgovor.json())
       .then(odgovor => callbackZaSelektor(odgovor));//da vidim kako radi
   }

   static ucitajJednuPorodicu(redniBroj, callbackZaObjekte)//mozda ima i neki callback parametar
   {
       fetch(PUTANJA_DO_BAZE_PODATAKA + "/porodice/" + redniBroj)
       .then(odgovor => odgovor.json())
       .then(odgovor => callbackZaObjekte(odgovor));
   }

   static dodajPorodicu(prosledjeniObjekat)
   {
       fetch(PUTANJA_DO_BAZE_PODATAKA + "/porodice/", {
            method: "POST",
            headers:
            {
               'Accept': 'application/json',
               'Content-type': 'application/json'
            },
            body: JSON.stringify(prosledjeniObjekat)
        }).then(podaci => console.log(podaci))
        .catch(greska => console.log(greska));
    }

}