import React from "react";
import { Box, Typography, Button, Grid, Paper, Container } from "@mui/material";
import theme from "../../components/theme/theme";

function WhyUs() {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "84vh",
        padding: "0px 100px",
      }}
    >
      <Box sx={{ paddingTop: 4 }}>
        <Typography variant="h1" gutterBottom align="center" sx={{ mb: 3 }}>
          Pourquoi choisir notre service de Cloud ?
        </Typography>

        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h3" gutterBottom>
            Des solutions flexibles et sécurisées pour vos besoins
            professionnels
          </Typography>
          <Typography variant="h6" paragraph>
            Notre service de Cloud vous offre une infrastructure performante,
            fiable et sécurisée pour stocker, gérer et partager vos données.
            Grâce à nos solutions, vous bénéficiez d'une grande flexibilité et
            d'une sécurité de niveau entreprise pour vos informations sensibles.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Premier point : Sécurité */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{ padding: 3, bgcolor: theme.palette.background.secondary }}
            >
              <Typography variant="h3" gutterBottom>
                Sécurité de niveau entreprise
              </Typography>
              <Typography variant="h6" paragraph>
                Nous offrons une sécurité avancée pour toutes vos données avec
                des systèmes de cryptage de bout en bout et une protection
                contre les cybermenaces.
              </Typography>
              <Button variant="contained" color="primary">
                En savoir plus
              </Button>
            </Paper>
          </Grid>

          {/* Deuxième point : Flexibilité */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{ padding: 3, bgcolor: theme.palette.background.secondary }}
            >
              <Typography variant="h3" gutterBottom>
                Flexibilité et évolutivité
              </Typography>
              <Typography variant="h6" paragraph>
                Notre plateforme Cloud s’adapte à vos besoins en matière de
                stockage, de traitement de données et de bande passante. Vous
                pouvez ajuster vos ressources en fonction de vos exigences.
              </Typography>
              <Button variant="contained" color="primary">
                En savoir plus
              </Button>
            </Paper>
          </Grid>

          {/* Troisième point : Support 24/7 */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{ padding: 3, bgcolor: theme.palette.background.secondary }}
            >
              <Typography variant="h3" gutterBottom>
                Support client 24/7
              </Typography>
              <Typography variant="h6" paragraph>
                Notre équipe de support est disponible à tout moment pour vous
                assister, résoudre vos problèmes et vous aider à tirer le
                meilleur parti de notre service Cloud.
              </Typography>
              <Button variant="contained" color="primary" to="/contact">
                Contacter le support
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", marginTop: 6 }}>
          <Typography variant="h2" gutterBottom>
            Rejoignez-nous dès aujourd'hui et profitez des avantages du Cloud !
          </Typography>
          <Button variant="contained" color="primary" size="large" to="/signup">
            Commencer maintenant
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default WhyUs;
