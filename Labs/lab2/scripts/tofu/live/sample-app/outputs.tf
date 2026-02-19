output "public_ips" {
  description = "Public IPs of all instances"
  value       = { for name, m in module.sample_app : name => m.public_ip }
}

output "app_urls" {
  description = "App URLs for all instances"
  value       = { for name, m in module.sample_app : name => "http://${m.public_ip}:${var.instances[name].port}" }
}
