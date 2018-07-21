'use strict'

//Permite trabajar con archivos de la compu
const fs = require('fs');
//Modulo para crear pdfs
const PDF = require('pdfkit');

const HANDLERS = {};

HANDLERS.generarPDF = async (request, h) => {
    let doc = new PDF;

    doc.pipe(fs.createWriteStream('output.pdf'));

    // Set a title and pass the X and Y coordinates
    doc.fontSize(15).text('TITULO !', 50, 50);
    // Set the paragraph width and align direction
    doc.text('DETALEEEEEE', {
        width: 410,
        align: 'left'
    });
    doc.end();
    //writeStream.end();

    //const response = reply.response('success');
    //response.type('Content-type');
    //response.header('Content-type', 'application/pdf');

    //request.response.header('Content-type', 'application/pdf');

    return h.file('output.pdf')
        .header('Content-type', 'application/pdf')
        .header('Content-Disposition', 'attachment; filename=output.pdf');

        /*return h.file(doc, { mode:'attachment' })
        .header('Content-type', 'application/pdf')
        .header('Content-Disposition', 'attachment; filename=output.pdf');*/
    //return fs.readFile();
   
   

    
    

    //console.log("dssd");
    //Muestra el pdf en la web 
    

    //JSON que dice si se creo o no el pdf
    //return validateCreation();
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