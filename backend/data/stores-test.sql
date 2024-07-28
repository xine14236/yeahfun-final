    SELECT store.stores_id, store.name, store.address, comment.comment_star ,stores_img.img_name , MIN(rooms_campsites.normal_price) AS lowest_normal_price
    FROM store
    LEFT JOIN comment
    ON store.stores_id = comment.stores_id
    LEFT  JOIN stores_img 
    ON store.stores_id = stores_img.stores_id
    LEFT JOIN rooms_campsites
    ON store.stores_id = rooms_campsites.stores_id
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
        FROM rooms_campsites
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
        FROM rooms_campsites
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
        FROM rooms_campsites
        GROUP BY stores_id) rc ON store.stores_id = rc.stores_id
          WHERE name LIKE '%露營%';


          SELECT store.stores_id, store.name, store.address, 
            ROUND(AVG(comment.comment_star), 1) AS comment_star, 
            MAX(stores_img.img_name) AS img_name, 
            MIN(rooms_campsites.normal_price) AS lowest_normal_price
     FROM store
     LEFT JOIN comment ON store.stores_id = comment.stores_id
     LEFT JOIN stores_img ON store.stores_id = stores_img.stores_id
     LEFT JOIN rooms_campsites ON store.stores_id = rooms_campsites.stores_id
     WHERE 1=1 AND store.address='南投縣'
     GROUP BY store.stores_id, store.name, store.address

    SELECT s.*,
       GROUP_CONCAT(t.tag_name SEPARATOR ',') AS tag_name
        FROM store AS s
       INNER JOIN store_tag AS st ON st.stores_id = s.stores_id
       INNER JOIN tag AS t ON t.tag_id = st.tag_id
    WHERE t.tag_name IN ('草地', '遠景','獨立包區','森林系','櫻花祭','親子同遊','雨棚','小木屋','山景雲海','海景')
    GROUP BY s.stores_id;

    -- 成功篩選 單筆tag
    SELECT s.stores_id, s.name, s.address, 
        GROUP_CONCAT(DISTINCT t.tag_name SEPARATOR ',') AS tag_name,
        ROUND(AVG(comment.comment_star), 1) AS comment_star, 
        MAX(stores_img.img_name) AS img_name, 
        MIN(rooms_campsites.normal_price) AS lowest_normal_price
        FROM store AS s
        LEFT JOIN comment ON s.stores_id = comment.stores_id
        LEFT JOIN stores_img ON s.stores_id = stores_img.stores_id
        LEFT JOIN rooms_campsites ON s.stores_id = rooms_campsites.stores_id
        INNER JOIN store_tag AS st ON st.stores_id = s.stores_id
        INNER JOIN tag AS t ON t.tag_id = st.tag_id
        WHERE t.tag_name IN ('草地', '遠景','獨立包區','森林系','櫻花祭','親子同遊','雨棚','小木屋','山景雲海','海景')
        AND s.address="南投縣"
        AND s.name LIKE '%露營%'
        AND t.tag_name="櫻花祭"
        GROUP BY s.stores_id, s.name, s.address;

-- 此為全部資料
SELECT s.stores_id, s.name, s.address, 
       GROUP_CONCAT(DISTINCT t.tag_name SEPARATOR ',') AS tag_name,
       ROUND(AVG(comment.comment_star), 1) AS comment_star, 
       MAX(stores_img.img_name) AS img_name, 
       MIN(rooms_campsites.normal_price) AS lowest_normal_price
        FROM store AS s
        LEFT JOIN comment ON s.stores_id = comment.stores_id
        LEFT JOIN stores_img ON s.stores_id = stores_img.stores_id
        LEFT JOIN rooms_campsites ON s.stores_id = rooms_campsites.stores_id
        INNER JOIN store_tag AS st ON st.stores_id = s.stores_id
        INNER JOIN tag AS t ON t.tag_id = st.tag_id
        WHERE t.tag_name IN ('草地', '遠景', '獨立包區', '森林系', '櫻花祭', '親子同遊', '雨棚', '小木屋', '山景雲海', '海景')
        AND s.address = '南投縣'
        AND s.name LIKE '%露營%'
        AND s.stores_id IN (
            SELECT s.stores_id
            FROM store AS s
            LEFT JOIN rooms_campsites ON s.stores_id = rooms_campsites.stores_id
            GROUP BY s.stores_id
            HAVING MIN(rooms_campsites.normal_price) BETWEEN 1000 AND 2000
            )
            GROUP BY s.stores_id, s.name, s.address
            HAVING FIND_IN_SET('櫻花祭', GROUP_CONCAT(DISTINCT t.tag_name SEPARATOR ','));

