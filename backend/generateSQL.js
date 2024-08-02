const precautions = [
  '入營的車輛移動請減速慢行，注意周圍孩童及設備。',
  '營內請妥善保管私人財物、裝備用品、食材等，以上營地無保管責任。',
  '天幕、客廳或炊事帳限搭個人營位，切勿佔用鄰近營位或人車動線處。',
  '戶外環境會有飛蚊蟲螞、蛇類、野生動物等出沒，請注意自身安全。',
  '環境無論野生或栽種，禁止採果、勿食，及攀折花木。',
  '營內有天然植木、石板／塊、土坡、階梯等處，通行請注意安全。',
  '提供衛浴',
  '離地焚火，自備薪柴',
  '公共區域，嚴禁抽菸',
  '提供免費wifi',
  '嚴格分類，廚餘統一',
  '請注意犬吠及清理排遺、露營屋禁入',
  '營內提供免費垂釣魚池',
  '每個營位限用1條延長線，規定使用距離最近的插座，禁止私接它處電源',
  '公用設備包含衛浴、供電、植栽等如有毀損或盜竊，須負責賠償及法律責任。',
  '請注意安全禁止：彈力繩配營釘、戲玩拋石／扔重物、夜間設球繩網。',
  '用電：為維護及安全，營內禁止高瓦數電器，如電磁爐、電鍋烤箱、電熱壺、電暖爐冷氣、型電器等。',
]

// 指定需要生成的数量 n
const n = 8 // 每次隨機挑選8項

// 生成 n 笔隨機簡單文字資料
const randomPrecautions = []
for (let i = 0; i < 29; i++) {
  const selectedPrecautions = precautions
    .sort(() => 0.5 - Math.random())
    .slice(0, n)
  randomPrecautions.push(selectedPrecautions.join(' '))
}

// 生成SQL UPDATE語句
const sqlUpdateStatements = randomPrecautions.map((desc, index) => {
  return `UPDATE store SET precaution = '${desc}' WHERE stores_id = ${index + 1};`
})

// 輸出SQL UPDATE語句
sqlUpdateStatements.forEach((sql) => console.log(sql))
