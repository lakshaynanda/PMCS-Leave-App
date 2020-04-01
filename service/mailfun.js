const fs = require("fs");
const path = require("path");

module.exports.getMail = (option, place, to, from, bill, cdetails, desc, approve, reject, lmail) => {
    // console.log("CC")
    let mailTemplate = fs
        .readFileSync(path.join(__dirname, "leave-mail.html"))
        .toString();
    // console.log("DD")
    // console.log(lmail)
    if (lmail) {
        mailTemplate = mailTemplate.replace(/{{lmail}}/g, lmail);
    }
    if (place) {
        mailTemplate = mailTemplate.replace(/{{place}}/g, place);
    }
    if (to) {
        mailTemplate = mailTemplate.replace(/{{to}}/g, to);
    }
    if (from) {
        mailTemplate = mailTemplate.replace(/{{from}}/g, from);
    }
    if (option) {
        mailTemplate = mailTemplate.replace(/{{option}}/g, option);
    }
    if (bill) {
        mailTemplate = mailTemplate.replace(/{{bill}}/g, bill);
    }
    if (cdetails) {
        mailTemplate = mailTemplate.replace(/{{cdetails}}/g, cdetails);
    }
    if (desc) {
        mailTemplate = mailTemplate.replace(/{{desc}}/g, desc);
    }
    if (approve) {
        mailTemplate = mailTemplate.replace(/{{approve}}/g, approve);
    }
    if (reject) {
        mailTemplate = mailTemplate.replace(/{{reject}}/g, reject);
    }
    // console.log(mailTemplate)
    return mailTemplate.toString();


}

module.exports.getMail2 = (option, place, to, from, bill, cdetails, desc, lid, lmail) => {
    // console.log("CC")
    let mailTemplate = fs
        .readFileSync(path.join(__dirname, "leave-mail2.html"))
        .toString();
    // console.log("DD")
    if (lmail) {
        mailTemplate = mailTemplate.replace(/{{lmail}}/g, lmail);
    }
    if (place) {
        mailTemplate = mailTemplate.replace(/{{place}}/g, place);
    }
    if (to) {
        mailTemplate = mailTemplate.replace(/{{to}}/g, to);
    }
    if (from) {
        mailTemplate = mailTemplate.replace(/{{from}}/g, from);
    }
    if (option) {
        mailTemplate = mailTemplate.replace(/{{option}}/g, option);
    }
    if (bill) {
        mailTemplate = mailTemplate.replace(/{{bill}}/g, bill);
    }
    if (cdetails) {
        mailTemplate = mailTemplate.replace(/{{cdetails}}/g, cdetails);
    }
    if (desc) {
        mailTemplate = mailTemplate.replace(/{{desc}}/g, desc);
    }
    if (lid) {
        mailTemplate = mailTemplate.replace(/{{lid}}/g, lid);
    }

    // console.log(mailTemplate)
    return mailTemplate.toString();


}

module.exports.getMail3 = (option, place, to, from, bill, cdetails, desc) => {
    // console.log("CC")
    let mailTemplate = fs
        .readFileSync(path.join(__dirname, "leave-mail3.html"))
        .toString();
    // console.log("DD")
    if (place) {
        mailTemplate = mailTemplate.replace(/{{place}}/g, place);
    }
    if (to) {
        mailTemplate = mailTemplate.replace(/{{to}}/g, to);
    }
    if (from) {
        mailTemplate = mailTemplate.replace(/{{from}}/g, from);
    }
    if (option) {
        mailTemplate = mailTemplate.replace(/{{option}}/g, option);
    }
    if (bill) {
        mailTemplate = mailTemplate.replace(/{{bill}}/g, bill);
    }
    if (cdetails) {
        mailTemplate = mailTemplate.replace(/{{cdetails}}/g, cdetails);
    }
    if (desc) {
        mailTemplate = mailTemplate.replace(/{{desc}}/g, desc);
    }
    // console.log(mailTemplate)
    return mailTemplate.toString();


}