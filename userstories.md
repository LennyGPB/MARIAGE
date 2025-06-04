-- POST /api/register -> créer un utilisateur avec email et mot de passe
-- POST /api/auth/callback/credentials -> connexion avec email et mot de passe
-- GET /api/auth/session -> récupérer la session active
-- GET /api/me -> récupérer les infos de l’utilisateur connecté

-- POST /api/onboarding -> enregistrer les infos de mariage (date, budget, etc.)
-- GET /api/onboarding -> récupérer les infos d’onboarding de l’utilisateur

-- POST /api/checklist/generate -> générer des tâches via l’IA selon l’onboarding
-- GET /api/checklist -> lister toutes les tâches visibles de l’utilisateur
-- PATCH /api/checklist/:id -> modifier une tâche (titre, description, priorité…)
-- PATCH /api/checklist/:id/hide -> masquer une tâche IA sans la supprimer
-- PATCH /api/checklist/:id/status -> changer uniquement le statut de la tâche
-- PATCH /api/checklist/editDate -> changer la date du mariage & regénérez la checklist entière
-- POST /api/checklist/custom -> ajouter une tâche manuelle
-- DELETE /api/checklist/:id -> supprimer une tâche personnalisée
-- DELETE /api/checklist -> supprimer toutes les tâches de l’utilisateur


POST /api/stripe/checkout-session -> créer une session de paiement Stripe (premium)
POST /api/stripe/webhook -> recevoir les événements Stripe (paiement réussi, etc.)
