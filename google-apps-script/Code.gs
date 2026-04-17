/**
 * Paralox Media — Careers Application Handler
 * Google Apps Script Web App
 *
 * SETUP:
 *  1. script.google.com → New project → paste this file
 *  2. Deploy → New deployment → Web app
 *     Execute as: Me  |  Who has access: Anyone
 *  3. On first deploy Google will ask you to authorise Drive + Gmail — accept all.
 *  4. Copy the /exec URL → React .env → REACT_APP_SCRIPT_URL=...
 *
 * TESTING WITHOUT THE FRONTEND:
 *  Run testPost() from the editor to verify Drive + email work before going live.
 */

// ─── CONFIG ──────────────────────────────────────────────────────────────────
var DRIVE_FOLDER_ID = '116K_37TrHv9ZRBdj6OHS5ELRDljw1kkE';
var ADMIN_EMAIL     = 'info@paraloxmedia.com';
var BRAND_NAME      = 'Paralox Media';

// ─── ENTRY POINTS ────────────────────────────────────────────────────────────

// Required: Apps Script calls doGet for any GET request (including redirect follow-through)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Paralox Careers API is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    // Parse body
    var raw  = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var data = JSON.parse(raw);

    Logger.log('Application received for: ' + data.fullName + ' — ' + data.position);

    // Validate required fields
    var required = ['fullName', 'email', 'phone', 'position', 'cv'];
    for (var i = 0; i < required.length; i++) {
      if (!data[required[i]]) {
        Logger.log('Validation failed — missing: ' + required[i]);
        return ok('Validation error: missing ' + required[i]);
      }
    }

    // Create candidate subfolder
    var today      = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    var folderName = sanitise(data.fullName) + ' - ' + sanitise(data.position) + ' [' + today + ']';
    var parent     = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    folderName     = uniqueName(parent, folderName);
    var folder     = parent.createFolder(folderName);
    Logger.log('Created folder: ' + folderName);

    // Build and save application summary as a plain text file
    var summary = buildSummaryText(data);
    var txtBlob = Utilities.newBlob(summary, 'text/plain', 'Application Summary — ' + sanitise(data.fullName) + '.txt');
    folder.createFile(txtBlob);
    Logger.log('Summary file saved.');

    // Upload CV
    uploadBase64(folder, data.cv, data.cvType || 'application/pdf',
      'CV — ' + sanitise(data.fullName) + ext(data.cvName));
    Logger.log('CV uploaded.');

    // Upload work samples (optional)
    if (data.workSamples) {
      uploadBase64(folder, data.workSamples,
        data.workSamplesType || 'application/octet-stream',
        'Work Sample — ' + sanitise(data.fullName) + ext(data.workSamplesName));
      Logger.log('Work samples uploaded.');
    }

    // Emails (non-fatal — Drive upload is the critical part)
    try {
      emailApplicant(data);
      emailAdmin(data, folder.getUrl());
      Logger.log('Emails sent.');
    } catch (mailErr) {
      Logger.log('Email failed (non-fatal): ' + mailErr.message);
    }

    Logger.log('Application complete: ' + folderName);
    return ok('Application received.');

  } catch (err) {
    Logger.log('ERROR in doPost: ' + err.message + '\n' + err.stack);
    return ok('Server error: ' + err.message); // always return 200 so no-cors fetch doesn't throw
  }
}

// Always returns HTTP 200 with JSON — required because no-cors fetch can't read the body anyway
function ok(message) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── APPLICATION SUMMARY TEXT ─────────────────────────────────────────────────

function buildSummaryText(d) {
  var lines = [];
  var line  = function(l, v) { lines.push((l + ':').padEnd(26) + (v || '—')); };
  var sep   = function(t)    { lines.push('\n' + t.toUpperCase() + '\n' + '─'.repeat(50)); };

  lines.push(BRAND_NAME + ' — Application Summary');
  lines.push('Submitted: ' + (d.submittedAt || new Date().toISOString()));
  lines.push('');

  sep('Candidate Information');
  line('Full Name',           d.fullName);
  line('Email',               d.email);
  line('Phone / WhatsApp',    d.phone);
  line('Current Location',    d.location);
  line('Preferred Work Setup',d.workSetup);

  sep('Position & Availability');
  line('Position Applied For', d.position);
  line('Years of Experience',  d.experience);
  line('Current Job Title',    d.currentTitle);
  line('Start Date',           d.startDate);
  line('Expected Salary',      d.expectedSalary);
  line('Employment Type',      d.employmentType);

  sep('Portfolio & Links');
  line('Portfolio URL', d.portfolioLink || 'Not provided');
  line('LinkedIn URL',  d.linkedinUrl   || 'Not provided');

  sep('Vacancy Source');
  line('Found Via',   d.source);
  line('Referred By', d.referral || 'N/A');

  sep('Screening Questions');

  var qa = [
    ['Why join Paralox Media?',              d.whyJoin],
    ['Why are you a good fit?',              d.whyFit],
    ['Project most proud of',               d.proudProject],
    ['AI tools in workflow',                d.aiTools],
    ['Comfortable with feedback/deadlines?',
      (d.comfortableFeedback === 'yes' ? 'Yes' : 'No') +
      (d.feedbackNote ? ' — ' + d.feedbackNote : '')],
    ['Own equipment & software?',           d.ownEquipment === 'yes' ? 'Yes' : 'No'],
    ['Additional information',              d.additionalInfo || '—'],
  ];

  qa.forEach(function(pair) {
    lines.push('\n' + pair[0]);
    lines.push(pair[1] || '—');
  });

  lines.push('\n' + '─'.repeat(50));
  lines.push(BRAND_NAME + ' Private Limited  ·  Confidential');
  lines.push(new Date().toUTCString());

  return lines.join('\n');
}

