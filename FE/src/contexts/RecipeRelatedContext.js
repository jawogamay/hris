import { createContext, useContext, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import useApi from '@/hooks/useApi';
import PropTypes from 'prop-types';
import FullPageSpinner from '@/components/molecules/FullPageSpinner';

const Context = createContext();

export function RecipeRelatedCTX({ children }) {
  const router = useRouter();
  const { id } = router.query;

  const [data, fetching, error] = useApi({
    method: 'GET',
    url: `/recipes/related/${id}`,
  });

  useEffect(() => {
    if (error) {
      Router.push('/404');
    }
  }, [error]);

  return fetching ? (
    <FullPageSpinner />
  ) : (
    <Context.Provider value={data}>{children}</Context.Provider>
  );
}

export function useRecipeRelatedCTX() {
  return useContext(Context);
}

RecipeRelatedCTX.propTypes = {
  children: PropTypes.node.isRequired,
};
