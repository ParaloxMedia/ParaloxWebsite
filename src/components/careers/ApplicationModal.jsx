import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronRight, ChevronLeft, Send, CheckCircle2,
  Upload, FileText, User, Briefcase, Link2, MessageSquare,
  AlertCircle, Loader2, Eye,
} from 'lucide-react';
import { T } from '../../data';

// ─── Constants ───────────────────────────────────────────────────────────────

const WORK_SETUPS   = ['On-site', 'Remote', 'Hybrid'];
const EXP_OPTIONS   = ['Less than 1 year', '1–2 years', '2–3 years', '3–5 years', '5–8 years', '8+ years'];
const EMP_TYPES     = ['Full-Time', 'Part-Time', 'Freelance'];
const SOURCE_OPTIONS = ['LinkedIn', 'Instagram', 'Facebook', 'TikTok', 'Company Website', 'Referral', 'Other'];
const MAX_CV_MB     = 5;
const MAX_SAMPLE_MB = 10;
const ALLOWED_CV    = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
// Paste your deployed Google Apps Script web-app URL in .env as REACT_APP_SCRIPT_URL
const SCRIPT_URL    = process.env.REACT_APP_SCRIPT_URL || '';

const STEPS = [
  { label: 'Basic Info',  icon: <User size={14} /> },
  { label: 'Job Details', icon: <Briefcase size={14} /> },
  { label: 'Portfolio',   icon: <Link2 size={14} /> },
  { label: 'Source',      icon: <Eye size={14} /> },
  { label: 'Screening',   icon: <MessageSquare size={14} /> },
  { label: 'Submit',      icon: <Send size={14} /> },
];

const INITIAL_FORM = {
  fullName: '', email: '', phone: '', location: '', workSetup: '',
  position: '', experience: '', currentTitle: '', startDate: '', expectedSalary: '', employmentType: '',
  portfolioLink: '', linkedinUrl: '', cv: null, workSamples: null,
  source: '', referral: '',
  whyJoin: '', whyFit: '', proudProject: '', aiTools: '',
  comfortableFeedback: 'yes', feedbackNote: '',
  ownEquipment: 'yes', additionalInfo: '',
  confirmAccurate: false, agreeContact: false,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function isValidUrl(v)   { try { new URL(v); return true; } catch { return false; } }
function fileSizeMB(f)   { return f ? (f.size / 1024 / 1024).toFixed(1) : 0; }

// Converts a File object to a plain base64 string (strips the data-URL prefix)
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) { resolve(null); return; }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload  = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
  });
}

