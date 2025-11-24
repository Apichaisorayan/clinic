<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Mobile Header -->
    <div class="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
            <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span class="font-bold text-lg text-gray-800">Clinic Manager</span>
        </div>
        <button @click="logout" class="p-2 hover:bg-gray-100 rounded-lg">
          <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Sidebar -->
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
        <button class="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-cyan-50 text-cyan-600 font-medium transition-colors">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          แดชบอร์ด
        </button>
        <router-link to="/calendar" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-cyan-600 transition-colors">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          ปฏิทินการจอง
        </router-link>
        
        <!-- Admin Only Menus -->
        <template v-if="userRole === 'ADMIN'">
          <router-link to="/rooms" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-cyan-600 transition-colors">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            จัดการห้อง
          </router-link>
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
        </template>
      </nav>

      <div class="p-4 border-t border-gray-100">
        <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
          <div class="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center">
            <span class="text-white text-sm font-semibold">{{ getUserInitials() }}</span>
          </div>
          <div class="flex-1 overflow-hidden">
            <p class="text-sm font-medium text-gray-800 truncate">{{ getUserName() }}</p>
            <p class="text-xs text-gray-500 truncate">{{ getRoleText(userRole) }}</p>
            <p class="text-xs text-gray-400 truncate">Tab: {{ getTabId() }}</p>
          </div>
          <button @click="logout" class="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="ออกจากระบบ">
            <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
        <div class="flex items-center gap-2 text-gray-500">
          <span class="text-sm">แดชบอร์ด</span>
          <span class="text-sm">/</span>
          <span class="text-sm font-medium text-gray-800">ภาพรวม</span>
        </div>

        <div class="flex items-center gap-4">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="ค้นหาห้อง..."
              class="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-cyan-300 transition-all"
            />
          </div>

          <button class="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-2 right-2 h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
          </button>

          <div class="flex items-center gap-3">
            <router-link to="/calendar" class="px-4 py-2 border border-cyan-500 text-cyan-600 rounded-lg hover:bg-cyan-50 transition-all flex items-center gap-2 font-medium">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              ปฏิทิน
            </router-link>
            <router-link to="/calendar" class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg shadow-cyan-500/30 flex items-center gap-2 font-medium">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              จองห้องใหม่
            </router-link>
          </div>
        </div>
      </header>

      <div class="flex-1 overflow-y-auto bg-gray-50 pt-16 md:pt-0 pb-20 md:pb-0">
        <div class="p-6 space-y-6 max-w-[1600px] mx-auto">


          <!-- Main Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Room List -->
            <div class="lg:col-span-2 space-y-6">
              <div class="bg-white rounded-2xl border border-gray-200 p-6">
                <div class="flex items-center justify-between mb-6">
                  <h2 class="text-lg font-semibold text-gray-800">ห้องว่าง</h2>
                  <button class="text-cyan-600 hover:text-cyan-700 text-sm font-medium">ดูทั้งหมด</button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Loading skeleton for rooms -->
                  <div v-if="loading" v-for="i in 4" :key="i" 
                       class="overflow-hidden rounded-xl border border-gray-200 bg-white animate-pulse">
                    <div class="h-32 bg-gray-200"></div>
                    <div class="p-4">
                      <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div class="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div class="flex items-center justify-between">
                        <div class="flex -space-x-2">
                          <div class="h-6 w-6 bg-gray-200 rounded-full"></div>
                          <div class="h-6 w-6 bg-gray-200 rounded-full"></div>
                        </div>
                        <div class="h-8 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Actual rooms -->
                  <div v-else v-for="room in displayRooms" :key="room.id" 
                       class="group overflow-hidden rounded-xl border border-gray-200 hover:border-cyan-300 transition-all bg-white">
                    <!-- Room Image -->
                    <div class="relative h-32 overflow-hidden bg-gradient-to-br"
                         :class="room.gradient">
                      <!-- Uploaded Image -->
                      <img 
                        v-if="room.image"
                        :src="getImageUrl(room.image)" 
                        :alt="room.name"
                        @error="handleImageError"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-10 relative"
                      />
                      <!-- Fallback Gradient + Icon (always present, hidden when image loads) -->
                      <div class="fallback-content absolute inset-0" :class="room.image ? 'hidden' : 'flex'">
                        <div class="absolute inset-0 bg-gradient-to-br opacity-80"
                             :class="room.gradient"></div>
                        <div class="absolute inset-0 flex items-center justify-center">
                          <svg class="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="room.icon" />
                          </svg>
                        </div>
                      </div>
                      <div class="absolute top-2 right-2">
                        <span :class="`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${room.statusColor}`">
                          {{ room.status }}
                        </span>
                      </div>
                    </div>

                    <!-- Room Info -->
                    <div class="p-4">
                      <h3 class="font-semibold text-gray-800 mb-1 truncate">{{ room.name }}</h3>
                      <p class="text-xs text-gray-500 mb-4">{{ room.type }} • จุได้ {{ room.capacity }} คน</p>
                      
                      <div class="flex items-center justify-between">
                        <div class="flex -space-x-2">
                          <div v-for="i in 2" :key="i" 
                               class="h-6 w-6 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 border-2 border-white flex items-center justify-center">
                            <span class="text-[10px] text-white font-medium">ด{{ i }}</span>
                          </div>
                        </div>
                        <router-link 
                          :to="room.status === 'ว่าง' ? '/calendar' : '#'"
                          :class="[
                            'px-4 py-2 rounded-lg text-xs font-medium transition-all inline-block text-center',
                            room.status === 'ว่าง' 
                              ? 'bg-cyan-50 text-cyan-600 hover:bg-cyan-100 border border-cyan-200' 
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
                          ]">
                          {{ room.status === 'ว่าง' ? 'จองเลย' : 'ไม่ว่าง' }}
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Sidebar -->
            <div class="space-y-6">
              <!-- Recent Bookings -->
              <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div class="p-6 border-b border-gray-100">
                  <h2 class="text-lg font-semibold text-gray-800">การจองล่าสุด</h2>
                  <p class="text-sm text-gray-500 mt-1">รายการจองห้องล่าสุด</p>
                </div>

                <!-- Tabs -->
                <div class="px-6 pt-4">
                  <div class="flex gap-2 bg-gray-100 p-1 rounded-lg">
                    <button 
                      v-for="tab in tabs" 
                      :key="tab.value"
                      @click="activeTab = tab.value"
                      :class="[
                        'flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all',
                        activeTab === tab.value 
                          ? 'bg-white text-gray-800 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-800'
                      ]">
                      {{ tab.label }}
                    </button>
                  </div>
                </div>

                <!-- Bookings List -->
                <div class="h-[500px] overflow-y-auto">
                  <div class="divide-y divide-gray-100">
                    <!-- Loading skeleton for bookings -->
                    <div v-if="loading" v-for="i in 6" :key="i"
                         class="p-4 flex items-start gap-3 animate-pulse">
                      <div class="h-10 w-10 bg-gray-200 rounded-full shrink-0"></div>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-1">
                          <div class="h-4 bg-gray-200 rounded w-32"></div>
                          <div class="h-3 bg-gray-200 rounded w-12"></div>
                        </div>
                        <div class="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                        <div class="flex items-center gap-2">
                          <div class="h-5 bg-gray-200 rounded w-16"></div>
                          <div class="h-3 bg-gray-200 rounded w-12"></div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Actual bookings -->
                    <div v-else v-for="booking in filteredBookings" :key="booking.id"
                         class="p-4 hover:bg-gray-50 transition-colors flex items-start gap-3">
                      <div class="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center shrink-0">
                        <span class="text-white text-xs font-semibold">{{ booking.user.substring(3, 5) }}</span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-1">
                          <p class="text-sm font-medium text-gray-800 truncate">{{ booking.user }}</p>
                          <span class="text-xs text-gray-500">{{ booking.time }}</span>
                        </div>
                        <p class="text-xs text-gray-500 truncate mb-2">{{ booking.room }}</p>
                        <div class="flex items-center gap-2">
                          <span :class="`text-[10px] px-2 py-1 rounded-full font-medium ${booking.statusColor}`">
                            {{ booking.status }}
                          </span>
                          <span class="text-[10px] text-gray-400">{{ booking.date }}</span>
                        </div>
                      </div>
                      <button class="p-1 hover:bg-gray-200 rounded transition-colors">
                        <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Mobile Bottom Navigation -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div class="grid grid-cols-3 gap-1">
        <!-- Dashboard -->
        <div class="flex flex-col items-center py-2 px-1 bg-cyan-50 text-cyan-600">
          <svg class="h-6 w-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="text-xs font-medium">แดชบอร์ด</span>
        </div>
        
        <!-- Calendar -->
        <router-link to="/calendar" class="flex flex-col items-center py-2 px-1 text-gray-600 hover:text-cyan-600 transition-colors">
          <svg class="h-6 w-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-xs font-medium">ปฏิทิน</span>
        </router-link>
        
        <!-- Rooms (Admin Only) -->
        <router-link 
          v-if="userRole === 'ADMIN'" 
          to="/rooms" 
          class="flex flex-col items-center py-2 px-1 text-gray-600 hover:text-cyan-600 transition-colors"
        >
          <svg class="h-6 w-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span class="text-xs font-medium">จัดการห้อง</span>
        </router-link>
        
        <!-- Profile (Non-Admin) -->
        <div 
          v-else
          class="flex flex-col items-center py-2 px-1 text-gray-600"
        >
          <div class="h-6 w-6 mb-1 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center">
            <span class="text-white text-xs font-semibold">{{ getUserInitials() }}</span>
          </div>
          <span class="text-xs font-medium">{{ getRoleText(userRole) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref('all')
const loading = ref(true)

// Get user role from localStorage
const userRole = ref('')
const currentUser = ref(null)

const getCurrentUser = () => {
  // Use sessionStorage for tab-specific data
  const user = sessionStorage.getItem('user')
  const tabId = sessionStorage.getItem('tabId')
  const isLoggedIn = sessionStorage.getItem('isLoggedIn')
  
  if (user && tabId && isLoggedIn === 'true') {
    try {
      const userData = JSON.parse(user)
      
      // Check if this tab's session is valid
      if (userData.tabId === tabId) {
        currentUser.value = userData
        userRole.value = userData.role || 'STAFF'
        console.log('Dashboard - Valid tab session for user:', userData.name, 'Role:', userData.role, 'TabID:', tabId)
      } else {
        console.warn('Dashboard - Tab session mismatch detected')
        logout()
      }
    } catch (error) {
      console.error('Dashboard - Error parsing user data:', error)
      logout()
    }
  } else {
    console.warn('Dashboard - No valid tab session found')
    // Don't auto-logout, just redirect to login
    router.push('/login')
  }
}

const getUserName = () => {
  return currentUser.value?.name || 'ผู้ใช้งาน'
}

const getUserInitials = () => {
  const name = getUserName()
  return name.substring(0, 2)
}

const getRoleText = (role) => {
  const roleTexts = {
    'ADMIN': 'ผู้ดูแลระบบ',
    'DOCTOR': 'แพทย์',
    'STAFF': 'เจ้าหน้าที่'
  }
  return roleTexts[role] || role
}

const getTabId = () => {
  const tabId = sessionStorage.getItem('tabId')
  return tabId ? tabId.substring(0, 8) + '...' : 'No Tab'
}

const tabs = ref([
  { label: 'ทั้งหมด', value: 'all' },
  { label: 'รอยืนยัน', value: 'pending' },
  { label: 'ยืนยันแล้ว', value: 'confirmed' }
])

// Empty reactive data - will be populated from API
const rooms = ref([])
const recentBookings = ref([])

import networkConfig from '../config/network.js'

// API base URL - Auto-detect for LAN
const API_BASE = networkConfig.apiBase

// Image functions
const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  
  // Use network config for LAN support
  const baseUrl = networkConfig.serverUrl
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
  const fullUrl = `${baseUrl}${cleanPath}`
  
  console.log('Dashboard Image URL:', fullUrl) // Debug log
  return fullUrl
}

const handleImageError = (event) => {
  console.error('Dashboard image failed to load:', event.target.src)
  // Hide the image and show fallback
  event.target.style.display = 'none'
  // Find the parent room card and show the fallback
  const roomCard = event.target.closest('.group')
  if (roomCard) {
    const fallback = roomCard.querySelector('.fallback-content')
    if (fallback) {
      fallback.classList.remove('hidden')
      fallback.classList.add('flex')
    }
  }
}

// Transform room data for UI display
const transformRoomData = (room) => {
  const statusMap = {
    'AVAILABLE': { status: 'ว่าง', statusColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30' },
    'OCCUPIED': { status: 'กำลังใช้งาน', statusColor: 'bg-rose-500/20 text-rose-400 border border-rose-400/30' },
    'MAINTENANCE': { status: 'ปิดปรับปรุง', statusColor: 'bg-orange-500/20 text-orange-400 border border-orange-400/30' },
    'CLOSED': { status: 'ปิด', statusColor: 'bg-gray-500/20 text-gray-400 border border-gray-400/30' }
  }

  const typeMap = {
    'GENERAL_EXAMINATION': 'ห้องตรวจ',
    'PROCEDURE': 'หัตถการ',
    'SPECIAL_EXAMINATION': 'ห้องตรวจพิเศษ',
    'CONFERENCE': 'ห้องประชุม',
    'SURGERY': 'ห้องผ่าตัด'
  }

  const gradientMap = {
    'GENERAL_EXAMINATION': 'from-blue-400 to-blue-500',
    'PROCEDURE': 'from-rose-400 to-rose-500',
    'SPECIAL_EXAMINATION': 'from-indigo-400 to-indigo-500',
    'CONFERENCE': 'from-purple-400 to-purple-500',
    'SURGERY': 'from-red-400 to-red-500'
  }

  const iconMap = {
    'GENERAL_EXAMINATION': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    'PROCEDURE': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    'SPECIAL_EXAMINATION': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    'CONFERENCE': 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    'SURGERY': 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4'
  }

  return {
    ...room,
    type: typeMap[room.type] || room.type,
    gradient: room.gradient || gradientMap[room.type] || 'from-gray-400 to-gray-500',
    icon: iconMap[room.type] || 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    ...statusMap[room.status]
  }
}

// Transform booking data for UI display
const transformBookingData = (booking) => {
  const statusMap = {
    'CONFIRMED': { status: 'ยืนยันแล้ว', statusColor: 'bg-emerald-500/10 text-emerald-400' },
    'PENDING': { status: 'รอยืนยัน', statusColor: 'bg-orange-500/10 text-orange-400' },
    'CANCELLED': { status: 'ยกเลิก', statusColor: 'bg-rose-500/10 text-rose-400' },
    'COMPLETED': { status: 'เสร็จสิ้น', statusColor: 'bg-blue-500/10 text-blue-400' }
  }

  const startTime = new Date(booking.startTime)
  const endTime = new Date(booking.endTime)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  let dateLabel = 'วันอื่น'
  if (startTime >= today && startTime < tomorrow) {
    dateLabel = 'วันนี้'
  } else if (startTime >= tomorrow) {
    dateLabel = 'พรุ่งนี้'
  } else if (startTime >= yesterday && startTime < today) {
    dateLabel = 'เมื่อวาน'
  }

  return {
    id: booking.id,
    room: booking.room.name,
    user: booking.user.name,
    time: `${startTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}`,
    date: dateLabel,
    ...statusMap[booking.status]
  }
}

// Computed properties for transformed data
const displayRooms = computed(() => {
  return rooms.value.map(room => transformRoomData(room))
})

const displayBookings = computed(() => {
  return recentBookings.value.map(booking => transformBookingData(booking))
})

// Fetch rooms
const fetchRooms = async () => {
  try {
    const response = await fetch(`${API_BASE}/rooms`)
    if (!response.ok) throw new Error('Failed to fetch rooms')
    const data = await response.json()
    rooms.value = data
    console.log('Rooms loaded:', data.length)
  } catch (error) {
    console.error('Error fetching rooms:', error)
  }
}

// Fetch recent bookings
const fetchRecentBookings = async () => {
  try {
    const response = await fetch(`${API_BASE}/bookings`)
    if (!response.ok) throw new Error('Failed to fetch bookings')
    const data = await response.json()
    recentBookings.value = data
    console.log('Bookings loaded:', data.length)
  } catch (error) {
    console.error('Error fetching bookings:', error)
  }
}

// Load all data
const loadData = async () => {
  loading.value = true
  try {
    await Promise.all([
      fetchRooms(),
      fetchRecentBookings()
    ])
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
}

// Filter bookings based on active tab
const filteredBookings = computed(() => {
  if (activeTab.value === 'all') {
    return displayBookings.value
  } else if (activeTab.value === 'pending') {
    return displayBookings.value.filter(b => b.status === 'รอยืนยัน')
  } else if (activeTab.value === 'confirmed') {
    return displayBookings.value.filter(b => b.status === 'ยืนยันแล้ว')
  }
  return displayBookings.value
})

// Logout function
const logout = () => {
  // Clear tab-specific session data
  sessionStorage.removeItem('user')
  sessionStorage.removeItem('isLoggedIn')
  sessionStorage.removeItem('tabId')
  
  // Clear any localStorage data if needed
  localStorage.removeItem('lastSession')
  
  console.log('User logged out, tab session cleared')
  router.push('/login')
}

// Tab session monitor
const monitorTabSession = () => {
  // Check tab session every 3 seconds
  setInterval(() => {
    const currentTabId = sessionStorage.getItem('tabId')
    const user = sessionStorage.getItem('user')
    
    if (user && currentTabId) {
      try {
        const userData = JSON.parse(user)
        if (userData.tabId !== currentTabId) {
          console.warn('Tab session changed detected, refreshing user data...')
          getCurrentUser()
        }
      } catch (error) {
        console.error('Error monitoring tab session:', error)
      }
    }
  }, 3000)
}

// Load data when component mounts
onMounted(() => {
  getCurrentUser()
  loadData()
  monitorTabSession()
})
</script>
