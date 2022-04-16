const sharp = require(`sharp`)
const glob = require(`glob`)
const fs = require(`fs-extra`)

const matches = glob.sync(`static/images/**/*.{png,jpg,jpeg}`)
const MAX_WIDTH = 512
const QUALITY = 70

console.log(`Found ${matches.length} images`)

Promise.all(
  matches.map(async match => {
    try {
      const stream = sharp(match)
      const info = await stream.metadata()

      if (info.width < MAX_WIDTH || info.height < MAX_WIDTH || match.indexOf('-optimized') > 0) {
        return
      }

      const optimizedName = match.replace(
        /(\..+)$/,
        (match, ext) => `-optimized${ext}`
      )

      console.log(`Optimizing ${match}`, optimizedName)

      if (info.info === 'png') {
        await stream
          .resize(MAX_WIDTH)
          .png({
            quality: QUALITY
          })
          .toFile(optimizedName)
      } else {
        await stream
          .resize(MAX_WIDTH)
          .jpeg({
            quality: QUALITY
          })
          .toFile(optimizedName)
      }

      console.log(`Write back: ${match}`)
      return fs.rename(optimizedName, match)

    } catch (err) {
      console.error(err)
    }

  })
)