<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Mobile Header -->
    <div class="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
            <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span class="font-bold text-lg text-gray-800">จัดการห้อง</span>
        </div>
        <button 
          @click="showCreateModal = true"
          class="p-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div class="p-6 flex items-center gap-3 border-b border-gray-100">
        <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <span class="font-bold text-lg text-gray-800">Room Manager</span>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-1 border-b border-gray-100">
        <router-link 
          to="/dashboard"
          class="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-cyan-600 transition-colors text-sm"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          แดชบอร์ด
        </router-link>
        <router-link 
          to="/calendar"
          class="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-cyan-600 transition-colors text-sm"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          ปฏิทินการจอง
        </router-link>
        <div class="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-cyan-50 text-cyan-600 font-medium text-sm">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          จัดการห้อง
        </div>
      </nav>

      <!-- Quick Actions -->
      <div class="p-4 flex-1">
        <button 
          @click="showCreateModal = true"
          class="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 font-medium"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          เพิ่มห้องใหม่
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden pt-16 md:pt-0 pb-20 md:pb-0">
      <!-- Header -->
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div class="flex items-center gap-4">
          <h1 class="text-xl font-semibold text-gray-800">จัดการห้อง</h1>
          <span class="text-sm text-gray-500">{{ rooms.length }} ห้อง</span>
        </div>

        <div class="flex items-center gap-4">
          <!-- Search -->
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="ค้นหาห้อง..."
              class="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-cyan-300 transition-all"
            />
          </div>

          <!-- Filter -->
          <select 
            v-model="filterType"
            class="px-3 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-cyan-300 transition-all"
          >
            <option value="">ทุกประเภท</option>
            <option value="GENERAL_EXAMINATION">ห้องตรวจทั่วไป</option>
            <option value="PROCEDURE">ห้องหัตถการ</option>
            <option value="SPECIAL_EXAMINATION">ห้องตรวจพิเศษ</option>
            <option value="CONFERENCE">ห้องประชุม</option>
            <option value="SURGERY">ห้องผ่าตัด</option>
          </select>
        </div>
      </header>

      <!-- Room Grid -->
      <div class="flex-1 overflow-y-auto p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- Loading skeleton -->
          <div v-if="loading" v-for="i in 8" :key="i" class="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
            <div class="h-48 bg-gray-200"></div>
            <div class="p-4">
              <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div class="flex gap-2">
                <div class="h-8 bg-gray-200 rounded flex-1"></div>
                <div class="h-8 bg-gray-200 rounded w-8"></div>
              </div>
            </div>
          </div>

          <!-- Room Cards -->
          <div 
            v-else
            v-for="room in filteredRooms" 
            :key="room.id"
            class="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
          >
            <!-- Room Image/Header -->
            <div class="relative h-48 overflow-hidden bg-gradient-to-br" :class="getRoomGradient(room.type)">
              <!-- Uploaded Image -->
              <img 
                v-if="room.image"
                :src="getImageUrl(room.image)" 
                :alt="room.name"
                @error="handleImageError"
                @load="handleImageLoad"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-10 relative"
              />
              <!-- Fallback Gradient + Icon (always present, hidden when image loads) -->
              <div class="fallback-content absolute inset-0" :class="room.image ? 'hidden' : 'flex'">
                <div class="absolute inset-0 bg-gradient-to-br opacity-80" :class="getRoomGradient(room.type)"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="getRoomIcon(room.type)" />
                  </svg>
                </div>
              </div>
              
              <!-- Status Badge -->
              <div class="absolute top-3 left-3">
                <span :class="getStatusColor(room.status)" class="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md">
                  {{ getStatusText(room.status) }}
                </span>
              </div>

              <!-- Actions -->
              <div class="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  @click.stop="editRoom(room)"
                  title="แก้ไขห้อง"
                  class="p-2 bg-white/90 backdrop-blur-md rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-lg"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  @click.stop="deleteRoom(room)"
                  title="ลบห้อง"
                  class="p-2 bg-white/90 backdrop-blur-md rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-lg"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Room Info -->
            <div class="p-4">
              <h3 class="font-semibold text-gray-800 mb-1 truncate">{{ room.name }}</h3>
              <p class="text-sm text-gray-500 mb-2">{{ getRoomTypeText(room.type) }} • จุได้ {{ room.capacity }} คน</p>
              
              <!-- Booking Info -->
              <div class="flex items-center gap-2 mb-3">
                <div v-if="room.activeBookings > 0" class="flex items-center gap-1 text-xs">
                  <div class="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span class="text-orange-600 font-medium">{{ room.activeBookings }} การจองที่ใช้งาน</span>
                </div>
                <div v-if="room.totalBookings > room.activeBookings" class="flex items-center gap-1 text-xs">
                  <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span class="text-gray-500">{{ room.totalBookings - room.activeBookings }} การจองเก่า</span>
                </div>
                <div v-if="room.totalBookings === 0" class="flex items-center gap-1 text-xs">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span class="text-green-600">ไม่มีการจอง</span>
                </div>
              </div>
              
              <div class="space-y-2">
                <!-- Status Toggle -->
                <button 
                  @click="toggleRoomStatus(room)"
                  :class="[
                    'w-full px-3 py-2 rounded-lg text-sm font-medium transition-all',
                    room.status === 'AVAILABLE' 
                      ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                  ]"
                >
                  {{ room.status === 'AVAILABLE' ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}
                </button>
                
                <!-- Action Buttons -->
                <div class="flex gap-2">
                  <button 
                    @click="editRoom(room)"
                    class="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    แก้ไข
                  </button>
                  <button 
                    @click="deleteRoom(room)"
                    class="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    ลบ
                  </button>
                  <button 
                    @click="viewRoomBookings(room)"
                    title="ดูการจอง"
                    class="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Create/Edit Room Modal -->
    <div v-if="showCreateModal || editingRoom" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click="closeModal">
      <div @click.stop class="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] shadow-2xl flex flex-col">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h3 class="text-lg font-semibold text-gray-800">
            {{ editingRoom ? 'แก้ไขห้อง' : 'เพิ่มห้องใหม่' }}
          </h3>
          <button @click="closeModal" class="p-2 hover:bg-gray-100 rounded-lg">
            <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="flex-1 overflow-y-auto p-6">
          <form id="room-form" @submit.prevent="saveRoom" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ชื่อห้อง</label>
            <input 
              type="text" 
              v-model="roomForm.name" 
              required 
              placeholder="เช่น ห้องตรวจ 1"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ประเภทห้อง</label>
            <select v-model="roomForm.type" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
              <option value="">เลือกประเภท</option>
              <option value="GENERAL_EXAMINATION">ห้องตรวจทั่วไป</option>
              <option value="PROCEDURE">ห้องหัตถการ</option>
              <option value="SPECIAL_EXAMINATION">ห้องตรวจพิเศษ</option>
              <option value="CONFERENCE">ห้องประชุม</option>
              <option value="SURGERY">ห้องผ่าตัด</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ความจุ (คน)</label>
            <input 
              type="number" 
              v-model="roomForm.capacity" 
              required 
              min="1"
              max="50"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">รูปภาพห้อง</label>
            <div class="space-y-3">
              <!-- Image Preview -->
              <div v-if="imagePreview || roomForm.image" class="relative">
                <img 
                  :src="imagePreview || getImageUrl(roomForm.image)" 
                  alt="Room preview"
                  class="w-full h-32 object-cover rounded-lg border border-gray-300"
                >
                <button 
                  type="button"
                  @click="removeImage"
                  class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <!-- Upload Button -->
              <div class="flex items-center justify-center w-full">
                <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500">
                      <span class="font-semibold">คลิกเพื่ออัปโหลด</span> หรือลากไฟล์มาวาง
                    </p>
                    <p class="text-xs text-gray-500">PNG, JPG, GIF หรือ WEBP (สูงสุด 5MB)</p>
                  </div>
                  <input 
                    type="file" 
                    class="hidden" 
                    accept="image/*"
                    @change="handleImageUpload"
                    ref="imageInput"
                  />
                </label>
              </div>
              
              <!-- Upload Progress -->
              <div v-if="uploadProgress > 0 && uploadProgress < 100" class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-cyan-500 h-2 rounded-full transition-all duration-300" :style="`width: ${uploadProgress}%`"></div>
              </div>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">คำอธิบาย</label>
            <textarea 
              v-model="roomForm.description" 
              rows="3"
              placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับห้อง..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            ></textarea>
          </div>
          
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="flex gap-3 p-6 border-t border-gray-200 flex-shrink-0">
          <button 
            type="button" 
            @click="closeModal"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ยกเลิก
          </button>
          <button 
            type="submit"
            form="room-form"
            :disabled="loading"
            class="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all disabled:opacity-50"
          >
            {{ editingRoom ? 'บันทึก' : 'เพิ่มห้อง' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Bottom Navigation -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div class="grid grid-cols-3 gap-1">
        <!-- Dashboard -->
        <router-link to="/dashboard" class="flex flex-col items-center py-2 px-1 text-gray-600 hover:text-cyan-600 transition-colors">
          <svg class="h-6 w-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="text-xs font-medium">แดชบอร์ด</span>
        </router-link>
        
        <!-- Calendar -->
        <router-link to="/calendar" class="flex flex-col items-center py-2 px-1 text-gray-600 hover:text-cyan-600 transition-colors">
          <svg class="h-6 w-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-xs font-medium">ปฏิทิน</span>
        </router-link>
        
        <!-- Rooms -->
        <div class="flex flex-col items-center py-2 px-1 bg-cyan-50 text-cyan-600">
          <svg class="h-6 w-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span class="text-xs font-medium">จัดการห้อง</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

import networkConfig from '../config/network.js'

// API base URL - Auto-detect for LAN
const API_BASE = networkConfig.apiBase

// Reactive data
const rooms = ref([])
const loading = ref(false)
const searchQuery = ref('')
const filterType = ref('')
const showCreateModal = ref(false)
const editingRoom = ref(null)

// Form data
const roomForm = ref({
  name: '',
  type: '',
  capacity: 1,
  description: '',
  image: ''
})

// Image upload
const imagePreview = ref('')
const uploadProgress = ref(0)
const imageInput = ref(null)

// Computed properties
const filteredRooms = computed(() => {
  let filtered = rooms.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(room => 
      room.name.toLowerCase().includes(query) ||
      getRoomTypeText(room.type).toLowerCase().includes(query)
    )
  }

  // Filter by type
  if (filterType.value) {
    filtered = filtered.filter(room => room.type === filterType.value)
  }

  // Debug log for each room
  filtered.forEach(room => {
    console.log(`Room ${room.name} has image:`, room.image)
  })

  return filtered
})

// Helper functions
const getRoomGradient = (type) => {
  const gradients = {
    'GENERAL_EXAMINATION': 'from-blue-400 to-blue-500',
    'PROCEDURE': 'from-rose-400 to-rose-500',
    'SPECIAL_EXAMINATION': 'from-indigo-400 to-indigo-500',
    'CONFERENCE': 'from-purple-400 to-purple-500',
    'SURGERY': 'from-red-400 to-red-500'
  }
  return gradients[type] || 'from-gray-400 to-gray-500'
}

const getRoomIcon = (type) => {
  const icons = {
    'GENERAL_EXAMINATION': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    'PROCEDURE': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    'SPECIAL_EXAMINATION': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    'CONFERENCE': 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    'SURGERY': 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4'
  }
  return icons[type] || 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
}

const getRoomTypeText = (type) => {
  const types = {
    'GENERAL_EXAMINATION': 'ห้องตรวจทั่วไป',
    'PROCEDURE': 'ห้องหัตถการ',
    'SPECIAL_EXAMINATION': 'ห้องตรวจพิเศษ',
    'CONFERENCE': 'ห้องประชุม',
    'SURGERY': 'ห้องผ่าตัด'
  }
  return types[type] || type
}

const getStatusColor = (status) => {
  const colors = {
    'AVAILABLE': 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30',
    'OCCUPIED': 'bg-rose-500/20 text-rose-400 border border-rose-400/30',
    'MAINTENANCE': 'bg-orange-500/20 text-orange-400 border border-orange-400/30',
    'CLOSED': 'bg-gray-500/20 text-gray-400 border border-gray-400/30'
  }
  return colors[status] || 'bg-gray-500/20 text-gray-400 border border-gray-400/30'
}

const getStatusText = (status) => {
  const texts = {
    'AVAILABLE': 'ว่าง',
    'OCCUPIED': 'ใช้งาน',
    'MAINTENANCE': 'ปรับปรุง',
    'CLOSED': 'ปิด'
  }
  return texts[status] || status
}

// API functions
const fetchRooms = async () => {
  try {
    loading.value = true
    const response = await fetch(`${API_BASE}/rooms`)
    if (!response.ok) throw new Error('Failed to fetch rooms')
    const data = await response.json()
    
    // Add booking count info to each room
    rooms.value = data.map(room => ({
      ...room,
      activeBookings: room.bookings ? room.bookings.filter(b => 
        b.status === 'PENDING' || b.status === 'CONFIRMED'
      ).length : 0,
      totalBookings: room.bookings ? room.bookings.length : 0
    }))
    
    console.log('Fetched rooms:', rooms.value) // Debug log
  } catch (error) {
    console.error('Error fetching rooms:', error)
    alert('เกิดข้อผิดพลาดในการดึงข้อมูลห้อง')
  } finally {
    loading.value = false
  }
}

const saveRoom = async () => {
  try {
    loading.value = true
    
    const url = editingRoom.value 
      ? `${API_BASE}/rooms/${editingRoom.value.id}`
      : `${API_BASE}/rooms`
    
    const method = editingRoom.value ? 'PUT' : 'POST'
    
    // Debug log
    console.log('Saving room with data:', roomForm.value)
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(roomForm.value)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to save room')
    }
    
    const room = await response.json()
    console.log('Room saved:', room) // Debug log
    
    if (editingRoom.value) {
      // Update existing room
      const index = rooms.value.findIndex(r => r.id === editingRoom.value.id)
      if (index !== -1) {
        rooms.value[index] = room
      }
    } else {
      // Add new room
      rooms.value.push(room)
    }
    
    closeModal()
    alert(editingRoom.value ? 'แก้ไขห้องสำเร็จ!' : 'เพิ่มห้องสำเร็จ!')
  } catch (error) {
    console.error('Error saving room:', error)
    alert(error.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  } finally {
    loading.value = false
  }
}

const editRoom = (room) => {
  console.log('Editing room:', room) // Debug log
  editingRoom.value = room
  roomForm.value = {
    name: room.name,
    type: room.type,
    capacity: room.capacity,
    description: room.description || '',
    image: room.image || ''
  }
  imagePreview.value = ''
  showCreateModal.value = true // Make sure modal opens
}

const deleteRoom = async (room) => {
  console.log('Deleting room:', room) // Debug log
  
  // Show different confirmation messages based on booking status
  let confirmMessage = `คุณต้องการลบห้อง "${room.name}" หรือไม่?`
  
  if (room.activeBookings > 0) {
    confirmMessage = `ห้อง "${room.name}" มีการจองที่ยังใช้งานอยู่ ${room.activeBookings} รายการ\n\nคุณแน่ใจหรือไม่ว่าต้องการลบ?`
  } else if (room.totalBookings > 0) {
    confirmMessage = `ห้อง "${room.name}" มีประวัติการจอง ${room.totalBookings} รายการ (ทั้งหมดเสร็จสิ้นแล้ว)\n\nการลบจะทำให้ประวัติการจองหายไปด้วย คุณแน่ใจหรือไม่?`
  }
  
  if (!confirm(confirmMessage)) return
  
  try {
    loading.value = true
    console.log('Sending delete request to:', `${API_BASE}/rooms/${room.id}`) // Debug log
    
    const response = await fetch(`${API_BASE}/rooms/${room.id}`, {
      method: 'DELETE'
    })
    
    console.log('Delete response:', response.status) // Debug log
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to delete room')
    }
    
    rooms.value = rooms.value.filter(r => r.id !== room.id)
    alert('ลบห้องสำเร็จ!')
  } catch (error) {
    console.error('Error deleting room:', error)
    alert('เกิดข้อผิดพลาดในการลบห้อง: ' + error.message)
  } finally {
    loading.value = false
  }
}

const toggleRoomStatus = async (room) => {
  try {
    const newStatus = room.status === 'AVAILABLE' ? 'CLOSED' : 'AVAILABLE'
    
    const response = await fetch(`${API_BASE}/rooms/${room.id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
    
    if (!response.ok) throw new Error('Failed to update room status')
    
    const updatedRoom = await response.json()
    const index = rooms.value.findIndex(r => r.id === room.id)
    if (index !== -1) {
      rooms.value[index] = updatedRoom
    }
  } catch (error) {
    console.error('Error updating room status:', error)
    alert('เกิดข้อผิดพลาดในการอัปเดตสถานะห้อง')
  }
}

const viewRoomBookings = (room) => {
  if (!room.bookings || room.bookings.length === 0) {
    alert(`ห้อง "${room.name}" ไม่มีการจอง`)
    return
  }
  
  const bookingList = room.bookings.map(booking => {
    const startTime = new Date(booking.startTime).toLocaleString('th-TH')
    const endTime = new Date(booking.endTime).toLocaleTimeString('th-TH')
    const statusText = getStatusText(booking.status)
    return `• ${startTime} - ${endTime} (${statusText})`
  }).join('\n')
  
  alert(`การจองของห้อง "${room.name}":\n\n${bookingList}`)
}

// Image functions
const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  
  // Use network config for LAN support
  const baseUrl = networkConfig.serverUrl
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
  const fullUrl = `${baseUrl}${cleanPath}`
  
  console.log('RoomManagement Image URL:', fullUrl) // Debug log
  return fullUrl
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file size (10MB - เพิ่มขึ้นสำหรับมือถือ)
  if (file.size > 10 * 1024 * 1024) {
    alert('ไฟล์รูปภาพต้องมีขนาดไม่เกิน 10MB')
    return
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    alert('กรุณาเลือกไฟล์รูปภาพ (JPG, PNG, GIF, WEBP)')
    return
  }

  try {
    uploadProgress.value = 0
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)

    // Upload to server with timeout
    const formData = new FormData()
    formData.append('image', file)

    const xhr = new XMLHttpRequest()
    
    // Set timeout (60 seconds)
    xhr.timeout = 60000
    
    // Track upload progress
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        uploadProgress.value = Math.round((e.loaded / e.total) * 100)
      }
    })

    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText)
          roomForm.value.image = response.imageUrl
          uploadProgress.value = 100
          setTimeout(() => {
            uploadProgress.value = 0
          }, 1000)
          console.log('Upload success:', response.imageUrl)
        } catch (e) {
          throw new Error('Invalid response from server')
        }
      } else {
        let errorMsg = 'Upload failed'
        try {
          const error = JSON.parse(xhr.responseText)
          errorMsg = error.error || errorMsg
        } catch (e) {}
        throw new Error(errorMsg)
      }
    }

    xhr.onerror = () => {
      throw new Error('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาตรวจสอบอินเทอร์เน็ต')
    }

    xhr.ontimeout = () => {
      throw new Error('การอัปโหลดใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง')
    }

    xhr.open('POST', `${API_BASE}/upload/room-image`)
    xhr.send(formData)

  } catch (error) {
    console.error('Upload error:', error)
    alert(error.message || 'เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ')
    uploadProgress.value = 0
    imagePreview.value = ''
  }
}

const removeImage = () => {
  imagePreview.value = ''
  roomForm.value.image = ''
  if (imageInput.value) {
    imageInput.value.value = ''
  }
}

const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src)
  // Hide the image and show fallback
  event.target.style.display = 'none'
  // Find the parent room card and show the fallback
  const roomCard = event.target.closest('.group')
  if (roomCard) {
    const fallback = roomCard.querySelector('.fallback-content')
    if (fallback) {
      fallback.style.display = 'flex'
    }
  }
}

const handleImageLoad = (event) => {
  console.log('Image loaded successfully:', event.target.src)
}

const closeModal = () => {
  showCreateModal.value = false
  editingRoom.value = null
  imagePreview.value = ''
  uploadProgress.value = 0
  roomForm.value = {
    name: '',
    type: '',
    capacity: 1,
    description: '',
    image: ''
  }
}

// Load data on mount
onMounted(() => {
  fetchRooms()
})
</script>