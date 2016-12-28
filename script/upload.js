#!/usr/bin/env node

const path = require('path');
/* eslint no-empty: 0  no-console:0 */
if (!process.env.PREBUILD_TOKEN) {
  require('dotenv').config({path: path.join(__dirname, '..', '.env')});
}

const github = require('github-from-package');
const ghreleases = require('ghreleases');
const pkg = require('../package.json');
const glob = require('glob');

const url = github(pkg);
if (!url) {
  console.warn('Could not parse GitHub repo details from package.json.  Skipping upload.');
  process.exit(0);
}

const token = process.env.PREBUILD_TOKEN;
if (!token) {
  console.warn('PREBUILD_TOKEN environment variable not set.  Skipping upload.');
  process.exit(0);
}

const abortIfError = (err) => {
  if (!err) return;
  console.error(err);
  process.exit(1);
};

const user = url.split('/')[3];
const repo = url.split('/')[4];
const auth = {
  user: 'x-oauth',
  token: token
};

const tag = `v${pkg.version}`;
const files = glob.sync('prebuilds/*');

if (files.length === 0) {
  console.warn('../prebuilds is empty.  Skipping upload.');
  process.exit(0);
}

ghreleases.create(auth, user, repo, {tag_name: tag}, function() {
  ghreleases.getByTag(auth, user, repo, tag, function(err, release) {
    abortIfError(err);

    var assets = release.assets.map(function(asset) {
      return asset.name;
    });

    var filtered = files.filter(function(file) {
      return !assets.some(function(asset) {
        return asset === path.basename(file);
      });
    });

    ghreleases.uploadAssets(auth, user, repo, 'tags/' + tag, filtered, function(_err) {
      abortIfError(_err);
      console.log(`Assets uploaded to ${tag}:`, {new: filtered, existing: assets});
      console.log(`\n\nhttps://github.com/${user}/${repo}/releases/${tag}`);
    });
  });
});
