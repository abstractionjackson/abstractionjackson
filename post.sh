#!/bin/bash

# post.sh - A script to create new content in a Hugo site and open it in Emacs

# Get the desired relative content path from the first argument
content_path_relative="$1"

# Check if a relative path was provided
if [ -z "$content_path_relative" ]; then
  echo "Error: No content path provided."
  echo "Usage: post <relative/path/to/new/content>"
  echo "       post plan (creates plan with today's date)"
  exit 1
fi

# Handle special case for "plan" posts
if [ "$content_path_relative" = "plan" ]; then
  # Get today's date in YYYY-MM-DD format
  today_date=$(date +%Y-%m-%d)
  content_path_relative="plan/$today_date"
  
  # Use hugo new content with the plan archetype
  hugo_output=$(hugo new content "$content_path_relative" --kind plan 2>&1)
else
  # Use hugo new content to create the file/directory and capture its output (the path)
  # Capture standard error as well to check for errors
  hugo_output=$(hugo new content "$content_path_relative" 2>&1)
fi

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
