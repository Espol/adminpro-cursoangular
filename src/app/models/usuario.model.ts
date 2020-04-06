export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string, // ? indica que el parametro en opcional y siguientes
        public role?: string, // parametros obligatoriamente deben ser opcinal
        public google?: boolean,
        public _id?: string,
    ) {}

}