-- 此為全部資料02 7/14最正確
        SELECT s.stores_id, s.name, s.address, 
       GROUP_CONCAT(DISTINCT t.tag_name SEPARATOR ',') AS tag_name,
       ROUND(AVG(comment.comment_star), 1) AS comment_star, 
       MAX(stores_img.img_name) AS img_name, 
       MIN(rooms_campsites.normal_price) AS lowest_normal_price
        FROM store AS s
        LEFT JOIN comment ON s.stores_id = comment.stores_id
        LEFT JOIN stores_img ON s.stores_id = stores_img.stores_id
        LEFT JOIN rooms_campsites ON s.stores_id = rooms_campsites.stores_id
        INNER JOIN store_tag AS st ON st.stores_id = s.stores_id
        INNER JOIN tag AS t ON t.tag_id = st.tag_id
            GROUP BY s.stores_id, s.name, s.address
            HAVING lowest_normal_price BETWEEN 500 AND 1000;


   SELECT s.stores_id, s.name, s.address, 
       GROUP_CONCAT(DISTINCT t.tag_name SEPARATOR ',') AS tag_name,
       ROUND(AVG(comment.comment_star), 1) AS comment_star, 
       MAX(stores_img.img_name) AS img_name, 
       MIN(rooms_campsites.normal_price) AS lowest_normal_price
        FROM store AS s
        LEFT JOIN comment ON s.stores_id = comment.stores_id
        LEFT JOIN stores_img ON s.stores_id = stores_img.stores_id
        LEFT JOIN rooms_campsites ON s.stores_id = rooms_campsites.stores_id
        INNER JOIN store_tag AS st ON st.stores_id = s.stores_id
        INNER JOIN tag AS t ON t.tag_id = st.tag_id
            GROUP BY s.stores_id, s.name, s.address





-- 全部資料做篩選
SELECT s.stores_id, s.name, s.address, 
       GROUP_CONCAT(DISTINCT t.tag_name SEPARATOR ',') AS tag_name,
       ROUND(AVG(comment.comment_star), 1) AS comment_star, 
       MAX(stores_img.img_name) AS img_name, 
       MIN(rooms_campsites.normal_price) AS lowest_normal_price
        FROM store AS s
        LEFT JOIN comment ON s.stores_id = comment.stores_id
        LEFT JOIN stores_img ON s.stores_id = stores_img.stores_id
        LEFT JOIN rooms_campsites ON s.stores_id = rooms_campsites.stores_id
        INNER JOIN store_tag AS st ON st.stores_id = s.stores_id
        INNER JOIN tag AS t ON t.tag_id = st.tag_id
        AND s.stores_id IN (
            SELECT s.stores_id
            FROM store AS s
            LEFT JOIN rooms_campsites ON s.stores_id = rooms_campsites.stores_id
            GROUP BY s.stores_id
            HAVING MIN(rooms_campsites.normal_price) BETWEEN 500 AND 1100
            )
        GROUP BY s.stores_id, s.name, s.address







-- 單筆tag
SELECT s.stores_id, s.name, s.address, 
       GROUP_CONCAT(DISTINCT t.tag_name SEPARATOR ',') AS tag_name,
       ROUND(AVG(comment.comment_star), 1) AS comment_star, 
       MAX(stores_img.img_name) AS img_name, 
       MIN(rooms_campsites.normal_price) AS lowest_normal_price
        FROM store AS s
        LEFT JOIN comment ON s.stores_id = comment.stores_id
        LEFT JOIN stores_img ON s.stores_id = stores_img.stores_id
        LEFT JOIN rooms_campsites ON s.stores_id = rooms_campsites.stores_id
        INNER JOIN store_tag AS st ON st.stores_id = s.stores_id
        INNER JOIN tag AS t ON t.tag_id = st.tag_id
        WHERE t.tag_name IN ('草地', '遠景', '獨立包區', '森林系', '櫻花祭', '親子同遊', '雨棚', '小木屋', '山景雲海', '海景')
        AND s.address = '南投縣'
        AND s.name LIKE '%露營%'
        AND t.tag_name = '櫻花祭'
        AND s.stores_id IN (
            SELECT stores_id
            FROM rooms_campsites
            GROUP BY stores_id
            HAVING MIN(normal_price) BETWEEN 1000 AND 2000
        )
        GROUP BY s.stores_id, s.name, s.address;

-- 單筆tag 不錯
SELECT s.stores_id, s.name, s.address, 
       GROUP_CONCAT(DISTINCT t.tag_name SEPARATOR ',') AS tag_name,
       ROUND(AVG(comment.comment_star), 1) AS comment_star, 
       MAX(stores_img.img_name) AS img_name, 
       MIN(rooms_campsites.normal_price) AS lowest_normal_price
FROM store AS s
LEFT JOIN comment ON s.stores_id = comment.stores_id
LEFT JOIN stores_img ON s.stores_id = stores_img.stores_id
LEFT JOIN rooms_campsites ON s.stores_id = rooms_campsites.stores_id
INNER JOIN store_tag AS st ON st.stores_id = s.stores_id
INNER JOIN tag AS t ON t.tag_id = st.tag_id
WHERE t.tag_name IN ('草地', '遠景', '獨立包區', '森林系', '櫻花祭', '親子同遊', '雨棚', '小木屋', '山景雲海', '海景')
  AND s.address = '南投縣'
  AND s.name LIKE '%露營%'
  AND t.tag_name = '櫻花祭'
