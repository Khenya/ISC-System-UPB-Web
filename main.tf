provider "aws" {
  region = "us-east-1" 
}

resource "aws_security_group" "isc_web_sg" {
  name        = "isc-web-security-group"
  description = "Security group con puerto 8000 abierto para Node.js"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] 
  }

  ingress {
    description = "Allow HTTP on port 8000"
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] 
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_key_pair" "web_isc_ssh_new" {
  key_name   = "web-isc-ssh-new"
  public_key = file("id_rsa.pub")
}

resource "aws_instance" "isc-web" {
  ami           = "ami-01816d07b1128cd2d" 
  instance_type = "t2.micro" 
  key_name      = aws_key_pair.web-isc-ssh.key_name

  vpc_security_group_ids = [aws_security_group.isc_web_sg.id]

  tags = {
    Name = "ISC-Web"
  }

  provisioner "remote-exec" {
    connection {
      type        = "ssh"
      host        = self.public_ip
      user        = "ec2-user"
      private_key = file("id_rsa") 
    }
    inline = [
      "sudo yum update -y",
      "sudo yum install -y git",
      "curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -",
      "sudo yum install -y nodejs",
      "sudo npm install -g vite", 
      "git clone https://github.com/Khenya/ISC-System-UPB-Web.git",
      "cd ISC-System-UPB-Web && npm install" 
    ]
  }
}
