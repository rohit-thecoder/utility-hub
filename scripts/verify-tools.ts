import { allTools, categories, getCategory, getTool } from "../src/data/toolsRegistry";

const failures: string[] = [];
const dedicatedCategories = new Set(["creator-tools", "image-converters"]);

for (const category of categories) {
  if (!getCategory(category.slug)) failures.push(`Missing category resolver for ${category.slug}`);
  if (!category.tools.length) failures.push(`Category ${category.slug} has no tools`);
}

for (const tool of allTools) {
  if (!getTool(tool.slug)) failures.push(`Missing tool resolver for ${tool.slug}`);
  if (!tool.slug || !tool.name || !tool.categorySlug) failures.push(`Invalid identity for ${tool.slug || "unknown tool"}`);
  if (!tool.seoTitle || tool.seoTitle.length > 60) failures.push(`Invalid SEO title for ${tool.slug}`);
  if (tool.metaDescription.length < 120 || tool.metaDescription.length > 180) failures.push(`Invalid meta description for ${tool.slug}`);
  if (!tool.canonical.endsWith(`/tools/${tool.slug}`)) failures.push(`Invalid canonical for ${tool.slug}`);
  if (tool.secondaryKeywords.length < 6 || tool.faqs.length < 4) failures.push(`Incomplete SEO content for ${tool.slug}`);
  if (!dedicatedCategories.has(tool.categorySlug) && !tool.mode) failures.push(`No shared workspace mapping for ${tool.slug}`);
}

const slugs = new Set(allTools.map((tool) => tool.slug));
if (slugs.size !== allTools.length) failures.push("Duplicate tool slugs detected");

if (failures.length) {
  console.error(`Tool verification failed (${failures.length}):\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}

console.log(`Verified ${allTools.length} tool routes across ${categories.length} categories with valid resolvers and SEO fields.`);
