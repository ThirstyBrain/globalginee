import React, { useRef } from 'react';
import { Container, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { SaveAlt as SaveAltIcon, Print as PrintIcon } from '@mui/icons-material';
import { useReactToPrint, UseReactToPrintOptions } from 'react-to-print'
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
// Extend the UseReactToPrintOptions type to include the content property
interface ExtendedReactToPrintOptions extends UseReactToPrintOptions {
  content: () => HTMLDivElement | null;
}

const ResumeBuilderTemplate: React.FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [experience, setExperience] = React.useState('');
  const [education, setEducation] = React.useState('');

  const resumeRef = useRef<HTMLDivElement>(null);

  // const handlePrint = useReactToPrint({
  //   content: () => resumeRef.current as HTMLDivElement,
  // });
  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  } as ExtendedReactToPrintOptions);

  const handleDownloadDocx = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Name: ${name}`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Email: ${email}`,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Phone: ${phone}`,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Summary: ${summary}`,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Experience: ${experience}`,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Education: ${education}`,
                }),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'resume.docx');
    });
  };

  return (
    <Container>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Summary"
            fullWidth
            multiline
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Experience"
            fullWidth
            multiline
            rows={4}
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Education"
            fullWidth
            multiline
            rows={4}
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PrintIcon />}
            onClick={handlePrint as unknown as React.MouseEventHandler<HTMLButtonElement>}
          >
            Preview & Print
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SaveAltIcon />}
            onClick={handleDownloadDocx}
            sx={{ ml: 2 }}
          >
            Download DOCX
          </Button>
        </Grid>
      </Grid>
      <Paper ref={resumeRef} sx={{ mt: 4, p: 3 }}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body1">{email}</Typography>
        <Typography variant="body1">{phone}</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {summary}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Experience
        </Typography>
        <Typography variant="body2">{experience}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Education
        </Typography>
        <Typography variant="body2">{education}</Typography>
      </Paper>
    </Container>
  );
};

export default ResumeBuilderTemplate;
