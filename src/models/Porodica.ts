import { Cale } from "./Cale";
import { Zena } from "./Zena";
import { Dete } from "./Dete";

export interface Porodica
{
    id: number,
    otac: Cale,
    zena: Zena,
    deca: Dete[]
};