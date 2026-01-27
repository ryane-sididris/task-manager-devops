provider "aws" {
  region = "eu-north-1"
}

variable "ami_id" {
  type = string
}

variable "instances" {
  type = map(object({
    instance_type = string
    port          = number
  }))
  default = {
    "sample-app-1" = { instance_type = "t3.micro", port = 8080 }
    "sample-app-2" = { instance_type = "t3.micro", port = 8080 }
  }
}

module "sample_app" {
  for_each      = var.instances
  source = "github.com/yanis-nouili/devops_base.git//lab2/scripts/tofu/modules/ec2-instance?ref=v1.0.1"
  ami_id        = var.ami_id
  name          = each.key
  instance_type = each.value.instance_type
  port          = each.value.port
}
