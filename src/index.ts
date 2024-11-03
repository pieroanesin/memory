document.addEventListener('DOMContentLoaded', () => {
  const board = setupBoard()
  const cardValues = shuffle(generateCardValues())
  let flippedCards: HTMLElement[] = []
  let matchedCards: HTMLElement[] = []
  let score: number = 0
  const maxScore = 40

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
    const canFlipCard = flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)

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
      increaseScore()
      matchedCards.push(firstCard, secondCard)
      flippedCards = []
      if (isGameWon()) setTimeout(() => alert(`You won with a score of ${totalScore()} out of 100!`), 500)
    } else {
      descraseScore()
      setTimeout(unflipCards, 1000)
    }
  }

  function increaseScore() {
    score+=5
    document.getElementById('score')!.textContent = totalScore().toString()
  }

  function descraseScore() {
    score--
    document.getElementById('score')!.textContent = totalScore().toString()
  }

  function totalScore(): number {
    return (score * 100)/maxScore
  }

  function isGameWon(): boolean {
    return matchedCards.length === cardValues.length
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
