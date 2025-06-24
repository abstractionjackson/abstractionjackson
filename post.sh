#!/bin/bash

# Get the desired relative content path from the first argument
content_path_relative="$1"

# Check if a relative path was provided
if [ -z "$content_path_relative" ]; then
  echo "Error: No content path provided."
  echo "Usage: post <relative/path/to/new/content>"
  exit 1
fi

# Use hugo new content to create the file/directory and capture its output (the path)
# Capture standard error as well to check for errors
hugo_output=$(hugo new content "$content_path_relative" 2>&1)

# Check if hugo new content command was successful
# Look for "Error" in the output
if echo "$hugo_output" | grep -q "Error"; then
  echo "Error creating content:"
  echo "$hugo_output"
  exit 1
fi

# Try to extract the absolute path from the output using the provided sed logic
# Assuming the output includes a line like "Content dir "/path/to/file.md" created"
# The sed command extracts the text within the double quotes after "Content dir "
content_path_absolute=$(echo "$hugo_output" | sed -E 's/.*Content dir "(.*)" created.*/\1/')

# If the absolute path wasn't extracted by the first sed attempt, try another pattern
if [ -z "$content_path_absolute" ]; then
  # Assuming the output includes a line like "path/to/file.md created"
  content_path_absolute=$(echo "$hugo_output" | awk '{print $NF}')
fi

# Check if an absolute path was extracted successfully
if [ -z "$content_path_absolute" ]; then
  echo "Error: Could not extract absolute path from Hugo output."
  echo "Hugo output: $hugo_output"
  exit 1
fi

# Echo the extracted absolute path for confirmation
echo "Absolute content path extracted: $content_path_absolute"

# Open the extracted path in Emacs in the background
emacs "$content_path_absolute" &
