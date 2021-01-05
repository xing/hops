import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet-async';
import query from './jobs.gql';
import styles from './styles.css';

export const Home = ({ data: { loading, jobSearchByQuery } }) => {
  return (
    <div>
      <Helmet>
        <title>Hops Demo</title>
      </Helmet>
      <h1 className={styles.headline}>Hello World!</h1>
      {loading ? (
        <div>loading...</div>
      ) : (
        jobSearchByQuery.collection.map(({ jobDetail }) => {
          const company = jobDetail.companyInfo.company;
          return (
            <p key={jobDetail.id}>
              <a href={jobDetail.url}>"{jobDetail.title}"</a> at{' '}
              <b>{company ? company.companyName : 'N/A'}</b>
            </p>
          );
        })
      )}
    </div>
  );
};

export default () => {
  const data = useQuery(query);
  return <Home data={data} />;
};
