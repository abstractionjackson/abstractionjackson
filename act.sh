#!/bin/bash

# Default to current date and time
current_date=$(date '+%Y-%m-%d')
current_time=$(date '+%H:%M:%S')
timezone=$(date '+%z')

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -d|--date)
            current_date="$2"
            shift 2
            ;;
        -t|--time)
            current_time="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [-d|--date YYYY-MM-DD] [-t|--time HH:MM:SS]"
            echo "  -d, --date    Date in YYYY-MM-DD format (default: current date)"
            echo "  -t, --time    Time in HH:MM:SS format (default: current time)"
            echo "  -h, --help    Show this help message"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use -h or --help for usage information"
            exit 1
            ;;
    esac
done

# Validate date format
if ! date -j -f "%Y-%m-%d" "$current_date" >/dev/null 2>&1; then
    echo "Error: Invalid date format. Use YYYY-MM-DD"
    exit 1
fi

# Validate time format
if ! date -j -f "%H:%M:%S" "$current_time" >/dev/null 2>&1; then
    echo "Error: Invalid time format. Use HH:MM:SS"
    exit 1
fi

# Construct the datetime in ISO format
current_datetime="${current_date}T${current_time}${timezone}"

# Create the date-level directory structure if it doesn't exist
date_index_path="content/activity/${current_date}/_index.org"
if [ ! -f "${date_index_path}" ]; then
    # Create the directory
    mkdir -p "content/activity/${current_date}"
    
    # Create _index.org for the date level
    cat > "${date_index_path}" << EOF
#+TITLE: ${current_date}
#+DATE: ${current_datetime}
#+DESCRIPTION: Activities for $(date -j -f "%Y-%m-%d" "$current_date" "+%B %d, %Y")
#+DRAFT: true
EOF
    echo "Created date section at: activity/${current_date}/_index.org"
fi

# Create the datetime content
content_path="activity/${current_date}/${current_datetime}"
hugo new "${content_path}"

echo "Created new activity content at: ${content_path}"
echo "Date: ${current_date}"
echo "Time: ${current_time}"
echo "Full datetime: ${current_datetime}"