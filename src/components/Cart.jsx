const Cart = ({selected, biglist}) => (
  <div className="cart">
    {
      selected.length === 0
      ? <div>
          <h2>The cart is empty</h2>
          <p>Please select courses by clicking.</p>
        </div>
      : selected.map(id => (
        <div className="card">
          <div className="card-header">
            CS {biglist.find(course => course.id === id).number}
          </div>
          <div className="card-body">
            <h5 className="card-title">{biglist.find(course => course.id === id).title}</h5>
            <p className="card-text">{biglist.find(course => course.id === id).term} {biglist.find(course => course.id === id).meets}</p>
          </div>
        </div>
        ))
    }
  </div>
);

export default Cart;