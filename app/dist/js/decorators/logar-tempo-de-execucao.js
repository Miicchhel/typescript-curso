export function logarTempoDeExecucao() {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args) {
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`o metodo ${propertyKey} levou ${(t2 - t1) / 1000} segundo para ser executado.`);
            retorno;
        };
        return descriptor;
    };
}
