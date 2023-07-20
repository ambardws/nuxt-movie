<script lang="ts" setup></script>

<template>
  <div class="navbar bg-slate-900">
    <div class="flex-1 ml-3">
      <IconMovieIcon height="30" width="30" alt="logo" />
      <NuxtLink to="/" class="btn btn-ghost text-white normal-case text-xl"
        >MovieFlix</NuxtLink
      >
    </div>
    <div class="flex-none">
      <ul class="menu text-white menu-horizontal px-1">
        <li><NuxtLink to="/" exact-active-class="active">Popular</NuxtLink></li>
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
  </div>
  <slot />
</template>
