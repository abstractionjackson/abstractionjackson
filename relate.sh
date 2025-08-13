#!/bin/bash

# Usage: ./relate.sh <term_name> <from_term> belongsTo <to_term>
# Usage: ./relate.sh <term_name> <from_term> has <to_term>
# Example: ./relate.sh tag bash belongsTo shell  (bash belongsTo shell)
# Example: ./relate.sh tag shell has bash  (shell has bash)

set -e

if [ $# -ne 4 ]; then
    echo "Usage: $0 <term_name> <from_term> <relationship> <to_term>"
    echo "  relationship can be 'belongsTo' or 'has'"
    echo "Example: $0 tag bash belongsTo shell  (bash belongsTo shell)"
    echo "Example: $0 tag shell has bash  (shell has bash)"
    exit 1
fi

TERM_NAME="$1"
FROM_TERM="$2"
RELATIONSHIP="$3"
TO_TERM="$4"

# Validate relationship
if [[ "$RELATIONSHIP" != "belongsTo" && "$RELATIONSHIP" != "has" ]]; then
    echo "Error: Relationship must be 'belongsTo' or 'has'"
    exit 1
fi

# Create data/terms directory if it doesn't exist
mkdir -p data/terms

# JSON file path
JSON_FILE="data/terms/${TERM_NAME}.json"

# Initialize JSON file if it doesn't exist
if [ ! -f "$JSON_FILE" ]; then
    echo "{}" > "$JSON_FILE"
fi

# Use jq to update the JSON structure with bidirectional relationships
# Set inverse relationship based on the relationship type
if [[ "$RELATIONSHIP" == "belongsTo" ]]; then
    INVERSE_RELATIONSHIP="has"
else
    INVERSE_RELATIONSHIP="belongsTo"
fi

jq --arg from_term "$FROM_TERM" \
   --arg to_term "$TO_TERM" \
   --arg relationship "$RELATIONSHIP" \
   --arg inverse_relationship "$INVERSE_RELATIONSHIP" \
   '
   # Ensure both terms exist with both relationship arrays
   if has($from_term) | not then
     .[$from_term] = {"belongsTo": [], "has": []}
   else
     if .[$from_term].belongsTo == null then .[$from_term].belongsTo = [] end |
     if .[$from_term].has == null then .[$from_term].has = [] end
   end |
   
   if has($to_term) | not then
     .[$to_term] = {"belongsTo": [], "has": []}
   else
     if .[$to_term].belongsTo == null then .[$to_term].belongsTo = [] end |
     if .[$to_term].has == null then .[$to_term].has = [] end
   end |
   
   # Add the primary relationship (from_term -> to_term)
   if (.[$from_term][$relationship] | contains([$to_term]) | not) then
     .[$from_term][$relationship] += [$to_term]
   else
     .
   end |
   
   # Add the inverse relationship (to_term -> from_term)
   if (.[$to_term][$inverse_relationship] | contains([$from_term]) | not) then
     .[$to_term][$inverse_relationship] += [$from_term]
   else
     .
   end
   ' "$JSON_FILE" > "${JSON_FILE}.tmp" && mv "${JSON_FILE}.tmp" "$JSON_FILE"

echo "Updated $JSON_FILE: $FROM_TERM $RELATIONSHIP $TO_TERM"
echo "Also added inverse relationship: $TO_TERM $INVERSE_RELATIONSHIP $FROM_TERM"

# Pretty print the updated structure for both affected terms
echo "Current relationships for $FROM_TERM:"
jq --arg from_term "$FROM_TERM" '.[$from_term]' "$JSON_FILE"

echo "Current relationships for $TO_TERM:"
jq --arg to_term "$TO_TERM" '.[$to_term]' "$JSON_FILE"
