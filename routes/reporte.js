'use strict'

//Permite trabajar con archivos de la compu
const fs = require('fs');
//Modulo para crear pdfs
const PDF = require('pdfkit');

const PdfPrinter = require('../node_modules/pdfmake/src/printer');

const path = require('path');

const AsistenciaDB = require('../routes/asistencia/presentismo-db');

const HANDLERS = {};

HANDLERS.generarPDF = async (request, h) => {
    /*  let doc = new PDF;*/

    // doc.pipe(fs.createWriteStream('output.pdf'));

    // Set a title and pass the X and Y coordinates
    //doc.fontSize(15).text('TITULO !', 50, 50);
    // Set the paragraph width and align direction
    // doc.text('DETALEEEEEEeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', {
    //    width: 410,
    //     align: 'left'
    // });
    // doc.end();
    //writeStream.end();

    //const response = reply.response('success');
    //response.type('Content-type');
    //response.header('Content-type', 'application/pdf');

    //request.response.header('Content-type', 'application/pdf');

    /*var stat = fs.statSync('output.pdf');

    return h.file('output.pdf')
        .header('Content-Length', stat.size)
        .header('Content-type', 'text/pdf')
        .header('Content-Disposition', 'attachment; filename=output.pdf');*/

    /*return h.file(doc, { mode:'attachment' })
    .header('Content-type', 'application/pdf')
    .header('Content-Disposition', 'attachment; filename=output.pdf');*/
    //return fs.readFile();

    //const writer = 

    //console.log(printer);


    const asistencias = AsistenciaDB.getAsistenciafromDBById(request, h);

    console.log('Paso1' + asistencias);



    return asistencias.then(function (result) {

        return createPDF('foo.pdf', result).then(function (pdf, response) {




            console.log('Paso3' + response);

            console.log('------------------------------------');

            console.log('pdf ' + pdf);

            return h.file('foo.pdf')
                .header('Content-type', 'text/pdf')
                .header('Content-Disposition', 'attachment; filename=foo.pdf');
        });
    })




    /*var dd = {
    content: [
        'First paragraph',
        'Another paragraph'
    ]
    };
    var pdfDoc = printer.createPdfKitDocument(dd);

    pdfDoc.pipe(fs.createWriteStream('basics.pdf')).on('finish', function(){
        console.log("paso pipe");
    });
    pdfDoc.end();

    console.log('pdfDoc');*/


    // return pdfDoc;




    //console.log("dssd");
    //Muestra el pdf en la web 


    //JSON que dice si se creo o no el pdf
    //return validateCreation();
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

            if(alumnosPresentes[index].asistencia == true) {
                presente = 'Presente';
            } else {
                presente = 'Ausente';
            }

            alumnosList.push(alumnosPresentes[index].name + ' ' + alumnosPresentes[index].surname + ' ' + presente + '\n');
        }

        console.log(alumnosList);

        

        var docDefinition = {
            content: [
                {
                    text: TITULO,
                    fontSize: 25
                },
                {
                   text: alumnosList
                
                }
                   
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                },
                anotherStyle: {
                    fontSize: 54
                }
            }
        };
        var pdfDoc = printer.createPdfKitDocument(docDefinition);

        pdfDoc.pipe(file);
        pdfDoc.end();


        file.on("finish", () => { resolve(pdfDoc, file); }); // not sure why you want to pass a boolean
        file.on("error", reject); // don't forget this!
    });
}

function generatePdf(docDefinition, callback) {


    let chunks = [];

    doc.on('data', (chunk) => {
        chunks.push(chunk);
    });

    doc.on('end', () => {
        callback(Buffer.concat(chunks));
    });


};

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