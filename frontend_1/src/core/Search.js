import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import { getCategories, list } from './apiCore';
import Card from './Card';
import { colors } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  tField: {
    width: 600,
    marginTop: 2,
  },
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `Search: No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div className='row'>
        <div className='col-md-1'></div>
        <div className='col-md-10'>
          <h2 className='mt-4 mb-4 text-center'>{searchMessage(searched, results)}</h2>
          <div className='row'>
            {results.map((product, i) => (
              <div className='col-md-4 mb-3'>
                <Card key={i} product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className='col-md-1'></div>
      </div>
    );
  };
  /*
  const uploadImage = (e) => {
    e.preventDefault();
    let filePath = e.target.value;
    let start = filePath.indexOf("fakepath") + 9;
    let end = filePath.length;
    console.log(filePath.substring(start, end));
  }
  */
  const [fileName, setFileName] = useState("");

  const classes = useStyles();

  // IMPORTANT!!
  const [loading, setLoading] = useState(false);

  async function getImages(e) {
    e.preventDefault();
    setLoading(true);
    let filePath = e.target.value;
    let start = filePath.indexOf("fakepath") + 9;
    let end = filePath.length;
    const path = filePath.substring(start, end);
    const data = await fetch("/get-images/" + path).then((res) => res.json());
    console.log(data, " data");
    setLoading(false);
    // return data;
  }


  const searchForm = () => (

    <form onSubmit={searchSubmit} className={classes.root}>
      <span className='input-group-text'>
        <div className='input-group input-group-lg'>
          <div className='input-group-prepend'>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-helper-label'>
                Select
              </InputLabel>
              <Select
                labelId='demo-simple-select-placeholder-label-label'
                id='demo-simple-select-placeholder-label'
                value={data.name}
                onChange={handleChange('category')}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value='All'>
                  <em>All</em>
                </MenuItem>
                {categories.map((c, i) => (
                  <MenuItem key={i} value={c._id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <TextField
            onChange={handleChange('search')}
            id='outlined-basic'
            label={<span><SearchIcon/>Search by name</span>}
            variant='outlined'
            className={classes.tField}
            autoComplete='off'
          />

          <div style={{ display:'flex' }}>
            
          <div className='ml-3 mt-2' style={{ border: 'none' }}>
            <Button  ml={2} variant='contained' style={{ backgroundColor:"#6772E5", color: 'white' }} type='submit'>
              Search
            </Button>
          </div>
          
          
        


          </div>

        </div>
      </span>
    </form>
  );

  return (
    <div className='row'>
      <div className='container mb-3'>{searchForm()}</div>
      <div className='container-fluid mb-3'>{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
