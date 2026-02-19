# Test pour vérifier la gestion des erreurs
run "deploy" {
  command = apply
}

run "test_404_error" {
  command = apply
  
  module {
    source = "../../modules/test-endpoint"
  }
  
  variables {
    # Tester un endpoint qui n'existe pas
    endpoint = replace(run.deploy.api_endpoint, "/hello", "/nonexistent")
  }
  
  # Vérifier qu'on obtient bien une erreur 403 ou 404
  assert {
    condition     = data.http.test_endpoint.status_code == 403 || data.http.test_endpoint.status_code == 404
    error_message = "Expected 403 or 404 for non-existent path, got: ${data.http.test_endpoint.status_code}"
  }
}