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
        }).then(BazaPodatakaServis.vratiSvePorodice(this.popuniiSelektor))
        .catch(greska => console.log(greska));
    }

    popuniiSelektor(podaci)
    {
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
    }
}