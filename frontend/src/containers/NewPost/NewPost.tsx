import Form from '../../components/Form/Form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAddLoading } from '../Posts/slices/postsSlice';
import { useNavigate } from 'react-router-dom';
import { addNewPost } from '../Posts/thunks/postsThunks';
import { toast } from 'react-toastify';
import Spinner from '../../components/UI/Spinner/Spinner';

const NewPost = () => {
  const dispatch = useAppDispatch();
  const isCreateLoading = useAppSelector(selectAddLoading);
  const navigate = useNavigate();

  const sendPost = async (post: IPostMutation) => {
    await dispatch(addNewPost(post));
    toast.success('Product was successfully created!');
    navigate('/');
  };

  return (
    <>
      {isCreateLoading ? <Spinner/> :
        <Form onSubmit={sendPost}/>
      }
    </>
  );
};

export default NewPost;