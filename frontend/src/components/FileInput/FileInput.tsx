import { useRef, useState } from 'react';
import * as React from 'react';

interface Props {
  name: string;
  onGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({name, onGetFile}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    } else {
      setFileName('');
    }

    onGetFile(e);
  };

  const activateInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
        <input
          style={{display: 'none'}}
          type="file"
          name={name}
          onChange={onFileChange}
          ref={inputRef}

        />
        <div className='d-flex row align-items-center'>
            <div className='col-6'>
              <label htmlFor="image">Image</label>
              <textarea
                disabled
                className={'mt-1 border-black form-control'}
                name='image'
                value={fileName}
              />
            </div>
            <div className='col-4'>
              <button className='btn btn-dark' onClick={activateInput}>Browse</button>
            </div>
        </div>
    </>
  );
};

export default FileInput;