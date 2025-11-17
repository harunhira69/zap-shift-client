import React from 'react';
import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands'
import Reviews from '../Reviews/Reviews';

const reviwsData = fetch('/reviews.json').then(res=>res.json())


const Home = () => {
    return (
    <div>
        <Banner></Banner>
        <Brands></Brands>
        <Reviews reviwsData={reviwsData}></Reviews>
    </div>
    
    );
};

export default Home;