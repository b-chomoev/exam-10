import Form from '../../components/Form/Form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCreateLoading } from '../../store/slices/newsSlice';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../store/thunks/newsThunks';
import { toast } from 'react-toastify';
import Spinner from '../../components/UI/Spinner/Spinner';

const NewPost = () => {
  const dispatch = useAppDispatch();
  const isCreateLoading = useAppSelector(selectCreateLoading);
  const navigate = useNavigate();

  const onSubmitForm = async (post: IPostMutation) => {
    await dispatch(createPost(post));
    toast.success('Product was successfully created!');
    navigate('/');
  };

  return (
    <>
      {isCreateLoading ? <Spinner/> :
        <Form onSubmit={onSubmitForm}/>
      }
    </>
  );
};

export default NewPost;