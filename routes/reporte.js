'use strict'

//Permite trabajar con archivos de la compu
const fs = require('fs');
//Modulo para crear pdfs
const PDF = require('pdfkit');

const HANDLERS = {};

HANDLERS.generarPDF = (request, reply) => {
    const doc = new PDF;
    doc.pipe(fs.createWriteStream('output.pdf'));

    // Set a title and pass the X and Y coordinates
    doc.fontSize(15).text('TITULO !', 50, 50);
    // Set the paragraph width and align direction
    doc.text('DETALEEEEEE', {
        width: 410,
        align: 'left'
    });
    doc.end();

    return validateCreation();
}

let validateCreation = async function () {
    console.log('Se creo');
    try {
        var responseOK = {
            status: 'ok',
            statusCode: 200
        };
        return responseOK;
    } catch (err) {
        console.log(err);
        return err;
    }

};

module.exports = HANDLERS;