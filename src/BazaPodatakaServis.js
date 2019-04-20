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
}