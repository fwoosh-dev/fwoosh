import { create } from "./create";

const [, , name, description] = process.argv;

create({ name, description, type: "plugin" });
