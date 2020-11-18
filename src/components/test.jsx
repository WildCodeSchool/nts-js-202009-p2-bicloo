/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import CardJob from './CardJob';
import Load from './Load';

import { JobsContext } from '../context/JobsContext';
import { SearchContext } from '../context/SearchContext';
import { FullTimeContext } from '../context/FullTimeContext';
import { LocationContext } from '../context/LocationContext';

const Main = () => {
  const { description } = useContext(SearchContext);
  const { location } = useContext(LocationContext);
  const { fullTime } = useContext(FullTimeContext);
  const { jobs, setJobs } = useContext(JobsContext);
  const [lengthPages, setLengthPages] = useState(0);
  const [currentPages, setCurrentPage] = useState(1);
  const [cursor, SetCursor] = useState({ start: 0, end: 5 });
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    setIsLoad(true);
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${description}&location=${location}`,
        {
          header: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .then((res) => {
        const length = res.data.length;

        if (length > 5) {
          setLengthPages(Math.ceil(length));
        } else {
          setLengthPages(0);
        }

        const result = res.data.map((job, i) => {
          return {
            id: job.id,
            index: i,
            title: job.title,
            logo: job.company_logo,
            company: job.company,
            location: job.location,
            description: job.description,
            apply: job.how_to_apply,
            type: job.type,
            time: job.created_at,
          };
        });

        setJobs(result);
        SetCursor({ start: 0, end: length > 5 ? 5 : length });
        setIsLoad(false);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description, location]);

  const onChange = (page, sizePages) => {
    setCurrentPage(page);
    SetCursor({ start: (page - 1) * sizePages, end: page * sizePages });
    window.scrollTo(0, document.querySelector('.Main').offsetTop);
  };

  return (
    <main className="Main">
      {isLoad ? (
        <Load />
      ) : jobs.length ? (
        jobs
          .filter((job) => {
            if (fullTime) {
              return 'Full Time' === job.type;
            }
            return job;
          })
          .slice(cursor.start, cursor.end)
          .map((job) => (
            <Link key={job.id} to={`/${job.index}`}>
              <CardJob index={job.index} {...job} />
            </Link>
          ))
      ) : (
        <p className="none-job">no job offers here</p>
      )}
      {lengthPages > 0 && (
        <Pagination
          style={{ marginTop: '2rem' }}
          onChange={onChange}
          pageSize={5}
          current={currentPages}
          total={lengthPages}
        />
      )}
    </main>
  );
};

export default Main;
