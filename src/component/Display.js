import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Success from './Alert/Success';

const Display = ({ data, refetch }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const handelUpdate = (id, e) => {
    e.preventDefault();
  };

  const handelDelete = async (id, e) => {
    e.preventDefault();
    const res = await axios.delete(`http://localhost:3000/tasks/${id}`);
    refetch();
    setIsDeleted(true);
    setTimeout(() => {
      setIsDeleted(false);
    }, 5000);
    console.log('Deleted ' + res.status);
  };

  return (
    <>
      {isDeleted && (
        <Success msg='Well done with Finishing the task, deleted.' />
      )}

      <section className='pt-10 lg:pt-[60px] pb-10 lg:pb-20 bg-[#F3F4F6]'>
        <div className='container'>
          <h1 className=' text-blue-400 text-center text-2xl mb-9 underline font-bold'>
            My To Do List:
          </h1>
          <div className='flex flex-wrap flex-row -mx-4'>
            {data.map((tasks, key) => (
              <div className='w-full md:w-1/2 xl:w-1/3 px-4' key={key}>
                <div className=' w-full bg-secondary bg-opacity-[15%] rounded-lg  shadow-md border-l-[6px] border-secondary'>
                  <div className='bg-white rounded-lg overflow-hidden mb-10'>
                    <div className=' p-9 sm:p-9 md:p-9 xl:p-13 text-left'>
                      <h3
                        className='
                      cursor-pointer font-semibold text-primary text-xl sm:text-[22px]  md:text-xl  lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 inline-block'
                      >
                        {tasks.task}
                      </h3>
                      <p className=' text-body-color leading-relaxed mb-4 text-sm'>
                        {tasks.description}
                      </p>
                      <div className='flex items-center '>
                        <button
                          onClick={(e) => handelUpdate(tasks.id, e)}
                          className=' inline-block mr-5  rounded-full text-base font-medium text-secondary hover:underline transition'
                        >
                          <Link
                            to='/Update'
                            state={{
                              id: tasks.id,
                              task: tasks.task,
                              description: tasks.description,
                              date: tasks.date,
                            }}
                          >
                            Edit
                          </Link>
                        </button>

                        <button
                          className=' inline-block rounded-full text-base font-medium text-danger  hover:underline transition mr-10'
                          onClick={(e) => {
                            const confirmBox = window.confirm(
                              'Are you sure you really want to delete this Task?'
                            );
                            if (confirmBox === true) {
                              handelDelete(tasks.id, e);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                      <p className='text-xs text-slate-400 font-bold inline-block mt-4 '>
                        Created on:
                        <span className='ml-1'> {tasks.date}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Display;
