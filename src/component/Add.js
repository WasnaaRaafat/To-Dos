import { useState } from 'react';
import axios from 'axios';
import Alert from './Alert/Alert';
import Success from './Alert/Success';
// import { QueryClientProvider, QueryClient } from 'react-query';
// const queryClient = new QueryClient();

const Add = ({ refetch }) => {
  const current = new Date();

  const [empty, setEmpty] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tasks, setTasks] = useState({
    task: '',
    description: '',
    date: '',
  });

  const clearInputs = () => {
    document.getElementById('input_1').value = '';
    document.getElementById('input_2').value = '';
  };

  const handelonchange1 = (e) => {
    setTasks((tasks) => ({
      ...tasks,
      task: e.target.value,
    }));
  };

  const handelonchange2 = (e) => {
    setTasks((tasks) => ({
      ...tasks,
      description: e.target.value,
      date: `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`,
    }));
  };

  const handelOnSubmit = async (e) => {
    e.preventDefault();

    console.log(tasks);
    if (tasks.task && tasks.description) {
      const res = await axios.post('http://localhost:3000/tasks', tasks);
      console.log('Data Added ' + res.status);
      setEmpty(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } else {
      setEmpty(true);
      setTimeout(() => {
        setEmpty(false);
      }, 5000);
    }
    refetch();
    clearInputs();
  };
  return (
    <div className='add container mt-8 '>
      <h1 className=' text-blue-400 text-center text-4xl my-9 font-bold'>
        What's On Your Mind?
      </h1>
      <form action='' onSubmit={handelOnSubmit}>
        <div className='flex flex-wrap mx-auto my-6 justify-center'>
          <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
            <div className='mb-12'>
              <label
                htmlFor=''
                className='font-medium text-base text-black block mb-3'
              >
                New Task:
              </label>
              <input
                id='input_1'
                onChange={handelonchange1}
                type='text'
                placeholder='New Task'
                className='
              w-full
              border-[1.5px] border-form-stroke
              rounded-lg
              py-3
              px-5
              font-medium
              text-body-color
              placeholder-body-color
              outline-none
              focus:border-primary
              active:border-primary
              transition
              disabled:bg-[#F5F7FD] disabled:cursor-default'
              />
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
            <div className='mb-12'>
              <label
                htmlFor=''
                className='font-medium text-base text-black block mb-3'
              >
                Task Description:
              </label>
              <input
                id='input_2'
                onChange={handelonchange2}
                type='text'
                placeholder='Task Description'
                className='
              w-full
              border-[1.5px] border-form-stroke
              rounded-lg
              py-3
              px-5
              font-medium
              text-body-color
              placeholder-body-color
              outline-none
              focus:border-primary
              active:border-primary
              transition
              disabled:bg-[#F5F7FD] disabled:cursor-default'
              />
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center flex-col mb-9'>
          <button
            className='
              py-4
              px-10
              lg:px-8
              xl:px-10
              inline-flex
              items-center
              justify-center
              text-center text-white text-base
              bg-primary
              hover:bg-opacity-90
              font-normal
              rounded-full
              mb-6'
            type='submit'
          >
            Add
          </button>

          {empty && <Alert msg='please Enter values in the inputs above' />}
          {success && <Success msg='A new To dos added' />}
        </div>
      </form>
    </div>
  );
};

export default Add;
