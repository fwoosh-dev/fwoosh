#!/usr/bin/env node

import copy from "copy-template-dir";
import path from "path";
import fs from "fs";
import { paramCase, pascalCase } from "change-case";
import { titleCase } from "title-case";
import { log } from "@fwoosh/utils";
const [, , name, description] = process.argv;

const { version } = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../lerna.json"), "utf8")
);
const inDir = path.join(__dirname, "./template");
const kebab = paramCase(name);
const outDir = path.join(__dirname, "../../packages", kebab);
const TSCONFIG = path.join(__dirname, "../../tsconfig.dev.json");

fs.mkdirSync(outDir);

const vars = {
  description,
  version,
  title: titleCase(name),
  kebab,
  pascal: pascalCase(name),
};

copy(inDir, outDir, vars, (err, createdFiles) => {
  if (err) {
    throw err;
  }

  createdFiles.forEach((filePath) =>
    log.log(`Created ${path.relative(outDir, filePath)}`)
  );
  log.success(`Created @auto-it/${kebab} package!`);
});

fs.readFile(TSCONFIG, "utf8", (err, data) => {
  if (err) {
    throw err;
  }

  const json = JSON.parse(data);

  json.references.push({
    path: `packages/${kebab}`,
  });

  fs.writeFileSync(TSCONFIG, JSON.stringify(json, null, 2));
  log.success(`Updated tsconfig.dev.json!`);
});
