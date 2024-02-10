import React, { useEffect } from "react";
import { useRecoilState } from "recoil"; // assuming you have the Recoil atom defined
import { bookOrdersAtom } from "../recoile/atom/booksAtom";
import { cancelOrder, getOrders } from "../services/book";

interface BookOrder {
  order_id: number;
  title: string;
}


const BookOrderList = () => {
  const [bookOrders, setBookOrders] = useRecoilState(bookOrdersAtom);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [isCancelled, setCancelled] = React.useState(false);

  React.useEffect(() => {
    // setLoading(true);
    getOrders(page, 10).then((res) => {
      let { data } = res;
      console.log(data);

      setBookOrders((old) => data);
      // setLoading(false);
      if (data.length === 0) {
        setHasMore(false);
      }
    });

    console.log(bookOrders);
  }, [page]);

  const handleCancelOrderButtonClick = async (id: number) => {
    try {
      // setLoading(true);

      // Perform your API call here
      // For demonstration purposes, I'm using a placeholder URL
      console.log("orderid", id)
      const response = await cancelOrder(id)

      // Handle the API response as needed
      if (response.data) {
        console.log('Order cancelled successfully!');
        setCancelled(true);
        const filtered = bookOrders.filter((order: BookOrder) => {
          return order.order_id !== id;
        })
        setBookOrders(filtered)
        // Additional logic if the order is successful
      } else {
        console.error('Failed to place order.');
        // Additional error handling logic
      }
    } catch (error) {
      console.error('Error during API call:', error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Book Orders</h2>
      <div className="row">
        {bookOrders.length
          ? bookOrders.map((order: BookOrder, i) => (
              <div key={i} className="col-lg-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Book Name: {order.title}</h5>
                    <p className="card-text">Quantity: 1</p>
                  </div>
                  <div className="card-footer">
                  <div className="mt-2 mb-5 flex justify-items-start">
          <button
            className="btn btn-danger"
            onClick={() =>handleCancelOrderButtonClick(order.order_id)}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              'Cancel'
            )}
          </button>
        </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default BookOrderList;
