const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req,file,cb) => {
       cb(null,'public/img/posts');
    },
    filename: (req,file,cb) => {
       const ext = file.mimetype.split('/')[1]; 
       cb(null,`post-${Date.now()}.${ext}`);
      }
   });
   
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
 
 const postPhoto = upload.single('photo');
 module.exports = postPhoto;