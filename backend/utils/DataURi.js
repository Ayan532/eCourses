const DataURIParser = require('datauri/parser')
const path=require('path')

exports.getUriData=(file)=>{

    const parser=new DataURIParser()
    const extname=path.extname(file.originalname).toString()

    return parser.format(extname, file.buffer)




}


/* FILE-> 
   {
        fieldname: 'file',
        originalname: 'ENTREPRENEURSHIP.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 01 7d 01 7d 00 00 ff ed 00 38 50 68 6f 74 6f 73 68 6f 70 20 33 2e 30 00 38 42 49 4d 04 04 00 00 00 00 00 00 ... 1086322 more bytes>,
        size: 1086372
   } 
*/ 