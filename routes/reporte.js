'use strict'

//Permite trabajar con archivos de la compu
const fs = require('fs');
//Modulo para crear pdfs
const PDF = require('pdfkit');

const PdfPrinter = require('../node_modules/pdfmake/src/printer');

const pdfMake = require('pdfmake');

const path = require('path');

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

    var fontDescriptors = {
        Roboto: {
          normal: path.join(__dirname, '..', '', '/fonts/Roboto-Regular.ttf')
        }
      };

     // return pdfMakePrinter.createPdf(docDefinition).download();

     var printer = new PdfPrinter(fontDescriptors);

     //const writer = 

     //console.log(printer);


     return writeToFile('foo.pdf').then(function(pdf, response) { 
         console.log(response); 

         console.log('------------------------------------');

         console.log('pdf '+ pdf);

         return h.file('foo.pdf')
         .header('Content-type', 'text/pdf')
         .header('Content-Disposition', 'attachment; filename=foo.pdf');
    });
     
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

function writeToFile(filePath) {
    return new Promise((resolve, reject) => {

        var fontDescriptors = {
            Roboto: {
              normal: path.join(__dirname, '..', '', '/fonts/Roboto-Regular.ttf')
            }
          };
    
         // return pdfMakePrinter.createPdf(docDefinition).download();
    
        var printer = new PdfPrinter(fontDescriptors);

      const file = fs.createWriteStream(filePath);
      
       // file.write(arr + "\n");
      
      //file.end();

      var dd = {
        content: [
            'First paragraph',
            'Another paragraph'
        ]
        };
        var pdfDoc = printer.createPdfKitDocument(dd);
   
        pdfDoc.pipe(file);
        pdfDoc.end();
        //file.end();


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