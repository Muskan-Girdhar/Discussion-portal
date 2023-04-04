addNewQuestionButton=document.getElementById("new-question-button");
formContainer=document.getElementById("form-side");
let QKey=0;
let x=[];
let y=[];
let F=[]

function refreshList(){
    console.log(x);
   document.getElementById("list-questions").innerHTML="";
   x.forEach(function(va){
       addQuestionToList(va);
   });
}

function saveDataToLocal(){
  
   console.log(x);
   localStorage.setItem("DiscussionAppData",JSON.stringify(x));
   localStorage.setItem("DiscussionAppQKey",JSON.stringify(QKey));
   refreshList();
   QKey++;
}

function setTimeDifference(obj,pB2)
{
   let currentDateAndTime = new Date();
   let dyear = currentDateAndTime.getYear() - obj.AddedTime.year;
   let dmonth =  currentDateAndTime.getMonth() - obj.AddedTime.month;
   let  dDD= currentDateAndTime.getDay() - obj.AddedTime.dd;
   let dHH= currentDateAndTime.getHours() - obj.AddedTime.hh;
   let dMM= currentDateAndTime.getMinutes() - obj.AddedTime.mm;
   let dSS= currentDateAndTime.getSeconds() - obj.AddedTime.ss;

   if(dyear>=2) pB2.innerHTML=dyear+" Years ago";
   else if(dyear==1) 
   {
       if(dmonth>=0) 
       pB2.innerHTML="1 Year ago";
       else
        pB2.innerHTML=(12+dmonth) + " Months ago";
   }
   else if(dmonth>=2)
    pB2.innerHTML=dmonth+" Month ago";
   else if(dmonth==1)
   {
       if(dDD>=0) 
       pB2.innerHTML= "1 Month ago";
       else pB2.innerHTML= (30+dDD) + " Days ago";
   }
   else if(dDD>=2)
    pB2.innerHTML= dDD+" Days ago";
   else if(dDD==1)
   {
       if(dHH>=0) pB2.innerHTML= "1 Day ago";
       else pB2.innerHTML= (24+dHH) + " Hours ago";
   }
   else if(dHH>=2)
    pB2.innerHTML= dHH+" Hours ago";
   else if(dHH==1)
   {
       if(dMM>=0) pB2.innerHTML= "1 Hour ago";
       else pB2.innerHTML= (60+dMM) + " Minutes ago";
   }
   else if(dMM>=2)
    pB2.innerHTML= dMM+" Minutes ago";
   else if(dMM==1)
   {
       if(dSS>=0)
        pB2.innerHTML= "1 Minute ago";
       else 
       pB2.innerHTML= "Just now";
   }
   else pB2.innerHTML="Just now";
}

