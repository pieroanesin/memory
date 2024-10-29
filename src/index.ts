document.addEventListener('DOMContentLoaded', () => {
  const board = setupBoard()
  const cardValues = shuffle(generateCardValues())
  let flippedCards: HTMLElement[] = []

  cardValues.forEach(value => {
    const card = createCard(value)
    card.addEventListener('click', () => handleCardClick(card))
    board.appendChild(card)
  })

  function setupBoard(): HTMLElement {
    const board = document.getElementById('board')!
    board.classList.add('board')
    return board
  }

  function generateCardValues(): string[] {
    const baseValues = ['🐶', '🐱', '🐭', '🐴', '🐨', '🐷', '🐼', '🐵']
    return [...baseValues, ...baseValues]
  }

  function createCard(value: string): HTMLElement {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.value = value
    return card
  }

  function handleCardClick(card: HTMLElement) {
    const canFlipCard = flippedCards.length < 2 && !flippedCards.includes(card)

    if (canFlipCard) {
      flipCard(card)
      flippedCards.push(card)

      if (flippedCards.length === 2) checkForMatch()
    }
  }

  function flipCard(card: HTMLElement) {
    card.classList.add('flipped')
    card.textContent = card.dataset.value || ''
  }

  function checkForMatch() {
    const [firstCard, secondCard] = flippedCards
    const isMatch = firstCard.dataset.value === secondCard.dataset.value

    if (isMatch) {
      flippedCards = []
      if (isGameWon()) setTimeout(() => alert('You won!'), 500)
    } else {
      setTimeout(unflipCards, 1000)
    }
  }

  function isGameWon(): boolean {
    return board.querySelectorAll('.flipped').length === cardValues.length
  }

  function unflipCards() {
    flippedCards.forEach(card => {
      card.textContent = ''
      card.classList.remove('flipped')
    })
    flippedCards = []
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
