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
        
        setTimeout(() => {
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        },500)

        this.hideCards();
        this.timer.innerText = this.timeRemaining; //resetting ticker and timer
        this.ticker.innerText = this.totalClicks;
    }

    hideCards() {
        //loop through cards array and remove visibile and matched classes
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    flipCard(card) {
        if (this.canFlipCard(card)) {
            this.totalClicks += 1;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');
                       

            if (this.cardToCheck) {
                //check for match
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }

    checkForCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
            this.checkForCardMatch(card,this.cardToCheck);
        } else {
            this.cardMisMatch(card, this.cardToCheck);
        }

        this.cardToCheck = null;
    }

    cardMatch(card1, card2) {
        this.matchedCardsArr.push(card1);
        this.matchedCardsArr.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCardsArr.length === this.cardsArray.length) {
            this.victory();
        }
    }

    cardMisMatch(card1, card2) {
        this.busy = true;
        setTimeout(()=> {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        },1000)
    }

    startCountDown() {
        return setInterval(() => {
            this.timeRemaining -= 1;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0 ){
                this.gameOver();
            }
        },1000);
    }

    gameOver() {
        clearInterval(this.countDown);
        document.getElementById('game-over-text').classList.add('visible');
    }

    victory() {
        clearInterval(this.countDown);
        document.getElementById('you-win-text').classList.add('visible');
    }

    shuffleCards() {
        for (let i = this.cardsArray.length - 1; i > 0; i--){
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCard(card) {
        return !this.busy && !this.matchedCardsArr.includes(card) && card !== this.cardToCheck;
        
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
        card.addEventListener('click', (event) => {
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
