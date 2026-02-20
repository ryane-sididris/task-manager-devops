output "lambda_test_role_arn" {
  value = module.iam_roles.lambda_test_role_arn
}

output "lambda_plan_role_arn" {
  value = module.iam_roles.lambda_deploy_plan_role_arn
}

output "lambda_apply_role_arn" {
  value = module.iam_roles.lambda_deploy_apply_role_arn
}

