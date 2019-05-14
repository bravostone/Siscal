export interface Login {
    usuario    ?: string,
    contrasena ?: string,
}

export interface Session {
    alias              ?: string,
    nombreCompleto     ?: string,
    fechaInicioSession ?: Date,
}
