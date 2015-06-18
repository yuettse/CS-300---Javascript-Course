var cards = function () {
	this.type = ['♠', '♣', '♦', '♥'];
	this.card = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
	this.deck = [];
	this.count = 0;
	this.dealer = 0;
	this.player = 0;
	this.who = 'dealer';
	this.back = 0;
	this.money = 100000;
	this.bet = 0;
	
	
	for(a = 0; a < 4; a++) {
		for (i = 0; i < 13; i++) {
			temp = [];
			temp.push(this.card[i]);
			temp.push(this.type[a]);
			this.deck.push(temp);
	
		}
	}
	
}
cards.prototype.shuffle = function() {
	this.count = 0;
	
	for(var j, x, i = this.deck.length; i; j = Math.floor(Math.random() * i), 
	x = this.deck[--i], this.deck[i] = this.deck[j], this.deck[j] = x);
	
	
}

cards.prototype.reset = function() {
	this.money = 100000;
	this.shuffle();
	this.showmoney();
	this.showbet();
	document.getElementById('hit').style.visibility = 'hidden';
	document.getElementById('stay').style.visibility = 'hidden';
	document.getElementById('start').style.visibility = 'visible';
	document.getElementById('dealertotal').innerHTML = '';
	document.getElementById('playertotal').innerHTML = '';
	document.getElementById('dealercard').innerHTML = '';		
	document.getElementById('playercard').innerHTML = '';		
	document.getElementById('winlose').innerHTML = '';
	document.getElementById('back').innerHTML = '';
	document.getElementById('cardtotal').innerHTML = '';
	document.getElementById('yourbet').innerHTML = '0';
	document.getElementById('shuffle').innerHTML = '';
}

cards.prototype.totalbet = function() {
	this.bet = document.getElementById('betvalue').value;
	this.showmoney();
	this.gamestart();
	
}

cards.prototype.AJQK = function() {
	if (this.back != 0 ) {
		this.display();
	}
	
	if(this.deck[this.count][0] == 'J' || this.deck[this.count][0] == 'Q' || this.deck[this.count][0] == 'K') {
		if (this.who == 'dealer') {
			this.dealer += 10;
			
			this.showdealer();
		} else {
			this.player += 10;
			
		}
	} else if (this.deck[this.count][0] == 'A' ) {
		if (this.who == 'dealer') {
			if (this.dealer + 11 < 22) {
				this.dealer += 11;	
				this.showdealer();
			} else {
				this.dealer += 1;		
				this.showdealer();
			}
		} else {
			if (this.player + 11 < 22) {
				this.player += 11;	
				
			} else {
				this.player += 1;	
				
								
			}
		}
	} else {
		if (this.who == 'dealer') {
			this.dealer += this.deck[this.count][0];
			this.showdealer();
		} else {
			this.player += this.deck[this.count][0];
			
		}
	}
	
	if(this.player > 21) {
		document.getElementById('winlose').innerHTML = 'Uh Oh You Got ' + this.player;
		this.hitAndStay(false);
		this.displayBack();
		this.showbet();
		this.showdealer();
	}
	
	document.getElementById('playertotal').innerHTML = 'player total = ' + this.player;
	document.getElementById('cardtotal').innerHTML = '<br><strong>Card Left = ' + (this.deck.length - this.count) + '</strong>';
	this.showmoney();
	this.count++;
	return this.deck[this.count][0] + this.deck[this.count][1];
}

cards.prototype.drawback = function () {
	return this.deck[this.count - 1][0] + this.deck[this.count - 1][1];
}

