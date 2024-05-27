export const predefineColors = [
  'rgb(0, 0, 0)',
  'rgb(68, 84, 106)',
  'rgb(91, 155, 213)',
  'rgb(237, 125, 49)',
  'rgb(165, 165, 165)',
  'rgb(255, 192, 0)',
  'rgb(68, 114, 196)',
  'rgb(112, 173, 71)',
  'rgb(127, 127, 127)',
  'rgb(192, 0, 0)',
  'rgb(255, 0, 0)',
  'rgb(255, 0, 0)',
  'rgb(255, 192, 0)',
  'rgb(255, 255, 0)',
  'rgb(146, 208, 80)',
  'rgb(0, 176, 80)',
  'rgb(0, 176, 240)',
  'rgb(0, 112, 192)',
  'rgb(112, 48, 160)',
  'rgb(0, 32, 96)'
]
export function getRandomColor () {
  const length = predefineColors.length
  const randomNum = Math.floor((Math.random()) * length)
  if (Number.isInteger(randomNum) && randomNum < length && randomNum >= 0) {
    return predefineColors[randomNum]
  }
  return '#000'
}
