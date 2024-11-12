const imageToBase64 = (url, callback) => {
  fetch(url)
    .then((response) => {
      // console.log('response', response)
      return response.blob()
    })
    .then((blob) => {
      // console.log('blob', blob)

      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        const base64String = reader.result
        // console.log('bisa', base64String)
        callback(base64String)
      }
    })
    .catch((error) => {
      console.log('error base64 img', error)
      callback(null)
    })
}

// const imageToBase64 = async (url) => {
//   const data = await fetch(url, { mode: 'no-cors' })
//   const blob = await data.blob()
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(blob)
//     reader.onloadend = () => {
//       const base64data = reader.result
//       console.log('bisa', base64data)
//       resolve(base64data)
//     }
//     reader.onerror = (err) => {
//       console.log('error base64 img', err)
//       reject(err)
//     }
//   })
// }

export { imageToBase64 }
