import swc from "@swc/core";
import { promises as fs } from "fs";
import { paramCase, capitalCase } from "change-case";
import glob from "fast-glob";
import path from "path";
export async function getStories({ stories, outDir, }) {
    const files = await glob(stories, {
        ignore: [`${outDir}/**`],
    });
    return Promise.all(files.map(async (file) => {
        const contents = await fs.readFile(file, "utf8");
        const ast = await swc.parse(contents, {
            syntax: "typescript",
            tsx: true,
            comments: false,
            script: true,
        });
        const exports = ast.body.filter((node) => node.type === "ExportDeclaration");
        const metaDeclaration = exports.find((e) => "declaration" in e &&
            e.declaration.type === "VariableDeclaration" &&
            "value" in e.declaration.declarations[0].id &&
            e.declaration.declarations[0].id.value === "meta");
        const meta = metaDeclaration.declaration.declarations[0].init.properties.reduce((acc, property) => ({
            ...acc,
            [property.key.value]: property.value.value,
        }), {});
        const storiesDeclarations = exports.filter((e) => e !== metaDeclaration);
        const fullPath = path.resolve(file);
        const stories = storiesDeclarations
            .map((d) => d.declaration.declarations[0].id.value)
            .map((exportName) => ({
            exportName,
            title: capitalCase(exportName),
            slug: `${paramCase(meta.title)}--${paramCase(exportName)}`,
            file: fullPath,
        }));
        return { stories, meta };
    }));
}
