#!/usr/bin/env node

import copy from "copy-template-dir";
import path from "path";
import fs from "fs";
import { paramCase, pascalCase } from "change-case";
import { titleCase } from "title-case";
import { log } from "@fwoosh/utils";
import { app } from "command-line-application";

function create() {
  const result = app({
    name: "create",
    description: "Create a new package in the fwoosh monorepo",
    require: ["type", "name"],
    options: [
      {
        name: "type",
        type: String,
        typeLabel: "package | plugin",
      },
      {
        name: "name",
        type: String,
        defaultOption: true,
        description: "The name of the package being created",
      },
      {
        name: "description",
        type: String,
        description: "A description of the package",
      },
    ],
  });

  if (!result) {
    return;
  }

  if (result.error) {
    throw new result.error();
  }

  const options = result as {
    type: "package" | "plugin";
    name: string;
    description?: string;
  };
  const { version } = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../lerna.json"), "utf8")
  );
  const inDir = path.join(__dirname, "templates", options.type);
  const kebab = paramCase(options.name);
  const folder = options.type === "package" ? "packages" : "plugins";
  const outDir = path.join(__dirname, "../..", folder, kebab);
  const TSCONFIG = path.join(__dirname, "../../tsconfig.dev.json");

  fs.mkdirSync(outDir);

  const vars = {
    description: options.description,
    version,
    title: titleCase(options.name),
    kebab,
    pascal:
      options.type === "plugin"
        ? `${pascalCase(options.name)}Plugin`
        : pascalCase(options.name),
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
      path: path.join(folder, kebab),
    });

    fs.writeFileSync(TSCONFIG, JSON.stringify(json, null, 2));
    log.success(`Updated tsconfig.dev.json!`);
  });
}

create();
