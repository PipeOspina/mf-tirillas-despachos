export interface IStrip<DateType = Date> {
    codigoRecogida: string;
    equipo: number;
    fechaLlamada: string;
    fechaRegistro?: DateType;
    idLlamada: string;
    idToken: string;
    nombreDestinatario: string;
    nombreRemitente: string;
    terminal: number;
    tiquete: string;
}

export interface IStripComponentData {
    loading: boolean,
    strip?: IStrip,
    exists?: boolean,
}
