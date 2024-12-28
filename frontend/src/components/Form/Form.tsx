import React, { useState } from 'react';
import FileInput from '../FileInput/FileInput';

interface Props {
  onSubmit: (post: IPostMutation) => void
}

const initialState = {
  title: '',
  description: '',
  image: null,
};

const Form: React.FC<Props> = ({onSubmit}) => {
  const [form, setForm] = useState<IPostMutation>(initialState);

  const SubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({...form});
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, name} = e.target;

    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setForm(prevState => ({
        ...prevState,
        [name]: files[0] || null,
      }))
    }
  };

  return (
    <div>
      <form onSubmit={SubmitFormHandler}>
        <h3>Add new Post</h3>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            className="mt-1 border-black form-control"
            value={form.title}
            onChange={inputChangeHandler}
          />
        </div>

        <div>
          <label htmlFor="description">Content: </label>
          <textarea
            name="description"
            className="mt-1 border-black form-control"
            value={form.description}
            onChange={inputChangeHandler}
          />
        </div>

        <div>
          <FileInput name="image" onGetFile={fileEventChangeHandler}/>
        </div>

        <div>
          <button type="submit" className="btn btn-dark mt-3">Add Post</button>
        </div>
      </form>
    </div>
  );
};

export default Form;