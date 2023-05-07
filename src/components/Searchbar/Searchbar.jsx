import { Formik } from 'formik';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import {
  SearchForm,
  SearchButton,
  SearchInput,
  SearchSection,
  SearchButtonLabel,
} from './Searchbar.styled';

const initialValues = {
  value: '',
};

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (values, { resetForm }) => {
    if (!values.value.trim()) {
      toast.error('Please enter a search query');
    } else {
      onSearch(values.value);
      resetForm();
    }
  };
  return (
    <header>
      <SearchSection>
        <Formik
          className="form"
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <SearchForm className="form">
            <SearchButton type="submit" className="button">
              <SearchButtonLabel className="SearchForm-button-label">
                Find
              </SearchButtonLabel>
            </SearchButton>

            <SearchInput
              className="input"
              type="text"
              name="value"
              autoFocus
              placeholder="Search images and photos"
              autoComplete="off"
            />
          </SearchForm>
        </Formik>
      </SearchSection>
    </header>
  );
};
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
