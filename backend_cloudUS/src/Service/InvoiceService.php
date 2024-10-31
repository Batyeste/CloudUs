<?php

namespace App\Service;

use Dompdf\Dompdf;
use Dompdf\Options;
use Symfony\Component\Filesystem\Filesystem;

class InvoiceService
{
    private Filesystem $filesystem;
    private string $companyName = "Nom de la Société";
    private string $companyAddress = "Adresse de la Société";
    private string $companySIRET = "123 456 789 00012";

    public function __construct()
    {
        $this->filesystem = new Filesystem();
    }

    public function generateInvoicePdf(array $invoiceData): string
    {
        $dompdf = new Dompdf();
        $options = new Options();
        $options->set('defaultFont', 'Arial');
        $dompdf->setOptions($options);

        $html = $this->generateInvoiceHtml($invoiceData);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        // Définir le chemin de sauvegarde du fichier
        $filePath = '/invoices/invoice_' . $invoiceData['invoice_number'] . '.pdf';
        $this->filesystem->dumpFile($filePath, $dompdf->output());

        return $filePath;
    }

    private function generateInvoiceHtml(array $invoiceData): string
    {
        $totalHT = $invoiceData['unit_price'] * $invoiceData['quantity'];
        $tva = $totalHT * 0.20; // 20% TVA
        $totalTTC = $totalHT + $tva;

        return "
            <html>
                <body>
                    <h1>Facture n° {$invoiceData['invoice_number']}</h1>
                    <p>Date : {$invoiceData['date']}</p>
                    
                    <h3>Client</h3>
                    <p>{$invoiceData['client_name']}</p>
                    <p>{$invoiceData['client_address']}</p>

                    <h3>Informations de la Société</h3>
                    <p>{$this->companyName}</p>
                    <p>{$this->companyAddress}</p>
                    <p>SIRET : {$this->companySIRET}</p>

                    <h3>Détails de la Facture</h3>
                    <table>
                        <tr>
                            <th>Désignation</th>
                            <th>Prix Unitaire HT</th>
                            <th>Quantité</th>
                            <th>Total HT</th>
                        </tr>
                        <tr>
                            <td>{$invoiceData['description']}</td>
                            <td>{$invoiceData['unit_price']} €</td>
                            <td>{$invoiceData['quantity']}</td>
                            <td>{$totalHT} €</td>
                        </tr>
                    </table>

                    <h4>Montant de la TVA : {$tva} €</h4>
                    <h4>Total TTC : {$totalTTC} €</h4>
                </body>
            </html>
        ";

    }
}
