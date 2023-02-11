import { useEffect, useState } from 'react'
import './App.css'

export function App () {
  const [fact, setFact] = useState('lorem')
  const [imageUrl, setImageUrl] = useState('')

  const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
  const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

  // Efecto con responsabilidad unica
  // Recupera la cita al cargar la pagina
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => {
        // TODO: Handle error if !res.ok
        return res.json()
      })
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  // Para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')
    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])

  console.log(fact)

  return (
    <main className='cat-main-container'>
      <h1>App de Gatitos</h1>
      <section className='cat-container'>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`image extracted using the fist three words dor ${fact}`}></img>}
      </section>
    </main>
  )
}
