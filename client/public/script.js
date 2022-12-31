let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');


// menu.onclick = () =>{
//   menu.classList.toggle('fa-times');
//   navbar.classList.toggle('active');
// }

// document.querySelector('#login-btn').onclick = () =>{
//   document.querySelector('.login-form-container').classList.toggle('active');
// }

// document.querySelector('#close-login-form').onclick = () =>{
//   document.querySelector('.login-form-container').classList.remove('active');
// }



// window.onscroll = () =>{

//   menu.classList.remove('fa-times');
//   navbar.classList.remove('active');

//   if(window.scrollY > 0){
//     document.querySelector('.header').classList.add('active');
//   }else{
//     document.querySelector('.header').classList.remove('active');
//   };

// };

// document.querySelector('.home').onmousemove = (e) =>{

//   document.querySelectorAll('.home-parallax').forEach(elm =>{

//     let speed = elm.getAttribute('data-speed');

//     let x = (window.innerWidth - e.pageX * speed) / 90;
//     let y = (window.innerHeight - e.pageY * speed) / 90;

//     elm.style.transform = `translateX(${y}px) translateY(${x}px)`;

//   });

// };


// document.querySelector('.home').onmouseleave = (e) =>{

//   document.querySelectorAll('.home-parallax').forEach(elm =>{

//     elm.style.transform = `translateX(0px) translateY(0px)`;

//   });

// };

// var swiper = new Swiper(".vehicles-slider", {
//   grabCursor: true,
//   centeredSlides: true,  
//   spaceBetween: 20,
//   loop:true,
//   autoplay: {
//     delay: 9500,
//     disableOnInteraction: false,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable:true,
//   },
//   breakpoints: {
//     0: {
//       slidesPerView: 1,
//     },
//     768: {
//       slidesPerView: 2,
//     },
//     1024: {
//       slidesPerView: 3,
//     },
//   },
// });

// var swiper = new Swiper(".featured-slider", {
//   grabCursor: true,
//   centeredSlides: true,  
//   spaceBetween: 20,
//   loop:true,
//   autoplay: {
//     delay: 9500,
//     disableOnInteraction: false,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable:true,
//   },
//   breakpoints: {
//     0: {
//       slidesPerView: 1,
//     },
//     768: {
//       slidesPerView: 2,
//     },
//     1024: {
//       slidesPerView: 3,
//     },
//   },
// });

// var swiper = new Swiper(".review-slider", {
//   grabCursor: true,
//   centeredSlides: true,  
//   spaceBetween: 20,
//   loop:true,
//   autoplay: {
//     delay: 9500,
//     disableOnInteraction: false,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable:true,
//   },
//   breakpoints: {
//     0: {
//       slidesPerView: 1,
//     },
//     768: {
//       slidesPerView: 2,
//     },
//     1024: {
//       slidesPerView: 3,
//     },
//   },
// });



// let sidebar = document.querySelector(".sidebar");
// let sidebarBtn = document.querySelector(".sidebarBtn");
// sidebarBtn.onclick = function() {
//   sidebar.classList.toggle("active");
//   if(sidebar.classList.contains("active")){
//   sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
// }else
//   sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
// }
