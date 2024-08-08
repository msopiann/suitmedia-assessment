<template>
  <header
    :class="[
      'fixed top-0 w-full transition-transform z-20',
      isAtTop
        ? 'bg-orange-500 opacity-100'
        : isScrolledUp
        ? 'bg-orange-500/80'
        : 'bg-orange-500',
      !isScrolledUp ? 'transform -translate-y-full' : '',
    ]"
  >
    <nav
      class="container w-[80%] mx-auto flex justify-between items-center p-4 z-10"
    >
      <NuxtLink to="/" class="logo">
        <img
          src="/img/logo.png"
          alt="Logo"
          class="w-32 h-auto filter invert brightness-0"
        />
      </NuxtLink>

      <ul class="lg:flex space-x-4 text-white hidden">
        <li :class="{ active: isActive('/work') }">
          <NuxtLink to="/work" class="menu-item">Work</NuxtLink>
        </li>
        <li :class="{ active: isActive('/about') }">
          <NuxtLink to="/about" class="menu-item">About</NuxtLink>
        </li>
        <li :class="{ active: isActive('/service') }">
          <NuxtLink to="/service" class="menu-item">Services</NuxtLink>
        </li>
        <li :class="{ active: isActive('/') }">
          <NuxtLink to="/" class="menu-item">Ideas</NuxtLink>
        </li>
        <li :class="{ active: isActive('/career') }">
          <NuxtLink to="/career" class="menu-item">Careers</NuxtLink>
        </li>
        <li :class="{ active: isActive('/contact') }">
          <NuxtLink to="/contact" class="menu-item">Contact</NuxtLink>
        </li>
      </ul>

      <div class="lg:hidden">
        <button
          @click="toggleMenu"
          class="lg:hidden flex items-center text-white focus:outline-none"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <ul
          :class="[
            'sm text-white flex lg:flex-row flex-col lg:space-x-4 lg:space-y-0 space-y-4 absolute lg:static top-full left-0 lg:top-auto lg:left-auto bg-orange-500 lg:bg-transparent transition-transform lg:transition-none',
            { 'translate-x-0': isMenuOpen, '-translate-x-full': !isMenuOpen },
          ]"
          @click="closeMenu"
        >
          <li :class="{ active: isActive('/work'), 'pb-4': true }">
            <NuxtLink to="/work" class="menu-item">Work</NuxtLink>
          </li>
          <li :class="{ active: isActive('/about') }">
            <NuxtLink to="/about" class="menu-item">About</NuxtLink>
          </li>
          <li :class="{ active: isActive('/service') }">
            <NuxtLink to="/service" class="menu-item">Services</NuxtLink>
          </li>
          <li :class="{ active: isActive('/ideas') }">
            <NuxtLink to="/ideas" class="menu-item">Ideas</NuxtLink>
          </li>
          <li :class="{ active: isActive('/career') }">
            <NuxtLink to="/career" class="menu-item">Careers</NuxtLink>
          </li>
          <li :class="{ active: isActive('/contact') }">
            <NuxtLink to="/contact" class="menu-item">Contact</NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isScrolledUp: true,
      isAtTop: true,
      lastScrollY: 0,
      isMenuOpen: false,
    };
  },
  methods: {
    handleScroll() {
      this.isAtTop = window.scrollY <= 0;
      this.isScrolledUp =
        window.scrollY < this.lastScrollY || window.scrollY <= 100;
      this.lastScrollY = window.scrollY;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    isActive(route) {
      return this.$route.path === route;
    },
  },
  mounted() {
    this.lastScrollY = window.scrollY;
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.logo img {
  max-width: 100%;
  height: auto;
}
.active {
  font-weight: bold;
  padding-bottom: 6px;
  border-bottom: 1px solid;
}
.menu-item::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: white;
  transition: width 0.3s ease;
  transform: translateY(2px);
}

.menu-item {
  position: relative;
  padding-bottom: 8px;
  transition: border-bottom 0.3s ease all;
}

.menu-item:hover::before {
  width: 100%;
}

.menu-item.active::before {
  width: 100%;
  background-color: white;
  pointer-events: none;
}

.menu-item:not(.active):hover::before {
  width: 100%;
}

@media (max-width: 1024px) {
  .sm {
    display: flex;
    flex-direction: column;
    width: 100%;
    top: 100%;
    left: 0;
    background: rgba(
      255,
      165,
      0,
      0.9
    ); /* Background dengan transparansi untuk menu mobile */
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transform: translateX(-100%); /* Menu tersembunyi di luar layar */
    transition: transform 0.3s ease-in-out;
  }
  .sm.translate-x-0 {
    transform: translateX(0); /* Menu ditampilkan */
  }
}
</style>