function validateStep(step, form, isSalesRole) {
  const errs = {};
  if (step === 1) {
    if (!form.fullName.trim())   errs.fullName   = 'Full name is required';
    if (!form.email.trim())      errs.email      = 'Email is required';
    else if (!isValidEmail(form.email)) errs.email = 'Enter a valid email address';
    if (!form.phone.trim())      errs.phone      = 'Phone / WhatsApp is required';
    if (!form.location.trim())   errs.location   = 'Current location is required';
    if (!form.workSetup)         errs.workSetup  = 'Select a preferred work setup';
  }
  if (step === 2) {
    if (!form.experience)        errs.experience     = 'Select years of experience';
    if (!form.currentTitle.trim()) errs.currentTitle = 'Current job title is required';
    if (!form.startDate.trim())  errs.startDate      = 'Availability / start date is required';
    if (!form.expectedSalary.trim()) errs.expectedSalary = 'Expected salary is required';
    if (!form.employmentType)    errs.employmentType = 'Select employment preference';
  }
  if (step === 3) {
    if (!isSalesRole && !form.portfolioLink.trim()) errs.portfolioLink = 'Portfolio link is required for this role';
    if (form.portfolioLink.trim() && !isValidUrl(form.portfolioLink)) errs.portfolioLink = 'Enter a valid URL (include https://)';
    if (form.linkedinUrl.trim() && !isValidUrl(form.linkedinUrl)) errs.linkedinUrl = 'Enter a valid LinkedIn URL';
    if (!form.cv) errs.cv = 'CV / Resume is required';
    if (form.cv && !ALLOWED_CV.includes(form.cv.type)) errs.cv = 'Only PDF, DOC, or DOCX files are allowed';
    if (form.cv && fileSizeMB(form.cv) > MAX_CV_MB)   errs.cv = `CV must be under ${MAX_CV_MB}MB`;
    if (form.workSamples && fileSizeMB(form.workSamples) > MAX_SAMPLE_MB) errs.workSamples = `File must be under ${MAX_SAMPLE_MB}MB`;
  }
  if (step === 4) {
    if (!form.source) errs.source = 'Please tell us how you found this vacancy';
  }
  if (step === 5) {
    if (!form.whyJoin.trim())       errs.whyJoin       = 'Please answer this question';
    if (!form.whyFit.trim())        errs.whyFit        = 'Please answer this question';
    if (!form.proudProject.trim())  errs.proudProject  = 'Please answer this question';
    if (!form.aiTools.trim())       errs.aiTools       = 'Please answer this question';
  }
  if (step === 6) {
    if (!form.confirmAccurate)  errs.confirmAccurate = 'You must confirm the information is accurate';
    if (!form.agreeContact)     errs.agreeContact    = 'You must agree to be contacted';
  }
  return errs;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FieldWrap({ label, error, required, children, dark }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{
        display: 'block', fontSize: '.71rem', fontWeight: 700,
        color: dark ? '#B8A0D8' : '#5B4080',
        marginBottom: 5, fontFamily: "'Plus Jakarta Sans',sans-serif",
        letterSpacing: 0.3,
      }}>
        {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5, color: '#EF4444', fontSize: '.71rem', fontFamily: "'Plus Jakarta Sans',sans-serif" }}
          >
            <AlertCircle size={11} /> {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Input({ name, value, onChange, placeholder, type = 'text', dark, error, ...rest }) {
  return (
    <input
      name={name} value={value} onChange={onChange}
      placeholder={placeholder} type={type}
      style={{
        width: '100%', padding: '11px 13px', borderRadius: 11,
        border: `1.5px solid ${error ? '#EF4444' : dark ? 'rgba(139,82,247,.2)' : 'rgba(91,29,232,.12)'}`,
        background: dark ? 'rgba(12,4,26,.85)' : '#F8F5FF',
        color: dark ? '#F0E8FF' : '#1A0A2E',
        fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '.87rem',
        outline: 'none', boxSizing: 'border-box',
        transition: 'border-color .2s, box-shadow .2s',
      }}
      {...rest}
    />
  );
}

function Select({ name, value, onChange, children, dark, error }) {
  return (
    <select
      name={name} value={value} onChange={onChange}
      style={{
        width: '100%', padding: '11px 13px', borderRadius: 11,
        border: `1.5px solid ${error ? '#EF4444' : dark ? 'rgba(139,82,247,.2)' : 'rgba(91,29,232,.12)'}`,
        background: dark ? 'rgba(12,4,26,.85)' : '#F8F5FF',
        color: dark ? '#F0E8FF' : '#1A0A2E',
        fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '.87rem',
        outline: 'none', cursor: 'pointer', boxSizing: 'border-box',
        transition: 'border-color .2s',
      }}
    >
      {children}
    </select>
  );
}

function Textarea({ name, value, onChange, placeholder, rows = 4, dark, error }) {
  return (
    <textarea
      name={name} value={value} onChange={onChange}
      placeholder={placeholder} rows={rows}
      style={{
        width: '100%', padding: '11px 13px', borderRadius: 11,
        border: `1.5px solid ${error ? '#EF4444' : dark ? 'rgba(139,82,247,.2)' : 'rgba(91,29,232,.12)'}`,
        background: dark ? 'rgba(12,4,26,.85)' : '#F8F5FF',
        color: dark ? '#F0E8FF' : '#1A0A2E',
        fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '.87rem',
        outline: 'none', boxSizing: 'border-box', resize: 'vertical',
        transition: 'border-color .2s',
      }}
    />
  );
}

function FileUpload({ label, name, accept, dark, error, value, onChange, hint }) {
  const ref = useRef(null);
  return (
    <div
      onClick={() => ref.current.click()}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 16px', borderRadius: 12, cursor: 'pointer',
        border: `2px dashed ${error ? '#EF4444' : value ? T.p2 : dark ? 'rgba(139,82,247,.25)' : 'rgba(91,29,232,.18)'}`,
        background: value
          ? (dark ? 'rgba(139,82,247,.08)' : 'rgba(91,29,232,.04)')
          : (dark ? 'rgba(139,82,247,.04)' : 'rgba(91,29,232,.02)'),
        transition: 'border-color .2s, background .2s',
      }}
      onMouseOver={e => { if (!value) e.currentTarget.style.borderColor = T.p2; }}
      onMouseOut={e  => { if (!value) e.currentTarget.style.borderColor = error ? '#EF4444' : dark ? 'rgba(139,82,247,.25)' : 'rgba(91,29,232,.18)'; }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: value ? T.grad : (dark ? 'rgba(139,82,247,.12)' : 'rgba(91,29,232,.08)'),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: value ? '#fff' : T.p2,
      }}>
        {value ? <FileText size={17} /> : <Upload size={17} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: '.84rem', color: dark ? '#E8D8FF' : '#1A0A2E', fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 2 }}>
          {value ? value.name : label}
        </div>
        <div style={{ fontSize: '.7rem', color: dark ? '#8870B8' : '#9B8BC0', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          {value ? `${fileSizeMB(value)} MB` : hint}
        </div>
      </div>
      {value && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={e => { e.stopPropagation(); onChange(null); }}
          style={{ background: 'rgba(239,68,68,.12)', border: '1px solid rgba(239,68,68,.2)', borderRadius: 7, width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444', flexShrink: 0 }}
        >
          <X size={12} />
        </motion.button>
      )}
      <input
        ref={ref} type="file" accept={accept} name={name}
        style={{ display: 'none' }}
        onChange={e => onChange(e.target.files[0] || null)}
      />
    </div>
  );
}

function RadioGroup({ name, value, onChange, options, dark }) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {options.map(opt => (
        <label
          key={opt.value}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
            padding: '10px 16px', borderRadius: 10, flex: 1, justifyContent: 'center',
            border: `1.5px solid ${value === opt.value ? T.p2 : dark ? 'rgba(139,82,247,.2)' : 'rgba(91,29,232,.12)'}`,
            background: value === opt.value ? (dark ? 'rgba(139,82,247,.12)' : 'rgba(91,29,232,.06)') : 'transparent',
            transition: 'all .2s',
          }}
        >
          <input type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={() => onChange(opt.value)} style={{ display: 'none' }} />
          <div style={{
            width: 16, height: 16, borderRadius: '50%', border: `2px solid ${value === opt.value ? T.p1 : dark ? 'rgba(139,82,247,.35)' : 'rgba(91,29,232,.25)'}`,
            background: value === opt.value ? T.p1 : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all .2s', flexShrink: 0,
          }}>
            {value === opt.value && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
          </div>
          <span style={{ fontWeight: 600, fontSize: '.84rem', color: value === opt.value ? (dark ? '#E8D8FF' : T.p1) : (dark ? '#B8A0D8' : '#5B4080'), fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}

// ─── Step Content Components ──────────────────────────────────────────────────

function Step1({ form, setField, errors, dark }) {
  return (
    <div>
      <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.2rem', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 4 }}>Basic Information</h3>
      <p style={{ fontSize: '.82rem', color: dark ? '#9B8BC0' : '#7B6A9A', marginBottom: 22, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Tell us a bit about yourself.</p>

      <FieldWrap label="Full Name" required error={errors.fullName} dark={dark}>
        <Input name="fullName" value={form.fullName} onChange={e => setField('fullName', e.target.value)} placeholder="Your full name" dark={dark} error={errors.fullName} />
      </FieldWrap>
      <FieldWrap label="Email Address" required error={errors.email} dark={dark}>
        <Input name="email" type="email" value={form.email} onChange={e => setField('email', e.target.value)} placeholder="you@example.com" dark={dark} error={errors.email} />
      </FieldWrap>
      <FieldWrap label="Phone Number / WhatsApp" required error={errors.phone} dark={dark}>
        <Input name="phone" type="tel" value={form.phone} onChange={e => setField('phone', e.target.value)} placeholder="+94 75 000 0000" dark={dark} error={errors.phone} />
      </FieldWrap>
      <FieldWrap label="Current Location" required error={errors.location} dark={dark}>
        <Input name="location" value={form.location} onChange={e => setField('location', e.target.value)} placeholder="e.g. Colombo, Sri Lanka" dark={dark} error={errors.location} />
      </FieldWrap>
      <FieldWrap label="Preferred Work Setup" required error={errors.workSetup} dark={dark}>
        <Select name="workSetup" value={form.workSetup} onChange={e => setField('workSetup', e.target.value)} dark={dark} error={errors.workSetup}>
          <option value="">Select preference...</option>
          {WORK_SETUPS.map(o => <option key={o} value={o}>{o}</option>)}
        </Select>
      </FieldWrap>
    </div>
  );
}

function Step2({ form, setField, errors, dark }) {
  return (
    <div>
      <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.2rem', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 4 }}>Job Details</h3>
      <p style={{ fontSize: '.82rem', color: dark ? '#9B8BC0' : '#7B6A9A', marginBottom: 22, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Share your professional background.</p>

      <FieldWrap label="Position Applying For" required dark={dark}>
        <Input name="position" value={form.position} onChange={e => setField('position', e.target.value)} dark={dark} />
      </FieldWrap>
      <FieldWrap label="Years of Experience" required error={errors.experience} dark={dark}>
        <Select name="experience" value={form.experience} onChange={e => setField('experience', e.target.value)} dark={dark} error={errors.experience}>
          <option value="">Select experience level...</option>
          {EXP_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </Select>
      </FieldWrap>
      <FieldWrap label="Current Job Title" required error={errors.currentTitle} dark={dark}>
        <Input name="currentTitle" value={form.currentTitle} onChange={e => setField('currentTitle', e.target.value)} placeholder="e.g. Senior Video Editor" dark={dark} error={errors.currentTitle} />
      </FieldWrap>
      <FieldWrap label="Earliest Start Date / Availability" required error={errors.startDate} dark={dark}>
        <Input name="startDate" type="date" value={form.startDate} onChange={e => setField('startDate', e.target.value)} dark={dark} error={errors.startDate} />
      </FieldWrap>
      <FieldWrap label="Expected Salary (Monthly, LKR or specify currency)" required error={errors.expectedSalary} dark={dark}>
        <Input name="expectedSalary" value={form.expectedSalary} onChange={e => setField('expectedSalary', e.target.value)} placeholder="e.g. LKR 50,000 / negotiable" dark={dark} error={errors.expectedSalary} />
      </FieldWrap>
      <FieldWrap label="Employment Preference" required error={errors.employmentType} dark={dark}>
        <Select name="employmentType" value={form.employmentType} onChange={e => setField('employmentType', e.target.value)} dark={dark} error={errors.employmentType}>
          <option value="">Select type...</option>
          {EMP_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
        </Select>
      </FieldWrap>
    </div>
  );
}

function Step3({ form, setField, errors, dark, isSalesRole }) {
  return (
    <div>
      <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.2rem', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 4 }}>Portfolio & Documents</h3>
      <p style={{ fontSize: '.82rem', color: dark ? '#9B8BC0' : '#7B6A9A', marginBottom: 22, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Share your work and upload your CV.</p>

      <FieldWrap label="Portfolio Link" required={!isSalesRole} error={errors.portfolioLink} dark={dark}>
        <Input name="portfolioLink" type="url" value={form.portfolioLink} onChange={e => setField('portfolioLink', e.target.value)} placeholder="https://yourportfolio.com" dark={dark} error={errors.portfolioLink} />
      </FieldWrap>
      <FieldWrap label="LinkedIn Profile URL" error={errors.linkedinUrl} dark={dark}>
        <Input name="linkedinUrl" type="url" value={form.linkedinUrl} onChange={e => setField('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/yourprofile" dark={dark} error={errors.linkedinUrl} />
      </FieldWrap>
      <FieldWrap label="CV / Resume" required error={errors.cv} dark={dark}>
        <FileUpload
          label="Click to upload your CV / Resume"
          name="cv"
          accept=".pdf,.doc,.docx"
          dark={dark}
          error={errors.cv}
          value={form.cv}
          onChange={f => setField('cv', f)}
          hint={`PDF, DOC or DOCX · Max ${MAX_CV_MB}MB`}
        />
      </FieldWrap>
      <FieldWrap label="Additional Work Samples" error={errors.workSamples} dark={dark}>
        <FileUpload
          label="Click to upload work samples (optional)"
          name="workSamples"
          accept=".pdf,.jpg,.jpeg,.png,.zip,.mp4"
          dark={dark}
          error={errors.workSamples}
          value={form.workSamples}
          onChange={f => setField('workSamples', f)}
          hint={`PDF, image, ZIP or video · Max ${MAX_SAMPLE_MB}MB`}
        />
      </FieldWrap>
    </div>
  );
}

function Step4({ form, setField, errors, dark }) {
  return (
    <div>
      <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.2rem', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 4 }}>How Did You Find Us?</h3>
      <p style={{ fontSize: '.82rem', color: dark ? '#9B8BC0' : '#7B6A9A', marginBottom: 22, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Help us understand where applicants come from.</p>

      <FieldWrap label="Where did you find this vacancy?" required error={errors.source} dark={dark}>
        <Select name="source" value={form.source} onChange={e => setField('source', e.target.value)} dark={dark} error={errors.source}>
          <option value="">Select source...</option>
          {SOURCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </Select>
      </FieldWrap>

      <AnimatePresence>
        {form.source === 'Referral' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <FieldWrap label="Who referred you?" dark={dark}>
              <Input name="referral" value={form.referral} onChange={e => setField('referral', e.target.value)} placeholder="Referral name" dark={dark} />
            </FieldWrap>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginTop: 24, padding: '18px 20px', borderRadius: 14, background: dark ? 'rgba(96,239,255,.05)' : 'rgba(96,239,255,.08)', border: `1px solid ${dark ? 'rgba(96,239,255,.12)' : 'rgba(96,239,255,.2)'}` }}>
        <div style={{ fontWeight: 700, fontSize: '.83rem', color: dark ? '#60EFFF' : '#0891B2', marginBottom: 6, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Almost there!
        </div>
        <p style={{ fontSize: '.79rem', lineHeight: 1.7, color: dark ? '#B8A0D8' : '#5B4080', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Just one more step — a few short screening questions to help us understand you better. Take your time and be yourself.
        </p>
      </div>
    </div>
  );
}

function Step5({ form, setField, errors, dark }) {
  const sectionStyle = { marginBottom: 20 };
  return (
    <div>
      <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.2rem', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 4 }}>Screening Questions</h3>
      <p style={{ fontSize: '.82rem', color: dark ? '#9B8BC0' : '#7B6A9A', marginBottom: 22, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Answer honestly — we value authenticity over perfection.</p>

      <div style={sectionStyle}>
        <FieldWrap label="Why do you want to join Paralox Media?" required error={errors.whyJoin} dark={dark}>
          <Textarea name="whyJoin" value={form.whyJoin} onChange={e => setField('whyJoin', e.target.value)} placeholder="Tell us what excites you about Paralox Media and this opportunity..." rows={3} dark={dark} error={errors.whyJoin} />
        </FieldWrap>
      </div>
      <div style={sectionStyle}>
        <FieldWrap label="Why are you a good fit for this role?" required error={errors.whyFit} dark={dark}>
          <Textarea name="whyFit" value={form.whyFit} onChange={e => setField('whyFit', e.target.value)} placeholder="Describe your relevant skills and experience..." rows={3} dark={dark} error={errors.whyFit} />
        </FieldWrap>
      </div>
      <div style={sectionStyle}>
        <FieldWrap label="Tell us about a project you are most proud of" required error={errors.proudProject} dark={dark}>
          <Textarea name="proudProject" value={form.proudProject} onChange={e => setField('proudProject', e.target.value)} placeholder="Describe the project, your role, and the outcome..." rows={3} dark={dark} error={errors.proudProject} />
        </FieldWrap>
      </div>
      <div style={sectionStyle}>
        <FieldWrap label="Have you used AI tools in your workflow? If yes, explain briefly." required error={errors.aiTools} dark={dark}>
          <Textarea name="aiTools" value={form.aiTools} onChange={e => setField('aiTools', e.target.value)} placeholder="e.g. ChatGPT for scripting, Midjourney for visuals, Runway for video..." rows={3} dark={dark} error={errors.aiTools} />
        </FieldWrap>
      </div>

      <FieldWrap label="Are you comfortable working with feedback, deadlines, and multiple projects?" required dark={dark}>
        <RadioGroup name="comfortableFeedback" value={form.comfortableFeedback} onChange={v => setField('comfortableFeedback', v)} options={[{value:'yes',label:'Yes'},{value:'no',label:'No'}]} dark={dark} />
        <div style={{ marginTop: 9 }}>
          <Input name="feedbackNote" value={form.feedbackNote} onChange={e => setField('feedbackNote', e.target.value)} placeholder="Optional note..." dark={dark} />
        </div>
      </FieldWrap>

      <FieldWrap label="Do you have your own equipment and software access?" required dark={dark}>
        <RadioGroup name="ownEquipment" value={form.ownEquipment} onChange={v => setField('ownEquipment', v)} options={[{value:'yes',label:'Yes'},{value:'no',label:'No'}]} dark={dark} />
      </FieldWrap>

      <FieldWrap label="Any additional information you'd like us to know?" dark={dark}>
        <Textarea name="additionalInfo" value={form.additionalInfo} onChange={e => setField('additionalInfo', e.target.value)} placeholder="Anything else you'd like to share..." rows={2} dark={dark} />
      </FieldWrap>
    </div>
  );
}

function Step6({ form, setField, errors, dark }) {
  const row = (label, value) => (
    <div style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: `1px solid ${dark ? 'rgba(139,82,247,.08)' : 'rgba(91,29,232,.07)'}` }}>
      <span style={{ fontSize: '.74rem', color: dark ? '#8870B8' : '#9B8BC0', fontFamily: "'Plus Jakarta Sans',sans-serif", minWidth: 120, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '.78rem', fontWeight: 600, color: dark ? '#E0D0F8' : '#1A0A2E', fontFamily: "'Plus Jakarta Sans',sans-serif", wordBreak: 'break-word' }}>{value || '—'}</span>
    </div>
  );

  return (
    <div>
      <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.2rem', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 4 }}>Review & Submit</h3>
      <p style={{ fontSize: '.82rem', color: dark ? '#9B8BC0' : '#7B6A9A', marginBottom: 18, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Double-check your details before submitting.</p>

      <div style={{ borderRadius: 14, border: `1px solid ${dark ? 'rgba(139,82,247,.15)' : 'rgba(91,29,232,.1)'}`, overflow: 'hidden', marginBottom: 22 }}>
        <div style={{ padding: '10px 16px', background: T.grad, fontWeight: 700, fontSize: '.8rem', color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: 0.5 }}>
          Application Summary
        </div>
        <div style={{ padding: '6px 16px 10px' }}>
          {row('Position', form.position)}
          {row('Full Name', form.fullName)}
          {row('Email', form.email)}
          {row('Phone', form.phone)}
          {row('Location', form.location)}
          {row('Work Setup', form.workSetup)}
          {row('Experience', form.experience)}
          {row('Employment', form.employmentType)}
          {row('Start Date', form.startDate)}
          {row('Salary', form.expectedSalary)}
          {row('CV File', form.cv?.name)}
          {row('Found Via', form.source)}
        </div>
      </div>

      {/* Consent checkboxes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 6 }}>
        {[
          { field: 'confirmAccurate', err: errors.confirmAccurate, text: 'I confirm that all information provided is accurate and complete.' },
          { field: 'agreeContact',    err: errors.agreeContact,    text: 'I agree to be contacted by Paralox Media regarding this application.' },
        ].map(({ field, err, text }) => (
          <div key={field}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 11, cursor: 'pointer' }}>
              <div
                onClick={() => setField(field, !form[field])}
                style={{
                  width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                  border: `2px solid ${err ? '#EF4444' : form[field] ? T.p1 : dark ? 'rgba(139,82,247,.35)' : 'rgba(91,29,232,.25)'}`,
                  background: form[field] ? T.p1 : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all .2s', cursor: 'pointer',
                }}
              >
                {form[field] && <CheckCircle2 size={11} color="#fff" />}
              </div>
              <span style={{ fontSize: '.82rem', lineHeight: 1.6, color: dark ? '#C8B8E8' : '#4B3275', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                {text}
              </span>
            </label>
            {err && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5, color: '#EF4444', fontSize: '.71rem', fontFamily: "'Plus Jakarta Sans',sans-serif", paddingLeft: 31 }}>
                <AlertCircle size={11} /> {err}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Map step index → component (defined at module level — static, never recreated)
const STEP_COMPONENTS = { 1: Step1, 2: Step2, 3: Step3, 4: Step4, 5: Step5, 6: Step6 };

// ─── Main Component ───────────────────────────────────────────────────────────

export function ApplicationModal({ dark, vacancy, onClose }) {
  const [step, setStep]       = useState(1);
  const [form, setForm]       = useState({ ...INITIAL_FORM, position: vacancy?.title || '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const bodyRef = useRef(null);

  const isSalesRole = vacancy?.id === 'sales-executive';

  const setField = useCallback((name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  }, []);

  const scrollTop = () => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  };

  const next = () => {
    const errs = validateStep(step, form, isSalesRole);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(s => s + 1);
    scrollTop();
  };

  const back = () => {
    setErrors({});
    setStep(s => s - 1);
    scrollTop();
  };

  const submit = async () => {
    const errs = validateStep(6, form, isSalesRole);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (!SCRIPT_URL) {
      setSubmitError('Apps Script URL is not configured. Add REACT_APP_SCRIPT_URL to your .env file.');
      return;
    }

    setLoading(true);
    setSubmitError('');

    try {
      // Read files as base64 so they can be sent as plain JSON (no server needed)
      const [cvBase64, sampleBase64] = await Promise.all([
        fileToBase64(form.cv),
        fileToBase64(form.workSamples),
      ]);

      const payload = {
        fullName:        form.fullName,
        email:           form.email,
        phone:           form.phone,
        location:        form.location,
        workSetup:       form.workSetup,
        position:        form.position,
        experience:      form.experience,
        currentTitle:    form.currentTitle,
        startDate:       form.startDate,
        expectedSalary:  form.expectedSalary,
        employmentType:  form.employmentType,
        portfolioLink:   form.portfolioLink,
        linkedinUrl:     form.linkedinUrl,
        source:          form.source,
        referral:        form.referral,
        whyJoin:         form.whyJoin,
        whyFit:          form.whyFit,
        proudProject:    form.proudProject,
        aiTools:         form.aiTools,
        comfortableFeedback: form.comfortableFeedback,
        feedbackNote:    form.feedbackNote,
        ownEquipment:    form.ownEquipment,
        additionalInfo:  form.additionalInfo,
        // File data
        cv:              cvBase64,
        cvName:          form.cv?.name     || '',
        cvType:          form.cv?.type     || 'application/pdf',
        workSamples:     sampleBase64,
        workSamplesName: form.workSamples?.name || '',
        workSamplesType: form.workSamples?.type || 'application/octet-stream',
        submittedAt:     new Date().toISOString(),
      };

      // Google Apps Script redirects POST requests, which causes CORS errors when
      // trying to read the response. Using no-cors sends the data successfully —
      // the response is opaque (unreadable) but the script still runs on Google's end.
      await fetch(SCRIPT_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body:    JSON.stringify(payload),
        mode:    'no-cors',
      });

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again or contact info@paraloxmedia.com.');
    } finally {
      setLoading(false);
    }
  };

  const CurrentStep = STEP_COMPONENTS[step];

  return (
    <AnimatePresence>
      <motion.div
        key="apply-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,.78)',
          backdropFilter: 'blur(12px)',
          zIndex: 1100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(0px,3vw,20px)',
        }}
      >
        <motion.div
          key="apply-card"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: dark ? '#0D0520' : '#fff',
            border: `1px solid ${dark ? 'rgba(139,82,247,.22)' : 'rgba(91,29,232,.13)'}`,
            borderRadius: 24,
            width: '100%', maxWidth: 660,
            maxHeight: '92vh',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 40px 100px rgba(0,0,0,.55)',
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            overflow: 'hidden',
          }}
        >
          {/* ── Header ── */}
          <div style={{
            padding: '20px 24px 0',
            borderBottom: `1px solid ${dark ? 'rgba(139,82,247,.1)' : 'rgba(91,29,232,.08)'}`,
            background: dark ? 'rgba(139,82,247,.04)' : 'rgba(91,29,232,.02)',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.15rem', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 2 }}>
                  Apply — {vacancy?.title}
                </h2>
                <p style={{ fontSize: '.73rem', color: dark ? '#8870B8' : '#9B8BC0' }}>
                  Paralox Media · {vacancy?.location}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                style={{
                  width: 34, height: 34, borderRadius: 10,
                  background: dark ? 'rgba(139,82,247,.1)' : 'rgba(91,29,232,.07)',
                  border: `1px solid ${dark ? 'rgba(139,82,247,.2)' : 'rgba(91,29,232,.12)'}`,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: dark ? '#B8A0D8' : T.p1,
                }}
              >
                <X size={15} />
              </motion.button>
            </div>

            {/* Step progress */}
            {!submitted && (
              <div style={{ marginBottom: 20 }}>
                {/* Progress bar */}
                <div style={{ height: 3, borderRadius: 4, background: dark ? 'rgba(139,82,247,.15)' : 'rgba(91,29,232,.1)', marginBottom: 12, overflow: 'hidden' }}>
                  <motion.div
                    animate={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: '100%', background: T.grad, borderRadius: 4 }}
                  />
                </div>
                {/* Step dots */}
                <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 2 }}>
                  {STEPS.map((s, i) => {
                    const n = i + 1;
                    const done = n < step;
                    const active = n === step;
                    return (
                      <motion.div
                        key={n}
                        onClick={() => done && setStep(n)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 5,
                          padding: '5px 10px', borderRadius: 20, flexShrink: 0,
                          background: active ? T.grad : done ? (dark ? 'rgba(139,82,247,.2)' : 'rgba(91,29,232,.1)') : 'transparent',
                          border: `1px solid ${active ? 'transparent' : done ? (dark ? 'rgba(139,82,247,.3)' : 'rgba(91,29,232,.2)') : (dark ? 'rgba(139,82,247,.1)' : 'rgba(91,29,232,.08)')}`,
                          cursor: done ? 'pointer' : 'default',
                          transition: 'all .25s',
                        }}
                      >
                        <span style={{ color: active ? '#fff' : done ? T.p2 : dark ? 'rgba(255,255,255,.3)' : 'rgba(0,0,0,.25)', display: 'flex', alignItems: 'center' }}>
                          {done ? <CheckCircle2 size={12} /> : s.icon}
                        </span>
                        <span style={{ fontSize: '.68rem', fontWeight: 700, color: active ? '#fff' : done ? (dark ? '#C8A8F8' : T.p1) : (dark ? 'rgba(255,255,255,.28)' : 'rgba(0,0,0,.28)'), whiteSpace: 'nowrap' }}>
                          {s.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Body ── */}
          <div
            ref={bodyRef}
            style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 8px' }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '32px 0 16px' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 260 }}
                    style={{
                      width: 80, height: 80, borderRadius: '50%',
                      background: 'linear-gradient(135deg,#16A34A,#22C55E)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 20px',
                      boxShadow: '0 12px 36px rgba(22,163,74,.4)',
                    }}
                  >
                    <CheckCircle2 size={38} color="#fff" />
                  </motion.div>
                  <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.5rem', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 10 }}>
                    Application Submitted!
                  </h3>
                  <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: dark ? '#B8A0D8' : '#5B4080', maxWidth: 400, margin: '0 auto 24px' }}>
                    Thank you, <strong>{form.fullName}</strong>! Your application for <strong>{form.position}</strong> has been received. Our team will review it and get back to you within 3–5 business days.
                  </p>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onClose}
                    style={{
                      padding: '12px 32px', borderRadius: 50, border: 'none',
                      background: T.grad, color: '#fff', cursor: 'pointer',
                      fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.9rem',
                      boxShadow: '0 6px 20px rgba(91,29,232,.35)',
                    }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CurrentStep form={form} setField={setField} errors={errors} dark={dark} isSalesRole={isSalesRole} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Footer / Navigation ── */}
          {!submitted && (
            <div style={{
              padding: '16px 24px',
              borderTop: `1px solid ${dark ? 'rgba(139,82,247,.1)' : 'rgba(91,29,232,.08)'}`,
              background: dark ? 'rgba(139,82,247,.03)' : 'rgba(91,29,232,.02)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 12, flexShrink: 0,
            }}>
              <div style={{ fontSize: '.72rem', color: dark ? '#6B5A88' : '#B8A0C8', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Step {step} of {STEPS.length}
              </div>

              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                {submitError && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ fontSize: '.75rem', color: '#EF4444', fontFamily: "'Plus Jakarta Sans',sans-serif", display: 'flex', alignItems: 'center', gap: 5, maxWidth: 240 }}>
                    <AlertCircle size={12} /> {submitError}
                  </motion.div>
                )}

                {step > 1 && (
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={back}
                    style={{
                      padding: '10px 18px', borderRadius: 50,
                      border: `1.5px solid ${dark ? 'rgba(139,82,247,.25)' : 'rgba(91,29,232,.18)'}`,
                      background: 'transparent', cursor: 'pointer',
                      fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.85rem',
                      color: dark ? '#B8A0D8' : T.p1,
                      display: 'flex', alignItems: 'center', gap: 5,
                    }}
                  >
                    <ChevronLeft size={15} /> Back
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ y: -2, boxShadow: '0 10px 28px rgba(91,29,232,.42)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={step === STEPS.length ? submit : next}
                  disabled={loading}
                  style={{
                    padding: '10px 22px', borderRadius: 50, border: 'none',
                    background: loading ? 'rgba(91,29,232,.5)' : T.grad,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.85rem',
                    color: '#fff',
                    display: 'flex', alignItems: 'center', gap: 6,
                    boxShadow: '0 5px 18px rgba(91,29,232,.32)',
                    opacity: loading ? 0.75 : 1,
                  }}
                >
                  {loading
                    ? <><Loader2 size={14} style={{ animation: 'spin 0.8s linear infinite' }} /> Submitting...</>
                    : step === STEPS.length
                      ? <><Send size={14} /> Submit Application</>
                      : <>Continue <ChevronRight size={14} /></>
                  }
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
