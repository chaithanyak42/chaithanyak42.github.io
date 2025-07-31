---
layout: page
title: Travel
permalink: /travel/
---

<style>
.travel-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.travel-photo {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.travel-photo:hover {
  transform: scale(1.02);
}

.travel-photo img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.photo-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white;
  padding: 20px 15px 15px;
  font-size: 14px;
}

/* Lightbox styles */
.lightbox {
  display: none;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.9);
  animation: fadeIn 0.3s;
}

.lightbox-content {
  position: relative;
  margin: auto;
  display: block;
  width: 90%;
  max-width: 1200px;
  max-height: 90%;
  top: 50%;
  transform: translateY(-50%);
}

.lightbox img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  z-index: 1000;
}

.close:hover {
  color: #bbb;
}

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}

@media (max-width: 768px) {
  .travel-gallery {
    grid-template-columns: 1fr;
  }
  
  .travel-photo img {
    height: 200px;
  }
  
  .lightbox-content {
    width: 95%;
    margin: 5% auto;
    top: 45%;
  }
  
  .close {
    top: 10px;
    right: 20px;
    font-size: 30px;
  }
}
</style>

<script>
function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = src;
  lightbox.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close lightbox when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
  
  // Close lightbox with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
});
</script>

A collection of moments from my adventures around the world. Each photo tells a story of exploration, wonder, and the beauty I've encountered while hiking mountains, chasing sunrises, and discovering new places.

<!-- Lightbox -->
<div id="lightbox" class="lightbox">
  <span class="close" onclick="closeLightbox()">&times;</span>
  <div class="lightbox-content">
    <img id="lightbox-img" src="" alt="">
  </div>
</div>

<div class="travel-gallery">

<div class="travel-photo" onclick="openLightbox('/assets/Travel/sunrise.jpeg')">
  <img src="/assets/Travel/sunrise.jpeg" alt="Sunrise">
  <div class="photo-caption">Golden hour magic ✨</div>
</div>

<div class="travel-photo" onclick="openLightbox('/assets/Travel/cosmos.jpeg')">
  <img src="/assets/Travel/cosmos.jpeg" alt="Cosmic view">
  <div class="photo-caption">Trail companions make the journey twice as meaningful</div>
</div>

<div class="travel-photo" onclick="openLightbox('/assets/Travel/cosmos2.jpeg')">
  <img src="/assets/Travel/cosmos2.jpeg" alt="Another cosmic moment">
  <div class="photo-caption">
    <em>"You could not help but feel your specklike existence among the immensity of the mountain, the earth, the universe, and yet still feel your own two feet on the talus, reaffirming your presence amid the grandeur."</em>
    <br><small>— Paul Kalanithi, When Breath Becomes Air</small>
  </div>
</div>

<div class="travel-photo" onclick="openLightbox('/assets/Travel/phulhara.jpeg')">
  <img src="/assets/Travel/phulhara.jpeg" alt="Phulhara">
  <div class="photo-caption">Rhododendrons blooming beneath the sleeping giants of the Himalayas</div>
</div>

<div class="travel-photo" onclick="openLightbox('/assets/Travel/phulhara2.jpeg')">
  <img src="/assets/Travel/phulhara2.jpeg" alt="Phulhara valley">
  <div class="photo-caption">The serene valley of Phulhara</div>
</div>

<div class="travel-photo" onclick="openLightbox('/assets/Travel/mw.jpeg')">
  <img src="/assets/Travel/mw.jpeg" alt="Mountain view">
  <div class="photo-caption">Peaks that touch the soul</div>
</div>

<div class="travel-photo" onclick="openLightbox('/assets/Travel/mw2.jpeg')">
  <img src="/assets/Travel/mw2.jpeg" alt="Another mountain view">
  <div class="photo-caption">Nature's grand architecture</div>
</div>

<div class="travel-photo" onclick="openLightbox('/assets/Travel/kp.jpeg')">
  <img src="/assets/Travel/kp.jpeg" alt="Landscape">
  <div class="photo-caption">Lost in the wilderness</div>
</div>

<div class="travel-photo" onclick="openLightbox('/assets/Travel/ch.jpeg')">
  <img src="/assets/Travel/ch.jpeg" alt="Scenic view">
  <div class="photo-caption">Look up to the sky more often</div>
</div>

<div class="travel-photo" onclick="openLightbox('/assets/Travel/sb.jpeg')">
  <img src="/assets/Travel/sb.jpeg" alt="Scenic beauty">
  <div class="photo-caption">Nature's masterpiece</div>
</div>

<div class="travel-photo" onclick="openLightbox('/assets/Travel/mansb.jpeg')">
  <img src="/assets/Travel/mansb.jpeg" alt="Mountain scene">
  <div class="photo-caption">Standing small among giants</div>
</div>


<div class="travel-photo" onclick="openLightbox('/assets/Travel/man.jpg')">
  <img src="/assets/Travel/man.jpg" alt="Adventure moment">
  <div class="photo-caption">The journey continues</div>
</div>

<div class="travel-photo" onclick="openLightbox('/assets/Travel/earth.jpg')">
  <img src="/assets/Travel/earth.jpg" alt="Earth perspective">
  <div class="photo-caption">Our pale blue dot</div>
</div>

<div class="travel-photo" onclick="openLightbox('/assets/Travel/jupiter.jpeg')">
  <img src="/assets/Travel/jupiter.jpeg" alt="Jupiter view">
  <div class="photo-caption">Dreaming of distant worlds</div>
</div>

</div>

*More adventures and photos coming soon as I continue exploring our beautiful planet and preparing for that solo hike on the Arctic Circle Trail in Greenland.*