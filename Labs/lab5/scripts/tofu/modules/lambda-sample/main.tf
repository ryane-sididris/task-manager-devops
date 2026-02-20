variable "name" { type = string }
variable "src_dir" { type = string }
variable "runtime" { type = string }
variable "handler" { type = string }
variable "memory_size" { type = number }
variable "timeout" { type = number }
variable "environment_variables" { type = map(string) }

resource "aws_lambda_function" "func" {
  function_name = var.name
  role          = aws_iam_role.lambda.arn
  handler       = var.handler
  runtime       = var.runtime
  memory_size   = var.memory_size
  timeout       = var.timeout

  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  environment { variables = var.environment_variables }
}

resource "aws_iam_role" "lambda" {
  name = "${var.name}-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{ Action = "sts:AssumeRole", Effect = "Allow", Principal = { Service = "lambda.amazonaws.com" } }]
  })
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = var.src_dir
  output_path = "${path.module}/lambda.zip"
}

output "function_arn" { value = aws_lambda_function.func.arn }