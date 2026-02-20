provider "aws" {
  region = "us-east-1"
}

# 1. On configure le lien OIDC (GitHub <-> AWS)
# On pointe vers le dossier local que j'ai vu sur tes screenshots
module "oidc_provider" {
  source       = "../../modules/github-aws-oidc"
  provider_url = "https://token.actions.githubusercontent.com"
}

# 2. On crée les rôles (Permissions)
module "iam_roles" {
  source = "../../modules/gh-actions-iam-roles"

  name                        = "lambda-sample"
  oidc_provider_arn           = module.oidc_provider.oidc_provider_arn
  enable_iam_role_for_testing = true
  enable_iam_role_for_plan    = true
  enable_iam_role_for_apply   = true
  
  
  # Mets ton "PseudoGitHub/NomDuRepo" (ex: "Ryan/devops-lab-5")
  github_repo = "ryane-sididris/devops_td5" 
  
  # Invente un nom unique (ex: ryan-state-td5-12345)
  tofu_state_bucket = "ryane-state-td5-12345" 
  
  # Invente un nom unique (ex: ryan-lock-td5)
  tofu_state_dynamodb_table = "ryane-lock-td5"
  
  # ---------------------------------------------------

  lambda_base_name = "lambda-sample"
}