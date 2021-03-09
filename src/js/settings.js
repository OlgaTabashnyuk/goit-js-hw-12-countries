function handleInput(event) {
  searchResultsRef.innerHTML = '';
  const countrySearchName = event.target.value;
  fetchCountries(countrySearchName)
    .then(data => {
      if (data.length > 10) {
        alert({
          text: 'Too many matches found. Please enter a more specific query!',
          type: 'error',
          delay: 4000,
          stack: new Stack({
            dir1: 'up',
          }),
        });
      }
      if (data.length >= 2 && data.length <= 10) {
        searchResultsRef.insertAdjacentHTML(
          'beforeend',
          createListCountriesTemplate(data),
        );
      }
      if (data.length === 1) {
        searchResultsRef.insertAdjacentHTML(
          'beforeend',
          createCountryPropertiesTemplate(data),
        );
      }
    })
    .catch(console.log);
}