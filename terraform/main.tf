module "s3" {
  source = "git::git@bitbucket.org:DiamondDBZswap/terraform-module-s3-cloudfront.git?ref=v1.1.5"

  region      = lookup(var.region, local.env)
  bucket_name = lookup(var.bucket_name, local.env)
  endpoint    = lookup(var.endpoint, local.env)
  domain_name = lookup(var.domain_name, local.env)


  project_name = var.project_name
  service_name = var.service_name

}
