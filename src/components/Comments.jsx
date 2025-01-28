import {useEffect, useState} from "react";

function Comments({dealComments, onEnter}) {
  const [comment, setComment] = useState( "");

  useEffect(function () {
    function callBack(e) {
      if (e.code.toLowerCase() === 'enter') {
        if(!comment.trim()) return
        onEnter(comment);
        setComment('');
      }
    }

    document.addEventListener('keydown', callBack);

    return function () {
      document.removeEventListener('keydown', callBack);
    }
  }, [comment])

  return (
    <>
      <div className="comments-create__block">
        <p>Комментарий</p>
        <input className="comments-input" type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Введите комментарий"/>
      </div>
      {dealComments && (
        <ul className="comments-archive__block">
          {dealComments?.map((dealComment) => (
            <li className="comments-item" key={dealComment}>{dealComment}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Comments