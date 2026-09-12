/**
 * FluxSkin PWA shared utilities for reading site metadata.
 *
 * This module provides common functionality used by multiple scripts
 * for parsing and validating site configuration.
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const OG_SITE_REL_PATH = "src/lib/og/site.json";

/**
 * Reads and parses the site.json file from the workspace.
 * Returns an empty object if the file doesn't exist or is invalid JSON.
 *
 * @param {string} workspaceRoot - The root directory of the workspace
 * @returns {object} Parsed site configuration or empty object
 */
export function readOgSite(workspaceRoot) {
  const sitePath = join(workspaceRoot, OG_SITE_REL_PATH);
  try {
    if (existsSync(sitePath)) {
      return JSON.parse(readFileSync(sitePath, "utf8"));
    }
  } catch {
    // Return empty object if file doesn't exist or is invalid JSON
  }
  return {};
}

/**
 * Checks if the site configuration declares a custom OG card.
 *
 * @param {object} site - Site configuration object
 * @returns {boolean} True if the site has "card": "custom" set
 */
export function siteHasCustomCard(site) {
  return site?.card === "custom";
}
