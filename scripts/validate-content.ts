import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { resumeSchema } from "@/data/resume";

async function main() {
  const filePath = path.resolve(process.cwd(), "content/resume.json");

  try {
    const contents = await readFile(filePath, "utf-8");
    const parsed = JSON.parse(contents);
    resumeSchema.parse(parsed);
    console.log("✅ Resume content is valid.");
  } catch (error) {
    console.error("❌ Resume content validation failed.");
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    process.exitCode = 1;
  }
}

void main();

