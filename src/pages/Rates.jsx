import { Wave } from 'react-animated-text';

import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBaseCurrency,
  selectError,
  selectFilteredRates,
  selectIsLoading,
  selectRates,
} from '../reduxState/selectors';
import { useEffect } from 'react';
import { fetchLatestSymbols } from '../reduxState/currency/operations';
import Loader from '../components/Loader/Loader';
import RatesList from '../components/RatesList/RatesList';
import Filter from '../components/Filter/Filter';

const Rates = () => {
  const dispatch = useDispatch();
  const isError = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const rates = useSelector(selectRates);
  const baseCurrency = useSelector(selectBaseCurrency);
  const filteredRates = useSelector(selectFilteredRates);

  useEffect(() => {
    dispatch(fetchLatestSymbols(baseCurrency));
  }, [baseCurrency, dispatch]);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        {rates.length > 0 && <Filter />}
        {filteredRates.length > 0 && <RatesList rates={filteredRates} />}
        {isLoading && <Loader />}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
