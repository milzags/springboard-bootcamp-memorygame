class MemoryGame {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
    }

    startGame() {

        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCardsArr = [];
        this.busy = true; //
        this.shuffleCards();
    }

    flipCard(card) {
        if (this.canFlipCard(card)) {
            this.totalClicks += 1;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('flip');
        }
    }

    shuffleCards() {
        for (let i = this.cardsArray.length - 1; i > 0; i--){
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCard(card) {
        // return !this.busy && !this.matchedCardsArr.includes(card) && card !== this.cardToCheck;
        return true;
    }
}


function play() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MemoryGame(45, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            event.preventDefault();
            game.flipCard(card);
        
        });
    });

}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', play());
} else {
    play();
}
