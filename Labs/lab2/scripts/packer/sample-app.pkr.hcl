packer {
  required_plugins {
    amazon = {
      version = ">= 1.3.1"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

source "amazon-ebs" "amazon_linux" {
  ami_name        = "sample-app-packer-${uuidv4()}"
  ami_description = "Amazon Linux 2 AMI with a Node.js sample app."
  instance_type   = "t3.micro"
  region          = "eu-north-1"
  # on met une Amazon Linux 2 trouvée automatiquement ensuite si besoin
  source_ami_filter {
    filters = {
      name                = "al2023-ami-*-x86_64"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    owners      = ["amazon"]
    most_recent = true
  }

  ssh_username = "ec2-user"
}

build {
  sources = ["source.amazon-ebs.amazon_linux"]

  provisioner "file" {
    source      = "app.js"
    destination = "/home/ec2-user/app.js"
  }
  provisioner "shell" {
    inline = [
      "set -euxo pipefail",
      "sudo dnf -y update",

      # On n'installe PAS curl (sinon conflit curl-minimal)
      "sudo dnf -y install tar xz",

      "cd /tmp",
      "curl -fsSLO https://nodejs.org/dist/v20.11.1/node-v20.11.1-linux-x64.tar.xz",
      "sudo mkdir -p /usr/local/lib/nodejs",
      "sudo tar -xJf node-v20.11.1-linux-x64.tar.xz -C /usr/local/lib/nodejs",

      "sudo ln -sf /usr/local/lib/nodejs/node-v20.11.1-linux-x64/bin/node /usr/local/bin/node",
      "sudo ln -sf /usr/local/lib/nodejs/node-v20.11.1-linux-x64/bin/npm  /usr/local/bin/npm",
      "sudo ln -sf /usr/local/lib/nodejs/node-v20.11.1-linux-x64/bin/npx  /usr/local/bin/npx",

      "node -v",
      "npm -v"
    ]
    pause_before = "10s"
  }

}
