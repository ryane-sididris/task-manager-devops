variable "name" { type = string }
variable "function_arn" { type = string }
variable "api_gateway_routes" { type = list(string) }

resource "aws_apigatewayv2_api" "api" {
  name          = var.name
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "stage" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "$default"
  auto_deploy = true
}

# --- AJOUT DES RESSOURCES MANQUANTES ---

resource "aws_apigatewayv2_integration" "lambda" {
  api_id           = aws_apigatewayv2_api.api.id
  integration_type = "AWS_PROXY"
  integration_uri  = var.function_arn
}

resource "aws_apigatewayv2_route" "routes" {
  count    = length(var.api_gateway_routes)
  api_id    = aws_apigatewayv2_api.api.id
  route_key = var.api_gateway_routes[count.index]
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

# ---------------------------------------

resource "aws_lambda_permission" "apigw" {
  action        = "lambda:InvokeFunction"
  function_name = var.function_arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}

output "api_endpoint" { 
  value = aws_apigatewayv2_api.api.api_endpoint 
}