<script lang="ts" setup></script>

<template>
  <div class="navbar lg:pl-5 bg-slate-900 text-slate-300">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="text-slate-900 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <NuxtLink to="/" exact-active-class="active">Popular</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/nowplaying" exact-active-class="active"
              >Now Playing</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/toprated" exact-active-class="active"
              >Top Rated</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/upcoming" exact-active-class="active"
              >Upcoming</NuxtLink
            >
          </li>
        </ul>
      </div>
      <IconMovieIcon height="30" width="30" alt="logo" />
      <NuxtLink to="/" class="btn btn-ghost text-white normal-case text-xl"
        >MovieFlix</NuxtLink
      >
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <NuxtLink to="/" exact-active-class="active">Popular</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/nowplaying" exact-active-class="active"
            >Now Playing</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/toprated" exact-active-class="active"
            >Top Rated</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/upcoming" exact-active-class="active"
            >Upcoming</NuxtLink
          >
        </li>
      </ul>
    </div>
    <div class="navbar-end"></div>
  </div>
  <slot />
</template>
