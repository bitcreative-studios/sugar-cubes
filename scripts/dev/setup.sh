#!/usr/bin/env bash

# --- Command line
current_project=$1

current_branch=$(git branch | grep "\*" | cut -d ' ' -f2)

frontloops_root="./cubes/frontloops"
pattern_syntax="(\e[95mmrkup\e[0m|\e[95melmnt\e[0m)-L0[\e[95m1-3\e[0m]-S[\e[95m01-10\e[0m]"

# shellcheck disable=SC2166
if [ -z "$current_project" -a "$current_branch" = "master" ]; then
    echo -e "Please switch to an existing branch or create a new one with \e[33;1m\`yarn dev -- <pattern>\`\e[0m"
    echo -e "pattern: $pattern_syntax\n"
    exit 1
fi

# force me to stash or commit changes
# if changing branches in a dirty non-master branch
#shellcheck disable=SC2166
if [ "$current_project" != "$current_branch" -a -n "$(git status -s)" ]; then
  echo -e "\e[31mYou need to clean up after yourself first!\e[0m"
  echo -e "either \e[33mcommit or stash\e[0m your changes before switching to $current_project"
  exit 1
fi


# split current_project into [<series>,<loop>,<step>]
# the color code for green
current_series=$( echo "$current_project" | cut -d '-' -f1)
current_loop=$( echo "$current_project" | cut -d '-' -f2)
current_step=$( echo "$current_project" | cut -d '-' -f3)

if [ "$current_series" = "mrkup" ]; then
  series_folder="markup"
  else
    series_folder="elements"
fi

# shellcheck disable=SC2001
loop_folder="loop-$(echo "$current_loop" | sed 's/[A-Z]*//g')"
# shellcheck disable=SC2001
step_folder="step-$(echo "$current_step" | sed 's/[A-Z]*//g')"

current_project_root=$frontloops_root/$series_folder/$loop_folder/$step_folder

echo -e "exporting project environment variables in \e[34m.env.development\e[0m"
echo CURRENT_STEP_ROOT="$current_project_root" > ".env.development"
echo CURRENT_STEP_ENTRY="$current_project_root/main.js" >> ".env.development"
echo CURRENT_STEP_INDEX="$current_project_root/index.html" >> ".env.development"

echo -e "creating project in \e[34m$current_project_root\e[0m"
#mkdir -p "$current_series/$current_loop/$current_step"

echo -e "creating project files "
echo cwd
#echo "Starting development on \033[0;32m$current_project\033[0m"
yarn run server
exit 0