function sorByVotes(){
   x.sort((a,b) =>{
        if(b.favorite==true&&a.favorite==true) 
        {
            if(b.votes>=a.votes)
        return 1;
        else
        return -1;
        }
        
        else if(b.favorite==false&&a.favorite==false)  
        {
            if(b.votes>=a.votes)
        return 1;
        else
        return -1;
        }
       else if(b.favorite==false&&a.favorite==true) return -1;
       else return +1;
   });
   refreshList(x);
}

 function openNewForm()
 {
    console.log("newform open");
    
    formContainer.innerHTML="";
    document.getElementById("search-box").value="";
    //create heading-Welcome to discussion portal !
    let tempH1 = document.createElement("h1");
    tempH1.innerHTML="Welcome to discussion portal !";
    tempH1.setAttribute("class","form-heading");
    formContainer.appendChild(tempH1);
    //create paragraph
    let tempP = document.createElement("p");
    tempP.innerHTML = "Enter a subject and question that you want to ask";
    tempP.setAttribute("class","form-paragraphs");
    formContainer.appendChild(tempP);
    //for question and tittle
    let tempDiv1 = document.createElement("div");
    let tempInput1 = document.createElement("input");
    tempInput1.setAttribute("type","text");
    tempInput1.setAttribute("placeHolder","Subject");
    tempInput1.setAttribute("id","questionTitle");
    tempDiv1.appendChild(tempInput1);
    formContainer.appendChild(tempDiv1);
    
    let tempTextarea = document.createElement("textarea");
    tempTextarea.setAttribute("class","mytextarea");
    tempTextarea.setAttribute("rows","5");
    tempTextarea.setAttribute("placeholder","Enter Your question here : ");
    tempTextarea.setAttribute("id","askedQuestion");
    formContainer.appendChild(tempTextarea);

    let tempDiv2 = document.createElement("div");
    tempDiv2.setAttribute("class","submit-button-container");
    let tempButton = document.createElement("button");
    tempButton.innerHTML = "Submit";
    tempButton.setAttribute("onclick","addNewQuestion()")
    
    tempDiv2.appendChild(tempButton);
    formContainer.appendChild(tempDiv2);
 }

 function addNewQuestion()
 {
    console.log("submit clicked");
    let titleBox = document.getElementById("questionTitle").value;
    let questionBox=document.getElementById("askedQuestion").value;

    if(titleBox=="" || questionBox=="")
    {
        alert("Enter the tittle and question properly");
        return;
    }
    let tempDate =new Date;
    let localObj=
    {
        
        questionTitle: titleBox,
        question: questionBox,
        votes:0,
        AddedTime :
        {
            year: tempDate.getYear(),
            month:tempDate.getMonth(),
            dd : tempDate.getDay(),
            hh: tempDate.getHours(),
            mm: tempDate.getMinutes(),
            ss: tempDate.getSeconds(),
        },
        favorite: false,
        person:[]
    }
    titleBox.value="",
    questionBox.value="",
    x.push(localObj);
    saveDataToLocal();
    
 }
 function addQuestionToList(obj)
 {
   //one block
   let containerDiv = document.createElement("div");
   containerDiv.setAttribute("class", "question-container");
   //left-side-part
   let titleDiv=document.createElement("div");
   titleDiv.setAttribute("class", "title-div");
   titleDiv.addEventListener("click",function()
   {
       openQuestionDescription(obj,obj.id); // calling question response page
   });

   let h3=document.createElement("h3");
    h3.innerHTML=obj.questionTitle;
    h3.setAttribute("class", "title");
    titleDiv.appendChild(h3);

    let pA=document.createElement("p");
    pA.innerHTML=obj.question;
    pA.setAttribute("class", "question");
    titleDiv.appendChild(pA);
    containerDiv.appendChild(titleDiv);

      //right side logo's of the question
    let divB = document.createElement("div");
    divB.setAttribute("class","question-options-grid");
      //div for showing count
    let divB1= document.createElement("div");
    divB1.setAttribute("class","grid-item");
    let pB1=document.createElement("p");
    pB1.innerHTML=obj.votes;
    divB1.appendChild(pB1);
    divB.appendChild(divB1);

   //logo for like button
    let divB2 = document.createElement("div");
    divB2.setAttribute("class","grid-item");
    divB2.classList.add("like-button");
    let imglike = document.createElement("img");
    imglike.setAttribute("src","like.png");
    // when click on like image
    imglike.addEventListener("click",function(){
        obj.votes=obj.votes+1;
        sorByVotes();
        localStorage.setItem("DiscussionAppData",JSON.stringify(x));
        refreshList(x);
    });
    divB2.appendChild(imglike);
    divB.appendChild(divB2);
    // div for dislike image
    let divB3 = document.createElement("div");
    divB3.setAttribute("class","grid-item");
    divB3.classList.add("dislike-button");
    let imgdislike = document.createElement("img");
    imgdislike.setAttribute("src","dislike.png");
    //click on dislike button
    imgdislike.addEventListener("click",function(){
        obj.votes=obj.votes-1;
        sorByVotes();
        localStorage.setItem("DiscussionAppData",JSON.stringify(x));
        refreshList(x);
    });
    divB3.appendChild(imgdislike);
    divB.appendChild(divB3);
    // div for showing time
    let divB4 = document.createElement("div");
    divB4.setAttribute("class","grid-item");
    let pB2= document.createElement("p");
    pB2.setAttribute("class","time-text");
    setTimeDifference(obj ,pB2);
    setInterval(function(){
       setTimeDifference(obj ,pB2);
    },2500);
    divB4.appendChild(pB2);
    divB.appendChild(divB4);
    // image for making favourites
    let divB5 = document.createElement("div");
    divB5.setAttribute("class","grid-item");
    let imgstar = document.createElement("img");
    if(!obj.favorite)
    imgstar.setAttribute("src","star-blank.png");
    else
    imgstar.setAttribute("src","star-fill.png");

    imgstar.addEventListener("click",function(){
        if(obj.favorite){
            imgstar.setAttribute("src","star-blank.png");
            obj.favorite=false;
            sorByVotes();
            localStorage.setItem("DiscussionAppData",JSON.stringify(x));
            refreshList(x);
        }
        else{
            imgstar.setAttribute("src","star-fill.png");
            obj.favorite=true;
            sorByVotes();
            localStorage.setItem("DiscussionAppData",JSON.stringify(x));
            refreshList(x);
        }
    });
    divB5.appendChild(imgstar);
    divB.appendChild(divB5);

    containerDiv.appendChild(divB);

    document.getElementById("list-questions").appendChild(containerDiv);
 }

 window.addEventListener("load",function(){
   let localStorageData = JSON.parse(localStorage.getItem("DiscussionAppData"));
   let localStorageQKey = JSON.parse(localStorage.getItem("DiscussionAppQKey"));
   if(localStorageData!=undefined)
   {
       x=localStorageData;
       QKey=localStorageQKey;
       sorByVotes(x);
   }
  
});

