#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

// Paths
const templateDir = path.join(__dirname, "templates");
const projectDir = process.cwd();

// Runtime dependencies
const dependencies = [
  "next-auth@beta",
  "@auth/prisma-adapter",
  "@prisma/client",
  "bcryptjs",
  "react-icons",
  "axios",
  "react-hot-toast",
];

// Dev dependencies (TS + Prisma + types)
const devDependencies = [
  "prisma",
  "typescript",
  "@types/node",
  "@types/react",
  "@types/bcryptjs",
];

// Utility: Safe copy for single files
function safeCopyFile(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.copySync(src, dest);
    console.log(`✅ Created: ${path.relative(projectDir, dest)}`);
  } else {
    console.log(`⚠️ Skipped (already exists): ${path.relative(projectDir, dest)}`);
  }
}

// Utility: Merge folders (copy contents but don’t overwrite existing files)
function mergeFolders(srcDir, destDir) {
  fs.ensureDirSync(destDir);
  const items = fs.readdirSync(srcDir);

  items.forEach(item => {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      mergeFolders(srcPath, destPath); // recurse
    } else {
      safeCopyFile(srcPath, destPath);
    }
  });
}

// Install deps
function installDependencies() {
  try {
    if (dependencies.length > 0) {
      console.log("\n📦 Installing dependencies...");
      execSync(`npm install ${dependencies.join(" ")}`, {
        stdio: "inherit",
        cwd: projectDir,
      });
    }

    if (devDependencies.length > 0) {
      console.log("\n⚙️ Installing devDependencies...");
      execSync(`npm install -D ${devDependencies.join(" ")}`, {
        stdio: "inherit",
        cwd: projectDir,
      });
    }

    console.log("\n✅ Dependencies installed successfully!");
  } catch (err) {
    console.error("❌ Failed to install dependencies:", err.message);
  }
}

// Ensure tsconfig.json exists
function ensureTSConfig() {
  const tsConfigPath = path.join(projectDir, "tsconfig.json");

  if (!fs.existsSync(tsConfigPath)) {
    const defaultTSConfig = {
      compilerOptions: {
        target: "esnext",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "node",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true,
        types: ["node"]
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
      exclude: ["node_modules"]
    };

    fs.writeJsonSync(tsConfigPath, defaultTSConfig, { spaces: 2 });
    console.log("✅ Created tsconfig.json");
  } else {
    console.log("⚠️ tsconfig.json already exists, skipping...");
  }
}

// Run Prisma generate
function runPrisma() {
  try {
    console.log("\n🔄 Running Prisma generate...");
    execSync("npx prisma generate", { stdio: "inherit", cwd: projectDir });
    console.log("✅ Prisma client generated!");
  } catch (err) {
    console.error("❌ Failed to run Prisma generate:", err.message);
  }
}

// Main installer
function run() {
  console.log("🚀 Installing mobeen-auth files...\n");

  // 1. Merge prisma schema
  const prismaSrc = path.join(templateDir, "prisma");
  const prismaDest = path.join(projectDir, "prisma");
  mergeFolders(prismaSrc, prismaDest);

  // 2. Merge src (auth, forms, api, etc.)
  const srcSrc = path.join(templateDir, "src");
  const srcDest = path.join(projectDir, "src");
  mergeFolders(srcSrc, srcDest);

  // 3. Copy env.example
  safeCopyFile(
    path.join(templateDir, ".env.example"),
    path.join(projectDir, ".env.example")
  );

  // 4. Install dependencies
  installDependencies();

  // 5. Ensure tsconfig.json exists
  ensureTSConfig();

  // 6. Run Prisma generate
  runPrisma();

  console.log("\n🎉 mobeen-auth setup complete!");
}

run();
