import React from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import theme from "../theme/theme";

const PaiementMethod = ({ formData, handleChange, error }) => {
  return (
    <Box component="form" sx={{ maxWidth: 600, mx: "auto", mb: 5 }}>
      {/* Titulaire de la carte */}
      <FormControl fullWidth margin="normal">
        <TextField
          label="Titulaire carte"
          id="tituleCB"
          name="tituleCB"
          value={formData.tituleCB}
          onChange={handleChange}
          variant="standard"
        />
      </FormControl>

      {/* Méthode de paiement */}
      <FormControl fullWidth margin="normal" variant="standard">
        <InputLabel
          id="paymentMethod-label"
          sx={{ color: theme.palette.text.tertiary }}
        >
          Méthode de paiement
        </InputLabel>
        <Select
          labelId="paymentMethod-label"
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          sx={{
            color: theme.palette.text.primary,

            "& .MuiList-root": {
              bgcolor: theme.palette.background.default,
            },
          }}
        >
          <MenuItem value="">Sélectionnez une méthode</MenuItem>
          <MenuItem value="creditCard">Carte de crédit</MenuItem>
          <MenuItem value="paypal">PayPal</MenuItem>
          <MenuItem value="bankTransfer">Virement bancaire</MenuItem>
        </Select>
      </FormControl>

      {/* Numéro de carte */}
      <FormControl fullWidth margin="normal">
        <TextField
          label="Numéro de carte"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          variant="standard"
          slotProps={{
            htmlInput: {
              maxLength: 16,
            },
          }}
        />
      </FormControl>

      <Stack direction="row" spacing={2}>
        {/* Mois */}
        <FormControl fullWidth variant="standard">
          <InputLabel
            id="expiryMonth-label"
            sx={{ color: theme.palette.text.tertiary }}
          >
            Mois
          </InputLabel>
          <Select
            labelId="expiryMonth-label"
            id="expiryMonth"
            name="expiryMonth"
            value={formData.expiryMonth}
            onChange={handleChange}
          >
            <MenuItem value="">Mois</MenuItem>
            {[...Array(12)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1 < 10 ? `0${i + 1}` : i + 1}>
                {i + 1 < 10 ? `0${i + 1}` : i + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Année */}
        <FormControl fullWidth variant="standard">
          <InputLabel
            id="expiryYear-label"
            sx={{ color: theme.palette.text.tertiary }}
          >
            Année
          </InputLabel>
          <Select
            labelId="expiryYear-label"
            id="expiryYear"
            name="expiryYear"
            value={formData.expiryYear}
            onChange={handleChange}
          >
            <MenuItem value="">Année</MenuItem>
            {[...Array(10)].map((_, i) => (
              <MenuItem key={i} value={new Date().getFullYear() + i}>
                {new Date().getFullYear() + i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* CVV */}
      <FormControl fullWidth margin="normal">
        <TextField
          label="CVV"
          id="cvv"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          variant="standard"
          slotProps={{
            htmlInput: {
              maxLength: 3,
            },
          }}
        />
      </FormControl>

      {/* Message d'erreur */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default PaiementMethod;
