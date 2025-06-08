#!/bin/bash

echo "Installing dependencies..."
bundle install

echo "Building and serving the site..."
bundle exec jekyll serve --livereload --drafts

echo "Site will be available at http://localhost:4000" 