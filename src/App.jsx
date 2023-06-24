import React from 'react';
import { useState } from 'react';
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [content, setContent] = useState([
    { id: 1, title: "리엑트 공부", body: '리엑트 기초 가자!!',status:'working' },
    { id: 2, title: "구현하기", body: '해보자!!!',status:'done' }
  ]);

  const onchangeTitlehandler = (event) => {
    setTitle(event.target.value)
  };

  const onchaneBodyhandler = (event) => {
    setBody(event.target.value)
  };

  // 추가하기버튼
  const addbuttonhandler = (event) => {
    event.preventDefault();

    const newContent = {
      id: content.length + 1,
      title,
      body,
      status:'working',
    };
    setContent([...content, newContent])
    setTitle('');
    setBody('')
  };

  //삭제하기버튼
  const removebuttonhandler = (id) => {
    const removeContent = content.filter((content) => {
      return content.id !== id;
    })
    setContent(removeContent)
  }

  //완료버튼
  const completebuttonhandler =(id) =>{
    const completeContent = content.map((item) =>{
      if (item.id === id){
        return {...item, status:'done'};
      }
      return item
    });
    setContent(completeContent);
  }

  //최소버튼
  const canclebuttonhandler =(id) =>{
    const cancleContent = content.map((item) => {
      if (item.id === id){
        return {...item, status:"working"}
      }
      return item
    })
    setContent(cancleContent)
  }

  return (
    <div className='layout' >
      <form className='add-form' onSubmit={addbuttonhandler} >
        <div className='input-group'>
          <label className='form-label'>제목</label>
          <input type='text' name='title' className='add-input' value={title} onChange={onchangeTitlehandler} required></input>
          <label className='form-label'>내용</label>
          <input type='text' name='body' className='add-input' value={body} onChange={onchaneBodyhandler} required></input>
        </div>
        <div><button className='add-button' type='submit'>추가하기</button></div>
      </form>
      <div className='list-container'>
        <h2 className='list-titl'>Working..</h2>
        <div className='list-wrapper'>
         {content
         .filter((item)=> item.status ==='working')
         .map((item)=>{
          return (
            <div className='todo-container' key={item.id}>
              <div>
                <h2 className='todo-title'> {item.title}</h2>
                <div>{item.body}</div>
                <div className='button-set'>
                  <button className='delete-button button' onClick={() => removebuttonhandler(item.id)} > 삭제하기</button>
                  <button className='complete-button button' onClick={()=> completebuttonhandler(item.id)}> 완료</button>
                </div>
              </div>
            </div>
          )
         })
         }
        </div>

        <h2 className='list-titl'>Done..!!</h2>
        <div className='list-wrapper'>
         {content
         .filter((item)=> item.status ==='done')
         .map((item)=>{
          return (
            <div className='todo-container' key={item.id}>
              <div>
                <h2 className='todo-title'> {item.title}</h2>
                <div>{item.body}</div>
                <div className='button-set'>
                  <button className='delete-button button' onClick={() => removebuttonhandler(item.id)} > 삭제하기</button>
                  <button className='cancle-button button'  onClick={() => canclebuttonhandler(item.id)} > 취소</button>
                </div>
              </div>
            </div>
          )
         })
         }
        </div>

      </div>
    </div>
  );
}

export default App;
