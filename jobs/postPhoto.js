const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.diskStorage({
    destination: (req,file,cb) => {
       cb(null,'public/img/posts');
    },
    filename: (req,file,cb) => {
       const ext = file.mimetype.split('/')[1]; 
       cb(null,`post-${Date.now()}.${ext}`);
      }
   });

   //  const multerStorage = multer.memoryStorage();
   
   const multerFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image')){
       cb(null,true);
    }else{
       cb(new AppError('not Imaga, must be image type!',400));
    }
 }
 
 const upload = multer({ 
    storage: multerStorage,
    fileFilter: multerFilter
   });
   
exports.postPhoto = upload.single('photo');
 exports.resizePostPhoto = async (req,res,next) => {
 
 if(!req.file){ next() }
    const ext = req.file.mimetype.split('/')[1]; 
    req.file.filename = `post-${Date.now()}.jpeg`;
    
    await sharp(req.file.buffer)
                     .resize(500,500)
                     .toFormat('jpeg')
                     .toFile(`public/img/posts`);
               }
 
//  module.exports = postPhoto;