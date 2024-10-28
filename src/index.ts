document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board')!
  board.classList.add('board')

  const cardValues: string[] = ['🐶', '🐱', '🐭', '🐴', '🐨', '🐷', '🐼', '🐵']
  cardValues.push(...cardValues)
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
