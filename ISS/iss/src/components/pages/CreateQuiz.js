import React, {Fragment, useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from 'axios';
import {GrFormPreviousLink} from "react-icons/gr";
import {MdDisabledByDefault} from "react-icons/md"
import '../../App.css';



export default function CreateQuiz() {
 
  const [answer1, setAnswer1] = useState({
    'value': '',
    'Boolean': false
  }) 

  const [answer2, setAnswer2] = useState({
    'value': '',
    'Boolean': false
  }) 

  const [answer3, setAnswer3] = useState({
    'value': '',
    'Boolean': false
  }) 

  const [answer4, setAnswer4] = useState({
    'value': '',
    'Boolean': false
  }) 
  const [rightAnswer, setRightAnswer] = useState('')

  const [answers,setAnswers] = useState([])  
 
  const [QuizItem, setQuizItem] = useState({
    'answers': answers,
    'question': '',
  }) 

  const [quizItems, setQuizItems] = useState ([])

  


 const change = (e) => {
   answers.push(answer1)
   answers.push(answer2)
   answers.push(answer3)
   answers.push(answer4)
   setQuizItem({...QuizItem,"answers":answers})
   console.log("quizItem=", QuizItem)
   quizItems.push(QuizItem)
   console.log("quizItems", quizItems)
   
   setAnswers([])
   

   
 }

 const submit = (e) => {
  
   e.preventDefault()
   setAnswer1({'value':'', 'Boolean': false})
   setAnswer2({'value':'', 'Boolean': false})
   setAnswer3({'value':'', 'Boolean': false})
   setAnswer4({'value':'', 'Boolean': false})
   setRightAnswer('')
   setQuizItem({
    'answers': answers,
    'question': '',  
  })
 }
 

 const onChange1 =()=>{
   setAnswer1({...answer1,'Boolean': true})
   setAnswer2({...answer2,'Boolean':false})
   setAnswer3({...answer3,'Boolean':false})
   setAnswer4({...answer4,'Boolean':false})
   setRightAnswer(answer1.value)
 }

 const onChange2 =()=>{
  setAnswer2({...answer2,'Boolean': true})
  setAnswer1({...answer1,'Boolean':false})
  setAnswer3({...answer3,'Boolean':false})
  setAnswer4({...answer4,'Boolean':false})
  setRightAnswer(answer2.value)
}

const onChange3 =()=>{
  setAnswer3({...answer3,'Boolean': true})
  setAnswer2({...answer2,'Boolean':false})
  setAnswer1({...answer1,'Boolean':false})
  setAnswer4({...answer4,'Boolean':false})
  setRightAnswer(answer3.value)
}

const onChange4 =()=>{
  setAnswer4({...answer4,'Boolean': true})
  setAnswer2({...answer2,'Boolean':false})
  setAnswer3({...answer3,'Boolean':false})
  setAnswer1({...answer1,'Boolean':false})
  setRightAnswer(answer4.value)
}
const navigate = useNavigate()
const [quiz,setQuiz] = useState({
  'author': '61f557af2e60ae73bbce112f',
  'quizItems': quizItems
})
const [author,setAuthor] =useState("61f557af2e60ae73bbce112f")

const Save = () => {
  change()
  const url = "http://localhost:8000/api/addOne"
  axios.post(url, {  
    quizItems
}).then(() => console.log(quizItems))
.catch(error => console.log(error))
  navigate("/quizItems")
}


 
  return (
  <Fragment>
    <Helmet><title>JaWEB - Create a quiz</title></Helmet>
    <form  onSubmit={submit}>

    
    <div className='createquiz'>
      <div className='quiz-wrapper'>
        <div className='lifeline-container'>
          <p>
            <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
          </p>
          <p>
            <span className='mdi mdi-lightlub-on-outline mdi-24px lifeline-icon'></span>
          </p>
        </div>
    <input placeholder='Question' className="Question" value={QuizItem.question} onChange={e => setQuizItem({ ...QuizItem,"question": e.target.value})}  />
    <div className='options-container'>
  
         <span><input className='option' value={answer1.value}  placeholder='option 1'  onChange={e => {setAnswer1(prevState => ({...prevState,'value':e.target.value})); }}  /> <input type='checkbox' className='box' onClick={onChange1}  checked={answer1.Boolean} /> </span>
         <span><input className='option'  value={answer3.value} placeholder='option 3' onChange={e => {setAnswer3(prevState => ({...prevState,'value':e.target.value})); }} /> <input  type='checkbox' className='box' onClick={onChange3} checked={answer3.Boolean}/> </span>
       
      
    </div>
    <div className='options-container'>
       <span> <input className='option' value={answer2.value}  placeholder='option 2'  onChange={e => {setAnswer2({...answer2,'value': e.target.value})}}/> <input type='checkbox' className='box' onClick={onChange2} checked={answer2.Boolean}/> </span>
        <span><input className='option' value={answer4.value}  placeholder='option 4' onChange={e => {setAnswer4({...answer4,'value': e.target.value})}} /> <input type='checkbox' className='box' onClick={onChange4} checked={answer4.Boolean}/> </span>
  
        </div>
    <div className='button-container'>
      
      <button type={submit} onClick={change}>add</button>
      <button onClick={Save} >Save</button>  
    </div>
    </div>
    </div>
    </form>
  </Fragment>
  );
}