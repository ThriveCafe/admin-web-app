const validateImageResolution = (
  imageFile,
  minResolution = {
    height: 0,
    width: 0,
  },
) =>
  new Promise((resolve, reject) => {
    const imageUrl = URL.createObjectURL(imageFile)

    const image = new Image()

    image.addEventListener('load', () => {
      if (
        image.height > minResolution.height &&
        image.width > minResolution.width
      ) {
        resolve(true)
      } else {
        resolve(false)
      }
    })

    image.addEventListener('error', () => {
      reject()
    })

    image.src = imageUrl
  })

export default validateImageResolution
