import React, { useState } from 'react';
import { postOrder } from '../services/book';

function ProductCard({ data: { title, writer, cover_image, point, id } }: any) {
  const [loading, setLoading] = useState(false);

  const handleOrderButtonClick = async () => {
    try {
      setLoading(true);

      // Perform your API call here
      // For demonstration purposes, I'm using a placeholder URL
      console.log("bkid", id)
      const response = await postOrder({bookId: id})

      // Handle the API response as needed
      if (response.data) {
        console.log('Order placed successfully!');
        // Additional logic if the order is successful
      } else {
        console.error('Failed to place order.');
        // Additional error handling logic
      }
    } catch (error) {
      console.error('Error during API call:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group my-10  flex w-full max-w-xs flex-col justify-center overflow-hidden border border-gray-100 bg-white">
      <a className="relative  flex h-60 overflow-hidden" href="/">
        <img
          alt="product"
          height={'auto'}
          width={'100%'}
          className="peer absolute top-0 right-0 object-cover"
          src={cover_image}
        />
      </a>
      <div className="mt-4 px-5 pb-5">
        <a className="flex items-start" href="/">
          <h5 className="text-lg justify-self-start tracking-tight text-slate-900">{title}</h5>
        </a>
        <div className="mt-2 mb-5 flex justify-items-start">
          <span style={{ color: 'red' }} className="text-lg font-bold text-slate-900 flex">
            {writer}
          </span>
          <span className="text-lg text-slate-900 ml-auto font-bold">{point} Pts</span>
        </div>
        <div className="mt-2 mb-5 flex justify-items-start">
          <button
            className="btn btn-primary"
            onClick={handleOrderButtonClick}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              'Order'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


export default ProductCard;