// ─── FILE UPLOAD ─────────────────────────────────────────────────────────────

function uploadBase64(folder, base64, mimeType, fileName) {
  var decoded = Utilities.base64Decode(base64);
  var blob    = Utilities.newBlob(decoded, mimeType, fileName);
  folder.createFile(blob);
}

// ─── EMAIL ───────────────────────────────────────────────────────────────────

function emailApplicant(d) {
  var subject = 'Application Received — ' + d.position + ' at ' + BRAND_NAME;
  var body =
    'Hi ' + d.fullName + ',\n\n' +
    'Thank you for applying for the ' + d.position + ' role at ' + BRAND_NAME + '.\n\n' +
    'We have received your application and our team will review it within 3–5 business days.\n' +
    'We will be in touch at ' + d.email + ' if you are shortlisted.\n\n' +
    'Best regards,\n' + BRAND_NAME + ' Careers Team\n' +
    'info@paraloxmedia.com';
  GmailApp.sendEmail(d.email, subject, body, { name: BRAND_NAME + ' Careers', replyTo: ADMIN_EMAIL });
}

function emailAdmin(d, folderUrl) {
  var subject = '🆕 New Application: ' + d.fullName + ' — ' + d.position;
  var body =
    'A new application was submitted.\n\n' +
    'Name     : ' + d.fullName  + '\n' +
    'Email    : ' + d.email     + '\n' +
    'Phone    : ' + d.phone     + '\n' +
    'Position : ' + d.position  + '\n' +
    'Location : ' + d.location  + '\n' +
    'Source   : ' + d.source    + '\n' +
    'Submitted: ' + (d.submittedAt || new Date().toISOString()) + '\n\n' +
    'Drive folder:\n' + folderUrl;
  GmailApp.sendEmail(ADMIN_EMAIL, subject, body, { name: BRAND_NAME + ' Careers Bot' });
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function sanitise(str) {
  return (str || 'Unknown').replace(/[<>:"/\\|?*\x00-\x1f]/g, '').trim().slice(0, 80);
}

function ext(filename) {
  if (!filename) return '';
  var i = filename.lastIndexOf('.');
  return i !== -1 ? filename.slice(i) : '';
}

function uniqueName(parent, name) {
  var folders = parent.getFoldersByName(name);
  if (!folders.hasNext()) return name;
  var n = 2;
  while (true) {
    var candidate = name + ' (' + n + ')';
    if (!parent.getFoldersByName(candidate).hasNext()) return candidate;
    n++;
  }
}

// ─── TEST FUNCTION (run from editor to verify setup) ─────────────────────────

function testPost() {
  var fakeData = {
    fullName:        'Test Applicant',
    email:           ADMIN_EMAIL,
    phone:           '+94 75 000 0000',
    location:        'Colombo',
    workSetup:       'Remote',
    position:        'Video Editor',
    experience:      '2–3 years',
    currentTitle:    'Junior Editor',
    startDate:       '2025-01-01',
    expectedSalary:  'LKR 80,000',
    employmentType:  'Full-Time',
    portfolioLink:   'https://example.com',
    linkedinUrl:     '',
    source:          'LinkedIn',
    referral:        '',
    whyJoin:         'Test answer',
    whyFit:          'Test answer',
    proudProject:    'Test answer',
    aiTools:         'Test answer',
    comfortableFeedback: 'yes',
    feedbackNote:    '',
    ownEquipment:    'yes',
    additionalInfo:  '',
    // 1x1 white pixel PNG as base64 (minimal valid file for testing)
    cv:     'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    cvName: 'test-cv.png',
    cvType: 'image/png',
    submittedAt: new Date().toISOString(),
  };

  var result = doPost({ postData: { contents: JSON.stringify(fakeData) } });
  Logger.log('testPost result: ' + result.getContent());
}
