UPDATE orders
SET qty = $2
WHERE order_id = $1
RETURNING *;
