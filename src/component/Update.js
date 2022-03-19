import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Alert from './Alert/Alert';

const Update = () => {
  const navigate = useNavigate();
  const [empty, setEmpty] = useState(false);

  const { state } = useLocation();
  const id = state.id;
  console.log(state.task + ' ---- ' + state.description);

  const [updatedData, setUpdatedData] = useState({
    task: state.task,
    description: state.description,
    date: state.date,
  });
  console.log(
    'I am updated data ' + updatedData.task + ' ' + updatedData.description
  );

  const handelonchange1 = (e) => {
    setUpdatedData((updatedData) => ({
      ...updatedData,
      task: e.target.value,
    }));
    console.log('I am input task ' + updatedData.task);
  };

  const handelonchange2 = (e) => {
    setUpdatedData((updatedData) => ({
      ...updatedData,
      description: e.target.value,
    }));
    console.log('I am input description ' + updatedData.description);
  };

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    console.log('I am updated data in the submit ' + updatedData);
    if (updatedData.description && updatedData.task) {
      setEmpty(false);

      const res = await axios.put(
        `http://localhost:3000/tasks/${id}`,
        updatedData
      );
      navigate('/Home');
      return console.log('Data Updated ' + res.status);
    } else {
      setEmpty(true);
      setTimeout(() => {
        setEmpty(false);
      }, 5000);
      <Alert msg='Please Enter a Task and a Description' />;
    }
  };
  // for useEffect Clean up of data history

  useEffect(() => {
    return () => {};
  }, [state, updatedData]);

  return (
    <div className='update container mt-8 '>
      <h1 className=' text-secondary text-center text-4xl my-9 font-bold'>
        Edit Your Task
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
                onChange={handelonchange1}
                defaultValue={state.task}
                type='text'
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
            disabled:bg-[#F5F7FD] disabled:cursor-default
            '
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
                onChange={handelonchange2}
                type='text'
                defaultValue={state.description}
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
            disabled:bg-[#F5F7FD] disabled:cursor-default
            '
              />
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            className='py-4 px-10 lg:px-8 xl:px-10 inline-flex items-center justify-center
              text-center text-white text-base  bg-secondary hover:bg-opacity-90 font-normal rounded-full'
            type='submit'
          >
            Edit
          </button>
        </div>
      </form>
      <div className='flex justify-center mt-8'>
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
            mb-5'
        >
          <Link to='/Home'>Back to Home</Link>
        </button>
      </div>
      {empty && <Alert msg='please Enter values in the inputs above' />}
    </div>
  );
};

export default Update;
