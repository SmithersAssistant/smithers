var fs = require('fs');
var path = require('path');

var sourcePath = path.resolve('package.json');
var targetPath = path.resolve('app', 'package.json');

var sourcePackage = require(sourcePath);
var targetPackage = require(targetPath) || {};

targetPackage.name = sourcePackage.name;
targetPackage.productName = sourcePackage.name;
targetPackage.version = sourcePackage.version;
targetPackage.license = sourcePackage.license;
targetPackage.author = sourcePackage.author;
targetPackage.repository = sourcePackage.repository;
targetPackage.description = sourcePackage.description;
targetPackage.dependencies = sourcePackage.dependencies;

fs.writeFileSync(targetPath, JSON.stringify(targetPackage, null, '  '), 'utf8');
