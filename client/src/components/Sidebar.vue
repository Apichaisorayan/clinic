<template>
  <aside class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
    <div class="p-6 flex items-center gap-3 border-b border-gray-100">
      <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
        <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <span class="font-bold text-lg text-gray-800">Clinic Manager</span>
    </div>

    <nav class="flex-1 p-4 space-y-1">
      <router-link 
        to="/dashboard"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
        :class="$route.path === '/dashboard' 
          ? 'bg-cyan-50 text-cyan-600 font-medium' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-cyan-600'"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        แดชบอร์ด
      </router-link>
      
      <router-link 
        to="/calendar"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
        :class="$route.path === '/calendar' 
          ? 'bg-cyan-50 text-cyan-600 font-medium' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-cyan-600'"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        ปฏิทินการจอง
      </router-link>
      
      <router-link 
        to="/book-room"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
        :class="$route.path === '/book-room' 
          ? 'bg-cyan-50 text-cyan-600 font-medium' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-cyan-600'"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        จองห้องใหม่
      </router-link>
      
      <button class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-cyan-600 transition-colors">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        จัดการห้อง
      </button>
      
      <button class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-cyan-600 transition-colors">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        แพทย์และเจ้าหน้าที่
      </button>
      
      <button class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-cyan-600 transition-colors">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        ตั้งค่า
      </button>
    </nav>

    <div class="p-4 border-t border-gray-100">
      <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center">
          <span class="text-white text-sm font-semibold">ผจ</span>
        </div>
        <div class="flex-1 overflow-hidden">
          <p class="text-sm font-medium text-gray-800 truncate">ผู้จัดการคลินิก</p>
          <p class="text-xs text-gray-500 truncate">Admin</p>
        </div>
        <button @click="logout" class="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="ออกจากระบบ">
          <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('isLoggedIn')
  router.push('/login')
}
</script>