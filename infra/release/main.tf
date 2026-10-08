terraform {
  required_version = "= 1.16.5"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 6.64.0" }
  }
  backend "s3" {}
}
provider "aws" { region = "us-east-2" }
variable "bucket_name" { type = string }
variable "release_id" {
  type = string
  validation {
    condition     = can(regex("^[a-f0-9]{40}$", var.release_id))
    error_message = "Use the full Git commit SHA for an immutable release."
  }
}
locals {
  build_dir = "${path.module}/../../dist"
  files     = fileset(local.build_dir, "**")
  mime_types = {
    html = "text/html; charset=utf-8", js = "application/javascript", css = "text/css",
    json = "application/json", svg = "image/svg+xml", ico = "image/x-icon",
    jpg  = "image/jpeg", jpeg = "image/jpeg", png = "image/png", webp = "image/webp",
    ttf  = "font/ttf", woff2 = "font/woff2", pdf = "application/pdf", txt = "text/plain"
  }
}
resource "aws_s3_object" "release" {
  for_each               = local.files
  bucket                 = var.bucket_name
  key                    = "releases/${var.release_id}/${each.value}"
  source                 = "${local.build_dir}/${each.value}"
  source_hash            = filemd5("${local.build_dir}/${each.value}")
  content_type           = lookup(local.mime_types, element(reverse(split(".", each.value)), 0), "application/octet-stream")
  cache_control          = startswith(each.value, "assets/") ? "public,max-age=31536000,immutable" : "public,max-age=60,must-revalidate"
  server_side_encryption = "AES256"
  lifecycle { prevent_destroy = true }
}
output "release_id" { value = var.release_id }
