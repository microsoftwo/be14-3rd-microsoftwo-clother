<template>
    <main id="parallax__cont">
      <!-- LANDING SECTION -->
      <section class="landing-section">
        <div class="text-container">
          <div class="show-your">SHOW YOUR</div>
          <div class="style-container">
            <span>S</span>
            <div class="image-hover" @mouseenter="expandImage" @mouseleave="shrinkImage" ref="img1">
              <img src="/images/style1.jpg" alt="Style 1">
            </div>
            <span>T</span>
            <div class="image-hover" @mouseenter="expandImage" @mouseleave="shrinkImage" ref="img2">
              <img src="/images/style2.jpg" alt="Style 2">
            </div>
            <span>Y</span>
            <div class="image-hover" @mouseenter="expandImage" @mouseleave="shrinkImage" ref="img3">
              <img src="/images/style3.jpg" alt="Style 3">
            </div>
            <span>L</span>
            <div class="image-hover" @mouseenter="expandImage" @mouseleave="shrinkImage" ref="img4">
              <img src="/images/style4.jpg" alt="Style 4">
            </div>
            <span>E</span>
          </div>
        </div>
      </section>
  
      <!-- SECTION 2 -->
      <section id="section2" class="parallax__item">
        <div class="parallax__item__img i1"></div>
        <div class="parallax__item__img i2"></div>
        <div class="parallax__item__img i3"></div>
      </section>
  
      <!-- HORIZONTAL SCROLL SECTION -->
      <section class="scroll-section">
        <div class="horizontal-wrapper" ref="cardTrack">
          <div class="text-block">
            CLOTHER에서<br/>
            스타일링을<br />
            완성해보세요
          </div>
          <div class="cards-only">
            <div class="card i1"></div>
            <div class="card i2"></div>
            <div class="card i3"></div>
            <div class="card i4"></div>
            <div class="card i5"></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </section>
  
      <!-- SECTION 7 -->
      <section id="section7" class="parallax__item">
        <div class="parallax__item__text t1">Make your style</div>
        <div class="parallax__item__text t2">Show your style</div>
        <div class="parallax__item__text t3">당신의 스타일을 공유하세요</div>
        <router-link 
          :to="{ name: 'Login' }" 
          class="final-button"
          @click="handleClick">
          지금 스타일 둘러보기
        </router-link>
        <!-- <div class="parallax__item__text t4">CLOTHER</div> -->
      </section>
    </main>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import gsap from 'gsap'
  import ScrollTrigger from 'gsap/ScrollTrigger'
  import '../styles/gsap-scroll.css'
  
  gsap.registerPlugin(ScrollTrigger)
  
  const cardTrack = ref(null)
  
  // 이미지 호버 효과를 위한 메서드 추가
  const expandImage = (event) => {
    const target = event.currentTarget;
    gsap.to(target, {
      scale: 1.5,               /* 이미지 호버 시 크기 (1 -> 1.3 으로 커짐) */
      zIndex: 10,
      duration: 0.5,
      ease: 'power2.out'
    });
  }
  
  // 이미지 호버 하고 떼어 낸 후
  const shrinkImage = (event) => {
    const target = event.currentTarget;
    gsap.to(target, {
      scale: 1,
      zIndex: 1,
      duration: 0.5,
      ease: 'power2.out'
    });
  }
  
  const handleClick = (e) => {
    e.preventDefault()
    // 먼저 스크롤을 맨 위로 부드럽게 이동
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // 스크롤 이동이 완료된 후 라우터 이동
    setTimeout(() => {
      router.push({ name: 'Login' })
    }, 500)
  }
  
  onMounted(() => {
    // SECTION 1
    const ani1 = gsap.timeline()
    ani1.from("#section2 .i1", { y: -100, autoAlpha: 0, borderRadius: 200 })
        .from("#section2 .i2", { y: 100, autoAlpha: 0, borderRadius: 200 })
        .from("#section2 .i3", { y: -100, autoAlpha: 0, borderRadius: 200 })
  
    ScrollTrigger.create({
      animation: ani1,
      trigger: "#section2",
      start: "top top",
      end: "+=4000",
      scrub: 3,
      pin: true,
      anticipatePin: 1
    })
  
    // SECTION 2
    const totalScroll = cardTrack.value.scrollWidth - window.innerWidth
  
    gsap.to(cardTrack.value, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-section",
        start: "top top",
        end: `+=${totalScroll}`,
        scrub: 3,
        pin: true,
        anticipatePin: 1
      }
    })
  
    // SECTION 3
    const ani3 = gsap.timeline()
    ani3.fromTo("#section7 .t1", { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 1.5 })
        .to("#section7 .t1", { autoAlpha: 0, duration: 1 }, "+=1")
        .fromTo("#section7 .t2", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1.5 }, "-=0.5")
        .to("#section7 .t2", { autoAlpha: 0, duration: 1 }, "+=1")
        .fromTo("#section7 .t3", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1.5 }, "-=0.5")
        .fromTo(".final-button", 
          { autoAlpha: 0, y: 50 }, 
          { autoAlpha: 1, y: 0, duration: 1 }, 
          "+=1"
        )
  
    ScrollTrigger.create({
      animation: ani3,
      trigger: "#section7",
      start: "top top",
      end: "+=4100",
      scrub: 2,
      pin: true,
      anticipatePin: 1
    })
  })
  </script>
  
  <style scoped>
  .final-button {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    padding: 1.5rem 3rem;
    background-color: #1a1a1a;
    color: white;
    text-decoration: none;
    border-radius: 30px;
    font-size: 1.4rem;
    opacity: 0;
    transition: background-color 0.3s ease;
  }
  
  .final-button:hover {
    background-color: #333;
  }
  </style>