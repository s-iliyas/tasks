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

# Find all .env.enc files and decrypt them
find . -type f -name ".env.$ENVIRONMENT_NAME.enc" | while read -r enc_file; do
    # Decrypt the file
    original_file="${enc_file%.enc}"
    openssl enc -d -aes-256-cbc -pbkdf2 -in "$enc_file" -out "$original_file" -pass pass:$ENCRYPTION_PASSWORD
    echo -e "Decrypted \033[94m$enc_file\033[0m to \033[95m$original_file\033[0m"
done
