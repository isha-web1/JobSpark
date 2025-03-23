/* eslint-disable react/prop-types */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TabCategories = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/jobs`);
        console.log('Fetched jobs data:', data);
        setJobs(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err);
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>Error loading jobs.</p>;
  }

  const mapCategory = (category) => {
    if (category.toLowerCase().includes('web')) return 'Web_Development';
    if (category.toLowerCase().includes('graphic')) return 'Graphics_Design';
    if (category.toLowerCase().includes('digital')) return 'Digital_Marketing';
    return 'Unknown'; // Handle unexpected categories
  };

  return (
    <Tabs>
      <div className='container px-6 py-10 mx-auto'>
        <h1 className='text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl '>
          Browse Jobs By Categories
        </h1>

        <p className='max-w-2xl mx-auto my-6 text-center text-gray-500 '>
          Three categories available for the time being. They are Web
          Development, Graphics Design and Digital Marketing. Browse them by
          clicking on the tabs below.
        </p>
        <div className='flex items-center justify-center'>
          <TabList>
            <Tab>Web_Development</Tab>
            <Tab>Graphics_Design</Tab>
            <Tab>Digital_Marketing</Tab>
          </TabList>
        </div>
        <TabPanel>
          <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {jobs
              .filter((j) => mapCategory(j.category) === 'Web_Development')
              .map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {jobs
              .filter((j) => mapCategory(j.category) === 'Graphics_Design')
              .map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {jobs
              .filter((j) => mapCategory(j.category) === 'Digital_Marketing')
              .map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategories;