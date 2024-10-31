<?php

namespace App\Service;

use Dompdf\Dompdf;
use Dompdf\Options;
use Symfony\Component\Filesystem\Filesystem;

class InvoiceService
{
    private Filesystem $filesystem;

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
        return "
            <html>
                <body>
                    <h1>Facture n° {$invoiceData['invoice_number']}</h1>
                    <p>Date : {$invoiceData['date']}</p>
                    <p>Nom du client : {$invoiceData['client_name']}</p>
                    <p>Adresse : {$invoiceData['client_address']}</p>
                    <p>Montant total : {$invoiceData['total_amount']} €</p>
                </body>
            </html>
        ";
    }
}
