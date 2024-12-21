import React, { useState } from 'react';
import FileInput from '../FileInput/FileInput';

interface Props {
  onSubmit: (post: IPostMutation) => void
}

const initialState = {
  title: '',
  content: '',
  image: null,
};

const Form: React.FC<Props> = ({onSubmit}) => {
  const [form, setForm] = useState<IPostMutation>(initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, name} = e.target;

    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({...form});
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
      <form onSubmit={onSubmitHandler}>
        <h3>Add new Post</h3>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            className="mt-1 border-black form-control"
            value={form.title}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="content">Content: </label>
          <textarea
            name="content"
            className="mt-1 border-black form-control"
            value={form.content}
            onChange={onChange}
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