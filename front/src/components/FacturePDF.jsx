import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

//--- Style global pour la facture
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#FAFAFA",
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    border: "1px solid #DDD",
  },
  logo: { width: 60, height: 60, marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 10, fontWeight: "bold" },
  text: { marginBottom: 5 },
  companyDetails: { fontSize: 10, color: "#666", textAlign: "right" },
  invoiceDetails: { fontSize: 10, marginTop: 20, textAlign: "left" },
  itemTable: {
    marginTop: 20,
    borderTop: "1px solid #EEE",
    borderBottom: "1px solid #EEE",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottom: "1px solid #EEE",
  },
  item: { fontSize: 12 },
  total: {
    marginTop: 10,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
  },
});

const MyDocument = ({ formData }) => {
  if (!formData) {
    return <Text>Aucune donnée disponible pour générer la facture ⚠️</Text>;
  }

  const tvaRate = 20; //-- TVA à 20%
  const ttc = parseFloat(formData.prix);
  const ht = (ttc / (1 + tvaRate / 100)).toFixed(2); //-- Calcul du montant HT
  const tva = (ttc - parseFloat(ht)).toFixed(2); //-- Montant TVA

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En tête */}
        <View style={styles.header}>
          <Image style={styles.logo} src="/img/logo2.png" />
          <Text>Facture</Text>
        </View>

        {/* Info entreprise */}
        <View style={styles.companyDetails}>
          <Text>Nom de la société: {formData.nomSoce}</Text>
          <Text>Adresse: {formData.adressePostaleSoce}</Text>
          <Text>SIRET: {formData.siret}</Text>
        </View>

        {/* Détail client */}
        <View style={styles.section}>
          <Text style={styles.title}>Détails du client</Text>
          <Text style={styles.text}>
            Nom: {formData.nom} {formData.prenom}
          </Text>
          <Text style={styles.text}>Adresse: {formData.adressePostale}</Text>
          <Text style={styles.text}>Téléphone: {formData.tel}</Text>
          <Text style={styles.text}>Email: {formData.email}</Text>
        </View>

        {/* Détails commande */}
        <View style={styles.section}>
          <Text style={styles.title}>Détails de la commande</Text>
          <View style={styles.itemTable}>
            <View style={styles.itemRow}>
              <Text style={styles.item}>Description</Text>
              <Text style={styles.item}>Quantité</Text>
              <Text style={styles.item}>Stockage</Text>
              <Text style={styles.item}>Total</Text>
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.item}>Service d'abonnement</Text>
              <Text style={styles.item}>1</Text>
              <Text style={styles.item}>{formData.stockage} Go</Text>
              <Text style={styles.item}>{formData.prix}€</Text>
            </View>
          </View>
          <Text style={styles.text}>Montant HT: {ht}€</Text>
          <Text style={styles.text}>TVA (20%): {tva}€</Text>
          <Text style={styles.text}>Total TTC: {ttc}€</Text>
        </View>

        {/* Info paiement */}
        <View style={styles.section}>
          <Text style={styles.title}>Détails de paiement</Text>
          <Text style={styles.text}>
            Méthode de paiement: {formData.paymentMethod}
          </Text>
          <Text style={styles.text}>
            Numéro de carte: **** **** **** {formData.cardNumber.slice(-4)}
          </Text>
        </View>

        {/* p'tit plus */}
        <View style={styles.invoiceDetails}>
          <Text>Date d'émission: {new Date().toLocaleDateString()}</Text>
          <Text>Merci de votre confiance!</Text>
        </View>
      </Page>
    </Document>
  );
};

//- Composant Facture pour visualiser le PDF
const Facture = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  if (!formData) {
    return (
      <div>
        <p>
          Erreur : Aucune donnée disponible. Redirection vers l'inscription...
        </p>
        {setTimeout(() => navigate("/"), 3000)}
      </div>
    );
  }

  return (
    <PDFViewer width="100%" height="1000">
      <MyDocument formData={formData} />
    </PDFViewer>
  );
};

export default Facture;
