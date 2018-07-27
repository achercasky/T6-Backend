'use strict'

//Permite trabajar con archivos de la compu
const fs = require('fs');

const PdfPrinter = require('../../node_modules/pdfmake/src/printer');

const path = require('path');

const AsistenciaDB = require('../asistencia/presentismo-db');

const HANDLERS = {};

let FILE_NAME = 'reporte.pdf';

HANDLERS.generarPDF = async (request, h) => {
    const asistencias = AsistenciaDB.getAsistenciafromDBById(request, h);

    return asistencias.then(function (result) {

        return createPDF(FILE_NAME, result).then(function (pdf, response) {

            return h.file(FILE_NAME)
                .header('Content-type', 'text/pdf')
                .header('Content-Disposition', 'attachment; filename=reporte.pdf');
        });
    });
}

function createPDF(filePath, text) {
    return new Promise((resolve, reject) => {

        const fontDescriptors = {
            Roboto: {
                normal: path.join(__dirname, '..', '', '/fonts/Roboto-Regular.ttf')
            }
        };

        let printer = new PdfPrinter(fontDescriptors);

        const file = fs.createWriteStream(filePath);

        const TITULO = text.materia;

        const alumnosPresentes = text.alumnos;

        const alumnosList = [];

        for (const index in alumnosPresentes) {

            var presente;

            if (alumnosPresentes[index].asistencia == true) {
                presente = 'Presente';
            } else {
                presente = 'Ausente';
            }

            alumnosList.push(alumnosPresentes[index].name + ' ' + alumnosPresentes[index].surname + ' ' + presente + '\n');
        }

        var docDefinition = {
            content: [
                {
                    text: TITULO,
                    fontSize: 25
                },
                {
                    text: alumnosList

                }
            ]
        };
        var pdfDoc = printer.createPdfKitDocument(docDefinition);

        pdfDoc.pipe(file);
        pdfDoc.end();

        file.on("finish", () => { resolve(pdfDoc, file); });
        file.on("error", reject);
    });
}

module.exports = HANDLERS;