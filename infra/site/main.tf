terraform {
  required_version = "= 1.16.5"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 6.64.0" }
  }
  backend "s3" {}
}
provider "aws" { region = "us-east-2" }
provider "aws" {
  alias  = "edge"
  region = "us-east-1"
}
variable "bucket_name" { type = string }
variable "certificate_arn" { type = string }
variable "release_id" {
  type = string
  validation {
    condition     = can(regex("^[a-f0-9]{40}$", var.release_id))
    error_message = "Use the full deployed Git commit SHA."
  }
}
resource "aws_s3_bucket" "site" {
  bucket = var.bucket_name
  tags   = { Project = "portfolio-landing-page", Environment = "production" }
  lifecycle { prevent_destroy = true }
}
resource "aws_s3_bucket_public_access_block" "site" {
  bucket                  = aws_s3_bucket.site.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
resource "aws_s3_bucket_server_side_encryption_configuration" "site" {
  bucket = aws_s3_bucket.site.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}
resource "aws_s3_bucket_versioning" "site" {
  bucket = aws_s3_bucket.site.id
  versioning_configuration { status = "Enabled" }
}
resource "aws_cloudfront_origin_access_control" "site" {
  provider                          = aws.edge
  name                              = "portfolio-landing-page-production"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}
resource "aws_cloudfront_function" "routes" {
  provider = aws.edge
  name     = "portfolio-landing-page-routes"
  runtime  = "cloudfront-js-2.0"
  publish  = true
  code     = templatefile("${path.module}/routes-function.js.tftpl", { release_id = var.release_id })
}
resource "aws_cloudfront_response_headers_policy" "site" {
  provider = aws.edge
  name     = "portfolio-landing-page-security"
  security_headers_config {
    content_type_options { override = true }
    frame_options {
      frame_option = "DENY"
      override     = true
    }
    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }
    strict_transport_security {
      access_control_max_age_sec = 31536000
      include_subdomains         = true
      override                   = true
    }
    content_security_policy {
      content_security_policy = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://formspree.io; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action https://formspree.io"
      override                = true
    }
  }
}
resource "aws_cloudfront_distribution" "site" {
  provider            = aws.edge
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Gabriel Nicholas portfolio"
  aliases             = ["gabrielnicholas.site", "www.gabrielnicholas.site"]
  default_root_object = "index.html"
  price_class         = "PriceClass_100"
  wait_for_deployment = true
  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "private-s3"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }
  default_cache_behavior {
    target_origin_id           = "private-s3"
    viewer_protocol_policy     = "redirect-to-https"
    allowed_methods            = ["GET", "HEAD", "OPTIONS"]
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    min_ttl                    = 0
    default_ttl                = 60
    max_ttl                    = 31536000
    response_headers_policy_id = aws_cloudfront_response_headers_policy.site.id
    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }
    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.routes.arn
    }
  }
  restrictions {
    geo_restriction { restriction_type = "none" }
  }
  viewer_certificate {
    acm_certificate_arn      = var.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
  tags = { Project = "portfolio-landing-page", Environment = "production" }
  lifecycle { prevent_destroy = true }
}
resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      { Sid    = "CloudFrontOnly", Effect = "Allow", Principal = { Service = "cloudfront.amazonaws.com" },
        Action = "s3:GetObject", Resource = "${aws_s3_bucket.site.arn}/releases/*",
      Condition = { StringEquals = { "AWS:SourceArn" = aws_cloudfront_distribution.site.arn } } },
      { Sid      = "TLSOnly", Effect = "Deny", Principal = "*", Action = "s3:*",
        Resource = [aws_s3_bucket.site.arn, "${aws_s3_bucket.site.arn}/*"],
      Condition = { Bool = { "aws:SecureTransport" = "false" } } }
    ]
  })
}
output "distribution_id" { value = aws_cloudfront_distribution.site.id }
output "distribution_arn" { value = aws_cloudfront_distribution.site.arn }
output "cloudfront_domain" { value = aws_cloudfront_distribution.site.domain_name }
output "site_bucket" { value = aws_s3_bucket.site.id }

output "function_arn" { value = aws_cloudfront_function.routes.arn }
