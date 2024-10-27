document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board')!

  const card = document.createElement('div')
  card.classList.add('card')

  board.appendChild(card)
})
