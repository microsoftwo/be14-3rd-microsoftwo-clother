// 카테고리 ID 매핑

export const categoryMap = {
    // LOOK ------------------------------------------------------------
      // 아우터 (11-18)
      'coat': '11',
      'padding': '12',
      'mustang': '13',
      'cardigan': '14',
      'fleece': '15',
      'jacket': '16',
      'jumper': '17',
      'etc-outer': '18',
    
      // 상의 (19-26)
      'mantoman': '19',
      'hood': '20',
      'knit': '21',
      'shirt': '22',
      'long-sleeve': '23',
      'short-sleeve': '24',
      'sleeveless': '25',
      'etc-top': '26',
    
      // 하의 (27-34)
      'denim-pants': '27',
      'cotton-pants': '28',
      'cargo-pants': '29',
      'training-pants': '30',
      'slacks': '31',
      'skirt': '32',
      'shorts': '33',
      'etc-bottom': '34',
    
      // 신발 (35-40)
      'sneakers': '35',
      'gudu': '36',
      'boots': '37',
      'flat': '38',
      'slipper': '39',
      'etc-shoes': '40',
    
      // 모자 (41-48)
      'cap': '41',
      'hunting': '42',
      'fedora': '43',
      'beanie': '44',
      'trooper': '45',
      'balaclava': '46',
      'etc-hat': '48',
    
      // 가방 (49-56)
      'backpack': '49',
      'shoulder-bag': '50',
      'cross-bag': '51',
      'tote-bag': '52',
      'waist-hip': '53',
      'eco-bag': '54',
      'clutch': '55',
      'etc-bag': '56',
    
      // 악세서리 (57-63, 66)
      'earrings': '57',
      'necklace': '58',
      'ring': '59',
      'bracelet': '60',
      'watch': '61',
      'belt': '62',
      'glasses': '63',
      'etc-acc': '66',
    
    // HAIR ------------------------------------------------------------
    
      // 염색 (70-76, 78)
      'black': '70',
      'brown': '71',
      'blonde': '72',
      'red': '73',
      'blue': '74',
      'purple': '75',
      'pink': '76',
      'etc-color': '78',
    
      // 펌 (79-80)
      'men-perm': '79',
      'women-perm': '80',
    
      // 커트 (81-82)
      'men-cut': '81',
      'women-cut': '82',
    
    // MAKEUP ------------------------------------------------------------
      // 베이스 (118-122)
      'foundation': '118',    // 파운데이션
      'bb-cream': '119',     // BB크림
      'cushion': '120',      // 쿠션
      'powder': '121',       // 파우더
      'etc-base': '122',     // 기타
    
      // 립 (123-127)
      'lipstick': '123',     // 립스틱
      'tint': '124',         // 립틴트
      'gloss': '125',        // 립글로스
      'balm': '126',         // 립밤
      'etc-lip': '127',      // 기타
    
      // 아이브로우 (128-136)
      'eyebrow-pencil': '128',    // 아이브로우 펜슬
      'eyebrow-powder': '129',    // 아이브로우 파우더
      'eyebrow-mascara': '130',   // 브로우 마스카라
      'eyebrow-tint': '131',      // 브로우 틴트
      'etc-eyebrow': '136',       // 기타
    
      // 아이섀도우 (137-140)
      'matt-shadow': '137',       // 매트 섀도우
      'shimmer-shadow': '138',    // 쉬머 섀도우
      'glitter-shadow': '139',    // 글리터 섀도우
      'etc-shadow': '140',        // 기타
    
      // 아이라이너 (141-144)
      'pencil-liner': '141',      // 펜슬 아이라이너
      'liquid-liner': '142',      // 리퀴드 아이라이너
      'etc-liner': '144',         // 기타
    
      // 속눈썹 (145-147)
      'mascara': '145',           // 마스카라
      'volume': '146',            // 볼륨
      'etc-lash': '147',          // 기타
    
      // 기타 메이크업 (148-154)
      'highlight': '148',         // 하이라이터
      'shading': '149',          // 쉐이딩
      'blusher': '150',          // 블러셔
      'makeup-review': '151',     // 메이크업 리뷰
      'makeup-brush': '152',      // 메이크업 브러쉬
      'makeup-puff': '153',       // 메이크업 퍼프
      'etc': '154'               // 기타
    }
    
    export function getCategoryId(category) {
      return categoryMap[category]
    } 