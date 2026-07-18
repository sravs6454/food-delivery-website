import React, { useState } from 'react';
import Header from '../../components/Header/Header';  
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import TopSellingToday from '../../components/TopSellingToday/TopSellingToday'; // ✅ Add this line

const Home = () => {
    const [category, setCategory] = useState("All");

    return (
        <div>
            <Header />  
            <TopSellingToday /> {/* ✅ Show top items here */}
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
            <AppDownload />
        </div>
    );
};

export default Home;
