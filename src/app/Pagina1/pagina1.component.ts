import { Component, OnInit, Directive, ElementRef, ɵisBoundToModule__POST_R3__ } from "@angular/core";
//import { Component } from "@angular/core";
import { EventData } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import { getViewById } from "tns-core-modules/ui/core/view";
import { Page } from "tns-core-modules/ui/page";
import { View } from "tns-core-modules/ui/core/view";



@Component({
	selector: "pagina1",
	moduleId: module.id,
	templateUrl: "./pagina1.component.html",
	styleUrls: ['./pagina1.component.css']
})


export class Pagina1Component implements OnInit {

	public counter: number = 0;
    public labelTitle = "";
    public wordAnswer = "";
    public alternativaArray = [];
    public btnsArray = [];
    public buttonActive:Button;
    public pageGlobal;
    public btn1 = "a";
    public btn2 = "b";
    public btn3 = "c";
    public btn4 = "d";
    
   
    
    public wordsArray = [ {english:"Apple", portuguese:'Maçã', show: false},
                          {english:"Red", portuguese:'Vermelho', show: false},
                          {english:"Blue", portuguese:'Azul', show: false},
                          {english:"Black", portuguese:'Preto', show: false},
                          {english:"White", portuguese:'Branco', show: false},
                          {english:"Banana", portuguese:'Banana', show: false},
                          {english:"Lemon", portuguese:'Limão', show: false},
                          {english:"Green", portuguese:'Verde', show: false},
                          {english:"Bridge", portuguese:'Ponte', show: false},
                          {english:"Key", portuguese:'Chave', show: false}
                        ];

	constructor() {

        // Plug-in to work with dom object, you need install plugin.
        // https://www.npmjs.com/package/nativescript-dom
        require("nativescript-dom");

		console.log(">>>>>>>>>>>>>>>>>>>>> #1: constructor ok");

       
        this.addHeader();
        this.addWords();
        this.mixAlternativas();
        this.resetColors();
        this.addButtons()

    }
    
   
	addHeader(){
        //console.log(">>>>>>>>>>>>>>>>>>>>> #2: addHeader ok");

        let obj = this.getRandomWord(true);
        this.labelTitle = obj.english.toUpperCase();
        this.wordAnswer = obj.portuguese;
    }


    // Return obj with Word
    getRandomWord(showed=false){

        let nRandom = this.getRandomArbitrary( 0 , this.wordsArray.length);
        let objWord = this.wordsArray[nRandom];

        if(showed){
            objWord.show = true;
        }
        
       return objWord;
    }

