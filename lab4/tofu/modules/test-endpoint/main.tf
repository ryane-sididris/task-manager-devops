variable "endpoint" {
  type = string
}

data "http" "test_endpoint" {
  url = var.endpoint
}

output "status_code" {
  value = data.http.test_endpoint.status_code
}

output "response_body" {
  value = data.http.test_endpoint.response_body
}
