import { useQuery } from '@tanstack/react-query';
import { fetchComments } from './api';
import './PostDetail.css';

export function PostDetail({ post }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isError) {
    return (
      <>
        <h3>Oops, something went wrong!</h3>
        <p>{error.toString()}</p>
      </>
    );
  }

  if (isLoading) {
    return <h3>LOADING...</h3>;
  }

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
