import React, { useState, useRef } from 'react';
import { Container, TextField, Button, Typography, Grid, Paper,  FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import { saveAs } from 'file-saver';
//import JSZip from 'jszip';
import jsPDF from 'jspdf';
//import SVGCanvas from 'svg-canvas';
import html2canvas from 'html2canvas';
//import ReactDOM from 'react-dom';

  
//  error correction levels
const errorCorrectionLevels = ['L', 'M', 'Q', 'H'];

const QRCodeGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(256);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('L');
  const qrRef = useRef<HTMLCanvasElement>(null);



// const dataURLtoBlob = (dataURL: string) => {
//     const byteString = atob(dataURL.split(',')[1]);
//     const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([ab], { type: mimeString });
//   };

  const handleDownload = async (format: string) => {
    if (!qrRef.current) return;
    const canvas = qrRef.current;
    if (format === 'svg') {
        const svgData = canvas.toDataURL('image/svg+xml');
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
        saveAs(svgBlob, 'qr-code.svg');
      } else if (format === 'pdf') {
        const canvas = await html2canvas(qrRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('qr-code.pdf');
      } else {
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `qr-code.${format}`);
        }
      }, `image/${format}`);
    }
  };

// const handleBatchDownload = async () => {
//   const zip = new JSZip();
//   const urls = input.split('\n');
//   for (const [index, url] of urls.entries()) {
//     const tempDiv = document.createElement('div');
//     document.body.appendChild(tempDiv);
//     ReactDOM.render(
//       <QRCodeCanvas
//         value={url}
//         size={size}
//         fgColor={color}
//         bgColor={bgColor}
//         level={errorCorrectionLevel as any}
//       />,
//       tempDiv
//     );
//     const canvas = tempDiv.querySelector('canvas');
//     if (canvas) {
//       await html2canvas(canvas).then((canvas) => {
//         canvas.toBlob((blob) => {
//           if (blob) {
//             zip.file(`qr-code-${index + 1}.png`, blob);
//           }
//         });
//       });
//     }
//     document.body.removeChild(tempDiv);
//   }
//   zip.generateAsync({ type: 'blob' }).then((content) => {
//     saveAs(content, 'qr-codes.zip');
//   });
// };
  
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Input"
            fullWidth
            multiline
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Foreground Color"
            type="color"
            fullWidth
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Background Color"
            type="color"
            fullWidth
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Size"
            type="number"
            fullWidth
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Error Correction Level</InputLabel>
            <Select
              value={errorCorrectionLevel}
              onChange={(e) => setErrorCorrectionLevel(e.target.value)}
            >
              {errorCorrectionLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <QRCodeCanvas
              value={input}
              size={size}
              fgColor={color}
              bgColor={bgColor}
              level={errorCorrectionLevel as any}
              ref={qrRef}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={() => handleDownload('png')}>
            Download PNG
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleDownload('jpg')} sx={{ ml: 2 }}>
            Download JPG
          </Button>
          {/* <Button variant="contained" color="inherit" onClick={() => handleDownload('svg')} sx={{ ml: 2 }}>
            Download SVG
          </Button> */}
          <Button variant="contained" color="inherit" onClick={() => handleDownload('pdf')} sx={{ ml: 2 }}>
            Download PDF
          </Button>
          {/* <Button variant="contained" color="inherit" onClick={handleBatchDownload} sx={{ ml: 2 }}>
            Batch Download
          </Button> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default QRCodeGenerator;