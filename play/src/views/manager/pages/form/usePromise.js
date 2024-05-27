export default function (data) {
  const res = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 200)
  })
  return res
}
