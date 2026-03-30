function SearchBar({ value, onChange, onSubmit, disabled }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="search-label" htmlFor="city">
        Cerca una citta
      </label>
      <div className="search-row">
        <input
          id="city"
          className="search-input"
          type="text"
          placeholder="Es. Milano"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
        />
        <button className="search-button" type="submit" disabled={disabled}>
          {disabled ? 'Caricamento...' : 'Cerca'}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
