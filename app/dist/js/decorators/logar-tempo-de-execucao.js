export function logarTempoDeExecucao(emSegundos = false) {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args) {
            let [divisor, unidade] = [1, 'milisegundos'];
            if (emSegundos)
                [divisor, unidade] = [1000, 'segundos'];
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`o metodo ${propertyKey} levou ${(t2 - t1) / divisor} ${unidade} para ser executado.`);
            return retorno;
        };
        return descriptor;
    };
}
