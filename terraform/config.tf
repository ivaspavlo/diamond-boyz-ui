terraform {

  backend "s3" {
    region               = "us-east-1"
    bucket               = "am-wallet-dev-terraform-remote-state"
    workspace_key_prefix = "workspaces"
    key                  = "am-frontend/frontend.tfstate"
    encrypt              = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.64.2"
    }
  }
}

provider "aws" {
  region = lookup(var.aws_region, local.env)
}
