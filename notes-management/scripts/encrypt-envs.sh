#!/bin/bash

# Check if the password is provided as a command-line argument
if [ -z "$1" ]; then
    echo -e "\e[31mUnable to encrypt. Please provide a password.\e[0m"
    exit 1
fi

# Check if the environment name is provided as a command-line argument
if [ -z "$2" ]; then
    echo -e "\e[31mUnable to encrypt. Please provide an environment name.\e[0m"
    exit 1
fi

# Define the encryption password from the first command-line argument
ENCRYPTION_PASSWORD="$1"
# Define the environment name from the second command-line argument
ENVIRONMENT_NAME="$2"

# Go to root folder
cd ../../..

# Find all .env files with the specified environment name and encrypt them
find . -type f -name ".env.$ENVIRONMENT_NAME" ! -name "*.enc" | while read -r env_file; do
    # Encrypt the file
    openssl enc -aes-256-cbc -salt -pbkdf2 -in "$env_file" -out "${env_file}.enc" -pass pass:$ENCRYPTION_PASSWORD
    echo -e "Encrypted \033[95m$env_file\033[0m to \033[94m${env_file}.enc\033[0m"
done
