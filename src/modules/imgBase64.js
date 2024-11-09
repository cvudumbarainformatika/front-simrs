const imageToBase64 = (url, callback) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        const base64String = reader.result
        // console.log(base64String)
        callback(base64String)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export { imageToBase64 }
