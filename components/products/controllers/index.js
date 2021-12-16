const fs = require("fs");

class Contenedor {
    constructor() {
        this.contador = 1;
        this.archivos = [];
    }

    async save(archivo) {
        try {
            archivo.id = this.contador;
            this.archivos.push(archivo);
            await fs.promises.writeFile(
                "./productos.txt",
                JSON.stringify(this.archivos)
            );
            this.contador += 1;
        } catch (e) {
            console.error(e.message);
        }
    }

    async getById(id) {
        try {
            const contenido = await fs.promises.readFile(
                "./productos.txt",
                "utf-8"
            );
            return JSON.parse(contenido).filter((archivo) => archivo.id === id);
        } catch (e) {
            console.error(e.message);
        }
    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile(
                "./productos.txt",
                "utf-8"
            );
            return JSON.parse(contenido);
        } catch (e) {
            console.error(e.message);
        }
    }

    async deleteById(id) {
        try {
            const contenido = await fs.promises.readFile(
                "./productos.txt",
                "utf-8"
            );
            const archivos = JSON.parse(contenido).filter(
                (archivo) => archivo.id !== id
            );
            await fs.promises.writeFile(
                "./productos.txt",
                JSON.stringify(archivos)
            );
        } catch (e) {
            console.error(e.message);
        }
    }

    async deleteAll() {
        try {
            this.archivos = [];
            await fs.promises.writeFile("./productos.txt", "");
        } catch (e) {
            console.error(e.message);
        }
    }

    async updateById(id, archivo) {
        const contenido = JSON.parse(
            await fs.promises.readFile("./productos.txt", "utf-8")
        );
        const index = contenido.findIndex((archivo) => archivo.id === id);
        const nuevoArchivo = { ...archivo, id };
        contenido[index] = nuevoArchivo;
        await fs.promises.writeFile(
            "./productos.txt",
            JSON.stringify(contenido)
        );
    }
}

module.exports = Contenedor;