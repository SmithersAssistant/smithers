const fs = require('fs');
const path = require('path');

const sourcePath = path.resolve('package.json');
const targetPath = path.resolve('app', 'package.json');

const sourcePackage = require(sourcePath);
const targetPackage = require(targetPath) || {};

targetPackage.name = sourcePackage.name;
targetPackage.productName = sourcePackage.name;
targetPackage.version = sourcePackage.version;
targetPackage.license = sourcePackage.license;
targetPackage.author = sourcePackage.author;
targetPackage.repository = sourcePackage.repository;
targetPackage.description = sourcePackage.description;
targetPackage.dependencies = sourcePackage.dependencies;

fs.writeFileSync(targetPath, JSON.stringify(targetPackage, null, '  '), 'utf8');
