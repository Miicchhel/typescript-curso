export function imprimir(...params) {
    params.forEach((item) => {
        console.log(item.paraTexto());
    });
}