GROUP BY s.stores_id, s.name, s.address
HAVING MIN(rooms_campsites.normal_price) BETWEEN 500 AND 1000;


SELECT 
    COUNT(*) AS count
FROM (
    SELECT 
        s.stores_id
    FROM 
        store AS s
        LEFT JOIN comment ON s.stores_id = comment.stores_id
        LEFT JOIN stores_img ON s.stores_id = stores_img.stores_id
        LEFT JOIN rooms_campsites ON s.stores_id = rooms_campsites.stores_id
        INNER JOIN store_tag AS st ON st.stores_id = s.stores_id
        INNER JOIN tag AS t ON t.tag_id = st.tag_id
    GROUP BY 
        s.stores_id, s.name, s.address
    HAVING
        COUNT(DISTINCT CASE WHEN rooms_campsites.normal_price BETWEEN 500 AND 1100 THEN s.stores_id END) > 0
) AS subquery;


SELECT s.stores_id, s.name, s.address, 
       GROUP_CONCAT(DISTINCT t.tag_name SEPARATOR ',') AS tag_name,
       ROUND(AVG(comment.comment_star), 1) AS comment_star, 
       MAX(stores_img.img_name) AS img_name, 
       MIN(rooms_campsites.normal_price) AS lowest_normal_price
        FROM store AS s
        LEFT JOIN comment ON s.stores_id = comment.stores_id
        LEFT JOIN stores_img ON s.stores_id = stores_img.stores_id
        LEFT JOIN rooms_campsites ON s.stores_id = rooms_campsites.stores_id
        LEFT JOIN store_tag AS st ON st.stores_id = s.stores_id
        LEFT JOIN tag AS t ON t.tag_id = st.tag_id
        GROUP BY s.stores_id, s.name, s.address

SELECT 
    s.stores_id, 
    s.name, 
    s.address,
    ROUND(AVG(comment.comment_star), 1) AS comment_star,
    MAX(stores_img.img_name) AS img_name 
FROM 
    store AS s
LEFT JOIN 
    comment ON s.stores_id = comment.stores_id
LEFT JOIN 
    stores_img ON s.stores_id = stores_img.stores_id
    
GROUP BY 
    s.stores_id, 
    s.name, 
    s.address;


    SELECT 
    s.stores_id, 
    s.name, 
    s.address,
    ROUND(AVG(comment.comment_star), 1) AS comment_star,
    MAX(stores_img.img_name) AS img_name 
    FROM 
        store AS s
    LEFT JOIN 
        comment ON s.stores_id = comment.stores_id
    LEFT JOIN 
        stores_img ON s.stores_id = stores_img.stores_id
    GROUP BY 
        s.stores_id, 
        s.name, 
        s.address;


    SELECT title,content,img_name FROM blog
    LEFT JOIN blog_img ON blog.id = blog_img.blog_id


    SELECT 
    s.stores_id, 
    s.name, 
    s.address,
    ROUND(AVG(comment.comment_star), 1) AS comment_star,
    MAX(stores_img.img_name) AS img_name 
FROM 
    store AS s
LEFT JOIN 
    comment ON s.stores_id = comment.stores_id
LEFT JOIN 
    stores_img ON s.stores_id = stores_img.stores_id
        LEFT JOIN store_tag AS st ON st.stores_id = s.stores_id
        LEFT JOIN tag AS t ON t.tag_id = st.tag_id
    WHERE t.tag_id = 5
GROUP BY 
    s.stores_id, 
    s.name, 
    s.address
    LIMIT 6;

        SELECT title,content,img_name,home_blog.id 
    FROM home_blog
    LEFT JOIN blog_img ON home_blog.id = blog_img.blog_id
    LIMIT 6;

        SELECT pid FROM favorite WHERE uid = 2


 SELECT pid FROM favorite WHERE pid = 13 AND uid =1

 SELECT 
    home_blog.title,
    home_blog.content,
    MIN(blog_img.img_name) AS img_name,
    home_blog.id
FROM 
    home_blog
LEFT JOIN 
    blog_img ON home_blog.id = blog_img.blog_id
GROUP BY 
    home_blog.id
LIMIT 6;


SELECT 
    hb.title,
    hb.content,
    bi.img_name,
    hb.id
FROM 
    home_blog hb
LEFT JOIN 
    (SELECT 
         blog_id, 
         MIN(img_name) AS img_name
     FROM 
         blog_img
     GROUP BY 
         blog_id) bi ON hb.id = bi.blog_id
LIMIT 6;

    SELECT title,content,img_name,home_blog.id 
    FROM home_blog
    LEFT JOIN blog_img ON home_blog.id = blog_img.blog_id
    LIMIT 6;