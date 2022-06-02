import { NextSeo } from 'next-seo';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { AppConfig } from '@/utils/AppConfig';

const Meta = ({ title, description, canonical }) => {
  const { site_name, locale } = AppConfig;

  return (
    <>
      <Head>
        <meta charSet='UTF-8' key='charset' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1'
          key='viewport'
        />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          title: title,
          description: description,
          url: canonical,
          locale: locale,
          site_name: site_name,
        }}
      />
    </>
  );
};

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonical: PropTypes.string,
};

Meta.defaultProps = {
  title: '',
  description: '',
  canonical: '',
};

export default Meta;
