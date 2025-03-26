import { makeConfig } from "@lingui/conf"
import { getCatalogName } from "../../src/utils/getCatalogName"

describe("getCatalogName", () => {
  it("returns undefined when catalogs is empty", () => {
    const actual = getCatalogName(
      "src/App.tsx",
      makeConfig({
        locales: ["en"],
        catalogs: [],
      })
    )

    expect(actual).toBeUndefined()
  })

  it("returns undefined when path does not match any include patterns", () => {
    const actual = getCatalogName(
      "other/path/file.tsx",
      makeConfig({
        locales: ["en"],
        catalogs: [
          {
            path: "locales/{locale}",
            include: ["src"],
          },
        ],
      })
    )

    expect(actual).toBeUndefined()
  })

  it("returns undefined when does not have specific catalog", () => {
    const actual = getCatalogName(
      "src/App.tsx",
      makeConfig({
        locales: ["en"],
        catalogs: [
          {
            path: "locales/{locale}",
            include: ["src"],
          },
        ],
      })
    )

    expect(actual).toBeUndefined()
  })

  it("returns name when catalog has it in config", () => {
    const actual = getCatalogName(
      "src/App.tsx",
      makeConfig({
        locales: ["en"],
        catalogs: [
          {
            name: "test-catalog",
            path: "locales/{locale}",
            include: ["src"],
          },
        ],
      })
    )

    expect(actual).toBe("test-catalog")
  })

  it("returns name when catalog has it in path pattern", () => {
    const actual = getCatalogName(
      "src/features/test/Test.tsx",
      makeConfig({
        locales: ["en"],
        catalogs: [
          {
            path: "src/features/{name}/{locale}",
            include: ["src/features/{name}"],
          },
        ],
      })
    )

    expect(actual).toBe("test")
  })

  it("returns name when catalog has several include patterns", () => {
    const actual = getCatalogName(
      "src/features/test/Test.tsx",
      makeConfig({
        locales: ["en"],
        catalogs: [
          {
            path: "src/features/{name}/{locale}",
            include: ["src/features/{name}", "src/pages/{name}"],
          },
        ],
      })
    )

    expect(actual).toBe("test")
  })

  it("handles multiple catalogs and returns first match", () => {
    const actual = getCatalogName(
      "src/features/auth/Login.tsx",
      makeConfig({
        locales: ["en"],
        catalogs: [
          {
            name: "main",
            path: "locales/{locale}",
            include: ["src/common"],
          },
          {
            name: "auth",
            path: "src/features/auth/{locale}",
            include: ["src/features/auth"],
          },
          {
            name: "other",
            path: "src/features/{name}/{locale}",
            include: ["src/features/other"],
          },
        ],
      })
    )

    expect(actual).toBe("auth")
  })
})
