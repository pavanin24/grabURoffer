/* 
 * Student Info: Name=Pavanitha Kalyanam, ID=19361 
 * Subject: CS595(G)_GrabUrOffer_Spring_2017 
 * Author: KrishnaReddy 
 * Filename: model.js.js 
 * Date and Time: Mar 26, 2017 3:42:57 PM  
 * Project Name: GrabUrOfferProject 
 */

'use strict';
var config = require('./config');
var nodemailer = require('nodemailer');

var path = require('path');
var templatesDir = path.resolve(__dirname, '..', 'templates');
var emailTemplates = require('email-templates');

var transport = nodemailer.createTransport({
  service: config.mailer.service,
  auth: {
    user: config.mailer.auth.user,
    pass: config.mailer.auth.pass
  }
});


exports.sendOne = function (templateName, locals) {
//    console.log('templatesDir : '+templatesDir);
  emailTemplates(templatesDir, function (err, template) {
//    console.log('template : '+template+', name : '+templateName);
    template(templateName, locals, function(err, html, text) {
      if (err) {
        console.log(err);
      }else {
        transport.sendMail({
          from: config.mailer.defaultFromAddress,
          to: locals.email,
          subject: locals.subject,
          html: html,
          text: text
        },function(err, responseStatus) {
          if (err) {
            console.log(err);
          } else {
            console.log('message successfully sent...');
          }
        });
      }
    });
})};
