export class Cale
{
    constructor(ime, prezime, godine, novacOdPlate, tajniStek, zena)
    {
        this.ime = ime;
        this.prezime = prezime;
        this.godine = godine;
        this.nivoZadovoljstva = 0;//ipak ce da se preracunava, koj ce mi inace djavo godine i ostale stvari...
        this.novacOdPlate = novacOdPlate;
        this.tajniStek = tajniStek;
        this.zena = zena;
        this.deca = [];
        this.kontejner = document.getElementsByName("caletovKontejner")[0];
    }

    nacrtajCaleta()
    {
        const formaZaCaleta = `
            Ime: <input type='text' name='inpCaletovoIme' readonly value='${this.ime}'> 
            Prezime: <input type='text' name='inpCaletovoPrezime' readonly value='${this.prezime}'>
            Godine: <input type='number' name='inpCaletoveGodine' readonly value='${this.godine}'>
            Nivo zadovoljstva: <input type='number' name='inpCaletovNivoZadovoljstva' readonly value='${this.nivoZadovoljstva}'>
            Ukupan novac od plate: <input type='number' name='inpCaletovaPlata' readonly value='${this.novacOdPlate}'>
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
            nizCaletovihOpcija[i].onclick = (event) => this.zaradiPareVanPlate(event.target.value); 
    }

    zaradiPareVanPlate(vrednostPlena)
    {
        this.tajniStek += parseInt(vrednostPlena);//value cu da vratim posle...
        this.azurirajStek();
    }

    azurirajZadovoljstvo()
    {
        document.querySelector('input[name="inpCaletovNivoZadovoljstva"]').value = this.nivoZadovoljstva;
    }

    azurirajPlatu()
    {
        this.kontejner.querySelector('input[name="inpCaletovaPlata"]').value = this.novacOdPlate;
    }
    
    azurirajStek()
    {
        document.querySelector('input[name="inpCaletovTajniStek"]').value = this.tajniStek;
        console.log("Caletov stek: " + this.tajniStek);
    }

    dodajDete(dete)
    {//automatski nek se preracunava
        this.deca.push(dete);
        this.nivoZadovoljstva++;
        this.azurirajZadovoljstvo();
    }

    primiPlatu(plata)
    {
        this.novacOdPlate += 0.8 * plata;//ovo zena uzima ako me ne ocinkare deca za stek
        this.tajniStek += 0.2 * plata;//naravno, ide u stek, kako ime kaze
    }

    krajnjiCiljUZivotu()
    {
        if(this.tajniStek > 200000 && this.nivoZadovoljstva === 10)
            print('Uspesan sam mnogo, presao sam igricu'); //ponistiti subscriptions, il sta vec,
            // i okoncati igricu, inace se nista ne dogadja, sad dal javascript ima print, podleze diskusiji
    }
}