import React, { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  onSubmit: (comment: ICommentMutation) => void;
}

const initialState = {
  author: '',
  text: '',
}

const NewCommentForm: React.FC<Props> = ({onSubmit}) => {
  const [comment, setComment] = useState(initialState);

  const submitFormHandler = (e: FormEvent) => {
   e.preventDefault();
    onSubmit({...comment});
    setComment(initialState);
  }

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment({...comment, [e.target.name]: e.target.value});
  }

  return (
    <div>
      <h2>Comment</h2>
      <form onSubmit={submitFormHandler}>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input className="form-control" id="author" name='author' value={comment.author} onChange={inputChangeHandler}/>
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">Content</label>
          <textarea className="form-control" id="text" name='text' value={comment.text} onChange={inputChangeHandler}/>
        </div>
        <button type="submit" className="btn btn-primary">Add Comment</button>
      </form>
    </div>
  );
};

export default NewCommentForm;