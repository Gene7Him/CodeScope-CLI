#!/bin/bash

# Read matrix input as a single string
read -r input

# Remove outer brackets and split into rows
rows=$(echo "$input" | sed 's/\],\[/\n/g; s/\[//g; s/\]//g')

# Convert rows to a 2D array
declare -a matrix
row_index=0
while IFS=',' read -ra numbers; do
    for ((i = 0; i < ${#numbers[@]}; i++)); do
        matrix[$i]+="${matrix[$i]:+,}${numbers[$i]}"
    done
    ((row_index++))
done <<< "$rows"

# Print transpose
output=""
for ((i = 0; i < ${#matrix[@]}; i++)); do
    output+="${output:+,}[${matrix[$i]}]"
done
echo "$output"
