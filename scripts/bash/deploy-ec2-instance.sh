#!/usr/bin/env bash
set -e

REGION="eu-north-1"
AMI_ID=$(aws ec2 describe-images \
  --owners amazon \
  --filters "Name=name,Values=al2023-ami-*-x86_64" \
  --query 'Images | sort_by(@, &CreationDate)[-1].ImageId' \
  --region $REGION \
  --output text)

SG_ID=$(aws ec2 create-security-group \
  --group-name devops-lab2-sg \
  --description "DevOps Lab 2 SG" \
  --region $REGION \
  --query 'GroupId' \
  --output text)

aws ec2 authorize-security-group-ingress \
  --group-id $SG_ID \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0 \
  --region $REGION

INSTANCE_ID=$(aws ec2 run-instances \
  --image-id $AMI_ID \
  --instance-type t3.micro \
  --security-group-ids $SG_ID \
  --user-data file://user-data.sh \
  --region $REGION \
  --query 'Instances[0].InstanceId' \
  --output text)

aws ec2 wait instance-running \
  --instance-ids $INSTANCE_ID \
  --region $REGION

PUBLIC_IP=$(aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --region $REGION \
  --query 'Reservations[0].Instances[0].PublicIpAddress' \
  --output text)

echo "Instance ID: $INSTANCE_ID"
echo "Public IP: $PUBLIC_IP"
echo "Open http://$PUBLIC_IP"
