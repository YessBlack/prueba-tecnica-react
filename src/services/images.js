export const getImages = async (threeFirstWords) => {
  const res = await fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
  const data = await (res.json())
  return data.url
}
