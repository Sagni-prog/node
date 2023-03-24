
exports.postFilter = (obj,...allowedFields) => {

console.log("filtering")
    const newObj = {};
    Object.keys(obj).forEach(el => {
       if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    
    return newObj;
    
}

exports.commentFilter = (comment,...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
       if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    
    return newObj;
    
}