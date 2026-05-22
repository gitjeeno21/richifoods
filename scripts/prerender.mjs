import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { prerenderRoutes } from '../prerender/routes.js'

const currentFile = fileURLToPath(import.meta.url)
const rootDir = path.resolve(path.dirname(currentFile), '..')
const distDir = path.join(rootDir, 'dist')
const templatePath = path.join(distDir, 'index.html')
const cachedTemplatePath = path.join(distDir, '.prerender-template.html')
const serverEntryPath = path.join(rootDir, '.prerender', 'entry-server.js')

let template

try {
  template = await fs.readFile(cachedTemplatePath, 'utf8')
} catch {
  template = await fs.readFile(templatePath, 'utf8')
  await fs.writeFile(cachedTemplatePath, template, 'utf8')
}

const { render } = await import(pathToFileURL(serverEntryPath).href)

function routeToFilePath(route) {
  if (route === '/') {
    return templatePath
  }

  return path.join(distDir, route.replace(/^\//, ''), 'index.html')
}

function splitRenderedMarkup(appHtml) {
  const appStart = appHtml.indexOf('<div class="min-h-screen">')

  if (appStart === -1) {
    return {
      bodyHtml: appHtml,
      extractedHeadTags: '',
    }
  }

  return {
    extractedHeadTags: appHtml.slice(0, appStart),
    bodyHtml: appHtml.slice(appStart),
  }
}

function injectPrerenderedHtml(html, appHtml, headTags) {
  const { bodyHtml, extractedHeadTags } = splitRenderedMarkup(appHtml)
  const resolvedHeadTags = [headTags, extractedHeadTags].filter(Boolean).join('\n')
  const withHead = html.replace(
    '</head>',
    `${resolvedHeadTags ? `${resolvedHeadTags}\n` : ''}</head>`,
  )

  return withHead.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${bodyHtml}</div>`,
  )
}

for (const route of prerenderRoutes) {
  const { appHtml, headTags } = await render(route)
  const outputPath = routeToFilePath(route)
  const html = injectPrerenderedHtml(template, appHtml, headTags)

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, html, 'utf8')
}
