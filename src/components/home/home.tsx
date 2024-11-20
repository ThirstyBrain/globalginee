import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Box,
  
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  hero: {
    backgroundImage: "url()",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    textAlign: "center",
  },
  feature: {
    padding: "20px",
    textAlign: "center",
  },
  footer: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f1f1f1",
  },
  card: {
    textDecoration: "none",
    "&:hover": { boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" },
  },
  content: { textAlign: "center" },
  actions: { justifyContent: "center" },
});

const LandingPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Global Ginee
          </Typography>
          {/* <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button> */}
        </Toolbar>
      </AppBar>
      {/* <Box className={classes.hero}>
        <Typography variant="h2">Welcome to Global Ginee</Typography>
        <Typography variant="h5">
          Your one-stop solution for diverse tools and services
        </Typography>
      </Box> */}
      <Container>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={12} sm={4}>
            <Link to="/ifsc" className={classes.feature}>
              <Paper className={classes.feature}>
                <Typography variant="h6">IFSC Code Lookup</Typography>
                <Typography>Find IFSC codes for all banks in India.</Typography>
              </Paper>
              {/* <Card>
                <CardContent className={classes.content}>
                  <Typography variant="h6" gutterBottom>
                    IFSC Code Lookup
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Find IFSC codes for all banks in India.
                  </Typography>
                </CardContent>
                <CardActions className={classes.actions}>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card> */}
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link to="/quotes" className={classes.feature}>
              <Paper className={classes.feature}>
                <Typography variant="h6">Quotes</Typography>
                <Typography>Find and share inspiring quotes.</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link to="/pdfmerge" className={classes.feature}>
              <Paper className={classes.feature}>
                <Typography variant="h6">PDF Merge</Typography>
                <Typography>Merge multiple PDF files into one.</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link to="/medicineinfo" className={classes.feature}>
              <Paper className={classes.feature}>
                <Typography variant="h6">Medicine Info</Typography>
                <Typography>
                  Get detailed information about medicines.
                </Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link to="/tictactoe" className={classes.feature}>
              <Paper className={classes.feature}>
                <Typography variant="h6">Tic Tac Toe</Typography>
                <Typography>Play a fun game of Tic Tac Toe.</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link to="/resumebuilder" className={classes.feature}>
              <Paper className={classes.feature}>
                <Typography variant="h6">Resume Builder</Typography>
                <Typography>Create and download your resume.</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link to="/qrcode" className={classes.feature}>
              <Paper className={classes.feature}>
                <Typography variant="h6">QR Code Generator</Typography>
                <Typography>Generate and download QR codes.</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link to="/invoicegenerator" className={classes.feature}>
              <Paper className={classes.feature}>
                <Typography variant="h6">Invoice Generator</Typography>
                <Typography>Create and manage your invoices.</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link to="/personapath" className={classes.feature}>
              <Paper className={classes.feature}>
                <Typography variant="h6">Persona Path</Typography>
                <Typography>Evaluate your persona.</Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Link to="/bloomcycle" className={classes.feature}>
              <Paper className={classes.feature}>
                <Typography variant="h6">Bloom Cycle</Typography>
                <Typography>
                  Track your menstrual cycle, fertility, and more.
                </Typography>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Box className={classes.footer}>
        <Typography variant="body1">
          © 2024 Global Ginee. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default LandingPage;
