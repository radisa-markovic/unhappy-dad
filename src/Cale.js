import { interval } from "rxjs";
import { distinctUntilChanged, map, mapTo } from "rxjs/operators";

export class Cale
{
    constructor(ime, prezime, godine, plata, novacOdPlate, tajniStek, zena)
    {
        this.ime = ime;
        this.prezime = prezime;
        this.godine = godine;
        this.nivoZadovoljstva = 0;
        this.plata = plata;
        this.novacOdPlate = novacOdPlate;
        this.tajniStek = tajniStek;
        this.zena = zena;
        this.deca = [];
        this.kontejner = document.getElementsByName("caletovKontejner")[0];

        this.emitovanjeSteka$ = interval(500)
                                .pipe(map(vrednost => vrednost = this.tajniStek),
                                      distinctUntilChanged());//i on sad kao stalno emituje pare kad se promene
        this.emitovanjePlate$ = interval(500)
                                .pipe(map(vrednost => vrednost = this.novacOdPlate),
                                      distinctUntilChanged());//zena ce ovo osluskivati
        this.primanjePlate$ = interval(1000)
                              .pipe(mapTo(this.plata));

        this.emitovanjeStekaPobedaSubscription = this.emitovanjeSteka$.subscribe((vrednost) => {
            if(this.krajnjiCiljUZivotu())
            {
                alert(`Imam 200 000 u steku`);
                this.emitovanjeStekaPobedaSubscription.unsubscribe();
            }
        });
        this.primanjePlateSubscription = this.primanjePlate$.subscribe((plata) => {
            this.primiPlatu(plata);
            if(this.krajnjiCiljUZivotu())
            {
                alert(`Uspeo sam u zivotu, zaradio sam ${this.tajniStek} u stek i srecan sam u iznosu ${this.nivoZadovoljstva}`);
                this.primanjePlateSubscription.unsubscribe();
            }
        });

        this.primanjePlateSubscription.add(this.emitovanjeStekaPobedaSubscription);
    }

    nacrtajCaleta()
    {
        const formaZaCaleta = `
            Ime: <input type='text' name='inpCaletovoIme' readonly value='${this.ime}'> 
            Prezime: <input type='text' name='inpCaletovoPrezime' readonly value='${this.prezime}'>
            Godine: <input type='number' name='inpCaletoveGodine' readonly value='${this.godine}'>
            Nivo zadovoljstva: <input type='number' name='inpCaletovNivoZadovoljstva' readonly value='${this.nivoZadovoljstva}'>
            Plata: <input type='number' name='inpCaletovaPlata' readonly value=${this.plata}>
            Ukupan novac od plate: <input type='number' name='inpCaletovNovacOdPlate' readonly value='${this.novacOdPlate}'>
            Tajni štek: <input type='number' name='inpCaletovTajniStek' readonly value='${this.tajniStek}'>
            <div class="btn-group-vertical">
                <button name='btnOpljackajKomsiju' value='5000' class="btn btn-success">Opljačkaj komšiju</button>
                <button name='btnOpljackajProdavnicu' value='10000' class="btn btn-success">Opljačkaj prodavnicu</button>
                <button name='btnSverc' value='15000' class="btn btn-success">Obavi šverc</button>
                <button name='btnOpljackajBanku' value='30000' class="btn btn-success">Opljačkaj banku</button>
            </div>`;
        this.kontejner.innerHTML += formaZaCaleta;
        this.kontejner.querySelector("h3").innerHTML = "Otac:";
        let nizCaletovihOpcija = document.querySelectorAll('button[class="btn btn-success"]');
        for(let i=0; i < nizCaletovihOpcija.length; i++)
            nizCaletovihOpcija[i].onclick = (event) => {
                this.zaradiPareVanPlate(event.target.value);
                event.target.disabled = true;
                let stariTekst = event.target.innerHTML;
                let vrednostTajmera = parseInt(event.target.value)/1000;
                
                let tajmer = setInterval(() => event.target.innerHTML = vrednostTajmera--, 1000);

                setTimeout(() => { 
                    event.target.disabled = false;
                    event.target.innerHTML = stariTekst;
                    clearInterval(tajmer);    
                }, parseInt(event.target.value) + 2000);
            } 
    }

    zaradiPareVanPlate(vrednostPlena)
    {
        this.azurirajStek(parseInt(vrednostPlena));
    }

    primiPlatu(iznosPlate)
    {
        this.novacOdPlate += 0.8 * iznosPlate;
        this.azurirajPlatu();
        this.azurirajStek(0.2 * iznosPlate);
    }

    azurirajZadovoljstvo(vrednost)
    {
        this.nivoZadovoljstva += vrednost;
        document.querySelector('input[name="inpCaletovNivoZadovoljstva"]').value = this.nivoZadovoljstva;
    }

    azurirajPlatu()
    {
        this.kontejner.querySelector('input[name="inpCaletovNovacOdPlate"]').value = this.novacOdPlate;
    }
    
    azurirajStek(vrednost)
    {
        this.tajniStek += vrednost;
        document.querySelector('input[name="inpCaletovTajniStek"]').value = this.tajniStek;
    }

    dodajDete(dete)
    {
        this.deca.push(dete);
        this.azurirajZadovoljstvo(1);
        this.emitovanjeStekaPobedaSubscription.add(dete.pracenjeCaletovogStekaSubscription);//nek bude da se ovako radi
    }

    krajnjiCiljUZivotu()
    {
        return (this.tajniStek >= 200000 && this.nivoZadovoljstva === 10)
    }
}