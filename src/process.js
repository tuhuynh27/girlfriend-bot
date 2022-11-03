const context = {
  scene: null,
}

const listOptions = [
  { name: 'quán ngõ ngách', address: '214/19/11C Đ. Nguyễn Văn Nguyễn, Tân Định, Quận 1' },
  { name: 'chang bistro and cakes', address: '16/9 Nguyễn Văn Hưởng, Thảo Điền, Quận 2' },
  { name: 'baozi', address: '106 Hai Bà Trưng, Đa Kao, Quận 1' },
]

let pickeds = []

export function checkScene(scene) {
  const result = scene === context.scene
  setTimeout(() => {
    context.scene = null
  }, 10)
  return result
}

export function setScene(scene) {
  context.scene = scene
}

export function process(msg) {
  msg = msg.trim().toLocaleLowerCase()

  if (msg === 'chán' || msg === 'buồn' || msg === 'đói') {
    return `Đừng ${msg} nữa!`
  }

  if (msg === 'menu' || msg === 'món ăn' || msg === 'tất cả quán') {
    return menu()
  }

  if (msg.startsWith('thêm quán ')) {
    const nameAndAddress = msg.replace('thêm quán ', '')
    const [name, address] = nameAndAddress.split(' - ')
    return addMenu(name, address)
  }

  if (msg.startsWith('xoá quán ')) {
    const name = msg.replace('xoá quán ', '')
    const index = listOptions.findIndex(e => e.name === name)
    if (index > -1) {
      listOptions.splice(index, 1)
      return `Đã xoá ${name} khỏi menu`
    } else {
      return `Không tìm thấy ${name} trong menu`
    }
  }

  if (msg === 'ăn gì' || msg === 'ăn gì hôm nay' || msg === 'ăn gì nào' || msg === 'đổi quán') {
    const { name, address } = eatWhat()
    return 'Ăn ' + name + ' đi em ơi, ở chỗ ' + address + ' nha!'
  }

  if (msg === 'ok' || msg === 'oke' || msg === 'ok anh' || msg === 'oke anh' || msg === 'kê' || msg === 'vâng' || msg === 'dạ') {
    return ok()
  }

  if (msg === 'có' || msg === 'yeah' || msg === 'yea') {
    return yes()
  }

  if (msg === 'ko' || msg === 'không' || msg === 'k' || msg === 'khum' || msg === 'éo' || msg === 'đéo') {
    return no()
  }

  return randomReply()
}

function randomReply() {
  const listRandomReplies = [
    'Hmm, cuộc sống mà',
    'Đúng thế',
    'Đúng vậy',
    'Chà...',
    'Nhưng mà sao?',
    'Ủa sao vậy?',
    'Ai cũng có lúc đó',
    'Thì chịu chứ biết sao giờ',
    'Thế thì sao?',
    'Thế thì sao nữa?',
    'Đúng là vậy nhỉ',
    'Đúng là vậy',
    'Đúng là vậy đó',
    'Haizz',
    'Hả?',
    'Sao?',
    'Nói thiệt là bó tay nha',
    'Nói gì khó hiểu vậy',
    '...',
    '=="',
  ]

  return listRandomReplies[Math.floor(Math.random() * listRandomReplies.length)]
}

function ok() {
  if (checkScene('eatWhat')) {
    return 'Oke đi ăn đi em!'
  } else {
    return 'Oke'
  }
}

function yes() {
  if (checkScene('greeting')) {
    return 'Hả có gì?'
  } else if (checkScene('eatWhat')) {
    return 'Kê nha'
  } else {
    return 'Có?'
  }
}

function no() {
  if (checkScene('greeting')) {
    return 'Ủa sao vậy?'
  } else if (checkScene('eatWhat')) {
    const { name, address } = eatWhat()
    setTimeout(() => setScene('eatWhat'), 10)
    return 'Hmm, vậy đi ăn ' + name + ' đi em ơi, ở chỗ ' + address + ' nha!'
  } else {
    return 'Không?'
  }
}

function eatWhat() {
  setScene('eatWhat')

  let pickedItem = listOptions[Math.floor(Math.random() * listOptions.length)]
  if (pickeds.length === listOptions.length) {
    pickeds = []
  }
  while (pickeds.includes(pickedItem)) {
    pickedItem = listOptions[Math.floor(Math.random() * listOptions.length)]
  }
  pickeds.push(pickedItem)
  return pickedItem
}

function addMenu(name, address) {
  listOptions.push({ name, address })
  return `Đã thêm ${name} vào menu`
}

function menu() {
  const menu = listOptions.map(e => e.name).join(', ')
  return `Bây giờ đang có ${listOptions.length} quán ăn đó: ${menu}`
}
