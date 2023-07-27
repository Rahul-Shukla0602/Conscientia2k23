import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiconnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/PageAndComponents';
// import Error from '../pages/Error'
import {setLoading} from '../slices/profileSlice'
// import { Link, matchPath } from 'react-router-dom';
import EventCard from '../components/EventCard'

const Event = () => {
  const { loading } = useSelector((state) => state.profile)
  const [ catalogName,setcatalogName]  = useState("Workshops");
  // const { token } = useSelector((state) => state.auth);
  // const { user } = useSelector((state) => state.profile);
  // const location = useLocation();
  const [sublinks, setSubLinks] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [catalogPageData, setCatalogPageData] = useState(null);
  // const [active, setActive] = useState(1)
  const [selectedSublink, setSelectedSublink] = useState(0); // State to track the selected sublink
  

  useEffect(() => {
    const fetchSubLinks = async () => {
      setLoading(true)
      try {
        const result = await apiconnector('GET', categories.CATEGORIES_API);
        console.log("res---: ",result)
        setSubLinks(result.data.allCategory);
        const category_id=result?.data?.allCategory?.filter((ct) => ct.name === catalogName)[0]._id;
        // console.log("DEKH to: ", category_id)
        setCategoryId(category_id);
        // console.log("res after: ", category_id)
      } catch (error) {
        console.log(error);
        // console.log('could not fetch the categories list');
      }
    };
    fetchSubLinks()
    setLoading(false)
  }, [catalogName]);

  // const matchRoute = (route) => {
  //   return matchPath({ path: route }, location.pathname);
  // };

  // Function to handle sublink click
  const handleSublinkClick = (index,name) => {
    setSelectedSublink(index);
    setcatalogName(name);
  };
  console.log("catalogName: ",catalogName,categoryId)

  useEffect(() => {
    const getCategoryDetails = async() => {
        try{
            const res = await getCatalogaPageData(categoryId);
            console.log("PRinting res: ", res);
            setCatalogPageData(res);
        }
        catch(error) {
            console.log(error)
        }
    }
    if(categoryId!==null){
        getCategoryDetails();
    }
},[categoryId]);

if (loading || !catalogPageData) {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="spinner"></div>
    </div>
  )
}
// if (!loading && !catalogPageData.success) {
//   return <Error/>
// }


  return (
    <div className='relative text-richblack-50 lg:w-full mr-[10px]'>

      <div className='flex lg:flex-row gap-4 lg:gap-16 items-center justify-center text-sm lg:text-lg bg-richblack-600
        absolute top-[140px] left-1/2 transform -translate-x-1/2 px-4 lg:px-10 py-2 lg:py-2 whitespace-nowrap rounded-3xl'>
        {sublinks.length ? (
          sublinks.map((subLink, index) => (
            <p
              key={index}
              className={`cursor-pointer ${selectedSublink === index ? 'bg-richblack-700 rounded-2xl px-2 lg:px-3 lg:py-1' : ''}`}
              onClick={() => handleSublinkClick(index,subLink.name)} // Call the function on click
            >
              {subLink.name}
            </p>
          ))
        ) : (
          <div></div>
        )}
      </div>

      <div className="transform translate-y-[240px] text-richblack-25 mx-auto box-content
       w-full max-w-maxContent px-4 lg:py-12 lg:max-w-maxContent">
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
          {
            catalogPageData?.data?.selectedCategory?.event?.map((event,index)=>{
              return(
                <EventCard event={event} key={index}/>
              )
            })
          }
        </div>  
      </div>


    </div>
  );
};

export default Event;



// to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
