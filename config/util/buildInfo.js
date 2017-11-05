var pkg = require('../../package.json');
var fs = require('fs');

var exec = require('child_process').exec;
var gitBranchCmd = 'git branch | grep \\* | cut -d \' \' -f2';
var gitHashCmd = 'git rev-parse --short HEAD';
var gitLastCommit = 'git log --name-status HEAD^..HEAD';

module.exports = function(callback) {
  var build = {
    git: {}
  };

  // 1) Inject package.json
  build.version = pkg.version;
  build.package = pkg;

  // 2) Inject git branch
  exec(gitBranchCmd, function(error, stdout, stderr) {
    build.git.branch = stdout.replace('\n', '');

    // 3) Inject git hash
    exec(gitHashCmd, function(error, stdout, stderr) {
      build.git.commitHash = stdout.replace('\n', '');

      // 3) Inject git hash
      exec(gitLastCommit, function(error, stdout, stderr) {
        build.git.commitDetails = stdout.split('\n');

        callback(build);
      });
    });
  });
};