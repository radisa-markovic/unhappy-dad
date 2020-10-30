import { Cale } from "../models/Cale";

export class CaleKomponenta
{   
    public kontejner: HTMLElement;
    constructor(public caleModel: Cale, public nivoZadovoljstva: number = 0)
    {
        this.kontejner = document.createElement("div");
    //     this.zena = null;
    //     this.deca = [];
    //     this.kontejner = document.getElementsByName("caletovKontejner")[0];

    //     //200 je prvobitno
    //     this.emitovanjeSteka$ = interval(500).pipe(
    //         map(vrednost => vrednost = this.tajniStek),
    //         distinctUntilChanged()
    //     );//i on sad kao stalno emituje pare kad se promene
    //     this.emitovanjePlate$ = interval(500).pipe(
    //         map(vrednost => vrednost = this.novacOdPlate),
    //         distinctUntilChanged()
    //     );
        
    //     this.primanjePlate$ = interval(5000).pipe(
    //         mapTo(this.plata)
    //     );

    //     //jednom mora da se proglasi i da mu se dodeli vrednost, sve ostalo samo treba da se pokupi
    //     this.glavniSubscription = this.emitovanjeSteka$.subscribe((vrednost) => {
    //         if(this.krajnjiCiljUZivotu())
    //            this.zavrsiIgru();
    //     });

    //     this.glavniSubscription.add(this.primanjePlate$.subscribe((plata) => {
    //         this.primiPlatu(plata);
    //         if(this.krajnjiCiljUZivotu())
    //             this.zavrsiIgru();
    //     }));

    // }
    }

    nacrtajCaleta(): HTMLElement
    {
        //nivoZadovoljstva cu da preracunavam kasnije po nekoj formuli, bem ga
        const {ime,prezime,godine,novacOdPlate,plata,tajniStek} = this.caleModel;
        this.kontejner.innerHTML = `
            <div>
                <h3>Otac: </h3>
                <p>
                    Ime: <input type='text'
                                name='inputCaletovoIme'
                                readonly
                                value=${ime} />
                </p>
                <p>
                    Prezime: <input type='text'
                                    name='inputCaletovoPrezime'
                                    readonly
                                    value=${prezime} />
                </p>
                <p>
                    Godine: <input type='text'
                                   name='inpCaletoveGodine'
                                   readonly
                                   value=${godine} />
                </p>
                <p>
                    Nivo zadovoljstva: <input type='number' 
                                              name='inpCaletovNivoZadovoljstva' 
                                              readonly 
                                              value='${this.nivoZadovoljstva}' /> 
                </p>
                <p>
                    Plata: <input type='number' 
                                  name='inpCaletovaPlata' 
                                  readonly 
                                  value=${plata} /> 
                </p>
                <p>
                    Ukupan novac od plate: <input type='number' 
                                                  name='inpCaletovNovacOdPlate' 
                                                  readonly 
                                                  value='${novacOdPlate}' />     
                </p>
                <p>
                    Tajni štek: <input type='number' 
                                       name='inpCaletovTajniStek' 
                                       readonly 
                                       value='${tajniStek}' />
                </p>
                <div class="btn-group-vertical">
                    <button name='btnOpljackajKomsiju' 
                            value='5000' 
                            class="btn btn-success" 
                            title="Dodaj 5000 u štek">
                            Opljačkaj komšiju
                    </button>
                    <button name='btnOpljackajProdavnicu' 
                            value='10000' 
                            class="btn btn-success" 
                            title="Dodaj 10 000 u štek">
                            Opljačkaj prodavnicu
                    </button>
                    <button name='btnSverc' 
                            value='15000' 
                            class="btn btn-success" 
                            title="dodaj 15 000 u štek">
                            Obavi šverc
                    </button>
                    <button name='btnOpljackajBanku' 
                            value='30000' 
                            class="btn btn-success" 
                            title="Dodaj 30 000 u štek">
                            Opljačkaj banku
                    </button>
                </div>
            </div>
        `;
        this.hendlujKlikove();

        return this.kontejner;
    }

    hendlujKlikove(): void
    {
        const nizCaletovihOpcija = this.kontejner.querySelectorAll('button[class="btn btn-success"]');
        nizCaletovihOpcija.forEach((dugme) => {
            (<HTMLButtonElement>dugme).addEventListener("click", (event) => this.zaradiPareVanPlate(parseInt((<HTMLButtonElement>event.target)!.value)));
        });
    }

