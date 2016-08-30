import express from 'express';
import { ParseServer } from 'parse-server';
import settings from './settings';
import { resolve } from 'path';

process.env.VERBOSE=true;

// The other settings are defined in settings.json which is .gitignored
settings.emailAdapter.options.templates = {
  passwordResetEmail: {
    subject: 'Reset your password',
    pathPlainText: resolve(__dirname, 'templates/password_reset_email.txt'),
    pathHtml: resolve(__dirname, 'templates/password_reset_email.html'),
    callback: (user) => { return { username: user.get('username') }},
    // Now you can use {{username}} in your templates
  },
  verificationEmail: {
    subject: 'Confirm your account',
    pathPlainText: resolve(__dirname, 'templates/verification_email.txt'),
    pathHtml: resolve(__dirname, 'templates/verification_email.html'),
    callback: (user) => { return { username: user.get('username') }},
    // Now you can use {{username}} in your templates
  },
  testEmail: {
    subject: 'Test email',
    pathPlainText: resolve(__dirname, 'templates/test_email.txt'),
    pathHtml: resolve(__dirname, 'templates/test_email.html'),
  },
};

const app = express();
const api = new ParseServer(settings);

// Serve the Parse API at /parse URL prefix
app.use('/parse', api);

const port = 1337;
app.listen(port, function() {
  console.log(`parse-server-example running on port: ${port}`);
});
