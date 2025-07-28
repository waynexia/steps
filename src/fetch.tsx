import * as cheerio from 'cheerio'
import wiki from 'wikipedia'

export async function fetch_people_in(year: number) {
  const page = await wiki.page(`AD_${year}`, { preload: true, fields: ['html'] })
  const html = await page.html({ redirect: true })
  return extract_people_from_html(html)
}

export function extract_people_from_html(html: string) {
  const $ = cheerio.load(html)
  const birthsHeader = $('#Births').parent()
  const births = birthsHeader.nextUntil('h2').find('li').filter(function (_, _el) {
    return $(this).find('li').length === 0
  }).map((_, el) => {
    const desc = $(el).text()
    const links = $(el).find('a')

    // Filter out date links (months and days) to find the actual person link
    let personLink = null
    if (links.length > 0) {
      const filteredLinks = links.filter(function (_, _el) {
        const linkText = $(this).text()
        // Check if this is a date link (month names or day numbers)
        const isDateLink = linkText.match(/\b(january|february|march|april|may|june|july|august|september|october|november|december|\d{1,2})\b/i)
        return !isDateLink
      })

      // Use the first non-date link, or fall back to the first link if no non-date links found
      personLink = filteredLinks.length > 0 ? filteredLinks.first().attr('href') : links.first().attr('href')
    }

    const deathMatch = desc.match(/\(d\.( AD)? (\d+)/i)?.[2]
    const death = deathMatch ? Number.parseInt(deathMatch) : undefined

    // Decode URL-encoded characters in the link
    const decodedLink = personLink ? decodeURIComponent(personLink) : personLink

    return { desc, link: decodedLink, death }
  }).get()

  return births.filter(
    (item, _) => item.link?.startsWith('/wiki/'),
  )
}

// Link like '/wiki/Ptolemy'
export async function person_detail(link: string, showWarning?: (message: string) => void) {
  const tryGetPersonDetail = async (pageTitle: string, attempt: number = 1): Promise<{ title: string, intro: string, imageUrl?: string, imageTitle?: string } | null> => {
    try {
      const page = await wiki.page(pageTitle, { autoSuggest: false, preload: true, fields: ['summary', 'intro', 'images'] })

      // Safely get images with error handling
      let image: any[] = []
      try {
        const images = await page.images({ redirect: true, limit: 10 })
        if (images && Array.isArray(images)) {
          image = images.filter((result, _) => {
            const words = page.title.split(' ')
            const regex = new RegExp(words.join('|'), 'i')
            return result && result.title && result.title.match(regex) && result.url && result.url.endsWith('.jpg')
          })
        }
      }
      catch (imageError) {
        // Images failed to load, continue without images
        if (showWarning)
          showWarning(`Could not load images for "${pageTitle}"`)
      }

      // Safely get intro with error handling
      let intro = ''
      try {
        intro = (await page.intro()).replace('\n', '\n\n')
      }
      catch (introError) {
        // Intro failed to load, try summary
        try {
          const summary = await page.summary()
          intro = (summary as any).extract || summary.toString()
        }
        catch (summaryError) {
          intro = 'Details not available'
          if (showWarning)
            showWarning(`Could not load summary for "${pageTitle}"`)
        }
      }

      return {
        title: page.title,
        intro,
        imageUrl: image.at(0)?.url,
        imageTitle: image.at(0)?.title,
      }
    }
    catch (error: any) {
      const errorMessage = error?.message || 'Unknown error'

      // Show warning for any error
      if (showWarning)
        showWarning(`Error fetching "${pageTitle}": ${errorMessage}. Trying alternative... (Attempt ${attempt}/3)`)

      // Try alternative approaches for any error, not just 403/404
      if (attempt === 1) {
        // Try with autoSuggest enabled for similar pages
        try {
          const suggestedPage = await wiki.page(pageTitle, { autoSuggest: true })
          if (suggestedPage && suggestedPage.title && suggestedPage.title !== pageTitle) {
            if (showWarning)
              showWarning(`Using alternative page: "${suggestedPage.title}" instead of "${pageTitle}"`)
            return await tryGetPersonDetail(suggestedPage.title, attempt + 1)
          }
        }
        catch (suggestError) {
          // Auto-suggest failed, continue to next attempt
        }
      }

      if (attempt === 2) {
        // Try searching for the person
        try {
          const searchResults = await wiki.search(pageTitle, { limit: 1 })
          if (searchResults && searchResults.results && searchResults.results.length > 0) {
            const firstResult = searchResults.results[0]
            if (firstResult && firstResult.title) {
              if (showWarning)
                showWarning(`Using search result: "${firstResult.title}" for "${pageTitle}"`)
              return await tryGetPersonDetail(firstResult.title, attempt + 1)
            }
          }
        }
        catch (searchError) {
          // Search failed, continue to fallback
        }
      }

      // If all attempts fail, return a placeholder
      if (showWarning)
        showWarning(`All attempts failed for "${pageTitle}". Using placeholder content.`)
      return {
        title: pageTitle.replace(/_/g, ' '),
        intro: `Details for this person could not be loaded from Wikipedia. The page "${pageTitle}" may not exist or be temporarily unavailable. Error: ${errorMessage}`,
        imageUrl: undefined,
        imageTitle: undefined,
      }
    }
  }

  const result = await tryGetPersonDetail(link.substring(6))
  return result!
}
