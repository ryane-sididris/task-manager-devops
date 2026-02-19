// utils.js - Fonctions utilitaires

/**
 * Valide qu'une chaîne est un nombre
 */
function isValidNumber(str) {
  // Vérifier que la chaîne n'est pas vide
  if (str === '' || str === null || str === undefined) {
    return false;
  }
  
  // Convertir en nombre
  const num = parseFloat(str);
  
  // Vérifier que c'est un nombre valide et fini
  if (isNaN(num) || !isFinite(num)) {
    return false;
  }
  
  // IMPORTANT : Vérifier que toute la chaîne a été convertie
  // parseFloat('5a') retourne 5, mais on veut rejeter '5a'
  // On vérifie que la conversion en string du nombre redonne la même chose
  if (String(num) !== String(str).trim()) {
    return false;
  }
  
  return true;
}

/**
 * Calcule la somme de deux nombres
 */
function add(a, b) {
  return a + b;
}

/**
 * Calcule le produit de deux nombres
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Formate une réponse d'erreur
 */
function formatError(message) {
  return {
    error: 'Invalid input',
    message: message
  };
}

/**
 * Formate une réponse de succès pour une opération
 */
function formatResult(operation, a, b, result) {
  return {
    operation,
    a,
    b,
    result
  };
}

module.exports = {
  isValidNumber,
  add,
  multiply,
  formatError,
  formatResult
};
