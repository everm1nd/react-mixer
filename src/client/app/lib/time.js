const pad = (str, max) => {
  str = str.toString()
  return str.length < max ? pad("0" + str, max) : str
}

const renderDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const restSeconds = (seconds % 60).toFixed(2)
  return `${pad(minutes,2)}:${pad(restSeconds,5)}`
}

export { renderDuration }
