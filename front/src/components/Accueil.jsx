import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CCarousel, CCarouselItem } from "@coreui/react";
import "./Accueil.css";
import PricingCard from "./CardPrice/PricingCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Typography, Button } from "@mui/material";
import theme from "./theme/theme";

const Accueil = () => {
  const navigate = useNavigate();

  const formule1 = {
    prix: "10",
    stockage: "10",
    raison1: "Support standard",
    raison2: "1Go de transfert",
  };
  const formule2 = {
    prix: "50",
    stockage: "50",
    raison1: "Support prioritaire",
    raison2: "10Go de transfert",
  };
  const formule3 = {
    prix: "100",
    stockage: "100",
    raison1: "Support 7/7",
    raison2: "50Go de transfert",
  };

  const handleCardClick = (price, storage) => {
    navigate("/signup");
  };

  return (
    <Box
      className="accueil-container"
      sx={{ backgroundColor: theme.palette.background.default, pb: 15 }}
    >
      {/* Hero Section */}
      <Box
        className="first"
        sx={{
          textAlign: "center",
          py: 4,
          color: "white",
          backgroundColor: theme.palette.background.secondary,
        }}
      >
        <Typography variant="h2" gutterBottom>
          La dernière génération de stockage dans le cloud !
        </Typography>
        <Typography variant="h6">
          Sécurisé, rapide et accessible partout.
        </Typography>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          color="secondary"
          sx={{
            ...theme.components.MuiButton.styleOverrides.primaryButton,
            mt: 3,
          }}
        >
          Créer un compte
        </Button>
      </Box>

      {/* Features Section */}
      <Box className="features" sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h2" gutterBottom>
          Pourquoi choisir notre Cloud ?
        </Typography>
        <Box
          className="features-list"
          sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 3 }}
        >
          <Box
            className="feature-item"
            sx={{
              maxWidth: "300px",
              backgroundColor: theme.palette.background.secondary,
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              Sécurité Avancée
            </Typography>
            <Typography variant="h6">
              Protégez vos données avec nos protocoles de sécurité de pointe.
            </Typography>
          </Box>
          <Box
            className="feature-item"
            sx={{
              maxWidth: "300px",
              backgroundColor: theme.palette.background.secondary,
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              Vitesse Éclair
            </Typography>
            <Typography variant="h6">
              Accédez à vos fichiers en un instant grâce à notre infrastructure
              optimisée.
            </Typography>
          </Box>
          <Box
            className="feature-item"
            sx={{
              maxWidth: "300px",
              backgroundColor: theme.palette.background.secondary,
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              Partage Facile
            </Typography>
            <Typography variant="h6">
              Partagez vos documents avec vos collègues en quelques clics.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Testimonials Section */}
      <Box
        className="testimonials"
        sx={{
          py: 5,
          textAlign: "center",
          backgroundColor: theme.palette.background.secondary,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Ce que nos utilisateurs disent
        </Typography>
        <CCarousel controls className="custom-carousel" indicators>
          {[
            {
              quote:
                "CloudUs m'a permis de centraliser mes fichiers tout en restant mobile. Un service fiable et rapide !",
              author: "Xavier Niel, Directeur",
            },
            {
              quote:
                "Le partage facile des fichiers a vraiment changé la manière dont mon équipe collabore.",
              author: "Lucas Moreau, CEO de Safran",
            },
            {
              quote:
                "Je suis impressionné par la sécurité de la plateforme, surtout pour mes documents sensibles.",
              author: "Caroline Petit, Avocate",
            },
          ].map((testimonial, index) => (
            <CCarouselItem key={index} className="custom-carousel-item">
              <Box className="testimonial-item" sx={{ p: 3 }}>
                <Typography variant="h6" fontStyle="italic">
                  "{testimonial.quote}"
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  - {testimonial.author}
                </Typography>
              </Box>
            </CCarouselItem>
          ))}
        </CCarousel>
      </Box>

      {/* How It Works Section */}
      <Box className="how-it-works" sx={{ py: 5, textAlign: "center" }}>
        <Typography variant="h2" gutterBottom>
          Comment ça marche ?
        </Typography>
        <Box
          className="steps"
          sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 3 }}
        >
          {[
            {
              title: "1. Inscrivez-vous",
              description:
                "Créez un compte en quelques minutes et commencez à utiliser notre plateforme.",
            },
            {
              title: "2. Téléchargez vos fichiers",
              description:
                "Ajoutez vos documents en toute sécurité dans le cloud.",
            },
            {
              title: "3. Partagez et collaborez",
              description:
                "Collaborez facilement avec votre équipe où que vous soyez.",
            },
          ].map((step, index) => (
            <Box key={index} className="step" sx={{ maxWidth: "300px" }}>
              <Typography variant="h3">{step.title}</Typography>
              <Typography variant="h6">{step.description}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Pricing Section */}
      <Box
        className="pricing"
        sx={{
          py: 5,
          textAlign: "center",
          backgroundColor: theme.palette.background.secondary,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Choisissez le plan qui vous correspond
        </Typography>
        <Box
          className="pricing-plans"
          sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 3 }}
        >
          <PricingCard
            title="Standard"
            price={formule1.prix}
            storage={formule1.stockage}
            raison1={formule1.raison1}
            raison2={formule1.raison2}
            onClick={() => handleCardClick(formule1.prix, formule1.stockage)}
          />
          <PricingCard
            title="Premium"
            price={formule2.prix}
            storage={formule2.stockage}
            raison1={formule2.raison1}
            raison2={formule2.raison2}
            onClick={() => handleCardClick(formule2.prix, formule2.stockage)}
          />
          <PricingCard
            title="Pro"
            price={formule3.prix}
            storage={formule3.stockage}
            raison1={formule3.raison1}
            raison2={formule3.raison2}
            onClick={() => handleCardClick(formule3.prix, formule3.stockage)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Accueil;
