import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import theme from "../theme/theme";

export default function Contact() {
  const teamMembers = [
    {
      pretitle: "Développeur Backend",
      title: "Yohann Aharh",
      description:
        "Yohann travaille sur le backend du projet, gérant les bases de données et les API pour assurer une communication fluide entre le client et le serveur.",
      action: "Voir GitHub",
      position: "start",
      link: "https://github.com/Yohannkp",
    },
    {
      pretitle: "Développeur Frontend",
      title: "Liyam Rousseau",
      description:
        "Liyam travaille dans la création de l’interface administrateur, avec une attention portée à l’expérience utilisateur et à la réactivité des sites.",
      action: "Voir GitHub",
      position: "center",
      link: "https://github.com/Shaykkoo",
    },
    {
      pretitle: "Développeur Frontend",
      title: "Batyste Chauvet",
      description:
        "Batyste a conçu l’aspect visuel du projet et a créé la structure du site afin de donner une bonne expérience utilisateur. Il a fait le pivot Back- Front.",
      action: "Voir GitHub",
      position: "end",
      link: "https://github.com/Batyeste",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "84vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography variant="h1" align="center" sx={{ pt: 5, mb: 5 }}>
        L’équipe du projet
      </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={4} // Espacement entre les cartes
      >
        {teamMembers.map((member, index) => (
          <Box key={index} width={{ xs: "100%", sm: "45%", md: "30%" }}>
            <Card sx={{ backgroundColor: theme.palette.background.secondary }}>
              <CardContent>
                <Typography variant="h3" gutterBottom>
                  {member.pretitle}
                </Typography>
                <Divider sx={{ bgcolor: theme.palette.text.tertiary, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {member.title}
                </Typography>
                <Typography variant="body2" paragraph>
                  {member.description}
                </Typography>
                <Button
                  variant="outlined"
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                >
                  {member.action}
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
