document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board')!

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

  function flipCard(card: HTMLElement) {
    card.textContent = card.dataset.value || ''
  }
})
