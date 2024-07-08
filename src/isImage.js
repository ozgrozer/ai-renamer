module.exports = ({ ext }) => {
  const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tif', '.tiff', '.webp', '.svg', '.eps']
  return imageTypes.includes(ext)
}
