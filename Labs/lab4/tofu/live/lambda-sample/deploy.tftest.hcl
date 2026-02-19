run "deploy" {
  command = apply
}

run "validate" {
  command = apply
  
  module {
    source = "../../modules/test-endpoint"
  }
  
  variables {
    endpoint = run.deploy.api_endpoint
  }
  
  # Test 1 : Vérifier le status code
  assert {
    condition     = data.http.test_endpoint.status_code == 200
    error_message = "Expected status 200, got: ${data.http.test_endpoint.status_code}"
  }
  
  # Test 2 : Vérifier que la réponse est du JSON valide
  assert {
    condition     = can(jsondecode(data.http.test_endpoint.response_body))
    error_message = "Response body is not valid JSON: ${data.http.test_endpoint.response_body}"
  }
  
  # Test 3 : Vérifier le contenu du JSON - message
  assert {
    condition     = jsondecode(data.http.test_endpoint.response_body).message == "Hello from Lambda!"
    error_message = "Unexpected message in JSON response"
  }
  
  # Test 4 : Vérifier le statut dans le JSON
  assert {
    condition     = jsondecode(data.http.test_endpoint.response_body).status == "success"
    error_message = "Expected status 'success' in JSON"
  }
  
  # Test 5 : Vérifier la version
  assert {
    condition     = jsondecode(data.http.test_endpoint.response_body).version == "2.0"
    error_message = "Expected version '2.0' in JSON"
  }
}