    getRandomArbitrary(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min );
    }

    getAnotherWord(){
        let newWord = this.getRandomWord(false);
        let exists = false;

        for(let i=0; i < this.wordsArray.length; i++){
            let word = this.wordsArray[i].portuguese;
            if(this.isExists(word)){
                console.log("Já existe " + word);
                continue;
            }else{
                return newWord;
            }
        }
        
        //return newWord;
    }
    
    //
    addWords(){
		console.log(">>>>>>>>>>>>>>>>>>>>> #3: addWords ok");
		
        // Preper the array putting the first element 
        var strWord:string = this.wordAnswer;
        this.alternativaArray.push(strWord);
        console.log(">>>>>>>>>>>>>>>>>>>>> #3.1: palavra escolhida =>", strWord);

        console.log(">>>>>>>>>>>>>>>>>>>>> #3.2: length", this.alternativaArray.length );

        while(this.alternativaArray.length <= 3){
            
            strWord = this.getRandomWord(false).portuguese;
            if(!this.isExists(strWord) ){
                this.alternativaArray.push(strWord);
                console.log(">>> palavra adicionada: ", strWord);
            }
        }
        
        console.log(">>>>>>>>>>>>>>>>>>>>> #3.3: array ", this.alternativaArray );

    }


    addButtons(){
        console.log(">>>>>>>>>>>>>>>>>>>>> #6: addButtons ok");

        for(let i=0; i<4;i++){
            this["btn"+(i+1)] = this.alternativaArray[i];
        }

    }
    
    //verified if element exist
    isExists(str: string){
        let exist = false;

        for(let i=0; i< this.alternativaArray.length; i++){
            if( this.alternativaArray[i] == str){
                exist = true;
                break;
            }
        }
        return exist;
    }

    mixAlternativas(){
        console.log(">>>>>>>>>>>>>>>>>>>>> #4: mixAlternativas ok");
        this.alternativaArray = this.shuffle(this.alternativaArray);
    }
    
    resetColors(){
        console.log(">>>>>>>>>>>>>>>>>>>>> #5: resetColor ok");
        if(this.buttonActive){
            console.log(">>>>> cor original", this.buttonActive.backgroundColor  );
            this.buttonActive.backgroundColor = "#FFFFFF";
        }
    
    }

    

    reload(){
        
        this.disableButtons(false);
        this.resetButtons();
        this.constructor();
    }

    
    getButtonWithRightAnswer():Button {

       console.log(">>>>>>>>>>>>>>>>>>>>>> 6: getButtonWithRightAnswer");

       console.log(">>>> ", this.alternativaArray.length);
        
       let btn:Button;
       let btnTxt;
    
        for(let i=0; i < this.alternativaArray.length; i++){  
            btn =  this.pageGlobal.getElementById("btn" + (i+1)) ;
            btnTxt = this.alternativaArray[i];
            
            console.log(">>>>>>>> this.wordAnswer: ", this.wordAnswer , "btnTxt: " , btnTxt ); 
            
            if(this.wordAnswer == btnTxt){
                console.log(">>>>>>>> btn com a resposta correta: " + this.wordAnswer );
                console.log("<<<<<< return #1 ", btn)
                 return btn;
             }
        }
        console.log("<<<<<< return #2 ", btn);
        return btn;
    }

 

    // Mix content of array
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;  
	}
      

	ngOnInit(): void {
    }

       
 	// >> button-tap-event-code
	onTap(args: EventData) {
        this.buttonActive = <Button>args.object;

        // Lock all buttons
        this.disableButtons(true);
        
		if(this.wordAnswer == this.buttonActive.text){
           //acertou #8bc14a green
           this.buttonActive.backgroundColor = "#8bc14a";

            setTimeout(() => {
                this.reload();
                this.buttonActive.backgroundColor = "#d3d3d3";  
            }, 500);

		}else{
            //Errou
            this.buttonActive.backgroundColor = "#e44e5a"; // red

            // colored the right anwswer whith green (correct awnsere)
            let btnRightAnswer = this.getButtonWithRightAnswer();
            btnRightAnswer.backgroundColor = "#8bc14a"; // green


            setTimeout(() => {
                this.reload();
                this.buttonActive.backgroundColor = "#d3d3d3";
                btnRightAnswer.backgroundColor = "#d3d3d3"
            }, 1500);
            
		}
	
	}
	// << button-tap-event-code
    

    pageLoaded(args) {

        console.log(">>>>>>>>>>>>>>>>>>>>> #7: pageLoaded:");
        if(!this.pageGlobal) this.pageGlobal = args.object;
       
        console.log(">>>>>>>>>>>>>>>>>>>>> #7.1: criou pageGlobal:", this.pageGlobal);
           
       
        for(let i=0; i< 4; i++){  
            this.btnsArray[i] = this.pageGlobal.getElementById("btn" + (i+1) );
        }
        console.log(">>>>>>>>>>>>>>>>>>>>> #7.2: ARRAY bnts:",  this.btnsArray );

      }



      resetButtons(){

            console.log(">>>>>>>>>>>>>>>>>>>>> # reset bnts:");
            if(!this.pageGlobal) return;

            for(let i=1; i<=4; i++){
                var btn =  this.pageGlobal.getElementById("btn" + i);
                btn.backgroundColor = "#d3d3d3";
            }

      }

    disableButtons(enable=false){

        if(!this.pageGlobal) return;

        for(let i=1; i<=4; i++){
            var btn =  <Button>this.pageGlobal.getElementById("btn" + i);
            btn.isEnabled = !enable;
         }

    }


}



