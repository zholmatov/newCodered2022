import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import "fontsource-roboto";
import Copyright from "./Copyright";
import Button from '@material-ui/core/Button';


const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);


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
      // console.log(data, " data");
      setProductsBySell(data)
      setLoading(false);
      // return data;
    }


  const loadProductsBySell = () => {
    const data = getProducts();
    setProductsBySell(data);
  };

  const loadProductsByArrival = () => {
    const data = getProducts();
    setProductsBySell(data);
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Welcome!"
      description=""
      className="container-fluid"
    >
      <Search />

      <div className='ml-3 mt-2' style={{ border: 'none' }}>
          <Button  variant="contained" component="label" style={{ backgroundColor:"#6772E5", color: 'white' }}>
            Upload Image
            <input type="file" accept="image/*"
              onChange={getImages
              }
            hidden/>
          </Button>
          </div>

        {loading && <h3>Loading...</h3>}
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          {productsBySell.length > 9 && <h2 className="mb-2">New Arrivals</h2>}
          {productsBySell.length <= 9 && <h2 className="mb-2">Best Matches</h2>}
          <p>Total products: {productsBySell.length}</p>
          <div className="row">
            {productsByArrival.map((product, i) => (
              <div key={i} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <Card product={product} />
              </div>
            ))}
          </div>

          {/* <h2 className="mb-2 mt-4">Best Sellers</h2> */}
          <div className="row">
            {productsBySell.map((product, i) => (
              <div key={i} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>

      <Copyright />
    </Layout>
  );
};

export default Home;
