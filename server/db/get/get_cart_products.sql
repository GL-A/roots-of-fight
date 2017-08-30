-- select order_id, user_id, product_id, size, jsonb_agg(images.img_url)
-- from orders
-- JOIN  products on products.id = orders.product_id
-- join images on images.product_id = products.id;
 
-- SELECT row_to_json(t)
--  from (
--  select  name,
--  (
--  	select array_to_json(array_agg(row_to_json(d)))
-- 	 	from (
-- 	 		select img_url, product_id
-- 	 		from images
-- 	 		where product_id = products.id
--
-- 	 	)d
--  	) as imgs
--  	from products
--  )t

SELECT *
FROM orders
WHERE user_id = $1;
