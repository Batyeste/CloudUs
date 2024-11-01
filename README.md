# API de Gestion de Fichiers et d’Espace de Stockage

Cette API permet aux utilisateurs de gérer leurs fichiers et leur espace de stockage sur une plateforme sécurisée. Les administrateurs ont accès à des fonctionnalités avancées de gestion des utilisateurs et de visualisation de statistiques.

## Prérequis

- **PHP** >= 8.0
- **Symfony** >= 6.0
- **Composer**
- **MySQL** (ou un autre système de gestion de base de données compatible)

## Installation

1. **Clonez le repository :**
    ```bash
    git clone https://github.com/votre-utilisateur/nom-du-repository.git
    cd nom-du-repository
    ```

2. **Installez les dépendances :**
    ```bash
    composer install
    ```

3. **Configurez la base de données :**
    - Mettez à jour votre fichier `.env` avec les informations de connexion à votre base de données.
    - Créez la base de données :
        ```bash
        php bin/console doctrine:database:create
        php bin/console doctrine:migrations:migrate
        ```

4. **Démarrez le serveur de développement :**
    ```bash
    symfony serve
    ```

## Authentification

L'authentification se fait via JWT. Pour obtenir un token, les utilisateurs doivent s'inscrire puis se connecter via l'API.

- **Endpoint d'inscription** : `/api/register` (POST)
- **Endpoint de connexion** : `/api/login` (POST)

### Exemple de Requête d'Inscription

```json
{
    "username": "user@example.com",
    "password": "votre_mot_de_passe",
    "nom": "Nom",
    "prenom": "Prénom",
    "adresse": "Adresse complète"
}
```

### Exemple de Requête de Connexion

Envoyez les informations de connexion dans le corps de la requête pour obtenir un token JWT. Ce token doit être inclus dans le header `Authorization` pour toutes les requêtes protégées.

```json
{
    "username": "user@example.com",
    "password": "votre_mot_de_passe"
}
```

## Endpoints Utilisateurs

### 1. Achat d'Espace de Stockage
- **URL** : `/api/user/buy-storage`
- **Méthode** : `POST`
- **Description** : Permet à l'utilisateur d'acheter 20 Go d'espace de stockage supplémentaire.
- **Réponse** :
    ```json
    {
        "status": "Espace supplémentaire acheté",
        "totalStorage": "total_storage_en_ko",
        "usedStorage": "used_storage_en_ko",
        "remainingStorage": "remaining_storage_en_ko"
    }
    ```

### 2. Suppression de Fichiers
- **URL** : `/api/files/delete`
- **Méthode** : `POST`
- **Description** : Permet de supprimer un ou plusieurs fichiers de l’utilisateur.
- **Corps de la requête** :
    ```json
    {
        "fileIds": [1, 2, 3]
    }
    ```
- **Réponse** :
    ```json
    {
        "status": "Files deleted",
        "deletedFilesCount": nombre_de_fichiers_supprimés
    }
    ```

## Endpoints Administrateurs

### 1. Tableau de Bord des Statistiques
- **URL** : `/api/admin/dashboard`
- **Méthode** : `GET`
- **Description** : Renvoie des statistiques générales sur les utilisateurs, les fichiers et l’espace de stockage.

### 2. Liste des Clients
- **URL** : `/api/admin/clients`
- **Méthode** : `GET`
- **Description** : Renvoie la liste de tous les clients avec leurs informations de stockage.

### 3. Liste de Tous les Fichiers
- **URL** : `/api/admin/files`
- **Méthode** : `GET`
- **Description** : Renvoie la liste complète des fichiers uploadés par tous les utilisateurs.

## Gestion des Factures

Lors de l’achat d’espace supplémentaire, une facture en PDF est générée et envoyée par e-mail à l’utilisateur et à l'administrateur.

### Configuration des E-mails

Le service d'email nécessite une configuration SMTP. Dans le fichier `.env`, mettez à jour la configuration `MAILER_DSN` en fonction de votre fournisseur de messagerie.

```dotenv
MAILER_DSN=smtp://user:pass@smtp.mailtrap.io:2525
```

## Exécution des Tests

Pour exécuter les tests de l’API, utilisez la commande suivante :

```bash
php bin/phpunit
```

## Contributions

Les contributions sont les bienvenues ! Veuillez ouvrir une pull request pour proposer vos modifications.

## Licence
