import { Tajmer } from './Tajmer';

export function hendlerKlikaSaTajmerom(event) {
  let kliknutoDugme = event.target;
  kliknutoDugme.disabled = true;
  let stariTekst = kliknutoDugme.innerHTML;

  let tajmer = new Tajmer(parseInt(kliknutoDugme.value) / 1000);//mislim da ovako ide
  tajmer.vrednostOdbrojavanja$.subscribe(vrednost => {
    if (vrednost !== 0)
      kliknutoDugme.innerHTML = vrednost;
    else {
      kliknutoDugme.innerHTML = stariTekst;
      kliknutoDugme.disabled = false;//fora je do mog tajmera 300%, jer onaj tajmer se "ne zamrzne" kad alert iskoci
    }//pa onda dolazim do situacije da on emituje pre nego sto interval zavrsi posao
    //zaobilaznica za ovo je ili novi sistem za uzbunu neuspele akcije (neki tekst na dugmetu tipa "fali x para")
    //ili da nekako sredjujem taj alert.... mislim da cu da ovo dugme sredjujem, ovaj tekst umesto alert-a
    //ili nekako da na silu sredim dugme da se upali, mada to nije resenje
  });
}