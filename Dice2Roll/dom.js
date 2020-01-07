// player names
var a='PlayerA',b='PlayerB';
a = prompt("Player 1 name:","Player A");
b = prompt("Player 2 name:","Player B");
if(a=== null){
    a='Player A';
}
if(b===null){
    b='Player B';
}
document.querySelector('.playerna').textContent = a.toUpperCase();
document.querySelector('.playernb').textContent = b.toUpperCase();


document.querySelector('.zz').classList.remove('diceab');
document.querySelector('.playcc').classList.remove('playc');
document.querySelector('.playdd').classList.remove('playd');

var score = [0,0];
var activePlayer = 'a';
var activeScore  = 0;
var gameplay = true;

document.querySelector('.holdd').classList.remove('holdda');
document.querySelector('.rolld').classList.remove('rollda');


nullScore();

//functions
function nullScore(){
  document.querySelector('.currenta').textContent ='00';
  document.querySelector('.currentb').textContent ='00';
}
function changeP(){
        activeScore =0;
        nullScore();
        
        //Zero on dices
        document.querySelector('.dicea').src = 'files/dice/dice-0.png';
        document.querySelector('.diceb').src = 'files/dice/dice-0.png';
         
        document.querySelector('.current' + activePlayer).textContent = '00';
        document.querySelector('.img' + activePlayer).src = 'files/wait.png';
        
        //player toggled
        activePlayer === 'a' ? activePlayer = 'b' : activePlayer = 'a';
      
        document.querySelector('.img' + activePlayer).src = 'files/go.png';    
}


document.querySelector('.scorejsa').textContent = '00';
document.querySelector('.scorejsb').textContent = '00';

// Roll dices
document.querySelector('.rolld').addEventListener('click',function(){
   if(gameplay){ 
    var dicea = Math.floor(Math.random()*6) + 1;
    var diceb = Math.floor(Math.random()*6) + 1;
    
    document.querySelector('.dicea').src = 'files/dice/dice-' + dicea + '.png';
    document.querySelector('.diceb').src = 'files/dice/dice-' + diceb + '.png';
    
    var point = dicea + diceb;
    if(point%2 !== 0){ 
        activeScore +=point;  
        document.querySelector('.current' + activePlayer).textContent = activeScore;
    }else{//if sum of dices is even then player loses all active points
        changeP();  
    }
   }
});

//hold
document.querySelector('.holdd').addEventListener('click',function(){
    if(gameplay){
    var playerK;
    activePlayer === 'a' ? playerK = 0 : playerK = 1;
    score[playerK] += activeScore;
    document.querySelector('.scorejs' + activePlayer).textContent = score[playerK];
    if(score[playerK]>=15){
        document.querySelector('.imga').src = 'files/wait.png';
        document.querySelector('.imgb').src = 'files/wait.png';
        document.querySelector('.holdd').textContent = 'OVER';
        document.querySelector('.rolld').innerHTML = 'Game';
        nullScore();
        
        document.querySelector('.holdd').classList.add('holdda');
        document.querySelector('.rolld').classList.add('rollda');
        document.querySelector('.holdda').classList.remove('holdd');
        document.querySelector('.rollda').classList.remove('rolld');
        document.querySelector('.zz').classList.add('diceab');
        document.querySelector('.dicea').src = 'files/dice/dice-0.png';
        document.querySelector('.diceb').src = 'files/dice/dice-0.png';
        if(activePlayer!=='a'){
        document.querySelector('.playcc').classList.add('playc');
        }else{
            document.querySelector('.playdd').classList.add('playd');
        }
        gameplay = false;
    }else{
        changeP();
    }
    }
});

//reset
document.querySelector('.reset').addEventListener('click',function(){
    gameplay= true;
    nullScore();
    score = [0,0];
    activePlayer = 'a';
    activeScore  = 0;
    gameplay = true;
    document.querySelector('.imga').src = 'files/go.png';
    document.querySelector('.imgb').src = 'files/wait.png';
    document.querySelector('.aaa').textContent = 'Roll';
    document.querySelector('.bbb').textContent = 'Hold';
    document.querySelector('.scorejsa').textContent = '00';
    document.querySelector('.scorejsb').textContent = '00';
    document.querySelector('.dicea').src = 'files/dice/dice-0.png';
    document.querySelector('.diceb').src = 'files/dice/dice-0.png';
    document.querySelector('.bbb').classList.add('holdd');
    document.querySelector('.aaa').classList.add('rolld');
    
    document.querySelector('.holdd').classList.remove('holdda');
    document.querySelector('.rolld').classList.remove('rollda');
    document.querySelector('.zz').classList.remove('diceab');
    document.querySelector('.playcc').classList.remove('playc');
    document.querySelector('.playdd').classList.remove('playd');
});






















