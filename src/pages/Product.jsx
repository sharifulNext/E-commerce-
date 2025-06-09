import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams(); 
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const product = products.find((item) => item._id == productId || item.id == productId);
    if (product) {
      setProductData(product);
      setImage(Array.isArray(product.image) ? product.image[0] : product.image);
    }
  }, [productId, products]);

  if (!productData) {
    return <div>Loading product...</div>;
  }

  return (
    <div className='border-t-2 pt-10'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* -------Product Images------ */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'> 
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {Array.isArray(productData.image) && productData.image.map((item, index) => (
              <img 
                onClick={() => setImage(item)} 
                src={item} 
                key={index} 
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' 
                alt="" 
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>      
        </div>

        {/* ------Product Info------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 font-medium text-3xl'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-300 md:w-4/5'>{productData.description}</p>
          {/* -------Size Selector-------- */}
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 border-gray-100 cursor-pointer bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}

            </div>

          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white cursor-pointer px-8 py-3 text:sm active:bg-gray-700'>ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5 border border-gray-200" />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery available.</p>
            <p>Easy 30 days returns and exchanges.</p>
          </div>
        </div>
      </div>

      {/* -------Description & Reviews--------- */}
      <div className='mt-20'>
        <div className='flex'>
        <b className='border border-gray-200 px-5 py-3 text-sm'>Description</b>
        <p className='border border-gray-200 px-5 py-3 text-sm'>Reviews(122)</p>

        </div>

       <div className='flex flex-col gap-4 border border-gray-200 px-6 py-6 text-sm text-gray-500'>
        <p>These platforms can range from small online shops to large marketplaces, offering a wide variety of products and services.</p>
        <p>selling of goods and services over the internet. It provides a virtual storefront where customers can browse products, add them to a cart, and complete transactions securely.</p>
        <p>Customers can search for specific items, view product details, and make purchases using various payment methods. E-commerce websites often include features like user accounts, order tracking, and customer reviews to enhance the shopping experience.</p> 
        </div>
      </div>
       {/* ------display related products-------- */}
       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  );
};

export default Product;