cards.prototype.gamestart = function() {
	if ( this.deck.length - this.count < 21) {
		this.shuffle();
		document.getElementById('shuffle').innerHTML = 'Auto shuffled';
		
	} else {
		document.getElementById('shuffle').innerHTML = '';
	}
	if(this.dealer != 0) {
		document.getElementById('dealertotal').innerHTML = '';
		document.getElementById('playertotal').innerHTML = '';
		document.getElementById('dealercard').innerHTML = '';		
		document.getElementById('playercard').innerHTML = '';		
		document.getElementById('winlose').innerHTML = '';
		this.back = 0;
		this.player = 0;
		this.dealer= 0;
		
	}	
	
	document.getElementById('betvalue').style.visibility = 'hidden';
	document.getElementById('bet').style.visibility = 'hidden';
	
	this.money -= this.bet;
	this.who = 'dealer';
	
	this.AJQK();
	this.back = this.drawback();
	this.AJQK();
	
	document.getElementById('back').innerHTML = "back";
	this.who = 'player';
	
	this.AJQK();	
		
	this.AJQK();
	this.hitAndStay(true);
	document.getElementById('dealertotal').innerHTML = 'dealer total = ?';
	this.blackjack();
	
	

	
	
}

cards.prototype.hit = function() {
	this.AJQK();
	
}
cards.prototype.showdealer = function() {
	document.getElementById('dealertotal').innerHTML = 'dealer total = ' + this.dealer;
}

cards.prototype.showplayer = function() {
	document.getElementById('playertotal').innerHTML = 'player total = ' + this.player;
	
}

cards.prototype.stay = function () {
	this.displayBack();
	this.who = 'dealer';
	while (this.dealer < 17) {
		this.AJQK();

	}
	if(this.dealer> 21) {
		document.getElementById('winlose').innerHTML = 'You win!';
		this.win();
	} else if(this.player < this.dealer) {
		document.getElementById('winlose').innerHTML = 'You lose!';
	} else if (this.player > this.dealer) {
		document.getElementById('winlose').innerHTML = 'You win!';
		this.win();
	} else {
		document.getElementById('winlose').innerHTML = 'Draw game!';
		
	}
	
	this.showmoney();
	this.showbet();
	this.showdealer();
	this.hitAndStay(false);
}

cards.prototype.blackjack = function() {
	if( this.dealer == 21 && this.player == 21 ) {
		document.getElementById('winlose').innerHTML = 'You Both Got BlackJack!';
		this.showdealer();
		this.hitAndStay(false);
		this.showbet();
	} else if( this.dealer == 21 && this.dealer > this.player) {
		document.getElementById('winlose').innerHTML = 'Sorry, you lose';	
		this.showdealer();
		this.hitAndStay(false);
		this.showbet();		
	} else if( this.player == 21 && this.player > this.dealer) {
		document.getElementById('winlose').innerHTML = 'Oh! Congratz!';	
		this.showdealer();	
		this.hitAndStay(false);
		this.win();
		this.showbet();
	}
	
}

cards.prototype.hitAndStay = function(on) {
	if(on == false) {
		document.getElementById('start').style.visibility = 'visible';
		document.getElementById('hit').style.visibility = 'hidden';
		document.getElementById('stay').style.visibility = 'hidden';
	} else {
		document.getElementById('start').style.visibility = 'hidden';
		document.getElementById('hit').style.visibility = 'visible';
		document.getElementById('stay').style.visibility = 'visible';
	}
}


cards.prototype.display = function () {
	if(this.who == 'dealer') {
		document.getElementById('dealercard').innerHTML += this.deck[this.count][0] + this.deck[this.count][1];
	} else {
		document.getElementById('playercard').innerHTML += this.deck[this.count][0] + this.deck[this.count][1];
	}
}

cards.prototype.displayBack = function() {
	document.getElementById('back').innerHTML = this.back;
}

cards.prototype.win = function() {
	this.money += this.bet * 2;
	this.showmoney();
}

cards.prototype.showbet = function () {
	document.getElementById('betvalue').style.visibility = 'visible';
	document.getElementById('bet').style.visibility = 'visible';
}

cards.prototype.showmoney = function () {
	if (this.bet == 0) {
		document.getElementById('yourbet').innerHTML = 0;
	} else {
		document.getElementById('yourbet').innerHTML = this.bet;
	}
	document.getElementById('money').innerHTML = this.money;
}

var card = new cards;
card.shuffle();
