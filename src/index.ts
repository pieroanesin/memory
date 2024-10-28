document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board')!
  board.classList.add('board')

  let cardValues: string[] = ['🐶', '🐱', '🐭', '🐴', '🐨', '🐷', '🐼', '🐵']
  cardValues.push(...cardValues)
  cardValues = shuffle(cardValues)

  cardValues.forEach(value => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.value = value
    card.addEventListener('click', () => {
      flipCard(card)
    })
    board.appendChild(card)

  })

  let flippedCards: HTMLElement[] = []
  function flipCard(card: HTMLElement) {
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
      card.classList.add('flipped')
      card.textContent = card.dataset.value || ''
      flippedCards.push(card)

      if (flippedCards.length === 2) {
        if (flippedCards[0].dataset.value !== flippedCards[1].dataset.value) {
          setTimeout(() => {
            flippedCards.forEach(card => {
              card.textContent = ''
              card.classList.remove('flipped')
              flippedCards = []
            })
          }, 1000)
        } else {
          flippedCards = []

          if (board.querySelectorAll('.flipped').length === cardValues.length) {
            setTimeout(() => alert('Hai vinto!'), 500)
          }
        }
      }
    }
  }
})

// Fisher-Yates shuffle
function shuffle(array: string[]): string[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
