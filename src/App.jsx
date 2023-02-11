import { useEffect, useState } from 'react'
import './App.css'
import { getRandomFact } from './services/facts'
import { getImages } from './services/images'

export function App () {
  const [fact, setFact] = useState('lorem')
  const [imageUrl, setImageUrl] = useState('')

  const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

  useEffect(() => {
    getRandomFact().then(newFact => setFact(newFact))
  }, [])

  // Para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ')
    getImages(threeFirstWords).then(url => setImageUrl(url))
  }, [fact])

  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }

  return (
    <main className='cat-main-container'>
      <h1>App de Gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      <section className='cat-container'>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`image extracted using the fist three words dor ${fact}`}></img>}
      </section>
    </main>
  )
}
