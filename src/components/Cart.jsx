// import './Cart.css';

// const formatPrice = new Intl.NumberFormat([], { style: 'currency', currency: 'USD' }).format;

const Cart = ({selected}) => (
  <div className="cart">
    {
      selected.length === 0
      ? <h2>The cart is empty</h2>
      : selected.map(course => (
          <div key={course.id}>
            {course.title}
          </div>
        ))
    }
  </div>
);

export default Cart;