import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOnePost } from '../Posts/slices/postsSlice';

const FullPosts = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectOnePost);

  return (
    <div>

    </div>
  );
};

export default FullPosts;