    // nacrtajCaleta()
    // {
    //     const formaZaCaleta = `
    //         Ime: <input type='text' name='inpCaletovoIme' readonly value='${this.ime}'> 
    //         Prezime: <input type='text' name='inpCaletovoPrezime' readonly value='${this.prezime}'>
    //         Godine: <input type='number' name='inpCaletoveGodine' readonly value='${this.godine}'>
    //         Nivo zadovoljstva: <input type='number' name='inpCaletovNivoZadovoljstva' readonly value='${this.nivoZadovoljstva}'>
    //         Plata: <input type='number' name='inpCaletovaPlata' readonly value=${this.plata}>
    //         Ukupan novac od plate: <input type='number' name='inpCaletovNovacOdPlate' readonly value='${this.novacOdPlate}'>
    //         Tajni štek: <input type='number' name='inpCaletovTajniStek' readonly value='${this.tajniStek}'>
    //         <div class="btn-group-vertical">
    //             <button name='btnOpljackajKomsiju' value='5000' class="btn btn-success" title="Dodaj 5000 u štek">Opljačkaj komšiju</button>
    //             <button name='btnOpljackajProdavnicu' value='10000' class="btn btn-success" title="Dodaj 10 000 u štek">Opljačkaj prodavnicu</button>
    //             <button name='btnSverc' value='15000' class="btn btn-success" title="dodaj 15 000 u štek">Obavi šverc</button>
    //             <button name='btnOpljackajBanku' value='30000' class="btn btn-success" title="Dodaj 30 000 u štek">Opljačkaj banku</button>
    //         </div>`;
    //     this.kontejner.innerHTML += formaZaCaleta;
    //     this.kontejner.querySelector("h3").innerHTML = "Otac:";
    //     let nizCaletovihOpcija = document.querySelectorAll('button[class="btn btn-success"]');
    //     for(let i=0; i < nizCaletovihOpcija.length; i++)
    //         nizCaletovihOpcija[i].onclick = (event) => {
    //             this.zaradiPareVanPlate(event.target.value);
    //             bajaFunkcije.hendlerKlikaSaTajmerom(event);   
    //         } 
    

    // postaviZenu(zena)
    // {
    //     this.zena = zena; //ovde bi trebao da posaljem emitovanje zeninog zadovoljstva kao argument...
    //     this.glavniSubscription.add(zip(this.primanjePlate$, zena.promenaRaspolozenja$).subscribe( ([plata, zeninoZadovoljstvo]) =>{
    //         if(zeninoZadovoljstvo < 5)
    //         {
    //             this.azurirajNovacOdPlate(plata - (1 * (10 - this.zena.nivoZadovoljstva) * 50 * this.zena.prohtevZaParama));
    //             this.zena.azurirajZadovoljstvo(2);//postaje srecnija kad mu uzme pare
    //         }
    //         else
    //             this.azurirajNovacOdPlate(plata);
    //         console.log(`Plata: ${plata}, zena zadodovoljna: ${zeninoZadovoljstvo}`);
    //     }));
    // }
    
    //moram da vidim kako deca i zena ovo koriste, mogu da ispravim i da ovo izbacim
    zaradiPareVanPlate(vrednostPlena: number): void 
    {
        this.azurirajStek(vrednostPlena);
    }

    // primiPlatu(iznosPlate)
    // {
    //     this.azurirajNovacOdPlate(0.7 * iznosPlate);
    //     this.azurirajStek(0.3 * iznosPlate);
    // }

    azurirajZadovoljstvo(vrednost: number): void
    {
        this.nivoZadovoljstva += vrednost;
        (<HTMLInputElement>document.querySelector('input[name="inpCaletovNivoZadovoljstva"]'))!.value = this.nivoZadovoljstva.toString();
    }

    azurirajNovacOdPlate(iznos: number): void
    {
        this.caleModel.novacOdPlate += iznos;
        (<HTMLInputElement>this.kontejner.querySelector('input[name="inpCaletovNovacOdPlate"]'))!.value = this.caleModel.novacOdPlate.toString();
    }
    
    azurirajStek(vrednost: number): void
    {
        this.caleModel.tajniStek += vrednost;
        (<HTMLInputElement>document.querySelector('input[name="inpCaletovTajniStek"]'))!.value = this.caleModel.tajniStek.toString();
    }

    // dodajDete(dete)
    // {
    //     this.deca.push(dete);
    //     this.azurirajZadovoljstvo(1);
    //     this.glavniSubscription.add(dete.glavniSubscription);
    // }

    // krajnjiCiljUZivotu()
    // {
    //     return (this.tajniStek >= 200000 && this.nivoZadovoljstva >= 10)
    // }

    // zavrsiIgru()
    // {
    //     alert(`Pobedio sam, imam ${this.tajniStek} i srecan sam u iznosu od ${this.nivoZadovoljstva}`);
    //     document.querySelectorAll(`button`).forEach(dugme => {
    //         dugme.disabled = true
    //     });
    //     this.glavniSubscription.unsubscribe();
    // }
}