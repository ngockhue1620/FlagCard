Vue.component('button-counter', {
  props:{
    cauhoi:Object,
    dapan:Array,
    increment:Function,

  },
  
  data: function()
  {

    return{
      selectIndex : null,
      CorrectAnswer : false,
      AnswerSelect  : false,
      allowSubmit   : false,
      answered      : false,
      WongAnswer    : false,
      correcAnswertClass :false,
      wrongAnswerClass    :false,
      isCheck:false,
      hidden:true,
      ShowCard:false,
      ShowMainCard:true,
      ketqua:null
     

    }
  },
  
  watch:
  {
      // isCheck:function()
      // {
      //   if(this.isCheck ==true)
      //   {

      //     console.log("ok");
      //     this.correcAnswertClass='correctAnswerClass'
      //   }
      // }
  },
   methods:
    {
      hiddenCard()
      {
        this.ShowMainCard=false
      },
      selectAnswer(index)//khi click đổi màu button được chọn
      {
        this.selectIndex=index        

      },
      AnswerClass(index)//khi click đổi màu button được chọn
      {
       
        let answerClass=''
        if (this.selectIndex === index) {
          answerClass = 'answerClass';
        }
               
        this.allowSubmit=true;
        return answerClass
      },
      checkAfterSubmit(index)
      { 
          let answerClass="";
         if(this.isCheck==true&&this.cauhoi.correct==index)
         {
            answerClass ='correctAnswerClass';
         }
        else if(this.isCheck==true&& this.cauhoi.correct!=index && this.selectIndex==index)
         {
           answerClass='wrongAnswerClass';
         }

         return answerClass;
      },
      checkAnswer()// kiểm tra đúng sai
      {
        if(this.cauhoi.correct==this.selectIndex)
        {
          this.CorrectAnswer=true;
          this.ketqua="congratulations";
        }
        else
        {
          this.ketqua="false";
        }
        
        this.isCheck=true;
        this.hidden=false;
        this.ShowCard=true;
        // for(let i=0;i<4;i++)
        // {
        //   checkAfterSubmit(i);

        // }
        this.increment(this.CorrectAnswer);
        
      },
     
      destroy() {
        this.selectIndex=null;
        this.$destroy();
      }
    },

  template: `
   
   <div class="scroll-cards__item" v-show="ShowMainCard" >
    <p>{{ketqua}}</p>
   	<p>{{cauhoi.question}}</p>
  	<button
      v-for="(item,index) in dapan"
      :key="index"
      @click.prevent="selectAnswer(index)"
      v-bind:class="[AnswerClass(index),checkAfterSubmit(index)]"


    >
      {{item}}
    </button>	
      <div>
        <button
        
        @click="checkAnswer()"
        :disabled="selectIndex === null  " 
        v-show="hidden"
        >submit</button>

        <button
         v-show="ShowCard" 
         @click="hiddenCard()"
        >
          hidden
        </button>
      </div>
    </div>    
`
   
//    `
   
//    <div class="scroll-cards__item" >
//     <p>{{cauhoi.question}}</p>
//     <button
//       v-for="item in dapan"  --bind dap an
//       @click.prevent="selectAnswer(item)" -- mỗi dap an la 1 cai index
//       v-bind:class="AnswerClass(item)"  -- add class cho button duoc click
//     >
//       {{item}}
//     </button> 
    // <div>
    //     <button
    //     @click="checkAnswer(),destroy()"
    //     :disabled="selectIndex === null " // cho submit khi chon 1 dap an
    //     >submit</button>                   // luc đó điều kiện disabled bị sai nên submit được

    //   </div>
//     </div>    
// `




});

var question = new Vue({
	el:"#questionComponent",
	data: {

   		StoreQuestion:[],// bien luu cau hoi
   		Answers:[],//bien luu dap an [ [],[] ]
      numCorrect:0,
      TotalSubmit:0
      
  
  	},
    methods:
    {
      increment(IsCorrect)
      {
        if(IsCorrect==true)
        {
          this.numCorrect++;
        }
        this.TotalSubmit++;
      }
    },

   
  	mounted()//tao data va ket qua
  	{
  		for(let i=0;i<10;i++)
			{
				let num1 =Math.floor(Math.random() * 1000); 
				let num2 =Math.floor(Math.random() * 100);
				operator= ['+','-','*','/'];
		        ran = (Math.floor(Math.random() * 10))%4
		        let c= num1+operator[ran]+num2; 
		        //3 + 4
		        let result =eval(c);	

        b=(Math.floor(Math.random() * 10))%4;
          //random vị trí đáp án
            
            let re0=0 ,re1=1,re2=2,re3=3;
          
            if(b==3)
            {
              re0=result-10 ,re1=result+10,re2=result+20,re3=result;
            }
            if(b==2)
            {
              re0=result-10 ,re1=result+10,re2=result,re3=result+20;
            }
            if(b==1)
            {
               re0=result+20 ,re1=result,re2=result-10,re3=result+10;
            }
            if(b==0)
            {
              re0=result ,re2=result+10,re3=+20,re1=-10;
                    
            }




		        this.StoreQuestion.push({correct:b,question:c }) 
            this.Answers.push([re0,re1,re2,re3])
			}
  	}


});
