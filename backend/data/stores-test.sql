    SELECT store.stores_id, store.name, store.address, comment.comment_star ,stores_img.img_name , MIN(room_campsite.normal_price) AS lowest_normal_price
    FROM store
    LEFT JOIN comment
    ON store.stores_id = comment.stores_id
    LEFT  JOIN stores_img 
    ON store.stores_id = stores_img.stores_id
    LEFT JOIN room_campsite
    ON store.stores_id = room_campsite.stores_id
    GROUP BY 
        store.stores_id;

--填地點跟tag，記得要where
        SELECT 
    store.stores_id, 
    store.name, 
    store.address, 
    st.tag_id AS my_tag_id,
    t.tag_name,
    ROUND(c.comment_star, 1) AS comment_star, 
    si.img_name,
    rc.lowest_normal_price
    FROM 
        store
    LEFT JOIN 
        store_tag st ON store.stores_id = st.stores_id
    LEFT JOIN 
        tag t ON st.tag_id = t.tag_id
    LEFT JOIN 
        (SELECT stores_id, AVG(comment_star) AS comment_star
        FROM comment
        GROUP BY stores_id) c ON store.stores_id = c.stores_id
    LEFT JOIN 
        (SELECT stores_id, MAX(img_name) AS img_name
        FROM stores_img
        GROUP BY stores_id) si ON store.stores_id = si.stores_id
    LEFT JOIN 
        (SELECT stores_id, MIN(normal_price) AS lowest_normal_price
        FROM room_campsite
        GROUP BY stores_id) rc ON store.stores_id = rc.stores_id;

-- 只填地點，沒有tag，記得要where
    SELECT 
    store.stores_id, 
    store.name, 
    store.address, 
    ROUND(c.comment_star, 1) AS comment_star, 
    si.img_name,
    rc.lowest_normal_price
    FROM 
        store
    LEFT JOIN 
        (SELECT stores_id, AVG(comment_star) AS comment_star
        FROM comment
        GROUP BY stores_id) c ON store.stores_id = c.stores_id
    LEFT JOIN 
        (SELECT stores_id, MAX(img_name) AS img_name
        FROM stores_img
        GROUP BY stores_id) si ON store.stores_id = si.stores_id
    LEFT JOIN 
        (SELECT stores_id, MIN(normal_price) AS lowest_normal_price
        FROM room_campsite
        GROUP BY stores_id) rc ON store.stores_id = rc.stores_id;

-- 只填關鍵字，記得設變數
       SELECT 
    store.stores_id, 
    store.name, 
    store.address, 
    ROUND(c.comment_star, 1) AS comment_star, 
    si.img_name,
    rc.lowest_normal_price
    FROM 
        store
    LEFT JOIN 
        (SELECT stores_id, AVG(comment_star) AS comment_star
        FROM comment
        GROUP BY stores_id) c ON store.stores_id = c.stores_id
    LEFT JOIN 
        (SELECT stores_id, MAX(img_name) AS img_name
        FROM stores_img
        GROUP BY stores_id) si ON store.stores_id = si.stores_id
    LEFT JOIN 
        (SELECT stores_id, MIN(normal_price) AS lowest_normal_price
        FROM room_campsite
        GROUP BY stores_id) rc ON store.stores_id = rc.stores_id
          WHERE name LIKE '%露營%';


          SELECT store.stores_id, store.name, store.address, 
            ROUND(AVG(comment.comment_star), 1) AS comment_star, 
            MAX(stores_img.img_name) AS img_name, 
            MIN(room_campsite.normal_price) AS lowest_normal_price
     FROM store
     LEFT JOIN comment ON store.stores_id = comment.stores_id
     LEFT JOIN stores_img ON store.stores_id = stores_img.stores_id
     LEFT JOIN room_campsite ON store.stores_id = room_campsite.stores_id
     WHERE 1=1 AND store.address='南投縣'
     GROUP BY store.stores_id, store.name, store.address