'use strict'

//Permite trabajar con archivos de la compu
const fs = require('fs');

const PdfPrinter = require('../../node_modules/pdfmake/src/printer');

const path = require('path');

const AsistenciaDB = require('../asistencia/presentismo-db');

const HANDLERS = {};

let FILE_NAME = 'reporte.pdf';

HANDLERS.generarPDF = async (request, h) => {

    var asistencias;

    if (params.filter = 'dia') {
        asistencias = AsistenciaDB.getAsistenciaByQueryfromDB(request.query.id);
    } else {
        id = params.id;
    }


    const asistencias = AsistenciaDB.getAsistenciaByQueryfromDB(request.query.id);

    return asistencias.then(function (result) {

        console.log(result);

        return createPDF(FILE_NAME, result).then(function (pdf, response) {

            return h.file(FILE_NAME)
                .header('Content-type', 'text/pdf')
                .header('Content-Disposition', 'attachment; filename=reporte.pdf');
        }).catch(function(error) {
            console.log(error);
            return error;
        });
    });
}

function createPDF(filePath, text) {
    return new Promise((resolve, reject) => {

        const fontDescriptors = {
            Roboto: {
                normal: path.join(__dirname, '..', '', '../fonts/Roboto-Regular.ttf')
            }
        };

        let printer = new PdfPrinter(fontDescriptors);

        const file = fs.createWriteStream(filePath);

        const FECHA = text.date;

        const materias = text.materias;

        const alumnosList = [];

        for (const index in materias) {

            var presente;

            var nombreMateria = materias[index].name; 

            alumnosList.push(nombreMateria + '\n');

            const alumnos = materias[index].alumnos

            for (var i in alumnos) {

                if (alumnos[i].presente == true) {
                    presente = 'Presente';
                } else {
                    presente = 'Ausente';
                }

                alumnosList.push(alumnos[i].name + ' ' + alumnos[i].surname + ' ' + presente + '\n');
            }
        }

        console.log(FECHA);
        console.log(alumnosList);

        var docDefinition = {
            content: [
                {
                    text: FECHA,
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