function openQuestionDescription(obj,key) {
   formContainer.innerHTML = "";
   //selected ques shown 
   let tempQuestionDiv = document.createElement("div");
   tempQuestionDiv.setAttribute("class","selected-question");
   let temph2_1 = document.createElement("h2");
   temph2_1.setAttribute("class","grey-text");
   temph2_1.innerHTML="Question";
   tempQuestionDiv.appendChild(temph2_1);
   //div for showing tittle and ques
   let tempDivA = document.createElement("div");
   tempDivA.setAttribute("class","form-side-question-container");
   let temph3A = document.createElement("h3");
   temph3A.innerHTML=obj.questionTitle;
   tempDivA.appendChild(temph3A);

   let tempPA = document.createElement("p");
   tempPA.innerHTML=obj.question;
   tempDivA.appendChild(tempPA);
   tempQuestionDiv.appendChild(tempDivA);
   formContainer.appendChild(tempQuestionDiv);

   let tempDivResolveButton = document.createElement("div");
   tempDivResolveButton.setAttribute("class","resolve-button-container");
   let tempResolveButton = document.createElement("button");
   tempResolveButton.innerHTML = "Resolve";
   tempResolveButton.addEventListener("click",function(){
       let d = searchObjectById(obj.qid);// deleteing the ques from the list
       if(d!=undefined){
           x.splice(d,1);
           localStorage.setItem("DiscussionAppData",JSON.stringify(x));
           refreshList(x);
           formContainer.innerHTML="";
       }
   });
   tempDivResolveButton.appendChild(tempResolveButton);
   formContainer.appendChild(tempDivResolveButton);
   // showing responses
   let tempDivB = document.createElement("div");
   tempDivB.setAttribute("class","given-responses");
   let temph3B = document.createElement("div");
   temph3B.setAttribute("class","grey-text");
   temph3B.innerHTML="Response";
   tempDivB.appendChild(temph3B);
   console.log(obj);
   if(obj.person!=undefined)
   {
    obj.person.forEach(function(a){
        tempDivB.appendChild(addResponsePersons(a));
    });
   }
   

   // taking response 
   formContainer.appendChild(tempDivB);
   let tempDivC = document.createElement("div");
   tempDivC.setAttribute("class","add-new-responses");
   let temph2C = document.createElement("h2");
   temph2C.setAttribute("class","grey-text");
   temph2C.innerHTML="Add Response";
   tempDivC.appendChild(temph2C);
   let tempDiv2C = document.createElement("div");
   let tempInput = document.createElement("input");
   tempInput.setAttribute("id","response-person-name");
   tempInput.setAttribute("type","text");
   tempInput.setAttribute("placeholder","Enter your name : ");
   tempDiv2C.appendChild(tempInput);
   tempDivC.appendChild(tempDiv2C);
   let tempTextArea = document.createElement("textarea");
   tempTextArea.setAttribute("id","new-response-text");
   tempTextArea.setAttribute("class","mytextarea");
   tempTextArea.setAttribute("rows","8")
   tempTextArea.setAttribute("placeholder","Enter your answer : ");
   tempDivC.appendChild(tempTextArea);
   let DivBC = document.createElement("div");
   DivBC.setAttribute("class","submit-button-container");
   let tempButton = document.createElement("button");
   tempButton.innerHTML="Submit";

   tempButton.addEventListener("click",function(){
       let newResponse = createNewResponse();
       

       if(newResponse!=undefined){
        
         
           obj.person.push(newResponse); 
        
           localStorage.setItem("DiscussionAppData",JSON.stringify(x));
           openQuestionDescription(obj,key);
       }
   });
   DivBC.appendChild(tempButton);
   tempDivC.appendChild(DivBC);
   formContainer.appendChild(tempDivC);
}

