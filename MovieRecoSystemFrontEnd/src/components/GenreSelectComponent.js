import AsyncSelect from 'react-select/async'
 const GenreSelectComponent=()=>{
    const options = [
        { value: 'Action', label: 'Action' },
        { value: 'Adventure', label: 'Adventure' }, 
       { value: 'Animation', label: 'Animation' },
       { value: 'Children', label: 'Children' },
       { value: 'Comedy', label: 'Comedy' },
       { value: 'Crime', label: 'Crime' },        
      { value: 'Fantasy', label: 'Fantasy' },
      { value: 'Documentary', label: 'Documentary'},
       { value: 'Drama', label: 'Drama' },
    { value: 'Film-Noir', label: 'Film-Noir' },
      { value: 'Horror', label: 'Horror' },
      { value: 'IMAX', label: 'IMAX' },
      { value: 'Musical', label: 'Musical' },
      { value: 'Mystery', label: 'Mystery' },
        { value: 'Thriller', label: 'Thriller' },
      { value: 'Sci-Fi', label: 'Sci-Fi' },
      { value: 'War', label: 'War' }
      ]
      const handleChange=(selectedOption)=>{
        setSelectedoption(Array.isArray(selectedOption)? selectedOption.map(x=>x.value):[])
        for (let i = 0; i < selectedOption.length; i++) {
            result = result.concat(selectedOption[i].value);
            if (i < selectedOption.length - 1) {
                result = result.concat("|");
            }
        }
        setGenres(result)
        console.log( genres);
      };
    return(
        <AsyncSelect 
        loadOptions={loadOptions} 
        defaultOptions
         isMulti
        onChange={handleChange}/>
    )
 }
export default GenreSelectComponent