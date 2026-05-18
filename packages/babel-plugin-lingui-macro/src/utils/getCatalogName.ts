import type { LinguiConfigNormalized } from "@lingui/conf"

export function getCatalogName(
  path: string,
  config: LinguiConfigNormalized
): string | void | never {
  for (const catalog of config.catalogs) {
    if (!catalog.include) continue

    const re = new RegExp(
      catalog.include
        .map((s) => s
          .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          .replace(/\\{name\\}/g, "([^/]+)")
          .concat("(?:/.+)?$"))
        .join("|")
    )
    const match = path.match(re)

    if (match) {
      return catalog.name ?? match[1]
    }
  }
}
