terraform {
  backend "s3" {
    bucket         = "ryan-bucket-state-td5-fin"
    key            = "devops-td5/lambda-sample/terraform.tfstate"
    region         = "us-east-2"
    encrypt        = true
  }
}