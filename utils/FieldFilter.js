
const FieldFilter = (obj,...allowedFields) => {

console.log("filtering")
    const newObj = {};
    Object.keys(obj).forEach(el => {
       if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    
    return newObj;
    
}

module.exports = FieldFilter;
