import styles from "./Orders.module.css";

function OrderTable(props) {
  const { order } = props;

  return (
    <div className={styles.OrderTable}>
      <p>
        {`Ordered On :- ${order.date} ${order.time}`}
      </p>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id}>
              <td className={styles.itemTitle}>
                <p>
                  {item.title.length <= 75
                    ? item.title
                    : item.title.substring(0, 73) + "..."}
                </p>
              </td>
              <td>$ {item.price}</td>
              <td>{item.quantity}</td>
              <td>$ {Number((item.quantity * item.price).toFixed(2))}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className={styles.totalPrice} colSpan={4}>
              $ {Number(order.total.toFixed(2))}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default OrderTable;
