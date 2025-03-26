import type { LinguiConfigNormalized } from "@lingui/conf"

export function getCatalogName(
  path: string,
  config: LinguiConfigNormalized
): string | void | never {
  for (const catalog of config.catalogs) {
    const re = new RegExp(
      catalog.include.join("|").replace(/{name}/g, "([^/]+)")
    )
    const match = path.match(re)

    if (match) {
      return catalog.name ?? match[1]
    }
  }
}