function createNewResponse(){
    let nameBox = document.getElementById("response-person-name");
    let responseBox = document.getElementById("new-response-text");
    let userName = nameBox.value.trim();
    let userAnswer = responseBox.value.trim();
    if(userName==""||userAnswer=="") { alert("Please enter userName and answer properly"); return}
    let obj = {
        name: userName,
        answer: userAnswer
    };
    return obj;
}
function addResponsePersons(answerObj){
    let Div = document.createElement("div");
    Div.setAttribute("class","response-div");
    let h2 = document.createElement("h2");
    h2.innerHTML=answerObj.name;
    let p = document.createElement("p");
    p.innerHTML=answerObj.answer;
    Div.appendChild(h2);
    Div.appendChild(p);
    return Div;
}


//for searchbox;
let searchBox = document.getElementById("search-box");
searchBox.addEventListener("keyup",function(event){
    document.getElementById("form-side").innerHTML="";
    let pattern=searchBox.value.trim();
    if(pattern!="")
        searchFunction(pattern);
    else {
        sorByVotes();
        y=[];
        F=[];
    }
});
function searchFunction(pattern){
    y=[];
    F=[];
    let found1,found2;
    let myQuestion,mytitle, myPattern;
    x.forEach(function(a)
    {
        let tempObj;
        myQuestion=a.question.toUpperCase();
        mytitle=a.questionTitle.toUpperCase();
        myPattern=pattern.toUpperCase();
        found1=mytitle.search(myPattern);
        found2=myQuestion.search(myPattern);

        if(found1!=-1||found2!=-1){
            y.push(a);
            tempObj={
                title: found1,
                question: found2
            };
            F.push(tempObj);
        }
        
    });
    refreshSearchedList(y,F,pattern.length);
}
// ----------------------------------------------------------------------------------------------------
function refreshSearchedList(mylist,F,length){
    document.getElementById("list-questions").innerHTML="";
    for(let i=0; i<mylist.length; i++){
        addSearchedQuestionToList(mylist[i],F[i].title,F[i].question,length,mylist,F);
    }
}
function searchObjectById(ID){
    let i=0,index=-1;
    let found = null;
    found =  x.forEach(function(a){
        if(a.qid==ID){
            index=i;
        }
        i++;
    });
    return index;
}

