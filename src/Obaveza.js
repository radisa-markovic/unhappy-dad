export class Obaveza
{
    constructor(ime, prezime, godine, nivoZadovoljstva, prohtevZaParama)
    {
        this.ime = ime;
        this.prezime = prezime;
        this.godine = godine;
        this.nivoZadovoljstva = nivoZadovoljstva;
        this.prohtevZaParama = prohtevZaParama;
        this.vremePoslednjePosete = 0;//bem ga, mozda bolje 0 da stavim, ili da stavim "sad"
    }

    vratiSadrzajObaveze()
    {
        return `Ime: <input type='text' name='inpImeObaveze' readonly value='${this.ime}'>
        Prezime: <input type='text' name='inpPrezimeObaveze' readonly value='${this.prezime}'>
        Godine: <input type='number' name='inpBrojGodina' readonly value='${this.godine}'>
        Nivo zadovoljstva: <input type='number' name='inpZadovoljstvoObaveze' readonly value='${this.nivoZadovoljstva}'>
        Prohtev za parama: <input type='number' name='inpProhtevZaParama' readonly value='${this.prohtevZaParama}'>`;    
    }
}