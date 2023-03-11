module.exports = (template,content) => {

    let HtmlTemplete = template.replace(/{{title}}/g,content.title);
    HtmlTemplete = HtmlTemplete.replace(/{{body}}/g,content.body);
    HtmlTemplete = HtmlTemplete.replace(/{{photo}}/g,content.photo_url);
    
    return HtmlTemplete;
 }