function sortSearchedByVotes(mylist,F,length){
    mylist.sort((a,b) =>{
       
            if(b.favorite==true&&a.favorite==true) 
            {
                if(b.votes>=a.votes)
            return 1;
            else
            return -1;
            }
            
            else if(b.favorite==false&&a.favorite==false) 
            
            {
                if(b.votes>=a.votes)
            return 1;
            else
            return -1;
            }
           else if(b.favorite==false&&a.favorite==true) 
           return -1;
           else return +1;
       });
         
    
    refreshSearchedList(mylist,F,length);
}
function addSearchedQuestionToList(obj,pos1,pos2,length,mylist,F){
    let containerDiv = document.createElement("div");
    containerDiv.setAttribute("class", "question-container");
    let titleDiv=document.createElement("div");
    titleDiv.setAttribute("class", "title-div");
    titleDiv.addEventListener("click",function(){
        openQuestionDescription(obj,obj.id);
    });
    let h3=document.createElement("h3");
    if(pos1>-1)
    h3.innerHTML=`${obj.questionTitle.substring(0,pos1)}<i>${obj.questionTitle.substring(pos1,pos1+length)}</i>${obj.questionTitle.substring(pos1+length)}`;
    else
    h3.innerHTML=obj.questionTitle;
    h3.setAttribute("class", "title");
    titleDiv.appendChild(h3);
    let pA=document.createElement("p");
    if(pos2>-1)
    pA.innerHTML=`${obj.question.substring(0,pos2)}<i>${obj.question.substring(pos2,pos2+length)}</i>${obj.question.substring(pos2+length)}`;
    else
    pA.innerHTML=obj.question;
    pA.setAttribute("class", "question");
    titleDiv.appendChild(pA);
    containerDiv.appendChild(titleDiv);
    let divB = document.createElement("div");
    divB.setAttribute("class","question-options-grid");
    let divB1= document.createElement("div");
    divB1.setAttribute("class","grid-item");
    let pB1=document.createElement("p");
    pB1.innerHTML=obj.votes;
    divB1.appendChild(pB1);
    divB.appendChild(divB1);
    let divB2 = document.createElement("div");
    divB2.setAttribute("class","grid-item");
    divB2.classList.add("like-button");
    let imglike = document.createElement("img");
    imglike.setAttribute("src","like.png");
    imglike.addEventListener("click",function(){
        obj.votes=obj.votes+1;
        sortSearchedByVotes(mylist,F,length);
        localStorage.setItem("DiscussionAppData",JSON.stringify(x));
        refreshSearchedList(mylist,F,length);
    });
    divB2.appendChild(imglike);
    divB.appendChild(divB2);
    let divB3 = document.createElement("div");
    divB3.setAttribute("class","grid-item");
    divB3.classList.add("dislike-button");
    let imgdislike = document.createElement("img");
    imgdislike.setAttribute("src","dislike.png");
    imgdislike.addEventListener("click",function(){
        obj.votes=obj.votes-1;
        sortSearchedByVotes(mylist,F,length);
        localStorage.setItem("DiscussionAppData",JSON.stringify(x));
        refreshSearchedList(mylist,F,length);
    });
    divB3.appendChild(imgdislike);
    divB.appendChild(divB3);
    let divB4 = document.createElement("div");
    divB4.setAttribute("class","grid-item");
    let pB2= document.createElement("p");
    pB2.setAttribute("class","time-text");
    setTimeDifference(obj ,pB2);
    setInterval(function(){
       setTimeDifference(obj ,pB2);
    },5000);
    divB4.appendChild(pB2);
    divB.appendChild(divB4);
    let divB5 = document.createElement("div");
    divB5.setAttribute("class","grid-item");
    let imgstar = document.createElement("img");
    if(!obj.favorite)
    imgstar.setAttribute("src","star-hollow.png");
    else
    imgstar.setAttribute("src","star-blue.png");
    imgstar.addEventListener("click",function(){
        if(obj.favorite){
            imgstar.setAttribute("src","star-hollow.png");
            obj.favorite=false;
            sortSearchedByVotes(mylist,F,length);
            localStorage.setItem("DiscussionAppData",JSON.stringify(x));
            refreshSearchedList(mylist,F,length);
        }
        else{
            imgstar.setAttribute("src","star-blue.png");
            obj.favorite=true;
            sortSearchedByVotes(mylist,F,length);
            localStorage.setItem("DiscussionAppData",JSON.stringify(x));
            refreshSearchedList(mylist,F,length);
        }
    });
    divB5.appendChild(imgstar);
    divB.appendChild(divB5);
    containerDiv.appendChild(divB);
    document.getElementById("list-questions").appendChild(containerDiv);
}



