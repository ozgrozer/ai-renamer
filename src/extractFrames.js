const path = require('path')
const fs = require('fs').promises
const { exec } = require('child_process')

const getVideoDuration = ({ inputFile }) => {
  return new Promise((resolve, reject) => {
    exec(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${inputFile}"`, (err, stdout) => {
      if (err) {
        reject(new Error(err))
        return
      }
      resolve(parseFloat(stdout))
    })
  })
}

module.exports = async ({ inputFile }) => {
  const outputDir = './frames'

  try {
    await fs.mkdir(outputDir, { recursive: true })

    const duration = await getVideoDuration({ inputFile })
    const numFrames = Math.min(10, Math.floor(duration))
    const frameRate = numFrames / duration
    const frameInterval = duration / numFrames

    const command = `ffmpeg -i "${inputFile}" -vf fps=${frameRate} -frames:v ${numFrames} -q:v 2 "${outputDir}/frame_%03d.jpg" -loglevel error`

    await new Promise((resolve, reject) => {
      exec(command, (error) => {
        if (error) {
          reject(new Error(`Error extracting frames: ${error.message}`))
          return
        }
        resolve()
      })
    })

    const images = Array.from({ length: numFrames }, (_, i) =>
      path.resolve(outputDir, `frame_${String(i + 1).padStart(3, '0')}.jpg`)
    )

    const videoPrompt = `Analyze these ${numFrames} frames from a ${duration.toFixed(1)}-second video. One frame every ${frameInterval.toFixed(1)} seconds.`

    return {
      images,
      videoPrompt
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
