import { Imprimivel } from "./imprimivel.js";

export function imprimir(...params: Imprimivel[]) {
  params.forEach((item) => {
    console.log(item.paraTexto());
  });
}