#!/bin/bash

# Session Activity Logger Hook
# Creates timestamped logs with detailed file change info

TIMESTAMP=$(date '+%H:%M:%S')
DATESTAMP=$(date '+%Y-%m-%d')
LOG_DIR=".claude/logs"
LOG_FILE="$LOG_DIR/session-$DATESTAMP.log"

# Ensure log directory exists
mkdir -p "$LOG_DIR" 2>/dev/null

# Get file stats from git diff
FILE_STATS=""
TOTAL_ADDED=0
TOTAL_DELETED=0

if git rev-parse --git-dir > /dev/null 2>&1; then
    FILE_STATS=$(git diff --numstat 2>/dev/null | head -20)

    # Calculate totals
    TOTAL_ADDED=$(echo "$FILE_STATS" | awk '{sum+=$1} END {print sum+0}')
    TOTAL_DELETED=$(echo "$FILE_STATS" | awk '{sum+=$2} END {print sum+0}')
fi

# Get the last modified file from git
LAST_FILE=""
if [ -n "$FILE_STATS" ]; then
    LAST_FILE=$(echo "$FILE_STATS" | tail -1 | awk '{$1=""; $2=""; print $0}' | sed 's/^[[:space:]]*//')
    # Get the stats for the last file
    LAST_ADDED=$(echo "$FILE_STATS" | tail -1 | awk '{print $1}')
    LAST_DELETED=$(echo "$FILE_STATS" | tail -1 | awk '{print $2}')
fi

# Log entry with details for the most recent file
if [ -n "$LAST_FILE" ]; then
    echo "[$TIMESTAMP] Modified: $LAST_FILE (+$LAST_ADDED/-$LAST_DELETED)" >> "$LOG_FILE"
else
    echo "[$TIMESTAMP] File modified" >> "$LOG_FILE"
fi

# Count total edits this session
EDIT_COUNT=$(wc -l < "$LOG_FILE" 2>/dev/null || echo "0")

echo ""
echo "═══════════════════════════════════════════════════"
echo "  📝 SESSION ACTIVITY LOG"
echo "═══════════════════════════════════════════════════"
echo "  ⏰ Last change: $TIMESTAMP"
echo "  📊 Total edits this session: $EDIT_COUNT"
echo "  🗂️  Log file: logs/session-$DATESTAMP.log"
echo ""

# Show detailed file changes
if [ -n "$FILE_STATS" ]; then
    echo "  📁 File Changes (added/deleted):"
    echo "$FILE_STATS" | while IFS=$'\t' read -r added deleted filename; do
        if [ -n "$filename" ]; then
            printf "    %-40s +%-3s -%-3s\n" "$filename" "$added" "$deleted"
        fi
    done
    echo ""
    echo "  📈 Totals: +$TOTAL_ADDED lines added, -$TOTAL_DELETED lines deleted"
    echo ""
else
    echo "  📁 No files tracked in git diff"
    echo ""
fi

echo "───────────────────────────────────────────────────"
echo "═══════════════════════════════════════════════════"
echo ""
