locals {
  env = terraform.workspace
}

variable "bucket_name" {
  type = map(string)
  default = {
    prod = "app.diamondswap.io"
    dev  = "app.dev.diamondswap.io"
  }
}

variable "endpoint" {
  type = map(string)
  default = {
    prod = "diamondswap.dbzcoin.com"
    dev  = "diamondswap.dev.dbzcoin.com"
  }
}

variable "project_name" {
  type    = string
  default = "am-wallet"
}

variable "service_name" {
  type    = string
  default = "diamondswap"
}

variable "domain_name" {
  type = map(string)
  default = {
    prod = "dbzcoin.com"
    dev  = "dev.dbzcoin.com"
  }
}

variable "region" {
  type = map(string)
  default = {
    prod = "us-east-1"
    dev  = "us-east-1"
  }
}
