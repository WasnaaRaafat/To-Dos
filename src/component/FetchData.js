import { useQuery, QueryClientProvider, QueryClient } from 'react-query';
import Display from './Display';
import Add from './Add';
import axios from 'axios';
import Alert from './Alert/Alert';
import { useEffect } from 'react';

const queryClient = new QueryClient();

const FetchData = () => {
  const getData = async () => {
    const res = await axios.get('http://localhost:3000/tasks');
    return res.data;
  };
  const { data, status, error, refetch } = useQuery('todos', getData);

  useEffect(() => {
    return () => {};
  }, []);

  console.log('Hello I am FetchData Component');
  return (
    <div>
      <Add refetch={refetch} />
      {status === 'success' && (
        <>
          <Display data={data} refetch={refetch} />
        </>
      )}
      {status === 'loading' && (
        <div className='flex items-center justify-center flex-col'>
          <h1 className='font-bold text-2xl underline'>Loading...</h1>
        </div>
      )}
      {status === 'error' && (
        <div className='flex items-center justify-center flex-col'>
          <Alert msg={error.message} />
          <button
            className=' py-4 px-10 lg:px-8 xl:px-10 inline-flex items-center justify-center text-center text-white text-base bg-danger hover:bg-opacity-90 font-normal rounded-full my-6'
            onClick={refetch}
          >
            Retry Again
          </button>
        </div>
      )}
    </div>
  );
};

export default function Wraped() {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchData />
    </QueryClientProvider>
  );
}
