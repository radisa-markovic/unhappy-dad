export const PUTANJA_DO_BAZE_PODATAKA = "http://localhost:3000";

export class BazaPodatakaServis
{
    constructor()
    {}

   static vratiSvePorodice()
   {
       fetch(PUTANJA_DO_BAZE_PODATAKA + "/porodice")
       .then(odgovor => odgovor.json())
       .then(podaci => {
            let selektor = document.querySelector("select");
            while(selektor.firstChild)
                selektor.removeChild(selektor.firstChild);
            let i = 0;
            while(podaci[i])
            {
                let opcija = document.createElement("option");
                opcija.value = i;
                opcija.innerHTML = podaci[i].prezime;
                selektor.appendChild(opcija);
                i++;
            }
       });
   }

   static ucitajJednuPorodicu(redniBroj, callbackZaObjekte)
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
        }).then(() => BazaPodatakaServis.vratiSvePorodice()) //ovaj korak je nejasan... al on je zbog retardiranog selektora
        .catch(greska => console.log(greska));
    }

}